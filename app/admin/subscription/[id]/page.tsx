import React from 'react';
import { CheckoutForm } from '@components/app/admin/subscription';

const APP_URL = process.env.APP_URL;

if (!APP_URL) {
  throw new Error('APP_URL undefined. Please add to .env file.');
}

export default async function SubscriptionPage() {
  return <CheckoutForm callbackUrl={`${APP_URL}/admin/subscription`} />;
}
