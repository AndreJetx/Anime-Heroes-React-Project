import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { landingGameMode } from "@/db/schema";
import { eq, ne } from "drizzle-orm";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import {
  isGameModeIconId,
  serializeLandingGameMode,
} from "@/lib/game-modes-shared";
import { isMissingGameModesTableError, readLandingGameModes } from "@/lib/game-modes-server";

const MIGRATION_HINT =
  "Tabela landing_game_mode ausente. Execute scripts/create-landing-game-mode-table.sql no Supabase.";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isPanelAuthenticated(req)) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  if (req.method === "GET") {
    try {
      const modes = await readLandingGameModes();
      return res.status(200).json(modes);
    } catch (error) {
      if (isMissingGameModesTableError(error)) {
        return res.status(503).json({ message: MIGRATION_HINT });
      }
      const msg = error instanceof Error ? error.message : "Erro";
      return res.status(500).json({ message: msg });
    }
  }

  if (req.method === "POST") {
    const { title, description, playersLabel, icon, isHighlight, sortOrder } = req.body ?? {};
    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ message: "Título obrigatório" });
    }
    if (typeof icon === "string" && !isGameModeIconId(icon)) {
      return res.status(400).json({ message: "Ícone inválido" });
    }
    try {
      const maxOrder = await db
        .select({ max: landingGameMode.sortOrder })
        .from(landingGameMode)
        .then((r) => r[0]?.max ?? -1);

      const [inserted] = await db
        .insert(landingGameMode)
        .values({
          title: title.trim(),
          description: typeof description === "string" ? description.trim() : "",
          playersLabel: typeof playersLabel === "string" ? playersLabel.trim() : "",
          icon: typeof icon === "string" && isGameModeIconId(icon) ? icon : "swords",
          isHighlight: Boolean(isHighlight),
          sortOrder: typeof sortOrder === "number" ? sortOrder : maxOrder + 1,
        })
        .returning();

      return res.status(201).json({
        success: true,
        item: inserted ? serializeLandingGameMode(inserted) : null,
      });
    } catch (error) {
      if (isMissingGameModesTableError(error)) {
        return res.status(503).json({ message: MIGRATION_HINT });
      }
      const msg = error instanceof Error ? error.message : "Erro ao adicionar";
      return res.status(500).json({ message: msg });
    }
  }

  if (req.method === "PUT") {
    const { id, title, description, playersLabel, icon, isHighlight, sortOrder } = req.body ?? {};
    if (typeof id !== "string") {
      return res.status(400).json({ message: "id obrigatório" });
    }
    if (typeof icon === "string" && !isGameModeIconId(icon)) {
      return res.status(400).json({ message: "Ícone inválido" });
    }
    try {
      const updates: {
        title?: string;
        description?: string;
        playersLabel?: string;
        icon?: string;
        isHighlight?: boolean;
        sortOrder?: number;
      } = {};

      if (typeof title === "string") updates.title = title.trim();
      if (typeof description === "string") updates.description = description.trim();
      if (typeof playersLabel === "string") updates.playersLabel = playersLabel.trim();
      if (typeof icon === "string" && isGameModeIconId(icon)) updates.icon = icon;
      if (typeof isHighlight === "boolean") updates.isHighlight = isHighlight;
      if (typeof sortOrder === "number") updates.sortOrder = sortOrder;

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "Nenhum campo para atualizar" });
      }

      if (updates.isHighlight === true) {
        await db
          .update(landingGameMode)
          .set({ isHighlight: false })
          .where(ne(landingGameMode.id, id));
      }

      await db.update(landingGameMode).set(updates).where(eq(landingGameMode.id, id));
      return res.status(200).json({ success: true });
    } catch (error) {
      if (isMissingGameModesTableError(error)) {
        return res.status(503).json({ message: MIGRATION_HINT });
      }
      const msg = error instanceof Error ? error.message : "Erro ao atualizar";
      return res.status(500).json({ message: msg });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    if (typeof id !== "string") {
      return res.status(400).json({ message: "id obrigatório" });
    }
    try {
      await db.delete(landingGameMode).where(eq(landingGameMode.id, id));
      return res.status(200).json({ success: true });
    } catch (error) {
      if (isMissingGameModesTableError(error)) {
        return res.status(503).json({ message: MIGRATION_HINT });
      }
      const msg = error instanceof Error ? error.message : "Erro ao remover";
      return res.status(500).json({ message: msg });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
