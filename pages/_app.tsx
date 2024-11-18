import type { AppProps } from "next/app";

import { useCallback } from "react";
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";

import "@/styles/globals.css";

import { fontMono, fontSans } from "@/libraries/Font";
import AdminLayout from "@/components/layout/AdminLayout";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const renderComponent = useCallback(() => {
    if (router.pathname.startsWith("/admin")) {
      return (
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      );
    }

    return <Component {...pageProps} />;
  }, [router.pathname]);

  return (
    <NextThemesProvider attribute="class" defaultTheme="light">
      <NextUIProvider navigate={router.push}>{renderComponent()}</NextUIProvider>
      <Toaster position="bottom-center" />
    </NextThemesProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
