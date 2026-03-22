import { PROVIDER_LABELS } from "../../constants/models";
import { translate } from "../../i18n";
import type { AppLanguage, Provider } from "../../types";

export function requireProviderKey(
  provider: Provider,
  apiKey: string | undefined,
  language: AppLanguage,
) {
  if (!apiKey?.trim()) {
    throw new Error(
      translate(language, "providerConfiguredInSettings", {
        provider: PROVIDER_LABELS[provider],
      }),
    );
  }

  return apiKey.trim();
}

export function createSttTimeoutError(params: {
  provider: Provider;
  language: AppLanguage;
}) {
  return new Error(
    translate(params.language, "sttTimeout", {
      provider: PROVIDER_LABELS[params.provider],
    }),
  );
}

export function createRecordedFileNotReadyError(language: AppLanguage) {
  return new Error(translate(language, "voiceInputCaptureIncomplete"));
}

export function extractTextFromGeminiResponse(data: any) {
  const parts = data?.candidates?.[0]?.content?.parts;

  if (!Array.isArray(parts)) {
    return "";
  }

  return parts
    .map((part) => (typeof part?.text === "string" ? part.text : ""))
    .join("")
    .trim();
}
