'use client';

import AuthProvider from './provider';

function SubscriptionLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default SubscriptionLayout;
