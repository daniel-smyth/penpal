"use client";

import { DashboardLayout } from "@components/layouts";
import {
  Image as ImageIcon,
  Pencil as PencilIcon,
  Share as ShareIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Text",
    Icon: PencilIcon,
    href: "/text",
    dropdownItems: [],
  },
  {
    title: "Image",
    Icon: ImageIcon,
    href: "/image",
    dropdownItems: [],
  },
  {
    title: "Share",
    Icon: ShareIcon,
    href: "/share",
    dropdownItems: [],
  },
];

export default function Provider({ children }: { children: React.ReactNode }) {
  return <DashboardLayout menuItems={menuItems}>{children}</DashboardLayout>;
}
