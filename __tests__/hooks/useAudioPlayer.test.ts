import { act, renderHook } from "@testing-library/react-native";
import * as Speech from "expo-speech";
import {
  clearSpeechDiagnostics,
  getSpeechDiagnostics,
} from "../../src/services/speech/diagnostics";

jest.mock("expo-clipboard", () => ({
  setStringAsync: jest.fn(async () => undefined),
}));

jest.mock("expo-file-system/legacy", () => ({
  cacheDirectory: "file:///tmp/",
  documentDirectory: "file:///tmp/",
  deleteAsync: jest.fn(async () => undefined),
  getInfoAsync: jest.fn(async () => ({ exists: false, isDirectory: false })),
  makeDirectoryAsync: jest.fn(async () => undefined),
  moveAsync: jest.fn(async () => undefined),
  readAsStringAsync: jest.fn(async () => ""),
  writeAsStringAsync: jest.fn(async () => undefined),
}));

const mockPlayer = {
  id: "player-1",
  currentTime: 0,
  isAudioSamplingSupported: false,
  pause: jest.fn(),
  remove: jest.fn(),
  replace: jest.fn(),
  play: jest.fn(),
  clearLockScreenControls: jest.fn(),
  setActiveForLockScreen: jest.fn(),
};

let mockStatus: any;

jest.mock("expo-speech", () => ({
  pause: jest.fn(() => Promise.resolve()),
  resume: jest.fn(() => Promise.resolve()),
  speak: jest.fn(),
  stop: jest.fn(() => Promise.resolve()),
}));

jest.mock("expo-speech-recognition", () => ({
  ExpoSpeechRecognitionModule: {
    setCategoryIOS: jest.fn(),
  },
}));

jest.mock("expo-audio", () => ({
  setAudioModeAsync: jest.fn(() => Promise.resolve()),
  setIsAudioActiveAsync: jest.fn(() => Promise.resolve()),
  useAudioPlayer: jest.fn(() => mockPlayer),
  useAudioSampleListener: jest.fn(),
  useAudioPlayerStatus: jest.fn(() => mockStatus),
}));

import { useAudioPlayer } from "../../src/hooks/useAudioPlayer";

describe("useAudioPlayer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    clearSpeechDiagnostics();
    mockStatus = {
      id: "player-1",
      currentTime: 0,
      playbackState: "idle",
      timeControlStatus: "paused",
      reasonForWaitingToPlay: "",
      mute: false,
      duration: 0,
      playing: false,
      loop: false,
      didJustFinish: false,
      isBuffering: false,
      isLoaded: true,
      playbackRate: 1,
      shouldCorrectPitch: true,
    };
  });

  it("advances queued clips when playback becomes idle", async () => {
    const { result, rerender } = renderHook(() => useAudioPlayer());

    await act(async () => {
      result.current.enqueueAudio("first.mp3");
      await Promise.resolve();
    });

    expect(mockPlayer.replace).toHaveBeenNthCalledWith(1, "first.mp3");
    expect(mockPlayer.play).toHaveBeenCalledTimes(1);
    expect(mockPlayer.setActiveForLockScreen).toHaveBeenCalledWith(
      true,
      {
        artist: "Schnack",
        title: "Spoken reply",
      },
      {
        showSeekBackward: false,
        showSeekForward: false,
      },
    );

    await act(async () => {
      mockStatus = {
        ...mockStatus,
        playing: true,
        playbackState: "playing",
        timeControlStatus: "playing",
      };
      rerender(undefined);
      await Promise.resolve();
    });

    await act(async () => {
      result.current.enqueueAudio("second.mp3");
      await Promise.resolve();
    });

    expect(mockPlayer.replace).toHaveBeenCalledTimes(1);

    await act(async () => {
      mockStatus = {
        ...mockStatus,
        playing: false,
        playbackState: "idle",
        timeControlStatus: "paused",
      };
      rerender(undefined);
      await Promise.resolve();
    });

    expect(mockPlayer.replace).toHaveBeenNthCalledWith(2, "second.mp3");
    expect(mockPlayer.play).toHaveBeenCalledTimes(2);
  });

  it("keeps request diagnostics attached to playback events", async () => {
    const { result, rerender } = renderHook(() => useAudioPlayer());

    await act(async () => {
      result.current.enqueueAudio("preview.wav", {
        requestId: "preview-1",
        source: "preview",
      });
      await Promise.resolve();
    });

    await act(async () => {
      mockStatus = {
        ...mockStatus,
        playing: true,
        playbackState: "playing",
        timeControlStatus: "playing",
      };
      rerender(undefined);
      await Promise.resolve();
    });

    await act(async () => {
      mockStatus = {
        ...mockStatus,
        playing: false,
        playbackState: "idle",
        timeControlStatus: "paused",
      };
      rerender(undefined);
      await Promise.resolve();
    });

    const diagnostics = getSpeechDiagnostics().filter(
      (event) => event.requestId === "preview-1",
    );

    expect(diagnostics.map((event) => event.stage)).toEqual([
      "playback-finished",
      "playback-started",
      "playback-enqueued",
    ]);
    expect(diagnostics.every((event) => event.source === "preview")).toBe(true);
  });

  it("reports when queued clip playback actually starts", async () => {
    const onPlaybackStarted = jest.fn();
    const { result, rerender } = renderHook(() => useAudioPlayer());

    await act(async () => {
      result.current.enqueueAudio(
        "reply.wav",
        undefined,
        onPlaybackStarted,
      );
      await Promise.resolve();
    });

    expect(onPlaybackStarted).not.toHaveBeenCalled();

    await act(async () => {
      mockStatus = {
        ...mockStatus,
        playing: true,
        playbackState: "playing",
        timeControlStatus: "playing",
      };
      rerender(undefined);
      await Promise.resolve();
    });

    expect(onPlaybackStarted).toHaveBeenCalledTimes(1);
  });

  it("reports when system speech actually starts", async () => {
    const onPlaybackStarted = jest.fn();
    const { result } = renderHook(() => useAudioPlayer());

    await act(async () => {
      result.current.speakText("Hello there", { onPlaybackStarted });
      await Promise.resolve();
    });

    expect(onPlaybackStarted).not.toHaveBeenCalled();

    const speechOptions = (Speech.speak as jest.Mock).mock.calls[0][1];
    act(() => {
      speechOptions.onStart();
    });

    expect(onPlaybackStarted).toHaveBeenCalledTimes(1);
  });

  it("pauses and resumes the current clip without draining playback", async () => {
    const { result, rerender } = renderHook(() => useAudioPlayer());

    await act(async () => {
      result.current.enqueueAudio("reply.mp3");
      await Promise.resolve();
    });

    await act(async () => {
      mockStatus = {
        ...mockStatus,
        playing: true,
        playbackState: "playing",
        timeControlStatus: "playing",
      };
      rerender(undefined);
      await Promise.resolve();
    });

    await act(async () => {
      await expect(result.current.pausePlayback()).resolves.toBe(true);
    });

    expect(mockPlayer.pause).toHaveBeenCalledTimes(1);
    expect(result.current.isPlaybackPaused).toBe(true);
    expect(result.current.isPlaying).toBe(true);

    await act(async () => {
      mockStatus = {
        ...mockStatus,
        playing: false,
        playbackState: "paused",
        timeControlStatus: "paused",
      };
      rerender(undefined);
      await Promise.resolve();
    });

    await act(async () => {
      await expect(result.current.resumePlayback()).resolves.toBe(true);
    });

    expect(mockPlayer.play).toHaveBeenCalledTimes(2);
    expect(result.current.isPlaybackPaused).toBe(false);
  });
});
