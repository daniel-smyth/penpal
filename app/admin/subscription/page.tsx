import React from 'react';
import { getUser } from '@lib/auth';

export default async function SubscriptionPage() {
  const user = await getUser();

  if (!user) {
    return <main>Not logged in</main>;
  }

  return (
    <main>
      BillingCycle:
      <br />
      <select name="" id="">
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      Address:
      <br />
      <input type="text" />
      Payment Method:
      <br />
      <select name="" id="">
        <option value="credit">Credit Card</option>
        <option value="paypal">PayPal</option>
      </select>
      {/* aligned to right */}
      Your plan:
      <br />
      Plan Details:
      <br />
      ...
      <button>Start Plan</button>
    </main>
  );
}
