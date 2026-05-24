"use client";

import { useState, useRef, useEffect, useMemo, type RefObject } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Gamepad2,
  Users,
  Download,
  Newspaper,
  Trophy,
  LayoutDashboard,
  Languages,
  MoreVertical,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NewsModal } from "@/components/landing/news-modal";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useLandingSidebar } from "@/contexts/landing-sidebar";
import {
  formatCountdownUnit,
  getTournamentCountdown,
  type TournamentCountdown,
} from "@/lib/tournament-countdown";

type LangCode = "en" | "pt" | "es" | "jp";

const LANGUAGES: { code: LangCode; label: string }[] = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "jp", label: "JP" },
];

const HOME_SECTION_KEYS = new Set([
  "hero",
  "characters",
  "modes",
  "download",
  "community",
  "FAQ",
]);

function readHomeSectionHash(asPath: string): string {
  if (typeof window !== "undefined") {
    const fromHash = window.location.hash.replace(/^#/, "");
    if (fromHash && HOME_SECTION_KEYS.has(fromHash)) return fromHash;
  }
  const fromAsPath = asPath.match(/#([^#?]+)/)?.[1];
  if (fromAsPath && HOME_SECTION_KEYS.has(fromAsPath)) return fromAsPath;
  return "hero";
}

const iconClass = "h-5 w-5 shrink-0 stroke-[1.5]";

const menuItemShell = (isActive: boolean, expanded: boolean) =>
  cn(
    "flex h-14 w-full shrink-0 overflow-hidden rounded-xl transition-colors duration-200",
    isActive
      ? "bg-blue-950/50 font-semibold text-white"
      : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200",
    !expanded && isActive && "ring-1 ring-blue-500/50"
  );

type MenuContentProps = {
  expanded: boolean;
  showCollapseToggle: boolean;
  showDrawerClose: boolean;
  activeKey: string | null;
  menuItems: Array<{
    key: string;
    icon: typeof Home;
    label: string;
    href: string;
  }>;
  onHome: boolean;
  onNavigate?: () => void;
  onCloseDrawer?: () => void;
  onToggle?: () => void;
  setIsNewsOpen: (open: boolean) => void;
  langOpen: boolean;
  setLangOpen: (open: boolean) => void;
  langRef: RefObject<HTMLDivElement | null>;
  changeLanguage: (lng: LangCode) => void;
  currentLangLabel: string;
  currentLangCode: string;
  tournamentTitle: string;
  tournamentCountdown: TournamentCountdown | null;
};

function MenuContent({
  expanded,
  showCollapseToggle,
  showDrawerClose,
  activeKey,
  menuItems,
  onHome,
  onNavigate,
  onCloseDrawer,
  onToggle,
  setIsNewsOpen,
  langOpen,
  setLangOpen,
  langRef,
  changeLanguage,
  currentLangLabel,
  currentLangCode,
  tournamentTitle,
  tournamentCountdown,
}: MenuContentProps) {
  const { t } = useTranslation();

  return (
    <>
      <div
        className={cn(
          "relative shrink-0 border-b border-white/[0.06] transition-all duration-300",
          expanded ? "px-4 pb-6 pt-6" : "px-2 pb-5 pt-5"
        )}
      >
        {showDrawerClose && (
          <button
            type="button"
            onClick={onCloseDrawer}
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <Link
          href={onHome ? "#hero" : "/#hero"}
          className="block transition-opacity hover:opacity-90"
          prefetch={false}
          onClick={onNavigate}
        >
          <Image
            src="/images/logo.png"
            alt="ANIME HEROES"
            width={320}
            height={120}
            priority
            className={cn(
              "w-full object-contain object-center drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)]",
              expanded ? "h-auto max-h-[4.25rem]" : "mx-auto h-9 max-h-9"
            )}
          />
        </Link>

        {showCollapseToggle && onToggle && (
          <button
            type="button"
            onClick={onToggle}
            className={cn(
              "absolute left-full top-[5.75rem] z-[60] flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full",
              "bg-blue-600 text-white shadow-lg shadow-blue-600/25 ring-2 ring-[#070b14]",
              "transition-transform duration-200 hover:scale-110 hover:bg-blue-500"
            )}
            aria-label={expanded ? "Recolher menu" : "Expandir menu"}
          >
            {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        )}
      </div>

      <nav
        className={cn(
          "flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden",
          expanded ? "px-3 py-5" : "items-center px-2.5 py-5"
        )}
      >
        <div
          className={cn(
            "flex min-h-0 w-full flex-1 flex-col",
            expanded ? "gap-1.5" : "items-center gap-2"
          )}
        >
          <div
            className={cn(
              "flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain",
              expanded ? "gap-1.5" : "items-center gap-2"
            )}
          >
            {menuItems.map((item) => {
              const isActive = activeKey === item.key;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn("group", menuItemShell(isActive, expanded))}
                  title={!expanded ? item.label : undefined}
                  prefetch={false}
                  onClick={onNavigate}
                >
                  {expanded ? (
                    <>
                      <span
                        data-menu-accent
                        data-active={isActive ? "true" : "false"}
                        aria-hidden
                      />
                      <span data-menu-body>
                        <item.icon
                          className={cn(
                            iconClass,
                            isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                          )}
                        />
                        <span className="min-w-0 flex-1 truncate text-left text-[15px] leading-none">
                          {item.label}
                        </span>
                      </span>
                    </>
                  ) : (
                    <span data-menu-collapsed>
                      <item.icon
                        className={cn(
                          iconClass,
                          isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                        )}
                      />
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className={cn("shrink-0", expanded ? "pt-5" : "pt-3")}>
            <button
              type="button"
              onClick={() => {
                onNavigate?.();
                setIsNewsOpen(true);
              }}
              className={cn(
                "flex h-14 w-full shrink-0 rounded-xl bg-blue-950/45 text-blue-400 transition-colors duration-200",
                "hover:bg-blue-950/70 hover:text-blue-300"
              )}
              title={!expanded ? "Novidades" : undefined}
            >
              {expanded ? (
                <>
                  <span data-menu-accent data-active="false" aria-hidden />
                  <span data-menu-news-body className="text-blue-400">
                    <Newspaper className={cn(iconClass, "shrink-0 text-blue-400")} />
                    <span data-menu-news-label>Novidades</span>
                    <span className="shrink-0 rounded-full bg-blue-600 px-2 py-0.5 text-[9px] font-bold uppercase leading-none tracking-wide text-white shadow-sm shadow-blue-600/40">
                      NOVO
                    </span>
                  </span>
                </>
              ) : (
                <span data-menu-collapsed>
                  <Newspaper className={cn(iconClass, "text-blue-400")} />
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div className="shrink-0 border-t border-white/[0.06] px-3 py-4" ref={langRef}>
        <div className="relative">
          <button
            type="button"
            onClick={() => setLangOpen(!langOpen)}
            className={cn(
              "flex h-14 w-full shrink-0 overflow-hidden rounded-xl text-zinc-400 transition-colors duration-200",
              "hover:bg-white/[0.04] hover:text-zinc-200"
            )}
            aria-expanded={langOpen}
            title={t("changeLanguage")}
          >
            {expanded ? (
              <>
                <span data-menu-accent data-active="false" aria-hidden />
                <span data-menu-body>
                  <Languages className={cn(iconClass)} />
                  <span className="text-sm font-medium">{currentLangLabel}</span>
                </span>
              </>
            ) : (
              <span data-menu-collapsed>
                <Languages className={cn(iconClass)} />
              </span>
            )}
          </button>
          {langOpen && expanded && (
            <ul
              className="absolute bottom-full left-0 right-0 z-[60] mb-2 rounded-xl border border-white/10 bg-[#0c1220] py-2 shadow-xl shadow-black/50"
              role="menu"
            >
              {LANGUAGES.map((lang) => (
                <li key={lang.code} role="none">
                  <button
                    type="button"
                    role="menuitem"
                    className={cn(
                      "w-full px-4 py-2.5 text-left text-sm text-zinc-300 hover:bg-blue-950/50 hover:text-white",
                      currentLangCode === lang.code && "bg-blue-950/40 font-medium text-blue-400"
                    )}
                    onClick={() => changeLanguage(lang.code)}
                  >
                    {lang.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {expanded && tournamentCountdown && !tournamentCountdown.expired && (
        <div className="shrink-0 border-t border-white/[0.06] px-4 pb-6 pt-4">
          <div className="rounded-xl bg-blue-950/30 px-5 py-4">
            {tournamentTitle ? (
              <p className="mb-1 text-sm font-semibold text-zinc-200">{tournamentTitle}</p>
            ) : null}
            <p className="mb-3 text-xs text-zinc-500">Próximo torneio em</p>
            <div className="flex flex-wrap gap-2.5 text-sm font-bold text-blue-400">
              <span className="rounded-lg bg-blue-950/60 px-2.5 py-1 text-blue-300">
                {formatCountdownUnit(tournamentCountdown.days)}D
              </span>
              <span className="rounded-lg bg-blue-950/60 px-2.5 py-1 text-blue-300">
                {formatCountdownUnit(tournamentCountdown.hours)}H
              </span>
              <span className="rounded-lg bg-blue-950/60 px-2.5 py-1 text-blue-300">
                {formatCountdownUnit(tournamentCountdown.minutes)}M
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function SideMenu() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { expanded, toggle, mobileOpen, openMobile, closeMobile } = useLandingSidebar();
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [homeSectionHash, setHomeSectionHash] = useState("hero");
  const [tournamentTitle, setTournamentTitle] = useState("");
  const [tournamentStartsAt, setTournamentStartsAt] = useState<string | null>(null);
  const [tournamentCountdown, setTournamentCountdown] = useState<TournamentCountdown | null>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => (res.ok ? res.json() : null))
      .then(
        (data: { tournamentTitle?: string; tournamentStartsAt?: string | null } | null) => {
          if (!data) return;
          setTournamentTitle(data.tournamentTitle?.trim() ?? "");
          setTournamentStartsAt(data.tournamentStartsAt ?? null);
        }
      )
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!tournamentStartsAt) {
      setTournamentCountdown(null);
      return;
    }

    const tick = () => {
      const next = getTournamentCountdown(tournamentStartsAt);
      setTournamentCountdown(next?.expired ? null : next);
    };

    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [tournamentStartsAt]);

  const onHome = router.pathname === "/";

  useEffect(() => {
    if (!router.isReady) return;

    const syncHomeHash = () => {
      if (router.pathname !== "/") return;
      setHomeSectionHash(readHomeSectionHash(router.asPath));
    };

    syncHomeHash();
    window.addEventListener("hashchange", syncHomeHash);
    router.events.on("routeChangeComplete", syncHomeHash);
    router.events.on("hashChangeComplete", syncHomeHash);

    return () => {
      window.removeEventListener("hashchange", syncHomeHash);
      router.events.off("routeChangeComplete", syncHomeHash);
      router.events.off("hashChangeComplete", syncHomeHash);
    };
  }, [router.isReady, router.pathname, router.asPath, router.events]);

  useEffect(() => {
    const closeOnRoute = () => closeMobile();
    router.events.on("routeChangeComplete", closeOnRoute);
    return () => router.events.off("routeChangeComplete", closeOnRoute);
  }, [router.events, closeMobile]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen, closeMobile]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const activeKey = useMemo(() => {
    const path = router.pathname;
    if (path.startsWith("/painel")) return "painel";
    if (path === "/") return homeSectionHash;
    return null;
  }, [router.pathname, homeSectionHash]);

  const menuItems = useMemo(() => {
    const h = (id: string) => (onHome ? `#${id}` : `/#${id}`);
    return [
      { key: "hero", icon: Home, label: t("navhome"), href: onHome ? "#hero" : "/#hero" },
      { key: "characters", icon: Gamepad2, label: "Personagens", href: h("characters") },
      { key: "modes", icon: Trophy, label: "Modos de Jogo", href: h("modes") },
      { key: "community", icon: Users, label: "Comunidade", href: h("community") },
      { key: "download", icon: Download, label: t("navdownload"), href: h("download") },
      { key: "painel", icon: LayoutDashboard, label: "Painel", href: "/painel" },
    ];
  }, [onHome, t]);

  const changeLanguage = (lng: LangCode) => {
    void i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const currentLangLabel =
    LANGUAGES.find((l) => l.code === i18n.language)?.label ?? "PT";

  const sharedMenuProps = {
    activeKey,
    menuItems,
    onHome,
    setIsNewsOpen,
    langOpen,
    setLangOpen,
    langRef,
    changeLanguage,
    currentLangLabel,
    currentLangCode: i18n.language,
    tournamentTitle,
    tournamentCountdown,
  };

  return (
    <>
      {/* Desktop: coluna lateral fixa */}
      <div
        className={cn(
          "landing-side-menu relative hidden shrink-0 overflow-visible lg:block",
          expanded ? "w-[18rem]" : "w-20"
        )}
      >
        <aside
          className={cn(
            "fixed left-0 top-0 z-40 flex h-dvh flex-col border-r border-white/[0.06] bg-[#070b14]/98 backdrop-blur-xl",
            "text-zinc-400 shadow-[4px_0_24px_rgba(0,0,0,0.35)]",
            "transition-[width] duration-300 ease-out",
            expanded ? "w-[18rem]" : "w-20"
          )}
        >
          <MenuContent
            {...sharedMenuProps}
            expanded={expanded}
            showCollapseToggle
            showDrawerClose={false}
            onToggle={toggle}
          />
        </aside>
      </div>

      {/* Mobile: botão flutuante (3 pontos) */}
      {!mobileOpen && (
        <button
          type="button"
          onClick={openMobile}
          className={cn(
            "fixed left-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full lg:hidden",
            "border border-white/10 bg-[#070b14]/95 text-white shadow-lg shadow-black/40 backdrop-blur-md",
            "transition-transform hover:scale-105 active:scale-95"
          )}
          aria-label="Abrir menu"
        >
          <MoreVertical className="h-6 w-6" />
        </button>
      )}

      {/* Mobile: drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm lg:hidden"
            onClick={closeMobile}
            role="presentation"
            aria-hidden
          />
          <aside
            className={cn(
              "landing-side-menu fixed left-0 top-0 z-[70] flex h-dvh w-[min(18rem,88vw)] flex-col",
              "border-r border-white/[0.06] bg-[#070b14]/98 text-zinc-400 shadow-2xl backdrop-blur-xl lg:hidden",
              "transition-transform duration-300 ease-out"
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
          >
            <MenuContent
              {...sharedMenuProps}
              expanded
              showCollapseToggle={false}
              showDrawerClose
              onNavigate={closeMobile}
              onCloseDrawer={closeMobile}
            />
          </aside>
        </>
      )}

      <NewsModal isOpen={isNewsOpen} onClose={() => setIsNewsOpen(false)} />
    </>
  );
}
