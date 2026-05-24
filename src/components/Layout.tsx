import React from "react";
import { useRouter } from "next/router";
import { LandingAppShell } from "@/components/landing/landing-app-shell";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const isPainel = router.pathname.startsWith("/painel");

  if (isHome) {
    return <>{children}</>;
  }

  return (
    <LandingAppShell showAnimatedBackground>
      {isPainel ? (
        <div className="painel-in-shell min-h-screen px-4 py-6 md:px-8 md:py-10">{children}</div>
      ) : (
        children
      )}
    </LandingAppShell>
  );
}
