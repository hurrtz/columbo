# Integration Status

Generated from `data/providers` and `src/constants/providers/runtimeManifest.ts`.
Catalog updated: 2026-03-23

## Legend

- `Integrated`: this exact catalog model is currently wired into the app runtime. Alias-backed runtime IDs resolve to the canonical catalog row.
- `Not integrated`: this model exists in the catalog but is not currently runnable in the app.

## Summary

- Catalog providers: 40
- Providers with any runtime integration: 27
- Catalog models: 455
- Integrated models: 136
- LLM: 122/294 integrated
- STT: 10/71 integrated
- TTS: 4/90 integrated
- Unresolved runtime manifest entries: 56

## 01.AI (Yi) `01-ai-yi`

- Runtime provider: catalog-only
- Model integration: 0/10 integrated
- Verified support: LLM `native`, STT `unsupported`, TTS `unsupported`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `yi-large` | Yi-Large | Not integrated | — |
| LLM | `yi-large-fc` | Yi-Large-FC | Not integrated | — |
| LLM | `yi-large-rag` | Yi-Large-RAG | Not integrated | — |
| LLM | `yi-large-turbo` | Yi-Large-Turbo | Not integrated | — |
| LLM | `yi-lightning` | Yi-Lightning | Not integrated | — |
| LLM | `yi-lightning-lite` | Yi-Lightning-Lite | Not integrated | — |
| LLM | `yi-medium` | Yi-Medium | Not integrated | — |
| LLM | `yi-medium-200k` | Yi-Medium-200K | Not integrated | — |
| LLM | `yi-spark` | Yi-Spark | Not integrated | — |
| LLM | `yi-vision` | Yi-Vision | Not integrated | — |

## AI21 Labs `ai21-labs`

- Runtime provider: `ai21-labs`
- Model integration: 2/2 integrated
- Verified support: LLM `native`, STT `unsupported`, TTS `unsupported`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `jamba-large-1.7-2025-07` | Jamba Large | Integrated | `jamba-large-1.7-2025-07` |
| LLM | `jamba-mini-2-2026-01` | Jamba Mini | Integrated | `jamba-mini-2-2026-01` |

## Aleph Alpha `aleph-alpha`

- Runtime provider: catalog-only
- Model integration: 0/4 integrated
- Verified support: LLM `native`, STT `partial`, TTS `unsupported`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `luminous-base` | Luminous base | Not integrated | — |
| LLM | `pharia-1-llm-7b-control` | Pharia-1-LLM-7B-control | Not integrated | — |
| LLM | `pharia-1-llm-7b-control-aligned` | Pharia-1-LLM-7B-control-aligned | Not integrated | — |
| STT | `whisperx-transcription-medium` | WhisperX transcription medium | Not integrated | — |

## Alibaba / Qwen (DashScope) `alibaba-qwen-dashscope`

- Runtime provider: `alibaba-qwen-dashscope`
- Model integration: 6/13 integrated
- Verified support: LLM `native`, STT `native`, TTS `native`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `qwen-flash` | Qwen-Flash | Integrated | `qwen-flash` |
| LLM | `qwen-plus` | Qwen-Plus | Integrated | `qwen-plus` |
| LLM | `qwen3-max` | Qwen3-Max | Integrated | `qwen3-max` |
| LLM | `qwen3-omni-flash-realtime` | Qwen3-Omni-Flash-Realtime | Not integrated | — |
| LLM | `qwen3.5-flash` | Qwen3.5-Flash | Integrated | `qwen3.5-flash` |
| LLM | `qwen3.5-plus` | Qwen3.5-Plus | Integrated | `qwen3.5-plus` |
| STT | `qwen3-asr-flash` | Qwen3-ASR-Flash | Integrated | `qwen3-asr-flash` |
| STT | `qwen3-asr-flash-filetrans` | Qwen3-ASR-Flash-Filetrans | Not integrated | — |
| STT | `qwen3-asr-flash-realtime` | Qwen3-ASR-Flash-Realtime | Not integrated | — |
| TTS | `qwen3-tts-flash` | Qwen3-TTS-Flash | Not integrated | — |
| TTS | `qwen3-tts-flash-realtime` | Qwen3-TTS-Flash-Realtime | Not integrated | — |
| TTS | `qwen3-tts-instruct-flash` | Qwen3-TTS-Instruct-Flash | Not integrated | — |
| TTS | `qwen3-tts-instruct-flash-realtime` | Qwen3-TTS-Instruct-Flash-Realtime | Not integrated | — |

## Amazon AWS `amazon-aws`

- Runtime provider: catalog-only
- Model integration: 0/7 integrated
- Verified support: LLM `native`, STT `native`, TTS `native`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `amazon.nova-2-lite-v1:0` | Amazon Nova 2 Lite | Not integrated | — |
| LLM | `amazon.nova-2-sonic-v1:0` | Amazon Nova 2 Sonic | Not integrated | — |
| LLM | `amazon.nova-lite-v1:0` | Amazon Nova Lite | Not integrated | — |
| LLM | `amazon.nova-micro-v1:0` | Amazon Nova Micro | Not integrated | — |
| LLM | `amazon.nova-premier-v1:0` | Amazon Nova Premier | Not integrated | — |
| LLM | `amazon.nova-pro-v1:0` | Amazon Nova Pro | Not integrated | — |
| LLM | `amazon.nova-sonic-v1:0` | Amazon Nova Sonic | Not integrated | — |

## Anthropic `anthropic`

- Runtime provider: `anthropic`
- Model integration: 8/9 integrated
- Verified support: LLM `native`, STT `unsupported`, TTS `unsupported`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `claude-3-haiku-20240307` | Claude 3 Haiku | Integrated | `claude-3-haiku-20240307` |
| LLM | `claude-haiku-4-5-20251001` | Claude Haiku 4.5 | Integrated | `claude-haiku-4-5-20251001` |
| LLM | `claude-opus-4-20250514` | Claude Opus 4 | Not integrated | — |
| LLM | `claude-opus-4-1-20250805` | Claude Opus 4.1 | Integrated | `claude-opus-4-1-20250805` |
| LLM | `claude-opus-4-5-20251101` | Claude Opus 4.5 | Integrated | `claude-opus-4-5-20251101` |
| LLM | `claude-opus-4-6` | Claude Opus 4.6 | Integrated | `claude-opus-4-6` |
| LLM | `claude-sonnet-4-20250514` | Claude Sonnet 4 | Integrated | `claude-sonnet-4-20250514` |
| LLM | `claude-sonnet-4-5-20250929` | Claude Sonnet 4.5 | Integrated | `claude-sonnet-4-5-20250929` |
| LLM | `claude-sonnet-4-6` | Claude Sonnet 4.6 | Integrated | `claude-sonnet-4-6` |

## AssemblyAI `assemblyai`

- Runtime provider: catalog-only
- Model integration: 0/28 integrated
- Verified support: LLM `routed`, STT `native`, TTS `unsupported`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `chatgpt-4o` | ChatGPT-4o | Not integrated | — |
| LLM | `claude-3-haiku-20240307` | Claude 3.0 Haiku | Not integrated | — |
| LLM | `claude-opus-4-20250514` | Claude 4 Opus | Not integrated | — |
| LLM | `claude-sonnet-4-20250514` | Claude 4 Sonnet | Not integrated | — |
| LLM | `claude-haiku-4-5-20251001` | Claude 4.5 Haiku | Not integrated | — |
| LLM | `claude-sonnet-4-5-20250929` | Claude 4.5 Sonnet | Not integrated | — |
| LLM | `claude-opus-4-5-20251101` | Claude Opus 4.5 | Not integrated | — |
| LLM | `claude-opus-4-6` | Claude Opus 4.6 | Not integrated | — |
| LLM | `claude-sonnet-4-6` | Claude Sonnet 4.6 | Not integrated | — |
| LLM | `gemini-2.5-flash` | Gemini 2.5 Flash | Not integrated | — |
| LLM | `gemini-2.5-flash-lite` | Gemini 2.5 Flash-Lite | Not integrated | — |
| LLM | `gemini-2.5-pro` | Gemini 2.5 Pro | Not integrated | — |
| LLM | `gemini-3-flash-preview` | Gemini 3 Flash Preview | Not integrated | — |
| LLM | `gemini-3-pro-preview` | Gemini 3 Pro Preview | Not integrated | — |
| LLM | `gpt-4.1` | GPT-4.1 | Not integrated | — |
| LLM | `gpt-5` | GPT-5 | Not integrated | — |
| LLM | `gpt-5-mini` | GPT-5 mini | Not integrated | — |
| LLM | `gpt-5-nano` | GPT-5 nano | Not integrated | — |
| LLM | `gpt-5.1` | GPT-5.1 | Not integrated | — |
| LLM | `gpt-5.2` | GPT-5.2 | Not integrated | — |
| LLM | `gpt-oss-120b` | gpt-oss-120b | Not integrated | — |
| LLM | `gpt-oss-20b` | gpt-oss-20b | Not integrated | — |
| STT | `universal-2` | Universal-2 | Not integrated | — |
| STT | `universal-3-pro` | Universal-3 Pro | Not integrated | — |
| STT | `u3-rt-pro` | Universal-3 Pro Streaming | Not integrated | — |
| STT | `universal-streaming-english` | Universal-Streaming English | Not integrated | — |
| STT | `universal-streaming-multilingual` | Universal-Streaming Multilingual | Not integrated | — |
| STT | `whisper-rt` | Whisper Streaming | Not integrated | — |

## Baichuan `baichuan`

- Runtime provider: `baichuan`
- Model integration: 5/12 integrated
- Verified support: LLM `native`, STT `unsupported`, TTS `unsupported`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `Baichuan-M2` | Baichuan-M2 | Not integrated | — |
| LLM | `Baichuan-M2-Plus` | Baichuan-M2-Plus | Not integrated | — |
| LLM | `Baichuan-M3` | Baichuan-M3 | Not integrated | — |
| LLM | `Baichuan-M3-Plus` | Baichuan-M3-Plus | Not integrated | — |
| LLM | `Baichuan2-53B` | Baichuan2-53B | Not integrated | — |
| LLM | `Baichuan2-Turbo` | Baichuan2-Turbo | Not integrated | — |
| LLM | `Baichuan2-Turbo-192k` | Baichuan2-Turbo-192k | Not integrated | — |
| LLM | `Baichuan3-Turbo` | Baichuan3-Turbo | Integrated | `Baichuan3-Turbo` |
| LLM | `Baichuan3-Turbo-128k` | Baichuan3-Turbo-128k | Integrated | `Baichuan3-Turbo-128k` |
| LLM | `Baichuan4` | Baichuan4 | Integrated | `Baichuan4` |
| LLM | `Baichuan4-Air` | Baichuan4-Air | Integrated | `Baichuan4-Air` |
| LLM | `Baichuan4-Turbo` | Baichuan4-Turbo | Integrated | `Baichuan4-Turbo` |

## Baidu (ERNIE / Qianfan) `baidu-ernie-qianfan`

- Runtime provider: catalog-only
- Model integration: 0/17 integrated
- Verified support: LLM `native`, STT `native`, TTS `native`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `ernie-4.5-21b-a3b` | ERNIE 4.5 21B A3B | Not integrated | — |
| LLM | `ernie-4.5-21b-a3b-thinking` | ERNIE 4.5 21B A3B Thinking | Not integrated | — |
| LLM | `ernie-4.5-turbo-128k` | ERNIE 4.5 Turbo 128K | Not integrated | — |
| LLM | `ernie-4.5-turbo-vl` | ERNIE 4.5 Turbo VL | Not integrated | — |
| LLM | `ernie-4.5-vl-28b-a3b` | ERNIE 4.5 VL 28B A3B | Not integrated | — |
| LLM | `ernie-5.0` | ERNIE 5.0 | Not integrated | — |
| LLM | `ernie-5.0-thinking-preview` | ERNIE 5.0 Thinking Preview | Not integrated | — |
| LLM | `ernie-x1-turbo-32k` | ERNIE X1 Turbo 32K | Not integrated | — |
| LLM | `ernie-x1.1` | ERNIE X1.1 | Not integrated | — |
| LLM | `ernie-x1.1-preview` | ERNIE X1.1 Preview | Not integrated | — |
| STT | `音频文件转写` | Audio File Transcription | Not integrated | — |
| STT | `实时语音识别-websocket API` | Realtime Speech Recognition WebSocket API | Not integrated | — |
| STT | `短语音识别` | Short Speech Recognition | Not integrated | — |
| STT | `短语音识别极速版` | Short Speech Recognition Pro / 极速版 | Not integrated | — |
| TTS | `长文本合成` | Long Text Speech Synthesis | Not integrated | — |
| TTS | `短文本语音合成` | Short Text Speech Synthesis | Not integrated | — |
| TTS | `流式文本在线合成` | Streaming Text-to-Speech | Not integrated | — |

## ByteDance (Doubao/Seed) `bytedance-doubao-seed`

- Runtime provider: `bytedance-doubao-seed`
- Model integration: 4/7 integrated
- Verified support: LLM `native`, STT `native`, TTS `native`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `doubao-seed-1-8-251228` | Doubao Seed 1.8 | Integrated | `doubao-seed-1-8-251228` |
| LLM | `doubao-seed-2-0-code-preview-260215` | Doubao Seed 2.0 Code Preview | Not integrated | — |
| LLM | `doubao-seed-2-0-lite-260215` | Doubao Seed 2.0 Lite | Integrated | `doubao-seed-2-0-lite-260215` |
| LLM | `doubao-seed-2-0-mini-260215` | Doubao Seed 2.0 Mini | Integrated | `doubao-seed-2-0-mini-260215` |
| LLM | `doubao-seed-2-0-pro-260215` | Doubao Seed 2.0 Pro | Integrated | `doubao-seed-2-0-pro-260215` |
| STT | `bigmodel` | Doubao Big-Model Streaming ASR | Not integrated | — |
| TTS | `unknown` | Doubao Large-Model TTS | Not integrated | — |

## Cerebras `cerebras`

- Runtime provider: `cerebras`
- Model integration: 2/4 integrated
- Verified support: LLM `native`, STT `unsupported`, TTS `unsupported`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `llama3.1-8b` | Llama 3.1 8B | Integrated | `llama3.1-8b` |
| LLM | `gpt-oss-120b` | OpenAI GPT OSS | Integrated | `gpt-oss-120b` |
| LLM | `qwen-3-235b-a22b-instruct-2507` | Qwen 3 235B Instruct | Not integrated | — |
| LLM | `zai-glm-4.7` | Z.ai GLM 4.7 | Not integrated | — |

## Cohere `cohere`

- Runtime provider: `cohere`
- Model integration: 6/9 integrated
- Verified support: LLM `native`, STT `unsupported`, TTS `unsupported`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `c4ai-aya-expanse-32b` | Aya Expanse 32B | Not integrated | — |
| LLM | `c4ai-aya-vision-32b` | Aya Vision 32B | Not integrated | — |
| LLM | `command-a-03-2025` | Command A | Integrated | `command-a-03-2025` |
| LLM | `command-a-reasoning-08-2025` | Command A Reasoning | Integrated | `command-a-reasoning-08-2025` |
| LLM | `command-a-translate-08-2025` | Command A Translate | Not integrated | — |
| LLM | `command-a-vision-07-2025` | Command A Vision | Integrated | `command-a-vision-07-2025` |
| LLM | `command-r-08-2024` | Command R | Integrated | `command-r-08-2024` |
| LLM | `command-r-plus-08-2024` | Command R+ | Integrated | `command-r-plus-08-2024` |
| LLM | `command-r7b-12-2024` | Command R7B | Integrated | `command-r7b-12-2024` |

## Deepgram `deepgram`

- Runtime provider: catalog-only
- Model integration: 0/11 integrated
- Verified support: LLM `routed`, STT `native`, TTS `native`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| STT | `whisper` | Deepgram Whisper Cloud | Not integrated | — |
| STT | `flux-general-en` | Flux General English | Not integrated | — |
| STT | `legacy-base-family` | Legacy Base Family | Not integrated | — |
| STT | `legacy-enhanced-family` | Legacy Enhanced Family | Not integrated | — |
| STT | `legacy-nova-family` | Legacy Nova Family | Not integrated | — |
| STT | `nova-2` | Nova-2 General | Not integrated | — |
| STT | `nova-2-verticals` | Nova-2 Vertical Variants | Not integrated | — |
| STT | `nova-3` | Nova-3 General | Not integrated | — |
| STT | `nova-3-medical` | Nova-3 Medical | Not integrated | — |
| TTS | `aura-1` | Aura-1 Voice Family | Not integrated | — |
| TTS | `aura-2` | Aura-2 Voice Family | Not integrated | — |

## DeepInfra `deepinfra`

- Runtime provider: `deepinfra`
- Model integration: 4/9 integrated
- Verified support: LLM `routed`, STT `routed`, TTS `routed`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `deepseek-ai/DeepSeek-V3.2` | DeepSeek-V3.2 | Integrated | `deepseek-ai/DeepSeek-V3.2` |
| LLM | `zai-org/GLM-4.7-Flash` | GLM-4.7-Flash | Integrated | `zai-org/GLM-4.7-Flash` |
| LLM | `nvidia/Nemotron-3-Nano-30B-A3B` | Nemotron-3-Nano-30B-A3B | Integrated | `nvidia/Nemotron-3-Nano-30B-A3B` |
| LLM | `Qwen/Qwen3-Max` | Qwen3-Max | Integrated | `Qwen/Qwen3-Max` |
| STT | `mistralai/Voxtral-Small-24B-2507` | Voxtral-Small-24B-2507 | Not integrated | — |
| STT | `openai/whisper-large-v3-turbo` | whisper-large-v3-turbo | Not integrated | — |
| TTS | `ResembleAI/chatterbox-turbo` | chatterbox-turbo | Not integrated | — |
| TTS | `Qwen/Qwen3-TTS` | Qwen3-TTS | Not integrated | — |
| TTS | `Qwen/Qwen3-TTS-VoiceDesign` | Qwen3-TTS-VoiceDesign | Not integrated | — |

## Deepseek `deepseek`

- Runtime provider: `deepseek`
- Model integration: 2/3 integrated
- Verified support: LLM `native`, STT `unsupported`, TTS `unsupported`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `deepseek-chat` | DeepSeek Chat | Integrated | `deepseek-chat` |
| LLM | `deepseek-coder` | DeepSeek Coder (legacy alias) | Not integrated | — |
| LLM | `deepseek-reasoner` | DeepSeek Reasoner | Integrated | `deepseek-reasoner` |

## Elevenlabs `elevenlabs`

- Runtime provider: catalog-only
- Model integration: 0/10 integrated
- Verified support: LLM `partial`, STT `native`, TTS `native`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| STT | `scribe_v1` | Scribe v1 | Not integrated | — |
| STT | `scribe_v2` | Scribe v2 | Not integrated | — |
| STT | `scribe_v2_realtime` | Scribe v2 Realtime | Not integrated | — |
| TTS | `eleven_flash_v2_5` | Eleven Flash v2.5 | Not integrated | — |
| TTS | `eleven_monolingual_v1` | Eleven Monolingual v1 | Not integrated | — |
| TTS | `eleven_multilingual_v1` | Eleven Multilingual v1 | Not integrated | — |
| TTS | `eleven_multilingual_v2` | Eleven Multilingual v2 | Not integrated | — |
| TTS | `eleven_turbo_v2` | Eleven Turbo v2 | Not integrated | — |
| TTS | `eleven_turbo_v2_5` | Eleven Turbo v2.5 | Not integrated | — |
| TTS | `eleven_v3` | Eleven v3 | Not integrated | — |

## Fireworks AI `fireworks-ai`

- Runtime provider: `fireworks-ai`
- Model integration: 5/10 integrated
- Verified support: LLM `native`, STT `native`, TTS `unsupported`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `accounts/fireworks/models/deepseek-v3p2` | Deepseek v3.2 | Integrated | `accounts/fireworks/models/deepseek-v3p2` |
| LLM | `accounts/fireworks/models/glm-5` | GLM-5 | Integrated | `accounts/fireworks/models/glm-5` |
| LLM | `accounts/fireworks/models/kimi-k2-thinking` | Kimi K2 Thinking | Not integrated | — |
| LLM | `accounts/fireworks/models/kimi-k2p5` | Kimi K2.5 | Integrated | `accounts/fireworks/models/kimi-k2p5` |
| LLM | `accounts/fireworks/models/gpt-oss-120b` | OpenAI gpt-oss-120b | Integrated | `accounts/fireworks/models/gpt-oss-120b` |
| LLM | `accounts/fireworks/models/gpt-oss-20b` | OpenAI gpt-oss-20b | Integrated | `accounts/fireworks/models/gpt-oss-20b` |
| STT | `fireworks-asr-large` | Streaming ASR v1 | Not integrated | — |
| STT | `fireworks-asr-v2` | Streaming ASR v2 | Not integrated | — |
| STT | `whisper-v3` | Whisper V3 Large | Not integrated | — |
| STT | `whisper-v3-turbo` | Whisper V3 Turbo | Not integrated | — |

## Fisch Audio `fish-audio`

- Runtime provider: catalog-only
- Model integration: 0/4 integrated
- Verified support: LLM `unsupported`, STT `native`, TTS `native`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| TTS | `s1` | Fish Audio S1 | Not integrated | — |
| TTS | `s2-pro` | Fish Audio S2-Pro | Not integrated | — |
| TTS | `speech-1.5` | Fish Speech v1.5 | Not integrated | — |
| TTS | `speech-1.6` | Fish Speech v1.6 | Not integrated | — |

## Google Vertex AI Studio `google-vertex-ai-studio`

- Runtime provider: `gemini`
- Model integration: 3/10 integrated
- Verified support: LLM `native`, STT `partial`, TTS `native`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `gemini-2.5-flash` | Gemini 2.5 Flash | Integrated | `gemini-2.5-flash` |
| LLM | `gemini-2.5-flash-lite` | Gemini 2.5 Flash-Lite | Integrated | `gemini-2.5-flash-lite` |
| LLM | `gemini-2.5-pro` | Gemini 2.5 Pro | Integrated | `gemini-2.5-pro` |
| LLM | `gemini-live-2.5-flash-native-audio` | Gemini Live 2.5 Flash Native Audio | Not integrated | — |
| STT | `chirp_2` | Chirp 2: Transcription | Not integrated | — |
| STT | `chirp_3` | Chirp 3: Transcription | Not integrated | — |
| STT | `telephony` | Telephony | Not integrated | — |
| TTS | `gemini-2.5-flash-tts` | Gemini 2.5 Flash TTS | Not integrated | — |
| TTS | `gemini-2.5-flash-lite-preview-tts` | Gemini 2.5 Flash-Lite Preview TTS | Not integrated | — |
| TTS | `gemini-2.5-pro-tts` | Gemini 2.5 Pro TTS | Not integrated | — |

## Groq `groq`

- Runtime provider: `groq`
- Model integration: 9/14 integrated
- Verified support: LLM `native`, STT `native`, TTS `native`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `openai/gpt-oss-120b` | GPT OSS 120B | Integrated | `openai/gpt-oss-120b` |
| LLM | `openai/gpt-oss-20b` | GPT OSS 20B | Integrated | `openai/gpt-oss-20b` |
| LLM | `moonshotai/kimi-k2-instruct-0905` | Kimi K2 0905 | Integrated | `moonshotai/kimi-k2-instruct-0905` |
| LLM | `llama-3.1-8b-instant` | Llama 3.1 8B | Integrated | `llama-3.1-8b-instant` |
| LLM | `llama-3.3-70b-versatile` | Llama 3.3 70B | Integrated | `llama-3.3-70b-versatile` |
| LLM | `meta-llama/llama-4-scout-17b-16e-instruct` | Llama 4 Scout 17B 16E | Integrated | `meta-llama/llama-4-scout-17b-16e-instruct` |
| LLM | `meta-llama/llama-prompt-guard-2-22m` | Llama Prompt Guard 2 22M | Not integrated | — |
| LLM | `meta-llama/llama-prompt-guard-2-86m` | Prompt Guard 2 86M | Not integrated | — |
| LLM | `qwen/qwen3-32b` | Qwen3-32B | Integrated | `qwen/qwen3-32b` |
| LLM | `openai/gpt-oss-safeguard-20b` | Safety GPT OSS 20B | Not integrated | — |
| STT | `whisper-large-v3` | Whisper Large V3 | Integrated | `whisper-large-v3` |
| STT | `whisper-large-v3-turbo` | Whisper Large V3 Turbo | Integrated | `whisper-large-v3-turbo` |
| TTS | `canopylabs/orpheus-arabic-saudi` | Canopy Labs Orpheus Arabic Saudi | Not integrated | — |
| TTS | `canopylabs/orpheus-v1-english` | Canopy Labs Orpheus V1 English | Not integrated | — |

## Hugging Face Inference API `hugging-face-inference-api`

- Runtime provider: `hugging-face-inference-api`
- Model integration: 4/6 integrated
- Verified support: LLM `routed`, STT `routed`, TTS `unsupported`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `katanemo/Arch-Router-1.5B` | Arch-Router-1.5B | Integrated | `katanemo/Arch-Router-1.5B` |
| LLM | `openai/gpt-oss-120b` | gpt-oss-120b | Integrated | `openai/gpt-oss-120b` |
| LLM | `openai/gpt-oss-20b` | gpt-oss-20b | Integrated | `openai/gpt-oss-20b` |
| LLM | `meta-llama/Llama-3.3-70B-Instruct` | Llama-3.3-70B-Instruct | Integrated | `meta-llama/Llama-3.3-70B-Instruct` |
| STT | `openai/whisper-large-v3` | Whisper large-v3 | Not integrated | — |
| STT | `openai/whisper-large-v3-turbo` | Whisper large-v3-turbo | Not integrated | — |

## Hyperbolic `hyperbolic`

- Runtime provider: `hyperbolic`
- Model integration: 4/20 integrated
- Verified support: LLM `native`, STT `unsupported`, TTS `native`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `deepseek-ai/DeepSeek-R1` | DeepSeek-R1 | Not integrated | — |
| LLM | `DeepSeek-R1-0528` | DeepSeek-R1-0528 | Integrated | `DeepSeek-R1-0528` |
| LLM | `DeepSeek-V3` | DeepSeek-V3 | Not integrated | — |
| LLM | `DeepSeek-V3-0324` | DeepSeek-V3-0324 | Not integrated | — |
| LLM | `gpt-oss-120b` | gpt-oss-120b | Integrated | `gpt-oss-120b` |
| LLM | `openai/gpt-oss-20b` | gpt-oss-20b | Integrated | `openai/gpt-oss-20b` |
| LLM | `Llama 3.1 405B BASE` | Llama 3.1 405B BASE | Not integrated | — |
| LLM | `meta-llama/Meta-Llama-3.1-70B-Instruct` | Llama 3.1 70B Instruct | Not integrated | — |
| LLM | `meta-llama/Meta-Llama-3.1-8B` | Llama 3.1 8B | Not integrated | — |
| LLM | `Llama-3.3-70B-Instruct` | Llama-3.3-70B-Instruct | Integrated | `Llama-3.3-70B-Instruct` |
| LLM | `nvidia/NVIDIA-Nemotron-Nano-12B-v2-VL-BF16` | NVIDIA-Nemotron-Nano-12B-v2-VL-BF16 | Not integrated | — |
| LLM | `mistralai/Pixtral-12B-2409` | Pixtral-12B | Not integrated | — |
| LLM | `Qwen/Qwen3-VL-32B-Thinking` | Qwen/Qwen3-VL-32B-Thinking | Not integrated | — |
| LLM | `Qwen/Qwen2.5-VL-72B-Instruct` | Qwen2.5-VL-72B-Instruct | Not integrated | — |
| LLM | `Qwen/Qwen2.5-VL-7B-Instruct` | Qwen2.5-VL-7B-Instruct | Not integrated | — |
| LLM | `Qwen3-8B` | Qwen3-8B | Not integrated | — |
| LLM | `Qwen3-Coder-480B-A35B-Instruct` | Qwen3-Coder-480B-A35B-Instruct | Not integrated | — |
| LLM | `Qwen3-Next-80B-A3B-Instruct` | Qwen3-Next-80B-A3B-Instruct | Not integrated | — |
| LLM | `Qwen3-Next-80B-A3B-Thinking` | Qwen3-Next-80B-A3B-Thinking | Not integrated | — |
| TTS | `Melo TTS` | Melo TTS | Not integrated | — |

## IBM Watsonx `ibm-watsonx`

- Runtime provider: catalog-only
- Model integration: 0/16 integrated
- Verified support: LLM `native`, STT `native`, TTS `native`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `openai/gpt-oss-120b` | gpt-oss-120b | Not integrated | — |
| LLM | `ibm/granite-3-8b-instruct` | granite-3-8b-instruct | Not integrated | — |
| LLM | `ibm/granite-4-h-small` | granite-4-h-small | Not integrated | — |
| LLM | `meta-llama/llama-3-3-70b-instruct` | llama-3-3-70b-instruct | Not integrated | — |
| LLM | `meta-llama/llama-4-maverick-17b-128e-instruct-fp8` | llama-4-maverick-17b-128e-instruct-fp8 | Not integrated | — |
| LLM | `mistralai/mistral-medium-2505` | mistral-medium-2505 | Not integrated | — |
| STT | `en-US` | English (US) Large Speech Model | Not integrated | — |
| STT | `en-US_Multimedia` | English (US) Next-generation Multimedia | Not integrated | — |
| STT | `fr-FR` | French (France) Large Speech Model | Not integrated | — |
| STT | `de-DE` | German Large Speech Model | Not integrated | — |
| STT | `es-MX` | Spanish (Mexico) Large Speech Model | Not integrated | — |
| TTS | `pt-BR_CamilaNatural` | Brazilian Portuguese Camila Natural | Not integrated | — |
| TTS | `es-LA_DanielaExpressive` | Latin American Spanish Daniela Expressive | Not integrated | — |
| TTS | `en-US_AllisonV3Voice` | US English Allison V3 | Not integrated | — |
| TTS | `en-US_LisaExpressive` | US English Lisa Expressive | Not integrated | — |
| TTS | `en-US_VictoriaNatural` | US English Victoria Natural | Not integrated | — |

## Lepton AI `lepton-ai`

- Runtime provider: catalog-only
- Model integration: 0/3 integrated
- Verified support: LLM `native`, STT `partial`, TTS `partial`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `nim/openai/gpt-oss-120b:latest` | GPT-OSS-120B NIM image on DGX Cloud Lepton | Not integrated | — |
| LLM | `meta-llama/Llama-3.1-8B-Instruct` | Meta Llama 3.1 8B Instruct (deployment example via Hugging Face) | Not integrated | — |
| TTS | `nari-labs/Dia-1.6B-0626` | Dia 1.6B (upstream TTS model used in Lepton deployment example) | Not integrated | — |

## Microsoft Azure `microsoft-azure`

- Runtime provider: catalog-only
- Model integration: 0/15 integrated
- Verified support: LLM `native`, STT `native`, TTS `native`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `gpt-4.1` | GPT-4.1 | Not integrated | — |
| LLM | `gpt-4.1-mini` | GPT-4.1 mini | Not integrated | — |
| LLM | `gpt-4.1-nano` | GPT-4.1 nano | Not integrated | — |
| LLM | `gpt-4o` | GPT-4o | Not integrated | — |
| LLM | `gpt-4o-mini` | GPT-4o mini | Not integrated | — |
| LLM | `gpt-realtime` | GPT-Realtime | Not integrated | — |
| LLM | `gpt-realtime-1.5` | GPT-Realtime 1.5 | Not integrated | — |
| LLM | `gpt-realtime-mini` | GPT-Realtime mini | Not integrated | — |
| STT | `gpt-4o-mini-transcribe` | GPT-4o mini Transcribe | Not integrated | — |
| STT | `gpt-4o-transcribe` | GPT-4o Transcribe | Not integrated | — |
| STT | `gpt-4o-transcribe-diarize` | GPT-4o Transcribe Diarize | Not integrated | — |
| STT | `whisper` | Whisper | Not integrated | — |
| TTS | `gpt-4o-mini-tts` | GPT-4o mini TTS | Not integrated | — |
| TTS | `tts` | TTS | Not integrated | — |
| TTS | `tts-hd` | TTS HD | Not integrated | — |

## Minimax `minimax`

- Runtime provider: `minimax`
- Model integration: 8/16 integrated
- Verified support: LLM `native`, STT `unsupported`, TTS `native`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `MiniMax-M2` | MiniMax M2 | Integrated | `MiniMax-M2` |
| LLM | `M2-her` | MiniMax M2-her | Integrated | `M2-her` |
| LLM | `MiniMax-M2.1` | MiniMax M2.1 | Integrated | `MiniMax-M2.1` |
| LLM | `MiniMax-M2.1-highspeed` | MiniMax M2.1 Highspeed | Integrated | `MiniMax-M2.1-highspeed` |
| LLM | `MiniMax-M2.5` | MiniMax M2.5 | Integrated | `MiniMax-M2.5` |
| LLM | `MiniMax-M2.5-highspeed` | MiniMax M2.5 Highspeed | Integrated | `MiniMax-M2.5-highspeed` |
| LLM | `MiniMax-M2.7` | MiniMax M2.7 | Integrated | `MiniMax-M2.7` |
| LLM | `MiniMax-M2.7-highspeed` | MiniMax M2.7 Highspeed | Integrated | `MiniMax-M2.7-highspeed` |
| TTS | `speech-01-hd` | MiniMax Speech 01 HD | Not integrated | — |
| TTS | `speech-01-turbo` | MiniMax Speech 01 Turbo | Not integrated | — |
| TTS | `speech-02-hd` | MiniMax Speech 02 HD | Not integrated | — |
| TTS | `speech-02-turbo` | MiniMax Speech 02 Turbo | Not integrated | — |
| TTS | `speech-2.6-hd` | MiniMax Speech 2.6 HD | Not integrated | — |
| TTS | `speech-2.6-turbo` | MiniMax Speech 2.6 Turbo | Not integrated | — |
| TTS | `speech-2.8-hd` | MiniMax Speech 2.8 HD | Not integrated | — |
| TTS | `speech-2.8-turbo` | MiniMax Speech 2.8 Turbo | Not integrated | — |

## Mistral AI `mistral-ai`

- Runtime provider: `mistral`
- Model integration: 8/19 integrated
- Verified support: LLM `native`, STT `native`, TTS `unsupported`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `codestral-2508` | Codestral | Integrated | `codestral-latest` |
| LLM | `devstral-2512` | Devstral 2 | Not integrated | — |
| LLM | `devstral-medium-2507` | Devstral Medium 1.0 | Not integrated | — |
| LLM | `labs-devstral-small-2512` | Devstral Small 2 | Not integrated | — |
| LLM | `labs-leanstral-2603` | Leanstral | Not integrated | — |
| LLM | `magistral-medium-2509` | Magistral Medium 1.2 | Integrated | `magistral-medium-latest` |
| LLM | `magistral-small-2509` | Magistral Small 1.2 | Integrated | `magistral-small-latest` |
| LLM | `ministral-14b-2512` | Ministral 3 14B | Not integrated | — |
| LLM | `ministral-3b-2512` | Ministral 3 3B | Not integrated | — |
| LLM | `ministral-8b-2512` | Ministral 3 8B | Integrated | `ministral-8b-latest` |
| LLM | `mistral-large-2512` | Mistral Large 3 | Integrated | `mistral-large-latest` |
| LLM | `mistral-medium-2508` | Mistral Medium 3.1 | Integrated | `mistral-medium-latest` |
| LLM | `mistral-small-2506` | Mistral Small 3.2 | Integrated | `mistral-small-latest` |
| LLM | `mistral-small-2603` | Mistral Small 4 | Not integrated | — |
| LLM | `labs-mistral-small-creative` | Mistral Small Creative | Not integrated | — |
| LLM | `voxtral-mini-2507` | Voxtral Mini | Not integrated | — |
| LLM | `voxtral-small-2507` | Voxtral Small | Not integrated | — |
| STT | `voxtral-mini-2602` | Voxtral Mini Transcribe 2 | Integrated | `voxtral-mini-latest` |
| STT | `voxtral-mini-transcribe-realtime-2602` | Voxtral Mini Transcribe Realtime | Not integrated | — |

## Moonshot AI (Kimi) `moonshot-ai-kimi`

- Runtime provider: `moonshot-ai-kimi`
- Model integration: 6/15 integrated
- Verified support: LLM `native`, STT `unsupported`, TTS `unsupported`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `kimi-k2-0711-preview` | Kimi K2 0711 Preview | Not integrated | — |
| LLM | `kimi-k2-0905-preview` | Kimi K2 0905 Preview | Not integrated | — |
| LLM | `kimi-k2-thinking` | Kimi K2 Thinking | Integrated | `kimi-k2-thinking` |
| LLM | `kimi-k2-thinking-turbo` | Kimi K2 Thinking Turbo | Integrated | `kimi-k2-thinking-turbo` |
| LLM | `kimi-k2-turbo-preview` | Kimi K2 Turbo Preview | Not integrated | — |
| LLM | `kimi-k2.5` | Kimi K2.5 | Integrated | `kimi-k2.5` |
| LLM | `kimi-latest` | kimi-latest | Not integrated | — |
| LLM | `kimi-thinking-preview` | kimi-thinking-preview | Not integrated | — |
| LLM | `moonshot-v1-128k` | Moonshot v1 128k | Integrated | `moonshot-v1-128k` |
| LLM | `moonshot-v1-128k-vision-preview` | Moonshot v1 128k Vision Preview | Not integrated | — |
| LLM | `moonshot-v1-32k` | Moonshot v1 32k | Integrated | `moonshot-v1-32k` |
| LLM | `moonshot-v1-32k-vision-preview` | Moonshot v1 32k Vision Preview | Not integrated | — |
| LLM | `moonshot-v1-8k` | Moonshot v1 8k | Integrated | `moonshot-v1-8k` |
| LLM | `moonshot-v1-8k-vision-preview` | Moonshot v1 8k Vision Preview | Not integrated | — |
| LLM | `moonshot-v1-auto` | Moonshot v1 Auto | Not integrated | — |

## Novita AI `novita-ai`

- Runtime provider: `novita-ai`
- Model integration: 4/13 integrated
- Verified support: LLM `routed`, STT `routed`, TTS `routed`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `deepseek/deepseek-v3.2` | Deepseek V3.2 | Integrated | `deepseek/deepseek-v3.2` |
| LLM | `zai-org/glm-4.6v` | GLM 4.6V | Integrated | `zai-org/glm-4.6v` |
| LLM | `qwen/qwen3-235b-a22b-fp8` | Qwen3 235B A22B | Integrated | `qwen/qwen3-235b-a22b-fp8` |
| LLM | `qwen/qwen3-coder-30b-a3b-instruct` | Qwen3 Coder 30B A3B Instruct | Integrated | `qwen/qwen3-coder-30b-a3b-instruct` |
| STT | `glm-asr` | GLM Audio to Text | Not integrated | — |
| TTS | `glm-tts` | GLM Text to Speech | Not integrated | — |
| TTS | `txt2speech` | Legacy Text to Speech | Not integrated | — |
| TTS | `minimax-voice-cloning` | MiniMax Quick Voice Cloning | Not integrated | — |
| TTS | `minimax-speech-2.8-hd` | MiniMax Speech 2.8 HD | Not integrated | — |
| TTS | `minimax-speech-02-hd` | MiniMax Speech-02 HD | Not integrated | — |
| TTS | `minimax-speech-02-turbo` | MiniMax Speech-02 Turbo | Not integrated | — |
| TTS | `minimax-speech-2.6-hd` | MiniMax Speech-2.6 HD | Not integrated | — |
| TTS | `minimax-speech-2.6-turbo` | MiniMax Speech-2.6 Turbo | Not integrated | — |

## NVIDIA (NIM) `nvidia-nim`

- Runtime provider: `nvidia`
- Model integration: 0/10 integrated
- Verified support: LLM `native`, STT `native`, TTS `native`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `llama-3.1-nemotron-70b-instruct` | Llama 3.1 Nemotron 70B Instruct | Not integrated | — |
| LLM | `llama-3.3-nemotron-super-49b-v1` | Llama 3.3 Nemotron Super 49B v1 | Not integrated | — |
| LLM | `nemotron-3-nano-30b-a3b` | NVIDIA Nemotron 3 Nano 30B A3B | Not integrated | — |
| LLM | `nemotron-3-super-120b-a12b` | NVIDIA Nemotron 3 Super 120B A12B | Not integrated | — |
| LLM | `nvidia-nemotron-nano-9b-v2` | NVIDIA Nemotron Nano 9B v2 | Not integrated | — |
| STT | `canary-1b-asr` | Canary 1B ASR | Not integrated | — |
| STT | `parakeet-ctc-1_1b-asr` | Parakeet CTC 1.1B ASR | Not integrated | — |
| TTS | `magpie-tts-flow` | Magpie TTS Flow | Not integrated | — |
| TTS | `magpie-tts-multilingual` | Magpie TTS Multilingual | Not integrated | — |
| TTS | `magpie-tts-zeroshot` | Magpie TTS Zeroshot | Not integrated | — |

## OpenAI `openai`

- Runtime provider: `openai`
- Model integration: 13/18 integrated
- Verified support: LLM `native`, STT `native`, TTS `native`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `gpt-4.1` | GPT-4.1 | Integrated | `gpt-4.1` |
| LLM | `gpt-4.1-mini` | GPT-4.1 mini | Integrated | `gpt-4.1-mini` |
| LLM | `gpt-4.1-nano` | GPT-4.1 nano | Integrated | `gpt-4.1-nano` |
| LLM | `gpt-5.4` | GPT-5.4 | Integrated | `gpt-5.4` |
| LLM | `gpt-5.4-mini` | GPT-5.4 mini | Integrated | `gpt-5.4-mini` |
| LLM | `gpt-5.4-nano` | GPT-5.4 nano | Integrated | `gpt-5.4-nano` |
| LLM | `gpt-5.4-pro` | GPT-5.4 pro | Integrated | `gpt-5.4-pro` |
| LLM | `gpt-audio-1.5` | GPT-Audio-1.5 | Not integrated | — |
| LLM | `gpt-audio-mini` | GPT-Audio-mini | Not integrated | — |
| LLM | `gpt-realtime-1.5` | GPT-Realtime-1.5 | Not integrated | — |
| LLM | `gpt-realtime-mini` | GPT-Realtime-mini | Not integrated | — |
| STT | `gpt-4o-mini-transcribe` | GPT-4o mini Transcribe | Integrated | `gpt-4o-mini-transcribe` |
| STT | `gpt-4o-transcribe` | GPT-4o Transcribe | Integrated | `gpt-4o-transcribe` |
| STT | `gpt-4o-transcribe-diarize` | GPT-4o Transcribe Diarize | Not integrated | — |
| STT | `whisper-1` | Whisper | Integrated | `whisper-1` |
| TTS | `gpt-4o-mini-tts` | GPT-4o mini TTS | Integrated | `gpt-4o-mini-tts` |
| TTS | `tts-1` | TTS-1 | Integrated | `tts-1` |
| TTS | `tts-1-hd` | TTS-1 HD | Integrated | `tts-1-hd` |

## Perplexity `perplexity`

- Runtime provider: `perplexity`
- Model integration: 3/5 integrated
- Verified support: LLM `native`, STT `unsupported`, TTS `unsupported`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `perplexity/sonar` | Perplexity Sonar (Agent API) | Not integrated | — |
| LLM | `sonar` | Sonar | Integrated | `sonar` |
| LLM | `sonar-deep-research` | Sonar Deep Research | Not integrated | — |
| LLM | `sonar-pro` | Sonar Pro | Integrated | `sonar-pro` |
| LLM | `sonar-reasoning-pro` | Sonar Reasoning Pro | Integrated | `sonar-reasoning-pro` |

## Replicate `replicate`

- Runtime provider: catalog-only
- Model integration: 0/12 integrated
- Verified support: LLM `routed`, STT `routed`, TTS `routed`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `anthropic/claude-4.5-haiku` | Claude Haiku 4.5 | Not integrated | — |
| LLM | `anthropic/claude-4.5-sonnet` | Claude Sonnet 4.5 | Not integrated | — |
| LLM | `google/gemini-2.5-flash` | Gemini 2.5 Flash | Not integrated | — |
| LLM | `openai/gpt-4o-mini` | GPT-4o mini | Not integrated | — |
| LLM | `openai/gpt-5-mini` | GPT-5 mini | Not integrated | — |
| LLM | `openai/gpt-5-nano` | GPT-5 nano | Not integrated | — |
| STT | `openai/gpt-4o-mini-transcribe` | GPT-4o mini Transcribe | Not integrated | — |
| STT | `openai/gpt-4o-transcribe` | GPT-4o Transcribe | Not integrated | — |
| TTS | `inworld/tts-1.5-max` | Inworld TTS 1.5 Max | Not integrated | — |
| TTS | `inworld/tts-1.5-mini` | Inworld TTS 1.5 Mini | Not integrated | — |
| TTS | `minimax/speech-2.8-hd` | MiniMax Speech 2.8 HD | Not integrated | — |
| TTS | `minimax/speech-2.8-turbo` | MiniMax Speech 2.8 Turbo | Not integrated | — |

## Sambanova `sambanova`

- Runtime provider: `sambanova`
- Model integration: 6/17 integrated
- Verified support: LLM `native`, STT `native`, TTS `unsupported`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `ALLaM-7B-Instruct-preview` | ALLaM 7B Instruct Preview | Not integrated | — |
| LLM | `DeepSeek-R1-0528` | DeepSeek R1 0528 | Integrated | `DeepSeek-R1-0528` |
| LLM | `DeepSeek-R1-Distill-Llama-70B` | DeepSeek R1 Distill Llama 70B | Not integrated | — |
| LLM | `DeepSeek-V3-0324` | DeepSeek V3 0324 | Integrated | `DeepSeek-V3-0324` |
| LLM | `DeepSeek-V3.1` | DeepSeek V3.1 | Integrated | `DeepSeek-V3.1` |
| LLM | `DeepSeek-V3.1-cb` | DeepSeek V3.1 cb | Not integrated | — |
| LLM | `DeepSeek-V3.1-Terminus` | DeepSeek V3.1 Terminus | Not integrated | — |
| LLM | `DeepSeek-V3.2` | DeepSeek V3.2 | Not integrated | — |
| LLM | `gpt-oss-120b` | GPT-OSS 120B | Not integrated | — |
| LLM | `Llama-3.3-Swallow-70B-Instruct-v0.4` | Llama 3.3 Swallow 70B Instruct v0.4 | Not integrated | — |
| LLM | `Llama-4-Maverick-17B-128E-Instruct` | Llama 4 Maverick 17B 128E Instruct | Not integrated | — |
| LLM | `Meta-Llama-3.1-8B-Instruct` | Meta Llama 3.1 8B Instruct | Integrated | `Meta-Llama-3.1-8B-Instruct` |
| LLM | `Meta-Llama-3.3-70B-Instruct` | Meta Llama 3.3 70B Instruct | Integrated | `Meta-Llama-3.3-70B-Instruct` |
| LLM | `MiniMax-M2.5` | MiniMax M2.5 | Integrated | `MiniMax-M2.5` |
| LLM | `Qwen3-235B-A22B-Instruct-2507` | Qwen3 235B A22B Instruct 2507 | Not integrated | — |
| LLM | `Qwen3-32B` | Qwen3 32B | Not integrated | — |
| STT | `Whisper-Large-v3` | Whisper Large v3 | Not integrated | — |

## Siliconflow `siliconflow`

- Runtime provider: `siliconflow`
- Model integration: 4/10 integrated
- Verified support: LLM `native`, STT `native`, TTS `native`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `deepseek-ai/DeepSeek-R1` | DeepSeek-R1 | Integrated | `deepseek-ai/DeepSeek-R1` |
| LLM | `deepseek-ai/DeepSeek-V3.2` | DeepSeek-V3.2 | Integrated | `deepseek-ai/DeepSeek-V3.2` |
| LLM | `moonshotai/Kimi-K2.5` | Kimi-K2.5 | Integrated | `moonshotai/Kimi-K2.5` |
| LLM | `Qwen/Qwen3-32B` | Qwen3-32B | Integrated | `Qwen/Qwen3-32B` |
| LLM | `Qwen/Qwen3-Omni-30B-A3B-Instruct` | Qwen3-Omni-30B-A3B-Instruct | Not integrated | — |
| STT | `FunAudioLLM/SenseVoiceSmall` | SenseVoiceSmall | Not integrated | — |
| STT | `TeleAI/TeleSpeechASR` | TeleSpeechASR | Not integrated | — |
| TTS | `FunAudioLLM/CosyVoice2-0.5B` | CosyVoice2-0.5B | Not integrated | — |
| TTS | `fishaudio/fish-speech-1.5` | Fish-Speech-1.5 | Not integrated | — |
| TTS | `IndexTeam/IndexTTS-2` | IndexTTS-2 | Not integrated | — |

## Stepfun `stepfun`

- Runtime provider: `stepfun`
- Model integration: 3/13 integrated
- Verified support: LLM `native`, STT `native`, TTS `native`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `step-1o-audio` | Step 1o Audio | Not integrated | — |
| LLM | `step-2-mini` | Step 2 Mini | Integrated | `step-2-mini` |
| LLM | `step-3` | Step 3 | Integrated | `step-3` |
| LLM | `step-3.5-flash` | Step 3.5 Flash | Integrated | `step-3.5-flash` |
| LLM | `step-audio-2` | Step Audio 2 | Not integrated | — |
| LLM | `step-audio-2-mini` | Step Audio 2 Mini | Not integrated | — |
| LLM | `step-audio-r1.1` | Step Audio R1.1 | Not integrated | — |
| STT | `step-asr` | Step ASR | Not integrated | — |
| STT | `step-asr-1.1` | Step ASR 1.1 | Not integrated | — |
| STT | `step-asr-1.1-stream` | Step ASR 1.1 Stream | Not integrated | — |
| TTS | `step-tts-2` | Step TTS 2 | Not integrated | — |
| TTS | `step-tts-mini` | Step TTS Mini | Not integrated | — |
| TTS | `step-tts-vivid` | Step TTS Vivid | Not integrated | — |

## Together AI `together-ai`

- Runtime provider: `together`
- Model integration: 7/20 integrated
- Verified support: LLM `native`, STT `native`, TTS `native`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `zai-org/GLM-5` | GLM-5 | Not integrated | — |
| LLM | `openai/gpt-oss-120b` | GPT-OSS 120B | Integrated | `openai/gpt-oss-120b` |
| LLM | `openai/gpt-oss-20b` | GPT-OSS 20B | Integrated | `openai/gpt-oss-20b` |
| LLM | `moonshotai/Kimi-K2.5` | Kimi K2.5 | Integrated | `moonshotai/Kimi-K2.5` |
| LLM | `MiniMaxAI/MiniMax-M2.5` | MiniMax M2.5 | Integrated | `MiniMaxAI/MiniMax-M2.5` |
| STT | `nvidia/parakeet-tdt-0.6b-v3` | Parakeet TDT 0.6B v3 | Not integrated | — |
| STT | `mistralai/Voxtral-Mini-3B-2507` | Voxtral Mini 3B | Integrated | `mistralai/Voxtral-Mini-3B-2507` |
| STT | `openai/whisper-large-v3` | Whisper Large v3 | Integrated | `openai/whisper-large-v3` |
| TTS | `cartesia/sonic` | Cartesia Sonic | Not integrated | — |
| TTS | `cartesia/sonic-2` | Cartesia Sonic 2 | Not integrated | — |
| TTS | `cartesia/sonic-3` | Cartesia Sonic 3 | Not integrated | — |
| TTS | `deepgram/deepgram-aura-2` | Deepgram Aura 2 | Not integrated | — |
| TTS | `hexgrad/Kokoro-82M` | Kokoro | Integrated | `hexgrad/Kokoro-82M` |
| TTS | `minimax/speech-2.6-turbo` | Minimax Speech 2.6 Turbo | Not integrated | — |
| TTS | `canopylabs/orpheus-3b-0.1-ft` | Orpheus 3B | Not integrated | — |
| TTS | `rime-labs/rime-arcana-v2` | Rime Arcana v2 | Not integrated | — |
| TTS | `rime-labs/rime-arcana-v3` | Rime Arcana v3 | Not integrated | — |
| TTS | `rime-labs/rime-arcana-v3-turbo` | Rime Arcana v3 Turbo | Not integrated | — |
| TTS | `rime-labs/rime-mist-v2` | Rime Mist v2 | Not integrated | — |
| TTS | `rime-labs/rime-mist-v3` | Rime Mist v3 | Not integrated | — |

## xAI `xai`

- Runtime provider: `xai`
- Model integration: 3/9 integrated
- Verified support: LLM `native`, STT `partial`, TTS `native`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `grok-4-0709` | Grok 4 | Integrated | `grok-4` |
| LLM | `grok-4-fast-reasoning` | Grok 4 Fast | Not integrated | — |
| LLM | `grok-4-1-fast-non-reasoning` | Grok 4.1 Fast Non-Reasoning | Integrated | `grok-4-1-fast-non-reasoning` |
| LLM | `grok-4-1-fast-reasoning` | Grok 4.1 Fast Reasoning | Integrated | `grok-4-1-fast-reasoning` |
| LLM | `grok-4.20-multi-agent-0309` | Grok 4.20 Multi-Agent | Not integrated | — |
| LLM | `grok-4.20-non-reasoning` | Grok 4.20 Non-Reasoning | Not integrated | — |
| LLM | `grok-4.20-reasoning` | Grok 4.20 Reasoning | Not integrated | — |
| STT | `voice-agent-api` | Voice Agent API (speech input inside realtime agent) | Not integrated | — |
| TTS | `text-to-speech` | Text to Speech API | Not integrated | — |

## Xiaomi Mimo `xiaomi-mimo`

- Runtime provider: catalog-only
- Model integration: 0/4 integrated
- Verified support: LLM `native`, STT `partial`, TTS `native`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `mimo-v2-flash` | MiMo-V2-Flash | Not integrated | — |
| LLM | `mimo-v2-omni` | MiMo-V2-Omni | Not integrated | — |
| LLM | `mimo-v2-pro` | MiMo-V2-Pro | Not integrated | — |
| TTS | `mimo-v2-tts` | MiMo-V2-TTS | Not integrated | — |

## Z.ai / Zhipu AI `z-ai-zhipu-ai`

- Runtime provider: `z-ai-zhipu-ai`
- Model integration: 7/21 integrated
- Verified support: LLM `native`, STT `native`, TTS `partial`

| Service | Model ID | Public Name | App Status | Runtime ID |
| --- | --- | --- | --- | --- |
| LLM | `glm-4-32b-0414-128k` | GLM-4-32B-0414-128K | Not integrated | — |
| LLM | `glm-4-flash-250414` | GLM-4-Flash-250414 | Not integrated | — |
| LLM | `glm-4-flashx-250414` | GLM-4-FlashX-250414 | Not integrated | — |
| LLM | `glm-4-long` | GLM-4-Long | Not integrated | — |
| LLM | `glm-4.5` | GLM-4.5 | Not integrated | — |
| LLM | `glm-4.5-air` | GLM-4.5-Air | Integrated | `glm-4.5-air` |
| LLM | `glm-4.5-airx` | GLM-4.5-AirX | Not integrated | — |
| LLM | `glm-4.5-flash` | GLM-4.5-Flash | Not integrated | — |
| LLM | `glm-4.5-x` | GLM-4.5-X | Not integrated | — |
| LLM | `glm-4.6` | GLM-4.6 | Integrated | `glm-4.6` |
| LLM | `glm-4.7` | GLM-4.7 | Integrated | `glm-4.7` |
| LLM | `glm-4.7-flash` | GLM-4.7-Flash | Not integrated | — |
| LLM | `glm-4.7-flashx` | GLM-4.7-FlashX | Integrated | `glm-4.7-flashx` |
| LLM | `glm-5` | GLM-5 | Integrated | `glm-5` |
| LLM | `glm-5-turbo` | GLM-5-Turbo | Integrated | `glm-5-turbo` |
| STT | `glm-asr-2512` | GLM-ASR-2512 | Integrated | `glm-asr-2512` |
| TTS | `glm-4-voice` | GLM-4-Voice | Not integrated | — |
| TTS | `glm-realtime-air` | GLM-Realtime-Air | Not integrated | — |
| TTS | `glm-realtime-flash` | GLM-Realtime-Flash | Not integrated | — |
| TTS | `glm-tts` | GLM-TTS | Not integrated | — |
| TTS | `glm-tts-clone` | GLM-TTS-Clone | Not integrated | — |

## Unresolved Runtime Entries

These runtime manifest rows did not resolve to a canonical catalog model and should be investigated.

| App Provider | Catalog Provider | Service | Runtime ID |
| --- | --- | --- | --- |
| `openai` | `openai` | `llm` | `gpt-5.2` |
| `openai` | `openai` | `llm` | `gpt-5.1` |
| `openai` | `openai` | `llm` | `gpt-5` |
| `openai` | `openai` | `llm` | `gpt-5-mini` |
| `openai` | `openai` | `llm` | `gpt-5-nano` |
| `openai` | `openai` | `llm` | `o3` |
| `openai` | `openai` | `llm` | `o3-pro` |
| `openai` | `openai` | `llm` | `o4-mini` |
| `openai` | `openai` | `llm` | `o3-mini` |
| `openai` | `openai` | `llm` | `o1` |
| `openai` | `openai` | `llm` | `o1-mini` |
| `openai` | `openai` | `llm` | `o1-preview` |
| `openai` | `openai` | `llm` | `gpt-4.5-preview` |
| `openai` | `openai` | `llm` | `gpt-4o` |
| `openai` | `openai` | `llm` | `gpt-4o-mini` |
| `openai` | `openai` | `llm` | `gpt-4-turbo` |
| `openai` | `openai` | `llm` | `gpt-4` |
| `openai` | `openai` | `llm` | `gpt-3.5-turbo` |
| `anthropic` | `anthropic` | `llm` | `claude-opus-4-20250522` |
| `gemini` | `google-vertex-ai-studio` | `llm` | `gemini-3.1-pro-preview` |
| `gemini` | `google-vertex-ai-studio` | `llm` | `gemini-3.1-flash-lite-preview` |
| `gemini` | `google-vertex-ai-studio` | `llm` | `gemini-3-flash-preview` |
| `gemini` | `google-vertex-ai-studio` | `llm` | `gemini-2.0-flash` |
| `gemini` | `google-vertex-ai-studio` | `llm` | `gemini-2.0-flash-lite` |
| `gemini` | `google-vertex-ai-studio` | `stt` | `gemini-3.1-pro-preview` |
| `gemini` | `google-vertex-ai-studio` | `stt` | `gemini-3.1-flash-lite-preview` |
| `gemini` | `google-vertex-ai-studio` | `stt` | `gemini-3-flash-preview` |
| `gemini` | `google-vertex-ai-studio` | `stt` | `gemini-2.5-pro` |
| `gemini` | `google-vertex-ai-studio` | `stt` | `gemini-2.5-flash` |
| `gemini` | `google-vertex-ai-studio` | `stt` | `gemini-2.5-flash-lite` |
| `gemini` | `google-vertex-ai-studio` | `stt` | `gemini-2.0-flash` |
| `gemini` | `google-vertex-ai-studio` | `stt` | `gemini-2.0-flash-lite` |
| `gemini` | `google-vertex-ai-studio` | `tts` | `gemini-2.5-flash-preview-tts` |
| `gemini` | `google-vertex-ai-studio` | `tts` | `gemini-2.5-pro-preview-tts` |
| `xai` | `xai` | `llm` | `grok-code-fast-1` |
| `xai` | `xai` | `llm` | `grok-3` |
| `xai` | `xai` | `llm` | `grok-3-fast` |
| `xai` | `xai` | `llm` | `grok-3-mini` |
| `xai` | `xai` | `tts` | `grok-tts-mini` |
| `groq` | `groq` | `llm` | `groq/compound` |
| `groq` | `groq` | `llm` | `groq/compound-mini` |
| `groq` | `groq` | `llm` | `meta-llama/llama-4-maverick-17b-128e-instruct` |
| `mistral` | `mistral-ai` | `llm` | `open-mistral-nemo` |
| `together` | `together-ai` | `llm` | `Qwen/Qwen3.5-397B-A17B` |
| `together` | `together-ai` | `llm` | `Qwen/Qwen3-235B-A22B-FP8` |
| `together` | `together-ai` | `llm` | `Qwen/Qwen3.5-9B` |
| `together` | `together-ai` | `llm` | `deepseek-ai/DeepSeek-V3.1` |
| `together` | `together-ai` | `llm` | `deepseek-ai/DeepSeek-R1` |
| `together` | `together-ai` | `llm` | `meta-llama/Llama-3.3-70B-Instruct-Turbo` |
| `together` | `together-ai` | `llm` | `meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo` |
| `together` | `together-ai` | `llm` | `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8` |
| `together` | `together-ai` | `llm` | `Qwen/Qwen3-Next-80B-A3B-Instruct` |
| `together` | `together-ai` | `llm` | `Qwen/Qwen3-Coder-Next-FP8` |
| `nvidia` | `nvidia-nim` | `llm` | `nvidia/llama-3.3-nemotron-super-49b-v1.5` |
| `nvidia` | `nvidia-nim` | `llm` | `nvidia/llama-3.1-nemotron-ultra-253b-v1` |
| `nvidia` | `nvidia-nim` | `llm` | `nvidia/llama-3.1-nemotron-nano-8b-v1` |

