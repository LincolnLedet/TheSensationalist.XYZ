// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Adjust the path if necessary
import AnimatedHeader from './components/AnimatedHeader'; // Adjust the path
import Home from './pages/HomePage'; // Adjust the path
import Article from './pages/ArticlePage'; // Adjust the path
import LoginPage from './pages/LoginPage'; // Adjust the path
import RegisterPage from './pages/RegisterPage'; // Adjust the path

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:id" element={<Article />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

