import React, { useState } from "react";

interface Character {
  name: string;
  power: string;
  gifUrl: string;
}

interface CharacterSelectionProps {
  character: Character | null;
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({ character }) => {
  return (
    <div className="character-selection">
      {character ? (
        <div>
          <h3>{character.name}</h3>
          <p><strong>Poder:</strong> {character.power}</p>
          <img
            src={character.gifUrl}
            alt={`${character.name} GIF`}
            className="character-gif"
            width={150}
            height={150}
          />
        </div>
      ) : (
        <p>Selecione um personagem para ver detalhes.</p>
      )}
    </div>
  );
};

export default CharacterSelection;
