import * as FileSystem from "expo-file-system/legacy";

import { buildProviderHttpError, normalizeProviderTransportError } from "../providerErrors";
import type { AppLanguage, Provider } from "../../types";
import { getDeviceLocale, getFileAudioMimeType } from "../../utils/speechLanguage";
import { fetchWithTimeout } from "./abort";
import { STT_TIMEOUT_MS } from "./config";
import type {
  AssemblyAiPreRecordedTranscriptionConfig,
  DeepgramPreRecordedTranscriptionConfig,
  ElevenLabsTranscriptionConfig,
  FireworksPreRecordedTranscriptionConfig,
  GeminiTranscriptionConfig,
  NovitaJsonTranscriptionConfig,
  OpenAiAudioInputTranscriptionConfig,
  MultipartTranscriptionConfig,
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
