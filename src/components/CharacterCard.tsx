import React from "react";
import Image from "next/image";

interface Character {
  _id: string;
  anime: string;
  name: string;
  imageUrl: string;
  gifUrl: string;
  power: string;
}

interface CharacterCardProps {
  characters: Character[];
  onCharacterClick: (character: Character) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ characters, onCharacterClick }) => {
  return (
    <div className="personagens">
      <ul className="lista-de-personagem">
        {characters.length === 0 ? (
          <p>Nenhum personagem encontrado para este anime.</p>
        ) : (
          characters.map((char) => (
            <li key={char._id} className="character-card" onClick={() => onCharacterClick(char)}>
              <Image
                src={char.imageUrl}
                alt={char.name}
                className="character-image"
                width={100}
                height={100}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CharacterCard;
