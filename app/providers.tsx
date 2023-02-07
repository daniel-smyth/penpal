"use client";

import { SessionProvider } from "next-auth/react";
import { Provider as RWBProvider } from "react-wrap-balancer";
import { Analytics } from "@vercel/analytics/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <RWBProvider>{children}</RWBProvider>
      <Analytics />
    </SessionProvider>
  );
}
