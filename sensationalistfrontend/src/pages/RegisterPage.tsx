import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; // Create and style your CSS file

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful! Please log in.');
        navigate('/login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container-screen">
      <div className="register-container">
        <h1>Create Account</h1>
        <form onSubmit={handleRegister}>

          <div className="item">
            <input
              type="text"
              className="input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <i className='bx bx-user'></i>
          </div>

          <div className="item">
            <input
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className='bx bx-envelope'></i>
          </div>

          <div className="item">
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className='bx bx-lock-alt' ></i>
          </div>

          <button className="register-button" type="submit">Register</button>
        </form>

        <div className="login">
              <p>Already have an account? <a href="/login">Login</a></p>
        </div>

        <div className="guest">
          <a href="/">Continue as guest</a>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
