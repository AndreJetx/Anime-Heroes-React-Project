"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const newsItems = [
  {
    id: 1,
    title: "Novo Lutador Anunciado: Shadow Blade",
    description:
      "Prepare-se para a chegada do misterioso Shadow Blade, o mestre das sombras que vai revolucionar o meta do jogo.",
    date: "15 Mar 2026",
    tag: "PERSONAGEM",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Temporada 3: Rise of Champions",
    description:
      "A nova temporada chegou com novos mapas, modos de jogo e recompensas exclusivas para os melhores lutadores.",
    date: "10 Mar 2026",
    tag: "TEMPORADA",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0e?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Torneio Mundial 2026",
    description:
      "Inscrições abertas para o maior torneio de ANIME HEROES. Prêmio total de $500.000 para os campeões.",
    date: "05 Mar 2026",
    tag: "ESPORTS",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Atualização 2.5 - Balanceamento",
    description:
      "Ajustes importantes em diversos personagens e correções de bugs reportados pela comunidade.",
    date: "01 Mar 2026",
    tag: "UPDATE",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
  },
];

export function NewsModal({ isOpen, onClose }: NewsModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md"
        onClick={onClose}
        role="presentation"
      />

      <aside className="fixed right-0 top-0 z-[100] h-full w-full max-w-lg overflow-y-auto border-l border-border bg-card/95 backdrop-blur-xl shadow-2xl">
        <div className="sticky top-0 z-10 border-b border-border bg-card/95 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-[var(--font-display)] text-3xl font-bold tracking-wider text-foreground">
                NOVIDADES
              </h2>
              <p className="text-sm text-muted-foreground">Últimas atualizações do jogo</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "rounded-lg p-2",
                "bg-secondary text-muted-foreground hover:bg-primary/20 hover:text-primary",
                "transition-all duration-300 hover:rotate-90"
              )}
              aria-label="Fechar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="space-y-4 p-6">
          {newsItems.map((news, index) => (
            <article
              key={news.id}
              className={cn(
                "group cursor-pointer overflow-hidden rounded-xl",
                "border border-border bg-secondary/50",
                "transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-secondary"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-40 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={news.image}
                  alt={news.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  {news.tag}
                </span>
              </div>

              <div className="p-4">
                <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{news.date}</span>
                </div>
                <h3 className="mb-2 font-bold text-foreground transition-colors group-hover:text-primary">
                  {news.title}
                </h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{news.description}</p>
                <div className="mt-3 flex translate-x-0 items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                  <span>Ler mais</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="p-6 pt-0">
          <button
            type="button"
            className={cn(
              "w-full rounded-lg border border-border py-3",
              "text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary"
            )}
          >
            Ver todas as novidades
          </button>
        </div>
      </aside>
    </>,
    document.body
  );
}
