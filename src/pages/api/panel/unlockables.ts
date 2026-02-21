import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { unlockableCharacter } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { isPanelAuthenticated } from "@/lib/panel-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isPanelAuthenticated(req)) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  if (req.method === "GET") {
    try {
      const rows = await db.select().from(unlockableCharacter).orderBy(asc(unlockableCharacter.animeName), asc(unlockableCharacter.sortOrder));
      return res.status(200).json(rows);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Erro";
      return res.status(500).json({ message: msg });
    }
  }
  if (req.method === "POST") {
    const { animeName, animeImageUrl, characterName, gameMode, usedCharacter, sortOrder } = req.body ?? {};
    if (typeof animeName !== "string" || !animeName.trim() || typeof characterName !== "string" || !characterName.trim() ||
        typeof gameMode !== "string" || !gameMode.trim() || typeof usedCharacter !== "string" || !usedCharacter.trim()) {
      return res.status(400).json({ message: "animeName, characterName, gameMode e usedCharacter são obrigatórios" });
    }
    try {
      await db.insert(unlockableCharacter).values({
        animeName: animeName.trim(),
        animeImageUrl: typeof animeImageUrl === "string" ? animeImageUrl.trim() || null : null,
        characterName: characterName.trim(),
        gameMode: gameMode.trim(),
        usedCharacter: usedCharacter.trim(),
        sortOrder: typeof sortOrder === "number" ? sortOrder : 0,
      });
      return res.status(201).json({ success: true });
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Erro ao adicionar";
      return res.status(500).json({ message: msg });
    }
  }
  if (req.method === "PUT") {
    const { id, animeName, animeImageUrl, characterName, gameMode, usedCharacter, sortOrder } = req.body ?? {};
    if (typeof id !== "string") return res.status(400).json({ message: "id obrigatório" });
    try {
      const updates: Partial<typeof unlockableCharacter.$inferInsert> = {};
      if (typeof animeName === "string") updates.animeName = animeName.trim();
      if (animeImageUrl !== undefined) updates.animeImageUrl = typeof animeImageUrl === "string" ? animeImageUrl.trim() || null : null;
      if (typeof characterName === "string") updates.characterName = characterName.trim();
      if (typeof gameMode === "string") updates.gameMode = gameMode.trim();
      if (typeof usedCharacter === "string") updates.usedCharacter = usedCharacter.trim();
      if (typeof sortOrder === "number") updates.sortOrder = sortOrder;
      await db.update(unlockableCharacter).set(updates).where(eq(unlockableCharacter.id, id));
      return res.status(200).json({ success: true });
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Erro ao atualizar";
      return res.status(500).json({ message: msg });
    }
  }
  if (req.method === "DELETE") {
    const { id } = req.query;
    if (typeof id !== "string") return res.status(400).json({ message: "id obrigatório" });
    try {
      await db.delete(unlockableCharacter).where(eq(unlockableCharacter.id, id));
      return res.status(200).json({ success: true });
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Erro ao remover";
      return res.status(500).json({ message: msg });
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
}
