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

        // Extract the object from the event
        const dataObject = event.data.object;

        // Handle the event
        // Review important events for Billing webhooks
        // https://stripe.com/docs/billing/webhooks
        switch (event.type) {
          case 'invoice.paid':
            // Sent when the invoice is successfully paid. You can
            // provision access to your product when you receive this
            // event and the subscription status is active.
            break;
          case 'customer.subscription.updated':
            // Sent when the subscription is successfully started, after
            // the payment is confirmed. Also sent whenever a subscription
            // is changed. For example, adding a coupon, applying a
            // discount, adding an invoice item, and changing plans all
            // trigger this event.

            // When a subscription changes to past_due, notify the customer
            // directly and ask them to update their payment details.
            // Stripe offers several features that help automate this
            // process-read more about revenue recovery.

            // When a subscription changes to canceled or unpaid,
            // revoke access to your product.
            stripeWebhookService.onSubscriptionUpdated(dataObject);
            break;
          case 'customer.subscription.deleted':
            // Sent when the subscription is successfully started, after
            // the payment is confirmed. Also sent whenever a subscription
            // is changed. For example, adding a coupon, applying a
            // discount, adding an invoice item, and changing plans all
            // trigger this event.

            // When a subscription changes to past_due, notify the customer
            // directly and ask them to update their payment details.
            // Stripe offers several features that help automate this
            // process-read more about revenue recovery.

            // When a subscription changes to canceled or unpaid,
            // revoke access to your product.
            stripeWebhookService.onSubscriptionDeleted(dataObject);
            break;
        }
        res.status(200);
      } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: 'Method not allowed' });
      break;
  }
}
