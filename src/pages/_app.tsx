import type { AppProps } from "next/app";
import "../i18n";
import "@/styles/globals.css";
import "@/styles/header.css";
import "@/styles/home.css";
import "@/styles/footer.css";
import "@/styles/guide.css";
import Layout from "@/components/Layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
