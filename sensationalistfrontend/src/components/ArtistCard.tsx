import React from "react";
import "./ArtistCard.css";

const ArtistCard: React.FC<{ name: string; genre: string; image: string }> = ({
  name,
  genre,
  image,
}) => {
  return (
    <div className="artist-card">
      <img className="artist-image" src={image} alt={name} />
      <div className="artist-info">
        <h3>{name}</h3>
        <p>{genre}</p>
      </div>
    </div>
  );
};

export default ArtistCard;