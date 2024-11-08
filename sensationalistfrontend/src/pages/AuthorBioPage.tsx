import React from 'react';
import AuthorBio from '../components/AuthorBio'; // Make sure this path is correct
import AnimatedHeader from '../components/AnimatedHeader';
import './AuthorBioPage.css';

const AuthorPage: React.FC = () => {
  return (
    <div className = "Author-Bio-Page">
      <div className="header">
        <AnimatedHeader />
      </div>
      <div className="author-page">
        <AuthorBio />
      </div>
    </div>
  );
};

export default AuthorPage;
