-- Execute este SQL no Supabase: Dashboard do projeto → SQL Editor → New query → Cole e rode.
-- Cria a tabela site_update para "Últimas atualizações" (evita usar drizzle-kit push que pode travar).

CREATE TABLE IF NOT EXISTS site_update (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Opcional: habilite RLS e políticas se quiser controle por usuário no futuro.
-- Por enquanto a tabela é acessada apenas pela API (service role no painel, anon na leitura pública).
