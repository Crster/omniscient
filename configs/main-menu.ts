import { MainMenu } from "@/types/MainMenu";

export const mainMenu: Array<MainMenu> = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: "bar_chart",
  },
  {
    key: "user",
    label: "User Role",
    href: "/admin/user",
    icon: "perm_identity",
  },
  {
    key: "voter",
    label: "Voters",
    href: "/admin/voter",
    icon: "how_to_vote",
  },
  {
    key: "heat-map",
    label: "Heat Map",
    href: "/admin/heat-map",
    icon: "pin_drop",
  },
  {
    key: "candidate",
    label: "Candidates",
    href: "/admin/candidate",
    icon: "people",
  },
  {
    key: "death",
    label: "Death",
    href: "/admin/death",
    icon: "local_florist",
  },
];
