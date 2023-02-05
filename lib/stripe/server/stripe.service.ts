import Stripe from 'stripe';

export const API_VERSION: Stripe.StripeConfig['apiVersion'] = '2022-11-15';
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET_KEY = process.env.STRIPE_WEBHOOK_SECRET_KEY;
// const STRIPE_WEBHOOK_SECRET_KEY =
//   process.env.STRIPE_WEBHOOK_SECRET_KEY_LOCAL_CLI;

if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET_KEY) {
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
    return (await this.client.customers.retrieve(id)) as Stripe.Customer;
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

  public async getSubscription(id: string, expand?: string[]) {
    return await this.client.subscriptions.retrieve(id, { expand });
  }

  public constructEvent(payload: Buffer, signature: string) {
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
