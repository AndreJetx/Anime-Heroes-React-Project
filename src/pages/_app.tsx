import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ReduxProvider } from "../redux/provider";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <Component {...pageProps} />
    </ReduxProvider>
  );
}
