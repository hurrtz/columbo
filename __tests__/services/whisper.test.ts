import * as FileSystem from "expo-file-system/legacy";
import { transcribeAudio } from "../../src/services/whisper";
import { getProviderSttTimeoutMs } from "../../src/services/whisper/config";

global.fetch = jest.fn();

jest.mock("../../src/services/whisper/recordedFileReady", () => ({
  waitForRecordedFileReady: jest.fn(() => Promise.resolve()),
}));

const OriginalWebSocket = (globalThis as any).WebSocket;

class MockWebSocket {
  static instances: MockWebSocket[] = [];

  readonly url: string;
  readonly protocols: any;
  readonly options: any;
  readonly sent: any[] = [];
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

  send(data: any) {
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
}

function mockBuildTestWavBase64() {
  const header = new ArrayBuffer(44);
  const view = new DataView(header);
  const dataLength = 6400;

  view.setUint32(0, 0x52494646, false);
  view.setUint32(4, 36 + dataLength, true);
  view.setUint32(8, 0x57415645, false);
  view.setUint32(12, 0x666d7420, false);
  view.setUint32(16, 16, true);
  view.setUint16(20, 3, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, 16000, true);
  view.setUint32(28, 64000, true);
  view.setUint16(32, 4, true);
  view.setUint16(34, 32, true);
  view.setUint32(36, 0x64617461, false);
  view.setUint32(40, dataLength, true);

  const wav = new Uint8Array(44 + dataLength);
  wav.set(new Uint8Array(header), 0);

  return Buffer.from(wav).toString("base64");
}

async function waitForMockSocket() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const socket = MockWebSocket.instances[0];

    if (socket) {
      return socket;
    }

    await Promise.resolve();
  }

  throw new Error("Expected realtime STT socket to be created.");
}

jest.mock("expo-file-system/legacy", () => ({
  readAsStringAsync: jest.fn((fileUri: string) =>
    Promise.resolve(
      fileUri.endsWith(".wav") ? mockBuildTestWavBase64() : "ZmFrZQ==",
    )
  ),
  getInfoAsync: jest.fn(() =>
    Promise.resolve({
      exists: true,
      size: 8192,
    })
  ),
}));

describe("transcribeAudio", () => {
  beforeAll(() => {
    (globalThis as any).WebSocket = MockWebSocket;
  });

  afterAll(() => {
    (globalThis as any).WebSocket = OriginalWebSocket;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    MockWebSocket.instances = [];
    (FileSystem.getInfoAsync as jest.Mock).mockResolvedValue({
      exists: true,
      size: 8192,
    });
  });

  it("uses a shorter STT timeout budget for OpenAI than the generic provider default", () => {
    expect(getProviderSttTimeoutMs("openai")).toBe(45000);
    expect(getProviderSttTimeoutMs("mistral")).toBe(60000);
  });

  it("returns a human-readable rate limit error for provider STT", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 429,
      text: async () =>
        JSON.stringify({
          error: {
            message: "Rate limit exceeded",
          },
        }),
    });

    await expect(
      transcribeAudio({
        fileUri: "/tmp/recording.m4a",
        mode: "provider",
        provider: "openai",
        apiKey: "sk-test",
        language: "en",
      })
    ).rejects.toThrow(
      "OpenAI is rate limiting speech transcription right now. Try again in a moment."
    );
  });

  it("returns a human-readable network error for provider STT", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(
      new TypeError("Network request failed")
    );

    await expect(
      transcribeAudio({
        fileUri: "/tmp/recording.m4a",
        mode: "provider",
        provider: "mistral",
        apiKey: "mistral-test",
        language: "en",
      })
    ).rejects.toThrow(
      "Couldn't reach Mistral for speech transcription. Check the connection and try again."
    );
  });

  it("uses the configured multipart endpoint for newly wired STT providers", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        text: "Hallo Welt",
      }),
    });

    const result = await transcribeAudio({
      fileUri: "/tmp/recording.m4a",
      mode: "provider",
      provider: "mistral",
      apiKey: "mistral-test",
      language: "en",
    });

    expect(result).toBe("Hallo Welt");
    const [url] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://api.mistral.ai/v1/audio/transcriptions");
  });


  it("uses the ByteDance bigmodel flash route for Doubao Speech STT", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      text: async () =>
        JSON.stringify({
          result: {
            text: "Hello from Doubao Speech",
          },
        }),
      headers: {
        get: (name: string) =>
          name === "X-Api-Status-Code"
            ? "20000000"
            : name === "X-Api-Message"
              ? "OK"
              : null,
      },
    });

    const result = await transcribeAudio({
      fileUri: "/tmp/recording.m4a",
      mode: "provider",
      provider: "bytedance-doubao-seed",
      providerModel: "bigmodel",
      apiKey: "speech-app-key|speech-access-key",
      language: "en",
    });

    expect(result).toBe("Hello from Doubao Speech");
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe(
      "https://openspeech.bytedance.com/api/v3/auc/bigmodel/recognize/flash",
    );
    expect(options.headers["X-Api-App-Key"]).toBe("speech-app-key");
    expect(options.headers["X-Api-Access-Key"]).toBe("speech-access-key");
    expect(options.headers["X-Api-Resource-Id"]).toBe("volc.bigasr.auc_turbo");
    expect(options.headers["X-Api-Sequence"]).toBe("-1");
    expect(options.headers["X-Api-Request-Id"]).toEqual(expect.any(String));
    expect(JSON.parse(options.body)).toMatchObject({
      user: {
        uid: "speech-app-key",
      },
      audio: {
        data: "ZmFrZQ==",
      },
      request: {
        model_name: "bigmodel",
      },
    });
  });

  it("uses Google Cloud Speech v2 for Gemini STT", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            alternatives: [
              {
                transcript: "Hello from Gemini STT",
              },
            ],
          },
        ],
      }),
    });

    const result = await transcribeAudio({
      fileUri: "/tmp/recording.m4a",
      mode: "provider",
      provider: "gemini",
      providerModel: "chirp_3",
      apiKey: "AIza-test-key|my-project|ya29.test-token|us",
      language: "de",
    });

    expect(result).toBe("Hello from Gemini STT");
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe(
      "https://us-speech.googleapis.com/v2/projects/my-project/locations/us/recognizers/_:recognize",
    );
    expect(options.headers.Authorization).toBe("Bearer ya29.test-token");
    expect(options.headers["x-goog-user-project"]).toBe("my-project");
    expect(JSON.parse(options.body)).toEqual({
      config: {
        autoDecodingConfig: {},
        languageCodes: ["de-DE"],
        model: "chirp_3",
      },
      content: "ZmFrZQ==",
    });
  });

  it("uses the xAI realtime socket for voice-agent STT", async () => {
    const promise = transcribeAudio({
      fileUri: "/tmp/recording.wav",
      mode: "provider",
      provider: "xai",
      providerModel: "voice-agent-api",
      apiKey: "xai-test",
      language: "en",
    });

    const socket = await waitForMockSocket();
    expect(socket.url).toBe("wss://api.x.ai/v1/realtime");
    expect(socket.options.headers.Authorization).toBe("Bearer xai-test");
    expect(socket.options.headers["Content-Type"]).toBe("application/json");

    socket.emitOpen();
    expect(JSON.parse(socket.sent[0])).toMatchObject({
      type: "session.update",
      session: {
        turn_detection: { type: null },
        audio: {
          input: { format: { type: "audio/pcm", rate: 16000 } },
          output: { format: { type: "audio/pcm", rate: 16000 } },
        },
      },
    });

    socket.emitMessage({ type: "session.updated" });
    expect(JSON.parse(socket.sent[1])).toMatchObject({
      type: "input_audio_buffer.append",
      audio: expect.any(String),
    });
    expect(JSON.parse(socket.sent[2])).toEqual({
      type: "input_audio_buffer.commit",
    });

    socket.emitMessage({
      type: "conversation.item.input_audio_transcription.completed",
      transcript: "Hello from xAI realtime",
    });

    await expect(promise).resolves.toBe("Hello from xAI realtime");
  });











  it("uses the configured audio-input endpoint for DashScope short-file STT", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: "Hello world",
            },
          },
        ],
      }),
    });

    const result = await transcribeAudio({
      fileUri: "/tmp/recording.m4a",
      mode: "provider",
      provider: "alibaba-qwen-dashscope",
      apiKey: "dashscope-test",
      language: "en",
    });

    expect(result).toBe("Hello world");
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe(
      "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions",
    );
    const body = JSON.parse(options.body);
    expect(body.model).toBe("qwen3-asr-flash");
    expect(body.messages[0].content[0].type).toBe("input_audio");
    expect(body.messages[0].content[0].input_audio.data).toMatch(
      /^data:audio\/m4a;base64,/,
    );
  });










  it("aborts before starting the provider request when the signal is already cancelled", async () => {
    const controller = new AbortController();
    controller.abort();

    await expect(
      transcribeAudio({
        fileUri: "/tmp/recording.m4a",
        mode: "provider",
        provider: "openai",
        apiKey: "sk-test",
        language: "en",
        abortSignal: controller.signal,
      })
    ).rejects.toMatchObject({
      name: "AbortError",
    });

    expect(fetch).not.toHaveBeenCalled();
  });

  it("rejects uploads that exceed an exact catalog file-size limit before any upload", async () => {
    (FileSystem.getInfoAsync as jest.Mock).mockResolvedValue({
      exists: true,
      size: 26_000_000,
    });

    await expect(
      transcribeAudio({
        fileUri: "/tmp/recording.m4a",
        mode: "provider",
        provider: "openai",
        apiKey: "sk-test",
        language: "en",
      })
    ).rejects.toThrow(/too long for .* speech-to-text \(max 25 MB\)/);

    expect(fetch).not.toHaveBeenCalled();
  });
});
