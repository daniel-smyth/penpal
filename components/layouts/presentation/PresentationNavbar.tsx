"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetcher } from "@lib/fetcher";
import { Disclosure, Transition } from "@headlessui/react";
import { X as XIcon, Menu as MenuIcon } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@lib/theme";
import { useScroll, useWindowSize } from "@lib/hooks";
import { SignInButton } from "@components/auth";
import { Button } from "@components/ui/client";
import { SidebarButton } from "@components/ui/server";

const navigation = [
  { name: "Why Penpal?", href: "#" },
  { name: "Tools & Guides", href: "#" },
];

const PresentationNavbar: React.FC = () => {
  const [fetching, setFetching] = useState(false);
  const scrolled = useScroll(50);
  const router = useRouter();

  const createArticle = async () => {
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
    <Disclosure
      as="div"
      className={`fixed top-0 w-full ${
        scrolled
          ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
          : "bg-white/0"
      } z-40 transition-all`}
    >
      {({ open }) => (
        <>
          <div className="mx-auto px-4 dark:bg-gray-800 dark:text-white sm:px-6 lg:px-8">
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
                      {navigation.map((item) => (
                        <Button
                          animated
                          variant="flat"
                          key={item.name}
                          {...FADE_IN_ANIMATION_SETTINGS}
                        >
                          <Link href={item.href}>{item.name}</Link>
                        </Button>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center space-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <SignInButton />

                <div className="hidden sm:block">
                  <Button
                    animated
                    loading={fetching}
                    onClick={createArticle}
                    {...FADE_IN_ANIMATION_SETTINGS}
                  >
                    Create Article
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden sm:block">
            <Transition
              show={open}
              enter="transition duration-150 ease-out"
              enterFrom="top-0 opacity-0"
              enterTo="top-100 opacity-100"
              leave="transition duration-150 ease-out"
              leaveFrom="top-100 opacity-100"
              leaveTo="top-0 opacity-0"
            >
              <Disclosure.Panel>
                <div className="space-y-4 border-b border-gray-200 bg-white px-2 pt-2 pb-6 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                  <SidebarButton loading={fetching} onClick={createArticle}>
                    Create Article
                  </SidebarButton>

                  {navigation.map((item) => (
                    <SidebarButton key={item.name}>
                      <Disclosure.Button>
                        <Link href={item.href}>{item.name}</Link>
                      </Disclosure.Button>
                    </SidebarButton>
                  ))}
                </div>
              </Disclosure.Panel>
            </Transition>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default PresentationNavbar;
