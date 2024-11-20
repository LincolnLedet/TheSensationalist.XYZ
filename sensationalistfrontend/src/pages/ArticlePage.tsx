import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AnimatedHeader from '../components/AnimatedHeader';
import Footer from '../components/Footer';
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

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Access the 'id' parameter from the URL
  const [article, setArticle] = useState<Issue | null>(null); // State to hold the article data
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to handle errors

  useEffect(() => {
    // Fetch the article data based on the ID
    axios.get(`http://localhost:5000/api/articles/${id}`)
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

  // Use another useEffect to increment the view count when the article is loaded
  useEffect(() => {
    if (article) {
      // Call the increment view count API
      axios.post(`http://localhost:5000/api/articles/${article.id}/increment-viewcount`)
        .then(response => {
          console.log('View count incremented:', response.data.viewcount);
        })
        .catch(error => {
          console.error('Error incrementing view count:', error);
        });
    }
  }, [article]);

  if (loading) return <div>Loading...</div>; // Display a loading message while fetching
  if (error) return <div>{error}</div>; // Display an error message if fetching fails
  if (!article) return <div>Article not found.</div>; // Handle case where article is not found

  return (
    <div className="article-flex-container">
      <div className="header">
        <AnimatedHeader />
      </div>
      <div className="article-content">
        {/* Article Title */}
        <div className="article-content-title">
          <h1>{article.title}</h1>
        </div>
        {/* Display the article in an iframe */}
        <iframe
          src={`http://localhost:5000/${article.pdfPath.replace(/\\/g, '/')}`}
          title={article.title}
          width="100%"
          height="800px"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default ArticlePage;
