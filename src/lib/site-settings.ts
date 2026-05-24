import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { siteSettings } from "@/db/schema";

export type SiteSettingsData = {
  downloadLink: string;
  downloadVersion: string;
  trailerUrl: string;
  tournamentTitle: string;
  tournamentStartsAt: string | null;
};

const EMPTY: SiteSettingsData = {
  downloadLink: "",
  downloadVersion: "",
  trailerUrl: "",
  tournamentTitle: "",
  tournamentStartsAt: null,
};

export function isMissingColumnError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return /column .+ does not exist/i.test(error.message) || error.message.includes("42703");
}

function rowToData(row: {
  downloadLink: string;
  downloadVersion: string;
  trailerUrl?: string;
  tournamentTitle?: string;
  tournamentStartsAt?: Date | null;
}): SiteSettingsData {
  return {
    downloadLink: row.downloadLink ?? "",
    downloadVersion: row.downloadVersion ?? "",
    trailerUrl: row.trailerUrl ?? "",
    tournamentTitle: row.tournamentTitle ?? "",
    tournamentStartsAt: row.tournamentStartsAt?.toISOString() ?? null,
  };
}

async function readBaseSettings(): Promise<SiteSettingsData> {
  try {
    const [row] = await db
      .select({
        downloadLink: siteSettings.downloadLink,
        downloadVersion: siteSettings.downloadVersion,
        trailerUrl: siteSettings.trailerUrl,
      })
      .from(siteSettings)
      .limit(1);

    return row ? rowToData(row) : { ...EMPTY };
  } catch (error) {
    if (!isMissingColumnError(error)) throw error;
    const [row] = await db
      .select({
        downloadLink: siteSettings.downloadLink,
        downloadVersion: siteSettings.downloadVersion,
      })
      .from(siteSettings)
      .limit(1);

    return row ? rowToData(row) : { ...EMPTY };
  }
}

export async function readSiteSettings(): Promise<SiteSettingsData> {
  try {
    const [row] = await db.select().from(siteSettings).limit(1);
    return row ? rowToData(row) : { ...EMPTY };
  } catch (error) {
    if (!isMissingColumnError(error)) throw error;
    return readBaseSettings();
  }
}

export type WriteSiteSettingsInput = {
  downloadLink?: string;
  downloadVersion?: string;
  trailerUrl?: string;
  tournamentTitle?: string;
  tournamentStartsAt?: string | null;
};

export class SiteSettingsMigrationError extends Error {
  constructor() {
    super(
      "Colunas do torneio ausentes no banco. Execute scripts/add-tournament-columns.sql no Supabase."
    );
    this.name = "SiteSettingsMigrationError";
  }
}

export async function writeSiteSettings(input: WriteSiteSettingsInput): Promise<void> {
  let parsedTournamentStartsAt: Date | null | undefined;
  if (input.tournamentStartsAt === null || input.tournamentStartsAt === "") {
    parsedTournamentStartsAt = null;
  } else if (typeof input.tournamentStartsAt === "string") {
    const d = new Date(input.tournamentStartsAt);
    parsedTournamentStartsAt = Number.isNaN(d.getTime()) ? undefined : d;
  }

  const hasTournamentInput =
    typeof input.tournamentTitle === "string" || parsedTournamentStartsAt !== undefined;

  try {
    const [existing] = await db.select().from(siteSettings).limit(1);
    if (existing) {
      await db
        .update(siteSettings)
        .set({
          downloadLink:
            typeof input.downloadLink === "string" ? input.downloadLink : existing.downloadLink,
          downloadVersion:
            typeof input.downloadVersion === "string"
              ? input.downloadVersion
              : existing.downloadVersion,
          trailerUrl: typeof input.trailerUrl === "string" ? input.trailerUrl : existing.trailerUrl,
          tournamentTitle:
            typeof input.tournamentTitle === "string"
              ? input.tournamentTitle
              : existing.tournamentTitle,
          ...(parsedTournamentStartsAt !== undefined && {
            tournamentStartsAt: parsedTournamentStartsAt,
          }),
        })
        .where(eq(siteSettings.id, existing.id));
    } else {
      await db.insert(siteSettings).values({
        downloadLink: typeof input.downloadLink === "string" ? input.downloadLink : "",
        downloadVersion: typeof input.downloadVersion === "string" ? input.downloadVersion : "",
        trailerUrl: typeof input.trailerUrl === "string" ? input.trailerUrl : "",
        tournamentTitle: typeof input.tournamentTitle === "string" ? input.tournamentTitle : "",
        tournamentStartsAt: parsedTournamentStartsAt ?? null,
      });
    }
  } catch (error) {
    if (!isMissingColumnError(error)) throw error;
    if (hasTournamentInput) {
      throw new SiteSettingsMigrationError();
    }

    const [existing] = await db
      .select({
        id: siteSettings.id,
        downloadLink: siteSettings.downloadLink,
        downloadVersion: siteSettings.downloadVersion,
        trailerUrl: siteSettings.trailerUrl,
      })
      .from(siteSettings)
      .limit(1);

    if (existing) {
      await db
        .update(siteSettings)
        .set({
          downloadLink:
            typeof input.downloadLink === "string" ? input.downloadLink : existing.downloadLink,
          downloadVersion:
            typeof input.downloadVersion === "string"
              ? input.downloadVersion
              : existing.downloadVersion,
          trailerUrl: typeof input.trailerUrl === "string" ? input.trailerUrl : existing.trailerUrl,
        })
        .where(eq(siteSettings.id, existing.id));
    } else {
      await db.insert(siteSettings).values({
        downloadLink: typeof input.downloadLink === "string" ? input.downloadLink : "",
        downloadVersion: typeof input.downloadVersion === "string" ? input.downloadVersion : "",
        trailerUrl: typeof input.trailerUrl === "string" ? input.trailerUrl : "",
      });
    }
  }
}
