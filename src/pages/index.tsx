import React, { useState, useEffect } from "react";

interface Character {
  _id: string;
  name: string;
  power: string;
  imageUrl: string;
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    fetch("/api/characters")
      .then((res) => res.json())
      .then((data: Character[]) => setCharacters(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Anime Heroes Allstar Clash</h1>
      <p className="text-center text-gray-300 mb-8">Lista de personagens</p>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Personagens</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((char) => (
            <li key={char._id} className="bg-gray-800 p-4 rounded-xl shadow-lg">
              <img 
                src={char.imageUrl} 
                alt={char.name} 
                className="w-full h-40 object-cover rounded-md mb-3" 
              />
              <h3 className="text-lg font-bold">{char.name}</h3>
              <p className="text-sm text-gray-400">Poder: {char.power}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
