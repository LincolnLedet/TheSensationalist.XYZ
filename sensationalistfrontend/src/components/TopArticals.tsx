import React from 'react';
import './TopArticals.css'; // Import the CSS file
import Image1 from './Images/The-Sensationalist-7.png';
import Image2 from './Images/The-Sensationalist-8.png';
import Image3 from './Images/The-Sensationalist-13.png';
import Image4 from './Images/The-Sensationalist-15.png';

const TopArticals: React.FC = () => {
  const handleClick = (imageName: string) => {
    console.log(`${imageName} clicked!`);
  };

  const images = [
    { src: Image1, description: 'Artical 70' },
    { src: Image2, description: 'Artical 8' },
    { src: Image3, description: 'Artical 13' },
    { src: Image4, description: 'Artical 15' }
  ];

  return (
    <div className="image-gallery">
      {images.map((image, index) => (
        <div key={index} className="image-container">
          <button onClick={() => handleClick(image.description)} className="image-button">
            <img src={image.src} alt={image.description} className="image" />
          </button>
          <p>{image.description}</p>
        </div>
        
      ))}
    </div>
  );
};

export default TopArticals;
