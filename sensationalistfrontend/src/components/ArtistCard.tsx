import React from "react";
import "./ArtistCard.css";

const ArtistCard: React.FC<{ name: string; genre: string; image: string , description: string}> = ({
  name,
  genre,
  image,
  description
}) => {

  console.log(genre);
  return (
    <div className="artist-card">

      <img className="artist-image" src={image} alt={name} />
              <h3>{description}</h3>
      <div className="artist-info">
        <h3>{name}</h3>
        <h3>{description}</h3>
      </div>
      
    </div>
  );
};

export default ArtistCard;

