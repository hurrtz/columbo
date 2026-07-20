import { NativeModules, Platform } from "react-native";

import { recordDebugLogEvent } from "./debugLogCapture";

export type VoiceLiveActivityPhase =
  "listening" | "transcribing" | "searching" | "thinking" | "synthesizing";

export interface VoiceLiveActivityState {
  phase: VoiceLiveActivityPhase;
  expectedSpeechAtMs: number | null;
}

type VoiceLiveActivityModule = {
  setState(
    phase: VoiceLiveActivityPhase,
    expectedSpeechAtMs: number | null,
  ): Promise<boolean>;
  endActivity(): Promise<boolean>;
};

interface VoiceLiveActivityDependencies {
  nativeModule?: VoiceLiveActivityModule;
  platform?: string;
}

const HEARTBEAT_INTERVAL_MS = 20_000;

const nativeModule = NativeModules.ColumboVoiceLiveActivity as
  VoiceLiveActivityModule | undefined;

let currentState: VoiceLiveActivityState | null = null;
let lastSentSignature: string | null = null;
let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
let scheduledEndTimer: ReturnType<typeof setTimeout> | null = null;

function clearHeartbeat() {
  if (heartbeatTimer) {
    clearInterval(heartbeatTimer);
    heartbeatTimer = null;
  }
}

function clearScheduledEnd() {
  if (scheduledEndTimer) {
    clearTimeout(scheduledEndTimer);
    scheduledEndTimer = null;
  }
}

function getRuntime(dependencies: VoiceLiveActivityDependencies) {
  return {
    module: dependencies.nativeModule ?? nativeModule,
    platform: dependencies.platform ?? Platform.OS,
  };
}

function sendState(
  state: VoiceLiveActivityState,
  module: VoiceLiveActivityModule,
) {
  void module.setState(state.phase, state.expectedSpeechAtMs).catch((error) => {
    recordDebugLogEvent({
      event: "voice-live-activity-update-failed",
      level: "warn",
      payload: {
        message: error instanceof Error ? error.message : String(error),
        phase: state.phase,
      },
    });
  });
}

function ensureHeartbeat(module: VoiceLiveActivityModule) {
  if (heartbeatTimer) {
    return;
  }

  heartbeatTimer = setInterval(() => {
    if (currentState) {
      // Refreshing the native stale date is also the proof that Columbo is
      // still executing. If iOS suspends JavaScript, this heartbeat stops and
      // the Live Activity becomes visibly stale instead of claiming progress.
      sendState(currentState, module);
    }
  }, HEARTBEAT_INTERVAL_MS);
}

export function setVoiceLiveActivityState(
  state: VoiceLiveActivityState,
  dependencies: VoiceLiveActivityDependencies = {},
) {
  const runtime = getRuntime(dependencies);

  if (
    runtime.platform !== "ios" ||
    !runtime.module ||
    typeof runtime.module.setState !== "function"
  ) {
    return false;
  }

  clearScheduledEnd();
  currentState = {
    phase: state.phase,
    expectedSpeechAtMs:
      state.expectedSpeechAtMs !== null &&
      Number.isFinite(state.expectedSpeechAtMs)
        ? state.expectedSpeechAtMs
        : null,
  };

  const signature = `${currentState.phase}:${currentState.expectedSpeechAtMs ?? "unknown"}`;

  if (signature !== lastSentSignature) {
    lastSentSignature = signature;
    sendState(currentState, runtime.module);
  }

  ensureHeartbeat(runtime.module);
  return true;
}

export function endVoiceLiveActivity(
  dependencies: VoiceLiveActivityDependencies = {},
) {
  const runtime = getRuntime(dependencies);

  clearScheduledEnd();
  clearHeartbeat();
  currentState = null;
  lastSentSignature = null;

  if (
    runtime.platform !== "ios" ||
    !runtime.module ||
    typeof runtime.module.endActivity !== "function"
  ) {
    return false;
  }

  void runtime.module.endActivity().catch((error) => {
    recordDebugLogEvent({
      event: "voice-live-activity-end-failed",
      level: "warn",
      payload: {
        message: error instanceof Error ? error.message : String(error),
      },
    });
  });
  return true;
}

export function scheduleVoiceLiveActivityEnd(
  delayMs = 750,
  dependencies: VoiceLiveActivityDependencies = {},
) {
  clearScheduledEnd();
  scheduledEndTimer = setTimeout(() => {
    scheduledEndTimer = null;
    endVoiceLiveActivity(dependencies);
  }, delayMs);
}

export const VOICE_LIVE_ACTIVITY_HEARTBEAT_MS = HEARTBEAT_INTERVAL_MS;
