import React from "react";
import { SignInForm } from "@components/auth";

export default function SignInPage() {
  return (
    <div className="w-full py-8 sm:h-full md:max-w-md">
      <div className="relative py-6 text-center dark:text-white sm:dark:rounded-t-2xl sm:dark:border sm:dark:border-gray-600">
        <h3 className="font-display text-2xl font-bold">Sign In</h3>
      </div>
      <div className="relative border border-gray-200 dark:border-gray-600 md:rounded-2xl">
        <SignInForm />
      </div>
    </div>
  );
}
