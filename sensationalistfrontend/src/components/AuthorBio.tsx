import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './AuthorBio.css';

interface Contribution {
  title: string;
  link: string;
}

interface Author {
  pictureUrl: string;
  name: string;
  bio: string;
  contributions: Contribution[];
}

const AuthorBio: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<Author | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/articles/authors/${id}`)
      .then(response => {
        console.log("API Response:", response.data); // Log the API response to inspect it

        // Check if articles exist and are an array
        const articles = response.data.articles || []; // Use an empty array if articles is undefined

        const fetchedAuthor = {
          pictureUrl: `http://localhost:5000/${response.data.profileImage?.replace(/\\/g, '/') || ''}`,
          name: response.data.name || 'Unknown Author',
          bio: response.data.bio || 'No biography available.',
          contributions: Array.isArray(articles)
            ? articles.map((article: { title: string; id: number }) => ({
                title: article.title,
                link: `/articles/${article.id}`
              }))
            : [] // If articles is not an array, use an empty array
        };
        setAuthor(fetchedAuthor);
      })
      .catch(error => {
        console.error("Error fetching author data:", error);
        setError("Failed to load author data.");
      });
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!author) {
    return <div>Loading author data...</div>;
  }

  return (
    <div className="author-bio-container">
      <div className="author-bio-picture">
        <img src={author.pictureUrl} alt={`${author.name}'s profile`} />
      </div>

      <h2>{author.name}</h2>
      <p className="author-bio-bio">{author.bio}</p>
      <div className="author-bio-contributions">
        <h3>Articles & Issues Contributed</h3>
        <ul>
          {author.contributions.map((contribution, index) => (
            <li key={index}>
              <a href={contribution.link} target="_blank" rel="noopener noreferrer">
                {contribution.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AuthorBio;
