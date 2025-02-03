import React, { useEffect, useState } from "react";

interface Character {
  id: string;
  imageUrl: string;
}

const CharacterCard: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/characters")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Falha ao buscar personagens");
        }
        return response.json();
      })
      .then((data: Character[]) => setCharacters(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">Carregando...</p>;
  if (error) return <p className="text-center text-red-500">Erro: {error}</p>;

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {characters.map(({ id, imageUrl }) => (
        <div key={id} className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform">
          <img className="w-full h-auto rounded-lg" src={imageUrl} alt="Imagem do personagem" />
        </div>
      ))}
    </section>
  );
};

export default CharacterCard;
