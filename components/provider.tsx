import { useRouter } from "next/router";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";
import { ReactComponent } from "@/types/ReactComponent";

export const Provider: ReactComponent = ({ children }) => {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
    </HeroUIProvider>
  );
};
