import { emailService } from '@lib/email';
import { userService } from '@lib/database/services';

class StripeWebhookService {
  public async onSubscriptionUpdated(eventObject: { [key: string]: any }) {
    const { status: subscriptionStatus, customer: customerStripeId } =
      eventObject;

    const user = await userService.find({ stripeId: customerStripeId });
    if (user) {
      user.subscriptionStatus = subscriptionStatus;
      await user.save();

      switch (subscriptionStatus) {
        case 'trialing':
          // The subscription is currently in a trial period and it’s safe to
          // provision your product for your customer. The subscription
          // transitions automatically to active when the first payment is made.
          break;
        case 'active':
          await emailService.sendEmail({
            from: 'danielsmyth2011@gmail.com',
            to: user.email as string,
            subject: 'Subscription active',
            html: ''
          });
          // The subscription is in good standing and the most recent payment
          // is successful. It’s safe to provision your product for your customer.
          break;
        case 'incomplete':
          // 	A successful payment needs to be made within 23 hours to activate
          // the subscription. Or the payment requires action, like customer
          // authentication. Read more about payments that require action.
          // Subscriptions can also be incomplete if there’s a pending payment.
          // In that case, the invoice status would be open_payment_pending and
          // the PaymentIntent status would be processing.
          break;
        case 'incomplete_expired':
          // The initial payment on the subscription failed and no successful
          // payment was made within 23 hours of creating the subscription. These
          // subscriptions don’t bill customers. This status exists so you can track
          // customers that failed to activate their subscriptions.
          break;
        case 'past_due':
          break;
        case 'canceled':
          await emailService.sendEmail({
            from: 'danielsmyth2011@gmail.com',
            to: user.email as string,
            subject: 'Subscription cancelled',
            html: ''
          });
          // The subscription has been canceled.
          break;
        case 'unpaid':
          // The latest invoice hasn’t been paid but the subscription remains in
          // place. The latest invoice remains open and invoices continue to be
          // generated but payments aren’t attempted. You should revoke access to
          // your product when the subscription is unpaid since payments were
          // already attempted and retried when it was past_due. To move the
          // subscription to active, pay the most recent invoice before its due date.
          break;
      }
    }
  }

  public async onSubscriptionDeleted(eventObject: { [key: string]: any }) {
    const { customer: customerStripeId } = eventObject;

    const user = await userService.find({ stripeId: customerStripeId });
    if (user) {
      delete user.subscriptionId;
      delete user.subscriptionStatus;
      await user.save();

      await emailService.sendEmail({
        from: 'danielsmyth2011@gmail.com',
        to: user.email as string,
        subject: 'Subscription cancelled',
        html: ''
      });
    }
  }
}

const stripeWebhookService = new StripeWebhookService();

export default stripeWebhookService;
