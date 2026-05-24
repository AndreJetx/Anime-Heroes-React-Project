-- Migração única: trailer + torneio (rode no SQL Editor do Supabase)
ALTER TABLE site_settings
ADD COLUMN IF NOT EXISTS trailer_url text NOT NULL DEFAULT '';

ALTER TABLE site_settings
ADD COLUMN IF NOT EXISTS tournament_title text NOT NULL DEFAULT '';

ALTER TABLE site_settings
ADD COLUMN IF NOT EXISTS tournament_starts_at timestamptz;
