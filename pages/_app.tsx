import "@/styles/globals.css";
import { AppProps } from "next/app";
import { twJoin } from "tailwind-merge";
import { materialSymbolsOutlined, poppins, robotoMono } from "@/configs/font";
import { Provider } from "@/components/provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <main className={twJoin(poppins.variable, robotoMono.variable, materialSymbolsOutlined.variable, "font-sans")}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
