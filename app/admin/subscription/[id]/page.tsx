'use client';

import React from 'react';
import { CheckoutForm } from '@components/app/admin/subscription';
import { usePathname } from 'next/navigation';

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;

if (!NEXT_PUBLIC_APP_URL) {
  throw new Error('NEXT_PUBLIC_APP_URL undefined. Please add to .env file.');
}

export default function SubscriptionPage() {
  const pathname = usePathname();

  return (
    <CheckoutForm
      redirectUrl={`${NEXT_PUBLIC_APP_URL}/admin/subscription/complete`}
    />
  );
}
