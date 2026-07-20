import {
  getActivityGradientMetrics,
  getCircleShellScale,
  getControlIconMetrics,
  getInnerRingMetrics,
  getOuterRingMetrics,
  getPulseAnimationConfig,
  getProcessingControlRotationDeg,
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

  it("breathes the control icon during processing animation", () => {
    const metrics = getControlIconMetrics(
      {
        phase: "thinking",
        isRecording: false,
        isSpeaking: false,
        isProcessing: true,
        shouldAnimate: true,
        usesPreciseWaveform: false,
      },
      0.5,
      0,
    );

    expect(metrics.opacity).toBe(0.92);
    expect(metrics.scale).toBeCloseTo(1.0025);
    expect(metrics.translateY).toBeCloseTo(-2.25);
  });

  it("keeps thinking and search countdowns on the same readable wobble", () => {
    const processingContext = {
      isRecording: false,
      isSpeaking: false,
      isProcessing: true,
      shouldAnimate: true,
      usesPreciseWaveform: false,
    };

    expect(
      getProcessingControlRotationDeg(
        { ...processingContext, phase: "thinking" },
        0.25,
      ),
    ).toBeCloseTo(10);
    expect(
      getProcessingControlRotationDeg(
        { ...processingContext, phase: "searching" },
        0.25,
      ),
    ).toBeCloseTo(10);
  });

  it("uses stronger ring and shell motion during processing animation", () => {
    const context = {
      phase: "thinking" as const,
      isRecording: false,
      isSpeaking: false,
      isProcessing: true,
      shouldAnimate: true,
      usesPreciseWaveform: false,
    };

    expect(getOuterRingMetrics(context, 0.5, 0).scale).toBeCloseTo(0.9975);
    expect(getInnerRingMetrics(context, 0.5, 0).opacity).toBeCloseTo(0.55);
    expect(getCircleShellScale(context, 0.5, 0)).toBeCloseTo(1.0045);
  });
});
