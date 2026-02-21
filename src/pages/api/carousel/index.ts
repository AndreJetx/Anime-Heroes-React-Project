import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { carouselSlide } from "@/db/schema";
import { asc } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const slides = await db.select().from(carouselSlide).orderBy(asc(carouselSlide.sortOrder));
    return res.status(200).json(slides.map((s) => ({ id: s.id, imageUrl: s.imageUrl, sortOrder: s.sortOrder })));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erro ao buscar carrossel";
    return res.status(500).json({ message: msg });
  }
}
