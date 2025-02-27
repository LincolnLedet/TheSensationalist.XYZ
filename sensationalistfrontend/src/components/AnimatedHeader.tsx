import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import './AnimatedHeader.css';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SensationalLogo } from './SVGs/SensationalistLogo.svg';
import { ReactComponent as InstaLogo } from './SVGs/instagram-svgrepo-com.svg';
import { ReactComponent as EmailLogo } from './SVGs/email-svgrepo-com.svg';


const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'https://the-sensationalist.xyz' // Backend URL in development
    : ''; // In production, requests default to the same origin
    
const AnimatedHeader: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const [count, setCount] = useState(1);
  const [mouseIn, setMouseIn] = useState(false);

  const handleMouse = () => {
    if (mouseIn) return;
    const element = document.getElementById(`handleMouse${count}`);
    if (element) {
      element.classList.toggle('hover');
    }
    setCount((prev) => prev + 1);
  };

  const reset = () => {
    setCount(1);
    const hoverElements = document.querySelectorAll('.hover');
    hoverElements.forEach((el) => el.classList.remove('hover'));
  };

  useEffect(() => {
    const timeouts = [
      setTimeout(handleMouse, 500),
      setTimeout(handleMouse, 700),
      setTimeout(handleMouse, 900),
      setTimeout(handleMouse, 2000),
      setTimeout(handleMouse, 2500),
      setTimeout(handleMouse, 2750),
      setTimeout(handleMouse, 3050),
    ];

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [mouseIn]);

  useEffect(() => {
    const handleMouseOver = () => {
      setMouseIn(true);
      reset();
    };
    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, []);

  const { auth, logout } = authContext;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Optionally redirect to home page
  };

  return (
    <div className="NavHeaderContainer">
      <div className="NavHeader">
        <a href="/" className="Media-Logo" aria-label="Homepage">
          <SensationalLogo className="logo" />
        </a>
        <nav>
          <ul className="nav-links">
            <li>
              <a href="#">COMMUNITY</a>
              <ul>
                <li><a href="/authors">Our Authors</a></li>
                <li><a href="mailto:frankievinehardt3@gmail.com">Submit Yourself</a></li>
              </ul>
            </li>
            <li>
              <a href="#">CONTENT</a>
              <ul>
                <li><a href="/search">Search</a></li>
              </ul>
            </li>
            <li>
              <a href="/shop">SHOP</a>
              <ul>
                <li><a href="/cart">Cart</a></li>
              </ul>
            </li>
          </ul>
        </nav>
        <ul className="Media-Logos">
          <a href="https://www.instagram.com/thesensationalist_mag/" target="_blank" rel="noopener noreferrer">
            <InstaLogo className="InstaLogo" />
          </a>

          {/* Conditionally render based on login state */}
          {auth.isLoggedIn && auth.user ? (
            <div className="user-menu">
              <span>Welcome, {auth.user.username}!</span>
              <button onClick={handleLogout}>Logout</button>
              <button onClick={() => navigate('/userinfo')}>User Info</button>
            </div>
          ) : (
            <span className="auth-links">
              <a href="/login">LOGIN</a>
              <a href="/register">REGISTER</a>
            </span>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AnimatedHeader;
