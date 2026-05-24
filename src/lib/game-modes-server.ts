import { asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { landingGameMode } from "@/db/schema";
import { serializeLandingGameMode, type LandingGameModeItem } from "@/lib/game-modes-shared";

export type { LandingGameModeItem } from "@/lib/game-modes-shared";

export function isMissingGameModesTableError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return (
    /relation .+ does not exist/i.test(error.message) ||
    error.message.includes("42P01")
  );
}

export async function readLandingGameModes(): Promise<LandingGameModeItem[]> {
  try {
    const rows = await db
      .select()
      .from(landingGameMode)
      .orderBy(asc(landingGameMode.sortOrder), asc(landingGameMode.title));

    return rows.map(serializeLandingGameMode);
  } catch (error) {
    if (isMissingGameModesTableError(error)) return [];
    throw error;
  }
}
