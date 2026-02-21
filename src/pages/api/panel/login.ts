import path from "node:path";
import fs from "node:fs";
import { NextApiRequest, NextApiResponse } from "next";
import { setPanelSession } from "@/lib/panel-auth";

function readPasswordFromFile(envPath: string): string {
  let content = fs.readFileSync(envPath, "utf8");
  content = content.replace(/^\uFEFF/, "");
  const lines = content.split(/\r?\n/);
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i].trim();
    if (!line || line.startsWith("#")) continue;
    const match = line.match(/^PANEL_PASSWORD\s*=\s*(.*)$/);
    if (match) {
      const value = match[1].replace(/^["']|["']$/g, "").replace(/\r/g, "").trim();
      if (value) return value;
    }
  }
  return "";
}

function findProjectRoot(): string {
  let dir = process.cwd();
  const root = path.parse(dir).root;
  while (dir !== root) {
    if (fs.existsSync(path.join(dir, "package.json"))) return dir;
    dir = path.dirname(dir);
  }
  return process.cwd();
}

function getPanelPassword(): string {
  const root = findProjectRoot();
  for (const name of [".env", ".env.local"]) {
    try {
      const envPath = path.join(root, name);
      if (fs.existsSync(envPath)) {
        const value = readPasswordFromFile(envPath);
        if (value) return value;
      }
    } catch {
      // continue to next file
    }
  }
  return "";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const fromFile = getPanelPassword();
  const fromEnv = typeof process.env.PANEL_PASSWORD === "string" ? process.env.PANEL_PASSWORD.trim() : "";
  const expected = fromFile || fromEnv;
  if (!expected) {
    return res.status(403).json({ message: "Painel desabilitado" });
  }

  const body = req.body ?? {};
  const passwordRaw = typeof body.password === "string" ? body.password : "";
  const password = passwordRaw.replace(/\r\n?|\n/g, "").trim();
  if (!password) {
    return res.status(400).json({ message: "Senha obrigatória" });
  }

  const expectedNorm = expected.replace(/\r\n?|\n/g, "").trim();
  if (password !== expectedNorm) {
    return res.status(401).json({ message: "Senha incorreta" });
  }

  setPanelSession(res);
  return res.status(200).json({ success: true });
}
