import {
  useCallback,
  useEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";

import { recordDebugLogEvent } from "../../services/debugLogCapture";
import {
  createLatencyRouteKey,
  getDefaultLatencyEstimateMs,
  getLatencyProgress,
  loadLatencyEstimate,
  recordLatencySample,
  type LatencyRouteDescriptor,
} from "../../services/latencyStats";
import { runVoicePipeline } from "../../services/voicePipeline";
import type {
  MessageMetadata,
  MessagePipelineNotice,
  UsageEstimate,
  VoicePhaseProgress,
  VoicePhaseProgressPhase,
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
  setPhaseProgress: Dispatch<SetStateAction<VoicePhaseProgress | null>>;
  setPipelinePhase: (phase: PipelinePhase) => void;
  setStreamingText: (text: string | ((prev: string) => string)) => void;
};

interface ActiveLatencyProgress {
  phase: VoicePhaseProgressPhase;
  key: string;
  startedAt: number;
  estimatedMs: number;
  sampleCount: number;
  learned: boolean;
  interval: ReturnType<typeof setInterval>;
  runId: number;
}

export function useVoiceCaptureHandler({
  abortRef,
  activeConversation,
  addMessage,
  assistantInstructions,
  createConversation,
  handleRepeatLastReply,
  language,
  lastCompletedReplyRef,
  model,
  modelEffort,
  player,
  provider,
  providerApiKey,
  replyPlayback,
  responseLength,
  responseTone,
  selectedSttModel,
  selectedTtsModel,
  selectedTtsVoice,
  setPhaseProgress,
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
  const activeLatencyProgressRef = useRef<ActiveLatencyProgress | null>(null);
  const latencyRunIdRef = useRef(0);

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

  const updateLatencyProgress = useCallback(
    (active: ActiveLatencyProgress) => {
      const elapsedMs = Date.now() - active.startedAt;
      const progress = getLatencyProgress(elapsedMs, active.estimatedMs);

      setPhaseProgress({
        phase: active.phase,
        progress: progress.progress,
        elapsedMs,
        startedAt: active.startedAt,
        estimatedMs: active.estimatedMs,
        sampleCount: active.sampleCount,
        learned: active.learned,
        overEstimate: progress.overEstimate,
      });
    },
    [setPhaseProgress],
  );

  const clearLatencyProgress = useCallback(() => {
    const active = activeLatencyProgressRef.current;

    if (active) {
      clearInterval(active.interval);
    }

    latencyRunIdRef.current += 1;
    activeLatencyProgressRef.current = null;
    setPhaseProgress(null);
  }, [setPhaseProgress]);

  const startLatencyProgress = useCallback(
    (
      phase: VoicePhaseProgressPhase,
      descriptor: LatencyRouteDescriptor,
    ) => {
      clearLatencyProgress();

      const runId = latencyRunIdRef.current + 1;
      latencyRunIdRef.current = runId;
      const startedAt = Date.now();
      const fallbackEstimateMs = getDefaultLatencyEstimateMs(descriptor);
      const key = createLatencyRouteKey(descriptor);
      const active: ActiveLatencyProgress = {
        phase,
        key,
        startedAt,
        estimatedMs: fallbackEstimateMs,
        sampleCount: 0,
        learned: false,
        interval: setInterval(() => {
          const current = activeLatencyProgressRef.current;

          if (current?.runId === runId) {
            updateLatencyProgress(current);
          }
        }, 250),
        runId,
      };

      activeLatencyProgressRef.current = active;
      updateLatencyProgress(active);

      void loadLatencyEstimate(descriptor).then((estimate) => {
        const current = activeLatencyProgressRef.current;

        if (current?.runId !== runId) {
          return;
        }

        current.estimatedMs = estimate.estimatedMs;
        current.sampleCount = estimate.sampleCount;
        current.learned = estimate.learned;
        updateLatencyProgress(current);
      });
    },
    [clearLatencyProgress, updateLatencyProgress],
  );

  const recordLatencyProgressSample = useCallback(
    (phase: VoicePhaseProgressPhase) => {
      const active = activeLatencyProgressRef.current;

      if (!active || active.phase !== phase) {
        return;
      }

      const durationMs = Date.now() - active.startedAt;
      const key = active.key;

      void recordLatencySample(key, durationMs);
      recordDebugLogEvent({
        event: "adaptive-latency-sample-recorded",
        payload: {
          durationMs,
          key,
          phase,
        },
      });
    },
    [],
  );

  const finishLatencyProgress = useCallback(
    (phase: VoicePhaseProgressPhase) => {
      recordLatencyProgressSample(phase);
      clearLatencyProgress();
    },
    [clearLatencyProgress, recordLatencyProgressSample],
  );

  useEffect(() => clearLatencyProgress, [clearLatencyProgress]);

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
      clearLatencyProgress();
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
          modelEffort,
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
              startLatencyProgress("searching", {
                phase: "web-search",
                provider: webSearchProvider ?? null,
                webSearchMode,
              });
              setPipelinePhase("searching");
            },
            onWebSearchComplete: () => {
              recordDebugLogEvent({
                event: "voice-pipeline-web-search-complete",
              });
              finishLatencyProgress("searching");
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
            onLlmStart: () => {
              startLatencyProgress("thinking", {
                phase: "llm-response",
                provider,
                model,
                effort: modelEffort,
                responseLength,
                responseTone,
                webSearchMode,
                webSearchProvider,
              });
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
              finishLatencyProgress("thinking");
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
              const noticeMessage = t("providerVoiceFallback");
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
              clearLatencyProgress();
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
          clearLatencyProgress();
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
        clearLatencyProgress();
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
      clearLatencyProgress,
      createConversation,
      finishLatencyProgress,
      handleRepeatLastReply,
      language,
      lastCompletedReplyRef,
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
      startLatencyProgress,
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
