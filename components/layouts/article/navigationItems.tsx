import {
  Image as ImageIcon,
  Pencil as PencilIcon,
  Share as ShareIcon,
} from "lucide-react";

export const navigationItems = [
  {
    text: "Text",
    href: "/text",
    Icon: PencilIcon,
    childLinks: [],
  },
  {
    text: "Image",
    href: "/image",
    Icon: ImageIcon,
    childLinks: [],
  },
  {
    text: "Share",
    href: "/share",
    Icon: ShareIcon,
    childLinks: [],
  },
];
