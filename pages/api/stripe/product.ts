import { NextApiRequest, NextApiResponse } from 'next';
import { stripeService } from '@lib/stripe';

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
        const product = await stripeService.createProduct({ ...req.body });
        res.status(200).json({ product });
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
