import React from 'react';
import ItemDetails from '../components/ItemDetails'; // Make sure this path is correct
import AnimatedHeader from '../components/AnimatedHeader';
import './ItemDetailspage.css'; // Ensure this file exists for additional styling
import Footer from '../components/Footer';

const ItemDetailspage: React.FC = () => {
  return (
    <div className="ItemDetailspage" style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <div className="header">
        <AnimatedHeader />
      </div>
      <div className="ItemDetails">
        <ItemDetails />
      </div>
      <div className="footer">
              <Footer />
          </div>
    </div>
  );
};

export default ItemDetailspage;
