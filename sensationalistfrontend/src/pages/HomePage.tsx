import React from 'react';
import AnimatedHeader from '../components/AnimatedHeader';  // Adjust the import path
import TopArticals from '../components/TopArticals';
import AnarchyArchive from '../components/AnarchyArchive';  // Adjust the import path
import './HomePage.css'; // Import the CSS file

const HomePage: React.FC = () => {
  return (
    <div className="main-container">
      <AnimatedHeader />
      <TopArticals />
      <AnarchyArchive />
    </div>
  );
};

export default HomePage;