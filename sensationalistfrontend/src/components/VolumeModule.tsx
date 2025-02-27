import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './VolumeModule.css';

interface Volume {
  id: number;
  title: string;
  pdfPath: string;
  coverImage: string;
  filetype: string;
}

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'https://the-sensationalist.xyz' // Backend URL in development
    : ''; // In production, requests default to the same origin

const VolumeModule: React.FC = () => {
  const [volumes, setVolumes] = useState<Volume[]>([]);

  useEffect(() => {
    axios.get(`${baseURL}/api/articles`)
      .then(response => {
        const volumeData = response.data.filter((item: Volume) => item.filetype === 'Volume');
        setVolumes(volumeData);
      })
      .catch(error => {
        console.error("Error fetching volumes:", error);
      });
  }, []);

  if (volumes.length === 0) return <div>Loading volumes...</div>;

  return (
    <div className="volume-container">
      <h1>Volumes</h1>
      <div className="latest-content">
        {volumes.map(volume => (
          <Link
            key={volume.id}
            to={`/articles/${volume.id}`} // Corrected this to use volume.id
            className="volume-cover-button"
          >
            <img 
              
              src={`${baseURL}/api/${volume.coverImage.replace(/\\/g, '/')}`}
              crossOrigin="anonymous" 
              alt={volume.title} 
              className="volume-cover-image"
            />
            <h2 className="volume-cover-title">{volume.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VolumeModule;
