import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IssueModule.css';

// Define the structure of an article
interface Issue {
  id: number;
  title: string;
  description: string;
  pdfPath: string;
  coverImage: string; 
  filetype: string;
  viewcount: number; // Include viewcount in the interface
}

const IssueModule: React.FC = () => {
  const [articles, setArticles] = useState<Issue[]>([]);

  useEffect(() => {
    axios.get('/api/articles')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error("Error fetching articles:", error);
      });
  }, []);



  return (
    <div>
      <h1>Issues</h1>
      <ul className="article-list">
        {articles
          .filter(article => article.filetype === 'Issue')
          .map(article => (
            <li key={article.id} className="article-item">
              {/* Add onClick event to call handleArticleClick */}
              <a
                href={`/articles/${article.id}`}
                className="article-link"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default navigation
                  window.location.href = `/articles/${article.id}`;
                }}
              >
                {/* Title Above Both Image and Description */}
                <h2 className="article-title">{article.title}</h2>
                <div className="article-content-preview">
                  {/* Cover Image on the Left */}
                  <img
                    src={`/${article.coverImage.replace(/\\/g, '/')}`}
                    alt={article.title}
                    className="article-image"/>
                  {/* Description on the Right */}
                  <div className="article-details">
                    <p className="article-description">{article.description}</p>
                    {/* Display the view count */}
                    <p className="article-viewcount">Views: {article.viewcount || 0}</p>
                  </div>
                </div>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default IssueModule;
