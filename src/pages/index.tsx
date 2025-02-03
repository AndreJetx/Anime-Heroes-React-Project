import React, { useState, useEffect } from "react";
import CharacterCard from "../components/CharacterCard";
import "../styles/pagesIndex.css"; // Importando o CSS

interface Character {
  _id: string;
  name: string;
  power: string;
  imageUrl: string;
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    fetch("/api/characters")
      .then((res) => res.json())
      .then((data: Character[]) => setCharacters(data));
  }, []);

  return (
    <div className="home-container">
      <h1 className="title">Anime Heroes Allstar Clash</h1>
      <p className="subtitle">Lista de personagens</p>

      <div className="character-list-container">
        <h2 className="section-title">Personagens</h2>
        <ul className="character-grid">
          {characters.map((char) => (
            <CharacterCard key={char._id} imageUrl={char.imageUrl} name={char.name} />
          ))}
        </ul>
      </div>
    </div>
  );
}
