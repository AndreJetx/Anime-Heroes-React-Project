"use client"

import { useState } from "react"
import { Sword, Shield, Zap, Wind } from "lucide-react"
import { cn } from "@/lib/utils"

const characters = [
  {
    id: 1,
    name: "RYKER",
    title: "O Destruidor",
    description: "Mestre do combate corpo a corpo, Ryker usa sua força bruta para esmagar seus oponentes.",
    stats: { attack: 95, defense: 70, speed: 60 },
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=700&fit=crop",
    color: "from-blue-600 to-indigo-600"
  },
  {
    id: 2,
    name: "NOVA",
    title: "A Relâmpago",
    description: "Veloz como um raio, Nova ataca antes que seus inimigos possam reagir.",
    stats: { attack: 80, defense: 50, speed: 98 },
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0e?w=500&h=700&fit=crop",
    color: "from-blue-600 to-cyan-600"
  },
  {
    id: 3,
    name: "TITAN",
    title: "O Guardião",
    description: "Um bastião de defesa impenetrável, Titan protege seus aliados a todo custo.",
    stats: { attack: 65, defense: 98, speed: 45 },
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=700&fit=crop",
    color: "from-emerald-600 to-teal-600"
  },
  {
    id: 4,
    name: "SHADOW",
    title: "O Assassino",
    description: "Mestre da furtividade, Shadow elimina seus alvos antes de serem detectados.",
    stats: { attack: 90, defense: 40, speed: 85 },
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=700&fit=crop",
    color: "from-purple-600 to-pink-600"
  },
]

export function CharactersSection() {
  const [activeCharacter, setActiveCharacter] = useState(characters[0])
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleCharacterChange = (character: typeof characters[0]) => {
    if (character.id === activeCharacter.id) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveCharacter(character)
      setIsTransitioning(false)
    }, 300)
  }

  return (
    <section id="characters" className="relative py-32 px-6">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="font-[var(--font-display)] text-5xl md:text-7xl font-bold tracking-wider mb-4">
          <span className="text-foreground">ESCOLHA SEU</span>
          <span className="text-primary"> CAMPEÃO</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Cada lutador possui habilidades únicas. Encontre o que combina com seu estilo de jogo.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Character Display */}
        <div className="relative">
          <div
            className={cn(
              "relative aspect-[3/4] rounded-2xl overflow-hidden",
              "border border-border",
              "transform transition-all duration-500",
              isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
            )}
          >
            <img
              src={activeCharacter.image}
              alt={activeCharacter.name}
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
            <div className={cn(
              "absolute inset-0 bg-gradient-to-t",
              activeCharacter.color,
              "opacity-30"
            )} />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            
            {/* Character Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm mb-4">
                {activeCharacter.title}
              </div>
              <h3 className="font-[var(--font-display)] text-6xl font-bold text-foreground mb-4">
                {activeCharacter.name}
              </h3>
              <p className="text-muted-foreground">
                {activeCharacter.description}
              </p>

              {/* Stats */}
              <div className="mt-6 space-y-3">
                {[
                  { icon: Sword, label: "Ataque", value: activeCharacter.stats.attack },
                  { icon: Shield, label: "Defesa", value: activeCharacter.stats.defense },
                  { icon: Wind, label: "Velocidade", value: activeCharacter.stats.speed },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <stat.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground w-20">{stat.label}</span>
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full bg-gradient-to-r",
                          activeCharacter.color,
                          "transition-all duration-700"
                        )}
                        style={{ width: `${stat.value}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-foreground w-8">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className={cn(
            "absolute -inset-4 rounded-3xl -z-10 opacity-50 blur-xl bg-gradient-to-r",
            activeCharacter.color
          )} />
        </div>

        {/* Character Selection */}
        <div className="grid grid-cols-2 gap-4">
          {characters.map((character, index) => (
            <button
              key={character.id}
              onClick={() => handleCharacterChange(character)}
              className={cn(
                "relative group aspect-[4/5] rounded-xl overflow-hidden",
                "border-2 transition-all duration-300",
                activeCharacter.id === character.id
                  ? "border-primary scale-[1.02] shadow-[0_0_30px_rgba(30,64,175,0.4)]"
                  : "border-border hover:border-primary/50 hover:scale-[1.02]"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="font-[var(--font-display)] text-2xl font-bold text-foreground">
                  {character.name}
                </h4>
                <p className="text-xs text-muted-foreground">{character.title}</p>
              </div>
              
              {activeCharacter.id === character.id && (
                <div className="absolute top-3 right-3">
                  <Zap className="w-5 h-5 text-primary" fill="currentColor" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
