"use client";

import { ArticleLayout } from "@components/layouts";
import {
  Image as ImageIcon,
  Pencil as PencilIcon,
  Share as ShareIcon,
} from "lucide-react";

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
  return <ArticleLayout menuItems={menuItems}>{children}</ArticleLayout>;
}
