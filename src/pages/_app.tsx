import type { AppProps } from "next/app";
import { Play } from "next/font/google";
import "../i18n";
import "@/styles/globals.css";
import Layout from "@/components/Layout";

const play = Play({
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-play",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${play.variable} font-sans antialiased`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
