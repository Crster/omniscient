import { twJoin } from "tailwind-merge";
import { Html, Head, Main, NextScript } from "next/document";
import { materialSymbolsOutlined, poppins, robotoMono } from "@/configs/font";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={twJoin(poppins.variable, robotoMono.variable, materialSymbolsOutlined.variable, "font-sans")}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
