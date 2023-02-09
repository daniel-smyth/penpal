"use client";

import React from "react";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { X as XIcon, Menu as MenuIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@lib/theme";
import { useScroll } from "@lib/hooks";
import { SignInButton } from "@components/auth";
import { Penpal } from "@components/icons";

const navigation = [
  { name: "Why Penpal?", href: "#" },
  { name: "Tools & Guides", href: "#" },
];

const ArticleNavbar: React.FC = () => {
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
                {/* Burger menu */}
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
                  {/* Desktop navbar links */}
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
                  {/* Sign in button */}
                  <AnimatePresence>
                    <SignInButton />
                  </AnimatePresence>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden">
              {/* Mobile off-canvas sidebar links */}
              <aside
                id="logo-sidebar"
                className="fixed top-0 left-64 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-6 transition-transform dark:border-gray-700 dark:bg-gray-800 sm:translate-x-0"
                aria-label="Sidebar"
              >
                <div className="h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-gray-800">
                  <Penpal />
                  <ul className="space-y-2">
                    <li>
                      <Disclosure.Button
                        as="a"
                        href="#"
                        className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        <svg
                          aria-hidden="true"
                          className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                        </svg>
                        <span className="ml-3">Dashboard</span>
                      </Disclosure.Button>
                    </li>
                    <li>
                      <Disclosure.Button
                        as="a"
                        href="#"
                        className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        <svg
                          aria-hidden="true"
                          className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                        </svg>
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          Kanban
                        </span>
                        <span className="ml-3 inline-flex items-center justify-center rounded-full bg-gray-200 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          Pro
                        </span>
                      </Disclosure.Button>
                    </li>
                    <li>
                      <Disclosure.Button
                        as="a"
                        href="#"
                        className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        <svg
                          aria-hidden="true"
                          className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                          <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                        </svg>
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          Inbox
                        </span>
                        <span className="ml-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          3
                        </span>
                      </Disclosure.Button>
                    </li>
                    <li>
                      <Disclosure.Button
                        as="a"
                        href="#"
                        className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        <svg
                          aria-hidden="true"
                          className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          Users
                        </span>
                      </Disclosure.Button>
                    </li>
                    <li>
                      <Disclosure.Button
                        as="a"
                        href="#"
                        className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        <svg
                          aria-hidden="true"
                          className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          Products
                        </span>
                      </Disclosure.Button>
                    </li>
                    <li>
                      <Disclosure.Button
                        as="a"
                        href="#"
                        className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        <svg
                          aria-hidden="true"
                          className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          Sign In
                        </span>
                      </Disclosure.Button>
                    </li>
                    <li>
                      <Disclosure.Button
                        as="a"
                        href="#"
                        className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        <svg
                          aria-hidden="true"
                          className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          Sign Up
                        </span>
                      </Disclosure.Button>
                    </li>
                  </ul>
                </div>
              </aside>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default ArticleNavbar;
