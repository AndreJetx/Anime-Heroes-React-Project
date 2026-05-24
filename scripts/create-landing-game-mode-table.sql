-- Execute no Supabase: SQL Editor → New query → Cole e rode.

CREATE TABLE IF NOT EXISTS landing_game_mode (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  players_label TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'swords',
  is_highlight BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- Modos padrão (opcional — remova o INSERT se preferir cadastrar só pelo painel)
INSERT INTO landing_game_mode (title, description, players_label, icon, is_highlight, sort_order)
SELECT * FROM (VALUES
  (
    'DUELO 1v1',
    'Enfrente seu oponente em combate direto. Sem desculpas, apenas habilidade pura.',
    '2 Jogadores',
    'swords',
    FALSE,
    0
  ),
  (
    'BATALHA EM EQUIPE',
    'Forme sua equipe e domine o campo de batalha em combates cooperativos intensos.',
    '2v2 até 5v5',
    'users',
    TRUE,
    1
  ),
  (
    'RANQUEADA',
    'Suba no ranking global e prove que você é o melhor lutador do mundo.',
    'Competitivo',
    'trophy',
    FALSE,
    2
  ),
  (
    'REI DA COLINA',
    'Seja o último de pé e conquiste o título de Rei da Arena.',
    '8 Jogadores',
    'crown',
    FALSE,
    3
  ),
  (
    'TREINAMENTO',
    'Aprimore suas técnicas e combos no modo de treino ilimitado.',
    'Solo',
    'target',
    FALSE,
    4
  ),
  (
    'SOBREVIVÊNCIA',
    'Enfrente ondas infinitas de inimigos e veja até onde você consegue chegar.',
    '1-4 Jogadores',
    'flame',
    FALSE,
    5
  )
) AS v(title, description, players_label, icon, is_highlight, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM landing_game_mode LIMIT 1);
