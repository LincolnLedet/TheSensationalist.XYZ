import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import './BandUpload.css';

// Define the shape of our band form data.
interface BandFormData {
  title: string;
  description: string;
  spotifyLink: string;
  appleMusicLink: string;
  websiteLink: string;
  instagramLink: string;
  videoLink: string;
  email: string;
  phone: string;
  genre: string;
}

// Define the shape of an audio track upload.
interface AudioTrackUpload {
  title: string;
  file: File | null;
}

// Define the shape of a band photo upload.
interface PhotoUpload {
  title: string;
  file: File | null;
}

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'https://the-sensationalist.xyz'
    : '';

/* --- Child Component for Audio Track Upload --- */
interface AudioTrackInputProps {
  index: number;
  track: AudioTrackUpload;
  onChange: (index: number, field: 'title' | 'file', value: any) => void;
  onRemove: (index: number) => void;
  setMessage: (msg: string) => void;
}

const AudioTrackInput: React.FC<AudioTrackInputProps> = ({
  index,
  track,
  onChange,
  onRemove,
  setMessage,
}) => {
  const onDropAudio = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    // Check for spaces in file names.
    if (file && file.name.includes(' ')) {
      setMessage('Error: Audio file names cannot contain spaces.');
      return;
    }
    onChange(index, 'file', file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropAudio,
    accept: { 'audio/mpeg': ['.mp3'] },
    multiple: false,
  });

  return (
    <div className="audio-track-input">
      <label>
        Audio Track Title:
        <input
          type="text"
          value={track.title}
          onChange={(e) => onChange(index, 'title', e.target.value)}
          required
        />
      </label>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {track.file ? (
          <p>{track.file.name}</p>
        ) : (
          <p>Drag & drop an MP3 file here, or click to select file</p>
        )}
      </div>
      <button type="button" onClick={() => onRemove(index)}>
        Remove Track
      </button>
    </div>
  );
};

/* --- Child Component for Photo Upload --- */
interface PhotoInputProps {
  index: number;
  photo: PhotoUpload;
  onChange: (index: number, field: 'title' | 'file', value: any) => void;
  onRemove: (index: number) => void;
  setMessage: (msg: string) => void;
}

const PhotoInput: React.FC<PhotoInputProps> = ({
  index,
  photo,
  onChange,
  onRemove,
  setMessage,
}) => {
  const onDropPhoto = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.name.includes(' ')) {
      setMessage('Error: Photo file names cannot contain spaces.');
      return;
    }
    onChange(index, 'file', file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropPhoto,
    accept: { 'image/*': ['.jpeg', '.jpg'] },
    multiple: false,
  });

  return (
    <div className="photo-input">
      <label>
        Photo Title:
        <input
          type="text"
          value={photo.title}
          onChange={(e) => onChange(index, 'title', e.target.value)}
          required
        />
      </label>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {photo.file ? (
          <p>{photo.file.name}</p>
        ) : (
          <p>Drag & drop a JPEG image here, or click to select file</p>
        )}
      </div>
      <button type="button" onClick={() => onRemove(index)}>
        Remove Photo
      </button>
    </div>
  );
};

const BandUpload: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [message, setMessage] = useState<string>('');
  const [formData, setFormData] = useState<BandFormData>({
    title: '',
    description: '',
    spotifyLink: '',
    appleMusicLink: '',
    websiteLink: '',
    instagramLink: '',
    videoLink: '',
    email: '',
    phone: '',
    genre: '',
  });

  // Landing image state (required for band profile).
  const [landingImage, setLandingImage] = useState<File | null>(null);

  // State for multiple audio tracks and photos.
  const [audioTracks, setAudioTracks] = useState<AudioTrackUpload[]>([]);
  const [bandPhotos, setBandPhotos] = useState<PhotoUpload[]>([]);

  // Dropzone for landing image.
  const onDropLandingImage = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.name.includes(' ')) {
      setMessage('Error: File names cannot contain spaces.');
      return;
    }
    setLandingImage(file);
  };

  const { getRootProps: getRootPropsLanding, getInputProps: getInputPropsLanding } = useDropzone({
    onDrop: onDropLandingImage,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
    multiple: false,
  });

  // Ensure AuthContext exists and that the user is an admin.
  if (!authContext) throw new Error('AuthContext must be used within an AuthProvider');
  const { auth } = authContext;
  if (!auth.isLoggedIn || auth.user?.role !== 'admin') {
    return <div>You are not authorized to view this page.</div>;
  }

  // Handle changes to the main band form.
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handlers for audio track changes.
  const handleAudioTrackChange = (
    index: number,
    field: 'title' | 'file',
    value: any
  ) => {
    const updatedTracks = [...audioTracks];
    updatedTracks[index] = { ...updatedTracks[index], [field]: value };
    setAudioTracks(updatedTracks);
  };

  const removeAudioTrack = (index: number) => {
    setAudioTracks(prev => prev.filter((_, i) => i !== index));
  };

  // Handlers for photo changes.
  const handlePhotoChange = (
    index: number,
    field: 'title' | 'file',
    value: any
  ) => {
    const updatedPhotos = [...bandPhotos];
    updatedPhotos[index] = { ...updatedPhotos[index], [field]: value };
    setBandPhotos(updatedPhotos);
  };

  const removePhoto = (index: number) => {
    setBandPhotos(prev => prev.filter((_, i) => i !== index));
  };

  // Form submission handler.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!landingImage) {
      setMessage('Please upload a landing image.');
      return;
    }

    try {
      // Create the band with form data.
      const bandResponse = await axios.post(
        `${baseURL}/api/bands`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      // Get the newly created band ID.
      const bandId = bandResponse.data.band.id;

      // Upload landing image.
      const landingData = new FormData();
      landingData.append('landingImage', landingImage);
      await axios.post(
        `${baseURL}/api/bands/${bandId}/upload-image`,
        landingData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      // Loop over and upload each audio track.
      for (const track of audioTracks) {
        if (track.title && track.file) {
          const trackData = new FormData();
          trackData.append('title', track.title);
          trackData.append('audioFile', track.file);
          await axios.post(
            `${baseURL}/api/bands/${bandId}/upload-track`,
            trackData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${auth.token}`,
              },
            }
          );
        }
      }

      // Loop over and upload each band photo.
      for (const photo of bandPhotos) {
        if (photo.title && photo.file) {
          const photoData = new FormData();
          photoData.append('title', photo.title);
          photoData.append('photo', photo.file);
          await axios.post(
            `${baseURL}/api/bands/${bandId}/upload-photo`,
            photoData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${auth.token}`,
              },
            }
          );
        }
      }

      setMessage('Band created with landing image, audio tracks, and photos uploaded successfully!');
      // Reset all form fields and state.
      setFormData({
        title: '',
        description: '',
        spotifyLink: '',
        appleMusicLink: '',
        websiteLink: '',
        instagramLink: '',
        videoLink: '',
        email: '',
        phone: '',
        genre: '',
      });
      setLandingImage(null);
      setAudioTracks([]);
      setBandPhotos([]);
    } catch (error) {
      console.error('Error uploading band data:', error);
      setMessage('Failed to create band or upload some files.');
    }
  };

  return (
    <div className="band-upload-container">
      <h2>Upload Band Information</h2>
      {message && <p className="upload-message">{message}</p>}
      <form onSubmit={handleSubmit} className="upload-form">
        {/* Band basic details */}
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Spotify Link:
          <input
            type="text"
            name="spotifyLink"
            value={formData.spotifyLink}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Apple Music Link:
          <input
            type="text"
            name="appleMusicLink"
            value={formData.appleMusicLink}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Website Link:
          <input
            type="text"
            name="websiteLink"
            value={formData.websiteLink}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Instagram Link:
          <input
            type="text"
            name="instagramLink"
            value={formData.instagramLink}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Video Link:
          <input
            type="text"
            name="videoLink"
            value={formData.videoLink}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Genre:
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
          />
        </label>

        {/* Landing image dropzone */}
        <div className="file-dropzone">
          <label>Upload Landing Image:</label>
          <div {...getRootPropsLanding()} className="dropzone">
            <input {...getInputPropsLanding()} />
            {landingImage ? (
              <p>{landingImage.name}</p>
            ) : (
              <p>Drag & drop an image here, or click to select file</p>
            )}
          </div>
        </div>

        {/* Section for multiple audio tracks */}
        <h3>Audio Tracks</h3>
        {audioTracks.map((track, index) => (
          <AudioTrackInput
            key={index}
            index={index}
            track={track}
            onChange={handleAudioTrackChange}
            onRemove={removeAudioTrack}
            setMessage={setMessage}
          />
        ))}
        <button
          type="button"
          onClick={() =>
            setAudioTracks(prev => [...prev, { title: '', file: null }])
          }
        >
          Add Audio Track
        </button>

        {/* Section for multiple band photos */}
        <h3>Band Photos</h3>
        {bandPhotos.map((photo, index) => (
          <PhotoInput
            key={index}
            index={index}
            photo={photo}
            onChange={handlePhotoChange}
            onRemove={removePhoto}
            setMessage={setMessage}
          />
        ))}
        <button
          type="button"
          onClick={() =>
            setBandPhotos(prev => [...prev, { title: '', file: null }])
          }
        >
          Add Band Photo
        </button>

        <button type="submit" className="upload-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BandUpload;
