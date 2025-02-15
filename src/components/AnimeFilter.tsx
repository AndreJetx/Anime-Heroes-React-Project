import React, { useState } from "react";
import '@/styles/AnimeFilter.css'
import Image from "next/image";

interface AnimeFilterProps {
  animeList: { name: string; logoUrl: string }[];
  selectedAnime: string;
  onSelectAnime: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const AnimeFilter: React.FC<AnimeFilterProps> = ({ animeList, selectedAnime, onSelectAnime }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (name: string) => {
    const fakeEvent = { target: { value: name } } as React.ChangeEvent<HTMLSelectElement>;
    onSelectAnime(fakeEvent);
    setIsOpen(false);
  };

  const selectedAnimeObj = animeList?.find((anime) => anime.name === selectedAnime);

  return (
    <div className="anime-filter">
      <label htmlFor="anime-select">Selecione um Anime:</label>

      <div className="custom-select" onClick={toggleSelect}>
        {selectedAnimeObj && (
          <Image src={selectedAnimeObj.logoUrl} alt={selectedAnimeObj.name} width={500} height={300} />
        )}
      </div>

      {isOpen && (
        <div className="options active">
          {animeList.map((anime) => (
            <div key={anime.name} onClick={() => handleOptionClick(anime.name)}>
              <Image 
                src={anime.logoUrl}
                alt={anime.name}
                width={100}
                height={100}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimeFilter;
