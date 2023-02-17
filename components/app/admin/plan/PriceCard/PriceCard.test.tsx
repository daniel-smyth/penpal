import React from "react";
import { render } from "@testing-library/react";
import PriceCard from "./PriceCard";

describe("Billing Plan Card", () => {
  it("renders billing plan card", () => {
    render(
      <PriceCard
        name={""}
        description={""}
        price={""}
        features={[]}
        stripePriceId={""}
      />,
    );
  });
});
