import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './TopAuthors.css'; // Import the CSS file
const backend_port = process.env.REACT_APP_BACKEND_PORT;

// Define the structure of an author
interface Author {
  id: number;
  name: string;
  bio: string;
  profileImage: string;
}

const TopAuthors: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  // Fetch authors from the backend
  useEffect(() => {
    axios.get(`http://localhost:${backend_port}/api/articles/authors`)
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
              src={`http://localhost:${backend_port}/${author.profileImage.replace(/\\/g, '/')}`}
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
