import React, { useState, useEffect } from "react";
import CharacterCard from "../components/CharacterCard";
import AnimeFilter from "../components/AnimeFilter"; // ✅ Importando o novo componente
import "../styles/pagesIndex.css";

interface Character {
  _id: string;
  name: string;
  power: string;
  imageUrl: string;
  gifUrl: string;
  anime: string;
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<string>("Todos");
  const [animeList, setAnimeList] = useState<string[]>(["Todos"]); // ✅ Garante que "Todos" sempre aparece

  useEffect(() => {
    fetch("/api/characters")
      .then((res) => res.json())
      .then((data: Character[]) => {
        setCharacters(data);
        setFilteredCharacters(data);

        // ✅ Criar lista de animes sem duplicatas
        const uniqueAnimes = Array.from(new Set(data.map((char) => char.anime)));
        setAnimeList(["Todos", ...uniqueAnimes]); // Adiciona "Todos" no início
      });
  }, []);

  const handleAnimeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedAnime(selected);

    if (selected === "Todos") {
      setFilteredCharacters(characters);
    } else {
      setFilteredCharacters(characters.filter((char) => char.anime === selected));
    }
  };

  return (
    <div className="home-container">
      <h1 className="title">Anime Heroes Allstar Clash</h1>
      <p className="subtitle">Lista de personagens</p>

      {/* ✅ Passamos os valores corretamente para o AnimeFilter */}
      <AnimeFilter animeList={animeList} selectedAnime={selectedAnime} onSelectAnime={handleAnimeSelect} />

      <div className="character-selection-container">
        <h2 className="section-title">Personagens Selecionados</h2>
        <CharacterCard characters={filteredCharacters} />
      </div>
    </div>
  );
}
