-- Initial schema: character table (PostgreSQL / Supabase)
CREATE TABLE IF NOT EXISTS "character" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "anime" text NOT NULL,
  "name" text NOT NULL,
  "power" text NOT NULL,
  "image_url" text NOT NULL,
  "gif_url" text NOT NULL
);
