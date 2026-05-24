import { NextApiRequest, NextApiResponse } from "next";
import { readSiteUpdates } from "@/lib/site-updates-server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const updates = await readSiteUpdates();
    return res.status(200).json(updates);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erro ao buscar atualizações";
    return res.status(500).json({ message: msg });
  }
}
