describe("nativeWaveform", () => {
  afterEach(() => {
    jest.resetModules();
    jest.dontMock("react-native");
  });

  it("forwards native speech recording lifecycle calls", async () => {
    const startRecording = jest.fn(async () => ({ uri: "file:///recording.wav" }));
    const stopRecording = jest.fn(async () => ({ uri: "file:///recording.wav" }));
    const cancelRecording = jest.fn(async () => true);
    jest.doMock("react-native", () => ({
      NativeEventEmitter: jest.fn().mockImplementation(() => ({
        addListener: jest.fn(() => ({ remove: jest.fn() })),
      })),
      NativeModules: {
        MrBroccoliNativeWaveform: {
          startRecording,
          stopRecording,
          cancelRecording,
        },
      },
    }));

    const {
      cancelNativeWaveformRecording,
      isNativeWaveformAvailable,
      startNativeWaveformRecording,
      stopNativeWaveformRecording,
    } = require("../../src/services/nativeWaveform");

    expect(isNativeWaveformAvailable()).toBe(true);
    await startNativeWaveformRecording({
      sessionId: "recording-1",
      outputUri: "file:///recording.wav",
    });
    await stopNativeWaveformRecording("recording-1");
    await cancelNativeWaveformRecording("recording-1");

    expect(startRecording).toHaveBeenCalledWith(
      "recording-1",
      "file:///recording.wav",
    );
    expect(stopRecording).toHaveBeenCalledWith("recording-1");
    expect(cancelRecording).toHaveBeenCalledWith("recording-1");
  });
});
