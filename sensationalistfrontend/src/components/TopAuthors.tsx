import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './TopAuthors.css'; // Import the CSS file

// Define the structure of an author
interface Author {
  id: number;
  name: string;
  bio: string;
  profileImage: string;
}

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000' // Backend URL in development
    : ''; // In production, requests default to the same origin

const TopAuthors: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  // Fetch authors from the backend
  useEffect(() => {
    axios.get(`${baseURL}/api/articles/authors`)
      .then(response => {
        setAuthors(response.data);
      })
      .catch(error => {
        console.error("Error fetching authors:", error);
      });
  }, []);

  const handleClick = (authorName: string) => {
    console.log(`${authorName} clicked!`);
  };

  return (
    <div className="image-gallery">
      {authors.map((author) => (
        <div key={author.id} className="image-container">
          <Link to={`/authors/${author.id}`} className="image-link">
            <img
              src={`${baseURL}/${author.profileImage.replace(/\\/g, '/')}`}
              alt={author.name}
              className="image"
            />
          </Link>
          <p>{author.name}</p>
        </div>
      ))}
    </div>
  );
};

export default TopAuthors;
