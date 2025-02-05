import React from "react";
import AnimeFilter from "./AnimeFilter";
import "@/styles/header.css";

interface HeaderProps {
  animeList: { name: string; logoUrl: string }[]; // Agora recebe um array de objetos
  selectedAnime: string;
  onSelectAnime: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ animeList, selectedAnime, onSelectAnime }) => {
  return (
    <header className="header-container">
      <div className="logo">
        <img src="/images/logo.png" alt="Anime Heroes Allstar Clash" />
      </div>

      <AnimeFilter 
        animeList={animeList} 
        selectedAnime={selectedAnime} 
        onSelectAnime={onSelectAnime} 
      />

      <nav className="nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">Sobre</a></li>
          <li><a href="/contact">Contato</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
