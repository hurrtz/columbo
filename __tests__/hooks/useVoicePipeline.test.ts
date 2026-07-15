import { act, renderHook, waitFor } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { translate } from "../../src/i18n";
import { useVoicePipeline } from "../../src/hooks/useVoicePipeline";
import { DEFAULT_SETTINGS, type UsageEstimate } from "../../src/types";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));

jest.mock("expo-clipboard", () => ({
  setStringAsync: jest.fn(async () => undefined),
}));

jest.mock("expo-file-system/legacy", () => ({
  deleteAsync: jest.fn(async () => undefined),
}));

jest.mock("../../src/services/voicePipeline", () => ({
  runVoicePipeline: jest.fn(),
}));

jest.mock("../../src/services/tts", () => ({
  LOCAL_TTS_MAX_INPUT_CHARS: 420,
  PROVIDER_TTS_MAX_INPUT_CHARS: 3500,
  getProviderTtsTargetChunkChars: (provider?: string | null) => {
    if (provider === "gemini") return 300;
    if (provider === "alibaba-qwen-dashscope") return 550;
    return 600;
  },
  splitIntoSentences: (text: string): string[] => {
    const result: string[] = [];
    let current = "";

    for (const char of text) {
      current += char;

      if (char === "." || char === "!" || char === "?" || char === "\n") {
        result.push(current);
        current = "";
      }
    }

    if (current) {
      result.push(current);
    }

    return result;
  },
  splitTextForTts: (text: string, maxChars = 3500) => {
    const normalized = text.trim();

    if (!normalized) {
      return [];
    }

    const words = normalized.split(/\s+/);
    const chunks: string[] = [];
    let current = "";

    for (const word of words) {
      const next = current ? `${current} ${word}` : word;

      if (next.length <= maxChars) {
        current = next;
        continue;
      }

      if (current) {
        chunks.push(current);
      }

      current = word;
    }

    if (current) {
      chunks.push(current);
    }

    return chunks;
  },
  synthesizeSpeech: jest.fn(),
  synthesizeSpeechSequence: jest.fn(),
}));

jest.mock("../../src/services/speech/diagnostics", () => ({
  createSpeechRequestId: jest.fn(() => "speech-request-1"),
}));

import { runVoicePipeline } from "../../src/services/voicePipeline";
import { synthesizeSpeech, synthesizeSpeechSequence } from "../../src/services/tts";

function createPlayer(overrides: Partial<ReturnType<typeof createPlayerBase>> = {}) {
  return {
    ...createPlayerBase(),
    ...overrides,
  };
}

function createPlayerBase() {
  return {
    isPlaybackPaused: false,
    isPlaying: false,
    pausePlayback: jest.fn(async () => true),
    resumePlayback: jest.fn(async () => true),
    stopPlayback: jest.fn(async () => undefined),
    resetCancellation: jest.fn(),
    waitForDrain: jest.fn(async () => undefined),
    enqueueAudio: jest.fn(),
    speakText: jest.fn(),
    hasPendingPlaybackNow: jest.fn(() => false),
  };
}

function createParams(
  overrides: Partial<Parameters<typeof useVoicePipeline>[0]> = {},
) {
  const player = createPlayer();
  return {
    activeConversation: null,
    addMessage: jest.fn(),
    createConversation: jest.fn(),
    updateMessage: jest.fn(),
    updateConversationContextSummary: jest.fn(),
    player,
    provider: "openai" as const,
    providerApiKey: "sk-test",
    model: "gpt-5.4",
    sttMode: "native" as const,
    sttProvider: null,
    sttApiKey: "",
    selectedSttModel: "",
    ttsMode: "provider" as const,
    ttsProvider: "openai" as const,
    ttsApiKey: "sk-tts",
    selectedTtsModel: "gpt-4o-mini-tts",
    selectedTtsVoice: "alloy",
    ttsListenLanguages: DEFAULT_SETTINGS.ttsListenLanguages,
    replyPlayback: DEFAULT_SETTINGS.replyPlayback,
    spokenRepliesEnabled: true,
    assistantInstructions: DEFAULT_SETTINGS.assistantInstructions,
    responseLength: DEFAULT_SETTINGS.responseLength,
    responseTone: DEFAULT_SETTINGS.responseTone,
    language: "en" as const,
    isRecording: false,
    showToast: jest.fn(),
    t: (
      key: Parameters<typeof translate>[1],
      params?: Record<string, string | number | undefined>,
    ) => translate("en", key, params),
    ...overrides,
  };
}

describe("useVoicePipeline", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("shows a toast when there is no reply to replay yet", async () => {
    const params = createParams();
    const { result } = renderHook(() => useVoicePipeline(params));

    await act(async () => {
      await result.current.handleRepeatLastReply();
    });

    expect(params.showToast).toHaveBeenCalledWith(
      translate("en", "noReplyToRepeatYet"),
    );
  });

  it("blocks reply replay when spoken replies are turned off", async () => {
    const params = createParams({
      spokenRepliesEnabled: false,
      player: createPlayer(),
    });
    const { result } = renderHook(() => useVoicePipeline(params));

    await act(async () => {
      await result.current.playReplyText("Replay this", "message-1");
    });

    expect(params.showToast).toHaveBeenCalledWith(
      translate("en", "spokenRepliesDisabled"),
    );
    expect(params.player.speakText).not.toHaveBeenCalled();
    expect(params.player.enqueueAudio).not.toHaveBeenCalled();
  });

  it("reports replay synthesis failures without falling back to native speech", async () => {
    const params = createParams({
      ttsMode: "provider",
      player: createPlayer(),
    });
    (synthesizeSpeech as jest.Mock).mockRejectedValue(
      new Error("Provider TTS unavailable"),
    );

    const { result } = renderHook(() => useVoicePipeline(params));

    await act(async () => {
      await result.current.playReplyText("Replay this", "message-1");
    });

    expect(params.player.speakText).not.toHaveBeenCalled();
    expect(params.showToast).toHaveBeenCalledWith(
      "Provider TTS unavailable",
    );
    expect(result.current.replayPhase).toBe("idle");
    expect(result.current.activeReplayMessageId).toBeNull();
  });

  it("keeps replay stream text together when the full reply is already available", async () => {
    const params = createParams({
      replyPlayback: "stream",
      player: createPlayer(),
    });
    (synthesizeSpeech as jest.Mock).mockResolvedValueOnce("file://reply-1.wav");

    const { result } = renderHook(() => useVoicePipeline(params));

    await act(async () => {
      await result.current.playReplyText(
        "Sentence one. Sentence two.",
        "message-1",
      );
    });

    expect(synthesizeSpeech).toHaveBeenCalledTimes(1);
    expect(synthesizeSpeech).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        text: "Sentence one. Sentence two.",
        voice: "alloy",
        mode: "provider",
        provider: "openai",
        providerModel: "gpt-4o-mini-tts",
        apiKey: "sk-tts",
        language: "en",
        listenLanguages: DEFAULT_SETTINGS.ttsListenLanguages,
        diagnostics: expect.objectContaining({
          requestId: "speech-request-1",
          source: "repeat",
        }),
      }),
    );
    expect(params.player.enqueueAudio).toHaveBeenCalledTimes(1);
    expect(params.player.enqueueAudio).toHaveBeenNthCalledWith(
      1,
      "file://reply-1.wav",
      expect.objectContaining({
        requestId: "speech-request-1",
        source: "repeat",
      }),
    );
    expect(synthesizeSpeechSequence).not.toHaveBeenCalled();
  });

  it("replays long Gemini replies in reliable provider-sized chunks", async () => {
    const reply = Array.from(
      { length: 50 },
      () => "Replay this sentence with the selected provider voice.",
    ).join(" ");
    const params = createParams({
      ttsMode: "provider",
      ttsProvider: "gemini",
      ttsApiKey: "gemini-test",
      selectedTtsModel: "gemini-2.5-flash-preview-tts",
      selectedTtsVoice: "Kore",
      player: createPlayer(),
    });
    (synthesizeSpeech as jest.Mock).mockImplementation(
      async ({ text }: { text: string }) => `file://reply-${text.length}.wav`,
    );

    const { result } = renderHook(() => useVoicePipeline(params));

    await act(async () => {
      await result.current.playReplyText(reply, "message-1");
    });

    const synthesizedTexts = (synthesizeSpeech as jest.Mock).mock.calls.map(
      ([ttsParams]: [{ text: string }]) => ttsParams.text,
    );
    expect(synthesizedTexts.length).toBeGreaterThan(1);
    expect(synthesizedTexts.every((text: string) => text.length <= 300)).toBe(
      true,
    );
    expect(synthesizedTexts.join(" ")).toBe(reply);
    expect(params.player.enqueueAudio).toHaveBeenCalledTimes(
      synthesizedTexts.length,
    );
    expect(params.player.speakText).not.toHaveBeenCalled();
  });

  it("runs the full voice pipeline and updates conversation state", async () => {
    const params = createParams();
    const summaryUsage: UsageEstimate = {
      kind: "summary",
      source: "estimated",
      promptTokens: 90,
      completionTokens: 12,
      totalTokens: 102,
    };
    const replyUsage: UsageEstimate = {
      kind: "reply",
      source: "estimated",
      promptTokens: 120,
      completionTokens: 40,
      totalTokens: 160,
    };
    (runVoicePipeline as jest.Mock).mockImplementation(
      async ({ callbacks }: any) => {
        callbacks.onTranscription("Hello from the microphone");
        callbacks.onContextSummary("Conversation summary", 3, summaryUsage);
        callbacks.onChunk("Streaming ");
        callbacks.onChunk("reply");
        callbacks.onResponseDone("Completed reply", replyUsage);
        callbacks.onAudioReady("file://reply.wav", {
          requestId: "speech-request-1",
          source: "conversation",
        });
        return "Hello from the microphone";
      },
    );

    const { result } = renderHook(() => useVoicePipeline(params));

    await act(async () => {
      const pending = result.current.handleVoiceCaptureDone({
        audioUri: "file://capture.wav",
      });
      jest.runAllTimers();
      await pending;
    });

    expect(params.createConversation).toHaveBeenCalledWith(
      "Hello from the microphone",
      "gpt-5.4",
      "openai",
    );
    expect(params.addMessage).toHaveBeenCalledWith({
      role: "user",
      content: "Hello from the microphone",
      model: null,
      provider: null,
    });
    expect(params.addMessage).toHaveBeenCalledWith({
      role: "assistant",
      content: "Completed reply",
      model: "gpt-5.4",
      provider: "openai",
      usage: replyUsage,
    });
    expect(params.updateConversationContextSummary).toHaveBeenCalledWith(
      "Conversation summary",
      3,
      summaryUsage,
      "gpt-5.4",
      "openai",
    );
    expect(params.player.enqueueAudio).toHaveBeenCalledWith(
      "file://reply.wav",
      {
        requestId: "speech-request-1",
        source: "conversation",
      },
    );
    expect(result.current.pipelinePhase).toBe("idle");
    expect(result.current.streamingText).toBe("");
    expect(result.current.lastCompletedReplyRef.current).toBe("Completed reply");
  });

  it("learns the full LLM response time instead of first-chunk latency", async () => {
    const params = createParams({
      spokenRepliesEnabled: false,
    });
    (runVoicePipeline as jest.Mock).mockImplementation(
      async ({ callbacks }: any) => {
        callbacks.onLlmStart();
        jest.advanceTimersByTime(1_000);
        callbacks.onChunk("First token");
        jest.advanceTimersByTime(4_000);
        callbacks.onResponseDone("First token and the completed reply.");
        return "Hello from the microphone";
      },
    );

    const { result } = renderHook(() => useVoicePipeline(params));

    await act(async () => {
      await result.current.handleVoiceCaptureDone({
        transcriptionOverride: "Hello from the microphone",
      });
    });

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "@schnackai/latency_stats",
        expect.stringContaining("5000"),
      );
    });
  });

  it("shows the retry toast when no transcription is produced", async () => {
    const params = createParams();
    (runVoicePipeline as jest.Mock).mockResolvedValue(null);

    const { result } = renderHook(() => useVoicePipeline(params));

    await act(async () => {
      await result.current.handleVoiceCaptureDone({
        audioUri: "file://capture.wav",
      });
    });

    expect(params.showToast).toHaveBeenCalledWith(
      translate("en", "couldntCatchThatTryAgain"),
    );
    expect(result.current.pipelinePhase).toBe("idle");
  });

  it("stores a durable assistant notice when provider TTS falls back", async () => {
    const params = createParams();
    (params.addMessage as jest.Mock)
      .mockReturnValueOnce({
        id: "user-1",
        role: "user",
        content: "Hello from the microphone",
        model: null,
        provider: null,
        timestamp: "2026-03-25T12:00:00.000Z",
      })
      .mockReturnValueOnce({
        id: "assistant-1",
        role: "assistant",
        content: "Completed reply",
        model: "gpt-5.4",
        provider: "openai",
        timestamp: "2026-03-25T12:00:01.000Z",
      });
    (runVoicePipeline as jest.Mock).mockImplementation(
      async ({ callbacks }: any) => {
        callbacks.onTranscription("Hello from the microphone");
        callbacks.onResponseDone("Completed reply");
        callbacks.onTtsFallback(new Error("Provider fallback"));
        return "Hello from the microphone";
      },
    );

    const { result } = renderHook(() => useVoicePipeline(params));

    await act(async () => {
      await result.current.handleVoiceCaptureDone({
        audioUri: "file://capture.wav",
      });
    });

    expect(params.updateMessage).toHaveBeenCalledWith(
      "assistant-1",
      expect.any(Function),
    );
    const updater = (params.updateMessage as jest.Mock).mock.calls[0][1];
    expect(
      updater({
        id: "assistant-1",
        role: "assistant",
        content: "Completed reply",
        model: "gpt-5.4",
        provider: "openai",
        timestamp: "2026-03-25T12:00:01.000Z",
      }),
    ).toEqual(
      expect.objectContaining({
        metadata: {
          notices: [
            {
              stage: "tts",
              level: "warning",
              message: translate("en", "providerVoiceFallback"),
              detail: "Provider fallback",
            },
          ],
        },
      }),
    );
  });

  it("stores a durable STT failure notice inside an existing conversation", async () => {
    const params = createParams({
      activeConversation: {
        id: "conversation-1",
        title: "Existing conversation",
        createdAt: "2026-03-25T11:00:00.000Z",
        updatedAt: "2026-03-25T11:00:00.000Z",
        messages: [],
      },
    });
    (runVoicePipeline as jest.Mock).mockRejectedValue(
      new Error("OpenAI speech transcription took too long."),
    );

    const { result } = renderHook(() => useVoicePipeline(params));

    await act(async () => {
      await result.current.handleVoiceCaptureDone({
        audioUri: "file://capture.wav",
      });
    });

    expect(params.addMessage).toHaveBeenCalledWith({
      role: "assistant",
      content: "",
      model: null,
      provider: null,
      metadata: {
        notices: [
          {
            stage: "stt",
            level: "error",
            message: "OpenAI speech transcription took too long.",
          },
        ],
      },
    });
  });

  it("keeps the phase at speaking once streamed playback has already started", async () => {
    const params = createParams({
      player: createPlayer({
        hasPendingPlaybackNow: jest.fn(() => false),
      }),
    });
    let resolveRun: (() => void) | null = null;

    (runVoicePipeline as jest.Mock).mockImplementation(
      async ({ callbacks }: any) => {
        callbacks.onAudioReady("file://reply.wav", {
          requestId: "speech-request-1",
          source: "conversation",
        });
        callbacks.onResponseDone("Completed reply");

        await new Promise<void>((resolve) => {
          resolveRun = resolve;
        });

        return "Hello from the microphone";
      },
    );

    const { result } = renderHook(() => useVoicePipeline(params));

    let pending: Promise<void> | null = null;
    await act(async () => {
      pending = result.current.handleVoiceCaptureDone({
        transcriptionOverride: "Hello from the microphone",
      });
      await Promise.resolve();
    });

    expect(result.current.pipelinePhase).toBe("speaking");

    await act(async () => {
      resolveRun?.();
      await pending;
    });
  });

  it("does not regress from speaking back to thinking when later stream chunks arrive", async () => {
    const params = createParams({
      player: createPlayer({
        hasPendingPlaybackNow: jest.fn(() => false),
      }),
    });
    let resolveRun: (() => void) | null = null;

    (runVoicePipeline as jest.Mock).mockImplementation(
      async ({ callbacks }: any) => {
        callbacks.onAudioReady("file://reply.wav", {
          requestId: "speech-request-1",
          source: "conversation",
        });
        callbacks.onChunk(" more reply");

        await new Promise<void>((resolve) => {
          resolveRun = resolve;
        });

        return "Hello from the microphone";
      },
    );

    const { result } = renderHook(() => useVoicePipeline(params));

    let pending: Promise<void> | null = null;
    await act(async () => {
      pending = result.current.handleVoiceCaptureDone({
        transcriptionOverride: "Hello from the microphone",
      });
      await Promise.resolve();
    });

    expect(result.current.pipelinePhase).toBe("speaking");

    await act(async () => {
      resolveRun?.();
      await pending;
    });
  });
});
