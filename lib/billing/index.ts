import Stripe from "stripe";
import { prisma } from "@lib/prisma";

import { emailService } from "@lib/email";

type Webhook = Stripe.Event & Record<string, unknown>;

export interface BillingEvent extends Webhook {
  data: {
    object: Stripe.Subscription;
  };
}

export class Billing {
  constructor(private db = prisma) {}

  async handleUpdate(event: BillingEvent) {
    const status = event.data.object.status;

    const subscriptionId = event.data.object.id;
    const subscription = await this.db.billing.update({
      where: {
        stripe_subscription_id: subscriptionId,
      },
      data: {
        status,
      },
      include: {
        user: true,
      },
    });

    switch (status) {
      case "incomplete_expired":
      case "incomplete":
      case "past_due":
      case "trialing":
      case "unpaid":
        break;
      case "active":
        return emailService.sendEmail({
          to: subscription.user.email,
          subject: "Subscription active",
          html: "",
        });
      case "canceled":
        return emailService.sendEmail({
          to: subscription.user.email,
          subject: "Subscription cancelled",
          html: "",
        });
    }
  }

  public async handleCancel(event: BillingEvent) {
    const subscriptionId = event.data.object.id;
    const subscription = await this.db.billing.update({
      where: {
        stripe_subscription_id: subscriptionId,
      },
      data: {
        stripe_customer_id: undefined,
        status: undefined,
        stripe_subscription_id: undefined,
      },
      include: {
        user: true,
      },
    });

    await emailService.sendEmail({
      to: subscription.user.email,
      subject: "Subscription cancelled",
      html: "",
    });
  }
}

export const billing = new Billing();
