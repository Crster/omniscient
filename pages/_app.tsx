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
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="light">
        {renderComponent()}
        <Toaster position="bottom-center" />
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
