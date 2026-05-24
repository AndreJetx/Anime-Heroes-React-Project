"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Play, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Subtitle */}
        <div
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8",
            "bg-primary/10 border border-primary/30",
            "transform transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-primary text-sm font-medium">NOVO PERSONAGEM DISPONÍVEL</span>
        </div>

        {/* Logo Image */}
        <div
          className={cn(
            "flex justify-center mb-8",
            "transform transition-all duration-700 delay-150",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <Image
            src="/images/logo.png"
            alt="ANIME HEROES"
            width={400}
            height={300}
            className="w-auto h-48 md:h-64 object-contain drop-shadow-[0_0_30px_rgba(30,64,175,0.5)]"
            priority
          />
        </div>

        {/* Description */}
        <p
          className={cn(
            "text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12",
            "transform transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Entre na arena e prove seu valor. O jogo de luta de anime mais épico já criado. 
          Escolha seu herói e domine o combate.
        </p>

        {/* CTA Buttons */}
        <div
          className={cn(
            "flex flex-col sm:flex-row items-center justify-center gap-4",
            "transform transition-all duration-700 delay-450",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <a
            href="#download"
            className={cn(
              "group relative px-8 py-4 rounded-lg overflow-hidden",
              "bg-primary text-primary-foreground font-bold text-lg",
              "transform transition-all duration-300 hover:scale-105",
              "shadow-[0_0_30px_rgba(30,64,175,0.4)]",
              "hover:shadow-[0_0_50px_rgba(30,64,175,0.6)]"
            )}
          >
            <span className="relative z-10">JOGAR AGORA</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          <button
            className={cn(
              "flex items-center gap-3 px-8 py-4 rounded-lg",
              "bg-secondary/50 border border-border text-foreground",
              "hover:bg-secondary hover:border-primary/50",
              "transition-all duration-300 group"
            )}
          >
            <div className="p-2 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
              <Play className="w-4 h-4 text-primary" fill="currentColor" />
            </div>
            <span className="font-medium">Ver Trailer</span>
          </button>
        </div>

        {/* Stats */}
        <div
          className={cn(
            "grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20",
            "transform transition-all duration-700 delay-600",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {[
            { value: "2M+", label: "Jogadores" },
            { value: "32", label: "Heróis" },
            { value: "15", label: "Arenas" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-[var(--font-display)] text-4xl md:text-5xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-muted-foreground" />
      </div>
    </section>
  )
}
