import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './VolumeModule.css';

interface Volume {
  id: number;
  title: string;
  description: string;
  pdfPath: string;
  coverImage: string;
  filetype: string;
}

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'https://the-sensationalist.xyz'
    : '';

const VolumeModule: React.FC = () => {
  const [volumes, setVolumes] = useState<Volume[]>([]);

  useEffect(() => {
    axios.get(`${baseURL}/api/articles`)
      .then(response => {
        const volumeData = response.data
          .filter((item: Volume) => item.filetype === 'Volume')
          .sort((a: Volume, b: Volume) => b.id - a.id) // Sort by most recent (assuming higher id = newer)
          .slice(0, 2); // Get only the latest 2

        setVolumes(volumeData);
      })
      .catch(error => {
        console.error("Error fetching volumes:", error);
      });
  }, []);

  if (volumes.length === 0) return <div>Loading volumes...</div>;

  return (
    
    <div className="volume-container">
      
        {volumes.map(volume => (
          <Link
            key={volume.id}
            to={`/articles/${volume.id}`}
            style={{ textDecoration: 'none' }}
          >
            <div className="volume-button">
              <img 
                src={`${baseURL}/api/${volume.coverImage.replace(/\\/g, '/')}`}
                crossOrigin="anonymous" 
                alt={volume.title} 
                className="volume-cover-image"
                loading="lazy"  /* Lazy loads images only when they enter the viewport */
              />
              <div className = "volume-bottom-text">
                <h3>{volume.title}</h3>
                <p>{volume.description}</p>
              </div>
            </div>
            
          </Link>
        ))}

    </div>
  );
};

export default VolumeModule;