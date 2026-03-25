import { act, renderHook } from "@testing-library/react-native";

import { translate } from "../../src/i18n";
import { useVoicePipeline } from "../../src/hooks/useVoicePipeline";
import { DEFAULT_SETTINGS, type UsageEstimate } from "../../src/types";

jest.mock("../../src/services/voicePipeline", () => ({
  runVoicePipeline: jest.fn(),
}));

jest.mock("../../src/services/tts", () => ({
  LOCAL_TTS_MAX_INPUT_CHARS: 420,
  PROVIDER_TTS_MAX_INPUT_CHARS: 3500,
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
    isPlaying: false,
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
    localTtsVoices: DEFAULT_SETTINGS.localTtsVoices,
    replyPlayback: DEFAULT_SETTINGS.replyPlayback,
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

  it("falls back to native speech when replay synthesis fails", async () => {
    const params = createParams({
      ttsMode: "local",
      player: createPlayer(),
    });
    (synthesizeSpeech as jest.Mock).mockRejectedValue(
      new Error("Local TTS unavailable"),
    );

    const { result } = renderHook(() => useVoicePipeline(params));

    await act(async () => {
      await result.current.playReplyText("Replay this", "message-1");
    });

    expect(params.player.speakText).toHaveBeenCalledWith(
      "Replay this",
      expect.objectContaining({
        diagnostics: expect.objectContaining({
          requestId: "speech-request-1",
          source: "repeat",
        }),
      }),
    );
    expect(params.showToast).toHaveBeenCalledWith(
      translate("en", "localVoiceFallback"),
    );
    expect(result.current.replayPhase).toBe("idle");
    expect(result.current.activeReplayMessageId).toBeNull();
  });

  it("streams replay provider TTS sentence by sentence in stream mode", async () => {
    const params = createParams({
      replyPlayback: "stream",
      player: createPlayer(),
    });
    (synthesizeSpeech as jest.Mock)
      .mockResolvedValueOnce("file://reply-1.wav")
      .mockResolvedValueOnce("file://reply-2.wav");

    const { result } = renderHook(() => useVoicePipeline(params));

    await act(async () => {
      await result.current.playReplyText(
        "Sentence one. Sentence two.",
        "message-1",
      );
    });

    expect(synthesizeSpeech).toHaveBeenNthCalledWith(1, {
      text: "Sentence one.",
      voice: "alloy",
      mode: "provider",
      provider: "openai",
      providerModel: "gpt-4o-mini-tts",
      apiKey: "sk-tts",
      language: "en",
      listenLanguages: DEFAULT_SETTINGS.ttsListenLanguages,
      localVoices: DEFAULT_SETTINGS.localTtsVoices,
      diagnostics: expect.objectContaining({
        requestId: "speech-request-1",
        source: "repeat",
      }),
    });
    expect(synthesizeSpeech).toHaveBeenNthCalledWith(2, {
      text: "Sentence two.",
      voice: "alloy",
      mode: "provider",
      provider: "openai",
      providerModel: "gpt-4o-mini-tts",
      apiKey: "sk-tts",
      language: "en",
      listenLanguages: DEFAULT_SETTINGS.ttsListenLanguages,
      localVoices: DEFAULT_SETTINGS.localTtsVoices,
      diagnostics: expect.objectContaining({
        requestId: "speech-request-1",
        source: "repeat",
      }),
    });
    expect(params.player.enqueueAudio).toHaveBeenNthCalledWith(
      1,
      "file://reply-1.wav",
      expect.objectContaining({
        requestId: "speech-request-1",
        source: "repeat",
      }),
    );
    expect(params.player.enqueueAudio).toHaveBeenNthCalledWith(
      2,
      "file://reply-2.wav",
      expect.objectContaining({
        requestId: "speech-request-1",
        source: "repeat",
      }),
    );
    expect(synthesizeSpeechSequence).not.toHaveBeenCalled();
  });

  it("runs the full voice pipeline and updates conversation state", async () => {
    const params = createParams();
    const summaryUsage: UsageEstimate = {
      kind: "summary",
      source: "estimated",
      promptTokens: 90,
      completionTokens: 12,
      totalTokens: 102,
      inputCostUsd: 0.0001,
      outputCostUsd: 0.0002,
      totalCostUsd: 0.0003,
    };
    const replyUsage: UsageEstimate = {
      kind: "reply",
      source: "estimated",
      promptTokens: 120,
      completionTokens: 40,
      totalTokens: 160,
      inputCostUsd: 0.0002,
      outputCostUsd: 0.0003,
      totalCostUsd: 0.0005,
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
