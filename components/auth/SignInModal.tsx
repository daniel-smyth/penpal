"use client";

import React, {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { Modal } from "@components/ui";
import { useSearchParams } from "next/navigation";
import { SignInForm } from "@components/auth";

interface SignInModalProps {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}

const SignInModal: React.FC<SignInModalProps> = ({
  showSignInModal,
  setShowSignInModal,
}) => {
  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="border-b border-gray-200 bg-white py-6 pt-8 text-center dark:border-gray-500 dark:bg-gray-800 dark:text-white">
          <h3 className="font-display text-2xl font-bold">Sign In</h3>
        </div>
        <SignInForm />
      </div>
    </Modal>
  );
};

const useSignInModal = () => {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("showSignInModal");
  const [showSignInModal, setShowSignInModal] = useState(isOpen === "true");

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback],
  );
};

export default useSignInModal;
