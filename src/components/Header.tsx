import React from "react";
import { useRouter } from "next/router";
import AnimeFilter from "./AnimeFilter";
import "@/styles/header.css";

interface HeaderProps {
  animeList: { name: string; logoUrl: string }[];
  selectedAnime: string;
  onSelectAnime: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ animeList, selectedAnime, onSelectAnime }) => {
  const router = useRouter();

  return (
    <header className="header-container">
      <div className="logo">
        <img src="/images/logo.png" alt="Anime Heroes Allstar Clash" />
      </div>

      {router.pathname === "/characters" && (
        <AnimeFilter 
          animeList={animeList} 
          selectedAnime={selectedAnime} 
          onSelectAnime={onSelectAnime} 
        />
      )}

      <nav className="nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/characters">Personagens</a></li>
          <li><a href="/guide">Guia</a></li>
          <li><a href="/download">Download</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
