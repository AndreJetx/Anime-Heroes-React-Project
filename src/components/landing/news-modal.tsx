"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteUpdates } from "@/contexts/site-updates";

export interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatUpdateDate(value: string): string {
  try {
    return new Date(value).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export function NewsModal({ isOpen, onClose }: NewsModalProps) {
  const [mounted, setMounted] = useState(false);
  const { updates, loading, error, refresh } = useSiteUpdates();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    void refresh();
  }, [isOpen, refresh]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="landing-root landing-news-modal">
      <div
        className="fixed inset-0 z-[100] bg-[#050810]/75 backdrop-blur-md"
        onClick={onClose}
        role="presentation"
      />

      <aside
        className={cn(
          "fixed right-0 top-0 z-[101] h-full w-full max-w-lg overflow-y-auto overscroll-contain",
          "border-l border-white/10 bg-[#070b14] shadow-2xl"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Novidades"
      >
        <header
          className={cn(
            "sticky top-0 z-20 border-b border-white/10 px-6 py-5",
            "bg-[#070b14]/50 shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
            "backdrop-blur-2xl backdrop-saturate-150",
            "[@supports(backdrop-filter:blur(0))]:bg-[#070b14]/45"
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-[var(--font-display)] text-3xl font-bold tracking-wider text-white">
                NOVIDADES
              </h2>
              <p className="text-sm text-zinc-400">Últimas atualizações do jogo</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "shrink-0 rounded-lg p-2",
                "bg-white/10 text-zinc-300 hover:bg-blue-500/20 hover:text-white",
                "transition-all duration-300 hover:rotate-90"
              )}
              aria-label="Fechar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </header>

        <div className="space-y-4 p-6">
            {loading && updates.length === 0 ? (
              <p className="py-8 text-center text-sm text-zinc-400">Carregando…</p>
            ) : error && updates.length === 0 ? (
              <p className="py-8 text-center text-sm text-red-400">{error}</p>
            ) : updates.length === 0 ? (
              <p className="py-8 text-center text-sm text-zinc-400">
                Nenhuma atualização no momento.
              </p>
            ) : (
              updates.map((news, index) => (
                <article
                  key={news.id}
                  className={cn(
                    "overflow-hidden rounded-xl",
                    "border border-white/10 bg-[#0c1220]/80",
                    "transition-all duration-300"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-5">
                    <div className="mb-2 flex items-center gap-2 text-xs text-zinc-500">
                      <Calendar className="h-3 w-3 shrink-0" />
                      <span>{formatUpdateDate(news.createdAt)}</span>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-white">{news.title}</h3>
                    {news.content ? (
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-400">
                        {news.content}
                      </p>
                    ) : null}
                  </div>
                </article>
              ))
            )}
        </div>
      </aside>
    </div>,
    document.body
  );
}
