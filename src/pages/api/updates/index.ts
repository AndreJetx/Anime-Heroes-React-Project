import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { siteUpdate } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const rows = await db
      .select()
      .from(siteUpdate)
      .orderBy(desc(siteUpdate.sortOrder), desc(siteUpdate.createdAt));
    return res.status(200).json(
      rows.map((r) => ({
        id: r.id,
        title: r.title,
        content: r.content,
        sortOrder: r.sortOrder,
        createdAt: r.createdAt,
      }))
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erro ao buscar atualizações";
    return res.status(500).json({ message: msg });
  }
}
