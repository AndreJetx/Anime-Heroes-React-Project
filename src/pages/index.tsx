import React from "react";
import Header from "@/components/Header";
import { useTranslation } from "react-i18next";

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
        <section></section>
        <section></section>
        <section></section>
        <section></section>
      </div>
    </>
  );
}
