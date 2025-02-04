import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import './AdminUpload.css';

// Define the shape of our form data.
interface FormDataType {
  title: string;
  description: string;
  filetype: string;
  viewcount: number;
  downloadcount: number;
  authorIds: string[];
  uploadDate: string;
}

// Define the shape of an author.
interface Author {
  id: string;
  name: string;
}

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'https://the-sensationalist.xyz' // Backend URL in development
    : '';

const AdminUpload: React.FC = () => {
  // Always call hooks at the top level.
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  // State for file uploads, messages, authors, and form data.
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [authors, setAuthors] = useState<Author[]>([]);
  const [formData, setFormData] = useState<FormDataType>({
    title: '',
    description: '',
    filetype: '',
    viewcount: 0,
    downloadcount: 0,
    authorIds: [],
    uploadDate: new Date().toISOString().split('T')[0],
  });

  // Set up dropzone hooks unconditionally.
  const onDropPdf = (acceptedFiles: File[]) => setPdfFile(acceptedFiles[0]);
  const onDropCoverImage = (acceptedFiles: File[]) => setCoverImage(acceptedFiles[0]);

  const { getRootProps: getRootPropsPdf, getInputProps: getInputPropsPdf } = useDropzone({
    onDrop: onDropPdf,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
  });

  const { getRootProps: getRootPropsImage, getInputProps: getInputPropsImage } = useDropzone({
    onDrop: onDropCoverImage,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
    multiple: false,
  });

  // Ensure AuthContext exists.
  if (!authContext) throw new Error('AuthContext must be used within an AuthProvider');
  const { auth } = authContext;

  // Fetch authors on component mount.
  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate('/login');
      return;
    }

    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/authors`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        // Assumes the API returns an array of authors with { id, name }
        setAuthors(response.data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchAuthors();
  }, [auth, navigate]);

  // Instead of returning early before calling hooks, conditionally render the UI.
  if (!auth.isLoggedIn || auth.user?.role !== 'admin') {
    return <div>You are not authorized to view this page.</div>;
  }

  // Handlers for form input.
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === 'viewcount' || name === 'downloadcount' ? Number(value) : value,
    }));
  };

  const setTodayDate = () => {
    setFormData(prev => ({
      ...prev,
      uploadDate: new Date().toISOString().split('T')[0],
    }));
  };

  // Handle author selection from dropdown.
  const handleAuthorSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (selectedId && !formData.authorIds.includes(selectedId)) {
      setFormData(prev => ({
        ...prev,
        authorIds: [...prev.authorIds, selectedId],
      }));
    }
  };

  const removeAuthor = (id: string) => {
    setFormData(prev => ({
      ...prev,
      authorIds: prev.authorIds.filter(authorId => authorId !== id),
    }));
  };

  // Form submission handler.
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
    data.append('uploadDate', formData.uploadDate);
    formData.authorIds.forEach(id => {
      if (id) data.append('authorIds[]', id);
    });
    data.append('pdf', pdfFile);
    data.append('coverImage', coverImage);

    try {
      await axios.post(`${baseURL}/api/articles`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setMessage('Article uploaded successfully!');
      setFormData({
        title: '',
        description: '',
        filetype: '',
        viewcount: 0,
        downloadcount: 0,
        authorIds: [],
        uploadDate: new Date().toISOString().split('T')[0],
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
          Upload Date:
          <input
            type="date"
            name="uploadDate"
            value={formData.uploadDate}
            onChange={handleInputChange}
          />
          <button type="button" onClick={setTodayDate}>
            Today
          </button>
        </label>
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
          Authors:
          <select onChange={handleAuthorSelect} defaultValue="">
            <option value="" disabled>
              Select an author
            </option>
            {authors.map(author => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </label>
        {/* Display selected authors */}
        <div className="selected-authors">
          {formData.authorIds.map(id => {
            const author = authors.find(a => a.id === id);
            return (
              author && (
                <div key={id} className="author-tag">
                  {author.name}
                  <button type="button" onClick={() => removeAuthor(id)}>
                    ✕
                  </button>
                </div>
              )
            );
          })}
        </div>
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
