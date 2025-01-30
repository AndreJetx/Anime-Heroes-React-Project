import React, { useState, useEffect } from "react";

interface Character {
  _id: string;
  name: string;
  power: string;
  imageUrl: string;
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    fetch("/api/characters")
      .then((res) => res.json())
      .then((data: Character[]) => setCharacters(data));
  }, []);

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
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Anime Heroes Allstar Clash</h1>
      <p className="text-center text-gray-300 mb-8">Projeto em migração para Next.js...</p>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Personagens</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((char) => (
            <li key={char._id} className="bg-gray-800 p-4 rounded-xl shadow-lg">
              <img src={char.imageUrl} alt={char.name} className="w-full h-40 object-cover rounded-md mb-3" />
              <h3 className="text-lg font-bold">{char.name}</h3>
              <p className="text-sm text-gray-400">Poder: {char.power}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-md mx-auto mt-10 bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Upload de Imagem</h2>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full p-2 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleUpload}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
        >
          Upload
        </button>

        {imageUrl && (
          <div className="mt-4">
            <h3 className="text-lg font-medium">Imagem enviada:</h3>
            <img src={imageUrl} alt="Uploaded" className="w-full h-40 object-cover rounded-lg mt-2" />
          </div>
        )}
      </div>
    </div>
  );
}
