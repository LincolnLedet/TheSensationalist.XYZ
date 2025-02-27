import React from 'react';
import AnimatedHeader from '../components/AnimatedHeader';  // Adjust the import path
import TopAuthors from '../components/TopAuthors';
import IssueModule from '../components/IssueModule';  // Adjust the import path
import VolumeModule from '../components/VolumeModule';  // Adjust the import path
import Footer from '../components/Footer';
import LatestArticle from '../components/LatestArticle'
import './HomePage.css'; // Import the CSS file

const HomePage: React.FC = () => {
  return (
    <div className="main-container">
      <div className="grid-container">
          <div className="header">
              <AnimatedHeader />
          </div>
          <div className="LatestArticle">
              <LatestArticle />
          </div>
          <div className="IssueModule">
              <IssueModule />
          </div>
          <div className="LatestVolume">
              <VolumeModule />
          </div>
          <div className="footer">
              <Footer />
          </div>
      </div>
    </div>
  );
};

export default HomePage;