import "./globals.css";
import { Poppins } from "next/font/google";
import { NextUIProvider } from "@nextui-org/system";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Omniscient Admin",
  description: "Admin dashboard for Omniscient",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
