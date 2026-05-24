"use client"

import { Twitter, Youtube, Twitch, MessageSquare, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const footerLinks = [
  {
    title: "Jogo",
    links: ["Personagens", "Modos de Jogo", "Mapas", "Atualizações"]
  },
  {
    title: "Comunidade",
    links: ["Fóruns", "Eventos", "Criadores de Conteúdo", "eSports"]
  },
  {
    title: "Suporte",
    links: ["Central de Ajuda", "Contato", "FAQ", "Reportar Bug"]
  },
  {
    title: "Legal",
    links: ["Termos de Uso", "Privacidade", "Cookies", "EULA"]
  }
]

const socialIcons = [
  { icon: Twitter, href: "#" },
  { icon: Youtube, href: "#" },
  { icon: Twitch, href: "#" },
  { icon: MessageSquare, href: "#" },
]

export function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo Section */}
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/images/logo.png"
              alt="ANIME HEROES"
              width={150}
              height={100}
              className="w-auto h-16 object-contain mb-4"
            />
            <p className="text-sm text-muted-foreground mb-6">
              O jogo de luta de anime definitivo. Entre na arena e prove seu valor.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={cn(
                    "p-2 rounded-lg",
                    "bg-secondary/50 text-muted-foreground",
                    "hover:bg-primary/20 hover:text-primary",
                    "transition-all duration-300"
                  )}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Anime Heroes. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Feito com <Heart className="w-4 h-4 text-primary" fill="currentColor" /> para gamers
          </p>
        </div>
      </div>
    </footer>
  )
}
