import React from 'react';
import { getUser } from '@lib/auth';
import { BillingPlanCard } from '@components/app/admin/settings/plan';

// Price ID values can be found on the Stripe dashboard
// https://stripe.com/docs/billing/subscriptions/price-and-product-ids
const PRICE_ID_SUBSCRIPTION_MONTHLY = process.env.PRICE_ID_SUBSCRIPTION_MONTHLY;
const PRICE_ID_SUBSCRIPTION_YEARLY = process.env.PRICE_ID_SUBSCRIPTION_YEARLY;

if (!PRICE_ID_SUBSCRIPTION_MONTHLY || !PRICE_ID_SUBSCRIPTION_YEARLY) {
  throw new Error(
    'Stripe keys are not defined. Please add them to your .env file.'
  );
}

export default async function PlanPage() {
  const user = await getUser();

  if (!user) {
    return <main>Not logged in</main>; // Handle this redirect in the layout
  }

  return (
    <main>
      {/* <p>Current Plan: {user.plan}</p> */}
      <BillingPlanCard
        stripePriceId=""
        name="Free"
        description="Try out Penpal for free"
        price="Free"
        features={[
          { icon: 'newspaper', text: '1 article per week' },
          { icon: 'image', text: '1 image per week' }
        ]}
      />
      <BillingPlanCard
        name="Unlimited"
        description="Everything you need to create and publish articles"
        price={'4.99'}
        features={[
          { icon: 'newspaper', text: 'Unlimited articles' },
          { icon: 'image', text: 'Unlimited images' },
          { icon: 'arrow', text: 'Unlimited re-shares' }
        ]}
        stripePriceId={PRICE_ID_SUBSCRIPTION_MONTHLY!}
      />
      <BillingPlanCard
        name="Unlimited"
        description="Everything you need to create and publish articles"
        price={'299.99'}
        features={[
          { icon: 'newspaper', text: 'Unlimited articles' },
          { icon: 'image', text: 'Unlimited images' },
          { icon: 'arrow', text: 'Unlimited re-shares' }
        ]}
        stripePriceId={PRICE_ID_SUBSCRIPTION_YEARLY!}
      />
    </main>
  );
}
