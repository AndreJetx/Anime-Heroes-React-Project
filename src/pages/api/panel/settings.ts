import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { siteSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { isPanelAuthenticated } from "@/lib/panel-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isPanelAuthenticated(req)) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  if (req.method === "GET") {
    try {
      const [row] = await db.select().from(siteSettings).limit(1);
      return res.status(200).json({
        downloadLink: row?.downloadLink ?? "",
        downloadVersion: row?.downloadVersion ?? "",
      });
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Erro";
      return res.status(500).json({ message: msg });
    }
  }
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { downloadLink, downloadVersion } = req.body ?? {};
  try {
    const [existing] = await db.select().from(siteSettings).limit(1);
    if (existing) {
      await db
        .update(siteSettings)
        .set({
          downloadLink: typeof downloadLink === "string" ? downloadLink : existing.downloadLink,
          downloadVersion: typeof downloadVersion === "string" ? downloadVersion : existing.downloadVersion,
        })
        .where(eq(siteSettings.id, existing.id));
    } else {
      await db.insert(siteSettings).values({
        downloadLink: typeof downloadLink === "string" ? downloadLink : "",
        downloadVersion: typeof downloadVersion === "string" ? downloadVersion : "",
      });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erro ao salvar";
    return res.status(500).json({ message: msg });
  }
}
