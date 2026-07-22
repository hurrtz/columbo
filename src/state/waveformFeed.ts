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
const variantListeners = new Set<() => void>();

export function publishWaveformFrame(frame: WaveformFrame) {
  const variantChanged = currentFrame.variant !== frame.variant;
  currentFrame = frame;
  listeners.forEach((listener) => listener());
  if (variantChanged) {
    variantListeners.forEach((listener) => listener());
  }
}

export function resetWaveformFrame() {
  if (currentFrame === EMPTY_FRAME) {
    return;
  }
  currentFrame = EMPTY_FRAME;
  listeners.forEach((listener) => listener());
  variantListeners.forEach((listener) => listener());
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

function subscribeToVariant(listener: () => void) {
  variantListeners.add(listener);
  return () => {
    variantListeners.delete(listener);
  };
}

function getVariantSnapshot() {
  return currentFrame.variant;
}

export function useWaveformFrame(): WaveformFrame {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function useWaveformVariant(): WaveformVisualizationVariant {
  return useSyncExternalStore(
    subscribeToVariant,
    getVariantSnapshot,
    getVariantSnapshot,
  );
}
