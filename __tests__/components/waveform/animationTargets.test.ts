import {
  getActivityGradientMetrics,
  getControlIconMetrics,
  getOuterRingMetrics,
  getPulseAnimationConfig,
  getTopAuraMetrics,
} from "../../../src/components/waveform/animations/targets";

describe("waveform animation targets", () => {
  it("uses faster, stronger pulse targets while speaking", () => {
    expect(getPulseAnimationConfig("speaking")).toEqual({
      highPoint: 1,
      duration: 1180,
    });
    expect(getPulseAnimationConfig("idle")).toEqual({
      highPoint: 0.38,
      duration: 2600,
    });
  });

  it("returns stable precise-waveform ring metrics", () => {
    expect(
      getOuterRingMetrics(
        {
          phase: "speaking",
          isRecording: false,
          isSpeaking: true,
          shouldAnimate: true,
          usesPreciseWaveform: true,
        },
        0.5,
        0.5,
      ),
    ).toEqual({
      opacity: 0.34,
      scale: 1,
    });
  });

  it("raises activity overlay intensity while recording", () => {
    const metrics = getActivityGradientMetrics(
      {
        phase: "recording",
        isRecording: true,
        isSpeaking: false,
        shouldAnimate: true,
        usesPreciseWaveform: false,
      },
      0.5,
      0.25,
      0.25,
    );

    expect(metrics.rotationDeg).toBeCloseTo(24);
    expect(metrics.opacity).toBeCloseTo(0.315);
    expect(metrics.scale).toBeCloseTo(1.0375);
    expect(metrics.translateX).toBeCloseTo(0);
    expect(metrics.translateY).toBeCloseTo(12.5);
  });

  it("keeps aura motion disabled for precise waveform rendering", () => {
    expect(
      getTopAuraMetrics(
        {
          phase: "recording",
          isRecording: true,
          isSpeaking: false,
          shouldAnimate: true,
          usesPreciseWaveform: true,
        },
        0.8,
        0.4,
        0.3,
      ),
    ).toEqual({
      opacity: 0.08,
      translateX: 0,
      translateY: 0,
      scale: 1,
    });
  });

  it("only offsets the control icon during active recording animation", () => {
    const metrics = getControlIconMetrics(
      {
        phase: "recording",
        isRecording: true,
        isSpeaking: false,
        shouldAnimate: true,
        usesPreciseWaveform: false,
      },
      0.5,
      0.25,
    );

    expect(metrics.opacity).toBe(0.92);
    expect(metrics.scale).toBeCloseTo(1.005);
    expect(metrics.translateY).toBeCloseTo(-1.5);
  });
});
