import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import './UserInfo.css';

interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;
  subscription?: boolean;
  role?: string;
}

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000' // Backend URL in development
    : ''; // In production, requests default to the same origin

const UserInfo: React.FC = () => {
    const authContext = useContext(AuthContext);
    const [userData, setUserData] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    if (!authContext) {
      throw new Error('AuthContext must be used within an AuthProvider');
    }
  
    const { auth } = authContext;
  
    console.log('Auth State:', auth); // Add this line
  
    useEffect(() => {
      console.log('Inside useEffect'); // Add this line
      console.log('Auth State in useEffect:', auth); // Add this line
  
      if (auth.isLoggedIn && auth.user && auth.token) {
        console.log('Making axios request'); // Add this line
        axios
          .get(`${baseURL}/api/auth/users/${auth.user.id}`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          })
          .then((response) => {
            console.log('Axios response:', response.data); // Add this line
            setUserData(response.data);
            console.log('Rendering UserInfo component. userData:', userData);

          })
          .catch((err) => {
            console.error('Error fetching user data:', err);
            setError('Failed to load user information.');
          });
      } else {
        console.log('Not logged in or missing auth data'); // Add this line
      }
    }, [auth]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!auth.isLoggedIn) {
    return <div>Please log in to view your information.</div>;
  }

  if (!userData) {
    return <div>Loading user information...</div>;
  }
  return (
    <div className="user-info-container">
      <h2 className="user-info-heading">User Information</h2>
      <div className="user-info-details">
        <div className="user-info-item">
          <strong>Username:</strong> {userData.username}
        </div>
        <div className="user-info-item">
          <strong>Email:</strong> {userData.email}
        </div>
        <div className="user-info-item">
          <strong>Phone:</strong>{' '}
          {userData.phone ? userData.phone : 'Not provided'}
        </div>
        <div className="user-info-item">
          <strong>Subscription:</strong>{' '}
          {userData.subscription ? 'Active' : 'Inactive'}
        </div>
        <div className="user-info-item">
          <strong>Role:</strong> {userData.role}
        </div>
      </div>
    </div>
  );
};


export default UserInfo;
