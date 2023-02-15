"use client";

import { DashboardLayout } from "@components/layouts";
import {
  Library as LibraryIcon,
  User as UserIcon,
  Settings as SettingsIcon,
} from "lucide-react";

const menuItems = [
  {
    title: "Articles",
    Icon: LibraryIcon,
    href: "/articles",
    dropdownItems: [],
  },
  {
    title: "Account",
    Icon: UserIcon,
    href: "/account",
    dropdownItems: [],
  },
  {
    title: "Plan",
    Icon: SettingsIcon,
    href: "/plan",
    dropdownItems: [],
  },
];

export default function Provider({ children }: { children: React.ReactNode }) {
  return <DashboardLayout menuItems={menuItems}>{children}</DashboardLayout>;
}
