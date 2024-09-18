import React from 'react';
import './AnimatedHeader.css'; // Import the CSS file for the Thrasher style
import { ReactComponent as SensationalLogo } from './SVGs/SensationalistLogo.svg';
import { ReactComponent as YoutubeLogo } from './SVGs/youtube-svgrepo-com.svg';
import { ReactComponent as InstaLogo } from './SVGs/instagram-svgrepo-com.svg';
import { ReactComponent as EmailLogo } from './SVGs/email-svgrepo-com.svg';
 // Import SVG as a React component

const AnimatedHeader: React.FC = () => {
  return (
    <div className="NavHeaderContainer">
      <div className="NavHeader">
        <SensationalLogo className="logo" /> {/* Use the SVG as a component */}
        <ul className="nav-links">
          <li><a href="#home">Shop</a></li>
          <li><a href="#about">Magazine</a></li>
          <li><a href="#services">Community</a></li>
        </ul>
        <ul className="Media-Logos">
          <InstaLogo className="InstaLogo" /> {/* Use the SVG as a component */}
          <YoutubeLogo className="YoutubeLogo" /> {/* Use the SVG as a component */}
          <EmailLogo className="EmailLogo" /> {/* Use the SVG as a component */}
          <div className="SearchBarContainer">
            <input 
              type="search" 
              placeholder="Search..." 
              className="SearchBar"
            />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default AnimatedHeader;

