import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function PainelLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/panel/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || "Erro ao entrar");
        return;
      }
      router.replace("/painel/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Painel — Login</title>
      </Head>
      <div className="painel-login">
        <div className="painel-login-box">
          <h1>Painel</h1>
          <p>Digite a senha de acesso</p>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              autoFocus
              disabled={loading}
            />
            {error && <p className="painel-error">{error}</p>}
            <button type="submit" disabled={loading}>
              {loading ? "Entrando…" : "Entrar"}
            </button>
          </form>
        </div>
      </div>
      <style jsx>{`
        .painel-login {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--dark-bg);
        }
        .painel-login-box {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          padding: 2rem;
          width: 100%;
          max-width: 320px;
        }
        .painel-login-box h1 {
          margin: 0 0 0.5rem;
          color: var(--secondary);
        }
        .painel-login-box > p {
          margin: 0 0 1.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        .painel-login-box input {
          width: 100%;
          padding: 0.75rem 1rem;
          margin-bottom: 1rem;
          border: 1px solid var(--border-color);
          border-radius: 0.5rem;
          background: var(--hover-bg);
          color: var(--text-primary);
          font-size: 1rem;
        }
        .painel-login-box button {
          width: 100%;
          padding: 0.75rem;
          background: var(--secondary);
          color: var(--primary-dark);
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
        }
        .painel-login-box button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .painel-error {
          color: #f87171;
          font-size: 0.85rem;
          margin: -0.5rem 0 0.5rem;
        }
      `}</style>
    </>
  );
}
