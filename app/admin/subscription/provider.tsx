"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { status: authStatus } = useSession({
    required: true, // means `status` can only be "loading" or "authenticated"
    onUnauthenticated() {
      router.push("/signin?callbackUrl=" + pathname);
    },
  });

  if (authStatus === "loading") {
    return <div>Authenticating...</div>;
  }

  return <SessionProvider>{children}</SessionProvider>;
}

export default AuthProvider;
