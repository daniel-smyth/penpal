"use client";

import React from "react";
import StripeProvider from "./provider";

function SubscriptionLayout({ children }: { children: React.ReactNode }) {
  return <StripeProvider>{children}</StripeProvider>;
}

export default SubscriptionLayout;
