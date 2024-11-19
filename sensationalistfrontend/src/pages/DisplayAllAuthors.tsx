import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./DisplayAllAuthors.module.css"; 

interface Author {
  id: number;
  name: string;
  bio: string;
  profileImage: string; 
}

const DisplayAllAuthors: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/articles/authors");
        setAuthors(response.data); // Update state with API response
      } catch (err) {
        setError("Failed to fetch authors.");
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchAuthors();
  }, []); // Empty dependency array ensures this runs once on component mount

  if (loading) return <div>Loading authors...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h1>Our Authors</h1>
      <div className={styles.gridContainer}>
        {authors.map((author) => (
          <div key={author.id} className={styles.authorCard}>
            <img
              src={`http://localhost:5000/${author.profileImage}`}
              alt={`${author.name}'s profile`}
              className={styles.authorImage}
            />
            <h2>{author.name}</h2>
            <p>{author.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayAllAuthors;
