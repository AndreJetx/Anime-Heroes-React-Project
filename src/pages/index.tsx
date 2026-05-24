import { GetServerSideProps } from "next";
import { HomeLanding } from "@/components/landing/home-landing";
import { readSiteUpdates, type SiteUpdateItem } from "@/lib/site-updates-server";

type HomeProps = {
  initialSiteUpdates: SiteUpdateItem[];
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const initialSiteUpdates = await readSiteUpdates();
    return { props: { initialSiteUpdates } };
  } catch {
    return { props: { initialSiteUpdates: [] } };
  }
};

export default function Home({ initialSiteUpdates }: HomeProps) {
  return <HomeLanding initialSiteUpdates={initialSiteUpdates} />;
}
