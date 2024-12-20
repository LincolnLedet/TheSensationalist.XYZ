// AdminUpload.tsx
// AdminUpload.tsx
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import './AdminUpload.css';

const AdminUpload: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  // Always call Hooks at the top level
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    filetype: '',
    viewcount: 0,
    downloadcount: 0,
    authorIds: [''],
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  // Handlers for input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === 'viewcount' || name === 'downloadcount' ? Number(value) : value,
    }));
  };

  // Handlers for drag-and-drop
  const onDropPdf = (acceptedFiles: File[]) => {
    setPdfFile(acceptedFiles[0]);
  };

  const onDropCoverImage = (acceptedFiles: File[]) => {
    setCoverImage(acceptedFiles[0]);
  };

  const { getRootProps: getRootPropsPdf, getInputProps: getInputPropsPdf } =
    useDropzone({
      onDrop: onDropPdf,
      accept: { 'application/pdf': ['.pdf'] },
      multiple: false,
    });

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

    if (!pdfFile || !coverImage) {
      setMessage('Please upload both PDF and Cover Image.');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('filetype', formData.filetype);
    data.append('viewcount', String(formData.viewcount));
    data.append('downloadcount', String(formData.downloadcount));

    formData.authorIds.forEach(id => {
      if (id) data.append('authorIds[]', id);
    });

    data.append('pdf', pdfFile);
    data.append('coverImage', coverImage);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/articles',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      setMessage('Article uploaded successfully!');
      // Optionally, reset the form or redirect
      setFormData({
        title: '',
        description: '',
        filetype: '',
        viewcount: 0,
        downloadcount: 0,
        authorIds: [''],
      });
      setPdfFile(null);
      setCoverImage(null);
    } catch (error) {
      console.error('Error uploading article:', error);
      setMessage('Failed to upload article.');
    }
  };

  return (
    <div className="admin-upload-container">
      <h2>Upload Article/Issue</h2>
      {message && <p className="upload-message">{message}</p>}
      <form onSubmit={handleSubmit} className="upload-form">
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
            required
          ></textarea>
        </label>

        <label>
          File Type:
          <select
            name="filetype"
            value={formData.filetype}
            onChange={handleInputChange}
            required
          >
            <option value="">Select File Type</option>
            <option value="Volume">Volume</option>
            <option value="Video">Video</option>
            <option value="Image">Image</option>
            <option value="Podcast">Podcast</option>
            <option value="Issue">Issue</option>
            <option value="Music">Music</option>
            <option value="Misc">Misc</option>
          </select>
        </label>

        <label>
          View Count:
          <input
            type="number"
            name="viewcount"
            value={formData.viewcount}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Download Count:
          <input
            type="number"
            name="downloadcount"
            value={formData.downloadcount}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Author IDs:
          {formData.authorIds.map((id, index) => (
            <div key={index} className="author-id-input">
              <input
                type="text"
                name={`authorId-${index}`}
                value={id}
                onChange={e => {
                  const newAuthorIds = [...formData.authorIds];
                  newAuthorIds[index] = e.target.value;
                  setFormData(prev => ({ ...prev, authorIds: newAuthorIds }));
                }}
                placeholder="Enter Author ID"
              />
              <button
                type="button"
                onClick={() => {
                  const newAuthorIds = formData.authorIds.filter(
                    (_, i) => i !== index
                  );
                  setFormData(prev => ({ ...prev, authorIds: newAuthorIds }));
                }}
                className="remove-author-button"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFormData(prev => ({ ...prev, authorIds: [...prev.authorIds, ''] }))
            }
            className="add-author-button"
          >
            Add Another Author
          </button>
        </label>

        <div className="file-dropzone">
          <label>Upload PDF:</label>
          <div {...getRootPropsPdf()} className="dropzone">
            <input {...getInputPropsPdf()} />
            {pdfFile ? (
              <p>{pdfFile.name}</p>
            ) : (
              <p>Drag & drop a PDF file here, or click to select file</p>
            )}
          </div>
        </div>

        <div className="file-dropzone">
          <label>Upload Cover Image:</label>
          <div {...getRootPropsImage()} className="dropzone">
            <input {...getInputPropsImage()} />
            {coverImage ? (
              <p>{coverImage.name}</p>
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

export default AdminUpload;
