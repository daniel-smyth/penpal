"use client";

import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { getStripeClientSession } from "@lib/stripe/client";

const stripePromise = getStripeClientSession();

function StripeProvider({ children }: { children: React.ReactNode }) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );

    if (clientSecret) {
      setClientSecret(clientSecret);
    }
  }, []);

  // passing the client secret obtained from the server
  const options = {
    clientSecret,
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
