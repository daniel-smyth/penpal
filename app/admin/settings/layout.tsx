'use client';

import { Sidebar } from '@components/common';

function SettingsLayout({ children }: { children: React.ReactNode }) {
  return <Sidebar>{children}</Sidebar>;
}

export default SettingsLayout;
