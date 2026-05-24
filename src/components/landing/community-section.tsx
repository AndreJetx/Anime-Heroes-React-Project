"use client";

import { Twitter, Youtube, Twitch, MessageSquare, Users, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    icon: Twitter,
    label: "Twitter",
    followers: "850K",
    color: "hover:ring-2 hover:ring-sky-500/60 hover:bg-sky-500/20 hover:text-sky-400",
  },
  {
    icon: Youtube,
    label: "YouTube",
    followers: "1.2M",
    color: "hover:ring-2 hover:ring-blue-500/60 hover:bg-blue-500/20 hover:text-blue-400",
  },
  {
    icon: Twitch,
    label: "Twitch",
    followers: "500K",
    color: "hover:ring-2 hover:ring-purple-500/60 hover:bg-purple-500/20 hover:text-purple-400",
  },
  {
    icon: MessageSquare,
    label: "Discord",
    followers: "2.1M",
    color: "hover:ring-2 hover:ring-indigo-500/60 hover:bg-indigo-500/20 hover:text-indigo-400",
  },
];

const communityStats = [
  { icon: Users, value: "5M+", label: "Membros Ativos" },
  { icon: Heart, value: "10M+", label: "Partidas por Dia" },
];

export function CommunitySection() {
  return (
    <section
      id="community"
      className="relative flex scroll-mt-28 flex-col items-center px-5 py-0 sm:px-8 md:py-36 lg:py-0"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center">
        <div className="mb-8 w-full max-w-3xl px-2 text-center md:mb-20 lg:mb-24">
          <h2 className="font-[var(--font-display)] mb-4 text-5xl font-bold tracking-wider md:text-7xl">
            <span className="text-foreground">JUNTE-SE À</span>
            <span className="text-primary"> COMUNIDADE</span>
          </h2>
          <p className="mx-auto max-w-xl text-pretty text-muted-foreground">
            Conecte-se com milhões de jogadores ao redor do mundo.
          </p>
        </div>

        <div className="mb-8 grid w-full max-w-md grid-cols-2 justify-items-stretch gap-6 md:mb-20 lg:mb-24">
          {communityStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-card/50 p-6 text-center shadow-lg shadow-black/15">
              <stat.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
              <div className="font-[var(--font-display)] mb-1 text-4xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid w-full max-w-2xl grid-cols-2 justify-items-center gap-6 md:max-w-none md:grid-cols-4 md:justify-items-stretch md:gap-8">
          {socialLinks.map((social, index) => (
            <a
              key={social.label}
              href="#"
              className={cn(
                "group flex w-full max-w-[11rem] flex-col items-center gap-4 rounded-2xl bg-card/50 p-6 shadow-lg shadow-black/15 sm:max-w-none",
                "transition-all duration-300 hover:-translate-y-2 hover:shadow-lg",
                social.color
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <social.icon className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" />
              <div className="text-center">
                <p className="font-bold text-foreground">{social.label}</p>
                <p className="text-sm text-muted-foreground">{social.followers} seguidores</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
