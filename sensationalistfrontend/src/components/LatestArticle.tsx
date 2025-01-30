import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './LatestArticle.css';

interface Article {
  id: number;
  title: string;
  pdfPath: string;
  coverImage: string;
  filetype: string;
  uploadedAt: string; // Include upload date
}

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000' // Backend URL in development
    : ''; // Production uses the same origin

const LatestArticle: React.FC = () => {
  const [latestArticle, setLatestArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/articles/latest`)
      .then((response) => {
        setLatestArticle(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching latest article:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading latest article...</div>;
  if (!latestArticle) return <div>No recent articles found.</div>;

  // Format the upload date
  const formattedDate = new Date(latestArticle.uploadedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="latest-content-container">
      <h1>Latest Article</h1>
      <div className="latest-content">
        <Link to={`/articles/${latestArticle.id}`} className="volume-cover-button">
          <img
            src={`${baseURL}/api/${latestArticle.coverImage.replace(/\\/g, '/')}`}
            crossOrigin="anonymous"
            alt={latestArticle.title}
            className="latest-content-cover-image"
          />
          <div className="latest-content-cover-title">
            <h3>{latestArticle.title}</h3>
            <div className="latest-content-upload-date">Uploaded on: {formattedDate}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LatestArticle;
