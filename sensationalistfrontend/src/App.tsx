import React from 'react';
import AnimatedHeader from './components/AnimatedHeader';  // Adjust the import path
import TopArticals from './components/TopArticals';  // Adjust the import path
import './App.css'; // Import the CSS file

const App: React.FC = () => {
  return (
    <div className="main-container">
      <AnimatedHeader />
      <TopArticals />
    </div>
  );
};

export default App;