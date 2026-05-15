import React from "react";
import { fireEvent } from "@testing-library/react-native";

import { MainScreenStyleChip } from "../../../src/screens/main/MainScreenStyleChip";
import { renderWithProviders } from "../../test-utils/renderWithProviders";

jest.mock("@expo/vector-icons", () => ({
  Feather: ({ children }: { children?: React.ReactNode }) => children ?? null,
}));

describe("MainScreenStyleChip", () => {
  it("renders the current tone and length in the label", () => {
    const { getByText } = renderWithProviders(
      <MainScreenStyleChip
        responseLength="brief"
        responseTone="casual"
        onPress={() => {}}
      />,
    );

    expect(getByText(/Casual/)).toBeTruthy();
    expect(getByText(/Brief/)).toBeTruthy();
  });

  it("calls onPress when tapped", () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderWithProviders(
      <MainScreenStyleChip
        responseLength="thorough"
        responseTone="nerdy"
        onPress={onPress}
      />,
    );

    fireEvent.press(getByLabelText(/Open style and length/i));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("exposes an accessibility label with current values", () => {
    const { getByLabelText } = renderWithProviders(
      <MainScreenStyleChip
        responseLength="normal"
        responseTone="professional"
        onPress={() => {}}
      />,
    );

    expect(
      getByLabelText(/Open style and length.*Professional.*Normal/i),
    ).toBeTruthy();
  });
});
