import React from 'react';
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