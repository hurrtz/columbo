import * as FileSystem from "expo-file-system/legacy";

import { buildProviderHttpError, normalizeProviderTransportError } from "../providerErrors";
import type { AppLanguage, Provider } from "../../types";
import {
  buildAzureOpenAiChatCompletionsEndpoint,
  requireAzureOpenAiCredentials,
} from "../azure";
import {
  getReplicateInputProperty,
  getReplicateModelMetadata,
  runReplicatePrediction,
} from "../replicate/runtime";
import { getDeviceLocale, getFileAudioMimeType } from "../../utils/speechLanguage";
import { fetchWithTimeout } from "./abort";
import { getProviderSttTimeoutMs } from "./config";
import type {
  AssemblyAiPreRecordedTranscriptionConfig,
  AzureOpenAiAudioInputTranscriptionConfig,
  DeepInfraInferenceTranscriptionConfig,
  BaiduShortSpeechTranscriptionConfig,
  DeepgramPreRecordedTranscriptionConfig,
  ElevenLabsTranscriptionConfig,
  FishAudioTranscriptionConfig,
  FireworksPreRecordedTranscriptionConfig,
  HuggingFaceJsonTranscriptionConfig,
  NovitaJsonTranscriptionConfig,
  OpenAiAudioInputTranscriptionConfig,
  MultipartTranscriptionConfig,
  ReplicateTranscriptionConfig,
} from "./config";
import {
  createSttTimeoutError,
  extractTextFromOpenAiAudioInputResponse,
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
      getProviderSttTimeoutMs(provider),
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
  return transcribeWithOpenAiStyleAudioInputProvider({
    ...params,
    endpoint: params.config.endpoint,
    headers: {
      Authorization: `Bearer ${requireProviderKey(
        params.provider,
        params.apiKey,
        params.language,
      )}`,
    },
  });
}

async function transcribeWithOpenAiStyleAudioInputProvider(
  params: SharedProviderParams & {
    endpoint: string;
    headers: Record<string, string>;
    config:
      | AzureOpenAiAudioInputTranscriptionConfig
      | OpenAiAudioInputTranscriptionConfig;
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
      params.endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...params.headers,
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
      getProviderSttTimeoutMs(provider),
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

export async function transcribeWithAzureOpenAiAudioInputProvider(
  params: SharedProviderParams & {
    config: AzureOpenAiAudioInputTranscriptionConfig;
  },
) {
  const credentials = requireAzureOpenAiCredentials(
    params.apiKey,
    params.language,
  );

  return transcribeWithOpenAiStyleAudioInputProvider({
    ...params,
    endpoint: buildAzureOpenAiChatCompletionsEndpoint(credentials.endpoint),
    headers: {
      "api-key": credentials.apiKey,
    },
  });
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
      getProviderSttTimeoutMs(provider),
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
      getProviderSttTimeoutMs(provider),
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
      getProviderSttTimeoutMs(provider),
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
      getProviderSttTimeoutMs(provider),
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
      getProviderSttTimeoutMs(provider),
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
      getProviderSttTimeoutMs(provider),
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
      getProviderSttTimeoutMs(provider),
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
      getProviderSttTimeoutMs(provider),
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
        getProviderSttTimeoutMs(provider),
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
      getProviderSttTimeoutMs(provider),
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
      getProviderSttTimeoutMs(provider),
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
