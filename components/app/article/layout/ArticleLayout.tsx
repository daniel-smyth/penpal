"use client";

import React from "react";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Image as ImageIcon,
  Pencil as PencilIcon,
  Share as ShareIcon,
  X as XIcon,
  Menu as MenuIcon,
} from "lucide-react";
import { FADE_IN_ANIMATION_SETTINGS } from "@lib/theme";
import { useScroll } from "@lib/hooks";
import { SignInButton } from "@components/auth";
import { Penpal } from "@components/icons";
import SidebarItem from "./SidebarItem";

const navigation = [
  { name: "Why Penpal?", href: "#" },
  { name: "Tools & Guides", href: "#" },
];

const sidebarItems = [
  { name: "Text", Icon: PencilIcon },
  { name: "Image", Icon: ImageIcon },
  { name: "Share", Icon: ShareIcon },
];

const ArticleLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const scrolled = useScroll(50);

  return (
    <>
      <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
      <Disclosure
        as="div"
        className={`fixed top-0 w-full ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <Penpal />

                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <AnimatePresence>
                        {navigation.map((item) => (
                          <motion.button
                            key={item.name}
                            className="rounded-2xl p-1.5 px-4 text-sm text-black transition-all hover:bg-stone-200 hover:text-black"
                            {...FADE_IN_ANIMATION_SETTINGS}
                          >
                            <Link href={item.href}>{item.name}</Link>
                          </motion.button>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center space-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <AnimatePresence>
                    <SignInButton />
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <aside className="top-18 fixed left-64 z-40 h-screen w-64 -translate-x-full border-t border-r border-gray-200 bg-white pt-4 transition-transform dark:border-gray-700 dark:bg-gray-800 sm:translate-x-0">
                <div className="h-full overflow-y-auto bg-gray-50 px-3 dark:bg-gray-800">
                  <ul className="space-y-4">
                    {sidebarItems.map((item) => (
                      <SidebarItem
                        title={item.name}
                        Icon={item.Icon}
                        key={item.name}
                      />
                    ))}
                  </ul>
                </div>
              </aside>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {children}
    </>
  );
};

export default ArticleLayout;
