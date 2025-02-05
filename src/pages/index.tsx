import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import CharacterCard from "@/components/CharacterCard";
import CharacterSelection from "@/components/CharacterSelection";
import "@/styles/pagesIndex.css";

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
  const [animeList, setAnimeList] = useState<{ name: string; logoUrl: string }[]>([]);

  useEffect(() => {
    fetch("/api/characters")
      .then((res) => res.json())
      .then((data: Character[]) => {
        setCharacters(data);
        setFilteredCharacters(data);

        const uniqueAnimes = Array.from(new Set(data.map((char) => char.anime)))
          .map((anime) => ({
            name: anime,
            logoUrl: `/images/animes/${anime.toLowerCase().replace(/\s+/g, "-")}.png`,
          }));

        setAnimeList([{ name: "Todos", logoUrl: "/images/logo.png" }, ...uniqueAnimes]);
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
    <>
      <Header 
        animeList={animeList} 
        selectedAnime={selectedAnime} 
        onSelectAnime={handleAnimeSelect} 
      />

      <div className="home-container">
        <h1 className="title">Anime Heroes Allstar Clash</h1>

        <div className="character-selection-container">
          <h2 className="section-title">Personagens</h2>
          <CharacterCard characters={filteredCharacters} />
        </div>

        <div className="gif-selection-container">
          <CharacterSelection characters={filteredCharacters} />
        </div>
      </div>
    </>
  );
}
