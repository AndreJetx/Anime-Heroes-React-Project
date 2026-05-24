import {
  Crown,
  Flame,
  Swords,
  Target,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { GameModeIconId } from "@/lib/game-modes-shared";

export const GAME_MODE_ICON_MAP: Record<GameModeIconId, LucideIcon> = {
  swords: Swords,
  users: Users,
  trophy: Trophy,
  crown: Crown,
  target: Target,
  flame: Flame,
};

export const GAME_MODE_ICON_LABELS: Record<GameModeIconId, string> = {
  swords: "Espadas (1v1)",
  users: "Equipe",
  trophy: "Troféu",
  crown: "Coroa",
  target: "Alvo",
  flame: "Chama",
};
