import { recordDebugLogEvent } from "../services/debugLogCapture";

export function logWaveformDebug(
  event: string,
  payload: Record<string, unknown> = {},
) {
  recordDebugLogEvent({
    category: "waveform",
    event,
    payload,
  });

  if (
    typeof __DEV__ === "undefined" ||
    !__DEV__ ||
    process.env.NODE_ENV === "test"
  ) {
    return;
  }

  console.info(
    "[waveform-debug]",
    JSON.stringify({
      event,
      timestamp: new Date().toISOString(),
      ...payload,
    }),
  );
}
