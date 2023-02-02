import { Stripe, loadStripe } from '@stripe/stripe-js';

let STRIPE_PUBLISHABLE_KEY: string | undefined;

if (process.env.NODE_ENV !== 'production') {
  STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST;
} else {
  STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
}

if (!STRIPE_PUBLISHABLE_KEY) {
  throw new Error('Stripe keys undefined. Please to .env file.');
}

let stripePromise: Promise<Stripe | null>;

/** Client only session. Server session is handled via `stripe.service.ts` */
const getClientSession = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

export default getClientSession;
