import React from "react";
import Header from "@/components/Header";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function Home() {
  const { t, i18n } = useTranslation();

  if (!i18n.isInitialized) {
    return <p>Loading...</p>;
  }

  // Função para mudar o idioma
  const changeLanguage = (lng: "en" | "pt") => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <Header animeList={[]} selectedAnime="" onSelectAnime={() => {}} />
      <div className="home">
        <section className="home-section">
          <h1>{t("title")}</h1>
          <p>{t("description")}</p>
          <button onClick={() => changeLanguage("en")}>🇺🇸 English</button>
          <button onClick={() => changeLanguage("pt")}>🇧🇷 Português</button>
        </section>
        <section className="style-section-container">
          <h2>There are different types of fighters to suit your style:</h2>
          <div className="style-section">
            <div>
              <Image 
                src="/images/martialartist.png"
                alt="Martial Artist image"
                width={500}
                height={300}
              />
              <p>ARTISTA MARCIAL</p>
            </div>
            <div>
              
            </div>
            <div>
              
            </div>
            <div>
              
            </div>
          </div>
        </section>
        <section></section>
        <section></section>
        <section></section>
      </div>
    </>
  );
}
