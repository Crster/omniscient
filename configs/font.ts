import { Poppins, Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";

export const poppins = Poppins({ variable: "--font-poppins", weight: "400", subsets: ["latin"] });

export const robotoMono = Roboto_Mono({ variable: "--font-roboto-mono", weight: "400", subsets: ["latin"] });

export const materialSymbolsOutlined = localFont({
  variable: "--font-material-symbols-outlined",
  src: "../public/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].woff2",
});
