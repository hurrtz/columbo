describe("nativeWaveform", () => {
  afterEach(() => {
    jest.resetModules();
    jest.dontMock("react-native");
  });

  it("supports Android output playback and forwards the elapsed audio offset", async () => {
    const startOutputPlayback = jest.fn(async () => true);
    jest.doMock("../../src/utils/waveformDebug", () => ({
      logWaveformDebug: jest.fn(),
    }));
    jest.doMock("react-native", () => ({
      NativeEventEmitter: jest.fn().mockImplementation(() => ({
        addListener: jest.fn(() => ({ remove: jest.fn() })),
      })),
      NativeModules: {
        ColumboNativeWaveform: {
          startRecording: jest.fn(),
          stopRecording: jest.fn(),
          cancelRecording: jest.fn(),
          analyzeAudioFile: jest.fn(),
          startOutputPlayback,
          stopOutputPlayback: jest.fn(),
        },
      },
      Platform: {
        OS: "android",
      },
    }));

    const {
      startNativeOutputWaveformPlayback,
      supportsNativeOutputWaveformPlayback,
    } = require("../../src/services/nativeWaveform");

    expect(supportsNativeOutputWaveformPlayback()).toBe(true);
    await startNativeOutputWaveformPlayback({
      itemId: "audio-1",
      samples: [0.1, 0.5, 0.2],
      durationMs: 4_000,
      elapsedMs: 850,
    });
    expect(startOutputPlayback).toHaveBeenCalledWith(
      "audio-1",
      [0.1, 0.5, 0.2],
      4_000,
      850,
    );
  });
});
