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
          <li><a href="#home">SHOP</a></li>
          <li><a href="#about">MAGAZINE</a></li>
          <li><a href="#services">COMMUNITY</a></li>
        </ul>
        <ul className="Media-Logos">
          <a href="https://www.instagram.com/thesensationalist_mag/" target="_blank" rel="noopener noreferrer">
            <InstaLogo className="InstaLogo" /> {/* Use the SVG as a component */}
           </a>
           <a href="mailto:frankievinehardt3@gmail.com" target="_blank" rel="noopener noreferrer">
            <EmailLogo className="EmailLogo" /> {/* Use the SVG as a component */}
          </a>

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

