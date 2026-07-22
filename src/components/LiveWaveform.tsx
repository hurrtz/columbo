import React from "react";

import { useWaveformFrame } from "../state/waveformFeed";
import { Waveform, type WaveformProps } from "./Waveform";

type LiveWaveformProps = Omit<
  WaveformProps,
  "levels" | "metering"
>;

/** Keeps high-frequency waveform frames inside the smallest possible subtree. */
export function LiveWaveform(props: LiveWaveformProps) {
  const frame = useWaveformFrame();

  return (
    <Waveform
      {...props}
      levels={frame.levels}
      metering={frame.metering}
      variant={props.variant ?? frame.variant}
    />
  );
}
