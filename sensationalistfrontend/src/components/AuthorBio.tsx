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
  contributions: {
    title: string;
    link: string;
  }[];
}

const AuthorBio: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<Author | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:4444/api/articles/authors/${id}`)
      .then(response => {
        console.log("API Response:", response.data);

        const articles = response.data.Articles || []; // Fallback to an empty array if Articles is not defined

        const fetchedAuthor: Author = {
          pictureUrl: response.data.profileImage
            ? `http://localhost:5000/${response.data.profileImage.replace(/\\/g, '/')}`
            : 'default-image-url', // Replace with a placeholder if no image is provided
          name: response.data.name || 'Unknown Author',
          bio: response.data.bio || 'No biography available.',
          contributions: Array.isArray(articles)
            ? articles.map((article: { title: string; id: number }) => ({
                title: article.title,
                link: `/articles/${article.id}`
              }))
            : [] // Use an empty array if Articles is not an array
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
      <h1>{author.name}</h1>
      <p>{author.bio}</p>
      <h2>Contributions</h2>
      <ul>
        {author.contributions.map((contribution, index) => (
          <li key={index}>
            <a href={contribution.link}>{contribution.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorBio;
