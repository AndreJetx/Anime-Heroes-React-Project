import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { siteSettings } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const [row] = await db.select().from(siteSettings).limit(1);
    const downloadLink = row?.downloadLink ?? "";
    const downloadVersion = row?.downloadVersion ?? "";
    return res.status(200).json({ downloadLink, downloadVersion });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erro ao buscar configurações";
    return res.status(500).json({ message: msg });
  }
}
