"use client";

import { Twitter, Youtube, Twitch, MessageSquare, Heart, Shield, Lock } from "lucide-react";
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

const socialIconClass = cn(
  "rounded-lg p-2 text-muted-foreground transition-all duration-300",
  "bg-secondary/50 hover:bg-primary/20 hover:text-primary"
);

function ShieldLockIcon({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex h-5 w-5 items-center justify-center", className)}>
      <Shield className="h-5 w-5" strokeWidth={1.75} />
      <Lock className="absolute h-2.5 w-2.5" strokeWidth={2.25} />
    </span>
  );
}

export function LandingFooter() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const footerLinks = [
    {
      title: t("footerGame"),
      links: [
        { label: t("navcharacters"), href: "#characters" },
        { label: t("navmodes"), href: "#modes" },
        { label: t("navdownload"), href: "#download" },
        { label: t("navfaq"), href: "#FAQ" },
      ],
    },
    {
      title: t("footerSite"),
      links: [
        { label: t("navhome"), href: "/" },
        { label: t("navguide"), href: "/guide" },
        { label: t("navdownload"), href: "#download" },
      ],
    },
    {
      title: t("footerSupport"),
      links: [
        { label: t("footerHelp"), href: "#" },
        { label: t("footerContact"), href: "#" },
        { label: t("navfaq"), href: "#FAQ" },
        { label: t("footerReportBug"), href: "#" },
      ],
    },
    {
      title: t("footerLegal"),
      links: [
        { label: t("footerTerms"), href: "#" },
        { label: t("footerPrivacy"), href: "#" },
        { label: t("footerCookies"), href: "#" },
        { label: t("footerEula"), href: "#" },
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
            <p className="mb-6 text-sm text-muted-foreground">{t("footerTagline")}</p>
            <div className="flex justify-center gap-3 md:justify-start">
              {socialIcons.map((social, index) => (
                <a key={index} href={social.href} className={socialIconClass}>
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
              <Link
                href="/painel"
                className={socialIconClass}
                aria-label={t("navpainel")}
                title={t("navpainel")}
              >
                <ShieldLockIcon />
              </Link>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="text-center md:text-left">
              <h4 className="mb-4 font-bold text-foreground">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={`${section.title}-${link.label}`}>
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
            {t("footerCopyright", { year })}
          </p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            {t("footerMadeFor")} <Heart className="h-4 w-4 fill-current text-primary" />
          </p>
        </div>
      </div>
    </footer>
  );
}
