"use client";

import { LandingAppShell } from "@/components/landing/landing-app-shell";
import { HeroSection } from "@/components/landing/hero-section";
import { CharactersSection } from "@/components/landing/characters-section";
import { GameModesSection } from "@/components/landing/game-modes-section";
import { DownloadSection } from "@/components/landing/download-section";
import { CommunitySection } from "@/components/landing/community-section";
import { FaqSection } from "@/components/landing/faq-section";
import { LandingFooter } from "@/components/landing/landing-footer";
import type { SiteUpdateItem } from "@/lib/site-updates-shared";

type HomeLandingProps = {
  initialSiteUpdates?: SiteUpdateItem[];
};

export function HomeLanding({ initialSiteUpdates }: HomeLandingProps) {
  return (
    <LandingAppShell showAnimatedBackground initialSiteUpdates={initialSiteUpdates}>
      <div className="flex flex-col gap-6 md:gap-28 lg:gap-36">
        <HeroSection />
        <CharactersSection />
        <GameModesSection />
        <DownloadSection />
        <CommunitySection />
        <FaqSection />
        <LandingFooter />
      </div>
    </LandingAppShell>
  );
}
