import Stripe from "stripe";
import { prisma } from "@lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import stripeService from "@lib/stripe/stripe";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized.", {
        status: 404,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        billing: true,
      },
    });

    const billing = user?.billing;

    // User already has subscription. Get the `latest_invoice` to confirm payment.
    if (billing) {
      const subscription = await stripeService.getSubscription(billing.stripe_subscription_id, {
        expand: ["latest_invoice.payment_intent"], // `expand` latest_invoice's payment_intent
      });
      const latestInvoice = subscription.latest_invoice as Stripe.Invoice;
      const paymentIntent = latestInvoice.payment_intent as Stripe.PaymentIntent;

      return NextResponse.json({
        stripe_subscription_id: billing.stripe_subscription_id,
        client_secret: paymentIntent.client_secret,
      });
    }

    const customer = await stripeService.createCustomer({
      email: user?.email,
    });

    await prisma.billing.update({
      where: {
        id: user?.billing?.id,
      },
      data: {
        stripe_customer_id: customer.id,
      },
    });

    const body = await request.json();

    const subscription = await stripeService.createSubscription({
      customer: customer.id,
      items: [{ price: body.price_id }],
      payment_behavior: "default_incomplete",
      payment_settings: {
        save_default_payment_method: "on_subscription",
      },
      expand: ["latest_invoice.payment_intent"],
    });
    const latestInvoice = subscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = latestInvoice.payment_intent as Stripe.PaymentIntent;

    await prisma.billing.update({
      where: {
        id: user?.billing?.id,
      },
      data: {
        stripe_subscription_id: subscription.id,
      },
    });

    return NextResponse.json({
      stripe_subscription_id: subscription.id,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized.", {
        status: 404,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        billing: true,
      },
    });

    if (!user?.billing) {
      return new NextResponse("User does not have any billing.", {
        status: 404,
      });
    }

    await stripeService.deleteSubscription(user.billing.stripe_subscription_id);

    await prisma.billing.delete({
      where: {
        id: user?.billing?.id,
      },
    });

    return NextResponse.json({
      message: "Subscription canceled.",
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}
