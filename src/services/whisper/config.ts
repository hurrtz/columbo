import type { Provider } from "../../types";
import { RUNTIME_PROVIDER_MANIFEST } from "../../constants/providers/runtimeManifest";
import { getMistralSttLanguageCode } from "../../utils/speechLanguage";

export type MultipartTranscriptionConfig = {
  kind: "multipart";
  endpoint: string;
  defaultModel: string;
  languageHint?: () => string | undefined;
};

export type OpenAiAudioInputTranscriptionConfig = {
  kind: "openai-audio-input";
  endpoint: string;
  defaultModel: string;
};

export type AssemblyAiPreRecordedTranscriptionConfig = {
  kind: "assemblyai-pre-recorded";
  endpointBase: string;
  defaultModel: string;
};

export type DeepgramPreRecordedTranscriptionConfig = {
  kind: "deepgram-pre-recorded";
  endpointBase: string;
  defaultModel: string;
};

export type ElevenLabsTranscriptionConfig = {
  kind: "elevenlabs";
  endpoint: string;
  defaultModel: string;
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
  [
    Provider,
    | MultipartTranscriptionConfig
    | GeminiTranscriptionConfig
    | OpenAiAudioInputTranscriptionConfig
    | AssemblyAiPreRecordedTranscriptionConfig
    | DeepgramPreRecordedTranscriptionConfig
    | ElevenLabsTranscriptionConfig,
  ]
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
    manifest.stt.transport === "openai-audio-input" &&
    manifest.stt.endpoint &&
    manifest.stt.defaultModel
  ) {
    sttProviderConfigEntries.push([
      provider,
      {
        kind: "openai-audio-input",
        endpoint: manifest.stt.endpoint,
        defaultModel: manifest.stt.defaultModel,
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

  if (
    manifest.stt.transport === "assemblyai-pre-recorded" &&
    manifest.stt.endpointBase &&
    manifest.stt.defaultModel
  ) {
    sttProviderConfigEntries.push([
      provider,
      {
        kind: "assemblyai-pre-recorded",
        endpointBase: manifest.stt.endpointBase,
        defaultModel: manifest.stt.defaultModel,
      },
    ]);
  }

  if (
    manifest.stt.transport === "deepgram-pre-recorded" &&
    manifest.stt.endpointBase &&
    manifest.stt.defaultModel
  ) {
    sttProviderConfigEntries.push([
      provider,
      {
        kind: "deepgram-pre-recorded",
        endpointBase: manifest.stt.endpointBase,
        defaultModel: manifest.stt.defaultModel,
      },
    ]);
  }

  if (
    manifest.stt.transport === "elevenlabs" &&
    manifest.stt.endpoint &&
    manifest.stt.defaultModel
  ) {
    sttProviderConfigEntries.push([
      provider,
      {
        kind: "elevenlabs",
        endpoint: manifest.stt.endpoint,
        defaultModel: manifest.stt.defaultModel,
      },
    ]);
  }
}

export const STT_PROVIDER_CONFIGS: Partial<
  Record<
    Provider,
    | MultipartTranscriptionConfig
    | GeminiTranscriptionConfig
    | OpenAiAudioInputTranscriptionConfig
    | AssemblyAiPreRecordedTranscriptionConfig
    | DeepgramPreRecordedTranscriptionConfig
    | ElevenLabsTranscriptionConfig
  >
> = Object.fromEntries(sttProviderConfigEntries);
