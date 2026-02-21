import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { isPanelAuthenticatedFromReq } from "@/lib/panel-auth";

type Unlockable = {
  id: string;
  animeName: string;
  animeImageUrl: string | null;
  characterName: string;
  gameMode: string;
  usedCharacter: string;
  sortOrder: number;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!isPanelAuthenticatedFromReq(context.req)) {
    return { redirect: { destination: "/painel", permanent: false } };
  }
  return { props: {} };
};

export default function PainelUnlockablesPage() {
  const [list, setList] = useState<Unlockable[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    animeName: "",
    animeImageUrl: "",
    characterName: "",
    gameMode: "Arcade",
    usedCharacter: "",
  });
  const [imageUploading, setImageUploading] = useState(false);

  const fetchList = async () => {
    const res = await fetch("/api/panel/unlockables", { credentials: "include" });
    if (res.ok) setList(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/panel/unlockables", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        ...form,
        animeImageUrl: form.animeImageUrl || undefined,
      }),
    });
    if (res.ok) {
      setMessage("Adicionado.");
      setForm({ animeName: "", animeImageUrl: "", characterName: "", gameMode: "Arcade", usedCharacter: "" });
      fetchList();
    } else {
      const data = await res.json();
      setMessage(data.message || "Erro");
    }
  };

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith("image/")) return;
    setImageUploading(true);
    setMessage("");
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(",")[1] ?? "");
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
      const res = await fetch("/api/panel/upload?bucket=unlockables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ base64, contentType: file.type }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        setForm((f) => ({ ...f, animeImageUrl: data.url }));
        setMessage("Imagem enviada. URL preenchida.");
      } else setMessage(data.message || "Erro no upload da imagem.");
    } catch {
      setMessage("Falha ao enviar imagem.");
    } finally {
      setImageUploading(false);
      e.target.value = "";
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Remover este personagem?")) return;
    await fetch(`/api/panel/unlockables?id=${id}`, { method: "DELETE", credentials: "include" });
    fetchList();
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

  const byAnime = list.reduce<Record<string, Unlockable[]>>((acc, u) => {
    if (!acc[u.animeName]) acc[u.animeName] = [];
    acc[u.animeName].push(u);
    return acc;
  }, {});

  return (
    <>
      <Head>
        <title>Painel — Personagens desbloqueáveis</title>
      </Head>
      <div className="painel-page">
        <header className="painel-header">
          <Link href="/painel/dashboard">← Voltar</Link>
          <h1>Personagens desbloqueáveis</h1>
        </header>
        {message && <p className="painel-msg">{message}</p>}

        <div className="painel-section">
          <h2>Adicionar</h2>
          <form className="painel-form" onSubmit={handleSubmit}>
            <div className="painel-field">
              <span className="painel-label">Anime</span>
              <input
                style={inputStyle}
                value={form.animeName}
                onChange={(e) => setForm((f) => ({ ...f, animeName: e.target.value }))}
                placeholder="ex: BLEACH, DRAGON BALL SERIES"
                required
              />
            </div>

            <div className="painel-field painel-field-image">
              <span className="painel-label">URL da imagem do anime (opcional)</span>
              <p className="painel-hint">Cole uma URL ou envie uma imagem para o bucket.</p>
              <input
                type="url"
                style={inputStyle}
                value={form.animeImageUrl}
                onChange={(e) => setForm((f) => ({ ...f, animeImageUrl: e.target.value }))}
                placeholder="https://..."
              />
              <div className="painel-image-actions">
                <label className="painel-file-label">
                  <input type="file" accept="image/*" onChange={handleImageFile} disabled={imageUploading} />
                  <span className="painel-file-btn">{imageUploading ? "Enviando…" : "Enviar imagem"}</span>
                </label>
                {form.animeImageUrl && (
                  <div className="painel-image-preview">
                    <img src={form.animeImageUrl} alt="" />
                    <span>URL definida</span>
                  </div>
                )}
              </div>
            </div>

            <div className="painel-field">
              <span className="painel-label">Nome do personagem</span>
              <input
                style={inputStyle}
                value={form.characterName}
                onChange={(e) => setForm((f) => ({ ...f, characterName: e.target.value }))}
                placeholder="ex: Goku"
                required
              />
            </div>

            <div className="painel-field">
              <span className="painel-label">Modo de jogo</span>
              <input
                style={inputStyle}
                value={form.gameMode}
                onChange={(e) => setForm((f) => ({ ...f, gameMode: e.target.value }))}
                placeholder="ex: Arcade, Survival"
              />
            </div>

            <div className="painel-field">
              <span className="painel-label">Personagem usado para desbloquear</span>
              <input
                style={inputStyle}
                value={form.usedCharacter}
                onChange={(e) => setForm((f) => ({ ...f, usedCharacter: e.target.value }))}
                placeholder="ex: Vegeta"
                required
              />
            </div>

            <button type="submit" className="painel-submit">Adicionar personagem</button>
          </form>
        </div>

        <div className="painel-section">
          <h2>Lista ({list.length})</h2>
          {loading ? (
            <p>Carregando…</p>
          ) : (
            Object.entries(byAnime).map(([anime, chars]) => (
              <div key={anime} className="painel-anime-group">
                <h3>{anime}</h3>
                <ul className="painel-list">
                  {chars.map((u) => (
                    <li key={u.id}>
                      <span>{u.characterName}</span>
                      <span className="muted">{u.gameMode} / {u.usedCharacter}</span>
                      <button type="button" onClick={() => remove(u.id)}>Remover</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))
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
          font-size: 0.95rem;
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
          font-weight: 600;
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
        .painel-form input[type="url"],
        .painel-form input[type="text"] {
          width: 100%;
          padding: 0.6rem 0.75rem;
          border: 1px solid var(--border-light);
          border-radius: 0.5rem;
          background: #0f2847;
          color: #fff;
          font-size: 1rem;
          font-family: inherit;
          box-sizing: border-box;
          -webkit-appearance: none;
          appearance: none;
        }
        .painel-form input::placeholder {
          color: var(--text-secondary);
          opacity: 0.9;
        }
        .painel-form input:focus {
          outline: none;
          border-color: var(--secondary);
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.15);
        }
        .painel-form input::-webkit-autofill,
        .painel-form input::-webkit-autofill:hover,
        .painel-form input::-webkit-autofill:focus {
          -webkit-text-fill-color: #fff;
          -webkit-box-shadow: 0 0 0 1000px #0f2847 inset;
          box-shadow: 0 0 0 1000px #0f2847 inset;
          transition: background-color 5000s ease-in-out 0s;
        }
        .painel-hint {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin: 0 0 0.5rem 0;
        }
        .painel-field-image {
          padding: 1rem;
          background: rgba(15, 40, 71, 0.6);
          border-radius: 0.75rem;
          border: 1px solid var(--border-light);
          gap: 0.5rem;
        }
        .painel-field-image .painel-label {
          margin-bottom: 0.15rem;
        }
        .painel-image-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 0.5rem;
        }
        .painel-file-label {
          cursor: pointer;
        }
        .painel-file-label input {
          position: absolute;
          width: 0;
          height: 0;
          opacity: 0;
        }
        .painel-file-btn {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 0.5rem;
          color: var(--text-primary);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }
        .painel-file-label:hover .painel-file-btn {
          background: var(--border-color);
        }
        .painel-file-label input:disabled + .painel-file-btn {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .painel-image-preview {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .painel-image-preview img {
          width: 44px;
          height: 44px;
          object-fit: cover;
          border-radius: 0.5rem;
          border: 1px solid var(--border-color);
        }
        .painel-submit {
          margin-top: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: var(--secondary);
          color: var(--primary-dark);
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          align-self: flex-start;
        }
        .painel-submit:hover {
          filter: brightness(1.05);
        }
        .painel-anime-group {
          margin-bottom: 1.25rem;
        }
        .painel-anime-group:last-child {
          margin-bottom: 0;
        }
        .painel-anime-group h3 {
          margin: 0 0 0.5rem;
          font-size: 1rem;
          color: var(--accent);
          font-weight: 600;
        }
        .painel-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .painel-list li {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.6rem 0;
          border-bottom: 1px solid var(--border-color);
        }
        .painel-list li:last-child {
          border-bottom: none;
        }
        .painel-list li .muted {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        .painel-list li button {
          margin-left: auto;
          padding: 0.35rem 0.65rem;
          font-size: 0.85rem;
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          border-radius: 0.375rem;
          cursor: pointer;
        }
        .painel-list li button:hover {
          color: var(--text-primary);
          border-color: var(--text-secondary);
        }
      `}</style>
    </>
  );
}
