import React, { FC } from 'react';
import { getUser } from '@lib/auth';
import { BillingPlanCard } from '@components/app/admin/settings/plan';

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) {
    return <main>Not logged in</main>;
  }

  return (
    <main>
      <p>Current Plan: {user.plan}</p>

      <BillingPlanCard
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
        price={'9.99'}
        features={[
          { icon: 'newspaper', text: 'Unlimited articles' },
          { icon: 'image', text: 'Unlimited images' },
          { icon: 'arrow', text: 'Unlimited re-shares' }
        ]}
      />
    </main>
  );
}
