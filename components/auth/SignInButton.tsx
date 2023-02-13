"use client";

import { useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@lib/theme";
import { Button } from "@components/ui/client";
import useSignInModal from "./SignInModal";
import UserDropdown from "./UserDropdown";

interface SignInButtonProps {
  variant?: "solid" | "flat" | "outline";
  className?: string;
}

const SignInButton: React.FC<SignInButtonProps> = ({ variant = "solid" }) => {
  const { data: session, status } = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <>
      <SignInModal />
      <AnimatePresence>
        {!session && status !== "loading" ? (
          <Button
            key="sign-in-button"
            animated
            variant={variant}
            onClick={() => setShowSignInModal(true)}
            {...FADE_IN_ANIMATION_SETTINGS}
          >
            Sign In
          </Button>
        ) : (
          <UserDropdown />
        )}
      </AnimatePresence>
    </>
  );
};

export default SignInButton;
