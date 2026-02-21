import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import UpdatesModal from "@/components/UpdatesModal";

type LangCode = "en" | "pt" | "es" | "jp";

const IconLanguage = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
  </svg>
);

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={24} height={24} aria-hidden>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const IconCollapse = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20} aria-hidden>
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

const LANGUAGES: { code: LangCode; label: string }[] = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "jp", label: "日本語" },
];

const Header = () => {
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [updatesModalOpen, setUpdatesModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let stored = false;
    try {
      if (typeof window !== "undefined") {
        stored = localStorage.getItem("sidebar-collapsed") === "1";
      }
    } catch {
      /* localStorage bloqueado (iframe, privado, etc.) */
    }
    setSidebarCollapsed(stored);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (sidebarCollapsed) {
      document.body.classList.add("sidebar-collapsed");
      try { localStorage.setItem("sidebar-collapsed", "1"); } catch { /* ignore */ }
    } else {
      document.body.classList.remove("sidebar-collapsed");
      try { localStorage.removeItem("sidebar-collapsed"); } catch { /* ignore */ }
    }
  }, [sidebarCollapsed]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!i18n.isInitialized) {
    return <p>Loading...</p>;
  }

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  const changeLanguage = (lng: LangCode) => {
    i18n.changeLanguage(lng);
    setLangDropdownOpen(false);
  };

  const closeSidebar = () => setSidebarOpen(false);

  const LanguageDropdown = () => (
    <div className="language-dropdown" ref={dropdownRef}>
      <button
        type="button"
        className="language-dropdown-trigger"
        onClick={() => setLangDropdownOpen(!langDropdownOpen)}
        aria-expanded={langDropdownOpen}
        aria-haspopup="true"
        aria-label={t("changeLanguage")}
        title={currentLang.label}
      >
        <IconLanguage className="language-dropdown-icon" />
        <span className="language-dropdown-label">{currentLang.label}</span>
      </button>
      {langDropdownOpen && (
        <ul className="language-dropdown-menu" role="menu">
          {LANGUAGES.map((lang) => (
            <li key={lang.code} role="none">
              <button
                type="button"
                role="menuitem"
                className={`language-dropdown-item ${i18n.language === lang.code ? "active" : ""}`}
                onClick={() => changeLanguage(lang.code)}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <>
      <button
        type="button"
        className="sidebar-toggle"
        onClick={() => {
          setSidebarOpen(true);
          setSidebarCollapsed(false);
        }}
        aria-label="Menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={closeSidebar}
        onKeyDown={(e) => e.key === "Escape" && closeSidebar()}
        role="button"
        tabIndex={-1}
        aria-hidden
      />

      <aside className={`sidebar ${sidebarOpen ? "open" : ""} ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <Link href="/" className="sidebar-logo" onClick={closeSidebar}>
            <Image
              src="/images/logo.png"
              alt="Anime Heroes Allstar Clash"
              width={48}
              height={48}
            />
          </Link>
          <button
            type="button"
            className="sidebar-close"
            onClick={closeSidebar}
            aria-label="Fechar menu"
          >
            <IconClose />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link href="/" onClick={closeSidebar}>
                {t("navhome")}
              </Link>
            </li>
            <li>
              <Link href="/guide" onClick={closeSidebar}>
                {t("navguide")}
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="sidebar-nav-updates"
                onClick={() => {
                  closeSidebar();
                  setUpdatesModalOpen(true);
                }}
              >
                {t("navupdates")}
              </button>
            </li>
            <li>
              <Link href="/#download" onClick={closeSidebar}>
                {t("navdownload")}
              </Link>
            </li>
            <li>
              <Link href="/painel" onClick={closeSidebar}>
                Painel
              </Link>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-actions">
            <LanguageDropdown />
            <button
              type="button"
              className="sidebar-hide-btn"
              onClick={() => setSidebarCollapsed(true)}
              title="Ocultar menu"
              aria-label="Ocultar menu lateral"
            >
              <IconCollapse />
            </button>
          </div>
        </div>
      </aside>

      <UpdatesModal isOpen={updatesModalOpen} onClose={() => setUpdatesModalOpen(false)} />
    </>
  );
};

export default Header;
