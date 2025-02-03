import React, { useEffect, useState } from "react";

interface Character {
  name: string;
  gif: string;
  power: string;
}

const CharacterSelection: React.FC = () => {
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    fetch("/api/characters/selected")
      .then((response) => response.json())
      .then((data) => setCharacter(data))
      .catch((error) => console.error("Erro ao carregar personagem:", error));
  }, []);

  if (!character) {
    return <p>Carregando...</p>;
  }

  return (
    <section className="personagem-selecionado">
      <img className="personagem-grande" src={character.gif} alt={`Personagem Selecionado: ${character.name}`} />
      <div className="informacao-personagem">
        <h2 className="nome-personagem">{character.name}</h2>
        <p className="descricao-personagem">{character.power}</p>
      </div>
    </section>
  );
};

export default CharacterSelection;
