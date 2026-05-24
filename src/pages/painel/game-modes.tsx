import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { isPanelAuthenticatedFromReq } from "@/lib/panel-auth";
import {
  GAME_MODE_ICON_IDS,
  type GameModeIconId,
  type LandingGameModeItem,
} from "@/lib/game-modes-shared";
import { GAME_MODE_ICON_LABELS } from "@/lib/game-mode-icons";

type Draft = {
  title: string;
  description: string;
  playersLabel: string;
  icon: GameModeIconId;
  isHighlight: boolean;
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

function toDraft(mode: LandingGameModeItem): Draft {
  return {
    title: mode.title,
    description: mode.description,
    playersLabel: mode.playersLabel,
    icon: mode.icon,
    isHighlight: mode.isHighlight,
  };
}

const emptyDraft: Draft = {
  title: "",
  description: "",
  playersLabel: "",
  icon: "swords",
  isHighlight: false,
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!isPanelAuthenticatedFromReq(context.req)) {
    return { redirect: { destination: "/painel", permanent: false } };
  }
  return { props: {} };
};

export default function PainelGameModesPage() {
  const [list, setList] = useState<LandingGameModeItem[]>([]);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [newMode, setNewMode] = useState<Draft>(emptyDraft);
  const [adding, setAdding] = useState(false);

  const fetchList = async () => {
    const res = await fetch("/api/panel/game-modes", { credentials: "include" });
    if (res.ok) {
      const data: LandingGameModeItem[] = await res.json();
      setList(data);
      setDrafts(Object.fromEntries(data.map((m) => [m.id, toDraft(m)])));
    } else {
      const data = await res.json().catch(() => ({}));
      setMessage(data.message || "Erro ao carregar modos.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const updateDraft = (id: string, patch: Partial<Draft>) => {
    setDrafts((prev) => ({
      ...prev,
      [id]: { ...prev[id]!, ...patch },
    }));
  };

  const saveMode = async (id: string) => {
    const draft = drafts[id];
    if (!draft?.title.trim()) {
      setMessage("Título obrigatório.");
      return;
    }
    setSavingId(id);
    setMessage("");
    const res = await fetch("/api/panel/game-modes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id, ...draft, title: draft.title.trim() }),
    });
    setSavingId(null);
    if (res.ok) {
      setMessage("Modo salvo.");
      fetchList();
    } else {
      const data = await res.json();
      setMessage(data.message || "Erro ao salvar.");
    }
  };

  const addMode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMode.title.trim()) {
      setMessage("Título obrigatório.");
      return;
    }
    setAdding(true);
    setMessage("");
    const res = await fetch("/api/panel/game-modes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        title: newMode.title.trim(),
        description: newMode.description.trim(),
        playersLabel: newMode.playersLabel.trim(),
        icon: newMode.icon,
        isHighlight: newMode.isHighlight,
      }),
    });
    setAdding(false);
    if (res.ok) {
      setMessage("Modo adicionado.");
      setNewMode(emptyDraft);
      fetchList();
    } else {
      const data = await res.json();
      setMessage(data.message || "Erro ao adicionar.");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Remover este modo de jogo?")) return;
    await fetch(`/api/panel/game-modes?id=${id}`, { method: "DELETE", credentials: "include" });
    fetchList();
  };

  return (
    <>
      <Head>
        <title>Painel — Modos de jogo</title>
      </Head>
      <div className="painel-page">
        <header className="painel-header">
          <Link href="/painel/dashboard">← Voltar</Link>
          <h1>Modos de jogo</h1>
        </header>
        {message && <p className="painel-msg">{message}</p>}

        <div className="painel-section">
          <h2>Adicionar modo</h2>
          <form className="painel-form" onSubmit={addMode}>
            <ModeFields draft={newMode} onChange={(p) => setNewMode((d) => ({ ...d, ...p }))} />
            <button type="submit" className="painel-submit" disabled={adding}>
              {adding ? "Salvando…" : "Adicionar modo"}
            </button>
          </form>
        </div>

        <div className="painel-section">
          <h2>Modos cadastrados ({list.length})</h2>
          {loading ? (
            <p className="painel-muted">Carregando…</p>
          ) : list.length === 0 ? (
            <p className="painel-muted">
              Nenhum modo no banco. Adicione acima ou rode o script SQL com os dados padrão.
            </p>
          ) : (
            <ul className="painel-modes-list">
              {list.map((mode) => {
                const draft = drafts[mode.id] ?? toDraft(mode);
                return (
                  <li key={mode.id} className="painel-mode-card">
                    <ModeFields
                      draft={draft}
                      onChange={(p) => updateDraft(mode.id, p)}
                      idPrefix={mode.id}
                    />
                    <div className="painel-mode-actions">
                      <button
                        type="button"
                        className="painel-submit"
                        onClick={() => saveMode(mode.id)}
                        disabled={savingId === mode.id}
                      >
                        {savingId === mode.id ? "Salvando…" : "Salvar alterações"}
                      </button>
                      <button type="button" className="painel-danger" onClick={() => remove(mode.id)}>
                        Remover
                      </button>
                    </div>
                  </li>
                );
              })}
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
          max-width: 720px;
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
        .painel-hint-top {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin: 0 0 1.5rem;
          line-height: 1.5;
        }
        .painel-hint-top code {
          font-size: 0.8rem;
          color: var(--accent);
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
          gap: 1rem;
        }
        .painel-muted {
          color: var(--text-secondary);
          margin: 0;
        }
        .painel-modes-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .painel-mode-card {
          padding: 1.25rem;
          border: 1px solid var(--border-color);
          border-radius: 0.75rem;
          background: var(--hover-bg);
        }
        .painel-mode-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 1rem;
        }
        .painel-submit {
          padding: 0.6rem 1.1rem;
          background: var(--secondary);
          color: var(--primary-dark);
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
        }
        .painel-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .painel-danger {
          padding: 0.6rem 1rem;
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          border-radius: 0.5rem;
          cursor: pointer;
        }
        .painel-danger:hover {
          color: #f87171;
          border-color: #f87171;
        }
      `}</style>
    </>
  );
}

function ModeFields({
  draft,
  onChange,
  idPrefix = "new",
}: {
  draft: Draft;
  onChange: (patch: Partial<Draft>) => void;
  idPrefix?: string;
}) {
  return (
    <>
      <div className="painel-field">
        <label className="painel-label" htmlFor={`${idPrefix}-title`}>
          Título
        </label>
        <input
          id={`${idPrefix}-title`}
          style={inputStyle}
          value={draft.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="ex: DUELO 1v1"
          required
        />
      </div>
      <div className="painel-field">
        <label className="painel-label" htmlFor={`${idPrefix}-desc`}>
          Descrição
        </label>
        <textarea
          id={`${idPrefix}-desc`}
          style={{ ...inputStyle, minHeight: "88px", resize: "vertical" }}
          value={draft.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Texto exibido no card do modo"
        />
      </div>
      <div className="painel-field">
        <label className="painel-label" htmlFor={`${idPrefix}-players`}>
          Etiqueta de jogadores
        </label>
        <input
          id={`${idPrefix}-players`}
          style={inputStyle}
          value={draft.playersLabel}
          onChange={(e) => onChange({ playersLabel: e.target.value })}
          placeholder="ex: 2 Jogadores, 2v2 até 5v5"
        />
      </div>
      <div className="painel-field">
        <label className="painel-label" htmlFor={`${idPrefix}-icon`}>
          Ícone
        </label>
        <select
          id={`${idPrefix}-icon`}
          style={inputStyle}
          value={draft.icon}
          onChange={(e) => onChange({ icon: e.target.value as GameModeIconId })}
        >
          {GAME_MODE_ICON_IDS.map((id) => (
            <option key={id} value={id}>
              {GAME_MODE_ICON_LABELS[id]}
            </option>
          ))}
        </select>
      </div>
      <label className="painel-check">
        <input
          type="checkbox"
          checked={draft.isHighlight}
          onChange={(e) => onChange({ isHighlight: e.target.checked })}
        />
        Destacar como &quot;Popular&quot; (apenas um por vez)
      </label>
      <style jsx>{`
        .painel-field {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .painel-label {
          font-size: 0.9rem;
          font-weight: 600;
        }
        .painel-check {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          cursor: pointer;
        }
        .painel-check input {
          width: 1rem;
          height: 1rem;
        }
      `}</style>
    </>
  );
}
