jest.mock("../../src/services/debugLogCapture", () => ({
  recordDebugLogEvent: jest.fn(),
}));

import {
  endVoiceLiveActivity,
  scheduleVoiceLiveActivityEnd,
  setVoiceLiveActivityState,
  VOICE_LIVE_ACTIVITY_HEARTBEAT_MS,
} from "../../src/services/voiceLiveActivity";

function createNativeModule() {
  return {
    setState: jest.fn(async () => true),
    endActivity: jest.fn(async () => true),
  };
}

describe("voiceLiveActivity", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    endVoiceLiveActivity({ platform: "android" });
  });

  afterEach(() => {
    endVoiceLiveActivity({ platform: "android" });
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("sends only phase and local ETA to the iOS bridge", () => {
    const nativeModule = createNativeModule();

    expect(
      setVoiceLiveActivityState(
        {
          phase: "thinking",
          expectedSpeechAtMs: 123_456,
        },
        { nativeModule, platform: "ios" },
      ),
    ).toBe(true);

    expect(nativeModule.setState).toHaveBeenCalledWith("thinking", 123_456);
  });

  it("uses the same local bridge on Android and requests notification permission after capture", async () => {
    const nativeModule = createNativeModule();
    const requestNotificationPermission = jest.fn(async () => true);
    const dependencies = {
      nativeModule,
      platform: "android",
      platformVersion: 36,
      requestNotificationPermission,
    };

    setVoiceLiveActivityState(
      { phase: "listening", expectedSpeechAtMs: null },
      dependencies,
    );
    expect(requestNotificationPermission).not.toHaveBeenCalled();

    setVoiceLiveActivityState(
      { phase: "thinking", expectedSpeechAtMs: 222_333 },
      dependencies,
    );
    await Promise.resolve();

    expect(requestNotificationPermission).toHaveBeenCalledTimes(1);
    expect(nativeModule.setState).toHaveBeenLastCalledWith("thinking", 222_333);
  });

  it("deduplicates unchanged phases but refreshes the stale date by heartbeat", () => {
    const nativeModule = createNativeModule();
    const dependencies = { nativeModule, platform: "ios" };
    const state = {
      phase: "searching" as const,
      expectedSpeechAtMs: 234_567,
    };

    setVoiceLiveActivityState(state, dependencies);
    setVoiceLiveActivityState(state, dependencies);

    expect(nativeModule.setState).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(VOICE_LIVE_ACTIVITY_HEARTBEAT_MS);

    expect(nativeModule.setState).toHaveBeenCalledTimes(2);
  });

  it("cancels a hand-off end when the next processing phase arrives", () => {
    const nativeModule = createNativeModule();
    const dependencies = { nativeModule, platform: "ios" };

    setVoiceLiveActivityState(
      { phase: "listening", expectedSpeechAtMs: null },
      dependencies,
    );
    scheduleVoiceLiveActivityEnd(750, dependencies);
    setVoiceLiveActivityState(
      { phase: "transcribing", expectedSpeechAtMs: 345_678 },
      dependencies,
    );
    jest.advanceTimersByTime(750);

    expect(nativeModule.endActivity).not.toHaveBeenCalled();
    expect(nativeModule.setState).toHaveBeenLastCalledWith(
      "transcribing",
      345_678,
    );
  });

  it("ends after the hand-off grace expires and stops heartbeats", () => {
    const nativeModule = createNativeModule();
    const dependencies = { nativeModule, platform: "ios" };

    setVoiceLiveActivityState(
      { phase: "thinking", expectedSpeechAtMs: 456_789 },
      dependencies,
    );
    scheduleVoiceLiveActivityEnd(750, dependencies);
    jest.advanceTimersByTime(750);

    expect(nativeModule.endActivity).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(VOICE_LIVE_ACTIVITY_HEARTBEAT_MS);
    expect(nativeModule.setState).toHaveBeenCalledTimes(1);
  });

  it("is a no-op off iOS and Android", () => {
    const nativeModule = createNativeModule();

    expect(
      setVoiceLiveActivityState(
        { phase: "thinking", expectedSpeechAtMs: null },
        { nativeModule, platform: "web" },
      ),
    ).toBe(false);
    expect(nativeModule.setState).not.toHaveBeenCalled();
  });
});
