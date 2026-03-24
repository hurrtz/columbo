import { parseEndpointApiKeyCredentials } from "../../providerCredentials";
import { AppLanguage, Provider } from "../../../types";

import {
  requestOpenAICompatibleChat,
  requestOpenAICompatibleChatStream,
} from "./openaiCompatible";
import { ChatMessage } from "../shared";

function buildAlephAlphaUrl(endpoint: string, path: "chat/completions") {
  return `${endpoint}/${path}`;
}

export async function requestAlephAlphaChat(params: {
  provider: Provider;
  model: string;
  messages: ChatMessage[];
  apiKey: string;
  language: AppLanguage;
  systemPrompt: string;
  abortSignal?: AbortSignal;
}) {
  const credentials = parseEndpointApiKeyCredentials(
    params.provider,
    params.apiKey,
    params.language,
  );

  return requestOpenAICompatibleChat({
    endpoint: buildAlephAlphaUrl(credentials.endpoint, "chat/completions"),
    provider: params.provider,
    model: params.model,
    messages: params.messages,
    apiKey: credentials.apiKey,
    language: params.language,
    systemPrompt: params.systemPrompt,
    abortSignal: params.abortSignal,
  });
}

export async function requestAlephAlphaChatStream(params: {
  provider: Provider;
  model: string;
  messages: ChatMessage[];
  apiKey: string;
  language: AppLanguage;
  systemPrompt: string;
  onChunk: (text: string) => void;
  abortSignal?: AbortSignal;
}) {
  const credentials = parseEndpointApiKeyCredentials(
    params.provider,
    params.apiKey,
    params.language,
  );

  return requestOpenAICompatibleChatStream({
    endpoint: buildAlephAlphaUrl(credentials.endpoint, "chat/completions"),
    provider: params.provider,
    model: params.model,
    messages: params.messages,
    apiKey: credentials.apiKey,
    language: params.language,
    systemPrompt: params.systemPrompt,
    onChunk: params.onChunk,
    abortSignal: params.abortSignal,
  });
}
