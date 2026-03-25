import type { Provider } from "../../types";
import {
  RUNTIME_PROVIDER_MANIFEST,
  RuntimeSttTransport,
} from "../../constants/providers/runtimeManifest";
import { getMistralSttLanguageCode } from "../../utils/speechLanguage";

export type MultipartTranscriptionConfig = {
  kind: "multipart";
  endpoint: string;
  defaultModel: string;
  languageHint?: () => string | undefined;
};

export type AlephAlphaTranscriptionConfig = {
  kind: "aleph-alpha";
  defaultModel: string;
};

export type OpenAiAudioInputTranscriptionConfig = {
  kind: "openai-audio-input";
  endpoint: string;
  defaultModel: string;
};

export type AzureOpenAiTranscriptionConfig = {
  kind: "azure-openai";
  defaultModel: string;
};

export type BaiduShortSpeechTranscriptionConfig = {
  kind: "baidu-short-speech";
  defaultModel: string;
};

export type BaiduRealtimeTranscriptionConfig = {
  kind: "baidu-realtime";
  endpoint: string;
  defaultModel: string;
};

export type AssemblyAiPreRecordedTranscriptionConfig = {
  kind: "assemblyai-pre-recorded";
  endpointBase: string;
  defaultModel: string;
};

export type AssemblyAiRealtimeTranscriptionConfig = {
  kind: "assemblyai-realtime";
  endpoint: string;
  defaultModel: string;
};

export type DashScopeRealtimeTranscriptionConfig = {
  kind: "dashscope-realtime";
  endpoint: string;
  defaultModel: string;
};

export type DeepgramPreRecordedTranscriptionConfig = {
  kind: "deepgram-pre-recorded";
  endpointBase: string;
  defaultModel: string;
};

export type DeepInfraInferenceTranscriptionConfig = {
  kind: "deepinfra-inference";
  endpointBase: string;
  defaultModel: string;
};

export type FireworksPreRecordedTranscriptionConfig = {
  kind: "fireworks-pre-recorded";
  defaultModel: string;
};

export type FireworksStreamingTranscriptionConfig = {
  kind: "fireworks-streaming";
  endpoint: string;
  defaultModel: string;
};

export type FishAudioTranscriptionConfig = {
  kind: "fish-audio";
  endpoint: string;
  defaultModel: string;
};

export type HuggingFaceJsonTranscriptionConfig = {
  kind: "huggingface-json";
  endpointBase: string;
  defaultModel: string;
};

export type IbmWatsonxTranscriptionConfig = {
  kind: "ibm-watsonx";
  defaultModel: string;
};

export type NovitaJsonTranscriptionConfig = {
  kind: "novita-json";
  endpoint: string;
  defaultModel: string;
};

export type ElevenLabsTranscriptionConfig = {
  kind: "elevenlabs";
  endpoint: string;
  defaultModel: string;
};

export type ElevenLabsRealtimeTranscriptionConfig = {
  kind: "elevenlabs-realtime";
  endpoint: string;
  defaultModel: string;
};

export type VolcengineFileAsrTranscriptionConfig = {
  kind: "volcengine-file-asr";
  defaultModel: string;
};

export type GeminiTranscriptionConfig = {
  kind: "gemini";
  endpointBase: string;
  defaultModel: string;
};

export type ReplicateTranscriptionConfig = {
  kind: "replicate";
  defaultModel: string;
};

export type StepfunRealtimeTranscriptionConfig = {
  kind: "stepfun-realtime";
  endpoint: string;
  defaultModel: string;
};

export type XaiVoiceAgentTranscriptionConfig = {
  kind: "xai-voice-agent";
  endpoint: string;
  defaultModel: string;
};

export type ProviderSttConfig =
  | MultipartTranscriptionConfig
  | GeminiTranscriptionConfig
  | OpenAiAudioInputTranscriptionConfig
  | AzureOpenAiTranscriptionConfig
  | AlephAlphaTranscriptionConfig
  | BaiduShortSpeechTranscriptionConfig
  | BaiduRealtimeTranscriptionConfig
  | AssemblyAiPreRecordedTranscriptionConfig
  | AssemblyAiRealtimeTranscriptionConfig
  | DashScopeRealtimeTranscriptionConfig
  | DeepgramPreRecordedTranscriptionConfig
  | DeepInfraInferenceTranscriptionConfig
  | FireworksPreRecordedTranscriptionConfig
  | FireworksStreamingTranscriptionConfig
  | FishAudioTranscriptionConfig
  | HuggingFaceJsonTranscriptionConfig
  | IbmWatsonxTranscriptionConfig
  | NovitaJsonTranscriptionConfig
  | ReplicateTranscriptionConfig
  | ElevenLabsTranscriptionConfig
  | ElevenLabsRealtimeTranscriptionConfig
  | StepfunRealtimeTranscriptionConfig
  | VolcengineFileAsrTranscriptionConfig
  | XaiVoiceAgentTranscriptionConfig;

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

function buildConfigForTransport(params: {
  provider: Provider;
  transport: RuntimeSttTransport;
  endpoint?: string;
  endpointBase?: string;
  defaultModel: string;
  languageHintKey?: string;
}): ProviderSttConfig | null {
  switch (params.transport) {
    case "multipart":
      return params.endpoint
        ? {
            kind: "multipart",
            endpoint: params.endpoint,
            defaultModel: params.defaultModel,
            ...(params.languageHintKey
              ? { languageHint: getLanguageHint(params.languageHintKey) }
              : {}),
          }
        : null;
    case "aleph-alpha":
      return {
        kind: "aleph-alpha",
        defaultModel: params.defaultModel,
      };
    case "assemblyai-pre-recorded":
      return params.endpointBase
        ? {
            kind: "assemblyai-pre-recorded",
            endpointBase: params.endpointBase,
            defaultModel: params.defaultModel,
          }
        : null;
    case "assemblyai-realtime":
      return params.endpoint
        ? {
            kind: "assemblyai-realtime",
            endpoint: params.endpoint,
            defaultModel: params.defaultModel,
          }
        : null;
    case "azure-openai":
      return {
        kind: "azure-openai",
        defaultModel: params.defaultModel,
      };
    case "baidu-short-speech":
      return {
        kind: "baidu-short-speech",
        defaultModel: params.defaultModel,
      };
    case "baidu-realtime":
      return params.endpoint
        ? {
            kind: "baidu-realtime",
            endpoint: params.endpoint,
            defaultModel: params.defaultModel,
          }
        : null;
    case "dashscope-realtime":
      return params.endpoint
        ? {
            kind: "dashscope-realtime",
            endpoint: params.endpoint,
            defaultModel: params.defaultModel,
          }
        : null;
    case "deepgram-pre-recorded":
      return params.endpointBase
        ? {
            kind: "deepgram-pre-recorded",
            endpointBase: params.endpointBase,
            defaultModel: params.defaultModel,
          }
        : null;
    case "deepinfra-inference":
      return params.endpointBase
        ? {
            kind: "deepinfra-inference",
            endpointBase: params.endpointBase,
            defaultModel: params.defaultModel,
          }
        : null;
    case "elevenlabs":
      return params.endpoint
        ? {
            kind: "elevenlabs",
            endpoint: params.endpoint,
            defaultModel: params.defaultModel,
          }
        : null;
    case "elevenlabs-realtime":
      return params.endpoint
        ? {
            kind: "elevenlabs-realtime",
            endpoint: params.endpoint,
            defaultModel: params.defaultModel,
          }
        : null;
    case "fireworks-pre-recorded":
      return {
        kind: "fireworks-pre-recorded",
        defaultModel: params.defaultModel,
      };
    case "fireworks-streaming":
      return params.endpoint
        ? {
            kind: "fireworks-streaming",
            endpoint: params.endpoint,
            defaultModel: params.defaultModel,
          }
        : null;
    case "fish-audio":
      return params.endpoint
        ? {
            kind: "fish-audio",
            endpoint: params.endpoint,
            defaultModel: params.defaultModel,
          }
        : null;
    case "gemini":
      return params.endpointBase
        ? {
            kind: "gemini",
            endpointBase: params.endpointBase,
            defaultModel: params.defaultModel,
          }
        : null;
    case "huggingface-json":
      return params.endpointBase
        ? {
            kind: "huggingface-json",
            endpointBase: params.endpointBase,
            defaultModel: params.defaultModel,
          }
        : null;
    case "ibm-watsonx":
      return {
        kind: "ibm-watsonx",
        defaultModel: params.defaultModel,
      };
    case "novita-json":
      return params.endpoint
        ? {
            kind: "novita-json",
            endpoint: params.endpoint,
            defaultModel: params.defaultModel,
          }
        : null;
    case "openai-audio-input":
      return params.endpoint
        ? {
            kind: "openai-audio-input",
            endpoint: params.endpoint,
            defaultModel: params.defaultModel,
          }
        : null;
    case "replicate":
      return {
        kind: "replicate",
        defaultModel: params.defaultModel,
      };
    case "stepfun-realtime":
      return params.endpoint
        ? {
            kind: "stepfun-realtime",
            endpoint: params.endpoint,
            defaultModel: params.defaultModel,
          }
        : null;
    case "volcengine-file-asr":
      return {
        kind: "volcengine-file-asr",
        defaultModel: params.defaultModel,
      };
    case "xai-voice-agent":
      return params.endpoint
        ? {
            kind: "xai-voice-agent",
            endpoint: params.endpoint,
            defaultModel: params.defaultModel,
          }
        : null;
    default:
      return null;
  }
}

export function getProviderSttConfig(
  provider: Provider,
  model: string,
): ProviderSttConfig | null {
  const manifest = RUNTIME_PROVIDER_MANIFEST[provider];

  if (!manifest || manifest.stt.support !== "provider") {
    return null;
  }

  const isRealtimeModel = manifest.stt.realtimeModelIds?.includes(model) ?? false;
  const transport = isRealtimeModel
    ? manifest.stt.realtimeTransport ?? manifest.stt.transport
    : manifest.stt.transport;
  const defaultModel = isRealtimeModel
    ? model
    : manifest.stt.defaultModel ?? model;
  const endpoint = isRealtimeModel
    ? manifest.stt.realtimeEndpointByModel?.[model] ??
      manifest.stt.realtimeEndpoint ??
      manifest.stt.endpoint
    : manifest.stt.endpoint;
  const endpointBase = isRealtimeModel
    ? manifest.stt.realtimeEndpointBase ?? manifest.stt.endpointBase
    : manifest.stt.endpointBase;

  if (!defaultModel) {
    return null;
  }

  return buildConfigForTransport({
    provider,
    transport,
    endpoint,
    endpointBase,
    defaultModel,
    languageHintKey: manifest.stt.languageHintKey,
  });
}
