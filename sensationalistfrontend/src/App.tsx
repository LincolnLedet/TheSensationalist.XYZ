import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import Home from './pages/HomePage';
import Article from './pages/ArticlePage';
import AuthorBioPage from './pages/AuthorBioPage';
=======
import { AuthProvider } from './AuthContext'; // Adjust the path if necessary
import AuthorBio from './pages/AuthorBioPage'; // Adjust the path if necessary
import Home from './pages/HomePage'; // Adjust the path if necessary
import Article from './pages/ArticlePage'; // Adjust the path if necessary
import LoginPage from './pages/LoginPage'; // Adjust the path if necessary
import RegisterPage from './pages/RegisterPage'; // Adjust the path if necessary
import ShopPage from './pages/ShopPage'; // Adjust the path if necessary
import ItemDetailsPage from './pages/ItemDetailsPage'; // Adjust the path if necessary
import CartPage from './pages/CartPage'; // Adjust the path if necessary
import SearchPage from './pages/SearchPage'; // Adjust the path if necessary
>>>>>>> Links-Branch


import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_51QJpMUKOKaB0dvgSSJvDBr5fpfpMgkD5UScLZowuZN5Sdplp27SIeUk6Qj3nlZRXb7wYIx26iMdnAaPrmnzHONEH00rqenrKPn');

const App: React.FC = () => {
  return (
<<<<<<< HEAD
    <Router>
    
      <div>
        {/* You can include a header or navigation component here if needed */}
=======
    <AuthProvider>
      <Router>
>>>>>>> Links-Branch
        <Routes>
          <Route path="/" element={<Home />} />
<<<<<<< HEAD
          {/* Dynamic route for Article IDS */}
          <Route path="/articles/:id" element={<Article />} /> 
          <Route path="/author-bio" Component={AuthorBioPage} />
=======
          <Route path="/articles/:id" element={<Article />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/authors/:id" element={<AuthorBio />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/item/:id" element={<ItemDetailsPage />} />
          <Route path="/search" element={<SearchPage />} />


          {/* Wrap the cart route with the Stripe Elements provider */}
          <Route
            path="/cart"
            element={
              <Elements stripe={stripePromise}>
                <CartPage />
              </Elements>
            }
          />
>>>>>>> Links-Branch
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
