"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

type Unlockable = {
  id: string;
  animeName: string;
  animeImageUrl?: string | null;
  characterName: string;
  gameMode: string;
  usedCharacter: string;
};

export function UnlockablesList() {
  const { t } = useTranslation();
  const [list, setList] = useState<Unlockable[]>([]);

  useEffect(() => {
    fetch("/api/unlockables")
      .then((res) => (res.ok ? res.json() : []))
      .then(setList)
      .catch(() => setList([]));
  }, []);

  const byAnime = list.reduce<Record<string, Unlockable[]>>((acc, u) => {
    if (!acc[u.animeName]) acc[u.animeName] = [];
    acc[u.animeName].push(u);
    return acc;
  }, {});

  if (list.length === 0) {
    return (
      <p className="text-center text-sm text-zinc-500">{t("unlockablesEmpty")}</p>
    );
  }

  return (
    <div className="flex w-full flex-col gap-10">
      {Object.entries(byAnime).map(([animeName, chars]) => (
        <section key={animeName} className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4 border-b border-white/10 pb-4 sm:flex-row sm:justify-start">
            {chars[0]?.animeImageUrl ? (
              <Image
                src={chars[0].animeImageUrl}
                alt={animeName}
                width={60}
                height={60}
                className="rounded-lg object-cover"
                unoptimized
              />
            ) : null}
            <h2 className="text-center text-2xl font-bold tracking-wide text-white sm:text-left">
              {animeName}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {chars.map((char) => (
              <article
                key={char.id}
                className={cn(
                  "relative overflow-hidden rounded-xl border border-white/10",
                  "bg-white/[0.04] p-5 transition-all duration-300",
                  "hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.07]"
                )}
              >
                <span className="absolute right-0 top-0 rounded-bl-lg border border-white/10 bg-blue-950/80 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-blue-200">
                  {t("Unlockable")}
                </span>
                <h3 className="mb-3 mt-2 text-lg font-bold text-white">{char.characterName}</h3>
                <div className="flex flex-col gap-2 text-sm text-zinc-400">
                  <p>
                    <strong className="text-zinc-200">{t("gamemode")}:</strong> {char.gameMode}
                  </p>
                  <p>
                    <strong className="text-zinc-200">{t("usedcharacter")}:</strong>{" "}
                    {char.usedCharacter}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
