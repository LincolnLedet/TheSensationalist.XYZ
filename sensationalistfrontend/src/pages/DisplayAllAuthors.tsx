import React from 'react';
import AuthorsList from '../components/AuthorsList'; // Make sure this path is correct
import AnimatedHeader from '../components/AnimatedHeader';
const AuthorPage: React.FC = () => {
  return (
    <div className="ItemDetailspage" style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <div className="header">
        <AnimatedHeader />
      </div>
      <div className="Cart">
        <AuthorsList />
      </div>
    </div>
  );
};

export default AuthorPage;
