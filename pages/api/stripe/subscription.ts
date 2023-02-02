import { NextApiRequest, NextApiResponse } from 'next';
import { stripeService } from '@lib/stripe';
import { getUser } from '@lib/auth';
import { userService } from '@lib/database/services';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getUser();

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  switch (req.method) {
    case 'GET':
      try {
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case 'POST':
      try {
        if (!user.email) {
          throw new Error('user email is required');
        }
        const customer = await stripeService.createCustomer({
          email: user.email
        });
        await userService.update(user.id, { ...user, stripeId: customer.id });
        // Create the subscription. Note we're expanding the Subscription's
        // latest invoice and that invoice's payment_intent
        // so we can pass it to the front end to confirm the payment
        const { id, latest_invoice } = await stripeService.createSubscription({
          customer: customer.id,
          items: [
            {
              price: req.body.priceId
            }
          ],
          payment_behavior: 'default_incomplete',
          payment_settings: {
            save_default_payment_method: 'on_subscription'
          },
          expand: ['latest_invoice.payment_intent']
        });
        res.status(200).json({
          subscriptionId: id,
          clientSecret: (latest_invoice as any).payment_intent.client_secret
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
