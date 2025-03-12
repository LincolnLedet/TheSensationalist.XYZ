import React from "react";
import AnimatedHeader from "../components/AnimatedHeader"; // Adjust the import path
import TopAuthors from "../components/TopAuthors";
import IssueModule from "../components/IssueModule"; // Adjust the import path
import VolumeModule from "../components/VolumeModule"; // Adjust the import path
import Footer from "../components/Footer";
import LatestArticle from "../components/LatestArticle";
import Recordings from "../components/Recordings";
import "./HomePage.css"; // Import the CSS file

const HomePage: React.FC = () => {
  return (
    <div className="landing-container">
      <div className="header">
        <AnimatedHeader />
      </div>
      <div className="HomepageTitle">
        <h3>OUR PUBLICATIONS</h3>
        <hr className="latest-line"></hr>
      </div>

      <div className="grid-container">
        
        <div className="IssueModule">
          <IssueModule />
        </div>
        <div className="LatestContentAndVolumes">
          <LatestArticle />
          <VolumeModule />
        </div>
        
      </div>
      


      <div className="Final Fridays">
        <Recordings />
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
