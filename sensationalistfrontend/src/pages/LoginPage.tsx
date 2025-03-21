import React, { useState, useContext, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Adjust the path if necessary
import './LoginPage.css'; // Your CSS file
import { ReactComponent as SensationalistLogoCropped } from '.././components/SVGs/SensationalistLogoCropped.svg';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'https://the-sensationalist.xyz' // Backend URL in development
    : ''; // Production uses the same origin

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { login } = authContext;

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseURL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log('LoginPage: login response data', data);
      if (response.ok) {
        login(data.token, data.user);
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-page-screen">
      <div className="login-page">

          <h1>Login</h1>

          <form onSubmit={handleLogin}>

            <div className="item">
              <input
                type="text"
                className="input"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <i className='bx bx-user'></i>
            </div>

            <div className="item">
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className='bx bx-lock-alt' ></i>
            </div>

            <button className="login-button" type="submit">Login</button>
          </form>

          <div className="register">
            <p>Don't have an account? <a href="/register">Register</a></p>
          </div>

          <div className="guest">
            <a href="/">Continue as guest</a>
          </div>

      </div>
    </div>
  );
};

export default LoginPage;