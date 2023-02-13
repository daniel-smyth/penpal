"use client";

import React from "react";
import Link from "next/link";
import { Disclosure, Transition } from "@headlessui/react";
import {
  Image as ImageIcon,
  Pencil as PencilIcon,
  Share as ShareIcon,
  X as XIcon,
  Menu as MenuIcon,
  ChevronDown as ChevronDownIcon,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@lib/theme";
import { useScroll, useWindowSize } from "@lib/hooks";
import { SignInButton } from "@components/auth";
import { Button } from "@components/ui/server";

const navbar = [
  { name: "Why Penpal?", href: "#" },
  { name: "Tools & Guides", href: "#" },
];

const sidebar = [
  { text: "Text", Icon: PencilIcon, children: [] },
  { text: "Image", Icon: ImageIcon, children: [] },
  { text: "Share", Icon: ShareIcon, children: [] },
];

const ArticleNavbar: React.FC = () => {
  const { isDesktop, isMobile } = useWindowSize();
  const scrolled = useScroll(50);

  return (
    <Disclosure
      as="div"
      className={`fixed top-0 w-full transition-all ${
        scrolled
          ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
          : "bg-white/0"
      }`}
    >
      {({ open }) => (
        <>
          <nav className="border border-gray-300 bg-gray-50 px-4 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link
                  href="/"
                  className="flex items-center px-3 font-display text-2xl"
                >
                  <p>Penpal</p>
                </Link>

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <AnimatePresence>
                      {navbar.map((item) => (
                        <Button variant="flat" key={item.name}>
                          <Link href={item.href}>{item.name}</Link>
                        </Button>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center space-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <SignInButton />
              </div>
            </div>
          </nav>

          <aside className="top-17 fixed left-0 h-screen w-64 -translate-x-full border-r border-gray-300 transition-transform dark:border-gray-600 sm:translate-x-0">
            <div className="h-full overflow-y-auto bg-gray-50 px-3 py-3 dark:bg-gray-800">
              <ul className="space-y-4">
                {sidebar.map((item) => (
                  <li key={item.text}>
                    <button className="group flex w-full items-center rounded-lg p-3 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                      <item.Icon className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                      <span className="ml-3 flex-1 whitespace-nowrap text-left">
                        {item.text}
                      </span>

                      {item.children && item.children.length > 0 && (
                        <ChevronDownIcon className="h-6 w-6" />
                      )}
                    </button>

                    {item.children && item.children.length > 0 && (
                      <ul id="dropdown-item" className="hidden space-y-2 py-2">
                        {item.children &&
                          item.children.map(
                            (item: { text: string; href: string }) => (
                              <li key={item.text}>
                                <a
                                  href={item.href}
                                  className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                >
                                  {item.text}
                                </a>
                              </li>
                            ),
                          )}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {isMobile && (
            <Transition
              show={open}
              enter="transition duration-150 ease-out"
              enterFrom="left-0 opacity-0"
              enterTo="left-64 opacity-100"
              leave="transition duration-150 ease-out"
              leaveFrom="left-64 opacity-100"
              leaveTo="left-0 opacity-0"
            >
              <Disclosure.Panel>
                <aside className="top-17 fixed left-64 h-screen w-64 -translate-x-full border-r border-gray-300 transition-transform dark:border-gray-600 sm:translate-x-0">
                  <div className="h-full overflow-y-auto bg-gray-50 px-3 py-3 dark:bg-gray-800">
                    <ul className="space-y-4">
                      {sidebar.map((item) => (
                        <li key={item.text}>
                          <button className="group flex w-full items-center rounded-lg p-3 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                            <item.Icon className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                            <span className="ml-3 flex-1 whitespace-nowrap text-left">
                              {item.text}
                            </span>

                            {item.children && item.children.length > 0 && (
                              <ChevronDownIcon className="h-6 w-6" />
                            )}
                          </button>

                          {item.children && item.children.length > 0 && (
                            <ul
                              id="dropdown-item"
                              className="hidden space-y-2 py-2"
                            >
                              {item.children &&
                                item.children.map(
                                  (item: { text: string; href: string }) => (
                                    <li key={item.text}>
                                      <a
                                        href={item.href}
                                        className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                      >
                                        {item.text}
                                      </a>
                                    </li>
                                  ),
                                )}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
              </Disclosure.Panel>
            </Transition>
          )}
        </>
      )}
    </Disclosure>
  );
};

export default ArticleNavbar;
