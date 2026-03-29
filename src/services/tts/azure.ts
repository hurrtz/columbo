import { translate } from "../../i18n";
import type { AppLanguage } from "../../types";

export const AZURE_SPEECH_OUTPUT_FORMAT = "audio-24khz-48kbitrate-mono-mp3";
export const AZURE_SPEECH_USER_AGENT = "SchnackAI";

export function parseAzureSpeechCredentials(apiKey?: string | null) {
  if (!apiKey?.trim()) {
    return null;
  }

  const [subscriptionKeyPart, regionPart] = apiKey.split("|", 2);
  const subscriptionKey = subscriptionKeyPart?.trim() ?? "";
  const region = regionPart?.trim().toLowerCase() ?? "";

  if (!subscriptionKey || !region) {
    return null;
  }

  return {
    subscriptionKey,
    region,
  };
}

export function requireAzureSpeechCredentials(
  apiKey: string | undefined,
  language: AppLanguage,
) {
  const credentials = parseAzureSpeechCredentials(apiKey);

  if (credentials) {
    return credentials;
  }

  throw new Error(translate(language, "azureSpeechApiKeyFormat"));
}

export function buildAzureSpeechSynthesisEndpoint(region: string) {
  return `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
}

export function buildAzureSpeechVoicesEndpoint(region: string) {
  return `https://${region}.tts.speech.microsoft.com/cognitiveservices/voices/list`;
}

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
