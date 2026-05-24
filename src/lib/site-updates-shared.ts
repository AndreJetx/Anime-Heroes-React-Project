export type SiteUpdateItem = {
  id: string;
  title: string;
  content: string;
  sortOrder: number;
  createdAt: string;
};

export function serializeSiteUpdate(row: {
  id: string;
  title: string;
  content: string;
  sortOrder: number;
  createdAt: Date | string;
}): SiteUpdateItem {
  let createdAt: string;
  if (row.createdAt instanceof Date) {
    createdAt = row.createdAt.toISOString();
  } else if (typeof row.createdAt === "string" && row.createdAt.trim()) {
    createdAt = row.createdAt;
  } else {
    createdAt = new Date().toISOString();
  }

  return {
    id: row.id,
    title: row.title,
    content: row.content ?? "",
    sortOrder: row.sortOrder ?? 0,
    createdAt,
  };
}

export function normalizeSiteUpdatesPayload(data: unknown): SiteUpdateItem[] {
  if (!Array.isArray(data)) return [];

  const items: SiteUpdateItem[] = [];
  for (const item of data) {
    if (!item || typeof item !== "object") continue;
    const r = item as Record<string, unknown>;
    if (typeof r.id !== "string" || typeof r.title !== "string") continue;

    items.push(
      serializeSiteUpdate({
        id: r.id,
        title: r.title,
        content: typeof r.content === "string" ? r.content : "",
        sortOrder: typeof r.sortOrder === "number" ? r.sortOrder : 0,
        createdAt: (r.createdAt ?? r.created_at ?? new Date().toISOString()) as Date | string,
      })
    );
  }
  return items;
}
