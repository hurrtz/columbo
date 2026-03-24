import type { Provider } from "../../types";
import { RUNTIME_PROVIDER_MANIFEST } from "../../constants/providers/runtimeManifest";
import { getMistralSttLanguageCode } from "../../utils/speechLanguage";

export type MultipartTranscriptionConfig = {
  kind: "multipart";
  endpoint: string;
  defaultModel: string;
  languageHint?: () => string | undefined;
};

export type GeminiTranscriptionConfig = {
  kind: "gemini";
  endpointBase: string;
  defaultModel: string;
};

export const STT_TIMEOUT_MS = 30000;

function getLanguageHint(
  key: string | undefined,
): MultipartTranscriptionConfig["languageHint"] {
  switch (key) {
    case "mistral-stt-language-code":
      return getMistralSttLanguageCode;
    default:
      return undefined;
  }
}

const sttProviderConfigEntries: Array<
  [Provider, MultipartTranscriptionConfig | GeminiTranscriptionConfig]
> = [];

for (const provider of Object.keys(RUNTIME_PROVIDER_MANIFEST) as Provider[]) {
  const manifest = RUNTIME_PROVIDER_MANIFEST[provider];

  if (
    manifest.stt.transport === "multipart" &&
    manifest.stt.endpoint &&
    manifest.stt.defaultModel
  ) {
    sttProviderConfigEntries.push([
      provider,
      {
        kind: "multipart",
        endpoint: manifest.stt.endpoint,
        defaultModel: manifest.stt.defaultModel,
        ...(manifest.stt.languageHintKey
          ? { languageHint: getLanguageHint(manifest.stt.languageHintKey) }
          : {}),
      },
    ]);
  }

  if (
    manifest.stt.transport === "gemini" &&
    manifest.stt.endpointBase &&
    manifest.stt.defaultModel
  ) {
    sttProviderConfigEntries.push([
      provider,
      {
        kind: "gemini",
        endpointBase: manifest.stt.endpointBase,
        defaultModel: manifest.stt.defaultModel,
      },
    ]);
  }
}

export const STT_PROVIDER_CONFIGS: Partial<
  Record<Provider, MultipartTranscriptionConfig | GeminiTranscriptionConfig>
> = Object.fromEntries(sttProviderConfigEntries);
