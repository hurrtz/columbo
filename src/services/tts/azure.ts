export {
  buildAzureSpeechSynthesisEndpoint,
  buildAzureSpeechVoicesEndpoint,
  parseAzureSpeechCredentials,
  requireAzureSpeechCredentials,
} from "../azure";

export const AZURE_SPEECH_OUTPUT_FORMAT = "audio-24khz-48kbitrate-mono-mp3";
export const AZURE_SPEECH_USER_AGENT = "SchnackAI";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function getAzureSpeechVoiceLocale(voice: string) {
  const segments = voice.split("-");

  if (segments.length >= 2) {
    return `${segments[0]}-${segments[1]}`;
  }

  return "en-US";
}

export function buildAzureSpeechSsml(params: {
  text: string;
  voice: string;
}) {
  const locale = getAzureSpeechVoiceLocale(params.voice);

  return `<speak version='1.0' xml:lang='${escapeXml(locale)}'><voice name='${escapeXml(params.voice)}'>${escapeXml(params.text)}</voice></speak>`;
}
