import { getUser } from '@lib/auth';
import { stripeService } from '@lib/stripe';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getUser();

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!user?.stripeId) {
    return res.status(400).json({ success: 'user stripeId is required' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const { subscriptionId, newPriceLookupKey } = req.query;
        const priceId =
          process.env[(newPriceLookupKey as string).toUpperCase()];

        if (!priceId) {
          throw new Error('cannot find price id');
        }

        const subscription = await stripeService.getSubscription(
          subscriptionId as string
        );

        const invoice = await stripeService.retrieveUpcomingInvoices(
          user.stripeId,
          subscription,
          priceId
        );

        res.status(200).json({ invoice });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case 'POST':
      try {
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
