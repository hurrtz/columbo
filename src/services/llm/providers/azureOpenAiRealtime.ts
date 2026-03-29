import { AppLanguage, Provider } from "../../../types";
import {
  buildAzureOpenAiRealtimeEndpoint,
  requireAzureOpenAiCredentials,
} from "../../azure";

import { requestRealtimeChatViaWebSocket } from "./openaiRealtime";
import type { ChatMessage } from "../shared";

function getAzureOpenAiRealtimeRequestConfig(params: {
  apiKey: string;
  language: AppLanguage;
  model: string;
}) {
  const credentials = requireAzureOpenAiCredentials(
    params.apiKey,
    params.language,
  );

  return {
    url: buildAzureOpenAiRealtimeEndpoint(credentials.endpoint, params.model),
    headers: {
      "api-key": credentials.apiKey,
    },
  };
}

export async function requestAzureOpenAiRealtimeChat(params: {
  provider: Provider;
  model: string;
  messages: ChatMessage[];
  apiKey: string;
  language: AppLanguage;
  systemPrompt: string;
  abortSignal?: AbortSignal;
}) {
  const requestConfig = getAzureOpenAiRealtimeRequestConfig(params);

  return requestRealtimeChatViaWebSocket({
    provider: params.provider,
    model: params.model,
    language: params.language,
    systemPrompt: params.systemPrompt,
    messages: params.messages,
    url: requestConfig.url,
    headers: requestConfig.headers,
    abortSignal: params.abortSignal,
  });
}

export async function requestAzureOpenAiRealtimeChatStream(params: {
  provider: Provider;
  model: string;
  messages: ChatMessage[];
  apiKey: string;
  language: AppLanguage;
  systemPrompt: string;
  onChunk: (text: string) => void;
  abortSignal?: AbortSignal;
}) {
  const requestConfig = getAzureOpenAiRealtimeRequestConfig(params);

  return requestRealtimeChatViaWebSocket({
    provider: params.provider,
    model: params.model,
    language: params.language,
    systemPrompt: params.systemPrompt,
    messages: params.messages,
    url: requestConfig.url,
    headers: requestConfig.headers,
    onChunk: params.onChunk,
    abortSignal: params.abortSignal,
  });
}
