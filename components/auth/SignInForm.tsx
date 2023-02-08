"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import cn from "classnames";
import {
  Facebook,
  Github,
  Google,
  LoadingDots,
  Twitter,
} from "@components/icons";
import { LoadingButton } from "@components/ui";

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
    type: error ? "error" : "success",
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
      <div className="flex flex-col space-y-4 rounded-2xl bg-gray-50 px-4 pt-4 pb-10 dark:bg-gray-900 md:px-16">
        <form
          className="flex flex-col space-y-4"
          onSubmit={onEmailSignInSubmit}
        >
          {response.message.length > 1 ? (
            <div className="min-h-[40px]">
              <div
                className={cn(
                  response.type === "success"
                    ? "bg-green-200 text-emerald-700"
                    : "bg-rose-600 text-rose-900",
                  "rounded-xl px-3 py-2 text-center text-base",
                )}
                role="alert"
              >
                {response.type === "success"
                  ? response.message
                  : `Error: ${response.message}`}
              </div>
            </div>
          ) : (
            <div className="flex min-h-[40px] items-end px-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-500 dark:text-white"
              >
                Enter email address
              </label>
            </div>
          )}
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
              id="email"
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
