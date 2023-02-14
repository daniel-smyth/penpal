"use client";

import Link from "next/link";
import { Menu as MenuIcon } from "lucide-react";
import { SignInButton } from "@components/auth";
import { Button } from "@components/ui/server";
import { useState } from "react";
import { NavigationButton, Popover } from "@components/ui/client";
import { usePathname } from "next/navigation";
import { navigationItems } from "./navigationItems";

const navbar = [
  { name: "Why Penpal?", href: "#" },
  { name: "Tools & Guides", href: "#" },
];

const ArticleNavbar: React.FC = () => {
  const [openPopover, setOpenPopover] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="flex h-16 items-center border border-gray-300 bg-gray-50 px-4 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:px-6 lg:px-8">
      <div className="absolute flex text-gray-400 sm:hidden">
        <MenuIcon
          onClick={() => setOpenPopover(true)}
          className="h-6 w-6"
          aria-hidden="true"
        />
      </div>

      <div
        id="navbar-items"
        className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
      >
        <Link href="/">
          <p className="font-display text-2xl">Penpal</p>
        </Link>

        <div className="hidden space-x-4 sm:ml-6 sm:flex">
          {navbar.map((item) => (
            <Button variant="flat" key={item.name}>
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </div>
      </div>

      <div className="absolute right-0 pr-4 sm:pr-6 lg:pr-8">
        <SignInButton />
      </div>

      <div className="sm:hidden">
        <Popover
          content={
            <div className="space-y-4 border-b border-gray-200 bg-white px-2 pt-2 pb-6 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              {navigationItems.map((item) => (
                <NavigationButton
                  key={item.text}
                  Icon={item.Icon}
                  onClick={() => setOpenPopover(false)}
                >
                  <Link
                    href={
                      item.href &&
                      pathname?.slice(0, pathname.lastIndexOf("/")) + item.href
                    }
                  >
                    {item.text}
                  </Link>
                </NavigationButton>
              ))}
            </div>
          }
          openPopover={openPopover}
          setOpenPopover={setOpenPopover}
        />
      </div>
    </nav>
  );
};

export default ArticleNavbar;
