import { NextApiRequest, NextApiResponse } from "next";
import { createSupabaseServer, CAROUSEL_BUCKET, UNLOCKABLES_BUCKET } from "@/lib/supabase-server";
import { isPanelAuthenticated } from "@/lib/panel-auth";

export const config = {
  api: { bodyParser: { sizeLimit: "10mb" } },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isPanelAuthenticated(req)) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const bucket = (req.query.bucket as string) || CAROUSEL_BUCKET;
  if (bucket !== CAROUSEL_BUCKET && bucket !== UNLOCKABLES_BUCKET) {
    return res.status(400).json({ message: "Bucket inválido. Use carousel ou unlockables." });
  }
  const { base64, contentType } = req.body ?? {};
  if (typeof base64 !== "string") {
    return res.status(400).json({ message: "base64 (string) obrigatório no body" });
  }
  let supabase;
  try {
    supabase = createSupabaseServer();
  } catch (e) {
    return res.status(500).json({ message: "Upload não configurado. Defina SUPABASE_SERVICE_ROLE_KEY no .env" });
  }
  try {
    const buffer = Buffer.from(base64, "base64");
    const ext = (contentType && (contentType.includes("jpeg") || contentType.includes("jpg"))) ? "jpg" : "png";
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { data, error } = await supabase.storage.from(bucket).upload(fileName, buffer, {
      contentType: typeof contentType === "string" ? contentType.split(";")[0].trim() : "image/png",
      upsert: false,
    });
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
    return res.status(200).json({ url: urlData.publicUrl });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erro no upload";
    return res.status(500).json({ message: msg });
  }
}
