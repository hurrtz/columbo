import React from "react";
import { render } from "@testing-library/react-native";

import { MainScreenTopBar } from "../../../src/screens/main/MainScreenTopBar";
import { lightColors } from "../../../src/theme/colors";

jest.mock("@expo/vector-icons", () => ({
  Feather: () => null,
}));

describe("MainScreenTopBar", () => {
  it.each([false, true])("shows the Columbo brand when compact is %s", (compact) => {
    const screen = render(
      <MainScreenTopBar
        colors={lightColors}
        compact={compact}
        onOpenDrawer={jest.fn()}
        onOpenSettings={jest.fn()}
      />,
    );

    expect(screen.getByText("Columbo")).toBeTruthy();
    expect(screen.queryByText("Schnack")).toBeNull();
  });
});
