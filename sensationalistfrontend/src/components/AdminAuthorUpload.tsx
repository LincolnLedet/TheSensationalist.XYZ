// AdminAuthorUpload.tsx
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000' // Backend URL in development
    : ''; // In production, requests default to the same origin

const AdminAuthorUpload: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  // Always call Hooks at the top level
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
  });
  const [profileImage, setCoverImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  // Handlers for input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handlers for drag-and-drop
  const onDropCoverImage = (acceptedFiles: File[]) => {
    setCoverImage(acceptedFiles[0]);
  };

  const { getRootProps: getRootPropsImage, getInputProps: getInputPropsImage } =
    useDropzone({
      onDrop: onDropCoverImage,
      accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
      multiple: false,
    });

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { auth } = authContext;

  // Use useEffect for navigation side effect
  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate('/login'); // Redirect to home or login page
    }
  }, [auth, navigate]);

  // If not authorized, don't render the form
  if (!auth.isLoggedIn || auth.user?.role !== 'admin') {
    return null;
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('bio', formData.bio);
    // Append only if profileImage is not null
    if (profileImage) {
      data.append('profileImage', profileImage);
    }

    try {
      const response = await axios.post(
        `${baseURL}/api/articles/authors`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      console.log('Author uploaded:', response);

      setMessage('Author uploaded successfully!');
      // Optionally, reset the form or redirect
      setFormData({
        name: '',
        bio: '',
      });
      setCoverImage(null);
    } catch (error) {
      console.error('Error uploading author:', error);
      setMessage('Failed to upload author.');
    }
  };

  return (
    <div className="admin-upload-container">
      <h2>Upload Author</h2>
      {message && <p className="upload-message">{message}</p>}
      <form onSubmit={handleSubmit} className="upload-form">
        <label>
          Name:
          <input
            type="text"
            name="name" // Matches formData key
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Bio:
          <textarea
            name="bio" // Matches formData key
            value={formData.bio}
            onChange={handleInputChange}
            required
          ></textarea>
        </label>

        <div className="file-dropzone">
          <label>Upload Profile Image:</label>
          <div {...getRootPropsImage()} className="dropzone">
            <input {...getInputPropsImage()} />
            {profileImage ? (
              <p>{profileImage.name}</p>
            ) : (
              <p>Drag & drop an image here, or click to select file</p>
            )}
          </div>
        </div>

        <button type="submit" className="upload-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminAuthorUpload;
