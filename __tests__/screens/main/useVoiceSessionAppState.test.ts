import { act, renderHook } from "@testing-library/react-native";
import { AppState } from "react-native";

import { useVoiceSessionAppState } from "../../../src/screens/main/voiceSession/useVoiceSessionAppState";

jest.mock("../../../src/services/debugLogCapture", () => ({
  recordDebugLogEvent: jest.fn(),
}));

describe("useVoiceSessionAppState", () => {
  let appStateListener: ((state: string) => void) | null = null;

  beforeEach(() => {
    appStateListener = null;
    jest
      .spyOn(AppState, "addEventListener")
      .mockImplementation((_event, listener) => {
        appStateListener = listener as (state: string) => void;
        return { remove: jest.fn() } as never;
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("stops and submits an active capture when the app backgrounds", async () => {
    const stopVoiceCapture = jest.fn(async () => undefined);
    const onBackgroundSubmitError = jest.fn();
    renderHook(() =>
      useVoiceSessionAppState({
        isRecording: true,
        onBackgroundSubmitError,
        stopVoiceCapture,
      }),
    );

    await act(async () => {
      appStateListener?.("background");
      await Promise.resolve();
    });

    expect(stopVoiceCapture).toHaveBeenCalledTimes(1);
    expect(onBackgroundSubmitError).not.toHaveBeenCalled();
  });

  it("leaves an already submitted turn running when the app backgrounds", async () => {
    const stopVoiceCapture = jest.fn(async () => undefined);
    renderHook(() =>
      useVoiceSessionAppState({
        isRecording: false,
        onBackgroundSubmitError: jest.fn(),
        stopVoiceCapture,
      }),
    );

    await act(async () => {
      appStateListener?.("background");
      await Promise.resolve();
    });

    expect(stopVoiceCapture).not.toHaveBeenCalled();
  });
});
