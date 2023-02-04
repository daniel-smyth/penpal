import { Stripe, loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!STRIPE_PUBLISHABLE_KEY) {
  throw new Error('Stripe keys undefined. Please add to .env file.');
}

let stripePromise: Promise<Stripe | null>;

/** Client only session. Server session is handled via `stripe.service.ts` */
const getStripeClientSession = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

export default getStripeClientSession;
