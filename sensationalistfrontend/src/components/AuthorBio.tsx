import React from 'react';
import './AuthorBio.css';

interface AuthorBioProps {
  pictureUrl: string;
  name: string;
  bio: string;
  contributions: { title: string; link: string }[];
}

const AuthorBio: React.FC<AuthorBioProps> = ({ pictureUrl, name, bio, contributions }) => {
    return (
      <div className="author-bio-container">
        <div className="author-bio-picture">
          <img src={pictureUrl} alt={`${name}'s profile`} />
        </div>
  
        <h2>{name}</h2>
        <p className="author-bio-bio">{bio}</p>
  
        <div className="author-bio-contributions">
          <h3>Articles & Issues Contributed</h3>
          <ul>
            {contributions.map((contribution, index) => (
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
export {};