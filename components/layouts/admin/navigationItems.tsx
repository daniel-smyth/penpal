import {
  Library as LibraryIcon,
  User as UserIcon,
  Settings as SettingsIcon,
} from "lucide-react";

export const navigationItems = [
  {
    text: "Articles",
    href: "/articles",
    Icon: LibraryIcon,
    childLinks: [],
  },
  {
    text: "Account",
    href: "/account",
    Icon: UserIcon,
    childLinks: [],
  },
  {
    text: "Plan",
    href: "/plan",
    Icon: SettingsIcon,
    childLinks: [],
  },
];
