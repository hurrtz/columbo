import { act, renderHook } from "@testing-library/react-native";

import {
  MAX_RECORDING_MS,
  useVoiceCaptureLifecycle,
} from "../../../src/screens/main/voiceSession/useVoiceCaptureLifecycle";

jest.mock("../../../src/services/debugLogCapture", () => ({
  recordDebugLogEvent: jest.fn(),
}));

function buildParams(overrides: Record<string, unknown> = {}) {
  const player = {
    isPlaybackPaused: false,
    isPlaying: false,
    pausePlayback: jest.fn(async () => true),
    resumePlayback: jest.fn(async () => true),
    stopPlayback: jest.fn(async () => undefined),
    waitForPlaybackRouteSettle: jest.fn(async () => undefined),
  };
  const recorder = {
    clearLastError: jest.fn(),
    lastError: null,
    startRecording: jest.fn(async () => undefined),
    stopRecording: jest.fn(async () => "file:///tmp/recording.wav"),
  };
  const nativeStt = {
    abortRecognition: jest.fn(async () => undefined),
    clearLastError: jest.fn(),
    isAvailable: true,
    lastError: null,
    startRecognition: jest.fn(async () => undefined),
    stopRecognition: jest.fn(async () => "hello"),
  };
  const processCapturedVoiceTurn = jest.fn(async () => undefined);
  const showToast = jest.fn();
  const t = jest.fn((key: string) => key);

  return {
    nativeStt,
    player,
    processCapturedVoiceTurn,
    recorder,
    showToast,
    sttMode: "provider" as const,
    t,
    ...overrides,
  };
}

describe("useVoiceCaptureLifecycle auto-stop", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("auto-stops at the max duration and still transcribes the captured audio", async () => {
    const params = buildParams();
    const { result } = renderHook(() => useVoiceCaptureLifecycle(params));

    await act(async () => {
      await result.current.startVoiceCapture();
    });

    expect(params.recorder.startRecording).toHaveBeenCalledTimes(1);
    expect(params.processCapturedVoiceTurn).not.toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(MAX_RECORDING_MS);
      // Let the auto-stop async chain settle.
      await Promise.resolve();
      await Promise.resolve();
    });

    // The heads-up toast was shown and the audio was NOT discarded.
    expect(params.showToast).toHaveBeenCalledWith("maxRecordingLengthReached");
    expect(params.recorder.stopRecording).toHaveBeenCalledTimes(1);
    expect(params.processCapturedVoiceTurn).toHaveBeenCalledWith({
      audioUri: "file:///tmp/recording.wav",
    });
  });

  it("clears the timer on a manual stop so it never auto-fires", async () => {
    const params = buildParams();
    const { result } = renderHook(() => useVoiceCaptureLifecycle(params));

    await act(async () => {
      await result.current.startVoiceCapture();
    });

    await act(async () => {
      await result.current.stopVoiceCapture();
    });

    params.showToast.mockClear();

    await act(async () => {
      jest.advanceTimersByTime(MAX_RECORDING_MS * 2);
      await Promise.resolve();
    });

    expect(params.recorder.stopRecording).toHaveBeenCalledTimes(1);
    expect(params.showToast).not.toHaveBeenCalled();
  });
});
