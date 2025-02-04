import React from "react";
import Image from "next/image";
import "../styles/CharacterCard.css";

interface Character {
  _id: string;
  anime: string;
  name: string;
  imageUrl: string;
}

interface CharacterCardProps {
  characters: Character[];
}

const CharacterCard: React.FC<CharacterCardProps> = ({ characters }) => {
  return (
    <div className="personagens">
      <h2 className="titulo">Personagens</h2>
      <ul className="lista-de-personagem">
        {characters.length === 0 ? (
          <p>Nenhum personagem encontrado para este anime.</p> // Mensagem caso nenhum personagem seja filtrado
        ) : (
          characters.map((char) => (
            <li key={char._id} className="character-card">
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
