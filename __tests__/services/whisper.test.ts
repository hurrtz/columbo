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
    expect(getProviderSttTimeoutMs("groq")).toBe(60000);
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
        provider: "groq",
        apiKey: "gsk-test",
        language: "en",
      })
    ).rejects.toThrow(
      "Couldn't reach Groq for speech transcription. Check the connection and try again."
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
      provider: "z-ai-zhipu-ai",
      apiKey: "zai-test",
      language: "en",
    });

    expect(result).toBe("Hallo Welt");
    const [url] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://api.z.ai/api/paas/v4/audio/transcriptions");
  });

  it("uses Azure OpenAI chat completions for Azure STT", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: "Hallo Welt",
            },
          },
        ],
      }),
    });

    const result = await transcribeAudio({
      fileUri: "/tmp/recording.m4a",
      mode: "provider",
      provider: "microsoft-azure",
      providerModel: "gpt-4o-mini-transcribe",
      apiKey: "https://example-resource.openai.azure.com|azure-openai-key",
      language: "en",
    });

    expect(result).toBe("Hallo Welt");
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe(
      "https://example-resource.openai.azure.com/openai/v1/chat/completions",
    );
    expect(options.headers["api-key"]).toBe("azure-openai-key");
    expect(options.headers.Authorization).toBeUndefined();
    expect(JSON.parse(options.body)).toMatchObject({
      model: "gpt-4o-mini-transcribe",
      stream: false,
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


  it("uses the AssemblyAI upload and transcript flow for pre-recorded STT", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          upload_url: "https://cdn.assemblyai.com/upload/test-file",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: "assemblyai-transcript-1",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          status: "completed",
          text: "Hello from AssemblyAI",
        }),
      });

    const result = await transcribeAudio({
      fileUri: "/tmp/recording.m4a",
      mode: "provider",
      provider: "assemblyai",
      apiKey: "assemblyai-test",
      language: "en",
    });

    expect(result).toBe("Hello from AssemblyAI");
    const [uploadUrl, uploadOptions] = (fetch as jest.Mock).mock.calls[0];
    expect(uploadUrl).toBe("https://api.assemblyai.com/v2/upload");
    expect(uploadOptions.headers.Authorization).toBe("assemblyai-test");

    const [submitUrl, submitOptions] = (fetch as jest.Mock).mock.calls[1];
    expect(submitUrl).toBe("https://api.assemblyai.com/v2/transcript");
    expect(JSON.parse(submitOptions.body)).toEqual({
      audio_url: "https://cdn.assemblyai.com/upload/test-file",
      speech_model: "universal-3-pro",
      speech_models: ["universal-3-pro"],
    });

    const [pollUrl] = (fetch as jest.Mock).mock.calls[2];
    expect(pollUrl).toBe(
      "https://api.assemblyai.com/v2/transcript/assemblyai-transcript-1",
    );
  });

  it("uses the AssemblyAI realtime socket for streaming STT models", async () => {
    const promise = transcribeAudio({
      fileUri: "/tmp/recording.wav",
      mode: "provider",
      provider: "assemblyai",
      providerModel: "u3-rt-pro",
      apiKey: "assemblyai-test",
      language: "en",
    });

    const socket = await waitForMockSocket();
    expect(socket.url).toBe(
      "wss://streaming.assemblyai.com/v3/ws?sample_rate=16000&speech_model=u3-rt-pro",
    );
    expect(socket.options.headers.Authorization).toBe("assemblyai-test");

    socket.emitOpen();
    expect(socket.sent.at(-1)).toBe(JSON.stringify({ type: "Terminate" }));

    socket.emitMessage({
      type: "Turn",
      transcript: "Hello from AssemblyAI realtime",
      end_of_turn: true,
    });
    socket.emitMessage({
      type: "Termination",
    });

    await expect(promise).resolves.toBe("Hello from AssemblyAI realtime");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("uses Replicate predictions for official transcription models", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          latest_version: {
            id: "replicate-stt-version",
            openapi_schema: {
              components: {
                schemas: {
                  Input: {
                    properties: {
                      audio_file: { type: "string" },
                      language: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          status: "succeeded",
          output: "Hello from Replicate STT",
        }),
      });

    const result = await transcribeAudio({
      fileUri: "/tmp/recording.m4a",
      mode: "provider",
      provider: "replicate",
      apiKey: "replicate-test",
      language: "en",
    });

    expect(result).toBe("Hello from Replicate STT");
    expect((fetch as jest.Mock).mock.calls[0][0]).toBe(
      "https://api.replicate.com/v1/models/openai/gpt-4o-mini-transcribe",
    );
    const [predictionUrl, predictionOptions] = (fetch as jest.Mock).mock.calls[1];
    expect(predictionUrl).toBe("https://api.replicate.com/v1/predictions");
    expect(JSON.parse(predictionOptions.body)).toEqual({
      version: "replicate-stt-version",
      input: expect.objectContaining({
        audio_file: "data:audio/m4a;base64,ZmFrZQ==",
        language: "en",
      }),
    });
  });

  it("uses the configured multipart endpoint for StepFun STT", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        text: "Ni hao",
      }),
    });

    const result = await transcribeAudio({
      fileUri: "/tmp/recording.m4a",
      mode: "provider",
      provider: "stepfun",
      apiKey: "stepfun-test",
      language: "en",
    });

    expect(result).toBe("Ni hao");
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://api.stepfun.com/v1/audio/transcriptions");
    expect((options.body as FormData).get("model")).toBe("step-asr");
  });

  it("uses the configured multipart endpoint for SiliconFlow STT", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        text: "Hello from SiliconFlow",
      }),
    });

    const result = await transcribeAudio({
      fileUri: "/tmp/recording.m4a",
      mode: "provider",
      provider: "siliconflow",
      apiKey: "siliconflow-test",
      language: "en",
    });

    expect(result).toBe("Hello from SiliconFlow");
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://api.siliconflow.com/v1/audio/transcriptions");
    expect((options.body as FormData).get("model")).toBe(
      "FunAudioLLM/SenseVoiceSmall",
    );
  });

  it("uses the Fish Audio multipart STT endpoint without a model picker", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        text: "Hello from Fish Audio",
      }),
    });

    const result = await transcribeAudio({
      fileUri: "/tmp/recording.m4a",
      mode: "provider",
      provider: "fish-audio",
      apiKey: "fish-test",
      language: "en",
    });

    expect(result).toBe("Hello from Fish Audio");
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://api.fish.audio/v1/asr");
    expect(options.headers.Authorization).toBe("Bearer fish-test");
    expect((options.body as FormData).get("ignore_timestamps")).toBe("true");
    expect((options.body as FormData).get("audio")).toBeTruthy();
  });

  it("uses the Fireworks offline transcription route with raw API-key auth", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        text: "Hello from Fireworks",
      }),
    });

    const result = await transcribeAudio({
      fileUri: "/tmp/recording.m4a",
      mode: "provider",
      provider: "fireworks-ai",
      apiKey: "fireworks-test",
      language: "en",
    });

    expect(result).toBe("Hello from Fireworks");
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe(
      "https://audio-prod.api.fireworks.ai/v1/audio/transcriptions",
    );
    expect(options.headers.Authorization).toBe("fireworks-test");
    expect((options.body as FormData).get("model")).toBe("whisper-v3");
  });

  it("uses the Fireworks streaming socket for realtime ASR models", async () => {
    jest.useFakeTimers();

    try {
      const promise = transcribeAudio({
        fileUri: "/tmp/recording.wav",
        mode: "provider",
        provider: "fireworks-ai",
        providerModel: "fireworks-asr-v2",
        apiKey: "fireworks-test",
        language: "en",
      });

      const socket = await waitForMockSocket();
      expect(socket.url).toBe(
        "wss://audio-streaming-v2.api.fireworks.ai/v1/audio/transcriptions/streaming?response_format=verbose_json",
      );
      expect(socket.options.headers.Authorization).toBe("fireworks-test");

      socket.emitOpen();
      socket.emitMessage({
        segments: [
          { id: "0", text: "Hello from" },
          { id: "1", text: "Fireworks realtime" },
        ],
      });

      await jest.advanceTimersByTimeAsync(1300);

      await expect(promise).resolves.toBe("Hello from Fireworks realtime");
      expect(fetch).not.toHaveBeenCalled();
    } finally {
      jest.useRealTimers();
    }
  });

  it("uses the DeepInfra native inference route for ASR models", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        text: "Hello from DeepInfra",
      }),
    });

    const result = await transcribeAudio({
      fileUri: "/tmp/recording.m4a",
      mode: "provider",
      provider: "deepinfra",
      apiKey: "deepinfra-test",
      language: "en",
    });

    expect(result).toBe("Hello from DeepInfra");
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe(
      "https://api.deepinfra.com/v1/inference/openai/whisper-large-v3-turbo",
    );
    expect(options.headers.Authorization).toBe("Bearer deepinfra-test");
    expect((options.body as FormData).get("audio")).toBeTruthy();
  });

  it("switches Fireworks transcription hosts for turbo STT models", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        text: "Hello from Fireworks Turbo",
      }),
    });

    const result = await transcribeAudio({
      fileUri: "/tmp/recording.m4a",
      mode: "provider",
      provider: "fireworks-ai",
      providerModel: "whisper-v3-turbo",
      apiKey: "fireworks-test",
      language: "en",
    });

    expect(result).toBe("Hello from Fireworks Turbo");
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe(
      "https://audio-turbo.api.fireworks.ai/v1/audio/transcriptions",
    );
    expect((options.body as FormData).get("model")).toBe("whisper-v3-turbo");
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


  it("uses Baidu short-speech recognition with a bearer token and base64 audio", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        result: ["你好，百度"],
      }),
    });

    const result = await transcribeAudio({
      fileUri: "/tmp/recording.m4a",
      mode: "provider",
      provider: "baidu-ernie-qianfan",
      apiKey: "baidu-test",
      language: "en",
    });

    expect(result).toBe("你好，百度");
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("http://vop.baidu.com/server_api");
    expect(options.headers.Authorization).toBe("Bearer baidu-test");
    expect(JSON.parse(options.body)).toEqual({
      format: "m4a",
      rate: 16000,
      channel: 1,
      cuid: "schnackai",
      dev_pid: 1737,
      token: "baidu-test",
      speech: "ZmFrZQ==",
      len: 4,
    });
  });

  it("switches Baidu STT endpoints for the 极速版 speech surface", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        result: ["你好，极速版"],
      }),
    });

    const result = await transcribeAudio({
      fileUri: "/tmp/recording.m4a",
      mode: "provider",
      provider: "baidu-ernie-qianfan",
      providerModel: "短语音识别极速版",
      apiKey: "baidu-test",
      language: "de",
    });

    expect(result).toBe("你好，极速版");
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://vop.baidu.com/pro_api");
    expect(JSON.parse(options.body).dev_pid).toBe(80001);
  });


  it("uses the Deepgram pre-recorded upload endpoint for native speech models", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: {
          channels: [
            {
              alternatives: [
                {
                  transcript: "Hello from Deepgram",
                },
              ],
            },
          ],
        },
      }),
    });

    const result = await transcribeAudio({
      fileUri: "/tmp/recording.m4a",
      mode: "provider",
      provider: "deepgram",
      apiKey: "deepgram-test",
      language: "en",
    });

    expect(result).toBe("Hello from Deepgram");
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe(
      "https://api.deepgram.com/v1/listen?model=nova-3&smart_format=true",
    );
    expect(options.headers.Authorization).toBe("Token deepgram-test");
    expect(options.headers["Content-Type"]).toBe("audio/m4a");
  });

  it("uses the OpenAI-compatible multipart STT route for SambaNova", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        text: "Hello from SambaNova",
      }),
    });

    const result = await transcribeAudio({
      fileUri: "/tmp/recording.m4a",
      mode: "provider",
      provider: "sambanova",
      apiKey: "sambanova-test",
      language: "en",
    });

    expect(result).toBe("Hello from SambaNova");
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://api.sambanova.ai/v1/audio/transcriptions");
    expect(options.headers.Authorization).toBe("Bearer sambanova-test");
    expect((options.body as FormData).get("model")).toBe("Whisper-Large-v3");
  });

  it("uses the Novita GLM-ASR JSON route with base64 audio input", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        text: "Hello from Novita",
      }),
    });

    const result = await transcribeAudio({
      fileUri: "/tmp/recording.m4a",
      mode: "provider",
      provider: "novita-ai",
      apiKey: "novita-test",
      language: "en",
    });

    expect(result).toBe("Hello from Novita");
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://api.novita.ai/v3/glm-asr");
    expect(options.headers.Authorization).toBe("Bearer novita-test");
    expect(JSON.parse(options.body)).toEqual({
      file: "ZmFrZQ==",
    });
  });

  it("uses the ElevenLabs multipart transcription endpoint for scribe models", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        text: "Hello from ElevenLabs",
      }),
    });

    const result = await transcribeAudio({
      fileUri: "/tmp/recording.m4a",
      mode: "provider",
      provider: "elevenlabs",
      apiKey: "elevenlabs-test",
      language: "en",
    });

    expect(result).toBe("Hello from ElevenLabs");
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://api.elevenlabs.io/v1/speech-to-text");
    expect(options.headers["xi-api-key"]).toBe("elevenlabs-test");
    expect((options.body as FormData).get("model_id")).toBe("scribe_v2");
  });

  it("uses the ElevenLabs realtime socket for scribe_v2_realtime", async () => {
    const promise = transcribeAudio({
      fileUri: "/tmp/recording.wav",
      mode: "provider",
      provider: "elevenlabs",
      providerModel: "scribe_v2_realtime",
      apiKey: "elevenlabs-test",
      language: "en",
    });

    const socket = await waitForMockSocket();
    expect(socket.url).toBe(
      "wss://api.elevenlabs.io/v1/speech-to-text/realtime?model_id=scribe_v2_realtime&audio_format=pcm_16000&commit_strategy=manual&include_timestamps=true&language_code=en",
    );
    expect(socket.options.headers["xi-api-key"]).toBe("elevenlabs-test");

    socket.emitOpen();
    expect(JSON.parse(socket.sent[0])).toMatchObject({
      message_type: "input_audio_chunk",
      commit: true,
      sample_rate: 16000,
    });

    socket.emitMessage({
      message_type: "committed_transcript",
      text: "Hello from ElevenLabs realtime",
    });

    await expect(promise).resolves.toBe("Hello from ElevenLabs realtime");
    expect(fetch).not.toHaveBeenCalled();
  });


  it("uses the Hugging Face native hf-inference JSON route for STT", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        text: "Hello from Hugging Face",
      }),
    });

    const result = await transcribeAudio({
      fileUri: "/tmp/recording.m4a",
      mode: "provider",
      provider: "hugging-face-inference-api",
      apiKey: "hf-test",
      language: "en",
    });

    expect(result).toBe("Hello from Hugging Face");
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe(
      "https://router.huggingface.co/hf-inference/models/openai%2Fwhisper-large-v3",
    );
    expect(options.headers.Authorization).toBe("Bearer hf-test");
    expect(JSON.parse(options.body)).toEqual({
      inputs: "ZmFrZQ==",
    });
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

  it("rejects uploads that exceed an exact catalog file-size limit", async () => {
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
    ).rejects.toThrow(
      "OpenAI GPT-4o mini Transcribe only accepts recordings up to 25 MB. Use a shorter clip or switch STT models."
    );

    expect(fetch).not.toHaveBeenCalled();
  });
});
