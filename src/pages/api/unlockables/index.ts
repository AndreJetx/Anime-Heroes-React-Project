import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { unlockableCharacter } from "@/db/schema";
import { asc } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const rows = await db
      .select()
      .from(unlockableCharacter)
      .orderBy(asc(unlockableCharacter.animeName), asc(unlockableCharacter.sortOrder));
    const list = rows.map((r) => ({
      id: r.id,
      animeName: r.animeName,
      animeImageUrl: r.animeImageUrl ?? undefined,
      characterName: r.characterName,
      gameMode: r.gameMode,
      usedCharacter: r.usedCharacter,
    }));
    return res.status(200).json(list);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erro ao buscar personagens desbloqueáveis";
    return res.status(500).json({ message: msg });
  }
}
