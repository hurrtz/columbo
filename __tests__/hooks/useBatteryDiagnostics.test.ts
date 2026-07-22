import { act, renderHook } from "@testing-library/react-native";

jest.mock("../../src/services/debugLogCapture", () => ({
  getDebugLogCaptureState: jest.fn(),
  recordDebugLogEvent: jest.fn(),
  subscribeToDebugLogCapture: jest.fn(),
}));

import { useBatteryDiagnostics } from "../../src/hooks/useBatteryDiagnostics";
import {
  getDebugLogCaptureState,
  recordDebugLogEvent,
  subscribeToDebugLogCapture,
} from "../../src/services/debugLogCapture";

describe("useBatteryDiagnostics", () => {
  let captureActive = false;
  let captureListener: (() => void) | null = null;

  const snapshot = {
    isActive: false,
    isRecording: false,
    pipelinePhase: "idle" as const,
    playerIsPlaying: false,
    playerPaused: false,
    spokenRepliesEnabled: true,
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    captureActive = false;
    captureListener = null;
    jest.mocked(getDebugLogCaptureState).mockImplementation(
      () =>
        ({
          active: captureActive,
        }) as ReturnType<typeof getDebugLogCaptureState>,
    );
    jest.mocked(subscribeToDebugLogCapture).mockImplementation((listener) => {
      captureListener = listener;
      return () => undefined;
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("does not keep an idle heartbeat timer running outside a capture", () => {
    renderHook(() => useBatteryDiagnostics(snapshot));

    act(() => {
      jest.advanceTimersByTime(12_000);
    });

    expect(recordDebugLogEvent).not.toHaveBeenCalledWith(
      expect.objectContaining({
        event: expect.stringMatching(/^diag-heartbeat/),
      }),
    );
  });

  it("starts and stops heartbeats with the debug capture", () => {
    renderHook(() => useBatteryDiagnostics(snapshot));

    captureActive = true;
    act(() => {
      captureListener?.();
    });
    act(() => {
      jest.advanceTimersByTime(4_000);
    });

    expect(recordDebugLogEvent).toHaveBeenCalledWith(
      expect.objectContaining({ event: "diag-heartbeat" }),
    );

    jest.mocked(recordDebugLogEvent).mockClear();
    captureActive = false;
    act(() => {
      captureListener?.();
    });
    act(() => {
      jest.advanceTimersByTime(8_000);
    });

    expect(recordDebugLogEvent).not.toHaveBeenCalledWith(
      expect.objectContaining({
        event: expect.stringMatching(/^diag-heartbeat/),
      }),
    );
  });
});
