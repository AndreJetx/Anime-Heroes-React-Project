export const GAME_MODE_ICON_IDS = [
  "swords",
  "users",
  "trophy",
  "crown",
  "target",
  "flame",
] as const;

export type GameModeIconId = (typeof GAME_MODE_ICON_IDS)[number];

export type LandingGameModeItem = {
  id: string;
  title: string;
  description: string;
  playersLabel: string;
  icon: GameModeIconId;
  isHighlight: boolean;
  sortOrder: number;
};

export function isGameModeIconId(value: string): value is GameModeIconId {
  return (GAME_MODE_ICON_IDS as readonly string[]).includes(value);
}

export function normalizeGameModeIcon(value: string | undefined): GameModeIconId {
  if (value && isGameModeIconId(value)) return value;
  return "swords";
}

export function serializeLandingGameMode(row: {
  id: string;
  title: string;
  description: string;
  playersLabel: string;
  icon: string;
  isHighlight: boolean;
  sortOrder: number;
}): LandingGameModeItem {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    playersLabel: row.playersLabel,
    icon: normalizeGameModeIcon(row.icon),
    isHighlight: row.isHighlight,
    sortOrder: row.sortOrder,
  };
}
