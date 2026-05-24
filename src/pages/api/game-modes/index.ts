import { NextApiRequest, NextApiResponse } from "next";
import { readLandingGameModes } from "@/lib/game-modes-server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const modes = await readLandingGameModes();
    return res.status(200).json(modes);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erro";
    return res.status(500).json({ message: msg });
  }
}
