import { NextApiRequest, NextApiResponse } from "next";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import {
  readSiteSettings,
  SiteSettingsMigrationError,
  writeSiteSettings,
} from "@/lib/site-settings";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isPanelAuthenticated(req)) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  if (req.method === "GET") {
    try {
      const data = await readSiteSettings();
      return res.status(200).json(data);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Erro";
      return res.status(500).json({ message: msg });
    }
  }

  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const body = req.body ?? {};

  try {
    await writeSiteSettings({
      downloadLink: body.downloadLink,
      downloadVersion: body.downloadVersion,
      trailerUrl: body.trailerUrl,
      tournamentTitle: body.tournamentTitle,
      tournamentStartsAt: body.tournamentStartsAt,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    if (error instanceof SiteSettingsMigrationError) {
      return res.status(400).json({ message: error.message });
    }
    const msg = error instanceof Error ? error.message : "Erro ao salvar";
    return res.status(500).json({ message: msg });
  }
}
