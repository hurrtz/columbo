import { AppLanguage, Provider } from "../../../types";
import {
  buildAzureOpenAiChatCompletionsEndpoint,
  requireAzureOpenAiCredentials,
} from "../../azure";

import {
  requestChatStreamWithOpenAiCompatibleTransport,
  requestChatWithOpenAiCompatibleTransport,
} from "./openaiCompatible";
import type { ChatMessage } from "../shared";

function getAzureOpenAiRequestConfig(params: {
  apiKey: string;
  language: AppLanguage;
}) {
  const credentials = requireAzureOpenAiCredentials(
    params.apiKey,
    params.language,
  );

  return {
    endpoint: buildAzureOpenAiChatCompletionsEndpoint(credentials.endpoint),
    headers: {
      "api-key": credentials.apiKey,
    },
  };
}

export async function requestAzureOpenAiChat(params: {
  provider: Provider;
  model: string;
  messages: ChatMessage[];
  apiKey: string;
  language: AppLanguage;
  systemPrompt: string;
  abortSignal?: AbortSignal;
}) {
  const requestConfig = getAzureOpenAiRequestConfig(params);

  return requestChatWithOpenAiCompatibleTransport({
    endpoint: requestConfig.endpoint,
    headers: requestConfig.headers,
    provider: params.provider,
    model: params.model,
    messages: params.messages,
    language: params.language,
    systemPrompt: params.systemPrompt,
    abortSignal: params.abortSignal,
  });
}

export async function requestAzureOpenAiChatStream(params: {
  provider: Provider;
  model: string;
  messages: ChatMessage[];
  apiKey: string;
  language: AppLanguage;
  systemPrompt: string;
  onChunk: (text: string) => void;
  abortSignal?: AbortSignal;
}) {
  const requestConfig = getAzureOpenAiRequestConfig(params);

  return requestChatStreamWithOpenAiCompatibleTransport({
    endpoint: requestConfig.endpoint,
    headers: requestConfig.headers,
    provider: params.provider,
    model: params.model,
    messages: params.messages,
    language: params.language,
    systemPrompt: params.systemPrompt,
    onChunk: params.onChunk,
    abortSignal: params.abortSignal,
  });
}
