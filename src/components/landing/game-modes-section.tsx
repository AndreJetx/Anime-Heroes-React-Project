"use client";

import { Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { GAME_MODE_ICON_MAP } from "@/lib/game-mode-icons";
import type { LandingGameModeItem } from "@/lib/game-modes-shared";

type GameModesSectionProps = {
  modes?: LandingGameModeItem[];
};

type DisplayMode = {
  key: string;
  Icon: (typeof GAME_MODE_ICON_MAP)[keyof typeof GAME_MODE_ICON_MAP];
  title: string;
  description: string;
  players: string;
  highlight: boolean;
};

function buildFallbackModes(t: (key: string) => string): DisplayMode[] {
  return [
    {
      key: "1v1",
      Icon: GAME_MODE_ICON_MAP.swords,
      title: t("mode1v1Title"),
      description: t("mode1v1Desc"),
      players: t("mode1v1Players"),
      highlight: false,
    },
    {
      key: "team",
      Icon: GAME_MODE_ICON_MAP.users,
      title: t("modeTeamTitle"),
      description: t("modeTeamDesc"),
      players: t("modeTeamPlayers"),
      highlight: true,
    },
    {
      key: "ranked",
      Icon: GAME_MODE_ICON_MAP.trophy,
      title: t("modeRankedTitle"),
      description: t("modeRankedDesc"),
      players: t("modeRankedPlayers"),
      highlight: false,
    },
    {
      key: "king",
      Icon: GAME_MODE_ICON_MAP.crown,
      title: t("modeKingTitle"),
      description: t("modeKingDesc"),
      players: t("modeKingPlayers"),
      highlight: false,
    },
    {
      key: "training",
      Icon: GAME_MODE_ICON_MAP.target,
      title: t("modeTrainingTitle"),
      description: t("modeTrainingDesc"),
      players: t("modeTrainingPlayers"),
      highlight: false,
    },
    {
      key: "survival",
      Icon: GAME_MODE_ICON_MAP.flame,
      title: t("modeSurvivalTitle"),
      description: t("modeSurvivalDesc"),
      players: t("modeSurvivalPlayers"),
      highlight: false,
    },
  ];
}

function toDisplayModes(modes: LandingGameModeItem[]): DisplayMode[] {
  return modes.map((mode) => ({
    key: mode.id,
    Icon: GAME_MODE_ICON_MAP[mode.icon],
    title: mode.title,
    description: mode.description,
    players: mode.playersLabel,
    highlight: mode.isHighlight,
  }));
}

export function GameModesSection({ modes }: GameModesSectionProps) {
  const { t } = useTranslation();
  const gameModes =
    modes && modes.length > 0 ? toDisplayModes(modes) : buildFallbackModes(t);

  return (
    <section
      id="modes"
      className="relative flex scroll-mt-28 flex-col items-center overflow-hidden px-5 py-0 sm:px-8 md:py-36 lg:py-0"
    >
      <div className="absolute left-0 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[72px] md:h-[500px] md:w-[500px] md:blur-[128px]" />

      <div className="relative z-10 mb-8 w-full max-w-3xl px-2 text-center md:mb-20 lg:mb-24">
        <h2 className="font-[var(--font-display)] mb-4 text-5xl font-bold tracking-wider md:text-7xl">
          <span className="text-foreground">{t("gameModesTitle1")}</span>
          <span className="text-primary"> {t("gameModesTitle2")}</span>
        </h2>
        <p className="mx-auto max-w-xl text-pretty text-muted-foreground">{t("jointofight")}</p>
      </div>

      <div className="relative z-10 grid w-full max-w-6xl grid-cols-1 justify-items-center gap-8 md:grid-cols-2 md:justify-items-stretch md:gap-10 lg:grid-cols-3 lg:justify-items-stretch">
        {gameModes.map((mode, index) => (
          <div
            key={mode.key}
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
              <mode.Icon className="h-7 w-7 text-primary" />
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
                {t("modePopular")}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
