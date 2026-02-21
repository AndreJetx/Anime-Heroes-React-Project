import React, { useEffect, useState, useCallback } from "react";
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

type Slide = { id: string; imageUrl: string; sortOrder: number };
type PendingFile = { file: File; preview: string };

export default function PainelCarouselPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState<PendingFile[]>([]);

  const fetchSlides = useCallback(async () => {
    const res = await fetch("/api/panel/carousel", { credentials: "include" });
    if (res.ok) setSlides(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSlides();
  }, [fetchSlides]);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    const newPending: PendingFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;
      newPending.push({ file, preview: URL.createObjectURL(file) });
    }
    setPending((prev) => [...prev, ...newPending]);
    setMessage("");
    e.target.value = "";
  };

  const removePending = (index: number) => {
    setPending((prev) => {
      const next = [...prev];
      URL.revokeObjectURL(next[index].preview);
      next.splice(index, 1);
      return next;
    });
  };

  const sendAll = async () => {
    const total = pending.length;
    if (!total) return;
    setUploading(true);
    setMessage("");
    let ok = 0;
    let err = "";
    for (let i = 0; i < total; i++) {
      const { file, preview } = pending[i];
      try {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const data = (reader.result as string).split(",")[1];
            resolve(data ?? "");
          };
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        });
        const uploadRes = await fetch("/api/panel/upload?bucket=carousel", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ base64, contentType: file.type }),
        });
        const uploadData = await uploadRes.json().catch(() => ({}));
        if (!uploadRes.ok) {
          err = uploadData.message || "Erro no upload";
          break;
        }
        const addRes = await fetch("/api/panel/carousel", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ imageUrl: uploadData.url, sortOrder: slides.length + i }),
        });
        if (addRes.ok) ok++;
        else {
          err = "Erro ao salvar no carrossel.";
          break;
        }
      } catch {
        err = "Falha na rede. Verifique o tamanho da imagem ou SUPABASE_SERVICE_ROLE_KEY.";
        break;
      } finally {
        URL.revokeObjectURL(preview);
      }
    }
    setPending([]);
    setUploading(false);
    if (err) setMessage(err);
    else {
      setMessage(ok === total ? `${ok} imagem(ns) adicionada(s).` : `${ok} enviada(s). ${err}`);
      fetchSlides();
    }
  };

  return (
    <>
      <Head>
        <title>Painel - Carrossel</title>
      </Head>
      <div className="painel-page">
        <header className="painel-header">
          <Link href="/painel/dashboard">Voltar</Link>
          <h1>Carrossel</h1>
        </header>
        {message && <p className="painel-msg">{message}</p>}

        <section className="painel-section painel-section-current">
          <h2>Imagens no carrossel</h2>
          {loading ? (
            <p className="painel-muted">Carregando…</p>
          ) : slides.length === 0 ? (
            <p className="painel-muted">Nenhuma imagem ainda.</p>
          ) : (
            <ul className="painel-grid">
              {slides.map((s) => (
                <li key={s.id} className="painel-grid-item">
                  <img src={s.imageUrl} alt="" />
                  <div className="painel-grid-actions">
                    <button
                      type="button"
                      onClick={async () => {
                        if (!confirm("Remover esta imagem do carrossel?")) return;
                        await fetch("/api/panel/carousel?id=" + s.id, { method: "DELETE", credentials: "include" });
                        fetchSlides();
                      }}
                    >
                      Remover
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="painel-section">
          <h2>Adicionar imagens</h2>
          <label className="painel-file-label">
            <span className="painel-file-btn">Escolher arquivos</span>
            <input type="file" accept="image/*" multiple onChange={handleSelect} disabled={uploading} />
          </label>
          {pending.length > 0 && (
            <>
              <p className="painel-pending-label">{pending.length} arquivo(s) selecionado(s). Clique em Enviar para adicionar ao carrossel.</p>
              <ul className="painel-grid painel-grid-pending">
                {pending.map((p, i) => (
                  <li key={i} className="painel-grid-item">
                    <img src={p.preview} alt="" />
                    <button type="button" className="painel-remove-pending" onClick={() => removePending(i)} title="Remover da lista">
                      ×
                    </button>
                  </li>
                ))}
              </ul>
              <div className="painel-actions">
                <button type="button" className="painel-btn primary" onClick={sendAll} disabled={uploading}>
                  {uploading ? "Enviando…" : "Enviar"}
                </button>
                <button
                  type="button"
                  className="painel-btn"
                  onClick={() => {
                    pending.forEach((p) => URL.revokeObjectURL(p.preview));
                    setPending([]);
                  }}
                  disabled={uploading}
                >
                  Limpar seleção
                </button>
              </div>
            </>
          )}
        </section>
      </div>
      <style jsx>{`
        .painel-page { min-height: 100vh; background: var(--dark-bg); color: var(--text-primary); padding: 2rem; max-width: 800px; margin: 0 auto; }
        .painel-header { margin-bottom: 1.5rem; }
        .painel-header a { color: var(--accent); margin-right: 1rem; }
        .painel-header h1 { margin: 0.5rem 0 0; color: var(--secondary); }
        .painel-msg { padding: 0.75rem; background: var(--primary-light); border-radius: 0.5rem; margin-bottom: 1rem; }
        .painel-section { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 1rem; padding: 1.5rem; margin-bottom: 1.5rem; }
        .painel-section h2 { margin: 0 0 1rem; font-size: 1.1rem; color: var(--secondary); }
        .painel-muted { color: var(--text-secondary); font-size: 0.9rem; margin: 0; }
        .painel-grid { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 1rem; }
        .painel-grid-item { position: relative; border-radius: 8px; overflow: hidden; background: var(--hover-bg); aspect-ratio: 16/10; }
        .painel-grid-item img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .painel-grid-actions { position: absolute; bottom: 0; left: 0; right: 0; padding: 0.5rem; background: rgba(0,0,0,0.6); display: flex; justify-content: flex-end; }
        .painel-grid-actions button { padding: 0.25rem 0.5rem; font-size: 0.8rem; background: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-primary); border-radius: 0.25rem; cursor: pointer; }
        .painel-grid-pending .painel-grid-item { outline: 2px dashed var(--border-color); }
        .painel-remove-pending { position: absolute; top: 4px; right: 4px; width: 24px; height: 24px; padding: 0; border: none; border-radius: 50%; background: rgba(0,0,0,0.7); color: #fff; font-size: 1.2rem; line-height: 1; cursor: pointer; }
        .painel-file-label { display: inline-block; cursor: pointer; }
        .painel-file-btn { display: inline-block; padding: 0.5rem 1rem; background: var(--secondary); color: var(--primary-dark); border-radius: 0.5rem; font-weight: 600; }
        .painel-file-label input { position: absolute; width: 0; height: 0; opacity: 0; }
        .painel-pending-label { margin: 1rem 0 0.5rem; font-size: 0.9rem; color: var(--text-secondary); }
        .painel-actions { margin-top: 1rem; display: flex; gap: 0.75rem; }
        .painel-btn { padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 600; cursor: pointer; border: 1px solid var(--border-color); background: var(--hover-bg); color: var(--text-primary); }
        .painel-btn.primary { background: var(--secondary); color: var(--primary-dark); border-color: var(--secondary); }
        .painel-btn:disabled { opacity: 0.7; cursor: not-allowed; }
      `}</style>
    </>
  );
}
