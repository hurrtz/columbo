import { streamChat, validateProviderConnection } from "../../src/services/llm";
import { Message } from "../../src/types";
global.fetch = jest.fn();

const OriginalWebSocket = (globalThis as any).WebSocket;

class MockWebSocket {
  static instances: MockWebSocket[] = [];

  readonly url: string;
  readonly protocols: any;
  readonly options: any;
  readonly sent: string[] = [];
  onopen: ((event: any) => void) | null = null;
  onmessage: ((event: any) => void) | null = null;
  onerror: ((event: any) => void) | null = null;
  onclose: ((event: any) => void) | null = null;

  constructor(url: string, protocols?: any, options?: any) {
    this.url = url;
    this.protocols = protocols;
    this.options = options;
    MockWebSocket.instances.push(this);
  }

  send(data: string) {
    this.sent.push(data);
  }

  close() {
    this.onclose?.({ code: 1000, reason: "closed" });
  }

  emitOpen() {
    this.onopen?.({});
  }

  emitMessage(data: any) {
    this.onmessage?.({
      data: typeof data === "string" ? data : JSON.stringify(data),
    });
  }

  emitClose(code = 1000, reason = "closed") {
    this.onclose?.({ code, reason });
  }
}

const mockMessages: Message[] = [{ id: "1", role: "user", content: "Hello", model: null, provider: null, timestamp: "2026-01-01T00:00:00Z" }];

describe("streamChat", () => {
  beforeAll(() => {
    (globalThis as any).WebSocket = MockWebSocket;
  });

  afterAll(() => {
    (globalThis as any).WebSocket = OriginalWebSocket;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    MockWebSocket.instances = [];
  });

  it("calls OpenAI chat completions for openai provider", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('data: {"choices":[{"delta":{"content":"Hi"}}]}\n\n'));
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, body: stream });
    const chunks: string[] = [];
    await streamChat({ messages: mockMessages, model: "gpt-4o", provider: "openai", apiKey: "sk-test-key", assistantInstructions: "", responseLength: "normal", responseTone: "professional", language: "en", onChunk: (text) => chunks.push(text), onDone: () => {}, onError: () => {} });
    expect(chunks).toEqual(["Hi"]);
    expect((fetch as jest.Mock).mock.calls[0][0]).toBe("https://api.openai.com/v1/chat/completions");
  });

  it("calls Anthropic messages API for anthropic provider", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('event: content_block_delta\ndata: {"type":"content_block_delta","delta":{"type":"text_delta","text":"Hi"}}\n\n'));
        controller.enqueue(encoder.encode('event: message_stop\ndata: {"type":"message_stop"}\n\n'));
        controller.close();
      },
    });
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, body: stream });
    const chunks: string[] = [];
    await streamChat({ messages: mockMessages, model: "claude-opus-4-7", provider: "anthropic", apiKey: "sk-ant-test-key", assistantInstructions: "", responseLength: "normal", responseTone: "professional", language: "en", onChunk: (text) => chunks.push(text), onDone: () => {}, onError: () => {} });
    expect(chunks).toEqual(["Hi"]);
    expect((fetch as jest.Mock).mock.calls[0][0]).toBe("https://api.anthropic.com/v1/messages");
    expect(JSON.parse((fetch as jest.Mock).mock.calls[0][1].body).max_tokens).toBe(
      16_384,
    );
    expect(JSON.parse((fetch as jest.Mock).mock.calls[0][1].body).thinking).toEqual({
      type: "adaptive",
    });
  });

  it("continues Anthropic replies that reach the output-token limit", async () => {
    const encoder = new TextEncoder();
    const firstStream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            'event: content_block_delta\ndata: {"type":"content_block_delta","delta":{"type":"text_delta","text":"First half"}}\n\n',
          ),
        );
        controller.enqueue(
          encoder.encode(
            'event: message_delta\ndata: {"type":"message_delta","delta":{"stop_reason":"max_tokens"}}\n\n',
          ),
        );
        controller.enqueue(
          encoder.encode('event: message_stop\ndata: {"type":"message_stop"}\n\n'),
        );
        controller.close();
      },
    });
    const continuationStream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            'event: content_block_delta\ndata: {"type":"content_block_delta","delta":{"type":"text_delta","text":" continued."}}\n\n',
          ),
        );
        controller.enqueue(
          encoder.encode(
            'event: message_delta\ndata: {"type":"message_delta","delta":{"stop_reason":"end_turn"}}\n\n',
          ),
        );
        controller.enqueue(
          encoder.encode('event: message_stop\ndata: {"type":"message_stop"}\n\n'),
        );
        controller.close();
      },
    });
    (fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, body: firstStream })
      .mockResolvedValueOnce({ ok: true, body: continuationStream });
    const chunks: string[] = [];
    const onDone = jest.fn();

    await streamChat({
      messages: mockMessages,
      model: "claude-fable-5",
      provider: "anthropic",
      apiKey: "sk-ant-test-key",
      modelEffort: "max",
      assistantInstructions: "",
      responseLength: "thorough",
      responseTone: "professional",
      language: "en",
      onChunk: (text) => chunks.push(text),
      onDone,
      onError: jest.fn(),
    });

    expect(chunks).toEqual(["First half", " continued."]);
    expect(JSON.parse((fetch as jest.Mock).mock.calls[0][1].body).max_tokens).toBe(
      65_536,
    );
    expect(onDone).toHaveBeenCalledWith(
      "First half continued.",
      expect.any(Object),
    );
    const continuationBody = JSON.parse(
      (fetch as jest.Mock).mock.calls[1][1].body,
    );
    expect(continuationBody.messages.slice(-2)).toEqual([
      { role: "assistant", content: "First half" },
      expect.objectContaining({
        role: "user",
        content: expect.stringContaining("Continue exactly"),
      }),
    ]);
  });

  it("continues Anthropic replies when the stream closes without a terminal event", async () => {
    const encoder = new TextEncoder();
    const interruptedStream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            'event: content_block_delta\ndata: {"type":"content_block_delta","delta":{"type":"text_delta","text":"Interrupted mid"}}\n\n',
          ),
        );
        controller.close();
      },
    });
    const continuationStream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            'event: content_block_delta\ndata: {"type":"content_block_delta","delta":{"type":"text_delta","text":"sentence, now complete."}}\n\n',
          ),
        );
        controller.enqueue(
          encoder.encode('event: message_stop\ndata: {"type":"message_stop"}\n\n'),
        );
        controller.close();
      },
    });
    (fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, body: interruptedStream })
      .mockResolvedValueOnce({ ok: true, body: continuationStream });
    const onDone = jest.fn();

    await streamChat({
      messages: mockMessages,
      model: "claude-fable-5",
      provider: "anthropic",
      apiKey: "sk-ant-test-key",
      assistantInstructions: "",
      responseLength: "normal",
      responseTone: "professional",
      language: "en",
      onChunk: jest.fn(),
      onDone,
      onError: jest.fn(),
    });

    expect(onDone).toHaveBeenCalledWith(
      "Interrupted midsentence, now complete.",
      expect.any(Object),
    );
  });

  it("reports an error when a provider stream completes without text", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode('event: message_stop\ndata: {"type":"message_stop"}\n\n'),
        );
        controller.close();
      },
    });
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, body: stream });
    const onDone = jest.fn();
    const onError = jest.fn();

    await streamChat({
      messages: mockMessages,
      model: "claude-opus-4-7",
      provider: "anthropic",
      apiKey: "sk-ant-test-key",
      assistantInstructions: "",
      responseLength: "normal",
      responseTone: "professional",
      language: "en",
      onChunk: () => undefined,
      onDone,
      onError,
    });

    expect(onDone).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Anthropic finished without returning a reply. Try again.",
      }),
    );
  });

  it("times out stalled reply generation requests", async () => {
    jest.useFakeTimers();
    let requestSignal: AbortSignal | undefined;
    (fetch as jest.Mock).mockImplementation((_url, options) => {
      requestSignal = options?.signal;

      return new Promise((_resolve, reject) => {
        requestSignal?.addEventListener("abort", () => {
          const error = new Error("Aborted");
          error.name = "AbortError";
          reject(error);
        });
      });
    });
    const onDone = jest.fn();
    const onError = jest.fn();

    try {
      const promise = streamChat({
        messages: mockMessages,
        model: "gpt-4o",
        provider: "openai",
        apiKey: "sk-test-key",
        assistantInstructions: "",
        responseLength: "normal",
        responseTone: "professional",
        language: "en",
        onChunk: () => undefined,
        onDone,
        onError,
      });

      await jest.advanceTimersByTimeAsync(5 * 60_000);
      await promise;

      expect(onDone).not.toHaveBeenCalled();
      expect(requestSignal).toBeDefined();
      expect(requestSignal?.aborted).toBe(true);
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "OpenAI took too long during reply generation. Try again.",
        }),
      );
    } finally {
      jest.useRealTimers();
    }
  });

  it("allows a slow initial reply before enforcing inactivity", async () => {
    jest.useFakeTimers();
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        setTimeout(() => {
          controller.enqueue(
            encoder.encode(
              'data: {"choices":[{"delta":{"content":"Delayed reply"}}]}\n\n',
            ),
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }, 4 * 60_000);
      },
    });
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, body: stream });
    const chunks: string[] = [];
    const onDone = jest.fn();
    const onError = jest.fn();

    try {
      const promise = streamChat({
        messages: mockMessages,
        model: "gpt-4o",
        provider: "openai",
        apiKey: "sk-test-key",
        modelEffort: "enabled",
        assistantInstructions: "",
        responseLength: "normal",
        responseTone: "professional",
        language: "en",
        onChunk: (text) => chunks.push(text),
        onDone,
        onError,
      });

      await jest.advanceTimersByTimeAsync(4 * 60_000);
      await promise;

      expect(chunks).toEqual(["Delayed reply"]);
      expect(onDone).toHaveBeenCalledWith(
        "Delayed reply",
        expect.objectContaining({
          totalTokens: expect.any(Number),
        }),
      );
      expect(onError).not.toHaveBeenCalled();
    } finally {
      jest.useRealTimers();
    }
  });

  it("returns a development-only local reply for the Android smoke-test key", async () => {
    const chunks: string[] = [];
    const onDone = jest.fn();
    const onError = jest.fn();

    await streamChat({
      messages: mockMessages,
      model: "gpt-4o",
      provider: "openai",
      apiKey: "sk-test-android-local-dev",
      assistantInstructions: "",
      responseLength: "normal",
      responseTone: "professional",
      language: "en",
      onChunk: (text) => chunks.push(text),
      onDone,
      onError,
    });

    expect(chunks.join("")).toContain("local Android development");
    expect(onDone).toHaveBeenCalledWith(
      expect.stringContaining("local Android development"),
      expect.objectContaining({
        totalTokens: expect.any(Number),
      }),
    );
    expect(onError).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("uses the configured OpenAI-compatible endpoint for a newly wired provider", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode('data: {"choices":[{"delta":{"content":"Hi"}}]}\n\n'),
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, body: stream });
    const chunks: string[] = [];

    await streamChat({
      messages: mockMessages,
      model: "deepseek-chat",
      provider: "deepseek",
      apiKey: "deepseek-test-key",
      assistantInstructions: "",
      responseLength: "normal",
      responseTone: "professional",
      language: "en",
      onChunk: (text) => chunks.push(text),
      onDone: () => {},
      onError: () => {},
    });

    expect(chunks).toEqual(["Hi"]);
    expect((fetch as jest.Mock).mock.calls[0][0]).toBe(
      "https://api.deepseek.com/chat/completions",
    );
  });




  it("uses the OpenAI realtime socket for realtime models", async () => {
    const chunks: string[] = [];
    const promise = streamChat({
      messages: mockMessages,
      model: "gpt-realtime-1.5",
      provider: "openai",
      apiKey: "sk-test-key",
      assistantInstructions: "",
      responseLength: "normal",
      responseTone: "professional",
      language: "en",
      onChunk: (text) => chunks.push(text),
      onDone: () => {},
      onError: () => {},
    });

    const socket = MockWebSocket.instances[0];
    expect(socket.url).toBe(
      "wss://api.openai.com/v1/realtime?model=gpt-realtime-1.5",
    );
    expect(socket.options.headers.Authorization).toBe("Bearer sk-test-key");
    expect(socket.options.headers["OpenAI-Beta"]).toBe("realtime=v1");

    socket.emitOpen();
    expect(JSON.parse(socket.sent[0])).toMatchObject({
      type: "conversation.item.create",
    });
    expect(JSON.parse(socket.sent[1])).toMatchObject({
      type: "response.create",
      response: { modalities: ["text"] },
    });

    socket.emitMessage({ type: "response.text.delta", delta: "Hi" });
    socket.emitMessage({ type: "response.done" });

    await promise;
    expect(chunks).toEqual(["Hi"]);
    expect(fetch).not.toHaveBeenCalled();
  });


  it("waits for Gemini Live setup before sending the conversation", async () => {
    const chunks: string[] = [];
    const promise = streamChat({
      messages: mockMessages,
      model: "gemini-3.1-flash-live-preview",
      provider: "gemini",
      apiKey: "gemini-test-key",
      assistantInstructions: "",
      responseLength: "normal",
      responseTone: "professional",
      language: "en",
      onChunk: (text) => chunks.push(text),
      onDone: () => {},
      onError: () => {},
    });

    const socket = MockWebSocket.instances[0];
    expect(socket.url).toBe(
      "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=gemini-test-key",
    );
    expect(socket.options).toBeUndefined();

    socket.emitOpen();
    expect(JSON.parse(socket.sent[0])).toMatchObject({
      setup: {
        model: "models/gemini-3.1-flash-live-preview",
        generationConfig: { responseModalities: ["TEXT"] },
      },
    });
    expect(socket.sent).toHaveLength(1);

    socket.emitMessage({ setupComplete: {} });
    expect(JSON.parse(socket.sent[1])).toMatchObject({
      realtimeInput: {
        text: expect.stringContaining("User: Hello"),
      },
    });

    socket.emitMessage({
      serverContent: {
        modelTurn: {
          parts: [{ text: "Hi from " }],
        },
      },
    });
    socket.emitMessage({
      serverContent: {
        modelTurn: {
          parts: [{ text: "Gemini Live" }],
        },
      },
    });
    socket.emitMessage({
      serverContent: {
        turnComplete: true,
      },
    });

    await promise;
    expect(chunks).toEqual(["Hi from ", "Gemini Live"]);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("uses Gemini native streaming with Google API key auth", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            'data: {"candidates":[{"content":{"parts":[{"text":"Hi from Gemini"}]}}]}\n\n',
          ),
        );
        controller.close();
      },
    });
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, body: stream });
    const chunks: string[] = [];

    await streamChat({
      messages: mockMessages,
      model: "gemini-2.5-flash",
      provider: "gemini",
      apiKey: "gemini-test-key",
      assistantInstructions: "",
      responseLength: "normal",
      responseTone: "professional",
      language: "en",
      onChunk: (text) => chunks.push(text),
      onDone: () => {},
      onError: () => {},
    });

    expect(chunks).toEqual(["Hi from Gemini"]);
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse",
    );
    expect(options.headers["x-goog-api-key"]).toBe("gemini-test-key");
    expect(options.headers.Authorization).toBeUndefined();
    const body = JSON.parse(options.body);
    expect(body.systemInstruction.parts[0].text).toContain("voice assistant");
    expect(body.contents[0]).toEqual({
      role: "user",
      parts: [{ text: "Hello" }],
    });
  });

  it("passes Gemini effort as generateContent thinking level", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            'data: {"candidates":[{"content":{"parts":[{"text":"Hi from Gemini"}]}}]}\n\n',
          ),
        );
        controller.close();
      },
    });
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, body: stream });

    await streamChat({
      messages: mockMessages,
      model: "gemini-3.5-flash",
      provider: "gemini",
      apiKey: "gemini-test-key",
      modelEffort: "high",
      assistantInstructions: "",
      responseLength: "normal",
      responseTone: "professional",
      language: "en",
      onChunk: () => {},
      onDone: () => {},
      onError: () => {},
    });

    const [, options] = (fetch as jest.Mock).mock.calls[0];
    expect(JSON.parse(options.body).generationConfig).toEqual({
      thinkingConfig: {
        thinkingLevel: "HIGH",
      },
    });
  });

  it.each([
    {
      provider: "openai" as const,
      model: "gpt-5.5",
      modelEffort: "xhigh",
      expected: { reasoning_effort: "xhigh" },
    },
    {
      provider: "xai" as const,
      model: "grok-4.3",
      modelEffort: "none",
      expected: { reasoning_effort: "none" },
    },
    {
      provider: "mistral" as const,
      model: "mistral-medium-3-5",
      modelEffort: "high",
      expected: { reasoning_effort: "high" },
    },
    {
      provider: "mistral" as const,
      model: "mistral-small-2603",
      modelEffort: "minimal",
      expected: { reasoning_effort: "minimal" },
    },
    {
      provider: "bytedance-doubao-seed" as const,
      model: "doubao-seed-2-1-turbo-260628",
      modelEffort: "max",
      expected: { reasoning_effort: "max" },
    },
    {
      provider: "deepseek" as const,
      model: "deepseek-v4-pro",
      modelEffort: "max",
      expected: {
        thinking: { type: "enabled" },
        reasoning_effort: "max",
      },
    },
    {
      provider: "deepseek" as const,
      model: "deepseek-v4-pro",
      modelEffort: "disabled",
      expected: { thinking: { type: "disabled" } },
    },
    {
      provider: "alibaba-qwen-dashscope" as const,
      model: "qwen3.7-plus",
      modelEffort: "disabled",
      expected: { enable_thinking: false },
    },
    {
      provider: "moonshot-ai-kimi" as const,
      model: "kimi-k2.6",
      modelEffort: "disabled",
      expected: { thinking: { type: "disabled" } },
    },
  ])(
    "passes $provider effort controls through OpenAI-compatible chat requests",
    async ({ provider, model, modelEffort, expected }) => {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(
            encoder.encode(
              'data: {"choices":[{"delta":{"content":"Hi"}}]}\n\n',
            ),
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        },
      });
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, body: stream });

      await streamChat({
        messages: mockMessages,
        model,
        provider,
        apiKey: "provider-test-key",
        modelEffort,
        assistantInstructions: "",
        responseLength: "normal",
        responseTone: "professional",
        language: "en",
        onChunk: () => {},
        onDone: () => {},
        onError: () => {},
      });

      const [, options] = (fetch as jest.Mock).mock.calls[0];
      expect(JSON.parse(options.body)).toMatchObject(expected);
    },
  );

  it("passes Anthropic effort as output_config effort", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            'event: content_block_delta\ndata: {"type":"content_block_delta","delta":{"type":"text_delta","text":"Hi"}}\n\n',
          ),
        );
        controller.enqueue(
          encoder.encode('event: message_stop\ndata: {"type":"message_stop"}\n\n'),
        );
        controller.close();
      },
    });
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, body: stream });

    await streamChat({
      messages: mockMessages,
      model: "claude-sonnet-5",
      provider: "anthropic",
      apiKey: "sk-ant-test-key",
      modelEffort: "medium",
      assistantInstructions: "",
      responseLength: "normal",
      responseTone: "professional",
      language: "en",
      onChunk: () => {},
      onDone: () => {},
      onError: () => {},
    });

    const [, options] = (fetch as jest.Mock).mock.calls[0];
    expect(JSON.parse(options.body).output_config).toEqual({
      effort: "medium",
    });
  });


  it("uses the configured routed endpoint for a hyphenated OpenAI-compatible provider", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode('data: {"choices":[{"delta":{"content":"Hi"}}]}\n\n'),
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, body: stream });
    const chunks: string[] = [];

    await streamChat({
      messages: mockMessages,
      model: "kimi-k2.5",
      provider: "moonshot-ai-kimi",
      apiKey: "kimi-test-key",
      assistantInstructions: "",
      responseLength: "normal",
      responseTone: "professional",
      language: "en",
      onChunk: (text) => chunks.push(text),
      onDone: () => {},
      onError: () => {},
    });

    expect(chunks).toEqual(["Hi"]);
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://api.moonshot.ai/v1/chat/completions");
    expect(JSON.parse(options.body).model).toBe("kimi-k2.5");
  });


  it("uses the Sonar chat-completions compatibility endpoint for Perplexity", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode('data: {"choices":[{"delta":{"content":"Hi"}}]}\n\n'),
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, body: stream });
    const chunks: string[] = [];

    await streamChat({
      messages: mockMessages,
      model: "sonar",
      provider: "perplexity",
      apiKey: "pplx-test-key",
      assistantInstructions: "",
      responseLength: "normal",
      responseTone: "professional",
      language: "en",
      onChunk: (text) => chunks.push(text),
      onDone: () => {},
      onError: () => {},
    });

    expect(chunks).toEqual(["Hi"]);
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://api.perplexity.ai/chat/completions");
    expect(JSON.parse(options.body).model).toBe("sonar");
  });

  it("uses the Ark chat-completions compatibility endpoint for ByteDance", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode('data: {"choices":[{"delta":{"content":"Hi"}}]}\n\n'),
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, body: stream });
    const chunks: string[] = [];

    await streamChat({
      messages: mockMessages,
      model: "doubao-seed-2-0-lite-260215",
      provider: "bytedance-doubao-seed",
      apiKey: "doubao-test-key",
      assistantInstructions: "",
      responseLength: "normal",
      responseTone: "professional",
      language: "en",
      onChunk: (text) => chunks.push(text),
      onDone: () => {},
      onError: () => {},
    });

    expect(chunks).toEqual(["Hi"]);
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://ark.cn-beijing.volces.com/api/v3/chat/completions");
    expect(JSON.parse(options.body).model).toBe("doubao-seed-2-0-lite-260215");
  });






  it("emits a chunk when openai-compatible streaming falls back to a full response", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      body: null,
    });
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: "Hi there.",
            },
          },
        ],
      }),
    });

    const chunks: string[] = [];
    await streamChat({
      messages: mockMessages,
      model: "gpt-4o",
      provider: "openai",
      apiKey: "sk-test-key",
      assistantInstructions: "",
      responseLength: "normal",
      responseTone: "professional",
      language: "en",
      onChunk: (text) => chunks.push(text),
      onDone: () => {},
      onError: () => {},
    });

    expect(chunks).toEqual(["Hi there."]);
  });


  it("waits for async onDone work before resolving", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode('data: {"choices":[{"delta":{"content":"Hi"}}]}\n\n'),
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, body: stream });

    let markOnDoneStarted: (() => void) | null = null;
    const onDoneStarted = new Promise<void>((resolve) => {
      markOnDoneStarted = resolve;
    });
    let finishOnDone: (() => void) | null = null;
    const onDoneCanFinish = new Promise<void>((resolve) => {
      finishOnDone = resolve;
    });
    let settled = false;

    const streamPromise = streamChat({
      messages: mockMessages,
      model: "gpt-4o",
      provider: "openai",
      apiKey: "sk-test-key",
      assistantInstructions: "",
      responseLength: "normal",
      responseTone: "professional",
      language: "en",
      onChunk: () => {},
      onDone: async () => {
        markOnDoneStarted?.();
        await onDoneCanFinish;
      },
      onError: () => {},
    }).then(() => {
      settled = true;
    });

    await onDoneStarted;
    await Promise.resolve();
    expect(settled).toBe(false);

    finishOnDone?.();
    await streamPromise;
    expect(settled).toBe(true);
  });
});

describe("validateProviderConnection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("checks the selected provider and model with a lightweight chat request", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: "OK",
            },
          },
        ],
      }),
    });

    await validateProviderConnection({
      provider: "openai",
      model: "gpt-5.4",
      apiKey: "sk-test-key",
      language: "en",
    });

    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://api.openai.com/v1/chat/completions");
    const body = JSON.parse(options.body);
    expect(body.model).toBe("gpt-5.4");
    expect(body.messages[0].role).toBe("system");
    expect(body.messages[1].content).toBe("Reply with OK only.");
  });

  it("validates Gemini with the native generateContent API key path", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        candidates: [
          {
            content: {
              parts: [{ text: "OK" }],
            },
          },
        ],
      }),
    });

    await validateProviderConnection({
      provider: "gemini",
      model: "gemini-2.5-flash",
      apiKey: "gemini-test-key",
      language: "en",
    });

    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    );
    expect(options.headers["x-goog-api-key"]).toBe("gemini-test-key");
    expect(options.headers.Authorization).toBeUndefined();
    const body = JSON.parse(options.body);
    expect(body.systemInstruction.parts[0].text).toContain(
      "validating a provider connection",
    );
    expect(body.contents[0]).toEqual({
      role: "user",
      parts: [{ text: "Reply with OK only." }],
    });
  });

  it("returns a human-readable auth error when the provider rejects credentials", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: async () =>
        JSON.stringify({
          error: {
            message: "Incorrect API key provided.",
          },
        }),
    });

    await expect(
      validateProviderConnection({
        provider: "openai",
        model: "gpt-5.4",
        apiKey: "sk-test-key",
        language: "en",
      })
    ).rejects.toThrow(
      "OpenAI rejected the credentials for reply generation. Check the API key and permissions."
    );
  });
});
