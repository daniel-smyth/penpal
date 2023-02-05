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
          throw new Error('email required for Stripe subscription');
        }

        // User already has subscription. Get its latest_invoice to confirm payment
        if (user.subscriptionId) {
          const { latest_invoice } = await stripeService.getSubscription(
            user.subscriptionId,
            ['latest_invoice.payment_intent'] // `expand` latest_invoice's payment_intent
          );
          const { payment_intent } = latest_invoice as Stripe.Invoice;

          return res.status(200).json({
            subscriptionId: user.subscriptionId,
            clientSecret: (payment_intent as Stripe.PaymentIntent).client_secret
          });
        }

        let stripeCustomer: Stripe.Customer;

        if (user.stripeId && user.stripeId !== '') {
          stripeCustomer = await stripeService.findCustomer(user.stripeId);
        } else {
          stripeCustomer = await stripeService.createCustomer({
            email: user.email
          });
          // Add new Stripe customer ID to user's record
          const userWithStripeId = {
            ...user,
            stripeId: stripeCustomer.id
          };
          await userService.update(user.id as string, userWithStripeId);
        }

        // Price ID values can be found on the Stripe dashboard
        // https://stripe.com/docs/billing/subscriptions/price-and-product-ids
        const { priceId } = req.body;

        // Create the subscription. Note we're expanding the Subscription's
        // latest invoice and that invoice's payment_intent
        // so we can pass it to the front end to confirm the payment
        const { id, latest_invoice } = await stripeService.createSubscription({
          customer: stripeCustomer.id,
          items: [{ price: priceId }],
          payment_behavior: 'default_incomplete',
          payment_settings: {
            save_default_payment_method: 'on_subscription'
          },
          expand: ['latest_invoice.payment_intent']
        });

        const { payment_intent } = latest_invoice as Stripe.Invoice;

        // Add the Stripe subscription ID to the user's record
        const userWithSubscriptionId = {
          ...user,
          subscriptionId: id
        };
        await userService.update(user.id as string, userWithSubscriptionId);

        res.status(200).json({
          subscriptionId: id,
          clientSecret: (payment_intent as Stripe.PaymentIntent).client_secret
        });
      } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
      break;
    case 'DELETE':
      try {
        const { subscriptionId } = user;
        await stripeService.deleteSubscription(subscriptionId as string);

        delete user.subscriptionId;
        delete user.subscriptionStatus;

        res.status(200).json({ message: 'Subscription canceled' });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
    default:
      res.status(400).json({ success: 'Method not allowed' });
      break;
  }
}
