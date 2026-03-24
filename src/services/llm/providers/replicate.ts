import {
  buildProviderHttpError,
  normalizeProviderTransportError,
} from "../../providerErrors";
import { AppLanguage, Provider } from "../../../types";
import {
  getReplicateInputProperty,
  getReplicateModelMetadata,
  runReplicatePrediction,
} from "../../replicate/runtime";

import { ChatMessage, requireProviderKey } from "../shared";

function buildReplicatePrompt(messages: ChatMessage[]) {
  return `${messages
    .map((message) =>
      message.role === "user"
        ? `User: ${message.content}`
        : `Assistant: ${message.content}`,
    )
    .join("\n\n")}\n\nAssistant:`;
}

function extractReplicateText(output: unknown): string {
  if (typeof output === "string") {
    return output.trim();
  }

  if (Array.isArray(output)) {
    return output
      .map((part) => (typeof part === "string" ? part : ""))
      .join("")
      .trim();
  }

  if (
    typeof output === "object" &&
    output !== null &&
    typeof (output as any).text === "string"
  ) {
    return (output as any).text.trim();
  }

  return "";
}

export async function requestReplicateChat(params: {
  provider: Provider;
  model: string;
  messages: ChatMessage[];
  apiKey: string;
  language: AppLanguage;
  systemPrompt: string;
  abortSignal?: AbortSignal;
}) {
  const apiKey = requireProviderKey(params.provider, params.apiKey, params.language);
  const prompt = buildReplicatePrompt(params.messages);
  let metadata;

  try {
    metadata = await getReplicateModelMetadata({
      apiKey,
      modelId: params.model,
      abortSignal: params.abortSignal,
    });
  } catch (error) {
    throw normalizeProviderTransportError({
      provider: params.provider,
      language: params.language,
      error,
      action: "reply",
    });
  }

  const input: Record<string, unknown> = {};

  const promptField = getReplicateInputProperty(metadata.inputProperties, [
    "prompt",
    "input",
    "query",
  ]);
  const systemField = getReplicateInputProperty(metadata.inputProperties, [
    "system_prompt",
    "instructions",
  ]);

  if (promptField) {
    input[promptField] = prompt;
  }

  if (systemField) {
    input[systemField] = params.systemPrompt;
  }

  if (!promptField && !systemField) {
    input.prompt = prompt;
    input.instructions = params.systemPrompt;
  }

  if ("max_tokens" in metadata.inputProperties) {
    input.max_tokens = 1024;
  } else if ("max_completion_tokens" in metadata.inputProperties) {
    input.max_completion_tokens = 1024;
  }

  let output: unknown;

  try {
    output = await runReplicatePrediction({
      apiKey,
      modelId: params.model,
      input,
      abortSignal: params.abortSignal,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.startsWith("{")) {
      throw buildProviderHttpError({
        provider: params.provider,
        language: params.language,
        status: 400,
        errorText: message,
        action: "reply",
      });
    }

    throw normalizeProviderTransportError({
      provider: params.provider,
      language: params.language,
      error,
      action: "reply",
    });
  }

  return extractReplicateText(output);
}
