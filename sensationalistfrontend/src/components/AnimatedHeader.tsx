// AnimatedHeader.tsx
import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import './AnimatedHeader.css';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SensationalLogo } from './SVGs/SensationalistLogo.svg';
import { ReactComponent as InstaLogo } from './SVGs/instagram-svgrepo-com.svg';
import { ReactComponent as EmailLogo } from './SVGs/email-svgrepo-com.svg';

const AnimatedHeader: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }
  

  const { auth, logout } = authContext;
  console.log('Auth state in header:', auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Optionally redirect to home page
  };

  return (
    <div className="NavHeaderContainer">
      <div className="NavHeader">
        <SensationalLogo className="logo" />
        <ul className="nav-links">
          <li><a href="shop">SHOP</a></li>
          <li><a href="#about">MAGAZINE</a></li>
          <li><a href="#services">COMMUNITY</a></li>
        </ul>
        <ul className="Media-Logos">
          <a href="https://www.instagram.com/thesensationalist_mag/" target="_blank" rel="noopener noreferrer">
            <InstaLogo className="InstaLogo" />
          </a>
          <a href="mailto:frankievinehardt3@gmail.com" target="_blank" rel="noopener noreferrer">
            <EmailLogo className="EmailLogo" />
          </a>

          <div className="SearchBarContainer">
            <input
              type="search"
              placeholder="Search..."
              className="SearchBar"
            />
          </div>

          {/* Conditionally render based on login state */}
          {auth.isLoggedIn && auth.user ? (
            <div className="user-menu">
              <span>Welcome, {auth.user.username}!</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <>
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AnimatedHeader;
