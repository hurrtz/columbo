import { useSyncExternalStore } from "react";
import type { WaveformVisualizationVariant } from "../types";

export interface WaveformFrame {
  metering: number;
  levels: number[] | undefined;
  variant: WaveformVisualizationVariant;
}

const EMPTY_FRAME: WaveformFrame = {
  metering: -160,
  levels: undefined,
  variant: "bars",
};

let currentFrame: WaveformFrame = EMPTY_FRAME;
const listeners = new Set<() => void>();

export function publishWaveformFrame(frame: WaveformFrame) {
  currentFrame = frame;
  listeners.forEach((listener) => listener());
}

export function resetWaveformFrame() {
  if (currentFrame === EMPTY_FRAME) {
    return;
  }
  currentFrame = EMPTY_FRAME;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return currentFrame;
}

export function useWaveformFrame(): WaveformFrame {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
