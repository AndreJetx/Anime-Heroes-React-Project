"use client"

import { useState, useEffect, useCallback } from "react"
import { Download, Monitor, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const screenshots = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=675&fit=crop",
    title: "Arena Principal"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=675&fit=crop",
    title: "Combate Intenso"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0e?w=1200&h=675&fit=crop",
    title: "Modo Torneio"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=675&fit=crop",
    title: "Seleção de Personagens"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=675&fit=crop",
    title: "Mapa do Mundo"
  },
]

export function DownloadSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % screenshots.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying || isHovering) return
    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, isHovering, nextSlide])

  const handleDownload = () => {
    setIsDownloading(true)
    setDownloadProgress(0)
    
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsDownloading(false)
            setDownloadProgress(0)
          }, 1000)
          return 100
        }
        return prev + 2
      })
    }, 50)
  }

  return (
    <section id="download" className="relative py-32 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2" />
      
      {/* Section Header */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="font-[var(--font-display)] text-5xl md:text-7xl font-bold tracking-wider mb-4">
          <span className="text-foreground">BAIXE</span>
          <span className="text-primary"> AGORA</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Disponível para Windows. Entre na batalha e prove seu valor!
        </p>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Download Button First */}
        <div className="flex flex-col items-center mb-16">
          {/* Platform Info */}
          <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-card/50 border border-border">
            <div className="p-3 rounded-lg bg-primary/20 border border-primary/30">
              <Monitor className="w-8 h-8 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-bold text-foreground text-lg">Windows</p>
              <p className="text-muted-foreground text-sm">Tamanho: 45 GB</p>
            </div>
          </div>
          
          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={cn(
              "group relative px-16 py-6 rounded-xl overflow-hidden",
              "font-bold text-xl transition-all duration-300",
              isDownloading
                ? "bg-secondary text-muted-foreground cursor-wait"
                : "bg-primary text-primary-foreground hover:scale-105 shadow-[0_0_40px_rgba(30,64,175,0.4)] hover:shadow-[0_0_60px_rgba(30,64,175,0.6)]"
            )}
          >
            {/* Progress Bar */}
            {isDownloading && (
              <div
                className="absolute left-0 top-0 bottom-0 bg-primary transition-all duration-100"
                style={{ width: `${downloadProgress}%` }}
              />
            )}
            
            <span className="relative z-10 flex items-center justify-center gap-3">
              {isDownloading ? (
                <>
                  <span className="animate-spin rounded-full h-6 w-6 border-2 border-foreground border-t-transparent" />
                  <span>{downloadProgress}%</span>
                </>
              ) : (
                <>
                  <Download className="w-6 h-6 group-hover:animate-bounce" />
                  <span>DOWNLOAD GRÁTIS</span>
                </>
              )}
            </span>

            {/* Shine Effect */}
            {!isDownloading && (
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            )}
          </button>

          <p className="text-xs text-muted-foreground mt-4">
            Versão 2.5.1 | Última atualização: 15/03/2026
          </p>
        </div>

        {/* Screenshot Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Section Title */}
          <h3 className="font-[var(--font-display)] text-2xl font-bold text-center text-foreground tracking-wide mb-6">
            CAPTURAS DE TELA
          </h3>

          {/* Main Carousel */}
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-card">
            {/* Slides */}
            <div className="relative w-full h-full">
              {screenshots.map((screenshot, index) => (
                <div
                  key={screenshot.id}
                  className={cn(
                    "absolute inset-0 transition-all duration-700",
                    index === currentSlide
                      ? "opacity-100 scale-100"
                      : index === (currentSlide - 1 + screenshots.length) % screenshots.length
                      ? "opacity-0 -translate-x-full scale-95"
                      : index === (currentSlide + 1) % screenshots.length
                      ? "opacity-0 translate-x-full scale-95"
                      : "opacity-0 scale-95"
                  )}
                >
                  <img
                    src={screenshot.url}
                    alt={screenshot.title}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <span className="text-xs text-primary font-medium uppercase tracking-wider">Screenshot</span>
                      <h3 className="text-xl font-bold text-foreground">{screenshot.title}</h3>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {index + 1} / {screenshots.length}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full",
                "bg-background/80 backdrop-blur-sm border border-border",
                "text-foreground hover:text-primary hover:border-primary",
                "transition-all duration-300 hover:scale-110",
                "opacity-0 group-hover:opacity-100",
                isHovering && "opacity-100"
              )}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full",
                "bg-background/80 backdrop-blur-sm border border-border",
                "text-foreground hover:text-primary hover:border-primary",
                "transition-all duration-300 hover:scale-110",
                "opacity-0 group-hover:opacity-100",
                isHovering && "opacity-100"
              )}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center gap-3 mt-4">
            {screenshots.map((screenshot, index) => (
              <button
                key={screenshot.id}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "relative w-20 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300",
                  index === currentSlide
                    ? "border-primary scale-110 shadow-[0_0_15px_rgba(30,64,175,0.5)]"
                    : "border-border opacity-50 hover:opacity-100"
                )}
              >
                <img
                  src={screenshot.url}
                  alt={screenshot.title}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
