describe("nativeAudioQueue", () => {
  afterEach(() => {
    jest.resetModules();
    jest.dontMock("react-native");
  });

  it("is available on Android when the native module is registered", () => {
    jest.doMock("react-native", () => ({
      NativeEventEmitter: jest.fn().mockImplementation(() => ({
        addListener: jest.fn(() => ({ remove: jest.fn() })),
      })),
      NativeModules: {
        ColumboNativeAudioQueue: {
          prepare: jest.fn(),
          enqueue: jest.fn(),
          start: jest.fn(),
          pause: jest.fn(),
          resume: jest.fn(),
          stop: jest.fn(),
        },
      },
      Platform: {
        OS: "android",
      },
    }));

    const {
      isNativeAudioQueueAvailable,
    } = require("../../src/services/nativeAudioQueue");

    expect(isNativeAudioQueueAvailable()).toBe(true);
  });
});
