import React from 'react';
import AnimatedHeader from '../components/AnimatedHeader';  // Adjust the import path
import TopAuthors from '../components/TopAuthors';
import IssueModule from '../components/IssueModule';  // Adjust the import path
import LatestContent from '../components/LatestContent';  // Adjust the import path
import Footer from '../components/Footer';
import './HomePage.css'; // Import the CSS file

const HomePage: React.FC = () => {
  return (
    <div className="main-container">
      <div className="grid-container">
          <div className="header">
              <AnimatedHeader />
          </div>
          <div className="IssueModule">
              <IssueModule />
          </div>
          <div className="latestContent">
              <LatestContent />
          </div>
          <div className="footer">
              <Footer />
          </div>
      </div>
    </div>
  );
};

export default HomePage;