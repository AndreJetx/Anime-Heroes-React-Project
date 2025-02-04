import React from "react";

interface AnimeFilterProps {
  animeList: string[];
  selectedAnime: string;
  onSelectAnime: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const AnimeFilter: React.FC<AnimeFilterProps> = ({ animeList, selectedAnime, onSelectAnime }) => {
  return (
    <div className="anime-filter">
      <label htmlFor="anime-select">Selecione um Anime:</label>
      <select id="anime-select" value={selectedAnime} onChange={onSelectAnime}>
        {animeList.map((anime) => (
          <option key={anime} value={anime}>
            {anime}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AnimeFilter;
