import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { isPanelAuthenticatedFromReq } from "@/lib/panel-auth";

type Update = {
  id: string;
  title: string;
  content: string;
  sortOrder: number;
  createdAt: string;
};

const inputStyle: React.CSSProperties = {
  background: "#0f2847",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.25)",
  borderRadius: "0.5rem",
  padding: "0.6rem 0.75rem",
  width: "100%",
  fontSize: "1rem",
  boxSizing: "border-box",
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!isPanelAuthenticatedFromReq(context.req)) {
    return { redirect: { destination: "/painel", permanent: false } };
  }
  return { props: {} };
};

export default function PainelUpdatesPage() {
  const [list, setList] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchList = async () => {
    const res = await fetch("/api/panel/updates", { credentials: "include" });
    if (res.ok) setList(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setSaving(true);
    const res = await fetch("/api/panel/updates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title: title.trim(), content: content.trim() }),
    });
    setSaving(false);
    if (res.ok) {
      setMessage("Adicionado.");
      setTitle("");
      setContent("");
      fetchList();
    } else {
      const data = await res.json();
      setMessage(data.message || "Erro");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Remover esta atualização?")) return;
    await fetch(`/api/panel/updates?id=${id}`, { method: "DELETE", credentials: "include" });
    fetchList();
  };

  const formatDate = (s: string) => {
    try {
      return new Date(s).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
    } catch {
      return s;
    }
  };

  return (
    <>
      <Head>
        <title>Painel — Últimas atualizações</title>
      </Head>
      <div className="painel-page">
        <header className="painel-header">
          <Link href="/painel/dashboard">← Voltar</Link>
          <h1>Últimas atualizações</h1>
        </header>
        {message && <p className="painel-msg">{message}</p>}

        <div className="painel-section">
          <h2>Adicionar</h2>
          <form className="painel-form" onSubmit={handleSubmit}>
            <div className="painel-field">
              <span className="painel-label">Título</span>
              <input
                style={inputStyle}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ex: Nova versão 1.2.0"
                required
              />
            </div>
            <div className="painel-field">
              <span className="painel-label">Conteúdo (alterações)</span>
              <textarea
                style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Descreva as alterações..."
              />
            </div>
            <button type="submit" className="painel-submit" disabled={saving}>
              {saving ? "Salvando…" : "Adicionar atualização"}
            </button>
          </form>
        </div>

        <div className="painel-section">
          <h2>Lista ({list.length})</h2>
          {loading ? (
            <p className="painel-muted">Carregando…</p>
          ) : list.length === 0 ? (
            <p className="painel-muted">Nenhuma atualização ainda.</p>
          ) : (
            <ul className="painel-updates-list">
              {list.map((u) => (
                <li key={u.id} className="painel-update-item">
                  <div className="painel-update-head">
                    <strong>{u.title}</strong>
                    <span className="painel-update-date">{formatDate(u.createdAt)}</span>
                  </div>
                  {u.content && <p className="painel-update-content">{u.content}</p>}
                  <button type="button" onClick={() => remove(u.id)}>
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <style jsx>{`
        .painel-page {
          min-height: 100vh;
          background: var(--dark-bg);
          color: var(--text-primary);
          padding: 2rem;
          max-width: 700px;
          margin: 0 auto;
        }
        .painel-header {
          margin-bottom: 1.5rem;
        }
        .painel-header a {
          color: var(--accent);
        }
        .painel-header h1 {
          margin: 0.5rem 0 0;
          color: var(--secondary);
        }
        .painel-msg {
          padding: 0.75rem 1rem;
          background: var(--primary-light);
          border-radius: 0.5rem;
          margin-bottom: 1rem;
        }
        .painel-section {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          padding: 1.75rem;
          margin-bottom: 1.5rem;
        }
        .painel-section h2 {
          margin: 0 0 1.25rem;
          font-size: 1.15rem;
          color: var(--secondary);
        }
        .painel-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .painel-field {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .painel-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .painel-submit {
          margin-top: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: var(--secondary);
          color: var(--primary-dark);
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          align-self: flex-start;
        }
        .painel-muted {
          color: var(--text-secondary);
          margin: 0;
        }
        .painel-updates-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .painel-update-item {
          padding: 1rem;
          border: 1px solid var(--border-color);
          border-radius: 0.75rem;
          margin-bottom: 0.75rem;
          background: var(--hover-bg);
        }
        .painel-update-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .painel-update-date {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .painel-update-content {
          margin: 0.5rem 0 0.75rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          white-space: pre-wrap;
          word-break: break-word;
        }
        .painel-update-item button {
          padding: 0.35rem 0.65rem;
          font-size: 0.85rem;
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          border-radius: 0.375rem;
          cursor: pointer;
        }
        .painel-update-item button:hover {
          color: var(--text-primary);
          border-color: var(--text-secondary);
        }
      `}</style>
    </>
  );
}
