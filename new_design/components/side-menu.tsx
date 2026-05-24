"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Home, Gamepad2, Users, Download, Newspaper, Trophy, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { NewsModal } from "./news-modal"
import Image from "next/image"

const menuItems = [
  { icon: Home, label: "Início", href: "#hero" },
  { icon: Gamepad2, label: "Personagens", href: "#characters" },
  { icon: Trophy, label: "Modos de Jogo", href: "#modes" },
  { icon: Users, label: "Comunidade", href: "#community" },
  { icon: Download, label: "Download", href: "#download" },
  { icon: Settings, label: "Configurações", href: "#" },
]

export function SideMenu() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isNewsOpen, setIsNewsOpen] = useState(false)

  const handleNewsClick = () => {
    setIsNewsOpen(true)
  }

  return (
    <>
      {/* Side Menu - Always Visible */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full",
          "bg-card/95 backdrop-blur-xl border-r border-border",
          "transform transition-all duration-300 ease-out",
          "flex flex-col",
          isExpanded ? "w-72" : "w-20"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "pt-6 px-4 pb-4 border-b border-border",
          "transition-all duration-300",
          isExpanded ? "px-6" : "px-2"
        )}>
          {isExpanded ? (
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="ANIME HEROES"
                width={180}
                height={120}
                className="w-auto h-16 object-contain"
              />
            </div>
          ) : (
            <div className="flex justify-center">
              <Image
                src="/images/logo.png"
                alt="ANIME HEROES"
                width={50}
                height={50}
                className="w-12 h-12 object-contain"
              />
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "absolute top-20 -right-3 z-50",
            "w-6 h-6 rounded-full",
            "bg-primary text-primary-foreground",
            "flex items-center justify-center",
            "shadow-lg shadow-primary/30",
            "hover:scale-110 transition-transform duration-200"
          )}
        >
          {isExpanded ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {/* Menu Items */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-3 py-3 rounded-lg mb-1",
                "text-muted-foreground hover:text-foreground",
                "hover:bg-primary/10 hover:border-l-2 hover:border-primary",
                "transition-all duration-200 group",
                !isExpanded && "justify-center"
              )}
              title={!isExpanded ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 group-hover:text-primary transition-colors shrink-0" />
              {isExpanded && (
                <span className="font-medium whitespace-nowrap">{item.label}</span>
              )}
            </a>
          ))}

          {/* News Button - Special */}
          <button
            onClick={handleNewsClick}
            className={cn(
              "w-full flex items-center gap-4 px-3 py-3 rounded-lg mb-1",
              "bg-primary/20 text-primary border border-primary/30",
              "hover:bg-primary/30 hover:border-primary",
              "transition-all duration-200 group",
              !isExpanded && "justify-center"
            )}
            title={!isExpanded ? "Novidades" : undefined}
          >
            <Newspaper className="w-5 h-5 shrink-0" />
            {isExpanded && (
              <>
                <span className="font-medium whitespace-nowrap">Novidades</span>
                <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground animate-pulse">
                  NOVO
                </span>
              </>
            )}
          </button>
        </nav>

        {/* Bottom Section */}
        {isExpanded && (
          <div className="p-4 border-t border-border">
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-xs text-muted-foreground mb-2">Próximo torneio em</p>
              <div className="flex gap-2 text-primary font-bold text-sm">
                <span className="bg-primary/20 px-2 py-1 rounded">02D</span>
                <span className="bg-primary/20 px-2 py-1 rounded">14H</span>
                <span className="bg-primary/20 px-2 py-1 rounded">32M</span>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* News Modal */}
      <NewsModal isOpen={isNewsOpen} onClose={() => setIsNewsOpen(false)} />
    </>
  )
}
