-- Coluna para link do trailer (YouTube) configurado no painel
ALTER TABLE site_settings
ADD COLUMN IF NOT EXISTS trailer_url text NOT NULL DEFAULT '';
