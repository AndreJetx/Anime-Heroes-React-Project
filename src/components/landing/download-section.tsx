"use client";

import { useState, useEffect, useCallback } from "react";
import { Download, Monitor, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const DEFAULT_SLIDES = [
  "/images/imgslide1.png",
  "/images/imgslide2.png",
  "/images/imgslide3.png",
  "/images/imgslide4.png",
];

const DEFAULT_LINK = "https://ko-fi.com/s/d64358779e";
const DEFAULT_VERSION = "v0.99.2";

export function DownloadSection() {
  const { t } = useTranslation();
  const [slides, setSlides] = useState<string[]>(DEFAULT_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [downloadLink, setDownloadLink] = useState(DEFAULT_LINK);
  const [downloadVersion, setDownloadVersion] = useState(DEFAULT_VERSION);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    fetch("/api/carousel")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: { imageUrl: string }[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setSlides(data.map((s) => s.imageUrl));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { downloadLink?: string; downloadVersion?: string } | null) => {
        if (!data) return;
        if (data.downloadLink?.trim()) setDownloadLink(data.downloadLink.trim());
        if (data.downloadVersion?.trim()) setDownloadVersion(data.downloadVersion.trim());
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || isHovering || slides.length === 0) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovering, nextSlide, slides.length]);

  return (
    <section
      id="download"
      className="relative flex scroll-mt-28 flex-col items-center overflow-hidden px-5 py-0 sm:px-8 md:py-36 lg:py-0"
    >
      <div className="absolute bottom-0 right-0 h-56 w-56 translate-x-1/3 translate-y-1/3 rounded-full bg-primary/10 blur-[80px] md:h-[600px] md:w-[600px] md:translate-x-1/2 md:translate-y-1/2 md:blur-[150px]" />

      <div className="relative z-10 mb-8 w-full max-w-3xl px-2 text-center md:mb-20 lg:mb-24">
        <h2 className="font-[var(--font-display)] mb-4 text-5xl font-bold tracking-wider md:text-7xl">
          <span className="text-foreground">{t("downloadTitle1")}</span>
          <span className="text-primary"> {t("downloadTitle2")}</span>
        </h2>
        <p className="mx-auto max-w-xl text-pretty text-muted-foreground">{t("downloadtext")}</p>
      </div>

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center">
        <div className="mb-8 flex flex-col items-center md:mb-20 lg:mb-24">
          <div className="mb-8 flex items-center gap-4 rounded-xl bg-card/50 p-4 shadow-lg shadow-black/15">
            <div className="rounded-lg bg-primary/20 p-3 shadow-inner">
              <Monitor className="h-8 w-8 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-lg font-bold text-foreground">{t("downloadWindows")}</p>
              <p className="text-sm text-muted-foreground">{downloadVersion}</p>
            </div>
          </div>

          <Link
            href={downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl px-16 py-6 text-xl font-bold",
              "bg-primary text-primary-foreground shadow-[0_0_40px_rgba(30,64,175,0.4)] transition-all duration-300 hover:scale-105",
              "hover:shadow-[0_0_60px_rgba(30,64,175,0.6)]"
            )}
          >
            <Download className="h-6 w-6 group-hover:animate-bounce" />
            <span className="relative z-10">{downloadVersion}</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>

          <p className="mt-4 text-xs text-muted-foreground">{t("downloadtext")}</p>
        </div>

        <div
          className="relative w-full max-w-4xl lg:max-w-none"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <h3 className="font-[var(--font-display)] mb-6 text-center text-2xl font-bold tracking-wide text-foreground">
            {t("screenshotsTitle")}
          </h3>

          <div className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-card shadow-2xl shadow-black/30">
            <div className="relative h-full w-full">
              {slides.map((src, index) => (
                <div
                  key={src + index}
                  className={cn(
                    "absolute inset-0 transition-all duration-700",
                    index === currentSlide
                      ? "scale-100 opacity-100"
                      : "scale-95 opacity-0"
                  )}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1152px"
                    unoptimized={src.startsWith("http")}
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wider text-primary">
                        {t("screenshotLabel")}
                      </span>
                      <h3 className="text-xl font-bold text-foreground">
                        {t("screenshotCounter", { current: index + 1, total: slides.length })}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={prevSlide}
              className={cn(
                "absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/90 p-3 text-foreground shadow-lg backdrop-blur-sm",
                "transition-all duration-300 hover:scale-110 hover:text-primary hover:ring-2 hover:ring-primary/40",
                isHovering ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
              )}
              aria-label={t("carouselPrev")}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className={cn(
                "absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/90 p-3 text-foreground shadow-lg backdrop-blur-sm",
                "transition-all duration-300 hover:scale-110 hover:text-primary hover:ring-2 hover:ring-primary/40",
                isHovering ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
              )}
              aria-label={t("carouselNext")}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-4 flex justify-center gap-3">
            {slides.map((src, index) => (
              <button
                key={src + index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "relative h-12 w-20 overflow-hidden rounded-lg ring-2 ring-transparent transition-all duration-300",
                  index === currentSlide
                    ? "scale-110 ring-primary shadow-[0_0_15px_rgba(30,64,175,0.5)]"
                    : "opacity-50 hover:opacity-100 hover:ring-primary/35"
                )}
                aria-label={t("carouselSlide", { n: index + 1 })}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="80px"
                  unoptimized={src.startsWith("http")}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
