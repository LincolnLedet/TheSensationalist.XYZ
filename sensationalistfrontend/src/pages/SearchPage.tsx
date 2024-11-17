import React from 'react';
import SeachComponent from '../components/SearchComponent'; // Make sure this path is correct
import AnimatedHeader from '../components/AnimatedHeader';

const ItemDetailspage: React.FC = () => {
  return (
    <div className="ItemDetailspage" style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <div className="header">
        <AnimatedHeader />
      </div>
      <div className="ItemDetails">
        <SeachComponent />
      </div>
    </div>
  );
};

export default ItemDetailspage;
