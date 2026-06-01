import { WaveformVisualizationVariant } from "../../types";

export const PLAYER_STATUS_INTERVAL_MS = 250;
export const VISUAL_UPDATE_INTERVAL_MS = 220;
export const OSCILLOSCOPE_TICK_INTERVAL_MS = 160;
export const PLAYBACK_ROUTE_SETTLE_MS = 650;

export interface PlayerState {
  isPlaybackPaused: boolean;
  isPlaying: boolean;
  hasPendingPlayback: boolean;
  meteringData: number;
  waveformData: number[];
  waveformVariant: WaveformVisualizationVariant;
}

export function nextPlaybackJobId(prefix: "audio" | "native") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
