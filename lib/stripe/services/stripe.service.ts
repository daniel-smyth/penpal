import Stripe from 'stripe';

let STRIPE_SECRET_KEY = '';
let STRIPE_WEBHOOK_SECRET_KEY = '';

if (process.env.NODE_ENV !== 'production') {
  if (!process.env.STRIPE_SECRET_KEY_TEST) {
    throw new Error(
      'STRIPE_SECRET_KEY_TEST is not defined. Please add it to your .env.local file.'
    );
  }
  STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY_TEST;
}

if (process.env.NODE_ENV === 'production') {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(
      'STRIPE_SECRET_KEY is not defined. Please add it to your .env.local file.'
    );
  }
  STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
}

if (process.env.NODE_ENV !== 'production') {
  if (!process.env.STRIPE_WEBHOOK_SECRET_KEY_TEST) {
    throw new Error(
      'STRIPE_WEBHOOK_SECRET_KEY_TEST is not defined. Please add it to your .env.local file.'
    );
  }
  STRIPE_WEBHOOK_SECRET_KEY = process.env.STRIPE_WEBHOOK_SECRET_KEY_TEST;
}

if (process.env.NODE_ENV === 'production') {
  if (!process.env.STRIPE_WEBHOOK_SECRET_KEY) {
    throw new Error(
      'STRIPE_WEBHOOK_SECRET_KEY is not defined. Please add it to your .env.local file.'
    );
  }
  STRIPE_WEBHOOK_SECRET_KEY = process.env.STRIPE_WEBHOOK_SECRET_KEY;
}

class StripeService {
  private client: Stripe;

  constructor(secretKey: string) {
    this.client = new Stripe(secretKey, {
      apiVersion: '2022-11-15'
    });
  }

  public async createCustomer(customer: Stripe.CustomerCreateParams) {
    return await this.client.customers.create(customer);
  }

  public async findCustomer(customerId: string) {
    return await this.client.customers.retrieve(customerId);
  }

  public async createPaymentIntent(
    paymentIntent: Stripe.PaymentIntentCreateParams
  ) {
    return await this.client.paymentIntents.create(paymentIntent);
  }

  public async createPrice(price: Stripe.PriceCreateParams) {
    return await this.client.prices.create(price);
  }

  public async createProduct(product: Stripe.ProductCreateParams) {
    return await this.client.products.create(product);
  }

  public async createSubscription(
    subscription: Stripe.SubscriptionCreateParams
  ) {
    return await this.client.subscriptions.create(subscription);
  }

  public async getSubscription(subscriptionId: string) {
    return await this.client.subscriptions.retrieve(subscriptionId);
  }

  public constructWebhook(payload: string, signature: string) {
    return this.client.webhooks.constructEvent(
      payload,
      signature,
      STRIPE_WEBHOOK_SECRET_KEY
    );
  }

  public async retrieveUpcomingInvoices(
    customerId: string,
    subscription: Stripe.Subscription,
    priceId: string
  ) {
    return await this.client.invoices.retrieveUpcoming({
      customer: customerId,
      subscription: subscription.id,
      subscription_items: [
        {
          id: subscription.items.data[0].id,
          price: priceId
        }
      ]
    });
  }
}

const stripeService = new StripeService(STRIPE_SECRET_KEY);

export default stripeService;
