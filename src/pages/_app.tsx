import type { AppProps } from "next/app";
import { ReduxProvider } from "../redux/provider";
import '../i18n';
import "@/styles/globals.css";
import "@/styles/AnimeFilter.css";
import "@/styles/CharacterCard.css";
import "@/styles/header.css";
import "@/styles/home.css";
import "@/styles/pagesIndex.css";
import "@/styles/CharacterSelection.css";
import "@/styles/footer.css";
import "@/styles/slide.css";
import "@/styles/guide.css";




export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <Component {...pageProps} />
    </ReduxProvider>
  );
}

