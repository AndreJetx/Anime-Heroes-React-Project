import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { siteUpdate } from "@/db/schema";
import { serializeSiteUpdate, type SiteUpdateItem } from "@/lib/site-updates-shared";

export type { SiteUpdateItem } from "@/lib/site-updates-shared";
export { serializeSiteUpdate, normalizeSiteUpdatesPayload } from "@/lib/site-updates-shared";

export async function readSiteUpdates(): Promise<SiteUpdateItem[]> {
  const rows = await db
    .select()
    .from(siteUpdate)
    .orderBy(desc(siteUpdate.sortOrder), desc(siteUpdate.createdAt));

  return rows.map(serializeSiteUpdate);
}
