"use client";

import { Twitter, Youtube, Twitch, MessageSquare, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const socialIcons = [
  { icon: Twitter, href: "#" },
  { icon: Youtube, href: "#" },
  { icon: Twitch, href: "#" },
  { icon: MessageSquare, href: "#" },
];

export function LandingFooter() {
  const { t } = useTranslation();
  const footerLinks = [
    {
      title: "Jogo",
      links: [
        { label: "Personagens", href: "#characters" },
        { label: "Modos de Jogo", href: "#modes" },
        { label: "Download", href: "#download" },
        { label: "FAQ", href: "#FAQ" },
      ],
    },
    {
      title: "Site",
      links: [
        { label: t("navhome"), href: "/" },
        { label: t("navguide"), href: "/guide" },
        { label: t("navdownload"), href: "#download" },
        { label: "Painel", href: "/painel" },
      ],
    },
    {
      title: "Suporte",
      links: [
        { label: "Central de Ajuda", href: "#" },
        { label: "Contato", href: "#" },
        { label: "FAQ", href: "#FAQ" },
        { label: "Reportar Bug", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Termos de Uso", href: "#" },
        { label: "Privacidade", href: "#" },
        { label: "Cookies", href: "#" },
        { label: "EULA", href: "#" },
      ],
    },
  ];

  return (
    <footer className="relative flex flex-col items-center px-5 py-0 sm:px-8 md:py-36 lg:py-0">
      <div className="w-full max-w-6xl text-center md:text-left">
        <div className="mb-12 grid grid-cols-2 justify-items-center gap-x-6 gap-y-8 md:mb-16 md:grid-cols-5 md:justify-items-start md:gap-x-12 lg:mb-16">
          <div className="col-span-2 flex flex-col items-center md:col-span-1 md:items-start">
            <Image
              src="/images/logo.png"
              alt="ANIME HEROES"
              width={150}
              height={100}
              className="mb-4 h-16 w-auto object-contain"
            />
            <p className="mb-6 text-sm text-muted-foreground">
              O jogo de luta de anime definitivo. Entre na arena e prove seu valor.
            </p>
            <div className="flex justify-center gap-3 md:justify-start">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={cn(
                    "rounded-lg p-2 text-muted-foreground transition-all duration-300",
                    "bg-secondary/50 hover:bg-primary/20 hover:text-primary"
                  )}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="text-center md:text-left">
              <h4 className="mb-4 font-bold text-foreground">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-6 pt-12 md:flex-row md:pt-16">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Anime Heroes. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Feito com <Heart className="h-4 w-4 fill-current text-primary" /> para gamers
          </p>
        </div>
      </div>
    </footer>
  );
}
