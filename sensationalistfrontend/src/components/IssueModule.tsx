import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IssueModule.css';

// Define the structure of an issue
interface Issue {
  id: number;
  title: string;
  description: string;
  pdfPath: string;
  coverImage: string; 
  filetype: string;
  viewcount: number; // Include viewcount in the interface
}

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'https://the-sensationalist.xyz' // Backend URL in development
    : ''; // In production, requests default to the same origin

const IssueModule: React.FC = () => {
  const [articles, setArticles] = useState<Issue[]>([]);

  useEffect(() => {
    axios.get(`${baseURL}/api/articles`)
      .then(response => {
        const latestIssues = response.data
          .filter((article: Issue) => article.filetype === 'Issue') // Only issues
          .sort((a: Issue, b: Issue) => b.id - a.id) // Sort by most recent first
          .slice(1, 7); // Get only the latest 6

        setArticles(latestIssues);
      })
      .catch(error => {
        console.error("Error fetching articles:", error);
      });
  }, []);

  return (
    <div>
      <div className="IssueListTitle">Today's Picks</div>
      <ul className="article-list">
        {articles.map(article => (
          <li key={article.id} className="article-item">
            <a
              href={`/articles/${article.id}`}
              className="article-link"
              onClick={(e) => {
                e.preventDefault(); // Prevent default navigation
                window.location.href = `/articles/${article.id}`;
              }}
            >
              <div className="article-content-preview">
                {/* Cover Image on the Left */}
                <img
                  src={`${baseURL}/api/${article.coverImage.replace(/\\/g, '/')}`}
                  alt={article.title}
                  crossOrigin="anonymous" 
                  className="article-image"
                  loading="lazy"  /* ✅ Lazy loads images only when they enter the viewport */
                />
                {/* Description on the Right */}
                <div className="article-details">
                  <h2 className="article-title">{article.title}</h2>
                  <p className="article-date">Views: {article.viewcount}</p>
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
