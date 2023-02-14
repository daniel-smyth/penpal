"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetcher } from "@lib/fetcher";
import {
  Menu as MenuIcon,
  PlusCircle as PlusCircleIcon,
  BookOpen as BookOpenIcon,
  CheckCircle as CheckCircleIcon,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@lib/theme";
import { useScroll } from "@lib/hooks";
import { SignInButton } from "@components/auth";
import { Button, SidebarButton, Popover } from "@components/ui/client";

const navbar = [
  { name: "Why Penpal?", Icon: CheckCircleIcon, href: "#" },
  { name: "Tools & Guides", Icon: BookOpenIcon, href: "#" },
];

const PresentationNavbar: React.FC = () => {
  const [fetching, setFetching] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
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
      router.push(`/articles/${_id}/text`);
    } catch (err: any) {
      console.log(err);
      setFetching(false);
      throw new Error(err);
    }
  };

  return (
    <div
      className={`fixed top-0 w-full ${
        scrolled
          ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
          : "bg-white/0"
      } z-40 transition-all`}
    >
      <div className="mx-auto px-4 dark:bg-gray-800 dark:text-white sm:px-6 lg:px-8">
        <nav className="relative flex h-16 items-center justify-between">
          <div
            id="mobile-hamburger"
            className="absolute flex text-gray-400 sm:hidden"
          >
            <MenuIcon
              onClick={() => setOpenPopover(!openPopover)}
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
              <AnimatePresence>
                {navbar.map((item) => (
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
        </nav>
      </div>

      <div className="sm:hidden">
        <Popover
          content={
            <div className="space-y-4 border-b border-gray-200 bg-white px-2 pt-2 pb-6 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              <SidebarButton
                loading={fetching}
                onClick={createArticle}
                Icon={PlusCircleIcon}
              >
                Create Article
              </SidebarButton>
              {navbar.map((item) => (
                <SidebarButton key={item.name} Icon={item.Icon}>
                  <Link href={item.href}>{item.name}</Link>
                </SidebarButton>
              ))}
            </div>
          }
          openPopover={openPopover}
          setOpenPopover={setOpenPopover}
        />
      </div>
    </div>
  );
};

export default PresentationNavbar;
