"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

type Unlockable = {
  id: string;
  animeName: string;
  animeImageUrl?: string;
  characterName: string;
  gameMode: string;
  usedCharacter: string;
};

export default function UnlockablesSection() {
  const { t } = useTranslation();
  const [list, setList] = useState<Unlockable[]>([]);

  useEffect(() => {
    fetch("/api/unlockables")
      .then((res) => res.ok ? res.json() : [])
      .then(setList)
      .catch(() => {});
  }, []);

  const byAnime = list.reduce<Record<string, Unlockable[]>>((acc, u) => {
    if (!acc[u.animeName]) acc[u.animeName] = [];
    acc[u.animeName].push(u);
    return acc;
  }, {});

  if (list.length === 0) return null;

  return (
    <div className="unlockable-section">
      {Object.entries(byAnime).map(([animeName, chars]) => (
        <div key={animeName} className="anime-group">
          <div className="anime-header">
            {chars[0]?.animeImageUrl && (
              <Image src={chars[0].animeImageUrl} alt={animeName} width={60} height={60} unoptimized />
            )}
            <h2>{animeName}</h2>
          </div>
          <div className="character-grid">
            {chars.map((char) => (
              <div key={char.id} className="character-unlock-card">
                <div className="unlock-badge">{t("Unlockable")}</div>
                <h3>{char.characterName}</h3>
                <div className="unlock-info">
                  <span><strong>{t("gamemode")}:</strong> {char.gameMode}</span>
                  <span><strong>{t("usedcharacter")}:</strong> {char.usedCharacter}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
