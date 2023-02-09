"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { fetcher } from "@lib/fetcher";
import { Disclosure } from "@headlessui/react";
import { X as XIcon, Menu as MenuIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import cn from "classnames";
import { FADE_IN_ANIMATION_SETTINGS } from "@lib/theme";
import { useScroll } from "@lib/hooks";
import { SignInButton } from "@components/auth";

const navigation = [
  { name: "Why Penpal?", href: "#" },
  { name: "Tools & Guides", href: "#" },
];

const Navbar: React.FC = () => {
  const [fetching, setFetching] = useState(false);
  const scrolled = useScroll(50);
  const router = useRouter();
  const pathname = usePathname();

  const handleCreateArticleClick = async () => {
    try {
      setFetching(true);
      const article = {
        title: "",
        text: {
          current: { input: "", output: { choices: [{ text: "" }] } },
          history: [],
        },
        image: {
          current: { input: "", output: { data: { url: "" } } },
          history: [],
        },
      };
      const { _id } = await fetcher({
        url: "/api/article",
        method: "POST",
        body: article,
      });
      router.push(`/articles/${_id}`);
    } catch (err: any) {
      console.log(err);
      setFetching(false);
      throw new Error(err);
    }
  };

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
                  {/* Logo */}
                  <Link
                    href="/"
                    className="flex items-center px-3 font-display text-2xl"
                  >
                    <p>Penpal</p>
                  </Link>
                  {/* Desktop Navbar links */}
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
                  <SignInButton />
                  {/* Create article button */}
                  <motion.button
                    key="create-article-button"
                    onClick={handleCreateArticleClick}
                    className="hidden min-w-[150px] items-center justify-center rounded-2xl border border-emerald-600 bg-emerald-600 p-1.5 px-4 text-sm text-white transition-all hover:border-emerald-600 hover:bg-emerald-700 sm:inline-flex"
                    {...FADE_IN_ANIMATION_SETTINGS}
                  >
                    {fetching && (
                      <span
                        className="spinner-grow spinner-sm mr-2 inline-block"
                        role="status"
                        aria-hidden="true"
                      >
                        <svg
                          className="mr- -ml-1 h-4 w-4 animate-spin text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </span>
                    )}
                    Create Article
                  </motion.button>
                </div>
              </div>
            </div>
            {/* Mobile Navbar menu links */}
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 border-b border-gray-200 bg-white px-2 pt-2 pb-3">
                <Disclosure.Button
                  key="Create Article"
                  as="a"
                  onClick={handleCreateArticleClick}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-700 hover:text-white "
                >
                  Create Article
                </Disclosure.Button>
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={cn(
                      pathname?.includes(item.href)
                        ? "bg-gray-300 text-black"
                        : "text-gray-500 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium",
                    )}
                    aria-current={
                      pathname?.includes(item.href) ? "page" : undefined
                    }
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;
