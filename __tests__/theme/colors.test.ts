import {
  darkColors,
  getAccessiblePhaseForeground,
  lightColors,
} from "../../src/theme/colors";

function relativeLuminance(hexColor: string) {
  const channels = hexColor
    .slice(1)
    .match(/.{2}/g)!
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4,
    );

  return (
    channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
  );
}

function contrastRatio(firstColor: string, secondColor: string) {
  const luminances = [
    relativeLuminance(firstColor),
    relativeLuminance(secondColor),
  ].sort((first, second) => second - first);

  return (luminances[0] + 0.05) / (luminances[1] + 0.05);
}

describe("theme colors", () => {
  it("uses the dedicated light palette", () => {
    expect(lightColors).toMatchObject({
      accent: "#1C64F2",
      success: "#0E9F6E",
      danger: "#E02424",
      phaseRecordingTrack: "#1C64F2",
      phaseTranscribing: "#4F46E5",
      phaseThinkingBriefly: "#A855F7",
      phaseSearching: "#D946EF",
      phaseThinking: "#7E22CE",
      phaseSynthesizing: "#06B6D4",
      phaseSpeaking: "#0E9F6E",
    });
  });

  it("uses the dedicated dark palette", () => {
    expect(darkColors).toMatchObject({
      accent: "#76A9FA",
      success: "#31C48D",
      danger: "#F98080",
      phaseRecordingTrack: "#76A9FA",
      phaseTranscribing: "#818CF8",
      phaseThinkingBriefly: "#C084FC",
      phaseSearching: "#E879F9",
      phaseThinking: "#A855F7",
      phaseSynthesizing: "#22D3EE",
      phaseSpeaking: "#31C48D",
    });
  });

  it.each([
    ["light", lightColors],
    ["dark", darkColors],
  ] as const)("keeps every %s phase label readable", (_mode, colors) => {
    const phaseColors = [
      colors.phaseRecordingTrack,
      colors.phaseTranscribing,
      colors.phaseThinkingBriefly,
      colors.phaseSearching,
      colors.phaseThinking,
      colors.phaseSynthesizing,
      colors.phaseSpeaking,
    ];

    for (const phaseColor of phaseColors) {
      expect(
        contrastRatio(
          phaseColor,
          getAccessiblePhaseForeground(phaseColor),
        ),
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  it.each([
    [lightColors.bubbleUser, lightColors.onPrimary],
    [darkColors.bubbleUser, darkColors.onPrimary],
    [lightColors.dangerFill, lightColors.onDanger],
    [darkColors.dangerFill, darkColors.onDanger],
  ])("keeps filled action text readable", (background, foreground) => {
    expect(contrastRatio(background, foreground)).toBeGreaterThanOrEqual(4.5);
  });
});
