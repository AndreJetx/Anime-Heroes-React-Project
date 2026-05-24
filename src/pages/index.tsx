import { GetServerSideProps } from "next";
import { HomeLanding } from "@/components/landing/home-landing";
import { readSiteUpdates, type SiteUpdateItem } from "@/lib/site-updates-server";
import { readLandingGameModes } from "@/lib/game-modes-server";
import type { LandingGameModeItem } from "@/lib/game-modes-shared";

type HomeProps = {
  initialSiteUpdates: SiteUpdateItem[];
  initialGameModes: LandingGameModeItem[];
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  let initialSiteUpdates: SiteUpdateItem[] = [];
  let initialGameModes: LandingGameModeItem[] = [];

  try {
    initialSiteUpdates = await readSiteUpdates();
  } catch {
    initialSiteUpdates = [];
  }

  try {
    initialGameModes = await readLandingGameModes();
  } catch {
    initialGameModes = [];
  }

  return { props: { initialSiteUpdates, initialGameModes } };
};

export default function Home({ initialSiteUpdates, initialGameModes }: HomeProps) {
  return (
    <HomeLanding initialSiteUpdates={initialSiteUpdates} initialGameModes={initialGameModes} />
  );
}
