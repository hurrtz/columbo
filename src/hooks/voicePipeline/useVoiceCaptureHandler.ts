import { useCallback, useRef } from "react";

import { recordDebugLogEvent } from "../../services/debugLogCapture";
import { runVoicePipeline } from "../../services/voicePipeline";
import type {
  MessageMetadata,
  MessagePipelineNotice,
  UsageEstimate,
} from "../../types";
import type { PipelinePhase, UseVoicePipelineParams } from "./types";

function getUnexpectedIssueDetail(
  error: unknown,
  fallbackMessage: string,
): string | undefined {
  if (!(error instanceof Error)) {
    return undefined;
  }

  const detail = error.message.trim();

  if (!detail) {
    return undefined;
  }

  return detail === fallbackMessage ? undefined : detail;
}

function formatNoticeToast(notice: MessagePipelineNotice) {
  return notice.detail ? `${notice.message} ${notice.detail}` : notice.message;
}

type VoiceCaptureHandlerParams = Omit<UseVoicePipelineParams, "isRecording"> & {
  abortRef: React.MutableRefObject<AbortController | null>;
  handleRepeatLastReply: (
    textOverride?: string,
    messageId?: string,
  ) => Promise<void>;
  lastCompletedReplyRef: React.MutableRefObject<string>;
  setPipelinePhase: (phase: PipelinePhase) => void;
  setStreamingText: (text: string | ((prev: string) => string)) => void;
};

export function useVoiceCaptureHandler({
  abortRef,
  activeConversation,
  addMessage,
  assistantInstructions,
  createConversation,
  handleRepeatLastReply,
  language,
  lastCompletedReplyRef,
  localTtsVoices,
  model,
  player,
  provider,
  providerApiKey,
  replyPlayback,
  responseLength,
  responseTone,
  selectedSttModel,
  selectedTtsModel,
  selectedTtsVoice,
  setPipelinePhase,
  setStreamingText,
  showToast,
  spokenRepliesEnabled,
  sttApiKey,
  sttMode,
  sttProvider,
  t,
  ttsApiKey,
  ttsListenLanguages,
  ttsMode,
  ttsProvider,
  updateConversationContextSummary,
  updateMessage,
  webSearchApiKey,
  webSearchMode,
  webSearchOptions,
  webSearchProvider,
}: VoiceCaptureHandlerParams) {
  const ttsFallbackToastShownRef = useRef(false);
  const playbackStartedRef = useRef(false);
  const lastUserMessageIdRef = useRef<string | null>(null);
  const lastAssistantMessageIdRef = useRef<string | null>(null);
  const pendingAssistantNoticesRef = useRef<MessagePipelineNotice[]>([]);

  const appendNoticeMetadata = useCallback(
    (
      metadata: MessageMetadata | undefined,
      notice: MessagePipelineNotice,
    ): MessageMetadata => {
      const notices = metadata?.notices ?? [];
      const alreadyPresent = notices.some(
        (entry) =>
          entry.stage === notice.stage &&
          entry.message === notice.message &&
          entry.detail === notice.detail,
      );

      return {
        ...metadata,
        notices: alreadyPresent ? notices : [...notices, notice],
      };
    },
    [],
  );

  const handleVoiceCaptureDone = useCallback(
    async ({
      audioUri,
      transcriptionOverride,
    }: {
      audioUri?: string;
      transcriptionOverride?: string;
    }) => {
      recordDebugLogEvent({
        event: "voice-pipeline-handle-capture-start",
        payload: {
          hasAudioUri: !!audioUri,
          hasTranscriptionOverride: !!transcriptionOverride,
          ttsMode,
        },
      });
      setPipelinePhase(transcriptionOverride ? "thinking" : "transcribing");
      setStreamingText("");
      ttsFallbackToastShownRef.current = false;
      playbackStartedRef.current = false;
      lastUserMessageIdRef.current = null;
      lastAssistantMessageIdRef.current = null;
      pendingAssistantNoticesRef.current = [];
      abortRef.current = new AbortController();
      player.resetCancellation();

      try {
        const transcription = await runVoicePipeline({
          audioUri,
          transcriptionOverride,
          messages: activeConversation?.messages || [],
          contextSummary: activeConversation?.contextSummary,
          summarizedMessageCount: activeConversation?.summarizedMessageCount,
          model,
          provider,
          providerApiKey,
          sttMode,
          sttProvider,
          sttApiKey,
          sttModel: selectedSttModel,
          ttsMode,
          ttsProvider,
          ttsApiKey,
          ttsModel: selectedTtsModel,
          ttsVoice: selectedTtsVoice,
          ttsListenLanguages,
          localTtsVoices,
          replyPlayback,
          spokenRepliesEnabled,
          assistantInstructions,
          responseLength,
          responseTone,
          language,
          webSearchMode,
          webSearchProvider,
          webSearchApiKey,
          webSearchOptions,
          abortSignal: abortRef.current!.signal,
          callbacks: {
            onTranscription: (text) => {
              recordDebugLogEvent({
                event: "voice-pipeline-transcription-ready",
                payload: {
                  textLength: text.trim().length,
                },
              });
              setPipelinePhase("thinking");
              if (!activeConversation) {
                createConversation(text, model, provider);
              }
              const userMessage = addMessage({
                role: "user",
                content: text,
                model: null,
                provider: null,
              });
              lastUserMessageIdRef.current = userMessage?.id ?? null;
            },
            onContextSummary: (summary, summarizedCount, usage) => {
              recordDebugLogEvent({
                event: "voice-pipeline-context-summary-updated",
                payload: {
                  summarizedCount,
                  summaryLength: summary.trim().length,
                  totalTokens: usage?.totalTokens ?? null,
                },
              });
              updateConversationContextSummary(
                summary,
                summarizedCount,
                usage,
                model,
                provider,
              );
            },
            onWebSearchStart: () => {
              recordDebugLogEvent({
                event: "voice-pipeline-web-search-start",
              });
              setPipelinePhase("searching");
            },
            onWebSearchComplete: () => {
              recordDebugLogEvent({
                event: "voice-pipeline-web-search-complete",
              });
              setPipelinePhase(
                playbackStartedRef.current ? "speaking" : "thinking",
              );
            },
            onWebSearchFallback: (error) => {
              const notice: MessagePipelineNotice = {
                stage: "web-search",
                level: "warning",
                message: t("webSearchFallback"),
                detail: getUnexpectedIssueDetail(error, t("webSearchFallback")),
              };
              recordDebugLogEvent({
                event: "voice-pipeline-web-search-fallback",
                level: "warn",
                payload: {
                  message: error.message,
                },
              });
              setPipelinePhase(
                playbackStartedRef.current ? "speaking" : "thinking",
              );
              pendingAssistantNoticesRef.current = [
                ...pendingAssistantNoticesRef.current,
                notice,
              ];
              showToast(formatNoticeToast(notice));
            },
            onChunk: (text) => {
              recordDebugLogEvent({
                event: "voice-pipeline-stream-chunk",
                payload: {
                  chunkLength: text.length,
                },
              });
              setPipelinePhase(
                playbackStartedRef.current ? "speaking" : "thinking",
              );
              setStreamingText((prev) => prev + text);
            },
            onResponseDone: (
              fullText,
              usage?: UsageEstimate,
              metadata?: MessageMetadata,
            ) => {
              recordDebugLogEvent({
                event: "voice-pipeline-response-done",
                payload: {
                  textLength: fullText.trim().length,
                  totalTokens: usage?.totalTokens ?? null,
                },
              });
              setStreamingText("");
              setPipelinePhase(
                playbackStartedRef.current
                  ? "speaking"
                  : spokenRepliesEnabled
                    ? ttsMode === "native"
                      ? "speaking"
                      : "synthesizing"
                    : "thinking",
              );
              lastCompletedReplyRef.current = fullText;
              const assistantNotices = pendingAssistantNoticesRef.current;
              const assistantMessage = addMessage({
                role: "assistant",
                content: fullText,
                model,
                provider,
                usage,
                metadata:
                  assistantNotices.length > 0
                    ? {
                        ...metadata,
                        notices: assistantNotices.reduce(
                          (allNotices, notice) =>
                            appendNoticeMetadata(
                              { notices: allNotices },
                              notice,
                            ).notices ?? allNotices,
                          metadata?.notices ?? [],
                        ),
                      }
                    : metadata,
              });
              lastAssistantMessageIdRef.current = assistantMessage?.id ?? null;
              pendingAssistantNoticesRef.current = [];
            },
            onAudioReady: (audioData, diagnostics) => {
              recordDebugLogEvent({
                event: "voice-pipeline-audio-ready",
                payload: {
                  requestId: diagnostics?.requestId ?? null,
                  uri: audioData,
                },
              });
              playbackStartedRef.current = true;
              setPipelinePhase("speaking");
              player.enqueueAudio(audioData, diagnostics);
            },
            onSpeechTextReady: (text, _voice, diagnostics) => {
              recordDebugLogEvent({
                event: "voice-pipeline-speech-text-ready",
                payload: {
                  requestId: diagnostics?.requestId ?? null,
                  textLength: text.trim().length,
                },
              });
              playbackStartedRef.current = true;
              setPipelinePhase("speaking");
              player.speakText(text, {
                diagnostics,
              });
            },
            onTtsFallback: (error) => {
              const noticeMessage =
                ttsMode === "local"
                  ? t("localVoiceFallback")
                  : t("providerVoiceFallback");
              const notice: MessagePipelineNotice = {
                stage: "tts",
                level: "warning",
                message: noticeMessage,
                detail: getUnexpectedIssueDetail(error, noticeMessage),
              };
              recordDebugLogEvent({
                event: "voice-pipeline-tts-fallback",
                level: "warn",
                payload: {
                  message: error.message,
                  ttsMode,
                },
              });
              if (ttsFallbackToastShownRef.current) {
                return;
              }

              if (lastAssistantMessageIdRef.current) {
                updateMessage(lastAssistantMessageIdRef.current, (message) => ({
                  ...message,
                  metadata: appendNoticeMetadata(message.metadata, notice),
                }));
              } else {
                pendingAssistantNoticesRef.current = [
                  ...pendingAssistantNoticesRef.current,
                  notice,
                ];
              }

              ttsFallbackToastShownRef.current = true;
              showToast(formatNoticeToast(notice));
            },
            onError: async (error) => {
              recordDebugLogEvent({
                event: "voice-pipeline-error",
                level: "error",
                payload: {
                  hasAudioUri: !!audioUri,
                  hasTranscriptionOverride: !!transcriptionOverride,
                  message: error.message,
                },
              });
              await player.stopPlayback();
              setPipelinePhase("idle");
              const retryAction = lastCompletedReplyRef.current.trim()
                ? () => {
                    void handleRepeatLastReply(lastCompletedReplyRef.current);
                  }
                : () => {
                    void handleVoiceCaptureDone({
                      audioUri,
                      transcriptionOverride,
                    });
                  };

              showToast(error.message, retryAction);
            },
          },
        });

        if (!transcription) {
          recordDebugLogEvent({
            event: "voice-pipeline-no-transcription",
            level: "warn",
          });
          showToast(t("couldntCatchThatTryAgain"));
        }
      } catch (error) {
        if (abortRef.current?.signal.aborted) {
          recordDebugLogEvent({
            event: "voice-pipeline-aborted",
            payload: {
              hasAudioUri: !!audioUri,
              hasTranscriptionOverride: !!transcriptionOverride,
            },
          });
          return;
        }

        recordDebugLogEvent({
          event: "voice-pipeline-catch-error",
          level: "error",
          payload: {
            message:
              error instanceof Error ? error.message : t("couldntProcessVoiceInput"),
          },
        });
        const errorMessage =
          error instanceof Error ? error.message : t("couldntProcessVoiceInput");

        if (!lastAssistantMessageIdRef.current && lastUserMessageIdRef.current) {
          const pendingNotices = pendingAssistantNoticesRef.current;

          if (pendingNotices.length > 0) {
            updateMessage(lastUserMessageIdRef.current, (message) => ({
              ...message,
              metadata: {
                ...message.metadata,
                notices: pendingNotices.reduce(
                  (allNotices, notice) =>
                    appendNoticeMetadata(
                      { notices: allNotices },
                      notice,
                    ).notices ?? allNotices,
                  message.metadata?.notices ?? [],
                ),
              },
            }));
            pendingAssistantNoticesRef.current = [];
          }
        }

        if (
          !transcriptionOverride &&
          !lastUserMessageIdRef.current &&
          activeConversation
        ) {
          addMessage({
            role: "assistant",
            content: "",
            model: null,
            provider: null,
            metadata: {
              notices: [
                {
                  stage: "stt",
                  level: "error",
                  message: errorMessage,
                },
              ],
            },
          });
        }

        showToast(errorMessage);
      } finally {
        recordDebugLogEvent({
          event: "voice-pipeline-finalizing",
          payload: {
            hasPendingPlayback: player.hasPendingPlaybackNow(),
          },
        });
        if (player.hasPendingPlaybackNow()) {
          setPipelinePhase("speaking");
        }

        if (player.hasPendingPlaybackNow()) {
          await player.waitForDrain();
        }
        setPipelinePhase("idle");
        recordDebugLogEvent({
          event: "voice-pipeline-finished",
          payload: {
            finalPhase: "idle",
          },
        });
      }
    },
    [
      abortRef,
      activeConversation,
      addMessage,
      appendNoticeMetadata,
      assistantInstructions,
      createConversation,
      handleRepeatLastReply,
      language,
      lastCompletedReplyRef,
      localTtsVoices,
      model,
      player,
      provider,
      providerApiKey,
      replyPlayback,
      responseLength,
      responseTone,
      selectedSttModel,
      selectedTtsModel,
      selectedTtsVoice,
      setPipelinePhase,
      setStreamingText,
      showToast,
      spokenRepliesEnabled,
      sttApiKey,
      sttMode,
      sttProvider,
      t,
      ttsApiKey,
      ttsListenLanguages,
      ttsMode,
      ttsProvider,
      updateConversationContextSummary,
      updateMessage,
      webSearchApiKey,
      webSearchMode,
      webSearchOptions,
      webSearchProvider,
    ],
  );

  return {
    handleVoiceCaptureDone,
  };
}
