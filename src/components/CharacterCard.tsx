import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <div className="personagens">
      <ul className="lista-de-personagem">
        {characters.length === 0 ? (
          <p>{t("cardcharacteralt")}</p>
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
