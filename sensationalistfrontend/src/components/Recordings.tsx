import React, { useState, useEffect } from "react";
import "./Recordings.css";
import ArtistCard from "./ArtistCard";
import axios from "axios";
import {Link} from 'react-router-dom';

interface Band {
  id: string;
  title: string;
  genre: string;
  landingImage: string;
  description: string;
}


const Recordings: React.FC = () => {
  const [bands, setBands] = useState<Band[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get<Band[]>("https://www.the-sensationalist.xyz/api/bands")
      .then((response) => {
        setBands(response.data); // log jason
        console.log("Bands fetched:", response.data);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bands:", err);
        setError("Error fetching band data.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="recordingSection">
      <p>MUSIC</p>

      <div className="video-overlay">
        <video className="video-background" autoPlay loop muted playsInline>
          <source src="/videos/backGroundVid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="bandCardContainers">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          bands.map((band) => (
            <Link to={`/bands/${band.title.toLowerCase().replace(/\s+/g, '-')}`}>
            <ArtistCard
              key={band.id}
              name={band.title}
              genre={band.genre}
              description ={band.description}
              image={`https://www.the-sensationalist.xyz/api/uploads/images/${band.landingImage}
              `}
            />
            </Link>
            
          
          ))
        )}
      </div>
      
    </div>
  );
};

export default Recordings;
