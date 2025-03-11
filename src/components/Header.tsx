import React from "react";
import { useRouter } from "next/router";
import AnimeFilter from "./AnimeFilter";
import Link from "next/link"
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  animeList: { name: string; logoUrl: string }[];
  selectedAnime: string;
  onSelectAnime: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ animeList, selectedAnime, onSelectAnime }) => {

  const {t, i18n } = useTranslation();
  
  const router = useRouter();

  if (!i18n.isInitialized) {
      return <p>Loading...</p>;
    }
  
    // Função para mudar o idioma
    const changeLanguage = (lng: "en" | "pt" | "es" |"jp") => {
      i18n.changeLanguage(lng);
    };

  

  const isCharacterPage = router.pathname.startsWith("/characters");

  return (
    <header className="header-container">
      <div className="logo">
        <Image src="/images/logo.png" alt="Anime Heroes Allstar Clash" width={80} height={80} />
        <div>
          <button className="buttonlg" onClick={() => changeLanguage("pt")}>
            <Image 
                src="/images/pt.png"
                alt="English language"
                width={80} height={80} /> 
          </button>
          <button className="buttonlg" onClick={() => changeLanguage("en")}>
            <Image 
              src="/images/en.png"
              alt="English language"
              width={80} height={80} />           
          </button>
          <button className="buttonlg" onClick={() => changeLanguage("es")}>
            <Image 
                src="/images/es.png"
                alt="English language"
                width={80} height={80} /> 
          </button>
          <button className="buttonlg" onClick={() => changeLanguage("jp")}>
            <Image 
                src="/images/jp.png"
                alt="English language"
                width={80} height={80} /> 
          </button>
        </div>
      </div>

      {isCharacterPage &&  (
        <AnimeFilter 
          animeList={animeList} 
          selectedAnime={selectedAnime} 
          onSelectAnime={onSelectAnime} 
        />
      )}

      <nav className="nav">
        <ul>
          <li><Link href="/">{t("navhome")}</Link></li>
          <li><Link href="/characters">{t("navcharacters")}</Link></li>
          <li><Link href="/guide">{t("navguide")}</Link></li>
          <li><Link href="/#download">{t("navdownload")}</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
