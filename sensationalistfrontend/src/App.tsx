// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Adjust the path if necessary
import AuthorBio from './pages/AuthorBioPage'; // Adjust the path
import Home from './pages/HomePage'; // Adjust the path
import Article from './pages/ArticlePage'; // Adjust the path
import LoginPage from './pages/LoginPage'; // Adjust the path
import RegisterPage from './pages/RegisterPage'; // Adjust the path
import ShopPage from './pages/ShopPage';
import ItemDetailsPage from './pages/ItemDetailsPage';
import CartPage from './pages/CartPage';



const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:id" element={<Article />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/authors/:id" element={<AuthorBio />} />
          <Route path="/shop" element={<ShopPage/>} />
          <Route path="/item/:id" element={<ItemDetailsPage />} /> {/* Dynamic route */}
          <Route path="/cart" element={<CartPage />} /> {/* Dynamic route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

