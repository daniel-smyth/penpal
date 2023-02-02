import { stripeService } from '@lib/stripe';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      try {
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case 'POST':
      try {
        const { client_secret } = await stripeService.createPaymentIntent({
          ...req.body,
          automatic_payment_methods: { enabled: true }
        });
        res.status(200).json({ clientSecret: client_secret });
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
