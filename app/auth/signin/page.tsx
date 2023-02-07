"use client";

import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const searchParams = useSearchParams();

  const options = {
    callbackUrl: searchParams.get("callbackUrl") || undefined,
  };

  return (
    <>
      <Link
        href="/api/auth/signin"
        onClick={(e) => {
          e.preventDefault();
          signIn(undefined, options);
        }}
      >
        Sign in
      </Link>
      <Link
        href="api/auth/signout"
        onClick={(e) => {
          e.preventDefault();
          signOut();
        }}
      >
        Sign out
      </Link>
    </>
  );
}
