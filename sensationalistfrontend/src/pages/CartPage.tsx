import React from 'react';
import Cart from '../components/Cart'; // Make sure this path is correct
import AnimatedHeader from '../components/AnimatedHeader';
import Footer from '../components/Footer';
import './CartPage.css'; // Ensure this file exists for additional styling

const ItemDetailspage: React.FC = () => {
  return (
    <div className="ItemDetailspage" style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <div className="header">
        <AnimatedHeader />
      </div>
      <div className="Cart">
        <Cart />
      </div>
      <div className="footer">
          <Footer />
      </div>
    </div>
  );
};

export default ItemDetailspage;
