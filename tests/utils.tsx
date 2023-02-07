import React, { ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { SWRConfig } from "swr";

const SWRTestingProvider = ({ children }: { children?: ReactNode }) => {
  return (
    <SWRConfig
      value={{
        dedupingInterval: 0, // Default 2 seconds https://swr.vercel.app/docs/with-nextjs#deduping-interval
        provider: () => new Map(), // Resets cache before every test
      }}
    >
      {children}
    </SWRConfig>
  );
};

/**
 * Custom render method that wraps components in the SwrTestingProvider. This is
 * needed to reset the cache before every test.
 */
export const customSWRRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: SWRTestingProvider, ...options });
