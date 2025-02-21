import Head from "next/head";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Button, Listbox, ListboxItem } from "@heroui/react";
import { twMerge } from "tailwind-merge";
import { MaterialIcon } from "./material-icon";
import { ReactComponent } from "@/types/ReactComponent";
import { mainMenu } from "@/configs/main-menu";

interface AppShellProps {
  menuKey: string;
}

export const AppShell: ReactComponent<AppShellProps> = ({ menuKey: key, children }) => {
  const [openMenu, setOpenMenu] = useState(true);
  const currentMenu = useMemo(() => {
    const menu = mainMenu.find((menu) => menu.key === key);
    const title = menu ? `Omniscient: ${menu.label}` : "Omniscient";

    return { ...menu, title, menuKey: [key] };
  }, [key]);

  useEffect(() => {
    if (innerWidth <= 1024) {
      setOpenMenu(false);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{currentMenu.title}</title>
      </Head>

      <Button isIconOnly variant="light" className="fixed top-0 left-0 ml-5 mt-2" onPress={() => setOpenMenu(true)}>
        <MaterialIcon icon="menu" />
      </Button>

      <aside
        className={twMerge(
          "fixed top-0 left-0 w-80 h-screen bg-[#FAFCFF] transition-transform",
          openMenu ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="px-6 pt-12">
          <div className="flex gap-1 items-center justify-between">
            <Image alt="Logo" height={32} width={32} src="/logo.png" />
            <h1 className="flex-grow text-large">Omniscient!</h1>
            <Button isIconOnly variant="light" onPress={() => setOpenMenu(false)}>
              <MaterialIcon icon="menu_open" />
            </Button>
          </div>

          <h2 className="text-large text-default-500 mt-10">Reports</h2>

          <Listbox
            aria-label="Main Menu"
            items={mainMenu}
            selectedKeys={currentMenu?.menuKey}
            itemClasses={{
              base: "py-3 data-[hover=true]:bg-primary-50",
            }}
          >
            {(menu) => (
              <ListboxItem
                key={menu.key}
                href={menu.href}
                className={twMerge(currentMenu?.key === menu.key && "bg-primary-100")}
                startContent={<MaterialIcon color="primary" icon={menu.icon} />}
              >
                {menu.label}
              </ListboxItem>
            )}
          </Listbox>
        </div>
      </aside>

      <div className={twMerge("px-10 py-14 transition-[margin-left] duration-300", openMenu ? "ml-80" : "ml-0")}>
        {children}
      </div>
    </>
  );
};
