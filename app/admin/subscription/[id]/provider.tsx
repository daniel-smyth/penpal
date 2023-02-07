"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { getStripeClientSession } from "@lib/stripe/client";
import { fetcher } from "@lib/fetcher";

const stripePromise = getStripeClientSession();

function StripeProvider({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      const { clientSecret } = await fetcher({
        url: "/api/stripe/subscription",
        method: "POST",
        body: {
          priceId: pathName?.split("/").pop(),
        },
      });
      setClientSecret(clientSecret);
    };
    createPaymentIntent();
  }, [pathName]);

  const appearance = {
    theme: "stripe" as "stripe" | "night" | "flat" | "none",
  };

  // passing the client secret obtained from the server
  const options = {
    clientSecret,
    appearance,
  };

  return clientSecret !== "" ? (
    // `key` is workaround to hide "Unsupported prop change: options.clientSecret is not a mutable property"
    <Elements stripe={stripePromise} options={options} key={clientSecret}>
      {children}
    </Elements>
  ) : (
    <>Loading Stripe...</>
  );
}

export default StripeProvider;
