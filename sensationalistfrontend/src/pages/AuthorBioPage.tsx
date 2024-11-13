import React from 'react';
<<<<<<< HEAD
import AuthorBio from '../components/AuthorBio';
import axios from 'axios';
import './AuthorBioPage.css';

const AuthorBioPage: React.FC = () => {
    const dummyData = {
      pictureUrl: 'https://via.placeholder.com/150',
      name: 'Frankie Vinehardt',
      bio: 'Frankie Vinehardt is a writer for The Sensationalist, known for witty perspectives and thought-provoking articles.',
      contributions: [
        { title: 'The Sensationalist Issue #8', link: '#' },
        { title: 'On Placebos and Humanity', link: '#' },
        { title: 'Hot Dog Art and Cultural Commentary', link: '#' },
      ],
    };
  
    return (
      <div className="author-bio-page">
        <AuthorBio {...dummyData} />
      </div>
    );
  };

export default AuthorBioPage;
export {};
=======
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
>>>>>>> Links-Branch
