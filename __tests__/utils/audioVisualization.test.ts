import {
  getPlaybackWaveformWindow,
  resampleWaveformSamples,
} from "../../src/utils/audioVisualization";

describe("playback waveform windows", () => {
  const samples = Array.from({ length: 200 }, (_, index) =>
    Math.sin((index + 1) / 9) * 0.8,
  );

  it("fills the full dock from the first playback frame", () => {
    const window = getPlaybackWaveformWindow(samples, 0, 96);

    expect(window).toHaveLength(96);
    expect(window).toEqual(samples.slice(0, 96));
    expect(window.some((sample) => Math.abs(sample) > 0.2)).toBe(true);
  });

  it("moves smoothly through the analysis instead of padding history with zeroes", () => {
    const before = getPlaybackWaveformWindow(samples, 0.5, 96);
    const after = getPlaybackWaveformWindow(samples, 0.501, 96);

    expect(before).toHaveLength(96);
    expect(before[0]).not.toBe(0);
    expect(after[0]).not.toEqual(before[0]);
    expect(Math.abs(after[0] - before[0])).toBeLessThan(0.05);
  });

  it("resamples short analyses to the requested display width", () => {
    expect(getPlaybackWaveformWindow([0, 1, 0], 0.5, 7)).toEqual(
      resampleWaveformSamples([0, 1, 0], 7),
    );
  });
});
