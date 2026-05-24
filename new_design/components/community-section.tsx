"use client"

import { Twitter, Youtube, Twitch, MessageSquare, Users, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

const socialLinks = [
  { icon: Twitter, label: "Twitter", followers: "850K", color: "hover:bg-sky-500/20 hover:border-sky-500 hover:text-sky-400" },
  { icon: Youtube, label: "YouTube", followers: "1.2M", color: "hover:bg-blue-500/20 hover:border-blue-500 hover:text-blue-400" },
  { icon: Twitch, label: "Twitch", followers: "500K", color: "hover:bg-purple-500/20 hover:border-purple-500 hover:text-purple-400" },
  { icon: MessageSquare, label: "Discord", followers: "2.1M", color: "hover:bg-indigo-500/20 hover:border-indigo-500 hover:text-indigo-400" },
]

const communityStats = [
  { icon: Users, value: "5M+", label: "Membros Ativos" },
  { icon: Heart, value: "10M+", label: "Partidas por Dia" },
]

export function CommunitySection() {
  return (
    <section id="community" className="relative py-32 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl font-bold tracking-wider mb-4">
            <span className="text-foreground">JUNTE-SE À</span>
            <span className="text-primary"> COMUNIDADE</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Conecte-se com milhões de jogadores ao redor do mundo.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto mb-16">
          {communityStats.map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-2xl bg-card/50 border border-border">
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="font-[var(--font-display)] text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {socialLinks.map((social, index) => (
            <a
              key={social.label}
              href="#"
              className={cn(
                "group flex flex-col items-center gap-4 p-6 rounded-2xl",
                "bg-card/50 border border-border",
                "transition-all duration-300",
                "hover:-translate-y-2 hover:shadow-lg",
                social.color
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <social.icon className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" />
              <div className="text-center">
                <p className="font-bold text-foreground">{social.label}</p>
                <p className="text-sm text-muted-foreground">{social.followers} seguidores</p>
              </div>
            </a>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 p-8 rounded-2xl bg-card border border-border">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-[var(--font-display)] text-3xl font-bold text-foreground mb-4 tracking-wide">
              FIQUE POR DENTRO
            </h3>
            <p className="text-muted-foreground mb-6">
              Inscreva-se para receber novidades, atualizações e conteúdo exclusivo.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Seu melhor email"
                className={cn(
                  "flex-1 px-5 py-4 rounded-lg",
                  "bg-secondary border border-border",
                  "text-foreground placeholder:text-muted-foreground",
                  "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary",
                  "transition-all duration-300"
                )}
              />
              <button
                type="submit"
                className={cn(
                  "px-8 py-4 rounded-lg",
                  "bg-primary text-primary-foreground font-bold",
                  "hover:scale-105 transition-transform duration-300",
                  "shadow-[0_0_20px_rgba(30,64,175,0.3)]"
                )}
              >
                INSCREVER
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
