# Provider Runtime Reference

Last updated: 2026-07-04

This document tracks the providers that are present in SchnackAI's runtime
manifest. The source of truth is `src/constants/providers/runtimeManifest.ts`;
this file is a human-readable reference for product and maintenance decisions.

## Runtime Policy

- Runtime providers must be useful for the voice-first conversation loop.
- Dedicated web-search and web-data vendors are no longer runtime providers.
- Perplexity remains because Sonar is treated as a grounded answer LLM, not as a
  raw search backend.
- Model pickers are curated. They intentionally exclude deprecated,
  alias-only, wrong-endpoint, coding-only, image/video-only, Chinese-only, and
  Mandarin-only rows.
- Provider-native web search is exposed only when `src/services/webSearch.ts`
  has an app-wired integration path.
- Speech providers are exposed only when the app has a straightforward BYOK
  route useful to non-Chinese users.

## Removed Runtime Providers

The following providers are intentionally absent from runtime settings,
validation, API-key storage, setup-guide routing, and web-search dispatch:

- `brave`
- `exa`
- `firecrawl`
- `serpapi`
- `tavily`

## Summary Matrix

| Provider | Web search | LLM | STT | TTS | Notes |
| --- | --- | --- | --- | --- | --- |
| `openai` | enabled | enabled | enabled | enabled | Uses Responses web search and OpenAI speech routes. |
| `anthropic` | none | enabled | none | none | Claude Messages only. |
| `alibaba-qwen-dashscope` | none | enabled | enabled | enabled | OpenAI-compatible chat plus simple Qwen ASR/TTS routes. |
| `bytedance-doubao-seed` | none | enabled | none | none | Ark chat only; Doubao Speech is not runtime-exposed. |
| `gemini` | none | enabled | enabled | enabled | Gemini GenerateContent/Live plus Google Cloud Speech and Gemini TTS. |
| `xai` | none | enabled | enabled | enabled | Grok chat plus standalone xAI STT/TTS routes. |
| `deepseek` | none | enabled | none | none | DeepSeek chat completions only. |
| `mistral` | none | enabled | enabled | none | Chat completions plus Voxtral Mini Transcribe 2. |
| `moonshot-ai-kimi` | none | enabled | none | none | Kimi OpenAI-compatible chat only. |
| `perplexity` | enabled | enabled | none | none | Sonar chat completions are used for grounded answers. |

## Provider Details

### OpenAI (`openai`)

- LLM transport: OpenAI-compatible chat completions.
- Web search: `gpt-4.1-mini` via the Responses web-search tool.
- LLM picker: `gpt-5.5`, `gpt-5.4`, `gpt-5.4-mini`, `gpt-5.4-nano`,
  `gpt-4.1`, `gpt-4.1-mini`, `gpt-realtime-1.5`,
  `gpt-realtime-mini`.
- Effort: `reasoning_effort` for GPT-5.5/GPT-5.4 family entries where exposed.
- STT picker: catalog-backed OpenAI transcription models.
- TTS picker: `gpt-4o-mini-tts`, `tts-1`, `tts-1-hd`.

### Anthropic (`anthropic`)

- LLM transport: Anthropic Messages.
- LLM picker: Claude 5 and current Claude 4.x rows supported by the Messages
  integration.
- Effort: output effort metadata is exposed only on supported Claude rows.
- STT/TTS/web search: not runtime-exposed.

### Alibaba / Qwen (`alibaba-qwen-dashscope`)

- LLM transport: DashScope OpenAI-compatible chat completions.
- LLM picker: curated Qwen 3.7, 3.6, 3.5, and Qwen Plus/Flash rows.
- Effort: `enable_thinking` toggle.
- STT picker: `qwen3-asr-flash`.
- TTS picker: `qwen3-tts-flash`, `qwen3-tts-instruct-flash`.
- Web search: documented by provider, but not runtime-exposed until the app
  wires a provider-native search route.

### ByteDance / Doubao (`bytedance-doubao-seed`)

- LLM transport: Volcengine Ark OpenAI-compatible chat completions.
- LLM picker: Doubao Seed 2.1 Turbo/Pro and curated Seed 2.0 rows.
- Effort: `reasoning_effort` on Seed 2.1 rows.
- STT/TTS/web search: not runtime-exposed. Doubao Speech remains catalog
  context only because the wired route is China-first and not a clearly
  multilingual BYOK speech option for SchnackAI.

### Google / Gemini (`gemini`)

- LLM transport: Gemini `models.generateContent`, with Gemini Live kept for the
  live audio row.
- LLM picker: `gemini-live-2.5-flash-native-audio`, `gemini-3.5-flash`,
  `gemini-3.1-pro-preview`, `gemini-3.1-flash-lite`,
  `gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-2.5-flash-lite`.
- Effort: `generationConfig.thinkingConfig.thinkingLevel` for Gemini 3.x rows
  that expose thinking levels.
- STT picker: Google Cloud Speech V2 catalog rows, default `chirp_3`.
- TTS picker: Gemini TTS preview rows.
- Web search: documented by provider, but not runtime-exposed until the app
  wires a provider-native search route.

### xAI (`xai`)

- LLM transport: OpenAI-compatible chat completions.
- LLM picker: `grok-4.3`.
- Effort: `reasoning_effort` with `none`, `low`, `medium`, `high`.
- STT picker: standalone xAI `grok-stt` route.
- TTS picker: standalone xAI `grok-tts` route.
- Web search: documented by provider, but not runtime-exposed until the app
  wires a provider-native search route.

### DeepSeek (`deepseek`)

- LLM transport: OpenAI-compatible chat completions.
- LLM picker: `deepseek-v4-flash`, `deepseek-v4-pro`.
- Effort: `thinking.type` plus `reasoning_effort` for supported rows.
- STT/TTS/web search: not runtime-exposed.

### Mistral (`mistral`)

- LLM transport: OpenAI-compatible chat completions.
- LLM picker: `mistral-medium-3-5`, `mistral-small-2603`,
  `mistral-large-2512`, `ministral-14b-2512`, `ministral-8b-2512`,
  `ministral-3b-2512`.
- Effort: `reasoning_effort` for Mistral Medium 3.5 and Mistral Small 4.
- STT picker: `voxtral-mini-2602` (Voxtral Mini Transcribe 2).
- TTS/web search: documented by provider, but not runtime-exposed until the app
  wires the required provider-native route.

### Moonshot / Kimi (`moonshot-ai-kimi`)

- LLM transport: OpenAI-compatible chat completions.
- LLM picker: `kimi-k2.6`, `kimi-k2.5`, `moonshot-v1-128k`,
  `moonshot-v1-32k`, `moonshot-v1-8k`.
- Effort: `thinking.type` toggle for Kimi K2 rows.
- STT/TTS/web search: not runtime-exposed.

### Perplexity (`perplexity`)

- LLM transport: Sonar chat-completions compatibility endpoint.
- Web search: enabled through Sonar grounded answers.
- LLM picker: `sonar`, `sonar-pro`, `sonar-reasoning-pro`,
  `sonar-deep-research`.
- Effort: not exposed. The current app does not send a Sonar effort parameter
  because the official Sonar request docs do not document a stable equivalent.
- STT/TTS: not runtime-exposed.
