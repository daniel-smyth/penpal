import { Stripe, loadStripe } from '@stripe/stripe-js';

let STRIPE_PUBLISHABLE_KEY = '';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error(
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined. Please add it to your .env.local file.'
  );
}

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST) {
  throw new Error(
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST is not defined. Please add it to your .env.local file.'
  );
}

if (process.env.NODE_ENV === 'production') {
  STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
} else {
  STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST;
}

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default getStripe;
