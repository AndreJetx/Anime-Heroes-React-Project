import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

const connectionString = process.env.DATABASE_URL!;

// Supabase transaction pooler (port 6543) não suporta prepared statements
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
