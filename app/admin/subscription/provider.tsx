'use client';

import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@lib/stripe';

const stripePromise = loadStripe();

export default function StripeProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/api/subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: [
          { id: 'monthly', price: 30 },
          { id: 'yearly', price: 300 }
        ]
      })
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const appearance = {
    theme: 'stripe' as 'stripe' | 'night' | 'flat' | 'none'
  };
  const options = {
    // passing the client secret obtained from the server
    clientSecret,
    appearance
  };

  return clientSecret.length > 1 ? (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  ) : (
    <></>
  );
}
