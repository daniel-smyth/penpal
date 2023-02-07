"use client";

import React, { FormEvent, useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetcher } from "@lib/fetcher";

interface CheckoutFormProps {
  redirectUrl: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ redirectUrl }) => {
  const stripe = useStripe();
  const elements = useElements();

  const { data: userSession } = useSession();
  const pathName = usePathname();

  const [email, setEmail] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setPaymentMessage("Payment succeeded!");
          break;
        case "processing":
          setPaymentMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setPaymentMessage(
            "Your payment was not successful, please try again.",
          );
          break;
        default:
          setPaymentMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: redirectUrl,
        receipt_email: email,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setPaymentMessage(error.message || "An unexpected error occurred.");
    } else {
      setPaymentMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const handleClick = async () => {
    const { message } = await fetcher({
      url: "/api/stripe/subscription",
      method: "DELETE",
    });
    setDeleteMessage(message);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        Address:
        <input type="text" />
        <br />
        {/* aligned to right */}
        Plan Details: {pathName?.split("/").pop()}
        <br />
        <LinkAuthenticationElement onChange={(e) => setEmail(e.value.email)} />
        <PaymentElement options={paymentElementOptions as any} />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span>{isLoading ? <div>Loading</div> : "Pay now"}</span>
        </button>
        {/* Show any error or success messages */}
        {paymentMessage && <div>{paymentMessage}</div>}
      </form>
      <button onClick={handleClick}>Cancel</button>
      {deleteMessage}
    </>
  );
};

export default CheckoutForm;
