import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../redux/characterSlice";
import { RootState, AppDispatch } from "../redux/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { characters, loading, error } = useSelector((state: RootState) => state.characters);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.url) setImageUrl(data.url);
  };

  return (
    <div>
      <h1>Anime Heroes Allstar Clash</h1>
      <p>Projeto em migração para Next.js...</p>

      {loading && <p>Carregando personagens...</p>}
      {error && <p>Erro: {error}</p>}

      <h2>Personagens</h2>
      <ul>
        {characters.map((char) => (
          <li key={char._id}>
            <h3>{char.name}</h3>
            <p>Poder: {char.power}</p>
            <img src={char.imageUrl} alt={char.name} width="100" />
          </li>
        ))}
      </ul>

      <h2>Upload de Imagem</h2>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" width="200" />}
    </div>
  );
}
