import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "./Header";
import { LandingAppShell } from "@/components/landing/landing-app-shell";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const isPainel = router.pathname.startsWith("/painel");

  useEffect(() => {
    if (typeof document === "undefined") return;
    const legacyBg = !isHome && !isPainel;
    document.body.classList.toggle("body--legacy-bg", legacyBg);
    return () => {
      document.body.classList.remove("body--legacy-bg");
    };
  }, [isHome, isPainel]);

  if (isHome) {
    return <>{children}</>;
  }

  if (isPainel) {
    return (
      <LandingAppShell showAnimatedBackground>
        <div className="painel-in-shell min-h-screen px-4 py-6 md:px-8 md:py-10">{children}</div>
      </LandingAppShell>
    );
  }

  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">{children}</main>
    </div>
  );
}
