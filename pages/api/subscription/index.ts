import { NextApiRequest, NextApiResponse } from 'next';
import { Stripe } from 'stripe';

let STRIPE_SECRET_KEY = '';

if (process.env.NODE_ENV !== 'production') {
  if (!process.env.STRIPE_SECRET_KEY_TEST) {
    throw new Error(
      'STRIPE_SECRET_KEY_TEST is not defined. Please add it to your .env.local file.'
    );
  }
  STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY_TEST;
}

if (process.env.NODE_ENV === 'production') {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(
      'STRIPE_SECRET_KEY is not defined. Please add it to your .env.local file.'
    );
  }
  STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15'
  });

  switch (req.method) {
    case 'GET':
      try {
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case 'POST':
      try {
        const { items } = req.body;

        const amount = items.reduce((acc: number, item: any) => {
          return acc + item.price;
        }, 0);

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: 'aud',
          automatic_payment_methods: {
            enabled: true
          }
        });

        res.send({
          clientSecret: paymentIntent.client_secret
        });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case 'PUT':
      try {
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case 'DELETE':
      try {
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
