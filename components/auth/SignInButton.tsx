"use client";

import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import cn from "classnames";
import { FADE_IN_ANIMATION_SETTINGS } from "@lib/theme";
import useSignInModal from "./SignInModal";
import UserDropdown from "./UserDropdown";

interface SignInButtonProps {
  className?: string;
}

const SignInButton: React.FC<SignInButtonProps> = ({ className }) => {
  const { data: session, status } = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <>
      <SignInModal />
      <AnimatePresence>
        {!session && status !== "loading" ? (
          <motion.button
            key="sign-in-button"
            className={cn(
              "rounded-2xl border-emerald-600 bg-emerald-600 p-1.5 px-4 text-sm text-white transition-all hover:border-emerald-600 hover:bg-emerald-700 hover:text-white",
              className,
            )}
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
