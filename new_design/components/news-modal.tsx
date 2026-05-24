"use client"

import { X, Calendar, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface NewsModalProps {
  isOpen: boolean
  onClose: () => void
}

const newsItems = [
  {
    id: 1,
    title: "Novo Lutador Anunciado: Shadow Blade",
    description: "Prepare-se para a chegada do misterioso Shadow Blade, o mestre das sombras que vai revolucionar o meta do jogo.",
    date: "15 Mar 2026",
    tag: "PERSONAGEM",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Temporada 3: Rise of Champions",
    description: "A nova temporada chegou com novos mapas, modos de jogo e recompensas exclusivas para os melhores lutadores.",
    date: "10 Mar 2026",
    tag: "TEMPORADA",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0e?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Torneio Mundial 2026",
    description: "Inscrições abertas para o maior torneio de ANIME HEROES. Prêmio total de $500.000 para os campeões.",
    date: "05 Mar 2026",
    tag: "ESPORTS",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Atualização 2.5 - Balanceamento",
    description: "Ajustes importantes em diversos personagens e correções de bugs reportados pela comunidade.",
    date: "01 Mar 2026",
    tag: "UPDATE",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop"
  },
]

export function NewsModal({ isOpen, onClose }: NewsModalProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-md transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Modal */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full max-w-lg",
          "bg-card/95 backdrop-blur-xl border-l border-border",
          "transform transition-transform duration-500 ease-out",
          "overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-xl border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-[var(--font-display)] text-3xl font-bold tracking-wider text-foreground">
                NOVIDADES
              </h2>
              <p className="text-muted-foreground text-sm">Últimas atualizações do jogo</p>
            </div>
            <button
              onClick={onClose}
              className={cn(
                "p-2 rounded-lg",
                "bg-secondary hover:bg-primary/20",
                "text-muted-foreground hover:text-primary",
                "transition-all duration-300 hover:rotate-90"
              )}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* News List */}
        <div className="p-6 space-y-4">
          {newsItems.map((news, index) => (
            <article
              key={news.id}
              className={cn(
                "group rounded-xl overflow-hidden",
                "bg-secondary/50 border border-border",
                "hover:border-primary/50 hover:bg-secondary",
                "transition-all duration-300 cursor-pointer",
                "transform hover:-translate-y-1"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full bg-primary text-primary-foreground">
                  {news.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
                  <Calendar className="w-3 h-3" />
                  <span>{news.date}</span>
                </div>
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {news.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {news.description}
                </p>
                <div className="flex items-center gap-1 mt-3 text-primary text-sm font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                  <span>Ler mais</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="p-6 pt-0">
          <button className={cn(
            "w-full py-3 rounded-lg",
            "border border-border hover:border-primary",
            "text-muted-foreground hover:text-primary",
            "transition-all duration-300"
          )}>
            Ver todas as novidades
          </button>
        </div>
      </aside>
    </>
  )
}
