import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './AnimatedHeader.css';
import { ReactComponent as SensationalLogo } from './SVGs/SensationalistLogo.svg';
import { ReactComponent as InstaLogo } from './SVGs/instagram-svgrepo-com.svg';

const AnimatedHeader: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error('AuthContext must be used within an AuthProvider');

  const { auth, logout } = authContext;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="NavHeaderContainer">
      <div className="NavHeader">
        <div className="LogoContainer">
          <a href="/" className="Media-Logo" aria-label="Homepage">
            <SensationalLogo className="logo" />
          </a>
        </div>

        <nav>
          <ul className="nav-links">
            <li><a href="/search">SEARCH</a></li>
            <li><a href="/events">EVENTS</a></li>
            <li><a href="/artists">ARTISTS</a></li>
            <li><a href="/music">MUSIC</a></li>
            <li><a href="/shop">SHOP</a></li>
          </ul>
        </nav>

        <ul className="Media-Logos">
          <a
            href="https://www.instagram.com/thesensationalist_mag/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstaLogo className="InstaLogo" />
          </a>

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
