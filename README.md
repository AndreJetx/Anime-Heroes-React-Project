# Anime Heroes — Allstar Clash

Site oficial do jogo (Next.js Pages Router): landing, guia de personagens, painel administrativo e APIs com Supabase.

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Cache corrompido no dev:

```bash
npm run dev:clean
```

## Scripts úteis

| Comando | Descrição |
|---------|-----------|
| `npm run build` | Build de produção |
| `npm run clean` | Remove pasta `.next` |
| `npm run db:studio` | Drizzle Studio |

## Variáveis de ambiente

Configure `.env.local` com `DATABASE_URL`, credenciais Supabase, `PANEL_PASSWORD`, etc.

Migrações SQL manuais estão em `scripts/`.
