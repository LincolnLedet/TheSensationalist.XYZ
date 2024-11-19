import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IssueModule.css';

// Define the structure of an author
interface Author {
  id: number;
  name: string;
  bio: string;
  coverImage: string; // URL for the author's profile image
}

const IssueModule: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/articles/authors')
      .then(response => {
        const fetchedAuthors: Author[] = response.data.map((author: any) => ({
          id: author.id,
          name: author.name,
          bio: author.bio,
          coverImage: author.profileImage
            ? `http://localhost:5000/${author.profileImage.replace(/\\/g, '/')}`
            : 'default-profile-image-url', // Replace with a placeholder if no image is provided
        }));
        setAuthors(fetchedAuthors);
      })
      .catch(error => {
        console.error("Error fetching authors:", error);
      });
  }, []);

  return (
    <div>
      <h1>Authors</h1>
      {authors.length > 0 ? (
        <div className="author-list">
          {authors.map((author) => (
            <div key={author.id} className="author-card">
              <img
                src={author.coverImage}
                alt={`${author.name}'s profile`}
                className="author-image"
              />
              <h2>{author.name}</h2>
              <p>{author.bio}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No authors found.</p>
      )}
    </div>
  );
};

export default IssueModule;
