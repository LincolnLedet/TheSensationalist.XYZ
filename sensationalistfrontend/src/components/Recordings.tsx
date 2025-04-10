import React, { useState, useEffect } from "react";
import "./Recordings.css";
import ArtistCard from "./ArtistCard";
import axios from "axios";

interface Band {
  id: string;
  name: string;
  genre: string;
  landingImage: string;
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
      <p>FINAL TAKE FRIDAYS</p>

      <div className="video-overlay">
        <video className="video-background" autoPlay loop muted playsInline>
          <source src="/videos/backGroundVid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="RecordTheRanchArtists">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          bands.map((band) => (
            
            <ArtistCard
              key={band.id}
              name={band.name}
              genre={band.genre}
              image={`https://www.the-sensationalist.xyz/api/uploads/images/${band.landingImage}
              `}
            />
            
          
          ))
        )}
      </div>
      
    </div>
  );
};

export default Recordings;
