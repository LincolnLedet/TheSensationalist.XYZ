import React from "react";
import "./ArtistCard.css";

const ArtistCard: React.FC<{ name: string; genre: string; image: string }> = ({
  name,
  genre,
  image,
}) => {

  console.log(genre);
  return (
    <div className="artist-card">

      <img className="artist-image" src={image} alt={name} />
              <h3>{genre}</h3>
      <div className="artist-info">
        <h3>{name}</h3>
        <h3>{genre}</h3>
      </div>
      
    </div>
  );
};

export default ArtistCard;

