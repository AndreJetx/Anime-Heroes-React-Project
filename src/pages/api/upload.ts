import { uploadFile } from "../../utils/s3";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Método não permitido" });

  const file = req.body.file;
  if (!file) return res.status(400).json({ message: "Arquivo não encontrado" });

  const fileName = `uploads/${Date.now()}-${file.name}`;
  const fileUrl = await uploadFile(Buffer.from(file.data), fileName, file.type);

  if (!fileUrl) return res.status(500).json({ message: "Erro no upload" });

  res.status(200).json({ url: fileUrl });
}
