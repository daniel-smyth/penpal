'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
  LinkAuthenticationElement
} from '@stripe/react-stripe-js';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface CheckoutFormProps {
  redirectUrl: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ redirectUrl }) => {
  const stripe = useStripe();
  const elements = useElements();

  const { data: userSession } = useSession();
  const pathName = usePathname();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: redirectUrl,
        receipt_email: email
      }
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message || 'An unexpected error occurred.');
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs'
  };

  return (
    <form onSubmit={handleSubmit}>
      Address:
      <input type="text" />
      <br />
      {/* aligned to right */}
      Plan Details: {pathName?.split('/').pop()}
      <br />
      <LinkAuthenticationElement onChange={(e) => setEmail(e.value.email)} />
      <PaymentElement options={paymentElementOptions as any} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span>{isLoading ? <div>Loading</div> : 'Pay now'}</span>
      </button>
      {/* Show any error or success messages */}
      {message && <div>{message}</div>}
    </form>
  );
};

export default CheckoutForm;
