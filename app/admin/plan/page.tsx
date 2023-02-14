import React from "react";
import { getUser } from "@lib/auth";
import { BillingPlanCard } from "@components/app/admin/plan";

// Price ID values can be found on the Stripe dashboard
// https://stripe.com/docs/billing/subscriptions/price-and-product-ids
const PRICE_ID_SUBSCRIPTION_MONTHLY = process.env.PRICE_ID_SUBSCRIPTION_MONTHLY;
const PRICE_ID_SUBSCRIPTION_YEARLY = process.env.PRICE_ID_SUBSCRIPTION_YEARLY;

if (!PRICE_ID_SUBSCRIPTION_MONTHLY || !PRICE_ID_SUBSCRIPTION_YEARLY) {
  throw new Error(
    "Stripe keys are not defined. Please add them to your .env file.",
  );
}

async function PlanPage() {
  const user = await getUser();

  return (
    <>
      {/* Remove class [ h-64 ] when adding a card block */}
      <div className="container mx-auto h-64 w-11/12 py-10 px-6 md:w-4/5">
        {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
        <div className="h-full w-full rounded border-2 border-dashed border-gray-300">
          {user && <p>Current Plan: {user.subscriptionStatus}</p>}
          <BillingPlanCard
            name="Unlimited"
            description="Everything you need to create and publish articles"
            price={"4.99"}
            features={[
              { icon: "newspaper", text: "Unlimited articles" },
              { icon: "image", text: "Unlimited images" },
              { icon: "arrow", text: "Unlimited re-shares" },
            ]}
            stripePriceId={PRICE_ID_SUBSCRIPTION_MONTHLY!}
          />
          <BillingPlanCard
            name="Unlimited"
            description="Everything you need to create and publish articles"
            price={"299.99"}
            features={[
              { icon: "newspaper", text: "Unlimited articles" },
              { icon: "image", text: "Unlimited images" },
              { icon: "arrow", text: "Unlimited re-shares" },
            ]}
            stripePriceId={PRICE_ID_SUBSCRIPTION_YEARLY!}
          />
        </div>
      </div>
    </>
  );
}

export default PlanPage;
