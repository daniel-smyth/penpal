"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetcher } from "@lib/fetcher";
import { Disclosure } from "@headlessui/react";
import { FADE_IN_ANIMATION_SETTINGS } from "@lib/theme";
import { AnimatePresence, motion } from "framer-motion";
import { X as XIcon, Menu as MenuIcon } from "lucide-react";
import { useScroll } from "@lib/hooks";
import { LoadingButton } from "@components/ui";
import { useSignInModal } from "./SignInModal";
import UserDropdown from "./UserDropdown";

const navigation = [
  { name: "Why Penpal?", href: "#", current: false },
  { name: "Tools & Guides", href: "#", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const [loading, setLoading] = useState(false);
  const scrolled = useScroll(50);
  const router = useRouter();

  const handleCreatePostClick = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
      throw new Error(err);
    }
  };

  return (
    <>
      <SignInModal />
      <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
      <Disclosure
        as="nav"
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
                      {navigation.map((item) => (
                        <Link href={item.href} key={item.name}>
                          <AnimatePresence>
                            <motion.button
                              className="rounded-2xl p-1.5 px-4 text-sm text-black transition-all hover:bg-stone-200 hover:text-black"
                              {...FADE_IN_ANIMATION_SETTINGS}
                            >
                              {item.name}
                            </motion.button>
                          </AnimatePresence>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center space-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <AnimatePresence>
                    {/* Sign in button */}
                    {!session && status !== "loading" ? (
                      <motion.button
                        className="rounded-2xl border-emerald-600 bg-emerald-600 p-1.5 px-4 text-sm text-white transition-all hover:border-emerald-600 hover:bg-emerald-700 hover:text-white sm:bg-transparent sm:text-black sm:hover:bg-stone-200 sm:hover:text-black"
                        onClick={() => setShowSignInModal(true)}
                        {...FADE_IN_ANIMATION_SETTINGS}
                      >
                        Sign In
                      </motion.button>
                    ) : (
                      <UserDropdown />
                    )}
                  </AnimatePresence>
                  <div className="hidden sm:block">
                    {/* Create article button */}
                    <AnimatePresence>
                      <LoadingButton
                        {...FADE_IN_ANIMATION_SETTINGS}
                        loading={loading}
                        onClick={handleCreatePostClick}
                        className="min-w-[150px]"
                      >
                        Create Article
                      </LoadingButton>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile Navbar menu links */}
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-300 text-black"
                        : "text-gray-500 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium",
                    )}
                    aria-current={item.current ? "page" : undefined}
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
