import React from "react";
import { render } from "@testing-library/react-native";

import { ProviderIcon } from "../../src/components/ProviderIcon";

describe("ProviderIcon", () => {
  it("renders a text fallback for catalog-only providers without branded assets", () => {
    const screen = render(
      <ProviderIcon
        provider="amazon-aws"
        label="Amazon AWS"
        color="#112233"
      />,
    );

    expect(screen.getByText("AA")).toBeTruthy();
  });
});
