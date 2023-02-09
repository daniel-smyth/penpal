"use client";

import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@lib/theme";
import useSignInModal from "./SignInModal";
import UserDropdown from "./UserDropdown";

const SignInButton: React.FC = () => {
  const { data: session, status } = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <>
      <SignInModal />
      <AnimatePresence>
        {!session && status !== "loading" ? (
          <motion.button
            key="sign-in-button"
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
    </>
  );
};

export default SignInButton;
