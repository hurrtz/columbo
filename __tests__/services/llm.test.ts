import { streamChat, validateProviderConnection } from "../../src/services/llm";
import { Message } from "../../src/types";
global.fetch = jest.fn();


const mockMessages: Message[] = [{ id: "1", role: "user", content: "Hello", model: null, provider: null, timestamp: "2026-01-01T00:00:00Z" }];

describe("streamChat", () => {
  beforeEach(() => { jest.clearAllMocks(); });

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
    await streamChat({ messages: mockMessages, model: "claude-sonnet-4-6", provider: "anthropic", apiKey: "sk-ant-test-key", assistantInstructions: "", responseLength: "normal", responseTone: "professional", language: "en", onChunk: (text) => chunks.push(text), onDone: () => {}, onError: () => {} });
    expect(chunks).toEqual(["Hi"]);
    expect((fetch as jest.Mock).mock.calls[0][0]).toBe("https://api.anthropic.com/v1/messages");
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
      model: "gpt-oss-120b",
      provider: "cerebras",
      apiKey: "cerebras-test-key",
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
      "https://api.cerebras.ai/v1/chat/completions",
    );
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
      model: "openai/gpt-oss-20b",
      provider: "hugging-face-inference-api",
      apiKey: "hf-test-key",
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
    expect(url).toBe("https://router.huggingface.co/v1/chat/completions");
    expect(JSON.parse(options.body).model).toBe("openai/gpt-oss-20b");
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

  it("uses the Qianfan chat-completions compatibility endpoint for Baidu", async () => {
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
      model: "ernie-5.0",
      provider: "baidu-ernie-qianfan",
      apiKey: "baidu-test-key",
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
    expect(url).toBe("https://qianfan.baidubce.com/v2/chat/completions");
    expect(JSON.parse(options.body).model).toBe("ernie-5.0");
  });

  it("uses the hosted Jamba chat-completions endpoint for AI21", async () => {
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
      model: "jamba-mini-2-2026-01",
      provider: "ai21-labs",
      apiKey: "ai21-test-key",
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
    expect(url).toBe("https://api.ai21.com/studio/v1/chat/completions");
    expect(JSON.parse(options.body).model).toBe("jamba-mini-2-2026-01");
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

  it("falls back to a non-streaming transport for cohere", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: {
          content: [{ text: "Hi from Cohere." }],
        },
      }),
    });

    const chunks: string[] = [];
    await streamChat({
      messages: mockMessages,
      model: "command-a-03-2025",
      provider: "cohere",
      apiKey: "cohere-test-key",
      assistantInstructions: "",
      responseLength: "normal",
      responseTone: "professional",
      language: "en",
      onChunk: (text) => chunks.push(text),
      onDone: () => {},
      onError: () => {},
    });

    expect(chunks).toEqual(["Hi from Cohere."]);
    expect((fetch as jest.Mock).mock.calls[0][0]).toBe(
      "https://api.cohere.com/v2/chat",
    );
  });

  it("waits for async onDone work before resolving", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: {
          content: [{ text: "Hi from Cohere." }],
        },
      }),
    });

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
      model: "command-a-03-2025",
      provider: "cohere",
      apiKey: "cohere-test-key",
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
