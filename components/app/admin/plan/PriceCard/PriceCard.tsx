import React from "react";
import Link from "next/link";
import { Button } from "@components/ui/server";

interface PriceCardProps {
  name: string;
  description: string;
  price: string;
  features: (string | React.ReactNode)[];
  stripePriceId: string; // from stripe
}

const PriceCard: React.FC<PriceCardProps> = ({
  name,
  description,
  price,
  features,
  stripePriceId,
}) => {
  return (
    <div className="mx-auto flex max-w-lg flex-col rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-900 shadow dark:border-gray-600 dark:bg-gray-800 dark:text-white xl:p-8">
      <h3 className="mb-4 text-2xl font-semibold">{name}</h3>
      <p className="font-light text-gray-500 dark:text-gray-400 sm:text-lg">
        {description}
      </p>
      <div className="my-8 flex items-baseline justify-center">
        <span className="mr-2 text-5xl font-extrabold">${price}</span>
        <span className="text-gray-500 dark:text-gray-400">/month</span>
      </div>
      <ul role="list" className="mb-8 space-y-4 text-left">
        {features.map((feature) => (
          <li className="flex items-center space-x-3" key={Math.random()}>
            <svg
              className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button size="large">
        <Link href={`/admin/subscription/${stripePriceId}`}>Get started</Link>
      </Button>
    </div>
  );
};

export default PriceCard;
