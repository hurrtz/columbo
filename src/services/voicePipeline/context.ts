import { summarizeConversationContext } from "../llm";
import { buildConversationContextPlan } from "../conversationContext";
import type { Message } from "../../types";
import type { RunVoicePipelineParams } from "./types";

interface ResolveContextualMessagesParams {
  abortSignal?: AbortSignal;
  callbacks: RunVoicePipelineParams["callbacks"];
  contextSummary?: string;
  language: RunVoicePipelineParams["language"];
  messages: Message[];
  model: string;
  provider: RunVoicePipelineParams["provider"];
  providerApiKey: string;
  summarizedMessageCount?: number;
}

export async function resolveContextualMessages({
  abortSignal,
  callbacks,
  contextSummary,
  language,
  messages,
  model,
  provider,
  providerApiKey,
  summarizedMessageCount,
}: ResolveContextualMessagesParams) {
  const contextPlan = buildConversationContextPlan({
    messages,
    contextSummary,
    summarizedMessageCount,
  });
  let effectiveSummary = contextSummary?.trim() ?? "";
  let contextualMessages = contextPlan.recentMessages;

  if (contextPlan.needsSummaryUpdate) {
    try {
      const { summary: updatedSummary, usage } =
        await summarizeConversationContext({
          existingSummary: effectiveSummary,
          messages: contextPlan.messagesToSummarize,
          model,
          provider,
          apiKey: providerApiKey,
          language,
          abortSignal,
        });

      if (abortSignal?.aborted) {
        return {
          aborted: true,
          contextualMessages,
          effectiveSummary,
        } as const;
      }

      if (updatedSummary) {
        effectiveSummary = updatedSummary;
        callbacks.onContextSummary?.(
          updatedSummary,
          contextPlan.targetSummarizedCount,
          usage,
        );
      } else if (!effectiveSummary) {
        contextualMessages = contextPlan.fallbackRecentMessages;
      }
    } catch {
      if (abortSignal?.aborted) {
        return {
          aborted: true,
          contextualMessages,
          effectiveSummary,
        } as const;
      }

      contextualMessages = contextPlan.fallbackRecentMessages;
    }
  }

  return {
    aborted: false,
    contextualMessages,
    effectiveSummary,
  } as const;
}
