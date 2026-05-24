import { AnimatedBackground } from "@/components/animated-background"
import { SideMenu } from "@/components/side-menu"
import { HeroSection } from "@/components/hero-section"
import { CharactersSection } from "@/components/characters-section"
import { GameModesSection } from "@/components/game-modes-section"
import { DownloadSection } from "@/components/download-section"
import { CommunitySection } from "@/components/community-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Animated Particle Background */}
      <AnimatedBackground />
      
      {/* Side Navigation Menu */}
      <SideMenu />
      
      {/* Page Content - Offset for sidebar */}
      <div className="ml-20 transition-all duration-300">
        <HeroSection />
        <CharactersSection />
        <GameModesSection />
        <DownloadSection />
        <CommunitySection />
        <Footer />
      </div>
    </main>
  )
}
