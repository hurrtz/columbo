describe("nativeWaveform", () => {
  afterEach(() => {
    jest.resetModules();
    jest.dontMock("react-native");
  });

  it("supports output waveform playback on Android when native methods exist", () => {
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
          startOutputPlayback: jest.fn(),
          stopOutputPlayback: jest.fn(),
        },
      },
      Platform: {
        OS: "android",
      },
    }));

    const {
      supportsNativeOutputWaveformPlayback,
    } = require("../../src/services/nativeWaveform");

    expect(supportsNativeOutputWaveformPlayback()).toBe(true);
  });
});
