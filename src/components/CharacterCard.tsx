import React from "react";
import "../styles/CharacterCard.css";

interface CharacterCardProps {
  imageUrl: string;
  name: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ imageUrl, name }) => {
  return (
    <li className="character-card">
      <img src={imageUrl} alt={name} className="character-image" />
    </li>
  );
};

export default CharacterCard;
