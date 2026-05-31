import { act, renderHook } from "@testing-library/react-native";

const mockSetAudioModeAsync = jest.fn(() => Promise.resolve());
const mockSetIsAudioActiveAsync = jest.fn(() => Promise.resolve());
const mockSetCategoryIOS = jest.fn();

jest.mock("react-native", () => ({
  Platform: {
    OS: "ios",
  },
}));

jest.mock("expo-audio", () => ({
  setAudioModeAsync: (...args: unknown[]) => mockSetAudioModeAsync(...args),
  setIsAudioActiveAsync: (...args: unknown[]) =>
    mockSetIsAudioActiveAsync(...args),
}));

jest.mock("expo-speech-recognition", () => ({
  ExpoSpeechRecognitionModule: {
    setCategoryIOS: (...args: unknown[]) => mockSetCategoryIOS(...args),
  },
}));

jest.mock("../../src/services/debugLogCapture", () => ({
  recordDebugLogEvent: jest.fn(),
}));

import { usePlaybackSession } from "../../src/hooks/audioPlayer/usePlaybackSession";

describe("usePlaybackSession", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("resets the iOS playback mode before marking the session ready", async () => {
    const { result } = renderHook(() => usePlaybackSession());

    await act(async () => {
      await result.current.ensurePlaybackSession();
    });

    expect(mockSetIsAudioActiveAsync).toHaveBeenCalledWith(true);
    expect(mockSetAudioModeAsync).toHaveBeenCalledWith({
      allowsRecording: false,
      interruptionMode: "doNotMix",
      playsInSilentMode: true,
      shouldPlayInBackground: true,
    });
    expect(mockSetCategoryIOS).toHaveBeenCalledWith({
      category: "playback",
      categoryOptions: [],
      mode: "default",
    });
  });

  it("deactivates the session when reset", async () => {
    const { result } = renderHook(() => usePlaybackSession());

    await act(async () => {
      result.current.resetPlaybackSession();
      await Promise.resolve();
    });

    expect(mockSetIsAudioActiveAsync).toHaveBeenCalledWith(false);
  });
});
