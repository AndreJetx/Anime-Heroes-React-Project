import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { isPanelAuthenticatedFromReq } from "@/lib/panel-auth";

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!isPanelAuthenticatedFromReq(context.req)) {
    return { redirect: { destination: "/painel", permanent: false } };
  }
  return { props: {} };
};

export default function PainelDashboardPage() {
  const [settings, setSettings] = useState({ downloadLink: "", downloadVersion: "" });
  const [carousel, setCarousel] = useState<{ id: string; imageUrl: string; sortOrder: number }[]>([]);
  const [unlockables, setUnlockables] = useState<
    { id: string; animeName: string; animeImageUrl: string | null; characterName: string; gameMode: string; usedCharacter: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const [setRes, carRes, unlRes] = await Promise.all([
        fetch("/api/panel/settings", { credentials: "include" }),
        fetch("/api/panel/carousel", { credentials: "include" }),
        fetch("/api/panel/unlockables", { credentials: "include" }),
      ]);
      if (setRes.ok) setSettings(await setRes.json());
      if (carRes.ok) setCarousel(await carRes.json());
      if (unlRes.ok) setUnlockables(await unlRes.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/panel/logout", { method: "POST", credentials: "include" });
    window.location.href = "/painel";
  };

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/panel/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(settings),
      });
      if (res.ok) setMessage("Configurações salvas.");
      else setMessage((await res.json()).message || "Erro");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="painel-page">
        <p>Carregando…</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Painel — Dashboard</title>
      </Head>
      <div className="painel-page">
        <header className="painel-header">
          <h1>Painel</h1>
          <div>
            <Link href="/">Ver site</Link>
            <button type="button" onClick={handleLogout}>
              Sair
            </button>
          </div>
        </header>

        {message && <p className="painel-msg">{message}</p>}

        <section className="painel-section">
          <h2>Download (botão)</h2>
          <form onSubmit={saveSettings}>
            <label>
              Link do Download
              <input
                type="url"
                value={settings.downloadLink}
                onChange={(e) => setSettings((s) => ({ ...s, downloadLink: e.target.value }))}
                placeholder="https://..."
              />
            </label>
            <label>
              Versão
              <input
                type="text"
                value={settings.downloadVersion}
                onChange={(e) => setSettings((s) => ({ ...s, downloadVersion: e.target.value }))}
                placeholder="v0.99.2"
              />
            </label>
            <button type="submit" disabled={saving}>
              {saving ? "Salvando…" : "Salvar"}
            </button>
          </form>
        </section>

        <section className="painel-section">
          <h2>Carrossel</h2>
          <p className="painel-hint">Adicione imagens pelo painel de carrossel. Use o bucket &quot;carousel&quot; no Supabase Storage.</p>
          <ul className="painel-list">
            {carousel.map((s) => (
              <li key={s.id}>
                <img src={s.imageUrl} alt="" width={80} height={50} style={{ objectFit: "cover" }} />
                <button
                  type="button"
                  onClick={async () => {
                    if (!confirm("Remover esta imagem?")) return;
                    await fetch(`/api/panel/carousel?id=${s.id}`, { method: "DELETE", credentials: "include" });
                    fetchData();
                  }}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
          <Link href="/painel/carousel">Gerenciar carrossel →</Link>
        </section>

        <section className="painel-section">
          <h2>Últimas atualizações</h2>
          <p className="painel-hint">Alterações exibidas no modal &quot;Últimas atualizações&quot; do menu do site.</p>
          <Link href="/painel/updates">Gerenciar atualizações →</Link>
        </section>

        <section className="painel-section">
          <h2>Personagens desbloqueáveis</h2>
          <Link href="/painel/unlockables">Gerenciar personagens →</Link>
          <ul className="painel-list">
            {unlockables.slice(0, 5).map((u) => (
              <li key={u.id}>
                {u.animeName} — {u.characterName} ({u.gameMode})
              </li>
            ))}
            {unlockables.length > 5 && <li>… e mais {unlockables.length - 5}</li>}
          </ul>
        </section>
      </div>
      <style jsx>{`
        .painel-page {
          min-height: 100vh;
          background: var(--dark-bg);
          color: var(--text-primary);
          padding: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }
        .painel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .painel-header h1 {
          margin: 0;
          color: var(--secondary);
        }
        .painel-header a {
          margin-right: 1rem;
          color: var(--accent);
        }
        .painel-header button {
          padding: 0.5rem 1rem;
          background: var(--hover-bg);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          border-radius: 0.5rem;
          cursor: pointer;
        }
        .painel-msg {
          padding: 0.75rem;
          background: var(--primary-light);
          border-radius: 0.5rem;
          margin-bottom: 1rem;
        }
        .painel-section {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .painel-section h2 {
          margin: 0 0 1rem;
          font-size: 1.25rem;
          color: var(--secondary);
        }
        .painel-hint {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
        }
        .painel-section label {
          display: block;
          margin-bottom: 0.75rem;
        }
        .painel-section label input {
          display: block;
          width: 100%;
          padding: 0.5rem;
          margin-top: 0.25rem;
          border: 1px solid var(--border-color);
          border-radius: 0.375rem;
          background: var(--hover-bg);
          color: var(--text-primary);
        }
        .painel-section button[type="submit"] {
          padding: 0.5rem 1rem;
          background: var(--secondary);
          color: var(--primary-dark);
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
        }
        .painel-list {
          list-style: none;
          padding: 0;
          margin: 0.5rem 0;
        }
        .painel-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border-color);
        }
        .painel-list li button {
          margin-left: auto;
          padding: 0.25rem 0.5rem;
          font-size: 0.85rem;
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          border-radius: 0.25rem;
          cursor: pointer;
        }
        .painel-section a {
          color: var(--accent);
        }
      `}</style>
    </>
  );
}
