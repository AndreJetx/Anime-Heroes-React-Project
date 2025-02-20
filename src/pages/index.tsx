import React from "react";
import Header from "@/components/Header";
import Section from "@/components/Section";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <>
      <Header animeList={[]} selectedAnime="" onSelectAnime={() => {}} />

      <Section />

      <Footer />

    </>
  );
}
