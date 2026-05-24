-- Configuração do próximo torneio (painel → menu lateral)
ALTER TABLE site_settings
ADD COLUMN IF NOT EXISTS tournament_title text NOT NULL DEFAULT '';

ALTER TABLE site_settings
ADD COLUMN IF NOT EXISTS tournament_starts_at timestamptz;
