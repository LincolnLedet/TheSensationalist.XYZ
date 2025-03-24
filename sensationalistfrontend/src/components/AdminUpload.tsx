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
  contentType: string; // ← ADD THIS
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
    contentType: 'Weird', // ← ADD THIS

    downloadcount: 0,
    authorIds: [], // Start with no author dropdown fields (or prefill with [''] if desired)
    uploadDate: new Date().toISOString().split('T')[0],
  });

  // Set up dropzone hooks unconditionally.
  const onDropPdf = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.name.includes(' ')) {
      setMessage('Error: File names cannot contain spaces.');
      return;
    }
    setPdfFile(file);
  };
  
  const onDropCoverImage = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.name.includes(' ')) {
      setMessage('Error: File names cannot contain spaces.');
      return;
    }
    setCoverImage(file);
  };

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
        const response = await axios.get(`${baseURL}/api/articles/authors`, {
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

  // Instead of returning early, conditionally render the UI.
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

  // For multiple authors, we map over an array of dropdown fields.
  // Each dropdown represents one selected author.
  const handleAuthorSelect = (index: number, selectedId: string) => {
    const newAuthorIds = [...formData.authorIds];
    newAuthorIds[index] = selectedId;
    setFormData(prev => ({ ...prev, authorIds: newAuthorIds }));
  };

  const removeAuthor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      authorIds: prev.authorIds.filter((_, i) => i !== index),
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
    data.append('contentType', String(formData.contentType));
    data.append('downloadcount', String(formData.downloadcount));
    data.append('uploadDate', formData.uploadDate);
    formData.authorIds.forEach(id => {
      if (id) data.append('authorIds[]', id);
    });
    data.append('pdf', pdfFile);
    data.append('coverImage', coverImage);
    const entriesArray = Array.from(data.entries());
for (let [key, value] of entriesArray) {
  console.log(key, value);
}

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
        contentType: 'Weird',
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
            <option value="Volume">Volume</option>
            <option value="Article">Article</option>
            <option value="misc">Misc</option>
          </select>
        </label>
        <label>
          Content Type:
          <select
            name="contentType"
            value={formData.contentType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Content Type</option>
            <option value="Poem">Poem</option>
            <option value="Story">Story</option>
            <option value="Interview">Interview</option>
            <option value="Tutorial">Tutorial</option>
            <option value="Review">Review</option>
            <option value="Comedy">Comedy</option>
            <option value="Travel">Travel</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Science">Science</option>
            <option value="Tech">Tech</option>
            <option value="Music">Music</option>
            <option value="Skateboarding">Skateboarding</option>
            <option value="Activity">Activity</option>
            <option value="Opinion">Opinion</option>
            <option value="News">News</option>
            <option value="Biography">Biography</option>
            <option value="Satire">Satire</option>
            <option value="Analysis">Analysis</option>
            <option value="Memoir">Memoir</option>
            <option value="Horror">Horror</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Drama">Drama</option>
            <option value="Mystery">Mystery</option>
            <option value="History">History</option>
            <option value="Education">Education</option>
            <option value="Gaming">Gaming</option>
            <option value="Photography">Photography</option>
            <option value="Film">Film</option>
            <option value="Food">Food</option>
            <option value="Health">Health</option>
            <option value="Fitness">Fitness</option>
            <option value="DIY">DIY</option>
            <option value="Finance">Finance</option>
            <option value="Business">Business</option>
            <option value="Motivation">Motivation</option>
            <option value="Philosophy">Philosophy</option>
            <option value="Psychology">Psychology</option>
            <option value="Spirituality">Spirituality</option>
            <option value="Environment">Environment</option>
            <option value="Politics">Politics</option>
            <option value="Fashion">Fashion</option>
            <option value="Weird">Weird</option>
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
        

        {/* Multiple author dropdowns */}
        <label>
          Authors:
          {formData.authorIds.map((selectedId, index) => (
            <div key={index} className="author-select-input">
              <select
                name={`authorId-${index}`}
                value={selectedId}
                onChange={(e) => handleAuthorSelect(index, e.target.value)}
              >
                <option value="">Select an author</option>
                {authors.map(author => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
              <button type="button" onClick={() => removeAuthor(index)}>
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFormData(prev => ({ ...prev, authorIds: [...prev.authorIds, ''] }))
            }
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