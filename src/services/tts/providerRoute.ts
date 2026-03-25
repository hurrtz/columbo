import { PROVIDER_LABELS } from "../../constants/models";
import { RuntimeTtsBinaryRequestFormat } from "../../constants/providers/runtimeManifest";
import { translate } from "../../i18n";
import { AppLanguage, Provider } from "../../types";
import { getTogetherTtsLanguageCode } from "../../utils/speechLanguage";
import {
  buildBasicAuthorizationHeader,
  buildAzureOpenAiUrl,
  parseIbmWatsonxCredentials,
  parseAzureOpenAiCredentials,
} from "../providerCredentials";
import {
  getReplicateInputProperty,
  getReplicateModelMetadata,
  runReplicatePrediction,
} from "../replicate/runtime";

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
  writeBase64AudioFile,
  writeBlobAudioFile,
} from "./shared";

const GEMINI_TTS_RETRY_DELAYS_MS = [400, 1200];
const BAIDU_LONG_TTS_POLL_INTERVAL_MS = 1000;
const BAIDU_LONG_TTS_MAX_POLLS = 30;
const NOVITA_ASYNC_TTS_POLL_INTERVAL_MS = 1000;
const NOVITA_ASYNC_TTS_MAX_POLLS = 30;

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
    case "groq-speech":
      return {
        model: params.selectedModel,
        voice: params.selectedVoice,
        input: params.text,
        response_format: "wav",
      };
    case "siliconflow-speech":
      return {
        model: params.selectedModel,
        ...(!params.selectedModel.startsWith("IndexTeam/")
          ? {
              voice: params.selectedVoice,
            }
          : {}),
        input: params.text,
        response_format: "mp3",
        stream: false,
        sample_rate: 44100,
      };
    case "novita-glm-speech":
      return {
        input: params.text,
        voice: params.selectedVoice,
        speed: 1,
        volume: 1,
        response_format: "wav",
      };
    case "zai-speech":
      return {
        model: params.selectedModel,
        voice: params.selectedVoice,
        input: params.text,
        response_format: "wav",
        stream: false,
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

function getBinaryTtsFileExtension(requestFormat: RuntimeTtsBinaryRequestFormat) {
  return requestFormat === "groq-speech" ||
    requestFormat === "novita-glm-speech" ||
    requestFormat === "zai-speech"
    ? "wav"
    : "mp3";
}

function getDashScopeAudioUrl(data: any) {
  const url = data?.output?.audio?.url;
  return typeof url === "string" ? url : null;
}

function getReplicateAudioUrl(output: unknown) {
  if (typeof output === "string") {
    return output;
  }

  if (Array.isArray(output)) {
    return output.find((value) => typeof value === "string") ?? null;
  }

  if (
    typeof output === "object" &&
    output !== null &&
    typeof (output as any).url === "string"
  ) {
    return (output as any).url;
  }

  return null;
}

function getDeepgramVoiceModel(selectedModel: string, selectedVoice: string) {
  if (selectedModel === "aura-2") {
    return selectedVoice.startsWith("aura-2-")
      ? selectedVoice
      : "aura-2-thalia-en";
  }

  if (selectedModel === "aura-1") {
    return selectedVoice.startsWith("aura-2-") ? "aura-asteria-en" : selectedVoice;
  }

  return selectedVoice || "aura-asteria-en";
}

const TOGETHER_KOKORO_VOICES = new Set([
  "af_heart",
  "af_alloy",
  "af_aoede",
  "af_bella",
  "af_jessica",
  "af_kore",
  "af_nicole",
  "af_nova",
  "af_river",
  "af_sarah",
  "af_sky",
  "am_adam",
  "am_echo",
  "am_eric",
  "am_fenrir",
  "am_liam",
]);

const TOGETHER_ORPHEUS_VOICES = new Set([
  "tara",
  "leah",
  "jess",
  "leo",
  "dan",
  "mia",
  "zac",
  "zoe",
]);

const TOGETHER_CARTESIA_VOICES = new Set([
  "friendly sidekick",
]);

const TOGETHER_RIME_ARCANA_VOICES = new Set([
  "albion",
  "arcade",
  "astra",
  "atrium",
  "bond",
  "cupola",
  "eliphas",
  "estelle",
  "eucalyptus",
  "fern",
  "lintel",
  "luna",
  "lyra",
  "marlu",
  "masonry",
  "moss",
  "oculus",
  "parapet",
  "pilaster",
  "sirius",
  "stucco",
  "transom",
  "truss",
  "vashti",
  "vespera",
  "walnut",
]);

const TOGETHER_RIME_MIST_VOICES = new Set([
  "cove",
  "eucalyptus",
  "lagoon",
  "mari",
  "marlu",
  "mesa_extra",
  "moon",
  "moraine",
  "peak",
  "summit",
  "talon",
  "thunder",
  "tundra",
  "wildflower",
]);

const TOGETHER_MINIMAX_VOICES = new Set([
  "English_expressive_narrator",
  "English_DeterminedMan",
  "English_TrustworthMan",
  "English_GracefulLady",
  "English_WiseWoman",
]);

function getGroqVoice(selectedModel: string, selectedVoice: string) {
  if (selectedModel === "canopylabs/orpheus-arabic-saudi") {
    return ["fahad", "sultan", "lulwa", "noura"].includes(selectedVoice)
      ? selectedVoice
      : "noura";
  }

  return [
    "autumn",
    "diana",
    "hannah",
    "austin",
    "daniel",
    "troy",
  ].includes(selectedVoice)
    ? selectedVoice
    : "troy";
}

function getNovitaVoice(selectedModel: string, selectedVoice: string) {
  if (selectedModel === "txt2speech") {
    return ["Emily", "James", "Olivia", "Michael", "Sarah", "John"].includes(
      selectedVoice,
    )
      ? selectedVoice
      : "Emily";
  }

  if (selectedModel === "glm-tts") {
    return [
      "tongtong",
      "chuichui",
      "xiaochen",
      "jam",
      "kazi",
      "douji",
      "luodo",
    ].includes(selectedVoice)
      ? selectedVoice
      : "tongtong";
  }

  return TOGETHER_MINIMAX_VOICES.has(selectedVoice)
    ? selectedVoice
    : "English_expressive_narrator";
}

function getReplicateVoice(selectedModel: string, selectedVoice: string) {
  if (selectedModel.startsWith("inworld/tts-1.5")) {
    return selectedVoice || "Ashley";
  }

  if (selectedModel.startsWith("minimax/speech-2.8")) {
    return selectedVoice || "Wise_Woman";
  }

  return selectedVoice;
}

function getSiliconflowVoice(selectedModel: string, selectedVoice: string) {
  if (selectedVoice.startsWith(`${selectedModel}:`)) {
    return selectedVoice;
  }

  const normalizedVoice = selectedVoice.includes(":")
    ? selectedVoice.split(":").pop()
    : selectedVoice;

  return `${selectedModel}:${normalizedVoice || "alex"}`;
}

function getTogetherVoice(selectedModel: string, selectedVoice: string) {
  if (selectedModel === "hexgrad/Kokoro-82M") {
    return TOGETHER_KOKORO_VOICES.has(selectedVoice) ? selectedVoice : "af_alloy";
  }

  if (selectedModel === "canopylabs/orpheus-3b-0.1-ft") {
    return TOGETHER_ORPHEUS_VOICES.has(selectedVoice) ? selectedVoice : "tara";
  }

  if (selectedModel.startsWith("cartesia/sonic")) {
    return TOGETHER_CARTESIA_VOICES.has(selectedVoice)
      ? selectedVoice
      : "friendly sidekick";
  }

  if (selectedModel === "deepgram/deepgram-aura-2") {
    return selectedVoice.startsWith("aura-2-")
      ? selectedVoice
      : "aura-2-thalia-en";
  }

  if (selectedModel.startsWith("rime-labs/rime-arcana")) {
    return TOGETHER_RIME_ARCANA_VOICES.has(selectedVoice) ? selectedVoice : "luna";
  }

  if (selectedModel.startsWith("rime-labs/rime-mist")) {
    return TOGETHER_RIME_MIST_VOICES.has(selectedVoice) ? selectedVoice : "cove";
  }

  if (selectedModel === "minimax/speech-2.6-turbo") {
    return TOGETHER_MINIMAX_VOICES.has(selectedVoice)
      ? selectedVoice
      : "English_DeterminedMan";
  }

  return selectedVoice || "af_alloy";
}

function getZaiVoice(selectedVoice: string) {
  return [
    "tongtong",
    "chuichui",
    "xiaochen",
    "jam",
    "kazi",
    "douji",
    "luodo",
  ].includes(selectedVoice)
    ? selectedVoice
    : "tongtong";
}

function getHyperbolicLanguage(selectedVoice: string) {
  return selectedVoice.startsWith("EN-") ? "EN" : selectedVoice;
}

function hexToBase64(hex: string, language: AppLanguage) {
  const BufferCtor = (globalThis as any).Buffer;

  if (BufferCtor) {
    return BufferCtor.from(hex, "hex").toString("base64");
  }

  const bytes = new Uint8Array(Math.floor(hex.length / 2));

  for (let index = 0; index < bytes.length; index += 1) {
    bytes[index] = parseInt(hex.slice(index * 2, index * 2 + 2), 16);
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

function getBinaryTtsVoice(params: {
  requestFormat: RuntimeTtsBinaryRequestFormat;
  selectedModel: string;
  selectedVoice: string;
}) {
  switch (params.requestFormat) {
    case "groq-speech":
      return getGroqVoice(params.selectedModel, params.selectedVoice);
    case "siliconflow-speech":
      return getSiliconflowVoice(params.selectedModel, params.selectedVoice);
    case "together-speech":
      return getTogetherVoice(params.selectedModel, params.selectedVoice);
    case "zai-speech":
      return getZaiVoice(params.selectedVoice);
    case "xai-speech":
    case "openai-speech":
    default:
      return params.selectedVoice;
  }
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

  if (config.kind === "azure-openai") {
    const credentials = parseAzureOpenAiCredentials(provider, apiKey, language);
    const resolvedVoice = selectedVoice || config.voiceFallback;
    const response = await fetchWithTimeout(
      buildAzureOpenAiUrl(credentials.endpoint, "audio/speech"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": credentials.apiKey,
        },
        body: JSON.stringify(
          buildBinaryTtsRequestBody({
            requestFormat: "openai-speech",
            selectedModel,
            selectedVoice: resolvedVoice,
            text,
          }),
        ),
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

    return writeBlobAudioFile(await response.blob(), "mp3");
  }

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

  if (config.kind === "baidu") {
    const authToken = requireProviderKey(provider, apiKey, language);

    if (selectedModel === "长文本合成") {
      const createResponse = await fetchWithTimeout(
        `https://aip.baidubce.com/rpc/2.0/tts/v1/create?access_token=${encodeURIComponent(authToken)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: [text],
            format: "mp3-16k",
            voice: Number.parseInt(selectedVoice || config.voiceFallback, 10) || 0,
            lang: "zh",
            speed: 5,
            pitch: 5,
            volume: 5,
          }),
        },
        timeoutMs,
        () => createTtsTimeoutError({ provider, language }),
        abortSignal,
      );

      if (!createResponse.ok) {
        const errorText = await createResponse.text();
        throw buildTtsRequestError({
          provider,
          status: createResponse.status,
          errorText,
          language,
        });
      }

      const createData = await createResponse.json();
      const taskId =
        typeof createData?.task_id === "string" ? createData.task_id : null;

      if (!taskId) {
        throw new Error(
          translate(language, "ttsDidNotReturnAudio", {
            provider: PROVIDER_LABELS[provider],
          }),
        );
      }

      for (let pollIndex = 0; pollIndex < BAIDU_LONG_TTS_MAX_POLLS; pollIndex += 1) {
        const queryResponse = await fetchWithTimeout(
          `https://aip.baidubce.com/rpc/2.0/tts/v1/query?access_token=${encodeURIComponent(authToken)}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              task_ids: [taskId],
            }),
          },
          timeoutMs,
          () => createTtsTimeoutError({ provider, language }),
          abortSignal,
        );

        if (!queryResponse.ok) {
          const errorText = await queryResponse.text();
          throw buildTtsRequestError({
            provider,
            status: queryResponse.status,
            errorText,
            language,
          });
        }

        const queryData = await queryResponse.json();
        const taskInfo = Array.isArray(queryData?.tasks_info)
          ? queryData.tasks_info[0]
          : null;
        const taskStatus =
          typeof taskInfo?.task_status === "string" ? taskInfo.task_status : null;
        const speechUrl =
          typeof taskInfo?.task_result?.speech_url === "string"
            ? taskInfo.task_result.speech_url
            : null;

        if (taskStatus === "Success" && speechUrl) {
          const audioResponse = await fetchWithTimeout(
            speechUrl,
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

          return writeBlobAudioFile(await audioResponse.blob(), "mp3");
        }

        if (
          taskStatus &&
          !["Running", "Created", "Pending"].includes(taskStatus)
        ) {
          const errorText =
            taskInfo?.task_result?.err_msg ||
            queryData?.error_msg ||
            taskStatus;
          throw new Error(errorText);
        }

        await wait(BAIDU_LONG_TTS_POLL_INTERVAL_MS);
      }

      throw createTtsTimeoutError({ provider, language });
    }

    const formData = new URLSearchParams();
    formData.set("tex", text);
    formData.set("tok", authToken);
    formData.set("cuid", "schnackai");
    formData.set("ctp", "1");
    formData.set("lan", "zh");
    formData.set("per", selectedVoice || config.voiceFallback);
    formData.set("spd", "5");
    formData.set("pit", "5");
    formData.set("vol", "5");
    formData.set("aue", "3");

    const response = await fetchWithTimeout(
      config.endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${authToken}`,
        },
        body: formData.toString(),
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

    return writeBlobAudioFile(await response.blob(), "mp3");
  }

  if (config.kind === "deepgram") {
    const voiceModel = getDeepgramVoiceModel(selectedModel, selectedVoice);
    const response = await fetchWithTimeout(
      `${config.endpointBase}/speak?model=${encodeURIComponent(voiceModel)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${requireProviderKey(provider, apiKey, language)}`,
        },
        body: JSON.stringify({
          text,
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

    return writeBlobAudioFile(await response.blob());
  }

  if (config.kind === "fish-audio") {
    const response = await fetchWithTimeout(
      config.endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${requireProviderKey(provider, apiKey, language)}`,
          model: selectedModel,
        },
        body: JSON.stringify({
          text,
          format: "mp3",
          chunk_length: 200,
          min_chunk_length: 50,
          normalize: true,
          prosody: {
            speed: 1,
            volume: 0,
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

    return writeBlobAudioFile(await response.blob(), "mp3");
  }

  if (config.kind === "hyperbolic") {
    const selectedLanguage = getHyperbolicLanguage(selectedVoice);
    const response = await fetchWithTimeout(
      config.endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${requireProviderKey(provider, apiKey, language)}`,
        },
        body: JSON.stringify({
          text,
          language: selectedLanguage,
          speaker: selectedVoice,
          speed: 1,
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
    const audioBase64 = typeof data?.audio === "string" ? data.audio : null;

    if (!audioBase64) {
      throw new Error(
        translate(language, "ttsDidNotReturnAudio", {
          provider: PROVIDER_LABELS[provider],
        }),
      );
    }

    return writeBase64AudioFile(audioBase64, "mp3");
  }

  if (config.kind === "ibm-watsonx") {
    const credentials = parseIbmWatsonxCredentials(provider, apiKey, language);
    const response = await fetchWithTimeout(
      `${credentials.textToSpeechUrl}/v1/synthesize?voice=${encodeURIComponent(
        selectedModel || selectedVoice || config.voiceFallback,
      )}`,
      {
        method: "POST",
        headers: {
          Authorization: buildBasicAuthorizationHeader(
            "apikey",
            credentials.textToSpeechApiKey,
          ),
          "Content-Type": "application/json",
          Accept: "audio/mp3",
        },
        body: JSON.stringify({
          text,
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

    return writeBlobAudioFile(await response.blob(), "mp3");
  }

  if (config.kind === "minimax") {
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
          text,
          stream: false,
          output_format: "hex",
          language_boost: "auto",
          voice_setting: {
            voice_id: selectedVoice,
            speed: 1,
            vol: 1,
            pitch: 0,
          },
          audio_setting: {
            sample_rate: 32000,
            bitrate: 128000,
            format: "mp3",
            channel: 1,
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
    const audioHex = typeof data?.data?.audio === "string" ? data.data.audio : null;

    if (!audioHex) {
      throw new Error(
        translate(language, "ttsDidNotReturnAudio", {
          provider: PROVIDER_LABELS[provider],
        }),
      );
    }

    return writeBase64AudioFile(hexToBase64(audioHex, language), "mp3");
  }

  if (config.kind === "novita") {
    const resolvedVoice = getNovitaVoice(selectedModel, selectedVoice);

    if (selectedModel === "txt2speech") {
      const createResponse = await fetchWithTimeout(
        `${config.endpointBase}/async/txt2speech`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${requireProviderKey(provider, apiKey, language)}`,
          },
          body: JSON.stringify({
            text,
            voice_name: resolvedVoice,
            language: "en-US",
            response_audio_type: "mp3",
          }),
        },
        timeoutMs,
        () => createTtsTimeoutError({ provider, language }),
        abortSignal,
      );

      if (!createResponse.ok) {
        const errorText = await createResponse.text();
        throw buildTtsRequestError({
          provider,
          status: createResponse.status,
          errorText,
          language,
        });
      }

      const createData = await createResponse.json();
      const taskId =
        typeof createData?.task_id === "string" ? createData.task_id : null;

      if (!taskId) {
        throw new Error(
          translate(language, "ttsDidNotReturnAudio", {
            provider: PROVIDER_LABELS[provider],
          }),
        );
      }

      for (
        let pollIndex = 0;
        pollIndex < NOVITA_ASYNC_TTS_MAX_POLLS;
        pollIndex += 1
      ) {
        const pollResponse = await fetchWithTimeout(
          `${config.endpointBase}/async/task-result?task_id=${encodeURIComponent(taskId)}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${requireProviderKey(
                provider,
                apiKey,
                language,
              )}`,
            },
          },
          timeoutMs,
          () => createTtsTimeoutError({ provider, language }),
          abortSignal,
        );

        if (!pollResponse.ok) {
          const errorText = await pollResponse.text();
          throw buildTtsRequestError({
            provider,
            status: pollResponse.status,
            errorText,
            language,
          });
        }

        const pollData = await pollResponse.json();
        const taskStatus =
          typeof pollData?.task?.status === "string" ? pollData.task.status : null;
        const audioUrl =
          typeof pollData?.audios?.[0]?.audio_url === "string"
            ? pollData.audios[0].audio_url
            : null;

        if (taskStatus === "TASK_STATUS_SUCCEED" && audioUrl) {
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

          return writeBlobAudioFile(await audioResponse.blob(), "mp3");
        }

        if (
          taskStatus &&
          !["TASK_STATUS_PENDING", "TASK_STATUS_RUNNING"].includes(taskStatus)
        ) {
          const errorText =
            pollData?.task?.message ||
            pollData?.message ||
            pollData?.detail ||
            taskStatus;
          throw new Error(errorText);
        }

        await wait(NOVITA_ASYNC_TTS_POLL_INTERVAL_MS);
      }

      throw createTtsTimeoutError({ provider, language });
    }

    if (selectedModel === "glm-tts") {
      const response = await fetchWithTimeout(
        `${config.endpointBase}/glm-tts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${requireProviderKey(provider, apiKey, language)}`,
          },
          body: JSON.stringify({
            input: text,
            voice: resolvedVoice,
            speed: 1,
            volume: 1,
            response_format: "wav",
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

      return writeBlobAudioFile(await response.blob(), "wav");
    }

    const response = await fetchWithTimeout(
      `${config.endpointBase}/${encodeURIComponent(selectedModel)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${requireProviderKey(provider, apiKey, language)}`,
        },
        body: JSON.stringify({
          model: selectedModel,
          text,
          stream: false,
          output_format: "hex",
          language_boost: "auto",
          voice_setting: {
            voice_id: resolvedVoice,
            speed: 1,
            vol: 1,
            pitch: 0,
          },
          audio_setting: {
            sample_rate: 32000,
            bitrate: 128000,
            format: "mp3",
            channel: 1,
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
    const audioHex = typeof data?.data?.audio === "string" ? data.data.audio : null;

    if (!audioHex) {
      throw new Error(
        translate(language, "ttsDidNotReturnAudio", {
          provider: PROVIDER_LABELS[provider],
        }),
      );
    }

    return writeBase64AudioFile(hexToBase64(audioHex, language), "mp3");
  }

  if (config.kind === "replicate") {
    const resolvedApiKey = requireProviderKey(provider, apiKey, language);
    const resolvedVoice = getReplicateVoice(selectedModel, selectedVoice);
    const metadata = await getReplicateModelMetadata({
      apiKey: resolvedApiKey,
      modelId: selectedModel,
      abortSignal,
    });
    const input: Record<string, unknown> = {};
    const textField = getReplicateInputProperty(metadata.inputProperties, [
      "text",
      "input_text",
      "prompt",
    ]);
    const voiceField = getReplicateInputProperty(metadata.inputProperties, [
      "voice_id",
      "voice",
      "speaker",
      "speaker_id",
    ]);
    const outputFormatField = getReplicateInputProperty(metadata.inputProperties, [
      "output_format",
      "audio_format",
    ]);

    input[textField ?? "text"] = text;

    if (voiceField && resolvedVoice) {
      input[voiceField] = resolvedVoice;
    }

    if (outputFormatField) {
      input[outputFormatField] = "mp3";
    }

    if ("sample_rate" in metadata.inputProperties) {
      input.sample_rate = 44100;
    }

    if ("bitrate" in metadata.inputProperties) {
      input.bitrate = 128000;
    }

    const output = await runReplicatePrediction({
      apiKey: resolvedApiKey,
      modelId: selectedModel,
      input,
      abortSignal,
    });
    const audioUrl = getReplicateAudioUrl(output);

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

    return writeBlobAudioFile(await audioResponse.blob(), "mp3");
  }

  if (config.kind === "elevenlabs") {
    const response = await fetchWithTimeout(
      `${config.endpointBase}/text-to-speech/${encodeURIComponent(selectedVoice)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": requireProviderKey(provider, apiKey, language),
        },
        body: JSON.stringify({
          text,
          model_id: selectedModel,
          output_format: "mp3_44100_128",
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

    return writeBlobAudioFile(await response.blob());
  }

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

  return writeBlobAudioFile(
    await response.blob(),
    getBinaryTtsFileExtension(config.requestFormat),
  );
}
