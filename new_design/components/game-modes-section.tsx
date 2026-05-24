"use client"

import { Users, Swords, Trophy, Crown, Target, Flame } from "lucide-react"
import { cn } from "@/lib/utils"

const gameModes = [
  {
    icon: Swords,
    title: "DUELO 1v1",
    description: "Enfrente seu oponente em combate direto. Sem desculpas, apenas habilidade pura.",
    players: "2 Jogadores",
    highlight: false
  },
  {
    icon: Users,
    title: "BATALHA EM EQUIPE",
    description: "Monte seu time e coordene estratégias para dominar o campo de batalha.",
    players: "2v2 até 5v5",
    highlight: true
  },
  {
    icon: Trophy,
    title: "RANQUEADA",
    description: "Suba no ranking global e prove que você é o melhor lutador do mundo.",
    players: "Competitivo",
    highlight: false
  },
  {
    icon: Crown,
    title: "REI DA COLINA",
    description: "Seja o último de pé e conquiste o título de Rei da Arena.",
    players: "8 Jogadores",
    highlight: false
  },
  {
    icon: Target,
    title: "TREINAMENTO",
    description: "Aprimore suas técnicas e combos no modo de treino ilimitado.",
    players: "Solo",
    highlight: false
  },
  {
    icon: Flame,
    title: "SOBREVIVÊNCIA",
    description: "Enfrente ondas infinitas de inimigos e veja até onde você consegue chegar.",
    players: "1-4 Jogadores",
    highlight: false
  },
]

export function GameModesSection() {
  return (
    <section id="modes" className="relative py-32 px-6 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[128px] -translate-y-1/2 -translate-x-1/2" />
      
      {/* Section Header */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="font-[var(--font-display)] text-5xl md:text-7xl font-bold tracking-wider mb-4">
          <span className="text-foreground">MODOS DE</span>
          <span className="text-primary"> JOGO</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Diferentes formas de combate para todos os estilos de jogadores.
        </p>
      </div>

      {/* Game Modes Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {gameModes.map((mode, index) => (
          <div
            key={mode.title}
            className={cn(
              "group relative p-6 rounded-2xl",
              "bg-card/50 backdrop-blur-sm border",
              "transition-all duration-500 cursor-pointer",
              "hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]",
              mode.highlight
                ? "border-primary/50 bg-primary/5 md:col-span-2 lg:col-span-1"
                : "border-border hover:border-primary/30"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Icon */}
            <div className={cn(
              "w-14 h-14 rounded-xl flex items-center justify-center mb-5",
              "bg-primary/10 group-hover:bg-primary/20",
              "transition-all duration-300"
            )}>
              <mode.icon className="w-7 h-7 text-primary" />
            </div>

            {/* Content */}
            <h3 className="font-[var(--font-display)] text-2xl font-bold text-foreground mb-2 tracking-wide">
              {mode.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              {mode.description}
            </p>

            {/* Players Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 text-muted-foreground text-xs">
              <Users className="w-3 h-3" />
              <span>{mode.players}</span>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            {/* Highlight Badge */}
            {mode.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                POPULAR
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
