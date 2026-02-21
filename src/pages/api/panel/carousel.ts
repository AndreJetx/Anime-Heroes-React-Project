import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { carouselSlide } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { isPanelAuthenticated } from "@/lib/panel-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isPanelAuthenticated(req)) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  if (req.method === "GET") {
    try {
      const slides = await db.select().from(carouselSlide).orderBy(asc(carouselSlide.sortOrder));
      return res.status(200).json(slides);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Erro";
      return res.status(500).json({ message: msg });
    }
  }
  if (req.method === "POST") {
    const { imageUrl, sortOrder } = req.body ?? {};
    if (typeof imageUrl !== "string" || !imageUrl.trim()) {
      return res.status(400).json({ message: "imageUrl obrigatório" });
    }
    try {
      const maxOrder = await db
        .select({ max: carouselSlide.sortOrder })
        .from(carouselSlide)
        .then((r) => r[0]?.max ?? 0);
      await db.insert(carouselSlide).values({
        imageUrl: imageUrl.trim(),
        sortOrder: typeof sortOrder === "number" ? sortOrder : maxOrder + 1,
      });
      return res.status(201).json({ success: true });
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Erro ao adicionar";
      return res.status(500).json({ message: msg });
    }
  }
  if (req.method === "DELETE") {
    const { id } = req.query;
    if (typeof id !== "string") {
      return res.status(400).json({ message: "id obrigatório" });
    }
    try {
      await db.delete(carouselSlide).where(eq(carouselSlide.id, id));
      return res.status(200).json({ success: true });
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Erro ao remover";
      return res.status(500).json({ message: msg });
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
}
