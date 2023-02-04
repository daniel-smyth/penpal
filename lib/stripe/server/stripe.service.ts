import Stripe from 'stripe';

let API_VERSION: Stripe.StripeConfig['apiVersion'] = '2022-11-15';
let STRIPE_SECRET_KEY: string | undefined;
let STRIPE_WEBHOOK_SECRET_KEY: string | undefined;

if (process.env.NODE_ENV !== 'production') {
  STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY_TEST;
  STRIPE_WEBHOOK_SECRET_KEY = process.env.STRIPE_WEBHOOK_SECRET_KEY_TEST;
} else {
  STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  STRIPE_WEBHOOK_SECRET_KEY = process.env.STRIPE_WEBHOOK_SECRET_KEY;
}

// if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET_KEY) {
//   throw new Error('Stripe keys undefined. Please add to .env file.');
// }
if (!STRIPE_SECRET_KEY) {
  throw new Error('Stripe keys undefined. Please add to .env file.');
}

class StripeService {
  private client: Stripe;

  constructor(secretKey: string) {
    this.client = new Stripe(secretKey, { apiVersion: API_VERSION });
  }

  public async createCustomer(customer: Stripe.CustomerCreateParams) {
    return await this.client.customers.create(customer);
  }

  public async findCustomer(id: string) {
    return await this.client.customers.retrieve(id);
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

  public async deleteSubscription(id: string) {
    return await this.client.subscriptions.del(id);
  }

  public async getSubscription(id: string) {
    return await this.client.subscriptions.retrieve(id);
  }

  public constructWebhook(payload: string, signature: string) {
    return this.client.webhooks.constructEvent(
      payload,
      signature,
      STRIPE_WEBHOOK_SECRET_KEY!
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