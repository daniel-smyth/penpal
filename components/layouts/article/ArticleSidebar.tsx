"use client";

import { usePathname } from "next/navigation";
import { NavigationButton } from "@components/ui/client";
import { navigationItems } from "./navigationItems";

const ArticleSidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="top-17 fixed left-0 h-screen w-64 -translate-x-full border-r border-gray-300 transition-transform dark:border-gray-600 sm:translate-x-0">
      <ul className="h-full space-y-4 overflow-y-auto bg-gray-50 p-3 dark:bg-gray-800">
        {navigationItems.map((item) => (
          <NavigationButton
            key={item.text}
            href={
              item.href &&
              pathname?.slice(0, pathname.lastIndexOf("/")) + item.href
            }
            childLinks={item.childLinks}
            Icon={item.Icon}
          >
            {item.text}
          </NavigationButton>
        ))}
      </ul>
    </aside>
  );
};

export default ArticleSidebar;
