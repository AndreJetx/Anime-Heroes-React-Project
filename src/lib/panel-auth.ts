import path from "node:path";
import type { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const PANEL_COOKIE = "panel_session";

function getPanelPassword(): string {
  const raw = process.env.PANEL_PASSWORD;
  if (typeof raw !== "string") return "";
  return raw.replace(/\r/g, "").trim();
}

export function isPanelEnabled(): boolean {
  return getPanelPassword().length > 0;
}

export function checkPanelPassword(password: string): boolean {
  const expected = getPanelPassword();
  if (!expected) return false;
  return typeof password === "string" && password.trim() === expected;
}

export function setPanelSession(res: NextApiResponse): void {
  res.setHeader("Set-Cookie", [
    `${PANEL_COOKIE}=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24}`,
  ]);
}

export function clearPanelSession(res: NextApiResponse): void {
  res.setHeader("Set-Cookie", `${PANEL_COOKIE}=; Path=/; HttpOnly; Max-Age=0`);
}

export function isPanelAuthenticated(req: NextApiRequest): boolean {
  if (!getPanelPassword()) return false;
  return req.cookies[PANEL_COOKIE] === "1";
}

export function getPanelCookieName(): string {
  return PANEL_COOKIE;
}

export function isPanelAuthenticatedFromReq(req: { cookies: Partial<Record<string, string>> }): boolean {
  if (!getPanelPassword()) return false;
  return req.cookies[PANEL_COOKIE] === "1";
}
