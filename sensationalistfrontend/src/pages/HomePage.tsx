import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedHeader from '../components/AnimatedHeader';  // Adjust the import path
import TopArticals from '../components/TopArticals';
import LatestIssues from '../components/LatestIssues';  // Adjust the import path
import LatestContent from '../components/LatestContent';  // Adjust the import path
import './HomePage.css'; // Import the CSS file

const HomePage: React.FC = () => {
  return (
    <div className="main-container">
      <div className="grid-container">
          <div className="header">
              <AnimatedHeader />
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link to="/author-bio">
            <button className="author-bio-button">Visit Author Bio</button>
          </Link>
        </div>
          <div className="topAriticals">
              <TopArticals />
          </div>
          <div className="LatestIssues">
              <LatestIssues />
          </div>
          <div className="latestContent">
              <LatestContent />
          </div>
      </div>
    </div>
  );
};

export default HomePage;