import type { Provider } from "../../types";
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

export const STT_PROVIDER_CONFIGS: Partial<
  Record<Provider, MultipartTranscriptionConfig | GeminiTranscriptionConfig>
> = {
  openai: {
    kind: "multipart",
    endpoint: "https://api.openai.com/v1/audio/transcriptions",
    defaultModel: "gpt-4o-mini-transcribe",
  },
  groq: {
    kind: "multipart",
    endpoint: "https://api.groq.com/openai/v1/audio/transcriptions",
    defaultModel: "whisper-large-v3-turbo",
  },
  gemini: {
    kind: "gemini",
    endpointBase: "https://generativelanguage.googleapis.com/v1beta/models",
    defaultModel: "gemini-2.5-flash",
  },
  mistral: {
    kind: "multipart",
    endpoint: "https://api.mistral.ai/v1/audio/transcriptions",
    defaultModel: "voxtral-mini-latest",
    languageHint: getMistralSttLanguageCode,
  },
  together: {
    kind: "multipart",
    endpoint: "https://api.together.xyz/v1/audio/transcriptions",
    defaultModel: "openai/whisper-large-v3",
  },
};
