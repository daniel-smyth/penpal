'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetcher } from '@lib/fetcher';
import { Elements } from '@stripe/react-stripe-js';
import { getClientSession } from '@lib/stripe';

const stripePromise = getClientSession();

function StripeProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      const { clientSecret } = await fetcher({
        url: '/api/stripe/subscription',
        method: 'POST',
        body: {
          priceId: router.query.priceId
        }
      });
      setClientSecret(clientSecret);
    };
    createPaymentIntent();
  }, [router.query.priceId]);

  const appearance = {
    theme: 'stripe' as 'stripe' | 'night' | 'flat' | 'none'
  };

  // passing the client secret obtained from the server
  const options = {
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

export default StripeProvider;
