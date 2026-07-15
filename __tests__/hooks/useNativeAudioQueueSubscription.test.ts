import { act, renderHook } from "@testing-library/react-native";

import {
  useNativeAudioQueueSubscription,
} from "../../src/hooks/audioPlayer/useNativeAudioQueueSubscription";
import type { NativeAudioQueueEvent } from "../../src/services/nativeAudioQueue";

let nativeAudioQueueListener:
  | ((event: NativeAudioQueueEvent) => void)
  | null = null;

jest.mock("../../src/services/nativeAudioQueue", () => ({
  subscribeToNativeAudioQueue: jest.fn((listener) => {
    nativeAudioQueueListener = listener;
    return jest.fn();
  }),
}));

jest.mock("../../src/services/speech/diagnostics", () => ({
  recordSpeechDiagnostic: jest.fn(),
}));

jest.mock("../../src/utils/waveformDebug", () => ({
  logWaveformDebug: jest.fn(),
}));

describe("useNativeAudioQueueSubscription", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    nativeAudioQueueListener = null;
  });

  it("starts and stops native output waveform around native queue playback events", async () => {
    const startNativeOutputWaveform = jest.fn();
    const stopNativeOutputWaveform = jest.fn();
    const setNativeAudioQueuePlaying = jest.fn();
    const onPlaybackStarted = jest.fn();
    const waveformAnalysis = Promise.resolve({
      samples: [0.1, 0.4, 0.2],
      durationMs: 900,
    });
    const nativeAudioQueueContextsRef = {
      current: new Map([
        [
          "reply-1",
          {
            uri: "file:///tmp/reply-1.m4a",
            onPlaybackStarted,
            waveformAnalysis,
            diagnostics: {
              requestId: "request-1",
              source: "llm",
            },
          },
        ],
      ]),
    };
    const nativeAudioQueuePlayingRef = { current: false };
    const nativeOutputWaveformItemIdRef = { current: null };

    renderHook(() =>
      useNativeAudioQueueSubscription({
        usingNativeAudioQueue: true,
        supportsNativeOutputWaveform: true,
        playNextNative: jest.fn(async () => undefined),
        finalizeDrainedState: jest.fn(),
        updatePendingPlaybackState: jest.fn(),
        startNativeOutputWaveform,
        stopNativeOutputWaveform,
        setNativeAudioQueuePlaying,
        currentAudioRef: { current: null },
        cancelledRef: { current: false },
        playingRef: { current: false },
        hasSeenAudioPlayingRef: { current: false },
        nativeOutputWaveformItemIdRef,
        nativeOutputWaveformStartedAtRef: { current: null },
        nativeAudioQueueContextsRef,
        nativeAudioQueuePendingCountRef: { current: 1 },
        nativeAudioQueuePlayingRef,
        nativeQueueRef: { current: [] },
      }),
    );

    await act(async () => {
      nativeAudioQueueListener?.({
        type: "started",
        itemId: "reply-1",
        uri: "file:///tmp/reply-1.m4a",
        requestId: "request-1",
        source: "llm",
      });
      await waveformAnalysis;
      await Promise.resolve();
    });

    expect(stopNativeOutputWaveform).toHaveBeenCalledTimes(1);
    expect(onPlaybackStarted).toHaveBeenCalledTimes(1);
    expect(startNativeOutputWaveform).toHaveBeenCalledWith("reply-1", {
      samples: [0.1, 0.4, 0.2],
      durationMs: 900,
    });

    act(() => {
      nativeAudioQueueListener?.({
        type: "finished",
        itemId: "reply-1",
        uri: "file:///tmp/reply-1.m4a",
      });
    });

    expect(stopNativeOutputWaveform).toHaveBeenCalledTimes(2);
    expect(nativeOutputWaveformItemIdRef.current).toBe("reply-1");
    expect(nativeAudioQueuePlayingRef.current).toBe(false);
  });
});
