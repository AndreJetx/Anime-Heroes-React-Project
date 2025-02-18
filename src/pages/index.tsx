import React from "react";
import Header from "@/components/Header";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function Home() {
  const { t } = useTranslation();


  return (
    <>
      <Header animeList={[]} selectedAnime="" onSelectAnime={() => {}} />
      <div className="home">
        <section className="home-section">
          <h1>{t("titlehome")}</h1>
          <p>{t("descriptionhome")}</p>
        </section>
        <section className="style-section-container">
          <h2>{t("styledescription")}</h2>
          <div className="style-section">
            <div>
              <Image 
                src="/images/martialartist.png"
                alt="Martial Artist image"
                width={500}
                height={300}
              />
              <p>{t("stylemartialartist")}</p>
            </div>
            <div>
              <Image 
                src="/images/swordsman.png"
                alt="Swordsman image"
                width={500}
                height={300}
              />
              <p>{t("styleswordsman")}</p>
            </div>
            <div>
              <Image 
                src="/images/mage.png"
                alt="Mage image"
                width={500}
                height={300}
              />
              <p>{t("stylemage")}</p>
            </div>
            <div>
              <Image 
                src="/images/magicfist.png"
                alt="Magic Fist image"
                width={500}
                height={300}
              />
              <p>{t("stylemagicfist")}</p>
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
