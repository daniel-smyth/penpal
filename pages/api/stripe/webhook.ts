import { NextApiRequest, NextApiResponse } from 'next';
import { stripeService } from '@lib/stripe/server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      try {
        // Retrieve the event by verifying the signature using the raw body and secret.
        let event;

        try {
          event = stripeService.constructWebhook(
            req.body,
            req.headers['stripe-signature'] as string
          );
        } catch (err) {
          console.log(err);
          console.log(`⚠️  Webhook signature verification failed.`);
          console.log(
            `⚠️  Check the env file and enter the correct webhook secret.`
          );
          return res.status(400);
        }
        // Extract the object from the event.
        const dataObject = event.data.object;

        // Handle the event
        // Review important events for Billing webhooks
        // https://stripe.com/docs/billing/webhooks
        // Remove comment to see the various objects sent for this sample
        switch (event.type) {
          case 'invoice.paid':
            // Used to provision services after the trial has ended.
            // The status of the invoice will show up as paid. Store the status in your
            // database to reference when a user accesses your service to avoid hitting rate limits.
            break;
          case 'invoice.payment_failed':
            // If the payment fails or the customer does not have a valid payment method,
            //  an invoice.payment_failed event is sent, the subscription becomes past_due.
            // Use this webhook to notify your user that their payment has
            // failed and to retrieve new card details.
            break;
          case 'customer.subscription.deleted':
            if (event.request != null) {
              // handle a subscription canceled by your request
              // from above.
            } else {
              // handle subscription canceled automatically based
              // upon your subscription settings.
            }
            break;
          default:
          // Unexpected event type
        }
        res.status(200);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    default:
      res.status(400).json({ success: 'Method not allowed' });
      break;
  }
}
