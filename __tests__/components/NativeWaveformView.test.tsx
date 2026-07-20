import React from "react";

describe("NativeWaveformView", () => {
  afterEach(() => {
    jest.resetModules();
    jest.dontMock("react-native");
  });

  it("requires the native waveform view on Android", () => {
    const requireNativeComponent = jest.fn(() => "ColumboNativeWaveformView");

    jest.doMock("react-native", () => ({
      Platform: {
        OS: "android",
      },
      View: "View",
      requireNativeComponent,
    }));

    const { NativeWaveformView } = require("../../src/components/NativeWaveformView");

    const element = (
      <NativeWaveformView channel="input" active style={{ width: 120, height: 40 }} />
    );

    expect(element.type).toBe(NativeWaveformView);
    expect(requireNativeComponent).toHaveBeenCalledWith("ColumboNativeWaveformView");
  });
});
