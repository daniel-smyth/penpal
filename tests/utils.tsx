import React, { ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { SWRConfig } from 'swr';

const SwrTestingProvider = ({ children }: { children?: ReactNode }) => {
  return (
    <SWRConfig
      value={{
        dedupingInterval: 0, // Default 2 seconds https://swr.vercel.app/docs/with-nextjs#deduping-interval
        provider: () => new Map() // Resets cache before every test
      }}
    >
      {children}
    </SWRConfig>
  );
};

// Custom Jest render to clear SWR caches after each test
export const customSwrRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: SwrTestingProvider, ...options });
