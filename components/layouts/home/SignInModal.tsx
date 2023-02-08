import React, {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  FormEvent,
  useEffect,
} from "react";
import { signIn } from "next-auth/react";
import {
  LoadingDots,
  Google,
  Facebook,
  Twitter,
  Github,
} from "@components/icons";
import { LoadingButton, Modal } from "@components/ui";
import { useSearchParams } from "next/navigation";

const PROVIDERS = [
  { name: "Google", icon: Google },
  { name: "Facebook", icon: Facebook },
  { name: "Twitter", icon: Twitter },
  { name: "Github", icon: Github },
];

interface SignInModalProps {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}

const SignInModal: React.FC<SignInModalProps> = ({
  showSignInModal,
  setShowSignInModal,
}) => {
  const [email, setEmail] = useState("");
  const [signInClicked, setSignInClicked] = useState<{ [k: string]: boolean }>({
    ...PROVIDERS.reduce((acc, p) => ({ ...acc, [p.name]: false }), {}),
    email: false,
  });
  const [btnText, setBtnText] = useState<"Sign In" | "Create Account">(
    "Sign In",
  );
  const searchParams = useSearchParams();
  const [response, setResponse] = useState<string | null>(
    searchParams.get("error"),
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignInClicked({ email: true });
    const res = await signIn("email", { email, redirect: false });
    res?.ok
      ? setResponse("Check email for sign in link")
      : setResponse("An unknown error occurred");
    setSignInClicked({ email: false });
  };

  useEffect(() => {
    () =>
      setSignInClicked({
        ...PROVIDERS.reduce((acc, p) => ({ ...acc, [p.name]: false }), {}),
        email: false,
      });
  });

  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center dark:border-gray-500 dark:bg-gray-800 dark:text-white md:px-16">
          <h3 className="font-display text-2xl font-bold">Sign In</h3>
        </div>
        <div className="min-h-[35px] bg-gray-50 dark:bg-gray-900">
          {response && (
            <div
              className="bg-emerald-100 py-2 px-6 text-center text-sm text-emerald-700"
              role="alert"
            >
              {response}
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-4 bg-gray-50 px-4 pb-12 pt-2 dark:bg-gray-900 md:px-16">
          <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <input
                type="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 outline-none focus:border-emerald-600 focus:ring-emerald-600  dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-emerald-600 dark:focus:ring-emerald-600"
                placeholder="name@penpal.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <LoadingButton
              type="submit"
              className="h-10"
              loading={signInClicked.email}
            >
              {btnText}
            </LoadingButton>
          </form>
          <button
            className="text-center"
            onClick={() => setBtnText("Create Account")}
          >
            <p className="text-sm text-gray-500 underline">
              I don&apos;t have an account
            </p>
          </button>
          {PROVIDERS.map((provider) => (
            <button
              disabled={signInClicked[provider.name]}
              className={`${
                signInClicked[provider.name]
                  ? "cursor-not-allowed border-gray-200 bg-gray-100 dark:border-gray-600 dark:bg-gray-900"
                  : "border border-gray-200 bg-white text-black hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:hover:bg-gray-900"
              } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
              onClick={() => {
                setSignInClicked({ [provider.name]: true });
                signIn(provider.name.toLowerCase());
              }}
              key={provider.name}
            >
              {signInClicked[provider.name] ? (
                <LoadingDots color="#808080" />
              ) : (
                <>
                  <provider.icon className="h-5 w-5" />
                  <p>Sign In with {provider.name}</p>
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export function useSignInModal() {
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
}
