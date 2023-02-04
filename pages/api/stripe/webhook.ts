import { NextApiRequest, NextApiResponse } from 'next';
import { stripeService, stripeWebhookService } from '@lib/stripe/server';
import { buffer } from '@lib/buffer';

// Next.JS API config
// Stripe webhooks need raw request body
export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      try {
        let event;

        // Retrieve the event by verifying the signature using the raw body and secret
        const rawBody = await buffer(req);
        event = stripeService.constructEvent(
          rawBody,
          req.headers['stripe-signature'] as string
        );

        res.status(200);

        // Extract the object from the event
        const dataObject = event.data.object;

        // Handle the event
        // Review important events for Billing webhooks
        // https://stripe.com/docs/billing/webhooks
        switch (event.type) {
          case 'invoice.paid':
            // Used to provision services after the trial has ended.
            // The status of the invoice will show up as paid. Store the status in your
            // database to reference when a user accesses your service to avoid hitting rate limits.
            break;
          case 'invoice.payment_failed':
            await stripeWebhookService.onInvoicePaymentFailed(dataObject);
            break;
          case 'customer.subscription.created':
            await stripeWebhookService.onSubscriptionCreated(dataObject);
            break;
          case 'customer.subscription.updated':
            await stripeWebhookService.onSubscriptionUpdated(dataObject);
            break;
          case 'customer.subscription.deleted':
            // if (event.request != null) {}
            await stripeWebhookService.onSubscriptionCancelled(dataObject);
            break;
          default:
        }
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    default:
      res.status(400).json({ success: 'Method not allowed' });
      break;
  }
}
