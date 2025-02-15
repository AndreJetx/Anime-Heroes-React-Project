import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<string>("Todos");
  const [animeList, setAnimeList] = useState<{ name: string; logoUrl: string }[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      const filtered = characters.filter((char) => char.anime === selected);
      setFilteredCharacters(filtered);

      if (filtered.length > 0) {
        setSelectedCharacter(filtered[0]);
      }
    }
  };

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
  };

  if (!mounted) return <p>{t("loading")}</p>;

  return (
    <>
      <Header 
        animeList={animeList} 
        selectedAnime={selectedAnime} 
        onSelectAnime={handleAnimeSelect} 
      />

      <div className="home-container">
        <div className="character-selection-container">
          <CharacterCard 
            characters={filteredCharacters}
            onCharacterClick={handleCharacterClick}
          />
        </div>

        <div className="gif-selection-container">
          <CharacterSelection 
            characters={[selectedCharacter]}
          />
        </div>
      </div>
    </>
  );
}
