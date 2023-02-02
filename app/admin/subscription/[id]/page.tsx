import React from 'react';
import { CheckoutForm } from '@components/app/admin/subscription';

export default async function SubscriptionPage() {
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
      <CheckoutForm />
    </main>
  );
}
