import type { AppProps } from "next/app";
import { ReduxProvider } from "../redux/provider";
import '../i18n';
import "@/styles/globals.css";


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <Component {...pageProps} />
    </ReduxProvider>
  );
}

