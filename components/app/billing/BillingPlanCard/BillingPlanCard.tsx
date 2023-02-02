import Link from 'next/link';
import React from 'react';

interface BillingPlanCardProps {
  name: string;
  description: string;
  price: string;
  features: { icon: string; text: string }[];
}

const BillingPlanCard: React.FC<BillingPlanCardProps> = ({
  name,
  description,
  price,
  features
}) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>{price}</p>
      <ul>
        {features.map(({ icon, text }) => (
          <li key={text}>
            <span>{icon}</span>
            <span>{text}</span>
          </li>
        ))}
      </ul>
      <Link href="/admin/subscription"></Link>
    </div>
  );
};

export default BillingPlanCard;
