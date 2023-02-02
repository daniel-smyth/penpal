'use client';

import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { fetcher } from '@lib/fetcher';
import { loadStripe } from '@lib/stripe';

const stripePromise = loadStripe();

export default function StripeProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const createPaymentIntent = async () => {
      // Create PaymentIntent as soon as the page loads
      const { clientSecret } = await fetcher({
        url: '/api/subscription',
        method: 'POST',
        body: {
          items: [
            { id: 'monthly', price: 30 },
            { id: 'yearly', price: 300 }
          ]
        }
      });
      setClientSecret(clientSecret);
    };
    createPaymentIntent();
  }, []);

  const appearance = {
    theme: 'stripe' as 'stripe' | 'night' | 'flat' | 'none'
  };
  const options = {
    // passing the client secret obtained from the server
    clientSecret,
    appearance
  };

  return clientSecret !== '' ? (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  ) : (
    <></>
  );
}
