import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './AuthorBio.css';

interface Article {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  viewcount: number;
}

interface Author {
  pictureUrl: string;
  name: string;
  bio: string;
  contributions: Article[];
}

const AuthorBio: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<Author | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/articles/authors/${id}`)
      .then(response => {
        const articles = response.data.Articles || []; // Fallback to an empty array if Articles is not defined

        const fetchedAuthor: Author = {
          pictureUrl: response.data.profileImage
            ? `http://localhost:5000/${response.data.profileImage.replace(/\\/g, '/')}`
            : 'default-image-url', 
          name: response.data.name || 'Unknown Author',
          bio: response.data.bio || 'No biography available.',
          contributions: articles.map((article: { id: number; title: string; description: string; coverImage: string; viewcount: number }) => ({
            id: article.id,
            title: article.title,
            description: article.description,
            coverImage: article.coverImage,
            viewcount: article.viewcount || 0
          }))
        };

        setAuthor(fetchedAuthor);
      })
      .catch(err => {
        console.error("Error fetching author data:", err);
        setError("Failed to load author information.");
      });
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!author) {
    return <div>Loading...</div>;
  }

  return (
    <div className="author-bio">
      <img src={author.pictureUrl} alt={`${author.name}'s profile`} className="author-image" />
      <h2>{author.name}</h2>
      <p className="author-bio-descriptions" >{author.bio}</p>
      <h2>Contributions</h2>
      <ul className="article-list">
        {author.contributions.map((article) => (
          <li key={article.id} className="article-item">
            <a
              href={`/articles/${article.id}`}
              className="article-link"
              onClick={(e) => {
                e.preventDefault(); // Prevent default navigation
                axios.post(`http://localhost:5000/api/articles/${article.id}/increment-viewcount`)
                  .then(() => {
                    window.location.href = `/articles/${article.id}`;
                  })
                  .catch(error => console.error('Error incrementing view count:', error));
              }}
            >
              <h3 className="article-title">{article.title}</h3>
              <div className="article-content-preview">
                <img
                  src={`http://localhost:5000/${article.coverImage.replace(/\\/g, '/')}`}
                  alt={article.title}
                  className="article-image"
                />
                <div className="article-details">
                  <p className="article-description">{article.description}</p>
                  
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorBio;
