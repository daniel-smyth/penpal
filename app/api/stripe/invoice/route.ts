import { prisma } from "@lib/prisma";
import stripeService from "@lib/stripe/stripe";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const billingId = searchParams.get("billing_id");

    if (!billingId) {
      return new Response("`billing_id` is required", {
        status: 400,
      });
    }

    const billing = await prisma.billing.findUnique({
      where: {
        id: billingId,
      },
    });

    if (!billing) {
      return new Response("Billing not found.", {
        status: 404,
      });
    }

    const subscription = await stripeService.getSubscription(billing.stripe_subscription_id);
    const invoices = await stripeService.getInvoices(subscription.customer as string);

    const filterInvoices = invoices.data.filter((invoice) => {
      return invoice.subscription === billingId;
    });

    return NextResponse.json({
      invoices: filterInvoices,
    });
  } catch (err: any) {
    return new Response(err.message, {
      status: 500,
    });
  }
}
