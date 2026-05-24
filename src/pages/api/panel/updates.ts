import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { siteUpdate } from "@/db/schema";
import { eq } from "drizzle-orm";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { readSiteUpdates, serializeSiteUpdate } from "@/lib/site-updates-server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isPanelAuthenticated(req)) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  if (req.method === "GET") {
    try {
      const updates = await readSiteUpdates();
      return res.status(200).json(updates);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Erro";
      return res.status(500).json({ message: msg });
    }
  }
  if (req.method === "POST") {
    const { title, content, sortOrder } = req.body ?? {};
    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ message: "Título obrigatório" });
    }
    try {
      const maxOrder = await db
        .select({ max: siteUpdate.sortOrder })
        .from(siteUpdate)
        .then((r) => r[0]?.max ?? 0);
      const [inserted] = await db
        .insert(siteUpdate)
        .values({
          title: title.trim(),
          content: typeof content === "string" ? content.trim() : "",
          sortOrder: typeof sortOrder === "number" ? sortOrder : maxOrder + 1,
        })
        .returning();
      return res.status(201).json({ success: true, item: inserted ? serializeSiteUpdate(inserted) : null });
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Erro ao adicionar";
      return res.status(500).json({ message: msg });
    }
  }
  if (req.method === "PUT") {
    const { id, title, content, sortOrder } = req.body ?? {};
    if (typeof id !== "string") {
      return res.status(400).json({ message: "id obrigatório" });
    }
    try {
      const updates: { title?: string; content?: string; sortOrder?: number } = {};
      if (typeof title === "string") updates.title = title.trim();
      if (typeof content === "string") updates.content = content.trim();
      if (typeof sortOrder === "number") updates.sortOrder = sortOrder;
      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "Nenhum campo para atualizar" });
      }
      await db.update(siteUpdate).set(updates).where(eq(siteUpdate.id, id));
      return res.status(200).json({ success: true });
    } catch (error) {
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
      await db.delete(siteUpdate).where(eq(siteUpdate.id, id));
      return res.status(200).json({ success: true });
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Erro ao remover";
      return res.status(500).json({ message: msg });
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
}
