import React from "react";

import { WaveformBar } from "../../src/components/WaveformBar";
import { renderWithProviders } from "../test-utils/renderWithProviders";

jest.mock("@expo/vector-icons", () => ({
  Feather: () => null,
}));

jest.mock("../../src/components/NativeWaveformView", () => {
  const React = require("react");
  const { View } = require("react-native");

  return {
    NativeWaveformView: (props: object) => (
      <View testID="native-waveform" {...props} />
    ),
  };
});

jest.mock("../../src/components/LiveWaveform", () => ({
  LiveWaveform: () => null,
}));

jest.mock("../../src/services/nativeWaveform", () => ({
  supportsNativeOutputWaveformPlayback: () => true,
}));

jest.mock("../../src/state/waveformFeed", () => ({
  useWaveformVariant: () => "oscilloscope",
}));

describe("WaveformBar", () => {
  it("uses an envelope for readable spoken-output motion", () => {
    const screen = renderWithProviders(
      <WaveformBar
        isActive
        phase="speaking"
        statusLabel="Speaking"
        inputMode="toggle-to-talk"
      />,
    );

    expect(screen.getByTestId("native-waveform").props).toEqual(
      expect.objectContaining({
        active: true,
        channel: "output",
        renderStyle: "envelope",
      }),
    );
  });
});
