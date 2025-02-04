// AdminAuthorUpload.tsx
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'https://the-sensationalist.xyz' // Backend URL in development
    : ''; // In production, requests default to the same origin

const AdminMerchUpload: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  // State for form data and uploaded image
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
  });
  const [merchImage, setMerchImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  // Handle input changes for form fields
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle drag-and-drop for image upload
  const onDropMerchImage = (acceptedFiles: File[]) => {
    setMerchImage(acceptedFiles[0]);
  };

  const { getRootProps: getRootPropsImage, getInputProps: getInputPropsImage } =
    useDropzone({
      onDrop: onDropMerchImage,
      accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
      multiple: false,
    });

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { auth } = authContext;

  // Redirect if user is not logged in or not an admin
  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate('/login');
    }
  }, [auth, navigate]);

  // Prevent rendering if user is not an admin
  if (!auth.isLoggedIn || auth.user?.role !== 'admin') {
    return null;
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!merchImage) {
      setMessage('Please upload an image.');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('image', merchImage);

    try {
      const response = await axios.post(`${baseURL}/api/merch`, data, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log('Merch uploaded:', response);

      setMessage('Merch item uploaded successfully!');
      // Optionally, reset the form
      setFormData({
        title: '',
        description: '',
        price: '',
      });
      setMerchImage(null);
    } catch (error) {
      console.error('Error uploading merch item:', error);
      setMessage('Failed to upload merch item.');
    }
  };

  return (
    <div className="admin-upload-container">
      <h2>Upload New Merch Item</h2>
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
          ></textarea>
        </label>

        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </label>

        <div className="file-dropzone">
          <label>Upload Image:</label>
          <div {...getRootPropsImage()} className="dropzone">
            <input {...getInputPropsImage()} />
            {merchImage ? (
              <p>{merchImage.name}</p>
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

export default AdminMerchUpload;
