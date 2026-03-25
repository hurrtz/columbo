import * as FileSystem from "expo-file-system/legacy";

import { buildProviderHttpError, normalizeProviderTransportError } from "../providerErrors";
import {
  buildBasicAuthorizationHeader,
  buildAzureOpenAiUrl,
  parseEndpointApiKeyCredentials,
  parseIbmWatsonxCredentials,
  parseAzureOpenAiCredentials,
} from "../providerCredentials";
import type { AppLanguage, Provider } from "../../types";
import {
  getReplicateInputProperty,
  getReplicateModelMetadata,
  runReplicatePrediction,
} from "../replicate/runtime";
import { getDeviceLocale, getFileAudioMimeType } from "../../utils/speechLanguage";
import { fetchWithTimeout } from "./abort";
import { parseBaiduSpeechCredentials } from "./baiduCredentials";
import { STT_TIMEOUT_MS } from "./config";
import type {
  AlephAlphaTranscriptionConfig,
  AssemblyAiPreRecordedTranscriptionConfig,
  AzureOpenAiTranscriptionConfig,
  DeepInfraInferenceTranscriptionConfig,
  BaiduShortSpeechTranscriptionConfig,
  DeepgramPreRecordedTranscriptionConfig,
  ElevenLabsTranscriptionConfig,
  FishAudioTranscriptionConfig,
  FireworksPreRecordedTranscriptionConfig,
  GeminiTranscriptionConfig,
  HuggingFaceJsonTranscriptionConfig,
  IbmWatsonxTranscriptionConfig,
  NovitaJsonTranscriptionConfig,
  OpenAiAudioInputTranscriptionConfig,
  MultipartTranscriptionConfig,
  ReplicateTranscriptionConfig,
} from "./config";
import {
  createSttTimeoutError,
  extractTextFromOpenAiAudioInputResponse,
  extractTextFromGeminiResponse,
  requireProviderKey,
} from "./errors";

interface SharedProviderParams {
  abortSignal?: AbortSignal;
  apiKey?: string;
  fileUri: string;
  language: AppLanguage;
  provider: Provider;
  providerModel?: string;
}

const ASSEMBLYAI_POLL_INTERVAL_MS = 1000;
const ASSEMBLYAI_MAX_POLLS = 30;
const DASHSCOPE_ASYNC_POLL_INTERVAL_MS = 1000;
const DASHSCOPE_ASYNC_MAX_POLLS = 30;
const BAIDU_ASYNC_POLL_INTERVAL_MS = 1000;
const BAIDU_ASYNC_MAX_POLLS = 30;

function base64ToBytes(base64: string) {
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

  throw new Error("No base64 decoder available for AssemblyAI upload.");
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

function throwIfAborted(signal?: AbortSignal) {
  if (!signal?.aborted) {
    return;
  }

  const error = new Error("Aborted");
  error.name = "AbortError";
  throw error;
}

function getFireworksTranscriptionEndpoint(model: string) {
  return model === "whisper-v3-turbo"
    ? "https://audio-turbo.api.fireworks.ai/v1/audio/transcriptions"
    : "https://audio-prod.api.fireworks.ai/v1/audio/transcriptions";
}

function getBaiduSpeechEndpoint(model: string) {
  return model === "短语音识别极速版"
    ? "https://vop.baidu.com/pro_api"
    : "http://vop.baidu.com/server_api";
}

function getBaiduSpeechFormat(fileUri: string) {
  const extension = fileUri.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "pcm":
    case "wav":
    case "amr":
    case "m4a":
      return extension;
    default:
      return "wav";
  }
}

function getBaiduSpeechPid(model: string, language: AppLanguage) {
  if (model === "短语音识别极速版") {
    return 80001;
  }

  return language === "en" ? 1737 : 1537;
}

function getBaiduAsyncSpeechPid(language: AppLanguage) {
  return language === "en" ? 1737 : 80001;
}

function isRemoteAudioSource(fileUri: string) {
  return /^(https?:\/\/|oss:\/\/)/i.test(fileUri);
}

export async function transcribeWithGeminiProvider(
  params: SharedProviderParams & {
    config: GeminiTranscriptionConfig;
  },
) {
  const { abortSignal, apiKey, config, fileUri, language, provider, providerModel } =
    params;
  const base64 = await FileSystem.readAsStringAsync(fileUri, {
    encoding: "base64",
  });

  let response: Awaited<ReturnType<typeof fetch>>;

  try {
    response = await fetchWithTimeout(
      `${config.endpointBase}/${providerModel || config.defaultModel}:generateContent`,
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
                  text: `Transcribe this audio exactly. Return only the transcription text in the original spoken language. Do not translate, summarize, or add commentary. Current locale hint: ${getDeviceLocale()}.`,
                },
                {
                  inlineData: {
                    mimeType: getFileAudioMimeType(fileUri),
                    data: base64,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0,
          },
        }),
      },
      STT_TIMEOUT_MS,
      () => createSttTimeoutError({ provider, language }),
      abortSignal,
    );
  } catch (error) {
    throw normalizeProviderTransportError({
      provider,
      language,
      error,
      action: "transcription",
    });
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw buildProviderHttpError({
      provider,
      language,
      status: response.status,
      errorText,
      action: "transcription",
    });
  }

  const data = await response.json();
  const text = extractTextFromGeminiResponse(data);
  return text ? text : null;
}

export async function transcribeWithAlephAlphaProvider(
  params: SharedProviderParams & {
    config: AlephAlphaTranscriptionConfig;
  },
) {
  const { abortSignal, apiKey, config, fileUri, language, provider, providerModel } =
    params;
  const credentials = parseEndpointApiKeyCredentials(provider, apiKey, language);
  const formData = new FormData();
  formData.append(
    "file",
    {
      uri: fileUri,
      type: getFileAudioMimeType(fileUri),
      name: fileUri.split("/").pop() || "recording.m4a",
    } as any,
  );
  formData.append("model", providerModel || config.defaultModel);

  let response: Awaited<ReturnType<typeof fetch>>;

  try {
    response = await fetchWithTimeout(
      `${credentials.endpoint}/transcribe`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${credentials.apiKey}`,
        },
        body: formData,
      },
      STT_TIMEOUT_MS,
      () => createSttTimeoutError({ provider, language }),
      abortSignal,
    );
  } catch (error) {
    throw normalizeProviderTransportError({
      provider,
      language,
      error,
      action: "transcription",
    });
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw buildProviderHttpError({
      provider,
      language,
      status: response.status,
      errorText,
      action: "transcription",
    });
  }

  const data = await response.json();
  const rawText =
    typeof data?.text === "string"
      ? data.text
      : typeof data?.result?.text === "string"
        ? data.result.text
        : "";
  const text = rawText.trim();
  return text ? text : null;
}

export async function transcribeWithMultipartProvider(
  params: SharedProviderParams & {
    config: MultipartTranscriptionConfig;
  },
) {
  const { abortSignal, apiKey, config, fileUri, language, provider, providerModel } =
    params;
  const formData = new FormData();
  formData.append(
    "file",
    {
      uri: fileUri,
      type: getFileAudioMimeType(fileUri),
      name: fileUri.split("/").pop() || "recording.m4a",
    } as any,
  );
  formData.append("model", providerModel || config.defaultModel);
  const languageHint = config.languageHint?.();
  if (languageHint) {
    formData.append("language", languageHint);
  }

  let response: Awaited<ReturnType<typeof fetch>>;

  try {
    response = await fetchWithTimeout(
      config.endpoint,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${requireProviderKey(provider, apiKey, language)}`,
        },
        body: formData,
      },
      STT_TIMEOUT_MS,
      () => createSttTimeoutError({ provider, language }),
      abortSignal,
    );
  } catch (error) {
    throw normalizeProviderTransportError({
      provider,
      language,
      error,
      action: "transcription",
    });
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw buildProviderHttpError({
      provider,
      language,
      status: response.status,
      errorText,
      action: "transcription",
    });
  }

  const data = await response.json();
  const text = data.text?.trim();
  return text ? text : null;
}

export async function transcribeWithOpenAiAudioInputProvider(
  params: SharedProviderParams & {
    config: OpenAiAudioInputTranscriptionConfig;
  },
) {
  const { abortSignal, apiKey, config, fileUri, language, provider, providerModel } =
    params;
  const base64 = await FileSystem.readAsStringAsync(fileUri, {
    encoding: "base64",
  });
  const mimeType = getFileAudioMimeType(fileUri);
  const dataUri = `data:${mimeType};base64,${base64}`;

  let response: Awaited<ReturnType<typeof fetch>>;

  try {
    response = await fetchWithTimeout(
      config.endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${requireProviderKey(provider, apiKey, language)}`,
        },
        body: JSON.stringify({
          model: providerModel || config.defaultModel,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "input_audio",
                  input_audio: {
                    data: dataUri,
                  },
                },
              ],
            },
          ],
          stream: false,
        }),
      },
      STT_TIMEOUT_MS,
      () => createSttTimeoutError({ provider, language }),
      abortSignal,
    );
  } catch (error) {
    throw normalizeProviderTransportError({
      provider,
      language,
      error,
      action: "transcription",
    });
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw buildProviderHttpError({
      provider,
      language,
      status: response.status,
      errorText,
      action: "transcription",
    });
  }

  const data = await response.json();
  const text = extractTextFromOpenAiAudioInputResponse(data);
  return text ? text : null;
}

export async function transcribeWithAzureOpenAiProvider(
  params: SharedProviderParams & {
    config: AzureOpenAiTranscriptionConfig;
  },
) {
  const { abortSignal, apiKey, config, fileUri, language, provider, providerModel } =
    params;
  const credentials = parseAzureOpenAiCredentials(provider, apiKey, language);
  const formData = new FormData();
  formData.append(
    "file",
    {
      uri: fileUri,
      type: getFileAudioMimeType(fileUri),
      name: fileUri.split("/").pop() || "recording.m4a",
    } as any,
  );
  formData.append("model", providerModel || config.defaultModel);

  let response: Awaited<ReturnType<typeof fetch>>;

  try {
    response = await fetchWithTimeout(
      buildAzureOpenAiUrl(credentials.endpoint, "audio/transcriptions"),
      {
        method: "POST",
        headers: {
          "api-key": credentials.apiKey,
        },
        body: formData,
      },
      STT_TIMEOUT_MS,
      () => createSttTimeoutError({ provider, language }),
      abortSignal,
    );
  } catch (error) {
    throw normalizeProviderTransportError({
      provider,
      language,
      error,
      action: "transcription",
    });
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw buildProviderHttpError({
      provider,
      language,
      status: response.status,
      errorText,
      action: "transcription",
    });
  }

  const data = await response.json();
  const text = data.text?.trim();
  return text ? text : null;
}

export async function transcribeWithIbmWatsonxProvider(
  params: SharedProviderParams & {
    config: IbmWatsonxTranscriptionConfig;
  },
) {
  const { abortSignal, apiKey, config, fileUri, language, provider, providerModel } =
    params;
  const credentials = parseIbmWatsonxCredentials(provider, apiKey, language);
  const base64 = await FileSystem.readAsStringAsync(fileUri, {
    encoding: "base64",
  });
  const bytes = base64ToBytes(base64);

  let response: Awaited<ReturnType<typeof fetch>>;

  try {
    response = await fetchWithTimeout(
      `${credentials.speechToTextUrl}/v1/recognize?model=${encodeURIComponent(
        providerModel || config.defaultModel,
      )}`,
      {
        method: "POST",
        headers: {
          Authorization: buildBasicAuthorizationHeader(
            "apikey",
            credentials.speechToTextApiKey,
          ),
          "Content-Type": getFileAudioMimeType(fileUri),
        },
        body: bytes,
      },
      STT_TIMEOUT_MS,
      () => createSttTimeoutError({ provider, language }),
      abortSignal,
    );
  } catch (error) {
    throw normalizeProviderTransportError({
      provider,
      language,
      error,
      action: "transcription",
    });
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw buildProviderHttpError({
      provider,
      language,
      status: response.status,
      errorText,
      action: "transcription",
    });
  }

  const data = await response.json();
  const text = Array.isArray(data?.results)
    ? data.results
        .flatMap((result: any) =>
          Array.isArray(result?.alternatives) ? result.alternatives.slice(0, 1) : [],
        )
        .map((alternative: any) =>
          typeof alternative?.transcript === "string"
            ? alternative.transcript.trim()
            : "",
        )
        .filter(Boolean)
        .join(" ")
    : "";

  return text ? text : null;
}

export async function transcribeWithReplicateProvider(
  params: SharedProviderParams & {
    config: ReplicateTranscriptionConfig;
  },
) {
  const { abortSignal, apiKey, config, fileUri, language, provider, providerModel } =
    params;
  const selectedModel = providerModel || config.defaultModel;
  const resolvedApiKey = requireProviderKey(provider, apiKey, language);
  const base64 = await FileSystem.readAsStringAsync(fileUri, {
    encoding: "base64",
  });
  const audioDataUri = `data:${getFileAudioMimeType(fileUri)};base64,${base64}`;

  let metadata;

  try {
    metadata = await getReplicateModelMetadata({
      apiKey: resolvedApiKey,
      modelId: selectedModel,
      abortSignal,
    });
  } catch (error) {
    throw normalizeProviderTransportError({
      provider,
      language,
      error,
      action: "transcription",
    });
  }

  const input: Record<string, unknown> = {};
  const audioField = getReplicateInputProperty(metadata.inputProperties, [
    "audio_file",
    "audio",
    "file",
  ]);

  input[audioField ?? "audio_file"] = audioDataUri;

  if ("language" in metadata.inputProperties) {
    input.language = getDeviceLocale().split("-")[0];
  }

  let output: unknown;

  try {
    output = await runReplicatePrediction({
      apiKey: resolvedApiKey,
      modelId: selectedModel,
      input,
      abortSignal,
    });
  } catch (error) {
    throw normalizeProviderTransportError({
      provider,
      language,
      error,
      action: "transcription",
    });
  }

  const text =
    typeof output === "string"
      ? output.trim()
      : Array.isArray(output)
        ? output
            .map((part) => (typeof part === "string" ? part : ""))
            .join("")
            .trim()
        : typeof (output as any)?.text === "string"
          ? (output as any).text.trim()
          : "";

  return text ? text : null;
}

export async function transcribeWithBaiduShortSpeechProvider(
  params: SharedProviderParams & {
    config: BaiduShortSpeechTranscriptionConfig;
  },
) {
  const { abortSignal, apiKey, config, fileUri, language, provider, providerModel } =
    params;
  const selectedModel = providerModel || config.defaultModel;
  const base64 = await FileSystem.readAsStringAsync(fileUri, {
    encoding: "base64",
  });
  const bytes = base64ToBytes(base64);
  const authToken = requireProviderKey(provider, apiKey, language);

  let response: Awaited<ReturnType<typeof fetch>>;

  try {
    response = await fetchWithTimeout(
      getBaiduSpeechEndpoint(selectedModel),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          format: getBaiduSpeechFormat(fileUri),
          rate: 16000,
          channel: 1,
          cuid: "schnackai",
          dev_pid: getBaiduSpeechPid(selectedModel, language),
          token: authToken,
          speech: base64,
          len: bytes.byteLength,
        }),
      },
      STT_TIMEOUT_MS,
      () => createSttTimeoutError({ provider, language }),
      abortSignal,
    );
  } catch (error) {
    throw normalizeProviderTransportError({
      provider,
      language,
      error,
      action: "transcription",
    });
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw buildProviderHttpError({
      provider,
      language,
      status: response.status,
      errorText,
      action: "transcription",
    });
  }

  const data = await response.json();
  const text =
    (Array.isArray(data?.result) && typeof data.result[0] === "string"
      ? data.result[0]
      : null) || (typeof data?.result === "string" ? data.result : null);

  return text?.trim() ? text.trim() : null;
}

export async function transcribeWithBaiduFileTranscriptionProvider(
  params: SharedProviderParams,
) {
  const { abortSignal, apiKey, fileUri, language, provider } = params;

  if (!isRemoteAudioSource(fileUri)) {
    throw new Error(
      "Baidu audio file transcription requires a publicly reachable audio URL.",
    );
  }

  const { serviceApiKey } = parseBaiduSpeechCredentials(provider, apiKey, language);
  const createUrl =
    `https://aip.baidubce.com/rpc/2.0/aasr/v1/create?access_token=${encodeURIComponent(serviceApiKey)}`;

  let createResponse: Awaited<ReturnType<typeof fetch>>;

  try {
    createResponse = await fetchWithTimeout(
      createUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          speech_url: fileUri,
          format: getBaiduSpeechFormat(fileUri),
          pid: getBaiduAsyncSpeechPid(language),
          rate: 16000,
        }),
      },
      STT_TIMEOUT_MS,
      () => createSttTimeoutError({ provider, language }),
      abortSignal,
    );
  } catch (error) {
    throw normalizeProviderTransportError({
      provider,
      language,
      error,
      action: "transcription",
    });
  }

  if (!createResponse.ok) {
    const errorText = await createResponse.text();
    throw buildProviderHttpError({
      provider,
      language,
      status: createResponse.status,
      errorText,
      action: "transcription",
    });
  }

  const createData = await createResponse.json();
  const taskId =
    typeof createData?.task_id === "string"
      ? createData.task_id
      : typeof createData?.tasks?.[0]?.task_id === "string"
        ? createData.tasks[0].task_id
        : null;

  if (!taskId) {
    throw new Error("Baidu audio file transcription did not return a task id.");
  }

  const queryUrl =
    `https://aip.baidubce.com/rpc/2.0/aasr/v1/query?access_token=${encodeURIComponent(serviceApiKey)}`;

  for (let pollIndex = 0; pollIndex < BAIDU_ASYNC_MAX_POLLS; pollIndex += 1) {
    throwIfAborted(abortSignal);

    let queryResponse: Awaited<ReturnType<typeof fetch>>;

    try {
      queryResponse = await fetchWithTimeout(
        queryUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task_ids: [taskId],
          }),
        },
        STT_TIMEOUT_MS,
        () => createSttTimeoutError({ provider, language }),
        abortSignal,
      );
    } catch (error) {
      throw normalizeProviderTransportError({
        provider,
        language,
        error,
        action: "transcription",
      });
    }

    if (!queryResponse.ok) {
      const errorText = await queryResponse.text();
      throw buildProviderHttpError({
        provider,
        language,
        status: queryResponse.status,
        errorText,
        action: "transcription",
      });
    }

    const queryData = await queryResponse.json();
    const taskInfo = Array.isArray(queryData?.tasks_info)
      ? queryData.tasks_info[0]
      : null;
    const taskStatus =
      typeof taskInfo?.task_status === "string" ? taskInfo.task_status : null;

    if (taskStatus === "Success") {
      const text =
        typeof taskInfo?.task_result?.result === "string"
          ? taskInfo.task_result.result.trim()
          : Array.isArray(taskInfo?.task_result?.detailed_result)
            ? taskInfo.task_result.detailed_result
                .map((item: any) =>
                  typeof item?.res === "string" ? item.res.trim() : "",
                )
                .filter(Boolean)
                .join(" ")
                .trim()
            : "";

      return text || null;
    }

    if (taskStatus && !["Running", "Created", "Pending"].includes(taskStatus)) {
      const errorText =
        typeof taskInfo?.task_result?.err_msg === "string"
          ? taskInfo.task_result.err_msg
          : taskStatus;
      throw new Error(errorText);
    }

    await wait(BAIDU_ASYNC_POLL_INTERVAL_MS);
  }

  throw createSttTimeoutError({ provider, language });
}

export async function transcribeWithFireworksPreRecordedProvider(
  params: SharedProviderParams & {
    config: FireworksPreRecordedTranscriptionConfig;
  },
) {
  const { abortSignal, apiKey, config, fileUri, language, provider, providerModel } =
    params;
  const selectedModel = providerModel || config.defaultModel;
  const formData = new FormData();
  formData.append(
    "file",
    {
      uri: fileUri,
      type: getFileAudioMimeType(fileUri),
      name: fileUri.split("/").pop() || "recording.m4a",
    } as any,
  );
  formData.append("model", selectedModel);

  let response: Awaited<ReturnType<typeof fetch>>;

  try {
    response = await fetchWithTimeout(
      getFireworksTranscriptionEndpoint(selectedModel),
      {
        method: "POST",
        headers: {
          Authorization: requireProviderKey(provider, apiKey, language),
        },
        body: formData,
      },
      STT_TIMEOUT_MS,
      () => createSttTimeoutError({ provider, language }),
      abortSignal,
    );
  } catch (error) {
    throw normalizeProviderTransportError({
      provider,
      language,
      error,
      action: "transcription",
    });
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw buildProviderHttpError({
      provider,
      language,
      status: response.status,
      errorText,
      action: "transcription",
    });
  }

  const data = await response.json();
  const text = data.text?.trim();
  return text ? text : null;
}

export async function transcribeWithHuggingFaceJsonProvider(
  params: SharedProviderParams & {
    config: HuggingFaceJsonTranscriptionConfig;
  },
) {
  const { abortSignal, apiKey, config, fileUri, language, provider, providerModel } =
    params;
  const base64 = await FileSystem.readAsStringAsync(fileUri, {
    encoding: "base64",
  });

  let response: Awaited<ReturnType<typeof fetch>>;

  try {
    response = await fetchWithTimeout(
      `${config.endpointBase}/${encodeURIComponent(
        providerModel || config.defaultModel,
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${requireProviderKey(provider, apiKey, language)}`,
        },
        body: JSON.stringify({
          inputs: base64,
        }),
      },
      STT_TIMEOUT_MS,
      () => createSttTimeoutError({ provider, language }),
      abortSignal,
    );
  } catch (error) {
    throw normalizeProviderTransportError({
      provider,
      language,
      error,
      action: "transcription",
    });
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw buildProviderHttpError({
      provider,
      language,
      status: response.status,
      errorText,
      action: "transcription",
    });
  }

  const data = await response.json();
  const text =
    (typeof data?.text === "string" ? data.text : null) ||
    (typeof data?.generated_text === "string" ? data.generated_text : null);

  return text?.trim() ? text.trim() : null;
}

export async function transcribeWithDeepInfraInferenceProvider(
  params: SharedProviderParams & {
    config: DeepInfraInferenceTranscriptionConfig;
  },
) {
  const { abortSignal, apiKey, config, fileUri, language, provider, providerModel } =
    params;
  const selectedModel = providerModel || config.defaultModel;
  const formData = new FormData();
  formData.append(
    "audio",
    {
      uri: fileUri,
      type: getFileAudioMimeType(fileUri),
      name: fileUri.split("/").pop() || "recording.m4a",
    } as any,
  );

  let response: Awaited<ReturnType<typeof fetch>>;

  try {
    response = await fetchWithTimeout(
      `${config.endpointBase}/${selectedModel}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${requireProviderKey(provider, apiKey, language)}`,
        },
        body: formData,
      },
      STT_TIMEOUT_MS,
      () => createSttTimeoutError({ provider, language }),
      abortSignal,
    );
  } catch (error) {
    throw normalizeProviderTransportError({
      provider,
      language,
      error,
      action: "transcription",
    });
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw buildProviderHttpError({
      provider,
      language,
      status: response.status,
      errorText,
      action: "transcription",
    });
  }

  const data = await response.json();
  const text = typeof data?.text === "string" ? data.text : null;
  return text?.trim() ? text.trim() : null;
}

export async function transcribeWithNovitaJsonProvider(
  params: SharedProviderParams & {
    config: NovitaJsonTranscriptionConfig;
  },
) {
  const { abortSignal, apiKey, config, fileUri, language, provider } = params;
  const base64 = await FileSystem.readAsStringAsync(fileUri, {
    encoding: "base64",
  });

  let response: Awaited<ReturnType<typeof fetch>>;

  try {
    response = await fetchWithTimeout(
      config.endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${requireProviderKey(provider, apiKey, language)}`,
        },
        body: JSON.stringify({
          file: base64,
        }),
      },
      STT_TIMEOUT_MS,
      () => createSttTimeoutError({ provider, language }),
      abortSignal,
    );
  } catch (error) {
    throw normalizeProviderTransportError({
      provider,
      language,
      error,
      action: "transcription",
    });
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw buildProviderHttpError({
      provider,
      language,
      status: response.status,
      errorText,
      action: "transcription",
    });
  }

  const data = await response.json();
  const text = data.text?.trim();
  return text ? text : null;
}

export async function transcribeWithFishAudioProvider(
  params: SharedProviderParams & {
    config: FishAudioTranscriptionConfig;
  },
) {
  const { abortSignal, apiKey, config, fileUri, language, provider } = params;
  const formData = new FormData();
  formData.append(
    "audio",
    {
      uri: fileUri,
      type: getFileAudioMimeType(fileUri),
      name: fileUri.split("/").pop() || "recording.m4a",
    } as any,
  );
  formData.append("ignore_timestamps", "true");

  let response: Awaited<ReturnType<typeof fetch>>;

  try {
    response = await fetchWithTimeout(
      config.endpoint,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${requireProviderKey(provider, apiKey, language)}`,
        },
        body: formData,
      },
      STT_TIMEOUT_MS,
      () => createSttTimeoutError({ provider, language }),
      abortSignal,
    );
  } catch (error) {
    throw normalizeProviderTransportError({
      provider,
      language,
      error,
      action: "transcription",
    });
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw buildProviderHttpError({
      provider,
      language,
      status: response.status,
      errorText,
      action: "transcription",
    });
  }

  const data = await response.json();
  const text = data.text?.trim();
  return text ? text : null;
}

export async function transcribeWithAssemblyAiPreRecordedProvider(
  params: SharedProviderParams & {
    config: AssemblyAiPreRecordedTranscriptionConfig;
  },
) {
  const { abortSignal, apiKey, config, fileUri, language, provider, providerModel } =
    params;
  const apiKeyValue = requireProviderKey(provider, apiKey, language);
  const fileBytes = base64ToBytes(
    await FileSystem.readAsStringAsync(fileUri, {
      encoding: "base64",
    }),
  );

  let uploadResponse: Awaited<ReturnType<typeof fetch>>;

  try {
    uploadResponse = await fetchWithTimeout(
      `${config.endpointBase}/upload`,
      {
        method: "POST",
        headers: {
          Authorization: apiKeyValue,
          "Content-Type": "application/octet-stream",
        },
        body: fileBytes,
      },
      STT_TIMEOUT_MS,
      () => createSttTimeoutError({ provider, language }),
      abortSignal,
    );
  } catch (error) {
    throw normalizeProviderTransportError({
      provider,
      language,
      error,
      action: "transcription",
    });
  }

  if (!uploadResponse.ok) {
    const errorText = await uploadResponse.text();
    throw buildProviderHttpError({
      provider,
      language,
      status: uploadResponse.status,
      errorText,
      action: "transcription",
    });
  }

  const uploadData = await uploadResponse.json();
  const uploadUrl = typeof uploadData?.upload_url === "string" ? uploadData.upload_url : null;

  if (!uploadUrl) {
    throw new Error("AssemblyAI did not return an upload URL.");
  }

  let transcriptResponse: Awaited<ReturnType<typeof fetch>>;

  try {
    transcriptResponse = await fetchWithTimeout(
      `${config.endpointBase}/transcript`,
      {
        method: "POST",
        headers: {
          Authorization: apiKeyValue,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audio_url: uploadUrl,
          speech_model: providerModel || config.defaultModel,
          speech_models: [providerModel || config.defaultModel],
        }),
      },
      STT_TIMEOUT_MS,
      () => createSttTimeoutError({ provider, language }),
      abortSignal,
    );
  } catch (error) {
    throw normalizeProviderTransportError({
      provider,
      language,
      error,
      action: "transcription",
    });
  }

  if (!transcriptResponse.ok) {
    const errorText = await transcriptResponse.text();
    throw buildProviderHttpError({
      provider,
      language,
      status: transcriptResponse.status,
      errorText,
      action: "transcription",
    });
  }

  const transcriptData = await transcriptResponse.json();
  const transcriptId =
    typeof transcriptData?.id === "string" ? transcriptData.id : null;

  if (!transcriptId) {
    throw new Error("AssemblyAI did not return a transcript ID.");
  }

  for (let attempt = 0; attempt < ASSEMBLYAI_MAX_POLLS; attempt += 1) {
    throwIfAborted(abortSignal);

    let pollResponse: Awaited<ReturnType<typeof fetch>>;

    try {
      pollResponse = await fetchWithTimeout(
        `${config.endpointBase}/transcript/${transcriptId}`,
        {
          method: "GET",
          headers: {
            Authorization: apiKeyValue,
          },
        },
        STT_TIMEOUT_MS,
        () => createSttTimeoutError({ provider, language }),
        abortSignal,
      );
    } catch (error) {
      throw normalizeProviderTransportError({
        provider,
        language,
        error,
        action: "transcription",
      });
    }

    if (!pollResponse.ok) {
      const errorText = await pollResponse.text();
      throw buildProviderHttpError({
        provider,
        language,
        status: pollResponse.status,
        errorText,
        action: "transcription",
      });
    }

    const pollData = await pollResponse.json();
    const status = typeof pollData?.status === "string" ? pollData.status : null;

    if (status === "completed") {
      const text = pollData?.text?.trim();
      return text ? text : null;
    }

    if (status === "error") {
      throw buildProviderHttpError({
        provider,
        language,
        status: 400,
        errorText: JSON.stringify({
          error: {
            message: pollData?.error || "AssemblyAI transcription failed.",
          },
        }),
        action: "transcription",
      });
    }

    if (attempt < ASSEMBLYAI_MAX_POLLS - 1) {
      await wait(ASSEMBLYAI_POLL_INTERVAL_MS);
    }
  }

  throw createSttTimeoutError({ provider, language });
}

export async function transcribeWithDashScopeFileTranscriptionProvider(
  params: SharedProviderParams & {
    providerModel?: string;
  },
) {
  const { abortSignal, apiKey, fileUri, language, provider, providerModel } =
    params;

  if (!isRemoteAudioSource(fileUri)) {
    throw new Error(
      "DashScope long-file transcription requires a public audio URL.",
    );
  }

  let createResponse: Awaited<ReturnType<typeof fetch>>;

  try {
    createResponse = await fetchWithTimeout(
      "https://dashscope-intl.aliyuncs.com/api/v1/services/audio/asr/transcription",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${requireProviderKey(provider, apiKey, language)}`,
          "Content-Type": "application/json",
          "X-DashScope-Async": "enable",
        },
        body: JSON.stringify({
          model: providerModel || "qwen3-asr-flash-filetrans",
          input: {
            file_url: fileUri,
          },
          parameters: {
            channel_id: [0],
            enable_itn: false,
          },
        }),
      },
      STT_TIMEOUT_MS,
      () => createSttTimeoutError({ provider, language }),
      abortSignal,
    );
  } catch (error) {
    throw normalizeProviderTransportError({
      provider,
      language,
      error,
      action: "transcription",
    });
  }

  if (!createResponse.ok) {
    const errorText = await createResponse.text();
    throw buildProviderHttpError({
      provider,
      language,
      status: createResponse.status,
      errorText,
      action: "transcription",
    });
  }

  const createData = await createResponse.json();
  const taskId =
    typeof createData?.output?.task_id === "string"
      ? createData.output.task_id
      : null;

  if (!taskId) {
    throw new Error("DashScope did not return an async transcription task ID.");
  }

  for (let pollIndex = 0; pollIndex < DASHSCOPE_ASYNC_MAX_POLLS; pollIndex += 1) {
    let pollResponse: Awaited<ReturnType<typeof fetch>>;

    try {
      pollResponse = await fetchWithTimeout(
        `https://dashscope-intl.aliyuncs.com/api/v1/tasks/${encodeURIComponent(taskId)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${requireProviderKey(
              provider,
              apiKey,
              language,
            )}`,
            "X-DashScope-Async": "enable",
            "Content-Type": "application/json",
          },
        },
        STT_TIMEOUT_MS,
        () => createSttTimeoutError({ provider, language }),
        abortSignal,
      );
    } catch (error) {
      throw normalizeProviderTransportError({
        provider,
        language,
        error,
        action: "transcription",
      });
    }

    if (!pollResponse.ok) {
      const errorText = await pollResponse.text();
      throw buildProviderHttpError({
        provider,
        language,
        status: pollResponse.status,
        errorText,
        action: "transcription",
      });
    }

    const pollData = await pollResponse.json();
    const taskStatus =
      typeof pollData?.output?.task_status === "string"
        ? pollData.output.task_status
        : null;
    const transcriptionUrl =
      typeof pollData?.output?.result?.transcription_url === "string"
        ? pollData.output.result.transcription_url
        : null;

    if (taskStatus === "SUCCEEDED" && transcriptionUrl) {
      const transcriptionResponse = await fetchWithTimeout(
        transcriptionUrl,
        {
          method: "GET",
        },
        STT_TIMEOUT_MS,
        () => createSttTimeoutError({ provider, language }),
        abortSignal,
      );

      if (!transcriptionResponse.ok) {
        const errorText = await transcriptionResponse.text();
        throw buildProviderHttpError({
          provider,
          language,
          status: transcriptionResponse.status,
          errorText,
          action: "transcription",
        });
      }

      const transcriptionData = await transcriptionResponse.json();
      const transcript = Array.isArray(transcriptionData?.transcripts)
        ? transcriptionData.transcripts
            .map((item: any) =>
              typeof item?.text === "string" ? item.text.trim() : "",
            )
            .filter(Boolean)
            .join("\n")
        : "";

      return transcript || null;
    }

    if (taskStatus === "FAILED") {
      throw new Error(
        typeof pollData?.output?.message === "string"
          ? pollData.output.message
          : "DashScope async transcription failed.",
      );
    }

    throwIfAborted(abortSignal);
    await wait(DASHSCOPE_ASYNC_POLL_INTERVAL_MS);
  }

  throw createSttTimeoutError({ provider, language });
}

export async function transcribeWithDeepgramPreRecordedProvider(
  params: SharedProviderParams & {
    config: DeepgramPreRecordedTranscriptionConfig;
  },
) {
  const { abortSignal, apiKey, config, fileUri, language, provider, providerModel } =
    params;
  const apiKeyValue = requireProviderKey(provider, apiKey, language);
  const modelId = providerModel || config.defaultModel;
  const fileBytes = base64ToBytes(
    await FileSystem.readAsStringAsync(fileUri, {
      encoding: "base64",
    }),
  );

  let response: Awaited<ReturnType<typeof fetch>>;

  try {
    response = await fetchWithTimeout(
      `${config.endpointBase}/listen?model=${encodeURIComponent(modelId)}&smart_format=true`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${apiKeyValue}`,
          "Content-Type": getFileAudioMimeType(fileUri),
        },
        body: fileBytes,
      },
      STT_TIMEOUT_MS,
      () => createSttTimeoutError({ provider, language }),
      abortSignal,
    );
  } catch (error) {
    throw normalizeProviderTransportError({
      provider,
      language,
      error,
      action: "transcription",
    });
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw buildProviderHttpError({
      provider,
      language,
      status: response.status,
      errorText,
      action: "transcription",
    });
  }

  const data = await response.json();
  const text = data?.results?.channels?.[0]?.alternatives?.[0]?.transcript?.trim();
  return text ? text : null;
}

export async function transcribeWithElevenLabsProvider(
  params: SharedProviderParams & {
    config: ElevenLabsTranscriptionConfig;
  },
) {
  const { abortSignal, apiKey, config, fileUri, language, provider, providerModel } =
    params;
  const formData = new FormData();

  formData.append(
    "file",
    {
      uri: fileUri,
      type: getFileAudioMimeType(fileUri),
      name: fileUri.split("/").pop() || "recording.m4a",
    } as any,
  );
  formData.append("model_id", providerModel || config.defaultModel);

  let response: Awaited<ReturnType<typeof fetch>>;

  try {
    response = await fetchWithTimeout(
      config.endpoint,
      {
        method: "POST",
        headers: {
          "xi-api-key": requireProviderKey(provider, apiKey, language),
        },
        body: formData,
      },
      STT_TIMEOUT_MS,
      () => createSttTimeoutError({ provider, language }),
      abortSignal,
    );
  } catch (error) {
    throw normalizeProviderTransportError({
      provider,
      language,
      error,
      action: "transcription",
    });
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw buildProviderHttpError({
      provider,
      language,
      status: response.status,
      errorText,
      action: "transcription",
    });
  }

  const data = await response.json();
  const text = data?.text?.trim();
  return text ? text : null;
}
