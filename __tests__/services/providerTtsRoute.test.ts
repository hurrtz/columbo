import { synthesizeProviderSpeech } from "../../src/services/tts/providerRoute";

global.fetch = jest.fn();

jest.mock("expo-file-system/legacy", () => ({
  cacheDirectory: "/tmp/",
  writeAsStringAsync: jest.fn(() => Promise.resolve()),
}));

class MockFileReader {
  public result: string | ArrayBuffer | null = null;
  public onloadend: (() => void) | null = null;
  public onerror: (() => void) | null = null;

  readAsDataURL() {
    this.result = "data:audio/wav;base64,ZmFrZQ==";
    this.onloadend?.();
  }
}

Object.defineProperty(global, "FileReader", {
  value: MockFileReader,
  writable: true,
});

describe("synthesizeProviderSpeech", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("uses DashScope TTS and downloads the generated wav file", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            output: {
              audio: {
                url: "https://dashscope.example/audio.wav",
              },
            },
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        blob: () => Promise.resolve(new Blob(["fake-audio"])),
      });

    const result = await synthesizeProviderSpeech({
      text: "Hello world",
      voice: "",
      provider: "alibaba-qwen-dashscope",
      apiKey: "dashscope-test",
      language: "en",
    });

    expect(result).toMatch(/^\/tmp\/tts-.*\.wav$/);
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe(
      "https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation",
    );
    const body = JSON.parse(options.body);
    expect(body.model).toBe("qwen3-tts-flash");
    expect(body.input.voice).toBe("Cherry");
    expect(body.input.text).toBe("Hello world");
    expect((fetch as jest.Mock).mock.calls[1][0]).toBe(
      "https://dashscope.example/audio.wav",
    );
  });

  it("uses the Azure OpenAI v1 speech route with api-key auth", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(new Blob(["fake-audio"])),
    });

    const result = await synthesizeProviderSpeech({
      text: "Hello world",
      voice: "",
      provider: "microsoft-azure",
      apiKey: "https://example-resource.openai.azure.com|azure-test-key",
      language: "en",
    });

    expect(result).toMatch(/^\/tmp\/tts-.*\.mp3$/);
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe(
      "https://example-resource.openai.azure.com/openai/v1/audio/speech",
    );
    expect(options.headers["api-key"]).toBe("azure-test-key");
    expect(JSON.parse(options.body)).toEqual({
      model: "gpt-4o-mini-tts",
      voice: "alloy",
      input: "Hello world",
      response_format: "mp3",
    });
  });

  it("uses Deepgram native speak and sends the selected voice model", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(new Blob(["fake-audio"])),
    });

    const result = await synthesizeProviderSpeech({
      text: "Hello world",
      voice: "aura-2-thalia-en",
      provider: "deepgram",
      apiKey: "deepgram-test",
      language: "en",
    });

    expect(result).toMatch(/^\/tmp\/tts-.*\.mp3$/);
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe(
      "https://api.deepgram.com/v1/speak?model=aura-2-thalia-en",
    );
    expect(options.headers.Authorization).toBe("Token deepgram-test");
    expect(JSON.parse(options.body)).toEqual({
      text: "Hello world",
    });
  });

  it("uses ElevenLabs TTS with the selected voice id and model id", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(new Blob(["fake-audio"])),
    });

    const result = await synthesizeProviderSpeech({
      text: "Hello world",
      voice: "JBFqnCBsd6RMkjVDRZzb",
      provider: "elevenlabs",
      apiKey: "elevenlabs-test",
      language: "en",
    });

    expect(result).toMatch(/^\/tmp\/tts-.*\.mp3$/);
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe(
      "https://api.elevenlabs.io/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb",
    );
    expect(options.headers["xi-api-key"]).toBe("elevenlabs-test");
    expect(JSON.parse(options.body)).toEqual({
      text: "Hello world",
      model_id: "eleven_flash_v2_5",
      output_format: "mp3_44100_128",
    });
  });

  it("uses Fish Audio TTS with the backend model header", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(new Blob(["fake-audio"])),
    });

    const result = await synthesizeProviderSpeech({
      text: "Hello world",
      voice: "",
      provider: "fish-audio",
      providerModel: "speech-1.6",
      apiKey: "fish-test",
      language: "en",
    });

    expect(result).toMatch(/^\/tmp\/tts-.*\.mp3$/);
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://api.fish.audio/v1/tts");
    expect(options.headers.Authorization).toBe("Bearer fish-test");
    expect(options.headers.model).toBe("speech-1.6");
    expect(JSON.parse(options.body)).toEqual({
      text: "Hello world",
      format: "mp3",
      chunk_length: 200,
      min_chunk_length: 50,
      normalize: true,
      prosody: {
        speed: 1,
        volume: 0,
      },
    });
  });

  it("uses Groq TTS with a model-specific fallback voice and wav output", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(new Blob(["fake-audio"])),
    });

    const result = await synthesizeProviderSpeech({
      text: "Hello world",
      voice: "",
      provider: "groq",
      apiKey: "groq-test",
      language: "en",
    });

    expect(result).toMatch(/^\/tmp\/tts-.*\.wav$/);
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://api.groq.com/openai/v1/audio/speech");
    expect(options.headers.Authorization).toBe("Bearer groq-test");
    expect(JSON.parse(options.body)).toEqual({
      model: "canopylabs/orpheus-v1-english",
      voice: "troy",
      input: "Hello world",
      response_format: "wav",
    });
  });

  it("normalizes Together voices for non-Kokoro speech models", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(new Blob(["fake-audio"])),
    });

    const result = await synthesizeProviderSpeech({
      text: "Hello world",
      voice: "af_alloy",
      provider: "together",
      providerModel: "canopylabs/orpheus-3b-0.1-ft",
      apiKey: "together-test",
      language: "en",
    });

    expect(result).toMatch(/^\/tmp\/tts-.*\.mp3$/);
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://api.together.xyz/v1/audio/speech");
    expect(JSON.parse(options.body)).toEqual({
      model: "canopylabs/orpheus-3b-0.1-ft",
      voice: "tara",
      input: "Hello world",
      response_format: "mp3",
      language: "en",
    });
  });

  it("uses SiliconFlow TTS with prefixed preset voice ids", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(new Blob(["fake-audio"])),
    });

    const result = await synthesizeProviderSpeech({
      text: "Hello world",
      voice: "",
      provider: "siliconflow",
      apiKey: "siliconflow-test",
      language: "en",
    });

    expect(result).toMatch(/^\/tmp\/tts-.*\.mp3$/);
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://api.siliconflow.com/v1/audio/speech");
    expect(JSON.parse(options.body)).toEqual({
      model: "fishaudio/fish-speech-1.5",
      voice: "fishaudio/fish-speech-1.5:alex",
      input: "Hello world",
      response_format: "mp3",
      stream: false,
      sample_rate: 44100,
    });
  });

  it("supports the CosyVoice2 SiliconFlow model on the same speech route", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(new Blob(["fake-audio"])),
    });

    const result = await synthesizeProviderSpeech({
      text: "Hello world",
      voice: "",
      provider: "siliconflow",
      providerModel: "FunAudioLLM/CosyVoice2-0.5B",
      apiKey: "siliconflow-test",
      language: "en",
    });

    expect(result).toMatch(/^\/tmp\/tts-.*\.mp3$/);
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://api.siliconflow.com/v1/audio/speech");
    expect(JSON.parse(options.body)).toEqual({
      model: "FunAudioLLM/CosyVoice2-0.5B",
      voice: "FunAudioLLM/CosyVoice2-0.5B:alex",
      input: "Hello world",
      response_format: "mp3",
      stream: false,
      sample_rate: 44100,
    });
  });

  it("uses Hyperbolic Melo TTS and decodes the returned base64 audio", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          audio: "ZmFrZQ==",
        }),
    });

    const result = await synthesizeProviderSpeech({
      text: "Hello world",
      voice: "EN-AU",
      provider: "hyperbolic",
      apiKey: "hyperbolic-test",
      language: "en",
    });

    expect(result).toMatch(/^\/tmp\/tts-.*\.mp3$/);
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://api.hyperbolic.xyz/v1/audio/generation");
    expect(JSON.parse(options.body)).toEqual({
      text: "Hello world",
      language: "EN",
      speaker: "EN-AU",
      speed: 1,
    });
  });

  it("uses MiniMax TTS with the documented sync HTTP route", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          data: {
            audio: "66616b65",
          },
        }),
    });

    const result = await synthesizeProviderSpeech({
      text: "Hello world",
      voice: "",
      provider: "minimax",
      apiKey: "minimax-test",
      language: "en",
    });

    expect(result).toMatch(/^\/tmp\/tts-.*\.mp3$/);
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://api.minimax.io/v1/t2a_v2");
    expect(JSON.parse(options.body)).toEqual({
      model: "speech-2.8-hd",
      text: "Hello world",
      stream: false,
      output_format: "hex",
      language_boost: "auto",
      voice_setting: {
        voice_id: "English_expressive_narrator",
        speed: 1,
        vol: 1,
        pitch: 0,
      },
      audio_setting: {
        sample_rate: 32000,
        bitrate: 128000,
        format: "mp3",
        channel: 1,
      },
    });
  });

  it("uses StepFun TTS with the documented speech endpoint", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(new Blob(["fake-audio"])),
    });

    const result = await synthesizeProviderSpeech({
      text: "Hello world",
      voice: "",
      provider: "stepfun",
      apiKey: "stepfun-test",
      language: "en",
    });

    expect(result).toMatch(/^\/tmp\/tts-.*\.mp3$/);
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://api.stepfun.com/v1/audio/speech");
    expect(JSON.parse(options.body)).toEqual({
      model: "step-tts-2",
      voice: "cixingnansheng",
      input: "Hello world",
      response_format: "mp3",
    });
  });

  it("uses mainland BigModel TTS for Z.ai with wav output", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(new Blob(["fake-audio"])),
    });

    const result = await synthesizeProviderSpeech({
      text: "Hello world",
      voice: "",
      provider: "z-ai-zhipu-ai",
      apiKey: "zai-test",
      language: "en",
    });

    expect(result).toMatch(/^\/tmp\/tts-.*\.wav$/);
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://open.bigmodel.cn/api/paas/v4/audio/speech");
    expect(JSON.parse(options.body)).toEqual({
      model: "glm-tts",
      voice: "tongtong",
      input: "Hello world",
      response_format: "wav",
      stream: false,
    });
  });

  it("uses Baidu short-text TTS with form-encoded synthesis parameters", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(new Blob(["fake-audio"])),
    });

    const result = await synthesizeProviderSpeech({
      text: "Hello world",
      voice: "",
      provider: "baidu-ernie-qianfan",
      apiKey: "baidu-test",
      language: "en",
    });

    expect(result).toMatch(/^\/tmp\/tts-.*\.mp3$/);
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://tsn.baidu.com/text2audio");
    expect(options.headers.Authorization).toBe("Bearer baidu-test");
    expect(options.headers["Content-Type"]).toBe(
      "application/x-www-form-urlencoded",
    );
    expect(options.body).toBe(
      "tex=Hello+world&tok=baidu-test&cuid=schnackai&ctp=1&lan=zh&per=0&spd=5&pit=5&vol=5&aue=3",
    );
  });

  it("uses Baidu long-text TTS through the async create/query flow", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            task_id: "baidu-task-1",
            task_status: "Running",
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            tasks_info: [
              {
                task_status: "Success",
                task_result: {
                  speech_url: "https://baidu.example/audio.mp3",
                },
              },
            ],
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        blob: () => Promise.resolve(new Blob(["fake-audio"])),
      });

    const result = await synthesizeProviderSpeech({
      text: "Hello world",
      voice: "",
      provider: "baidu-ernie-qianfan",
      providerModel: "长文本合成",
      apiKey: "baidu-test",
      language: "en",
    });

    expect(result).toMatch(/^\/tmp\/tts-.*\.mp3$/);

    const [createUrl, createOptions] = (fetch as jest.Mock).mock.calls[0];
    expect(createUrl).toBe(
      "https://aip.baidubce.com/rpc/2.0/tts/v1/create?access_token=baidu-test",
    );
    expect(JSON.parse(createOptions.body)).toEqual({
      text: ["Hello world"],
      format: "mp3-16k",
      voice: 0,
      lang: "zh",
      speed: 5,
      pitch: 5,
      volume: 5,
    });

    const [queryUrl, queryOptions] = (fetch as jest.Mock).mock.calls[1];
    expect(queryUrl).toBe(
      "https://aip.baidubce.com/rpc/2.0/tts/v1/query?access_token=baidu-test",
    );
    expect(JSON.parse(queryOptions.body)).toEqual({
      task_ids: ["baidu-task-1"],
    });

    expect((fetch as jest.Mock).mock.calls[2][0]).toBe(
      "https://baidu.example/audio.mp3",
    );
  });

  it("uses Novita GLM-TTS with the documented voice and wav output", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(new Blob(["fake-audio"])),
    });

    const result = await synthesizeProviderSpeech({
      text: "Hello world",
      voice: "",
      provider: "novita-ai",
      apiKey: "novita-test",
      language: "en",
    });

    expect(result).toMatch(/^\/tmp\/tts-.*\.wav$/);
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://api.novita.ai/v3/glm-tts");
    expect(JSON.parse(options.body)).toEqual({
      input: "Hello world",
      voice: "tongtong",
      speed: 1,
      volume: 1,
      response_format: "wav",
    });
  });

  it("uses Novita legacy txt2speech through the async create and task-result flow", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          task_id: "task-123",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          task: {
            status: "TASK_STATUS_SUCCEED",
          },
          audios: [
            {
              audio_url: "https://novita.example/audio.mp3",
            },
          ],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        blob: () => Promise.resolve(new Blob(["fake-audio"])),
      });

    const result = await synthesizeProviderSpeech({
      text: "Hello world",
      voice: "",
      provider: "novita-ai",
      providerModel: "txt2speech",
      apiKey: "novita-test",
      language: "en",
    });

    expect(result).toMatch(/^\/tmp\/tts-.*\.mp3$/);
    const [createUrl, createOptions] = (fetch as jest.Mock).mock.calls[0];
    expect(createUrl).toBe("https://api.novita.ai/v3/async/txt2speech");
    expect(JSON.parse(createOptions.body)).toEqual({
      text: "Hello world",
      voice_name: "Emily",
      language: "en-US",
      response_audio_type: "mp3",
    });

    expect((fetch as jest.Mock).mock.calls[1][0]).toBe(
      "https://api.novita.ai/v3/async/task-result?task_id=task-123",
    );
    expect((fetch as jest.Mock).mock.calls[2][0]).toBe(
      "https://novita.example/audio.mp3",
    );
  });

  it("uses Novita MiniMax-family TTS routes with hex audio output", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: {
          audio: "68656c6c6f",
        },
      }),
    });

    const result = await synthesizeProviderSpeech({
      text: "Hello world",
      voice: "",
      provider: "novita-ai",
      providerModel: "minimax-speech-02-turbo",
      apiKey: "novita-test",
      language: "en",
    });

    expect(result).toMatch(/^\/tmp\/tts-.*\.mp3$/);
    const [url, options] = (fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://api.novita.ai/v3/minimax-speech-02-turbo");
    expect(JSON.parse(options.body)).toEqual({
      model: "minimax-speech-02-turbo",
      text: "Hello world",
      stream: false,
      output_format: "hex",
      language_boost: "auto",
      voice_setting: {
        voice_id: "English_expressive_narrator",
        speed: 1,
        vol: 1,
        pitch: 0,
      },
      audio_setting: {
        sample_rate: 32000,
        bitrate: 128000,
        format: "mp3",
        channel: 1,
      },
    });
  });
});
