import React from 'react';
import { render } from '@testing-library/react';
import BillingPlanCard from './BillingPlanCard';

describe('Billing Plan Card', () => {
  it('renders billing plan card', () => {
    render(
      <BillingPlanCard name={''} description={''} price={''} features={[]} />
    );
  });
});
