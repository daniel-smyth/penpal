import React from "react";
import { getUser } from "@lib/auth";
import { PriceCard } from "@components/app/admin/plan";

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
  return (
    <section className="dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-0 lg:py-4 lg:px-6">
        <div className="mx-auto mb-8 max-w-screen-md text-center lg:mb-12">
          <h2 className="mb-4 hidden text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:flex">
            Designed for business teams like yours
          </h2>
          <p className="mb-5 font-light text-gray-500 dark:text-gray-400 sm:text-xl">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>
        </div>
        <div className="space-y-8 sm:gap-6 lg:grid lg:grid-cols-3 lg:space-y-0 xl:gap-10">
          <PriceCard
            name="Starter"
            description="Best option for personal use & for your next project."
            price="29"
            features={[
              "Individual configuration",
              "No setup, or hidden fees",
              <>
                Team size: <span className="font-semibold">1 developer</span>
              </>,
              <>
                Premium support: <span className="font-semibold">6 months</span>
              </>,
              <>
                Free updates: <span className="font-semibold">6 months</span>
              </>,
            ]}
            stripePriceId={PRICE_ID_SUBSCRIPTION_MONTHLY!}
          />
        </div>
      </div>
    </section>
  );
}

export default PlanPage;
