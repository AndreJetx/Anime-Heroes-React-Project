import { NextApiRequest, NextApiResponse } from "next";
import { clearPanelSession } from "@/lib/panel-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  clearPanelSession(res);
  return res.status(200).json({ success: true });
}
