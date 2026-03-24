import * as FileSystem from "expo-file-system/legacy";
import { transcribeAudio } from "../../src/services/whisper";

global.fetch = jest.fn();

jest.mock("expo-file-system/legacy", () => ({
  readAsStringAsync: jest.fn(() => Promise.resolve("ZmFrZQ==")),
  getInfoAsync: jest.fn(() =>
    Promise.resolve({
      exists: true,
      size: 8192,
    })
  ),
}));

describe("transcribeAudio", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (FileSystem.getInfoAsync as jest.Mock).mockResolvedValue({
      exists: true,
      size: 8192,
    });
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

  it("uses the Azure OpenAI v1 transcription route with api-key auth", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        text: "Hello from Azure",
      }),
    });

    const result = await transcribeAudio({
      fileUri: "/tmp/recording.m4a",
      mode: "provider",
      provider: "microsoft-azure",
      apiKey: "https://example-resource.openai.azure.com|azure-test-key",
      language: "en",
    });

    expect(result).toBe("Hello from Azure");
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe(
      "https://example-resource.openai.azure.com/openai/v1/audio/transcriptions",
    );
    expect(options.headers["api-key"]).toBe("azure-test-key");
    expect((options.body as FormData).get("model")).toBe(
      "gpt-4o-mini-transcribe",
    );
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
