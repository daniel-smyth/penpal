"use client";

import { usePathname } from "next/navigation";
import {
  Image as ImageIcon,
  Pencil as PencilIcon,
  Share as ShareIcon,
} from "lucide-react";
import { NavigationButton } from "@components/ui/client";

const sidebar = [
  {
    text: "Text",
    href: "/text",
    Icon: PencilIcon,
    items: [],
  },
  {
    text: "Image",
    href: "/image",
    Icon: ImageIcon,
    items: [],
  },
  {
    text: "Share",
    href: "/share",
    Icon: ShareIcon,
    items: [],
  },
];

const ArticleNavList: React.FC = () => {
  const pathname = usePathname();

  return (
    <>
      {sidebar.map((item) => (
        <NavigationButton
          key={item.text}
          items={item.items}
          Icon={item.Icon}
          href={
            item.href &&
            pathname?.slice(0, pathname.lastIndexOf("/")) + item.href
          }
        >
          {item.text}
        </NavigationButton>
      ))}
    </>
  );
};

export default ArticleNavList;
