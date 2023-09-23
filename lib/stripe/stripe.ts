import Stripe from "stripe";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET_KEY = process.env.STRIPE_WEBHOOK_SECRET_KEY;
// const STRIPE_WEBHOOK_SECRET_KEY = process.env.STRIPE_WEBHOOK_SECRET_KEY_LOCAL_CLI;

if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET_KEY) {
  throw new Error("Stripe keys undefined. Please add to .env file.");
}

class StripeService {
  private client: Stripe;

  constructor(secretKey: string) {
    this.client = new Stripe(secretKey, {
      apiVersion: "2023-08-16",
    });
  }

  public createCustomer(customer: Stripe.CustomerCreateParams) {
    return this.client.customers.create(customer);
  }

  public findCustomer(id: string) {
    return this.client.customers.retrieve(id);
  }

  public createPaymentIntent(paymentIntent: Stripe.PaymentIntentCreateParams) {
    return this.client.paymentIntents.create(paymentIntent);
  }

  public createPrice(price: Stripe.PriceCreateParams) {
    return this.client.prices.create(price);
  }

  public createProduct(product: Stripe.ProductCreateParams) {
    return this.client.products.create(product);
  }

  public createSubscription(subscription: Stripe.SubscriptionCreateParams) {
    return this.client.subscriptions.create(subscription);
  }

  public getSubscription(id: string, params?: Stripe.SubscriptionRetrieveParams) {
    return this.client.subscriptions.retrieve(id, params);
  }

  public deleteSubscription(id: string) {
    return this.client.subscriptions.cancel(id);
  }

  public getInvoices(customer: string) {
    return this.client.invoices.list({ customer: customer });
  }

  public constructEvent(payload: Buffer, signature: string) {
    return this.client.webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET_KEY!);
  }
}

const stripeService = new StripeService(STRIPE_SECRET_KEY);

export default stripeService;
