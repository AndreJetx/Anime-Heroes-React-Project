"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Play, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { TrailerModal } from "@/components/landing/trailer-modal";
import { toYoutubeEmbedUrl } from "@/lib/youtube-embed";

export function HeroSection() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { trailerUrl?: string } | null) => {
        if (data?.trailerUrl?.trim()) setTrailerUrl(data.trailerUrl.trim());
      })
      .catch(() => {});
  }, []);

  const trailerEmbedUrl = useMemo(() => toYoutubeEmbedUrl(trailerUrl), [trailerUrl]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col overflow-hidden scroll-mt-0 pt-[4.75rem] sm:pt-20 md:pt-24 lg:pt-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/90 md:via-background/25" />
      <div className="absolute left-1/2 top-[10%] h-44 w-44 -translate-x-1/2 animate-pulse rounded-full bg-primary/15 blur-[72px] md:left-1/4 md:top-1/4 md:h-96 md:w-96 md:translate-x-0 md:blur-[128px]" />
      <div className="absolute bottom-[15%] right-[5%] h-40 w-40 animate-pulse rounded-full bg-primary/10 blur-[64px] md:bottom-1/4 md:right-1/4 md:h-96 md:w-96 md:blur-[128px] [animation-delay:1s]" />

      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center px-5 pb-28 sm:px-8 md:pb-36">
        <div className="flex w-full max-w-5xl flex-col items-center text-center">
          <div
            className={cn(
              "mb-8 flex w-full justify-center",
              "transform transition-all duration-700",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
              <Zap className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-sm font-medium text-primary">{t("heroBadgeNew")}</span>
            </div>
          </div>

          <div
            className={cn(
              "mb-8 flex w-full justify-center",
              "transform transition-all duration-700 [transition-delay:150ms]",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
          >
            <Image
              src="/images/logo-hero.png"
              alt="ANIME HEROES"
              width={480}
              height={480}
              priority
              className={cn(
                "h-auto w-full max-w-[min(100%,20rem)] object-contain sm:max-w-[22rem] md:max-w-[26rem]",
                "drop-shadow-[0_0_40px_rgba(59,130,246,0.45)]"
              )}
            />
          </div>

          <p
            className={cn(
              "mb-12 w-full max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl",
              "transform transition-all duration-700 [transition-delay:300ms]",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
          >
            {t("descriptionhome")}
          </p>

          <div
            className={cn(
              "flex w-full max-w-xl flex-col items-stretch justify-center gap-4 sm:max-w-none sm:flex-row sm:items-center sm:justify-center",
              "transform transition-all duration-700 [transition-delay:450ms]",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
          >
            <a
              href="#download"
              className={cn(
                "group relative w-full overflow-hidden rounded-lg bg-primary px-8 py-4 text-center text-lg font-bold text-primary-foreground sm:w-auto",
                "shadow-[0_0_30px_rgba(30,64,175,0.4)] transition-all duration-300 hover:scale-105",
                "hover:shadow-[0_0_50px_rgba(30,64,175,0.6)]"
              )}
            >
              <span className="relative z-10">{t("heroPlayNow")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-800 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>

            <button
              type="button"
              onClick={() => setIsTrailerOpen(true)}
              className={cn(
                "group flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-secondary/50 px-8 py-4 text-foreground sm:w-auto",
                "transition-all duration-300 hover:border-primary/50 hover:bg-secondary"
              )}
            >
              <div className="rounded-full bg-primary/20 p-2 transition-colors group-hover:bg-primary/30">
                <Play className="h-4 w-4 fill-current text-primary" />
              </div>
              <span className="font-medium">{t("heroWatchTrailer")}</span>
            </button>
          </div>

          <div
            className={cn(
              "mt-20 grid w-full max-w-2xl grid-cols-3 justify-items-center gap-4 sm:gap-8",
              "transform transition-all duration-700 [transition-delay:600ms]",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
          >
            {[
              { value: "2M+", label: t("heroStatPlayers") },
              { value: "32", label: t("heroStatHeroes") },
              { value: "15", label: t("heroStatArenas") },
            ].map((stat) => (
              <div key={stat.label} className="w-full max-w-[7rem] text-center sm:max-w-none">
                <div className="font-[var(--font-display)] mb-1 text-3xl font-bold text-primary sm:text-4xl md:text-5xl">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-muted-foreground" />
      </div>

      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        embedUrl={trailerEmbedUrl}
      />
    </section>
  );
}
