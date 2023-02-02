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
        // Create the subscription. Note we're expanding the Subscription's
        // latest invoice and that invoice's payment_intent
        // so we can pass it to the front end to confirm the payment
        const subscription = await stripeService.createSubscription({
          customer: req.query.customerId as string,
          items: [{ price: req.query.priceId as string }],
          payment_behavior: 'default_incomplete',
          payment_settings: { save_default_payment_method: 'on_subscription' },
          expand: ['latest_invoice.payment_intent']
        });

        res.status(200).json({
          subscriptionId: subscription.id,
          clientSecret: (subscription.latest_invoice as any).payment_intent
            .client_secret
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
