import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AnimatedHeader from '../components/AnimatedHeader';
import Footer from '../components/Footer';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css'; 
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import './ArticlePage.css';


// Define the structure of an article
interface Issue {
  id: number;
  title: string;
  description: string;
  pdfPath: string;
  coverImage: string;
  filetype: string;
}

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'https://the-sensationalist.xyz' // Backend URL in development
    : ''; // In production, requests default to the same origin
    

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Access the 'id' parameter from the URL
  const [article, setArticle] = useState<Issue | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`${baseURL}/api/articles/${id}`)
      .then(response => {
        setArticle(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching the article:", error);
        setError('Failed to load the article.');
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (article) {
      axios.post(`${baseURL}/api/articles/${article.id}/increment-viewcount`)
        .then(response => {
          console.log('View count incremented:', response.data.viewcount);
        })
        .catch(error => {
          console.error('Error incrementing view count:', error);
        });
    }
  }, [article]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!article) return <div>Article not found.</div>;

  const pdfURL = `https://the-sensationalist.xyz/api/${article.pdfPath.replace(/\\/g, '/')}`;

  return (
    <div className="article-flex-container">
      <div className="header">
        <AnimatedHeader />
      </div>
      <div className="article-content-title">
          <h5>{article.title}</h5>
        </div>
      <div className="article-content">
        
        {/* PDF.js Viewer */}
        <div className="pdf-container">
          <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.10.111/pdf.worker.min.js`}>
            <Viewer fileUrl={pdfURL} />
          </Worker>
        </div>

      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
    
  );
};

export default ArticlePage;
