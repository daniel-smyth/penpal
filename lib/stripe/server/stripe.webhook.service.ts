import { emailService } from '@lib/email';
import { userService } from '@lib/database/services';

class StripeWebhookService {
  public async onInvoicePaymentFailed(eventObject: { [key: string]: any }) {
    const { customer: customerStripeId } = eventObject;

    const user = await userService.find({ stripeId: customerStripeId });

    await emailService.sendEmail({
      from: '',
      to: user?.email as string,
      subject: 'Payment failed',
      html: 'Your payment has failed. Please update your payment method.'
    });
  }

  public async onSubscriptionCreated(eventObject: { [key: string]: any }) {
    const {
      id: subscriptionId,
      status: subscriptionStatus,
      customer: customerStripeId
    } = eventObject;

    const user = await userService.find({ stripeId: customerStripeId });

    if (subscriptionStatus === 'active') {
      await emailService.sendEmail({
        from: '',
        to: user?.email as string,
        subject: 'Welcome to our service!',
        html: 'Thank you for subscribing to our service.'
      });
    }

    await userService.update(user?._id as string, {
      ...user,
      subscriptionId,
      subscriptionStatus
    });
  }

  public async onSubscriptionUpdated(eventObject: { [key: string]: any }) {
    const {
      id: subscriptionId,
      status: subscriptionStatus,
      customer: customerStripeId
    } = eventObject;

    const user = await userService.find({ stripeId: customerStripeId });

    if (user) {
      await userService.update(user._id, {
        ...user,
        subscriptionId,
        subscriptionStatus
      });
    }
  }

  public async onSubscriptionCancelled(eventObject: { [key: string]: any }) {
    const {
      id: subscriptionId,
      status: subscriptionStatus,
      customer: customerStripeId
    } = eventObject;

    const user = await userService.find({ stripeId: customerStripeId });

    await emailService.sendEmail({
      from: '',
      to: user?.email as string,
      subject: 'Sad to see you go!',
      html: 'We are sad to see you go. Please let us know if there is anything we can do to improve our service.'
    });

    await userService.update(user?._id as string, {
      ...user,
      subscriptionId,
      subscriptionStatus
    });
  }
}

const stripeWebhookService = new StripeWebhookService();

export default stripeWebhookService;
