"use client";

import { Users, Swords, Trophy, Crown, Target, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export function GameModesSection() {
  const { t } = useTranslation();
  const gameModes = [
    {
      icon: Swords,
      title: "DUELO 1v1",
      description: "Enfrente seu oponente em combate direto. Sem desculpas, apenas habilidade pura.",
      players: "2 Jogadores",
      highlight: false,
    },
    {
      icon: Users,
      title: "BATALHA EM EQUIPE",
      description: t("cooptext"),
      players: "2v2 até 5v5",
      highlight: true,
    },
    {
      icon: Trophy,
      title: "RANQUEADA",
      description: "Suba no ranking global e prove que você é o melhor lutador do mundo.",
      players: "Competitivo",
      highlight: false,
    },
    {
      icon: Crown,
      title: "REI DA COLINA",
      description: "Seja o último de pé e conquiste o título de Rei da Arena.",
      players: "8 Jogadores",
      highlight: false,
    },
    {
      icon: Target,
      title: "TREINAMENTO",
      description: "Aprimore suas técnicas e combos no modo de treino ilimitado.",
      players: "Solo",
      highlight: false,
    },
    {
      icon: Flame,
      title: "SOBREVIVÊNCIA",
      description: "Enfrente ondas infinitas de inimigos e veja até onde você consegue chegar.",
      players: "1-4 Jogadores",
      highlight: false,
    },
  ];

  return (
    <section
      id="modes"
      className="relative flex scroll-mt-28 flex-col items-center overflow-hidden px-5 py-0 sm:px-8 md:py-36 lg:py-0"
    >
      <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[128px]" />

      <div className="relative z-10 mb-8 w-full max-w-3xl px-2 text-center md:mb-20 lg:mb-24">
        <h2 className="font-[var(--font-display)] mb-4 text-5xl font-bold tracking-wider md:text-7xl">
          <span className="text-foreground">MODOS DE</span>
          <span className="text-primary"> JOGO</span>
        </h2>
        <p className="mx-auto max-w-xl text-pretty text-muted-foreground">{t("jointofight")}</p>
      </div>

      <div className="relative z-10 grid w-full max-w-6xl grid-cols-1 justify-items-center gap-8 md:grid-cols-2 md:justify-items-stretch md:gap-10 lg:grid-cols-3 lg:justify-items-stretch">
        {gameModes.map((mode, index) => (
          <div
            key={mode.title}
            className={cn(
              "group relative w-full max-w-md cursor-pointer rounded-2xl p-6 backdrop-blur-sm transition-all duration-500 md:max-w-none",
              "bg-card/60 shadow-lg shadow-black/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/35",
              mode.highlight
                ? "bg-primary/10 ring-1 ring-primary/35 md:col-span-2 lg:col-span-1"
                : "hover:ring-1 hover:ring-primary/25"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className={cn(
                "mb-5 flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300",
                "bg-primary/10 group-hover:bg-primary/20"
              )}
            >
              <mode.icon className="h-7 w-7 text-primary" />
            </div>

            <h3 className="font-[var(--font-display)] mb-2 text-2xl font-bold tracking-wide text-foreground">
              {mode.title}
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">{mode.description}</p>

            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/80 px-3 py-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{mode.players}</span>
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-primary/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {mode.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                POPULAR
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
