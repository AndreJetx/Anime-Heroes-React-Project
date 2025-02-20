import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface Character {
  _id: string;
  name: string;
  gifUrl?: string;
  power: string;
}

interface CharacterSelectionProps {
  characters: Character[];
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({ characters }) => {
  
  const { t } = useTranslation();

  const validCharacter = characters[0];

  return (
    <div className="gif-container">
      {validCharacter?.gifUrl ? (
        <div className="gif-item">
          <Image
            src={validCharacter.gifUrl}
            alt={`GIF de ${validCharacter.name}`}
            className="gif-image"
            width={300}
            height={300}
            unoptimized
          />
          <div className="character-info">
            <h3>{validCharacter.name}</h3>
            <p>{t(validCharacter.power)}</p>
          </div>
        </div>
      ) : (
        <p>{t("gifalt")}</p>
      )}
    </div>

  );
};

export default CharacterSelection;