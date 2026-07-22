export const lightColors = {
  background: "#F3F2EE",
  backgroundSecondary: "#ECEAE5",
  surface: "#FCFBF8",
  surfaceAlt: "#EFEEE9",
  surfaceElevated: "#FFFFFF",
  text: "#17191D",
  textSecondary: "#60636A",
  textMuted: "#6F737B",
  accent: "#1C64F2",
  accentSoft: "#E8F0FF",
  phaseRecording: "#1554D1",
  phaseRecordingTrack: "#1C64F2",
  phaseTranscribing: "#4F46E5",
  phaseThinkingBriefly: "#A855F7",
  phaseSearching: "#D946EF",
  phaseThinking: "#7E22CE",
  phaseSynthesizing: "#06B6D4",
  phaseSpeaking: "#0E9F6E",
  bubbleUser: "#1C64F2",
  onAccent: "#FFFFFF",
  onPrimary: "#FFFFFF",
  onDanger: "#FFFFFF",
  bubbleAssistant: "#FCFBF8",
  border: "#D9D7D1",
  borderStrong: "#BDBAB2",
  overlay: "rgba(13, 15, 18, 0.46)",
  glow: "rgba(23, 25, 29, 0.08)",
  glowStrong: "rgba(28, 100, 242, 0.16)",
  success: "#0E9F6E",
  danger: "#E02424",
  dangerFill: "#E02424",
};

export const darkColors = {
  background: "#0D0F12",
  backgroundSecondary: "#111419",
  surface: "#15181D",
  surfaceAlt: "#20242A",
  surfaceElevated: "#1C2026",
  text: "#F4F2ED",
  textSecondary: "#A8ABB2",
  textMuted: "#8C9099",
  accent: "#76A9FA",
  accentSoft: "#1E3151",
  phaseRecording: "#4C86E8",
  phaseRecordingTrack: "#76A9FA",
  phaseTranscribing: "#818CF8",
  phaseThinkingBriefly: "#C084FC",
  phaseSearching: "#E879F9",
  phaseThinking: "#A855F7",
  phaseSynthesizing: "#22D3EE",
  phaseSpeaking: "#31C48D",
  bubbleUser: "#76A9FA",
  onAccent: "#FFFFFF",
  onPrimary: "#111827",
  onDanger: "#111827",
  bubbleAssistant: "#15181D",
  border: "#2C3138",
  borderStrong: "#424851",
  overlay: "rgba(0, 0, 0, 0.72)",
  glow: "rgba(0, 0, 0, 0.26)",
  glowStrong: "rgba(118, 169, 250, 0.22)",
  success: "#31C48D",
  danger: "#F98080",
  dangerFill: "#F98080",
};

export type Colors = typeof lightColors;

const LIGHT_PHASE_FOREGROUND = "#FFFFFF";
const DARK_PHASE_FOREGROUND = "#030712";

function relativeLuminance(hexColor: string) {
  const channels = hexColor
    .slice(1)
    .match(/.{2}/g)
    ?.map((channel) => Number.parseInt(channel, 16) / 255);

  if (!channels || channels.length !== 3) {
    return 0;
  }

  const [red, green, blue] = channels.map((channel) =>
    channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4,
  );

  return red * 0.2126 + green * 0.7152 + blue * 0.0722;
}

function contrastRatio(firstColor: string, secondColor: string) {
  const lighter = Math.max(
    relativeLuminance(firstColor),
    relativeLuminance(secondColor),
  );
  const darker = Math.min(
    relativeLuminance(firstColor),
    relativeLuminance(secondColor),
  );

  return (lighter + 0.05) / (darker + 0.05);
}

export function getAccessiblePhaseForeground(backgroundColor: string) {
  return contrastRatio(backgroundColor, DARK_PHASE_FOREGROUND) >
    contrastRatio(backgroundColor, LIGHT_PHASE_FOREGROUND)
    ? DARK_PHASE_FOREGROUND
    : LIGHT_PHASE_FOREGROUND;
}
