import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedHeader from '../components/AnimatedHeader';  // Adjust the import path
import TopAuthors from '../components/TopAuthors';
import IssueModule from '../components/IssueModule';  // Adjust the import path
import LatestContent from '../components/LatestContent';  // Adjust the import path
import './HomePage.css'; // Import the CSS file

const HomePage: React.FC = () => {
  return (
    <div className="main-container">
      <div className="grid-container">
          <div className="header">
              <AnimatedHeader />
          </div>
<<<<<<< HEAD
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link to="/author-bio">
            <button className="author-bio-button">Visit Author Bio</button>
          </Link>
        </div>
          <div className="topAriticals">
              <TopArticals />
=======
          <div className="TopAuthors">
              <TopAuthors />
>>>>>>> Links-Branch
          </div>
          <div className="IssueModule">
              <IssueModule />
          </div>
          <div className="latestContent">
              <LatestContent />
          </div>
      </div>
    </div>
  );
};

export default HomePage;