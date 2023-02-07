"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { fetcher } from "@lib/fetcher";
import { FADE_IN_ANIMATION_SETTINGS } from "@lib/theme";
import { useScroll } from "@lib/hooks";
import { LoadingButton } from "@components/ui";
import { useSignInModal } from "./SignInModal";
import UserDropdown from "./UserDropdown";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);
  const [loading, setLoading] = useState(false);

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
      <div
        className={`fixed top-0 w-full ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <div className="flex flex-wrap gap-4">
            <Link
              href="/"
              className="flex items-center px-4 font-display text-2xl"
            >
              <p>Penpal</p>
            </Link>
            <AnimatePresence>
              {!session && status !== "loading" ? (
                <motion.button
                  className="rounded-lg p-1.5 px-4 text-sm text-black transition-all hover:bg-stone-200 hover:text-black"
                  {...FADE_IN_ANIMATION_SETTINGS}
                >
                  Why Penpal?
                </motion.button>
              ) : (
                <UserDropdown />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {!session && status !== "loading" ? (
                <motion.button
                  className="rounded-lg p-1.5 px-4 text-sm text-black transition-all hover:bg-stone-200 hover:text-black"
                  {...FADE_IN_ANIMATION_SETTINGS}
                >
                  Tools & Guides
                </motion.button>
              ) : (
                <UserDropdown />
              )}
            </AnimatePresence>
          </div>
          <div className="flex flex-wrap gap-4">
            <AnimatePresence>
              {!session && status !== "loading" ? (
                <motion.button
                  className="rounded-lg p-1.5 px-4 text-sm text-black transition-all hover:bg-stone-200 hover:text-black"
                  onClick={() => setShowSignInModal(true)}
                  {...FADE_IN_ANIMATION_SETTINGS}
                >
                  Sign In
                </motion.button>
              ) : (
                <UserDropdown />
              )}
            </AnimatePresence>
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
    </>
  );
};

export default Navbar;
