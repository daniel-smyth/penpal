import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { dbConnect } from '@lib/database/mongoose';
import { getUser } from '@lib/auth';
import { userService } from '@lib/database/services';
import { stripeService } from '@lib/stripe/server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const user = await getUser({ req, res });

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  switch (req.method) {
    case 'POST':
      try {
        if (!user.email) {
          throw new Error('signed in user must have an email for stripe');
        }

        let stripeUser;

        if (user.stripeId) {
          stripeUser = await stripeService.findCustomer(user.stripeId);
        } else {
          stripeUser = await stripeService.createCustomer({
            email: user.email
          });
        }

        // Add the Stripe customer ID to the user's record
        const userWithStripeId = {
          ...user,
          stripeId: stripeUser.id
        };
        await userService.update(user.id, userWithStripeId);

        // Price ID values can be found on the Stripe dashboard
        // https://stripe.com/docs/billing/subscriptions/price-and-product-ids
        const { priceId } = req.body;

        // Create the subscription. Note we're expanding the Subscription's
        // latest invoice and that invoice's payment_intent
        // so we can pass it to the front end to confirm the payment
        const { id, latest_invoice } = await stripeService.createSubscription({
          customer: stripeUser.id,
          items: [{ price: priceId }],
          payment_behavior: 'default_incomplete',
          payment_settings: {
            save_default_payment_method: 'on_subscription'
          },
          expand: ['latest_invoice.payment_intent']
        });

        // Get expanded invoice's payment_intent to confirm payment on front end
        const invoice = latest_invoice as Stripe.Invoice;
        const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

        res.status(200).json({
          subscriptionId: id,
          clientSecret: paymentIntent.client_secret
        });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;

    case 'DELETE':
      try {
        await stripeService.deleteSubscription(req.query.id as string);
        res.status(200).json({ message: 'Subscription canceled' });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
    default:
      res.status(400).json({ success: 'Method not allowed' });
      break;
  }
}
