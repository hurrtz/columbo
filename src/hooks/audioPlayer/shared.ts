export const PLAYER_STATUS_INTERVAL_MS = 250;
export const PLAYBACK_ROUTE_SETTLE_MS = 650;

export function nextPlaybackJobId(prefix: "audio" | "native") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
