"use client";

import { useEffect, useMemo, useState } from "react";
import { Sword, Shield, Zap, Wind } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const characterColors = [
  "from-blue-600 to-indigo-600",
  "from-blue-600 to-cyan-600",
  "from-emerald-600 to-teal-600",
  "from-purple-600 to-pink-600",
] as const;

export function CharactersSection() {
  const { t } = useTranslation();
  const characters = useMemo(() => [
    {
      id: 1,
      name: t("charNameMartial"),
      title: t("stylemartialartist"),
      description: t("stylemartialartistDesc"),
      stats: { attack: 95, defense: 70, speed: 60 },
      image: "/images/martialartist.png",
      color: characterColors[0],
    },
    {
      id: 2,
      name: t("charNameSword"),
      title: t("styleswordsman"),
      description: t("styleswordsmanDesc"),
      stats: { attack: 80, defense: 50, speed: 78 },
      image: "/images/swordsman.png",
      color: characterColors[1],
    },
    {
      id: 3,
      name: t("charNameMage"),
      title: t("stylemage"),
      description: t("stylemageDesc"),
      stats: { attack: 88, defense: 55, speed: 50 },
      image: "/images/mage.png",
      color: characterColors[2],
    },
    {
      id: 4,
      name: t("charNameFist"),
      title: t("stylemagicfist"),
      description: t("stylemagicfistDesc"),
      stats: { attack: 90, defense: 45, speed: 72 },
      image: "/images/magicfist.png",
      color: characterColors[3],
    },
  ], [t]);

  const [activeCharacter, setActiveCharacter] = useState(characters[0]!);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setActiveCharacter((prev) => characters.find((c) => c.id === prev.id) ?? characters[0]!);
  }, [characters]);

  const handleCharacterChange = (character: (typeof characters)[number]) => {
    if (character.id === activeCharacter.id) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveCharacter(character);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <section
      id="characters"
      className="relative flex scroll-mt-28 flex-col items-center px-5 py-0 sm:px-8 md:py-36 lg:py-0"
    >
      <div className="mx-auto mb-8 w-full max-w-3xl px-2 text-center md:mb-20 lg:mb-24">
        <h2 className="font-[var(--font-display)] mb-4 text-5xl font-bold tracking-wider md:text-7xl">
          <span className="text-foreground">{t("charactersTitle1")}</span>
          <span className="text-primary"> {t("charactersTitle2")}</span>
        </h2>
        <p className="mx-auto max-w-xl text-pretty text-muted-foreground">{t("styledescription")}</p>
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 justify-items-center gap-8 lg:grid-cols-2 lg:items-center lg:justify-items-stretch lg:gap-20">
        <div className="relative w-full max-w-md lg:max-w-none">
          <div
            className={cn(
              "relative aspect-[3/4] overflow-hidden rounded-2xl bg-card/20 shadow-2xl shadow-black/40",
              "transform transition-all duration-500",
              isTransitioning ? "scale-95 opacity-0" : "scale-100 opacity-100"
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-6 md:p-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeCharacter.image}
                alt=""
                className="max-h-full max-w-full object-contain object-center"
              />
            </div>
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t opacity-30",
                activeCharacter.color
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="mb-4 inline-block rounded-full bg-primary/20 px-3 py-1 text-sm text-primary">
                {activeCharacter.title}
              </div>
              <h3 className="font-[var(--font-display)] mb-4 text-6xl font-bold text-foreground">
                {activeCharacter.name}
              </h3>
              <p className="text-muted-foreground">{activeCharacter.description}</p>

              <div className="mt-6 space-y-3">
                {(
                  [
                    { icon: Sword, label: t("statAttack"), value: activeCharacter.stats.attack },
                    { icon: Shield, label: t("statDefense"), value: activeCharacter.stats.defense },
                    { icon: Wind, label: t("statSpeed"), value: activeCharacter.stats.speed },
                  ] as const
                ).map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <stat.icon className="h-4 w-4 text-primary" />
                    <span className="w-20 text-sm text-muted-foreground">{stat.label}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div
                        className={cn("h-full rounded-full bg-gradient-to-r", activeCharacter.color)}
                        style={{ width: `${stat.value}%` }}
                      />
                    </div>
                    <span className="w-8 text-sm font-bold text-foreground">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={cn(
              "absolute -inset-4 -z-10 rounded-3xl opacity-50 blur-xl",
              "bg-gradient-to-r",
              activeCharacter.color
            )}
          />
        </div>

        <div className="grid w-full max-w-lg grid-cols-2 gap-5 sm:max-w-xl sm:gap-6 lg:max-w-none">
          {characters.map((character, index) => (
            <button
              key={character.id}
              type="button"
              onClick={() => handleCharacterChange(character)}
              className={cn(
                "group relative aspect-[4/5] overflow-hidden rounded-xl ring-2 ring-transparent transition-all duration-300",
                activeCharacter.id === character.id
                  ? "scale-[1.02] ring-primary shadow-[0_0_30px_rgba(30,64,175,0.4)]"
                  : "hover:scale-[1.02] hover:ring-primary/45"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={character.image}
                  alt=""
                  className="max-h-full max-w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="font-[var(--font-display)] text-2xl font-bold text-foreground">
                  {character.name}
                </h4>
                <p className="text-xs text-muted-foreground">{character.title}</p>
              </div>

              {activeCharacter.id === character.id && (
                <div className="absolute right-3 top-3">
                  <Zap className="h-5 w-5 fill-current text-primary" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
