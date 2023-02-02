import { stripeService } from '@lib/stripe';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      try {
        const price = await stripeService.createPrice({ ...req.body });
        res.status(200).json({ product: price });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    default:
      res.status(400).json({ success: 'Method not allowed' });
      break;
  }
}
