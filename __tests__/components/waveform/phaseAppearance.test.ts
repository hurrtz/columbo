import { isWaveformProcessingPhase } from "../../../src/components/waveform/phaseAppearance";

describe("waveform phase appearance", () => {
  it("treats the complete pre-speech pipeline as processing", () => {
    expect(isWaveformProcessingPhase("transcribing")).toBe(true);
    expect(isWaveformProcessingPhase("searching")).toBe(true);
    expect(isWaveformProcessingPhase("thinking")).toBe(true);
    expect(isWaveformProcessingPhase("synthesizing")).toBe(true);
    expect(isWaveformProcessingPhase("recording")).toBe(false);
    expect(isWaveformProcessingPhase("speaking")).toBe(false);
    expect(isWaveformProcessingPhase("idle")).toBe(false);
  });
});
