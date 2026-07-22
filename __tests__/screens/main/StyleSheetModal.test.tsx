import React from "react";
import { fireEvent } from "@testing-library/react-native";

import { StyleSheetModal } from "../../../src/screens/main/StyleSheetModal";
import { renderWithProviders } from "../../test-utils/renderWithProviders";

jest.mock("@expo/vector-icons", () => ({
  Feather: ({ children }: { children?: React.ReactNode }) => children ?? null,
}));

describe("StyleSheetModal", () => {
  function setup(
    overrides: Partial<React.ComponentProps<typeof StyleSheetModal>> = {},
  ) {
    const onChange = jest.fn();
    const onClose = jest.fn();
    const onAutoRenameConversation = jest.fn();
    const utils = renderWithProviders(
      <StyleSheetModal
        canAutoRenameConversation
        isAutoRenamingConversation={false}
        visible
        responseLength="brief"
        responseTone="casual"
        onAutoRenameConversation={onAutoRenameConversation}
        onChange={onChange}
        onClose={onClose}
        {...overrides}
      />,
    );
    return { ...utils, onAutoRenameConversation, onChange, onClose };
  }

  it("renders title, subtitle, and active option descriptions", () => {
    const { getByText } = setup();
    expect(getByText("Conversation settings")).toBeTruthy();
    expect(
      getByText("Shape replies and manage this conversation."),
    ).toBeTruthy();
    // brief description
    expect(getByText(/Keep the answer tight/)).toBeTruthy();
    // casual description
    expect(getByText(/Speak like a smart friend/)).toBeTruthy();
  });

  it("offers a one-off title generation action", () => {
    const { getByTestId, getByText, onAutoRenameConversation } = setup();

    expect(getByText("Conversation Title")).toBeTruthy();
    expect(getByText("Generate title")).toBeTruthy();
    fireEvent.press(getByTestId("auto-rename-conversation"));

    expect(onAutoRenameConversation).toHaveBeenCalledTimes(1);
  });

  it("disables title generation without conversation content", () => {
    const { getByTestId, onAutoRenameConversation } = setup({
      canAutoRenameConversation: false,
    });
    const button = getByTestId("auto-rename-conversation");

    expect(button.props.accessibilityState).toEqual({ disabled: true });
    fireEvent.press(button);
    expect(onAutoRenameConversation).not.toHaveBeenCalled();
  });

  it("renders all length and tone pills", () => {
    const { getByText } = setup();
    ["Brief", "Normal", "Thorough"].forEach((label) =>
      expect(getByText(label)).toBeTruthy(),
    );
    ["Professional", "Casual", "Nerdy", "Concise", "Socratic", "ELI5"].forEach(
      (label) => expect(getByText(label)).toBeTruthy(),
    );
  });

  it("calls onChange with new responseLength when a length pill is pressed", () => {
    const { getByText, onChange } = setup();
    fireEvent.press(getByText("Thorough"));
    expect(onChange).toHaveBeenCalledWith({ responseLength: "thorough" });
  });

  it("calls onChange with new responseTone when a tone pill is pressed", () => {
    const { getByText, onChange } = setup();
    fireEvent.press(getByText("Nerdy"));
    expect(onChange).toHaveBeenCalledWith({ responseTone: "nerdy" });
  });

  it("calls onClose when Done button is pressed", () => {
    const { getByText, onClose } = setup();
    fireEvent.press(getByText("Done"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when the backdrop is tapped", () => {
    const { getByTestId, onClose } = setup();
    fireEvent.press(getByTestId("styleSheetBackdrop"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
