import { NextApiRequest, NextApiResponse } from "next";
import { readSiteSettings } from "@/lib/site-settings";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const data = await readSiteSettings();
    return res.status(200).json(data);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erro ao buscar configurações";
    return res.status(500).json({ message: msg });
  }
}
