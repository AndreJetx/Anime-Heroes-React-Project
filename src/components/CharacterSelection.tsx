import React from "react";
import Image from "next/image";

interface Character {
  _id: string;
  name: string;
  gifUrl?: string;
}

interface CharacterSelectionProps {
  characters: Character[];
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({ characters }) => {
  // Garante que characters seja um array válido
  const validCharacters = Array.isArray(characters) ? characters : [];

  // Filtra os personagens que têm gifUrl
  const charactersWithGif = validCharacters.filter((char) => char.gifUrl);

  return (
    <div className="gif-container">
      <ul className="gif-list">
        {charactersWithGif.length === 0 ? (
          <p>Nenhum GIF disponível.</p>
        ) : (
          charactersWithGif.map((char) => (
            <li key={char._id} className="gif-item">
              <Image
                src={char.gifUrl!}
                alt={`GIF de ${char.name}`}
                className="gif-image"
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

export default CharacterSelection;