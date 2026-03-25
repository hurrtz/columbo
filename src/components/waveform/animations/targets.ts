import type { VoiceVisualPhase } from "../../../types";

type WaveformAnimationContext = {
  phase: VoiceVisualPhase;
  isRecording: boolean;
  isSpeaking: boolean;
  shouldAnimate: boolean;
  usesPreciseWaveform: boolean;
};

function lerp(value: number, start: number, end: number) {
  "worklet";

  return start + (end - start) * value;
}

function getOrbitalMotion(spin: number, radiusX: number, radiusY: number) {
  "worklet";

  const angle = spin * Math.PI * 2;

  return {
    translateX: Math.cos(angle) * radiusX,
    translateY: Math.sin(angle) * radiusY,
  };
}

export function getPulseAnimationConfig(phase: VoiceVisualPhase) {
  "worklet";

  switch (phase) {
    case "speaking":
      return { highPoint: 1, duration: 1180 };
    case "recording":
      return { highPoint: 0.86, duration: 1380 };
    case "idle":
      return { highPoint: 0.38, duration: 2600 };
    default:
      return { highPoint: 0.68, duration: 1820 };
  }
}

export function getOuterRingMetrics(
  context: WaveformAnimationContext,
  pulse: number,
  energy: number,
) {
  "worklet";

  if (context.usesPreciseWaveform) {
    return { opacity: 0.34, scale: 1 };
  }

  if (context.phase === "idle") {
    return {
      opacity: 0.38 + pulse * 0.15,
      scale: 0.98 + pulse * 0.03 + energy * 0.03,
    };
  }

  if (context.isRecording) {
    return {
      opacity: 0.4 + pulse * 0.18 + energy * 0.08,
      scale: 0.975 + pulse * 0.04 + energy * 0.055,
    };
  }

  if (context.isSpeaking) {
    return {
      opacity: 0.34 + pulse * 0.14 + energy * 0.08,
      scale: 0.982 + pulse * 0.03 + energy * 0.04,
    };
  }

  return {
    opacity: 0.32 + pulse * 0.12,
    scale: 0.986 + pulse * 0.025,
  };
}

export function getInnerRingMetrics(
  context: WaveformAnimationContext,
  pulse: number,
  energy: number,
) {
  "worklet";

  if (context.usesPreciseWaveform) {
    return { opacity: 0.46, scale: 1 };
  }

  if (context.phase === "idle") {
    return {
      opacity: 0.52 + pulse * 0.12,
      scale: 0.995 + pulse * 0.025 + energy * 0.02,
    };
  }

  if (context.isRecording) {
    return {
      opacity: 0.56 + pulse * 0.12 + energy * 0.1,
      scale: 0.99 + pulse * 0.03 + energy * 0.045,
    };
  }

  if (context.isSpeaking) {
    return {
      opacity: 0.46 + pulse * 0.1 + energy * 0.08,
      scale: 0.992 + pulse * 0.028 + energy * 0.03,
    };
  }

  return {
    opacity: 0.44 + pulse * 0.1,
    scale: 0.994 + pulse * 0.02,
  };
}

export function getCircleShellScale(
  context: WaveformAnimationContext,
  pulse: number,
  energy: number,
) {
  "worklet";

  if (context.usesPreciseWaveform) {
    return 1;
  }

  if (context.phase === "idle") {
    return 0.992 + pulse * 0.028 + energy * 0.025;
  }

  if (context.isRecording) {
    return 0.992 + pulse * 0.032 + energy * 0.075;
  }

  if (context.isSpeaking) {
    return 0.994 + pulse * 0.026 + energy * 0.04;
  }

  return 0.994 + pulse * 0.018;
}

export function getBackgroundGradientMetrics(
  context: WaveformAnimationContext,
  pulse: number,
  energy: number,
  spin: number,
) {
  "worklet";

  const rotationDeg =
    context.phase !== "idle" && context.shouldAnimate
      ? Math.sin(spin * Math.PI * 2) * 18
      : 0;

  if (context.phase === "idle" || !context.shouldAnimate) {
    return {
      rotationDeg,
      scale: 1.08,
      translateX: 0,
      translateY: 0,
    };
  }

  if (context.isRecording) {
    const motion = getOrbitalMotion(spin, 13 + energy * 7, 10 + energy * 6);

    return {
      rotationDeg,
      scale: 1.18 + pulse * 0.03 + energy * 0.03,
      translateX: motion.translateX,
      translateY: motion.translateY,
    };
  }

  if (context.isSpeaking) {
    const motion = getOrbitalMotion(spin, 10 + energy * 5, 8 + energy * 4);

    return {
      rotationDeg,
      scale: 1.16 + pulse * 0.025 + energy * 0.025,
      translateX: motion.translateX,
      translateY: motion.translateY,
    };
  }

  const motion = getOrbitalMotion(spin, 9, 7);

  return {
    rotationDeg,
    scale: 1.15 + pulse * 0.02,
    translateX: motion.translateX,
    translateY: motion.translateY,
  };
}

export function getActivityGradientMetrics(
  context: WaveformAnimationContext,
  pulse: number,
  energy: number,
  spin: number,
) {
  "worklet";

  if (context.phase === "idle" || !context.shouldAnimate) {
    return {
      opacity: 0,
      rotationDeg: Math.sin(spin * Math.PI * 2) * 20,
      scale: 1,
      translateX: 0,
      translateY: 0,
    };
  }

  if (context.isRecording) {
    const motion = getOrbitalMotion(spin, 11 + energy * 6, 11 + energy * 6);

    return {
      opacity: 0.24 + pulse * 0.08 + energy * 0.14,
      rotationDeg: Math.sin(spin * Math.PI * 2) * 24,
      scale: 1.02 + pulse * 0.02 + energy * 0.03,
      translateX: motion.translateX,
      translateY: motion.translateY,
    };
  }

  if (context.isSpeaking) {
    const motion = getOrbitalMotion(spin, 8 + energy * 4, 8 + energy * 4);

    return {
      opacity: 0.2 + pulse * 0.06 + energy * 0.08,
      rotationDeg: Math.sin(spin * Math.PI * 2) * 18,
      scale: 1.015 + pulse * 0.018 + energy * 0.02,
      translateX: motion.translateX,
      translateY: motion.translateY,
    };
  }

  const motion = getOrbitalMotion(spin, 8, 8);

  return {
    opacity: 0.18 + pulse * 0.06,
    rotationDeg: Math.sin(spin * Math.PI * 2) * 20,
    scale: 1.014 + pulse * 0.016,
    translateX: motion.translateX,
    translateY: motion.translateY,
  };
}

export function getTopAuraMetrics(
  context: WaveformAnimationContext,
  pulse: number,
  energy: number,
  orbit: number,
) {
  "worklet";

  if (context.usesPreciseWaveform) {
    return {
      opacity: 0.08,
      translateX: 0,
      translateY: 0,
      scale: 1,
    };
  }

  return {
    opacity:
      context.phase === "idle"
        ? 0.16 + pulse * 0.14 + energy * 0.12
        : context.isSpeaking
          ? 0.14 + pulse * 0.1 + energy * 0.1
          : context.isRecording
            ? 0.16 + pulse * 0.14 + energy * 0.12
            : 0.12 + pulse * 0.08,
    translateX: lerp(orbit, -12, 12),
    translateY: lerp(orbit, 6, -8),
    scale: 1 + pulse * 0.06 + energy * 0.06,
  };
}

export function getBottomAuraMetrics(
  context: WaveformAnimationContext,
  pulse: number,
  energy: number,
  orbit: number,
) {
  "worklet";

  if (context.usesPreciseWaveform) {
    return {
      opacity: 0.1,
      translateX: 0,
      translateY: 0,
      scale: 1,
    };
  }

  return {
    opacity:
      context.phase === "idle"
        ? 0.18 + pulse * 0.1 + energy * 0.12
        : context.isSpeaking
          ? 0.15 + pulse * 0.08 + energy * 0.1
          : context.isRecording
            ? 0.18 + pulse * 0.1 + energy * 0.12
            : 0.13 + pulse * 0.07,
    translateX: lerp(orbit, 10, -10),
    translateY: lerp(orbit, -8, 10),
    scale: 1.03 + pulse * 0.05 + energy * 0.05,
  };
}

export function getSheenMetrics(
  context: WaveformAnimationContext,
  pulse: number,
  orbit: number,
) {
  "worklet";

  if (context.usesPreciseWaveform) {
    return {
      opacity: 0.06,
      translateX: 0,
      rotationDeg: 0,
    };
  }

  return {
    opacity:
      context.phase === "idle"
        ? 0.16 + pulse * 0.08
        : context.isSpeaking
          ? 0.13 + pulse * 0.06
          : 0.11 + pulse * 0.05,
    translateX: lerp(orbit, -20, 16),
    rotationDeg: lerp(orbit, -8, 8),
  };
}

export function getWaveformMetrics(
  usesPreciseWaveform: boolean,
  energy: number,
) {
  "worklet";

  return {
    opacity: usesPreciseWaveform ? 1 : 0.88 + energy * 0.12,
    translateY: usesPreciseWaveform ? 0 : -2 - energy * 4,
  };
}

export function getControlIconMetrics(
  context: WaveformAnimationContext,
  pulse: number,
  energy: number,
) {
  "worklet";

  if (!context.isRecording || !context.shouldAnimate) {
    return {
      opacity: context.phase === "idle" ? 0.96 : 0.92,
      scale: 1,
      translateY: 0,
    };
  }

  return {
    opacity: context.phase === "idle" ? 0.96 : 0.92,
    scale: 0.96 + pulse * 0.04 + energy * 0.1,
    translateY: -1 - energy * 2,
  };
}
