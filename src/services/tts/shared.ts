import * as FileSystem from "expo-file-system/legacy";

import {
  PROVIDER_DEFAULT_TTS_MODELS,
  PROVIDER_DEFAULT_TTS_VOICES,
  PROVIDER_LABELS,
} from "../../constants/models";
import {
  RUNTIME_PROVIDER_MANIFEST,
  RuntimeTtsBinaryRequestFormat,
} from "../../constants/providers/runtimeManifest";
import { translate } from "../../i18n";
import { AppLanguage, Provider } from "../../types";
import { extractProviderErrorMessage } from "../providerErrors";

export const PROVIDER_TTS_MAX_INPUT_CHARS = 3500;
export const LOCAL_TTS_MAX_INPUT_CHARS = 420;
export const PROVIDER_TTS_TIMEOUT_MS = 15000;
export const PROVIDER_TTS_TIMEOUT_MS_PER_CHAR = 10;
export const PROVIDER_TTS_MAX_TIMEOUT_MS = 60000;

export class TtsRequestError extends Error {
  readonly provider: Provider;
  readonly status: number;
  readonly inputTooLong: boolean;

  constructor(params: {
    message: string;
    provider: Provider;
    status: number;
    inputTooLong: boolean;
  }) {
    super(params.message);
    this.name = "TtsRequestError";
    this.provider = params.provider;
    this.status = params.status;
    this.inputTooLong = params.inputTooLong;
  }
}

export class TtsTimeoutError extends Error {
  readonly provider: Provider;

  constructor(params: { message: string; provider: Provider }) {
    super(params.message);
    this.name = "TtsTimeoutError";
    this.provider = params.provider;
  }
}

type BinaryTtsConfig = {
  kind: "binary";
  endpoint: string;
  requestFormat: RuntimeTtsBinaryRequestFormat;
  defaultModel: string;
  voiceFallback: string;
};

type AzureOpenAiTtsConfig = {
  kind: "azure-openai";
  defaultModel: string;
  voiceFallback: string;
};

type BaiduTtsConfig = {
  kind: "baidu";
  endpoint: string;
  defaultModel: string;
  voiceFallback: string;
};

type GeminiTtsConfig = {
  kind: "gemini";
  endpointBase: string;
  defaultModel: string;
  voiceFallback: string;
};

type DashScopeTtsConfig = {
  kind: "dashscope";
  endpoint: string;
  defaultModel: string;
  voiceFallback: string;
};

type DeepgramTtsConfig = {
  kind: "deepgram";
  endpointBase: string;
  defaultModel: string;
  voiceFallback: string;
};

type DeepInfraTtsConfig = {
  kind: "deepinfra";
  endpointBase: string;
  defaultModel: string;
  voiceFallback: string;
};

type FishAudioTtsConfig = {
  kind: "fish-audio";
  endpoint: string;
  defaultModel: string;
};

type HyperbolicTtsConfig = {
  kind: "hyperbolic";
  endpoint: string;
  defaultModel: string;
  voiceFallback: string;
};

type IbmWatsonxTtsConfig = {
  kind: "ibm-watsonx";
  defaultModel: string;
  voiceFallback: string;
};

type MinimaxTtsConfig = {
  kind: "minimax";
  endpoint: string;
  defaultModel: string;
  voiceFallback: string;
};

type NovitaTtsConfig = {
  kind: "novita";
  endpointBase: string;
  defaultModel: string;
  voiceFallback: string;
};

type ReplicateTtsConfig = {
  kind: "replicate";
  defaultModel: string;
  voiceFallback: string;
};

type ElevenLabsTtsConfig = {
  kind: "elevenlabs";
  endpointBase: string;
  defaultModel: string;
  voiceFallback: string;
};

export type ProviderTtsConfig =
  | BinaryTtsConfig
  | AzureOpenAiTtsConfig
  | BaiduTtsConfig
  | GeminiTtsConfig
  | DashScopeTtsConfig
  | DeepInfraTtsConfig
  | DeepgramTtsConfig
  | FishAudioTtsConfig
  | HyperbolicTtsConfig
  | IbmWatsonxTtsConfig
  | MinimaxTtsConfig
  | NovitaTtsConfig
  | ReplicateTtsConfig
  | ElevenLabsTtsConfig;

const ttsProviderConfigEntries: Array<[Provider, ProviderTtsConfig]> = [];

for (const provider of Object.keys(RUNTIME_PROVIDER_MANIFEST) as Provider[]) {
  const manifest = RUNTIME_PROVIDER_MANIFEST[provider];

  if (
    manifest.tts.transport === "azure-openai" &&
    manifest.tts.defaultModel &&
    manifest.tts.voiceFallback
  ) {
    ttsProviderConfigEntries.push([
      provider,
      {
        kind: "azure-openai",
        defaultModel: manifest.tts.defaultModel,
        voiceFallback: manifest.tts.voiceFallback,
      },
    ]);
  }

  if (
    manifest.tts.transport === "binary" &&
    manifest.tts.endpoint &&
    manifest.tts.requestFormat &&
    manifest.tts.defaultModel &&
    manifest.tts.voiceFallback
  ) {
    ttsProviderConfigEntries.push([
      provider,
      {
        kind: "binary",
        endpoint: manifest.tts.endpoint,
        requestFormat: manifest.tts.requestFormat,
        defaultModel: manifest.tts.defaultModel,
        voiceFallback: manifest.tts.voiceFallback,
      },
    ]);
  }

  if (
    manifest.tts.transport === "baidu" &&
    manifest.tts.endpoint &&
    manifest.tts.defaultModel &&
    manifest.tts.voiceFallback
  ) {
    ttsProviderConfigEntries.push([
      provider,
      {
        kind: "baidu",
        endpoint: manifest.tts.endpoint,
        defaultModel: manifest.tts.defaultModel,
        voiceFallback: manifest.tts.voiceFallback,
      },
    ]);
  }

  if (
    manifest.tts.transport === "dashscope" &&
    manifest.tts.endpoint &&
    manifest.tts.defaultModel &&
    manifest.tts.voiceFallback
  ) {
    ttsProviderConfigEntries.push([
      provider,
      {
        kind: "dashscope",
        endpoint: manifest.tts.endpoint,
        defaultModel: manifest.tts.defaultModel,
        voiceFallback: manifest.tts.voiceFallback,
      },
    ]);
  }

  if (
    manifest.tts.transport === "deepinfra" &&
    manifest.tts.endpointBase &&
    manifest.tts.defaultModel &&
    manifest.tts.voiceFallback
  ) {
    ttsProviderConfigEntries.push([
      provider,
      {
        kind: "deepinfra",
        endpointBase: manifest.tts.endpointBase,
        defaultModel: manifest.tts.defaultModel,
        voiceFallback: manifest.tts.voiceFallback,
      },
    ]);
  }

  if (
    manifest.tts.transport === "deepgram" &&
    manifest.tts.endpointBase &&
    manifest.tts.defaultModel &&
    manifest.tts.voiceFallback
  ) {
    ttsProviderConfigEntries.push([
      provider,
      {
        kind: "deepgram",
        endpointBase: manifest.tts.endpointBase,
        defaultModel: manifest.tts.defaultModel,
        voiceFallback: manifest.tts.voiceFallback,
      },
    ]);
  }

  if (
    manifest.tts.transport === "fish-audio" &&
    manifest.tts.endpoint &&
    manifest.tts.defaultModel
  ) {
    ttsProviderConfigEntries.push([
      provider,
      {
        kind: "fish-audio",
        endpoint: manifest.tts.endpoint,
        defaultModel: manifest.tts.defaultModel,
      },
    ]);
  }

  if (
    manifest.tts.transport === "hyperbolic" &&
    manifest.tts.endpoint &&
    manifest.tts.defaultModel &&
    manifest.tts.voiceFallback
  ) {
    ttsProviderConfigEntries.push([
      provider,
      {
        kind: "hyperbolic",
        endpoint: manifest.tts.endpoint,
        defaultModel: manifest.tts.defaultModel,
        voiceFallback: manifest.tts.voiceFallback,
      },
    ]);
  }

  if (
    manifest.tts.transport === "ibm-watsonx" &&
    manifest.tts.defaultModel &&
    manifest.tts.voiceFallback
  ) {
    ttsProviderConfigEntries.push([
      provider,
      {
        kind: "ibm-watsonx",
        defaultModel: manifest.tts.defaultModel,
        voiceFallback: manifest.tts.voiceFallback,
      },
    ]);
  }

  if (
    manifest.tts.transport === "minimax" &&
    manifest.tts.endpoint &&
    manifest.tts.defaultModel &&
    manifest.tts.voiceFallback
  ) {
    ttsProviderConfigEntries.push([
      provider,
      {
        kind: "minimax",
        endpoint: manifest.tts.endpoint,
        defaultModel: manifest.tts.defaultModel,
        voiceFallback: manifest.tts.voiceFallback,
      },
    ]);
  }

  if (
    manifest.tts.transport === "novita" &&
    manifest.tts.endpointBase &&
    manifest.tts.defaultModel &&
    manifest.tts.voiceFallback
  ) {
    ttsProviderConfigEntries.push([
      provider,
      {
        kind: "novita",
        endpointBase: manifest.tts.endpointBase,
        defaultModel: manifest.tts.defaultModel,
        voiceFallback: manifest.tts.voiceFallback,
      },
    ]);
  }

  if (
    manifest.tts.transport === "replicate" &&
    manifest.tts.defaultModel &&
    manifest.tts.voiceFallback
  ) {
    ttsProviderConfigEntries.push([
      provider,
      {
        kind: "replicate",
        defaultModel: manifest.tts.defaultModel,
        voiceFallback: manifest.tts.voiceFallback,
      },
    ]);
  }

  if (
    manifest.tts.transport === "elevenlabs" &&
    manifest.tts.endpointBase &&
    manifest.tts.defaultModel &&
    manifest.tts.voiceFallback
  ) {
    ttsProviderConfigEntries.push([
      provider,
      {
        kind: "elevenlabs",
        endpointBase: manifest.tts.endpointBase,
        defaultModel: manifest.tts.defaultModel,
        voiceFallback: manifest.tts.voiceFallback,
      },
    ]);
  }

  if (
    manifest.tts.transport === "gemini" &&
    manifest.tts.endpointBase &&
    manifest.tts.defaultModel &&
    manifest.tts.voiceFallback
  ) {
    ttsProviderConfigEntries.push([
      provider,
      {
        kind: "gemini",
        endpointBase: manifest.tts.endpointBase,
        defaultModel: manifest.tts.defaultModel,
        voiceFallback: manifest.tts.voiceFallback,
      },
    ]);
  }
}

export const TTS_PROVIDER_CONFIGS: Partial<Record<Provider, ProviderTtsConfig>> =
  Object.fromEntries(ttsProviderConfigEntries);

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

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      resolve(dataUrl.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function bytesToBase64(bytes: Uint8Array, language: AppLanguage) {
  const BufferCtor = (globalThis as any).Buffer;

  if (BufferCtor) {
    return BufferCtor.from(bytes).toString("base64");
  }

  let binary = "";
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }

  if (typeof btoa !== "undefined") {
    return btoa(binary);
  }

  throw new Error(translate(language, "noBase64EncoderAvailable"));
}

function base64ToBytes(base64: string, language: AppLanguage) {
  const BufferCtor = (globalThis as any).Buffer;

  if (BufferCtor) {
    return new Uint8Array(BufferCtor.from(base64, "base64"));
  }

  if (typeof atob !== "undefined") {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    return bytes;
  }

  throw new Error(translate(language, "noBase64DecoderAvailable"));
}

function buildWavBase64FromPcm(params: {
  pcmBase64: string;
  sampleRate: number;
  language: AppLanguage;
}) {
  const pcmData = base64ToBytes(params.pcmBase64, params.language);
  const wavHeader = new ArrayBuffer(44);
  const view = new DataView(wavHeader);
  const dataLength = pcmData.length;

  view.setUint32(0, 0x52494646, false);
  view.setUint32(4, 36 + dataLength, true);
  view.setUint32(8, 0x57415645, false);
  view.setUint32(12, 0x666d7420, false);
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, params.sampleRate, true);
  view.setUint32(28, params.sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  view.setUint32(36, 0x64617461, false);
  view.setUint32(40, dataLength, true);

  const wavBytes = new Uint8Array(44 + dataLength);
  wavBytes.set(new Uint8Array(wavHeader), 0);
  wavBytes.set(pcmData, 44);
  return bytesToBase64(wavBytes, params.language);
}

export async function writeBase64AudioFile(
  base64: string,
  extension: "mp3" | "wav",
) {
  const path = `${FileSystem.cacheDirectory}tts-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${extension}`;
  await FileSystem.writeAsStringAsync(path, base64, {
    encoding: FileSystem.EncodingType?.Base64 ?? ("base64" as never),
  });
  return path;
}

export function getGeminiAudioPart(data: any) {
  const parts = data?.candidates?.[0]?.content?.parts;

  if (!Array.isArray(parts)) {
    return null;
  }

  return parts.find((part) => part?.inlineData?.data)?.inlineData ?? null;
}

function isInputTooLongError(errorText: string) {
  const normalized = errorText.toLowerCase();
  return (
    normalized.includes("too long") ||
    normalized.includes("at most") ||
    normalized.includes("maximum context length") ||
    normalized.includes("context_length_exceeded") ||
    normalized.includes("max tokens")
  );
}

export function buildTtsRequestError(params: {
  provider: Provider;
  status: number;
  errorText: string;
  language: AppLanguage;
}) {
  const normalizedMessage = extractProviderErrorMessage(params.errorText);
  const inputTooLong = isInputTooLongError(
    `${normalizedMessage} ${params.errorText}`,
  );

  return new TtsRequestError({
    provider: params.provider,
    status: params.status,
    inputTooLong,
    message: inputTooLong
      ? translate(params.language, "ttsReplyTooLong", {
          provider: PROVIDER_LABELS[params.provider],
        })
      : translate(params.language, "ttsError", {
          provider: PROVIDER_LABELS[params.provider],
          status: params.status,
          errorText: normalizedMessage,
        }),
  });
}

export function createTtsTimeoutError(params: {
  provider: Provider;
  language: AppLanguage;
}) {
  return new TtsTimeoutError({
    provider: params.provider,
    message: translate(params.language, "ttsTimeout", {
      provider: PROVIDER_LABELS[params.provider],
    }),
  });
}

export function getProviderTtsTimeoutMs(text: string) {
  const normalizedLength = text.trim().length;

  return Math.min(
    PROVIDER_TTS_MAX_TIMEOUT_MS,
    PROVIDER_TTS_TIMEOUT_MS +
      normalizedLength * PROVIDER_TTS_TIMEOUT_MS_PER_CHAR,
  );
}

export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit,
  timeoutMs: number,
  onTimeout: () => Error,
  abortSignal?: AbortSignal,
) {
  const controller = new AbortController();
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  const handleCallerAbort = () => {
    controller.abort();
  };

  if (abortSignal) {
    if (abortSignal.aborted) {
      controller.abort();
    } else {
      abortSignal.addEventListener("abort", handleCallerAbort);
    }
  }
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      controller.abort();
      reject(onTimeout());
    }, timeoutMs);
  });

  const fetchPromise = fetch(input, {
    ...init,
    signal: controller.signal,
  }).catch((error) => {
    if (
      error instanceof Error &&
      (error.name === "AbortError" ||
        error.message.toLowerCase().includes("aborted"))
    ) {
      if (abortSignal?.aborted) {
        const abortError = new Error("TTS request aborted.");
        abortError.name = "AbortError";
        throw abortError;
      }
      throw onTimeout();
    }

    throw error;
  });

  try {
    return await Promise.race([fetchPromise, timeoutPromise]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    abortSignal?.removeEventListener("abort", handleCallerAbort);
  }
}

export async function writeBlobAudioFile(
  blob: Blob,
  extension: "mp3" | "wav" = "mp3",
) {
  return writeBase64AudioFile(await blobToBase64(blob), extension);
}

export function buildWavAudioFileFromPcm(params: {
  pcmBase64: string;
  sampleRate: number;
  language: AppLanguage;
}) {
  return writeBase64AudioFile(buildWavBase64FromPcm(params), "wav");
}

export function getSelectedProviderVoice(params: {
  provider: Provider;
  requestedVoice: string;
  config: ProviderTtsConfig;
}) {
  const configVoiceFallback =
    "voiceFallback" in params.config ? params.config.voiceFallback : "";

  return (
    params.requestedVoice ||
    configVoiceFallback ||
    PROVIDER_DEFAULT_TTS_VOICES[params.provider] ||
    ""
  );
}

export function getSelectedProviderModel(params: {
  provider: Provider;
  providerModel?: string;
  config: ProviderTtsConfig;
}) {
  return (
    params.providerModel ||
    PROVIDER_DEFAULT_TTS_MODELS[params.provider] ||
    params.config.defaultModel
  );
}
