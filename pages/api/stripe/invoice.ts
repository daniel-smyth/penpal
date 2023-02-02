import { getUser } from '@lib/auth';
import { stripeService } from '@lib/stripe';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getUser();

  if (!user) {
    return res.status(401).json({ message: 'unauthorized' });
  }

  if (!user.stripeId) {
    return res.status(400).json({ success: 'user not a stripe customer' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const subscription = await stripeService.getSubscription(
          req.query.subscriptionId as string
        );
        const invoice = await stripeService.retrieveUpcomingInvoices(
          user.stripeId,
          subscription,
          req.query.priceId as string
        );
        res.status(200).json({ invoice });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    default:
      res.status(400).json({ success: 'Method not allowed' });
      break;
  }
}
