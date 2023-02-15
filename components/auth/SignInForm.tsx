"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import {
  Facebook,
  Github,
  Google,
  LoadingDots,
  Twitter,
} from "@components/icons";
import { Mail as MailIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@lib/theme";
import { Alert, Button } from "@components/ui/server";

const PROVIDERS = [
  { name: "Google", icon: Google },
  { name: "Facebook", icon: Facebook },
  { name: "Twitter", icon: Twitter },
  { name: "Github", icon: Github },
];

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [btnText, setBtnText] = useState("Sign In");
  const [signInClicked, setSignInClicked] = useState<{ [k: string]: boolean }>({
    ...PROVIDERS.reduce((acc, p) => ({ ...acc, [p.name]: false }), {}),
    email: false,
  });

  // Some sign in errors are returned as query params to this URL
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [response, setResponse] = useState({
    type: (error ? "error" : "success") as "error" | "success",
    message: error || "",
  });

  const onEmailSignInSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignInClicked({ email: true });
    const res = await signIn("email", { email, redirect: false });
    res?.ok
      ? setResponse({
          type: "success",
          message: "Check email for sign in link",
        })
      : setResponse({
          type: "error",
          message: "An unknown error occurred",
        });
    setSignInClicked({ email: false });
  };

  useEffect(() => {
    () => {
      setSignInClicked({
        ...PROVIDERS.reduce((acc, p) => ({ ...acc, [p.name]: false }), {}),
        email: false,
      });
      setResponse({ type: "success", message: "" });
    };
  });

  return (
    <>
      <div className="flex flex-col space-y-3 rounded-b-2xl bg-gray-50 px-4 pt-3 pb-12 dark:bg-gray-900 md:px-16">
        <form
          className="flex flex-col space-y-3"
          onSubmit={onEmailSignInSubmit}
        >
          <AnimatePresence>
            {response.message.length > 1 ? (
              <Alert
                type={response.type}
                className="max-h-[2.4rem]"
                onClose={() =>
                  setResponse((current) => ({
                    ...current,
                    message: "",
                  }))
                }
              >
                {response.type === "success"
                  ? response.message
                  : `Error: ${response.message}`}
              </Alert>
            ) : (
              <motion.label
                htmlFor="email"
                className="flex min-h-[2.4rem] items-end text-sm font-medium text-gray-500 dark:text-white"
                {...FADE_IN_ANIMATION_SETTINGS}
              >
                Enter email address
              </motion.label>
            )}
          </AnimatePresence>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MailIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 outline-none focus:border-emerald-600 focus:ring-emerald-600  dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-emerald-600 dark:focus:ring-emerald-600"
              placeholder="name@penpal.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" loading={signInClicked.email}>
            {btnText}
          </Button>
        </form>
        <button
          className="text-center"
          onClick={() => {
            setBtnText("Create Account");
          }}
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
    </>
  );
};

export default SignInForm;
