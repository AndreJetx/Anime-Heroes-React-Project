import React from "react";
import { useRouter } from "next/router";
import AnimeFilter from "./AnimeFilter";
import "@/styles/header.css";
import Link from "next/link"
import Image from "next/image";

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
        <Image src="/images/logo.png" alt="Anime Heroes Allstar Clash" width={500} height={300} />
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
          <li><Link href="/">Home</Link></li>
          <li><Link href="/characters">Personagens</Link></li>
          <li><Link href="/guide">Guia</Link></li>
          <li><Link href="/download">Download</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
