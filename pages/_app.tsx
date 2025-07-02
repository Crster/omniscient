import "@/styles/globals.css";
import { AppProps } from "next/app";
import { Provider } from "@/components/Provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}
