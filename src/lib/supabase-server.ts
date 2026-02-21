import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export function createSupabaseServer() {
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for server uploads");
  }
  return createClient(supabaseUrl, serviceRoleKey);
}

export const CAROUSEL_BUCKET = "carousel";
export const UNLOCKABLES_BUCKET = "unlockables";
