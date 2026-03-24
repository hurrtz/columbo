import { PROVIDER_LABELS } from "../../constants/models";
import { RuntimeTtsBinaryRequestFormat } from "../../constants/providers/runtimeManifest";
import { translate } from "../../i18n";
import { AppLanguage, Provider } from "../../types";
import { getTogetherTtsLanguageCode } from "../../utils/speechLanguage";

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

const GEMINI_TTS_RETRY_DELAYS_MS = [400, 1200];

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

function isRetryableGeminiTransportError(error: unknown) {
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

function buildBinaryTtsRequestBody(params: {
  requestFormat: RuntimeTtsBinaryRequestFormat;
  selectedModel: string;
  selectedVoice: string;
  text: string;
}) {
  switch (params.requestFormat) {
    case "together-speech":
      return {
        model: params.selectedModel,
        voice: params.selectedVoice,
        input: params.text,
        response_format: "mp3",
        language: getTogetherTtsLanguageCode(params.text),
      };
    case "xai-speech":
      return {
        model: params.selectedModel,
        text: params.text,
        voice_id: params.selectedVoice,
        language: "auto",
        output_format: {
          codec: "mp3",
          sample_rate: 24000,
          bit_rate: 128000,
        },
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

function getDashScopeAudioUrl(data: any) {
  const url = data?.output?.audio?.url;
  return typeof url === "string" ? url : null;
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
  const timeoutMs = getProviderTtsTimeoutMs(text);

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
    for (let attempt = 0; attempt <= GEMINI_TTS_RETRY_DELAYS_MS.length; attempt += 1) {
      try {
        const response = await fetchWithTimeout(
          `${config.endpointBase}/${selectedModel}:generateContent`,
          {
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
          () => createTtsTimeoutError({ provider, language }),
          abortSignal,
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw buildTtsRequestError({
            provider,
            status: response.status,
            errorText,
            language,
          });
        }

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
      } catch (error) {
        const shouldRetry =
          attempt < GEMINI_TTS_RETRY_DELAYS_MS.length &&
          isRetryableGeminiTransportError(error);

        if (!shouldRetry) {
          throw error;
        }

        await wait(GEMINI_TTS_RETRY_DELAYS_MS[attempt]);
      }
    }

    throw createTtsTimeoutError({ provider, language });
  }

  if (config.kind === "dashscope") {
    const response = await fetchWithTimeout(
      config.endpoint,
      {
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
      () => createTtsTimeoutError({ provider, language }),
      abortSignal,
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw buildTtsRequestError({
        provider,
        status: response.status,
        errorText,
        language,
      });
    }

    const data = await response.json();
    const audioUrl = getDashScopeAudioUrl(data);

    if (!audioUrl) {
      throw new Error(
        translate(language, "ttsDidNotReturnAudio", {
          provider: PROVIDER_LABELS[provider],
        }),
      );
    }

    const audioResponse = await fetchWithTimeout(
      audioUrl,
      {
        method: "GET",
      },
      timeoutMs,
      () => createTtsTimeoutError({ provider, language }),
      abortSignal,
    );

    if (!audioResponse.ok) {
      const errorText = await audioResponse.text();
      throw buildTtsRequestError({
        provider,
        status: audioResponse.status,
        errorText,
        language,
      });
    }

    return writeBlobAudioFile(await audioResponse.blob(), "wav");
  }

  const requestBody = buildBinaryTtsRequestBody({
    requestFormat: config.requestFormat,
    selectedModel,
    selectedVoice,
    text,
  });

  const response = await fetchWithTimeout(
    config.endpoint,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${requireProviderKey(provider, apiKey, language)}`,
      },
      body: JSON.stringify(requestBody),
    },
    timeoutMs,
    () => createTtsTimeoutError({ provider, language }),
    abortSignal,
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw buildTtsRequestError({
      provider,
      status: response.status,
      errorText,
      language,
    });
  }

  return writeBlobAudioFile(await response.blob());
}
