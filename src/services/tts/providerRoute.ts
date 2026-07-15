import { PROVIDER_LABELS } from "../../constants/models";
import { RuntimeTtsBinaryRequestFormat } from "../../constants/providers/runtimeManifest";
import { translate } from "../../i18n";
import { AppLanguage, Provider } from "../../types";

import {
  buildTtsRequestError,
  buildWavAudioFileFromPcm,
  createTtsTimeoutError,
  fetchWithTimeout,
  getGeminiAudioPart,
  getProviderTtsTimeoutMs,
  getSelectedProviderModel,
  getSelectedProviderVoice,
  requireProviderKey,
  TTS_PROVIDER_CONFIGS,
  TtsRequestError,
  TtsTimeoutError,
  writeBlobAudioFile,
} from "./shared";

const TTS_RETRY_DELAYS_MS = [400, 1200];

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

function isRetryableTtsTransportError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  if (error.name === "AbortError") {
    return false;
  }

  if (error instanceof TtsTimeoutError) {
    return true;
  }

  if (error instanceof TtsRequestError) {
    return error.status === 429 || error.status >= 500;
  }

  const normalized = error.message.toLowerCase();

  return (
    normalized.includes("network request failed") ||
    normalized.includes("failed to fetch") ||
    normalized.includes("load failed")
  );
}

async function withTransientTtsRetries<T>(request: () => Promise<T>) {
  for (let attempt = 0; attempt <= TTS_RETRY_DELAYS_MS.length; attempt += 1) {
    try {
      return await request();
    } catch (error) {
      const retryLimit =
        error instanceof TtsTimeoutError ? 1 : TTS_RETRY_DELAYS_MS.length;
      const shouldRetry =
        attempt < retryLimit &&
        isRetryableTtsTransportError(error);

      if (!shouldRetry) {
        throw error;
      }

      await wait(TTS_RETRY_DELAYS_MS[attempt]);
    }
  }

  throw new Error("Speech synthesis retry loop ended unexpectedly.");
}

async function fetchTtsWithRetries(params: {
  abortSignal?: AbortSignal;
  init: RequestInit;
  input: RequestInfo | URL;
  language: AppLanguage;
  provider: Provider;
  timeoutMs: number;
}) {
  return withTransientTtsRetries(async () => {
    const response = await fetchWithTimeout(
      params.input,
      params.init,
      params.timeoutMs,
      () =>
        createTtsTimeoutError({
          provider: params.provider,
          language: params.language,
        }),
      params.abortSignal,
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw buildTtsRequestError({
        provider: params.provider,
        status: response.status,
        errorText,
        language: params.language,
      });
    }

    return response;
  });
}

function buildBinaryTtsRequestBody(params: {
  requestFormat: RuntimeTtsBinaryRequestFormat;
  selectedModel: string;
  selectedVoice: string;
  text: string;
}) {
  switch (params.requestFormat) {
    case "grok-speech":
      return {
        text: params.text,
        voice_id: params.selectedVoice,
        language: "auto",
      };
    case "openai-speech":
    default:
      return {
        model: params.selectedModel,
        voice: params.selectedVoice,
        input: params.text,
        response_format: "mp3",
      };
  }
}

function getBinaryTtsFileExtension(
  _requestFormat: RuntimeTtsBinaryRequestFormat,
): "mp3" | "wav" {
  return "mp3";
}

function getDashScopeAudioUrl(data: any) {
  const url = data?.output?.audio?.url;
  return typeof url === "string" ? url : null;
}

function getBinaryTtsVoice(params: {
  requestFormat: RuntimeTtsBinaryRequestFormat;
  selectedModel: string;
  selectedVoice: string;
}) {
  return params.selectedVoice;
}

export async function synthesizeProviderSpeech(params: {
  text: string;
  voice: string;
  provider: Provider;
  providerModel?: string;
  apiKey?: string;
  language: AppLanguage;
  abortSignal?: AbortSignal;
}) {
  const {
    text,
    voice,
    provider,
    providerModel,
    apiKey,
    language,
    abortSignal,
  } = params;
  const config = TTS_PROVIDER_CONFIGS[provider];
  const timeoutMs = getProviderTtsTimeoutMs(text, provider);

  if (!config) {
    throw new Error(
      translate(language, "ttsNotSupportedYet", {
        provider: PROVIDER_LABELS[provider],
      }),
    );
  }

  const selectedVoice = getSelectedProviderVoice({
    provider,
    requestedVoice: voice,
    config,
  });
  const selectedModel = getSelectedProviderModel({
    provider,
    providerModel,
    config,
  });

  if (config.kind === "gemini") {
    const response = await fetchTtsWithRetries({
      input: `${config.endpointBase}/${selectedModel}:generateContent`,
      init: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": requireProviderKey(provider, apiKey, language),
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Read the following text aloud exactly as written without adding or removing words:\n\n${text}`,
                },
              ],
            },
          ],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: selectedVoice,
                },
              },
            },
          },
        }),
      },
      timeoutMs,
      provider,
      language,
      abortSignal,
    });

    const data = await response.json();
    const audioPart = getGeminiAudioPart(data);
    const pcmBase64 = audioPart?.data;

    if (!pcmBase64) {
      throw new Error(
        translate(language, "ttsDidNotReturnAudio", {
          provider: PROVIDER_LABELS[provider],
        }),
      );
    }

    const mimeType = audioPart?.mimeType as string | undefined;
    const sampleRate = Number(mimeType?.match(/rate=(\d+)/i)?.[1]) || 24000;
    return buildWavAudioFileFromPcm({
      pcmBase64,
      sampleRate,
      language,
    });
  }

  if (config.kind === "dashscope") {
    const response = await fetchTtsWithRetries({
      input: config.endpoint,
      init: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${requireProviderKey(provider, apiKey, language)}`,
        },
        body: JSON.stringify({
          model: selectedModel,
          input: {
            text,
            voice: selectedVoice,
          },
        }),
      },
      timeoutMs,
      provider,
      language,
      abortSignal,
    });

    const data = await response.json();
    const audioUrl = getDashScopeAudioUrl(data);

    if (!audioUrl) {
      throw new Error(
        translate(language, "ttsDidNotReturnAudio", {
          provider: PROVIDER_LABELS[provider],
        }),
      );
    }

    const audioResponse = await fetchTtsWithRetries({
      input: audioUrl,
      init: {
        method: "GET",
      },
      timeoutMs,
      provider,
      language,
      abortSignal,
    });

    return writeBlobAudioFile(await audioResponse.blob(), "wav");
  }

  const endpoint = config.endpoint;
  const authorizationKey = requireProviderKey(provider, apiKey, language);
  const resolvedVoice = getBinaryTtsVoice({
    requestFormat: config.requestFormat,
    selectedModel,
    selectedVoice,
  });

  const requestBody = buildBinaryTtsRequestBody({
    requestFormat: config.requestFormat,
    selectedModel,
    selectedVoice: resolvedVoice,
    text,
  });

  const response = await fetchTtsWithRetries({
    input: endpoint,
    init: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authorizationKey}`,
      },
      body: JSON.stringify(requestBody),
    },
    timeoutMs,
    provider,
    language,
    abortSignal,
  });

  return writeBlobAudioFile(
    await response.blob(),
    getBinaryTtsFileExtension(config.requestFormat),
  );
}
