"use client";

import { AnimatedBackground } from "@/components/landing/animated-background";
import { SideMenu } from "@/components/landing/side-menu";
import { LandingSidebarProvider, useLandingSidebar } from "@/contexts/landing-sidebar";
import { SiteUpdatesProvider } from "@/contexts/site-updates";
import { cn } from "@/lib/utils";
import type { SiteUpdateItem } from "@/lib/site-updates-shared";
import type { ReactNode } from "react";

type LandingAppShellProps = {
  children: ReactNode;
  /** Fundo animado (home e painel novo layout) */
  showAnimatedBackground?: boolean;
  initialSiteUpdates?: SiteUpdateItem[];
};

function LandingAppShellInner({
  children,
  showAnimatedBackground,
}: LandingAppShellProps) {
  const { expanded } = useLandingSidebar();

  return (
    <main className="landing-root relative min-h-screen w-full max-w-[100vw]">
      {showAnimatedBackground ? <AnimatedBackground /> : null}

      <div
        className={cn(
          "relative z-10 grid min-h-screen w-full",
          "grid-cols-1 lg:transition-[grid-template-columns] lg:duration-300 lg:ease-out",
          expanded
            ? "lg:grid-cols-[18rem_minmax(0,1fr)]"
            : "lg:grid-cols-[5rem_minmax(0,1fr)]"
        )}
      >
        <SideMenu />

        <div className="min-w-0 overflow-x-hidden">{children}</div>
      </div>
    </main>
  );
}

export function LandingAppShell({
  children,
  showAnimatedBackground = true,
  initialSiteUpdates,
}: LandingAppShellProps) {
  return (
    <SiteUpdatesProvider initialUpdates={initialSiteUpdates}>
      <LandingSidebarProvider>
        <LandingAppShellInner showAnimatedBackground={showAnimatedBackground}>
          {children}
        </LandingAppShellInner>
      </LandingSidebarProvider>
    </SiteUpdatesProvider>
  );
}
