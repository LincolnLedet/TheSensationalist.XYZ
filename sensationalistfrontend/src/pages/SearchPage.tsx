import React from 'react';
import SeachComponent from '../components/SearchComponent';
import AnimatedHeader from '../components/AnimatedHeader';
import Footer from '../components/Footer';

const ItemDetailspage: React.FC = () => {
  return (
    <div className="SearchPage">
      <div className="search-header">
        <AnimatedHeader/>
      </div>
      <div className="search-item-details">
        <SeachComponent/>
      </div>
      <footer className="search-footer">
        <Footer/>
      </footer>
    </div>
  );
};

export default ItemDetailspage;
