import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

import stripeService from "@lib/stripe/stripe";
import { billing, BillingEvent } from "@lib/billing";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false,
  },
};

function isSubscriptionUpdate(event: Stripe.Event): event is BillingEvent {
  return event.type.startsWith("customer.subscription.updated");
}

function isSubscriptionDeleted(event: Stripe.Event): event is BillingEvent {
  return event.type.startsWith("customer.subscription.deleted");
}

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return new NextResponse("Stripe signature is required.", {
        status: 400,
      });
    }

    const chunks = [];
    const readable = request.body as unknown as Readable;

    for await (const chunk of readable) {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }

    const buffer = Buffer.concat(chunks);

    const event = stripeService.constructEvent(buffer, signature);

    if (isSubscriptionUpdate(event)) {
      await billing.handleUpdate(event);
    }

    if (isSubscriptionDeleted(event)) {
      await billing.handleCancel(event);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error(error);

    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
