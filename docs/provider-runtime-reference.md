# Provider Runtime Reference

Last updated: 2026-03-29

## Progress

- [x] Create reference file and progress tracker
- [x] Extract runtime provider inventory and picker models
- [x] Compare runtime wiring against catalog support metadata
- [x] Write exhaustive provider-by-provider status sections
- [x] Final verification pass

## Scope

This document tracks every provider present in SchnackAI's runtime manifest, the models actually exposed in the app, and the settled runtime policy for how those providers are surfaced.

Status labels used below:

- `Fully enabled`: the app exposes the provider capability and the current runtime scope is complete.
- `Fully enabled under curated picker policy`: the provider works for its exposed services, and SchnackAI intentionally uses curated bundled picker data instead of live model discovery.
- `Intentionally scoped`: the provider offers broader official capabilities than SchnackAI exposes, and that delta is an explicit product decision rather than pending work.
- `Fully enabled for search only`: the provider is intentionally runtime-only for web search.

## Cross-Cutting Decisions

- Runtime provider model pickers intentionally use curated snapshot data from the bundled provider catalog instead of live model discovery.
- Voice lists are either live-discovered where the runtime already supports that path or intentionally curated subsets.
- Provider validation now covers LLM, search, and TTS-capable providers, so speech-only providers are no longer skipped by the settings validation flow.
- Search-only runtime providers such as `brave`, `exa`, `firecrawl`, `serpapi`, and `tavily` remain runtime-only by design; matching shared catalog documents are optional, not required.
- Several providers expose broader official surfaces such as agent-only LLM routing, separate cloud speech products, or non-uniform speech protocol families. SchnackAI keeps those out of runtime scope unless they fit the app's current BYOK and picker model.

## Resolution Summary

There is no open implementation backlog in this document.

The current settled state is:

- `31 providers` are fully enabled for their in-app AI/speech scope. `28` of those use the curated picker policy and `3` are effectively static.
- `5 providers` are intentionally scope-limited relative to their broader official platform catalogs. Those deltas are documented below, but they are not pending work.
- `5 providers` are intentionally search-only.

## Summary Matrix

| Provider | Search | LLM | STT | TTS | Overall | Catalog delta | Picker policy |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `01-ai-yi` | none | enabled | none | none | Fully enabled under curated picker policy | none | curated snapshot |
| `openai` | enabled (gpt-4.1-mini) | enabled | enabled | enabled | Fully enabled under curated picker policy | none | curated snapshot |
| `microsoft-azure` | none | enabled | enabled | enabled | Fully enabled under curated picker policy | none | curated snapshot + live voices |
| `anthropic` | none | enabled | none | none | Fully enabled under curated picker policy | none | curated snapshot |
| `assemblyai` | none | enabled | enabled | none | Fully enabled under curated picker policy | none | curated snapshot |
| `ai21-labs` | none | enabled | none | none | Fully enabled under curated picker policy | none | curated snapshot |
| `alibaba-qwen-dashscope` | none | enabled | enabled | enabled | Fully enabled under curated picker policy | none | curated snapshot |
| `baichuan` | none | enabled | none | none | Fully enabled | none | static curated |
| `baidu-ernie-qianfan` | none | enabled | enabled | enabled | Fully enabled under curated picker policy | none | curated snapshot |
| `brave` | enabled (Brave Search API) | none | none | none | Fully enabled for search only | none | runtime-only |
| `bytedance-doubao-seed` | none | enabled | enabled | none | Intentionally scoped | Doubao Speech TTS stays out of runtime scope | scoped runtime |
| `deepgram` | none | none | enabled | enabled | Intentionally scoped | Voice Agent llm routing stays out of runtime scope | scoped runtime + curated voices |
| `elevenlabs` | none | none | enabled | enabled | Intentionally scoped | ElevenAgents/custom llm surfaces stay out of runtime scope | scoped runtime + live voices |
| `exa` | enabled (Exa Search API) | none | none | none | Fully enabled for search only | none | runtime-only |
| `firecrawl` | enabled (Firecrawl Search API) | none | none | none | Fully enabled for search only | none | runtime-only |
| `fish-audio` | none | none | enabled | enabled | Fully enabled under curated picker policy | none | curated snapshot |
| `gemini` | none | enabled | enabled | enabled | Fully enabled under curated picker policy | none | curated snapshot |
| `cerebras` | none | enabled | none | none | Fully enabled under curated picker policy | none | curated snapshot |
| `deepinfra` | none | enabled | enabled | enabled | Fully enabled under curated picker policy | none | curated snapshot |
| `xai` | none | enabled | enabled | enabled | Fully enabled under curated picker policy | none | curated snapshot + curated voices |
| `xiaomi-mimo` | none | enabled | none | enabled | Intentionally scoped | Standalone MiMo STT stays out of runtime scope | scoped runtime |
| `groq` | none | enabled | enabled | enabled | Fully enabled under curated picker policy | none | curated snapshot |
| `deepseek` | none | enabled | none | none | Fully enabled under curated picker policy | none | curated snapshot |
| `fireworks-ai` | none | enabled | enabled | none | Fully enabled under curated picker policy | none | curated snapshot |
| `hugging-face-inference-api` | none | enabled | enabled | none | Fully enabled under curated picker policy | none | curated snapshot |
| `hyperbolic` | none | enabled | none | enabled | Fully enabled under curated picker policy | none | curated snapshot |
| `mistral` | none | enabled | enabled | none | Fully enabled under curated picker policy | none | curated snapshot |
| `minimax` | none | enabled | none | enabled | Fully enabled | none | static curated |
| `moonshot-ai-kimi` | none | enabled | none | none | Fully enabled under curated picker policy | none | curated snapshot |
| `cohere` | none | enabled | none | none | Fully enabled under curated picker policy | none | curated snapshot |
| `perplexity` | enabled (sonar) | enabled | none | none | Fully enabled under curated picker policy | none | curated snapshot |
| `replicate` | none | enabled | enabled | enabled | Fully enabled under curated picker policy | none | curated snapshot |
| `sambanova` | none | enabled | enabled | none | Fully enabled under curated picker policy | none | curated snapshot |
| `serpapi` | enabled (SerpApi Google Search API) | none | none | none | Fully enabled for search only | none | runtime-only |
| `siliconflow` | none | enabled | enabled | enabled | Fully enabled under curated picker policy | none | curated snapshot |
| `stepfun` | none | enabled | enabled | enabled | Fully enabled under curated picker policy | none | curated snapshot |
| `tavily` | enabled (Tavily Search API) | none | none | none | Fully enabled for search only | none | runtime-only |
| `together` | none | enabled | enabled | enabled | Fully enabled under curated picker policy | none | curated snapshot |
| `nvidia` | none | enabled | none | none | Intentionally scoped | Riva/NIM speech adapters stay out of runtime scope | scoped runtime |
| `novita-ai` | none | enabled | enabled | enabled | Fully enabled under curated picker policy | none | curated snapshot |
| `z-ai-zhipu-ai` | none | enabled | enabled | enabled | Fully enabled | none | static curated |

## Provider Details

### 01.AI (`01-ai-yi`)

- Catalog provider id: `01-ai-yi`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `Yi-Lightning` (`yi-lightning`), `Yi-Lightning-Lite` (`yi-lightning-lite`), `Yi-Large` (`yi-large`), `Yi-Medium` (`yi-medium`), `Yi-Large-Turbo` (`yi-large-turbo`), `Yi-Vision` (`yi-vision`), `Yi-Medium-200K` (`yi-medium-200k`), `Yi-Spark` (`yi-spark`), `Yi-Large-RAG` (`yi-large-rag`), `Yi-Large-FC` (`yi-large-fc`)
- STT: support `none`, transport `none`, models: none
- TTS: support `none`, transport `none`, models: none
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### OpenAI (`openai`)

- Catalog provider id: `openai`
- Overall status: Fully enabled under curated picker policy
- Search: enabled using `gpt-4.1-mini`
- LLM: support `provider`, transport `openai-compatible`, models: `GPT-5.4` (`gpt-5.4`), `GPT-5.4 mini` (`gpt-5.4-mini`), `GPT-5.4 nano` (`gpt-5.4-nano`), `GPT-4.1` (`gpt-4.1`), `GPT-4.1 mini` (`gpt-4.1-mini`), `GPT-4.1 nano` (`gpt-4.1-nano`), `GPT-Realtime-1.5` (`gpt-realtime-1.5`), `GPT-Realtime-mini` (`gpt-realtime-mini`)
- STT: support `provider`, transport `multipart`, models: `GPT-4o mini Transcribe` (`gpt-4o-mini-transcribe`), `GPT-4o Transcribe` (`gpt-4o-transcribe`), `GPT-4o Transcribe Diarize` (`gpt-4o-transcribe-diarize`), `Whisper` (`whisper-1`)
- TTS: support `provider`, transport `binary`, models: `GPT-4o mini TTS` (`gpt-4o-mini-tts`), `TTS-1` (`tts-1`), `TTS-1 HD` (`tts-1-hd`)
- TTS voices: static runtime list, default voice `alloy`. Voices: `Alloy` (`alloy`), `Ash` (`ash`), `Ballad` (`ballad`), `Cedar` (`cedar`), `Coral` (`coral`), `Echo` (`echo`), `Fable` (`fable`), `Marin` (`marin`), `Onyx` (`onyx`), `Nova` (`nova`), `Sage` (`sage`), `Shimmer` (`shimmer`), `Verse` (`verse`)
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.
- Voice policy: TTS voice list is an intentional curated runtime subset (13 baked-in voices).

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### Microsoft Azure (`microsoft-azure`)

- Catalog provider id: `microsoft-azure`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `azure-openai` plus `azure-openai-realtime`, models: `GPT-4.1` (`gpt-4.1`), `GPT-4.1 mini` (`gpt-4.1-mini`), `GPT-4.1 nano` (`gpt-4.1-nano`), `GPT-4o` (`gpt-4o`), `GPT-4o mini` (`gpt-4o-mini`), `GPT-Realtime` (`gpt-realtime`), `GPT-Realtime mini` (`gpt-realtime-mini`), `GPT-Realtime 1.5` (`gpt-realtime-1.5`)
- STT: support `provider`, transport `azure-openai-audio-input`, models: `GPT-4o Transcribe` (`gpt-4o-transcribe`), `GPT-4o mini Transcribe` (`gpt-4o-mini-transcribe`), `GPT-4o Transcribe Diarize` (`gpt-4o-transcribe-diarize`), `Whisper` (`whisper`)
- TTS: support `provider`, transport `azure-speech`, models: `Azure AI Speech Neural` (`azure-ai-speech-neural`)
- TTS voices: live-discovered, default voice `en-US-JennyMultilingualNeural`
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.
- Voice policy: TTS voice discovery is live in runtime.

#### Resolution

- No open implementation work remains under the current runtime policy.
- Azure OpenAI realtime chat models now route through the Azure websocket transport while the text/chat models stay on Azure chat completions.
- Azure speech credentials now validate through the TTS validation path in Settings.

### Anthropic (`anthropic`)

- Catalog provider id: `anthropic`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `anthropic`, models: `Claude Opus 4.8` (`claude-opus-4-8`), `Claude Opus 4.7` (`claude-opus-4-7`), `Claude Opus 4.6` (`claude-opus-4-6`), `Claude Sonnet 4.6` (`claude-sonnet-4-6`), `Claude Haiku 4.5` (`claude-haiku-4-5-20251001`), `Claude Opus 4.5` (`claude-opus-4-5-20251101`), `Claude Opus 4.1` (`claude-opus-4-1-20250805`), `Claude Opus 4` (`claude-opus-4-20250514`), `Claude Sonnet 4.5` (`claude-sonnet-4-5-20250929`), `Claude Sonnet 4` (`claude-sonnet-4-20250514`), `Claude 3 Haiku` (`claude-3-haiku-20240307`)
- STT: support `none`, transport `none`, models: none
- TTS: support `none`, transport `none`, models: none
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### AssemblyAI (`assemblyai`)

- Catalog provider id: `assemblyai`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `Claude Opus 4.6` (`claude-opus-4-6`), `Claude Sonnet 4.6` (`claude-sonnet-4-6`), `Claude Opus 4.5` (`claude-opus-4-5-20251101`), `Claude 4.5 Sonnet` (`claude-sonnet-4-5-20250929`), `Claude 4.5 Haiku` (`claude-haiku-4-5-20251001`), `Claude 4 Opus` (`claude-opus-4-20250514`), `Claude 4 Sonnet` (`claude-sonnet-4-20250514`), `Claude 3.0 Haiku` (`claude-3-haiku-20240307`), `GPT-5.2` (`gpt-5.2`), `GPT-5.1` (`gpt-5.1`), `GPT-5` (`gpt-5`), `GPT-5 mini` (`gpt-5-mini`), `GPT-5 nano` (`gpt-5-nano`), `GPT-4.1` (`gpt-4.1`), `gpt-oss-120b` (`gpt-oss-120b`), `gpt-oss-20b` (`gpt-oss-20b`), `ChatGPT-4o` (`chatgpt-4o`), `Gemini 3 Pro Preview` (`gemini-3-pro-preview`), `Gemini 3 Flash Preview` (`gemini-3-flash-preview`), `Gemini 2.5 Pro` (`gemini-2.5-pro`), `Gemini 2.5 Flash` (`gemini-2.5-flash`), `Gemini 2.5 Flash-Lite` (`gemini-2.5-flash-lite`)
- STT: support `provider`, transport `assemblyai-pre-recorded`, models: `Universal-3 Pro` (`universal-3-pro`), `Universal-2` (`universal-2`), `Universal-3 Pro Streaming` (`u3-rt-pro`), `Universal-Streaming English` (`universal-streaming-english`), `Whisper Streaming` (`whisper-rt`)
- TTS: support `none`, transport `none`, models: none
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### AI21 (`ai21-labs`)

- Catalog provider id: `ai21-labs`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `Jamba Large` (`jamba-large-1.7-2025-07`), `Jamba Mini` (`jamba-mini-2-2026-01`)
- STT: support `none`, transport `none`, models: none
- TTS: support `none`, transport `none`, models: none
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### Alibaba / Qwen (`alibaba-qwen-dashscope`)

- Catalog provider id: `alibaba-qwen-dashscope`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `Qwen3.5-Plus` (`qwen3.5-plus`), `Qwen-Plus` (`qwen-plus`), `Qwen3.5-Flash` (`qwen3.5-flash`), `Qwen-Flash` (`qwen-flash`), `Qwen3-Max` (`qwen3-max`), `Qwen3-Omni-Flash-Realtime` (`qwen3-omni-flash-realtime`)
- STT: support `provider`, transport `openai-audio-input`, models: `Qwen3-ASR-Flash` (`qwen3-asr-flash`)
- TTS: support `provider`, transport `dashscope`, models: `Qwen3-TTS-Flash` (`qwen3-tts-flash`), `Qwen3-TTS-Instruct-Flash` (`qwen3-tts-instruct-flash`)
- TTS voices: static runtime list, default voice `Cherry`. Voices: `Cherry` (`Cherry`)
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.
- Voice policy: TTS voice list is an intentional curated runtime subset (1 baked-in voices).

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### Baichuan (`baichuan`)

- Catalog provider id: `baichuan`
- Overall status: Fully enabled
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `Baichuan4-Air` (`Baichuan4-Air`), `Baichuan4-Turbo` (`Baichuan4-Turbo`), `Baichuan4` (`Baichuan4`), `Baichuan3-Turbo` (`Baichuan3-Turbo`), `Baichuan3-Turbo-128k` (`Baichuan3-Turbo-128k`), `Baichuan2-Turbo` (`Baichuan2-Turbo`), `Baichuan2-53B` (`Baichuan2-53B`), `Baichuan-M2` (`Baichuan-M2`), `Baichuan-M2-Plus` (`Baichuan-M2-Plus`), `Baichuan-M3` (`Baichuan-M3`), `Baichuan-M3-Plus` (`Baichuan-M3-Plus`), `Baichuan2-Turbo-192k` (`Baichuan2-Turbo-192k`)
- STT: support `none`, transport `none`, models: none
- TTS: support `none`, transport `none`, models: none
- Catalog delta: none

#### Resolution

- No open runtime work remains.
- Only routine catalog maintenance applies when upstream model availability changes.

### Baidu (`baidu-ernie-qianfan`)

- Catalog provider id: `baidu-ernie-qianfan`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `ERNIE 5.0` (`ernie-5.0`), `ERNIE 5.0 Thinking Preview` (`ernie-5.0-thinking-preview`), `ERNIE X1.1` (`ernie-x1.1`), `ERNIE X1.1 Preview` (`ernie-x1.1-preview`), `ERNIE X1 Turbo 32K` (`ernie-x1-turbo-32k`), `ERNIE 4.5 Turbo 128K` (`ernie-4.5-turbo-128k`), `ERNIE 4.5 Turbo VL` (`ernie-4.5-turbo-vl`), `ERNIE 4.5 21B A3B` (`ernie-4.5-21b-a3b`), `ERNIE 4.5 21B A3B Thinking` (`ernie-4.5-21b-a3b-thinking`), `ERNIE 4.5 VL 28B A3B` (`ernie-4.5-vl-28b-a3b`)
- STT: support `provider`, transport `baidu-short-speech`, models: `Short Speech Recognition` (`短语音识别`), `Short Speech Recognition Pro / 极速版` (`短语音识别极速版`)
- TTS: support `provider`, transport `baidu`, models: `Short Text Speech Synthesis` (`短文本语音合成`)
- TTS voices: static runtime list, default voice `0`. Voices: `Standard female` (`0`), `Standard male` (`1`), `Emotional female` (`3`), `Emotional child` (`4`)
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.
- Voice policy: TTS voice list is an intentional curated runtime subset (4 baked-in voices).

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### Brave (`brave`)

- Catalog provider id: `brave`
- Overall status: Fully enabled for search only
- Search: enabled using `Brave Search API`
- LLM: support `none`, transport `none`, models: none
- STT: support `none`, transport `none`, models: none
- TTS: support `none`, transport `none`, models: none
- Catalog delta: none
- Discovery note: No provider catalog document exists for this runtime provider; runtime source files are the source of truth.

#### Resolution

- No open runtime work remains.
- Search-only runtime coverage is intentional; a matching shared catalog provider document is optional and not required.

### ByteDance (`bytedance-doubao-seed`)

- Catalog provider id: `bytedance-doubao-seed`
- Overall status: Intentionally scoped
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `Doubao Seed 2.0 Pro` (`doubao-seed-2-0-pro-260215`), `Doubao Seed 2.0 Lite` (`doubao-seed-2-0-lite-260215`), `Doubao Seed 2.0 Mini` (`doubao-seed-2-0-mini-260215`), `Doubao Seed 2.0 Code Preview` (`doubao-seed-2-0-code-preview-260215`), `Doubao Seed 1.8` (`doubao-seed-1-8-251228`)
- STT: support `provider`, transport `bytedance-bigmodel-flash`, models: `Doubao Big-Model Streaming ASR` (`bigmodel`)
- TTS: support `none`, transport `none`, models: none
- Catalog delta: Doubao Speech TTS stays out of runtime scope
- Catalog-only TTS models: `Doubao Large-Model TTS` (`unknown`)
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.

#### Resolution

- No open implementation work remains under the current runtime policy.
- SchnackAI now exposes the one-shot Doubao Speech `bigmodel` STT route alongside Ark chat models.
- Doubao Speech TTS remains out of runtime scope because it is voice- and cluster-oriented rather than a stable picker-model surface.

### Deepgram (`deepgram`)

- Catalog provider id: `deepgram`
- Overall status: Intentionally scoped
- Search: not exposed
- LLM: support `none`, transport `none`, models: none
- STT: support `provider`, transport `deepgram-pre-recorded`, models: `Flux General English` (`flux-general-en`), `Nova-3 General` (`nova-3`), `Nova-3 Medical` (`nova-3-medical`), `Nova-2 General` (`nova-2`), `Nova-2 Vertical Variants` (`nova-2-verticals`), `Legacy Nova Family` (`legacy-nova-family`), `Legacy Enhanced Family` (`legacy-enhanced-family`), `Legacy Base Family` (`legacy-base-family`), `Deepgram Whisper Cloud` (`whisper`)
- TTS: support `provider`, transport `deepgram`, models: `Aura-2 Voice Family` (`aura-2`), `Aura-1 Voice Family` (`aura-1`)
- TTS voices: static runtime list, default voice `aura-2-thalia-en`. The runtime now includes the curated English Aura rows plus the documented German, Spanish, Dutch, French, Italian, and Japanese Aura 2 voices, alongside Aura 1 compatibility voices.
- Catalog delta: Voice Agent llm routing stays out of runtime scope
- Catalog-only LLM models: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.
- Voice policy: TTS voice list is a curated multilingual runtime snapshot of the documented Aura catalog.

#### Resolution

- No open implementation work remains under the current runtime policy.
- Deepgram is intentionally scoped to speech in SchnackAI; Voice Agent llm routing is documented but not exposed as a general provider capability.
- The runtime now exposes the documented multilingual Aura voice families instead of the earlier English-heavy subset.
- Deepgram credentials now validate through the TTS validation path in Settings.

### ElevenLabs (`elevenlabs`)

- Catalog provider id: `elevenlabs`
- Overall status: Intentionally scoped
- Search: not exposed
- LLM: support `none`, transport `none`, models: none
- STT: support `provider`, transport `elevenlabs`, models: `Scribe v2` (`scribe_v2`), `Scribe v1` (`scribe_v1`), `Scribe v2 Realtime` (`scribe_v2_realtime`)
- TTS: support `provider`, transport `elevenlabs`, models: `Eleven v3` (`eleven_v3`), `Eleven Multilingual v2` (`eleven_multilingual_v2`), `Eleven Flash v2.5` (`eleven_flash_v2_5`), `Eleven Turbo v2.5` (`eleven_turbo_v2_5`), `Eleven Turbo v2` (`eleven_turbo_v2`), `Eleven Monolingual v1` (`eleven_monolingual_v1`), `Eleven Multilingual v1` (`eleven_multilingual_v1`)
- TTS voices: live-discovered, default voice `JBFqnCBsd6RMkjVDRZzb`
- Catalog delta: ElevenAgents/custom llm surfaces stay out of runtime scope
- Catalog-only LLM models: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.
- Voice policy: TTS voice discovery is live in runtime.

#### Resolution

- No open implementation work remains under the current runtime policy.
- ElevenLabs is intentionally scoped to speech in SchnackAI; ElevenAgents/custom llm surfaces are not exposed as general provider routing.
- ElevenLabs credentials now validate through the TTS validation path in Settings.

### Exa (`exa`)

- Catalog provider id: `exa`
- Overall status: Fully enabled for search only
- Search: enabled using `Exa Search API`
- LLM: support `none`, transport `none`, models: none
- STT: support `none`, transport `none`, models: none
- TTS: support `none`, transport `none`, models: none
- Catalog delta: none
- Discovery note: No provider catalog document exists for this runtime provider; runtime source files are the source of truth.

#### Resolution

- No open runtime work remains.
- Search-only runtime coverage is intentional; a matching shared catalog provider document is optional and not required.

### Firecrawl (`firecrawl`)

- Catalog provider id: `firecrawl`
- Overall status: Fully enabled for search only
- Search: enabled using `Firecrawl Search API`
- LLM: support `none`, transport `none`, models: none
- STT: support `none`, transport `none`, models: none
- TTS: support `none`, transport `none`, models: none
- Catalog delta: none
- Discovery note: No provider catalog document exists for this runtime provider; runtime source files are the source of truth.

#### Resolution

- No open runtime work remains.
- Search-only runtime coverage is intentional; a matching shared catalog provider document is optional and not required.

### Fish Audio (`fish-audio`)

- Catalog provider id: `fish-audio`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `none`, transport `none`, models: none
- STT: support `provider`, transport `fish-audio`, models: none
- TTS: support `provider`, transport `fish-audio`, models: `Fish Audio S2-Pro` (`s2-pro`), `Fish Audio S1` (`s1`), `Fish Speech v1.6` (`speech-1.6`), `Fish Speech v1.5` (`speech-1.5`)
- TTS voices: no static picker list, default voice ``
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.
- Discovery note: TTS is enabled, but runtime does not expose a dedicated static voice list.

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated picker data is intentional, and Fish Audio credentials now validate through the TTS validation path in Settings.

### Google (`gemini`)

- Catalog provider id: `google-vertex-ai-studio`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `Gemini Live 2.5 Flash Native Audio` (`gemini-live-2.5-flash-native-audio`), `Gemini 2.5 Pro` (`gemini-2.5-pro`), `Gemini 2.5 Flash` (`gemini-2.5-flash`), `Gemini 2.5 Flash-Lite` (`gemini-2.5-flash-lite`)
- STT: support `provider`, transport `google-cloud-speech-v2`, models: `Chirp 3: Transcription` (`chirp_3`), `Chirp 2: Transcription` (`chirp_2`), `Telephony` (`telephony`)
- TTS: support `provider`, transport `gemini`, models: `Gemini 2.5 Flash TTS` (`gemini-2.5-flash-preview-tts`), `Gemini 2.5 Pro TTS` (`gemini-2.5-pro-preview-tts`)
- TTS voices: static runtime list, default voice `Kore`. Voices: `Zephyr · Bright` (`Zephyr`), `Puck · Upbeat` (`Puck`), `Charon · Informative` (`Charon`), `Kore · Firm` (`Kore`), `Fenrir · Excitable` (`Fenrir`), `Leda · Youthful` (`Leda`), `Orus · Firm` (`Orus`), `Aoede · Breezy` (`Aoede`), `Callirrhoe · Easy-going` (`Callirrhoe`), `Autonoe · Bright` (`Autonoe`), `Enceladus · Breathy` (`Enceladus`), `Iapetus · Clear` (`Iapetus`), `Umbriel · Easy-going` (`Umbriel`), `Algieba · Smooth` (`Algieba`), `Despina · Smooth` (`Despina`), `Erinome · Clear` (`Erinome`), `Algenib · Gravelly` (`Algenib`), `Rasalgethi · Informative` (`Rasalgethi`), `Laomedeia · Upbeat` (`Laomedeia`), `Achernar · Soft` (`Achernar`), `Alnilam · Firm` (`Alnilam`), `Schedar · Even` (`Schedar`), `Gacrux · Mature` (`Gacrux`), `Pulcherrima · Forward` (`Pulcherrima`), `Achird · Friendly` (`Achird`), `Zubenelgenubi · Casual` (`Zubenelgenubi`), `Vindemiatrix · Gentle` (`Vindemiatrix`), `Sadachbia · Lively` (`Sadachbia`), `Sadaltager · Knowledgeable` (`Sadaltager`), `Sulafat · Warm` (`Sulafat`)
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.
- Credential policy: Gemini chat and TTS use the AI Studio key segment, while Gemini STT uses Google Cloud Speech credentials as `<project-id>|<access-token>|<location>` or the combined form `AIza...|<project-id>|<access-token>|<location>`.
- Voice policy: TTS voice list is an intentional curated runtime subset (30 baked-in voices).

#### Resolution

- No open implementation work remains under the current runtime policy.
- Gemini now covers chat, TTS, and Google Cloud Speech STT under the current runtime scope.

### Cerebras (`cerebras`)

- Catalog provider id: `cerebras`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `Llama 3.1 8B` (`llama3.1-8b`), `OpenAI GPT OSS` (`gpt-oss-120b`), `Qwen 3 235B Instruct` (`qwen-3-235b-a22b-instruct-2507`), `Z.ai GLM 4.7` (`zai-glm-4.7`)
- STT: support `none`, transport `none`, models: none
- TTS: support `none`, transport `none`, models: none
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### DeepInfra (`deepinfra`)

- Catalog provider id: `deepinfra`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `GLM-4.7-Flash` (`zai-org/GLM-4.7-Flash`), `DeepSeek-V3.2` (`deepseek-ai/DeepSeek-V3.2`), `Qwen3-Max` (`Qwen/Qwen3-Max`), `Nemotron-3-Nano-30B-A3B` (`nvidia/Nemotron-3-Nano-30B-A3B`)
- STT: support `provider`, transport `deepinfra-inference`, models: `whisper-large-v3-turbo` (`openai/whisper-large-v3-turbo`), `Voxtral-Small-24B-2507` (`mistralai/Voxtral-Small-24B-2507`)
- TTS: support `provider`, transport `deepinfra`, models: `Qwen3-TTS` (`Qwen/Qwen3-TTS`), `Qwen3-TTS-VoiceDesign` (`Qwen/Qwen3-TTS-VoiceDesign`), `chatterbox-turbo` (`ResembleAI/chatterbox-turbo`)
- TTS voices: no static picker list, default voice `Warm neutral voice`
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.
- Discovery note: TTS is enabled, but runtime does not expose a dedicated static voice list.

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### xAI (`xai`)

- Catalog provider id: `xai`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `Grok 4.3` (`grok-4.3`), `Grok 4.20 Reasoning` (`grok-4.20-reasoning`), `Grok 4.20 Non-Reasoning` (`grok-4.20-non-reasoning`), `Grok 4.1 Fast Reasoning` (`grok-4-1-fast-reasoning`), `Grok 4.1 Fast Non-Reasoning` (`grok-4-1-fast-non-reasoning`), `Grok 4` (`grok-4-0709`), `Grok 4 Fast` (`grok-4-fast-reasoning`), `Grok 4.20 Multi-Agent` (`grok-4.20-multi-agent-0309`)
- STT: support `provider`, transport `xai-realtime`, models: `Voice Agent API (speech input inside realtime agent)` (`voice-agent-api`)
- TTS: support `provider`, transport `binary`, models: `Text to Speech API` (`text-to-speech`)
- TTS voices: static runtime list, default voice `ara`. Voices: `Eve · Energetic` (`eve`), `Ara · Warm` (`ara`), `Rex · Confident` (`rex`), `Sal · Balanced` (`sal`), `Leo · Authoritative` (`leo`)
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.
- Voice policy: TTS voice list is an intentional curated runtime subset (5 baked-in voices).

#### Resolution

- No open implementation work remains under the current runtime policy.
- xAI speech input now routes through the Voice Agent realtime WebSocket and finishes on the completed input-audio transcription event.

### Xiaomi MiMo (`xiaomi-mimo`)

- Catalog provider id: `xiaomi-mimo`
- Overall status: Intentionally scoped
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `MiMo-V2-Flash` (`mimo-v2-flash`), `MiMo-V2-Pro` (`mimo-v2-pro`), `MiMo-V2-Omni` (`mimo-v2-omni`)
- STT: support `none`, transport `none`, models: none
- TTS: support `provider`, transport `binary`, models: `MiMo-V2-TTS` (`mimo-v2-tts`)
- TTS voices: static runtime list, default voice `alloy`. Voices: `Default` (`alloy`)
- Catalog delta: Standalone MiMo STT stays out of runtime scope
- Catalog-only STT models: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.
- Voice policy: TTS voice list is an intentional curated runtime subset (1 baked-in voices).

#### Resolution

- No open implementation work remains under the current runtime policy.
- SchnackAI intentionally scopes Xiaomi MiMo to chat plus its documented TTS route; standalone STT remains too under-documented for runtime exposure.

### Groq (`groq`)

- Catalog provider id: `groq`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `Llama 3.1 8B` (`llama-3.1-8b-instant`), `Llama 3.3 70B` (`llama-3.3-70b-versatile`), `GPT OSS 20B` (`openai/gpt-oss-20b`), `GPT OSS 120B` (`openai/gpt-oss-120b`), `Llama 4 Scout 17B 16E` (`meta-llama/llama-4-scout-17b-16e-instruct`), `Kimi K2 0905` (`moonshotai/kimi-k2-instruct-0905`), `Qwen3-32B` (`qwen/qwen3-32b`), `Safety GPT OSS 20B` (`openai/gpt-oss-safeguard-20b`), `Llama Prompt Guard 2 22M` (`meta-llama/llama-prompt-guard-2-22m`), `Prompt Guard 2 86M` (`meta-llama/llama-prompt-guard-2-86m`)
- STT: support `provider`, transport `multipart`, models: `Whisper Large V3 Turbo` (`whisper-large-v3-turbo`), `Whisper Large V3` (`whisper-large-v3`)
- TTS: support `provider`, transport `binary`, models: `Canopy Labs Orpheus V1 English` (`canopylabs/orpheus-v1-english`), `Canopy Labs Orpheus Arabic Saudi` (`canopylabs/orpheus-arabic-saudi`)
- TTS voices: static runtime list, default voice `troy`. Voices: `Autumn` (`autumn`), `Diana` (`diana`), `Hannah` (`hannah`), `Austin` (`austin`), `Daniel` (`daniel`), `Troy` (`troy`), `Fahad` (`fahad`), `Sultan` (`sultan`), `Lulwa` (`lulwa`), `Noura` (`noura`)
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.
- Voice policy: TTS voice list is an intentional curated runtime subset (10 baked-in voices).

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### DeepSeek (`deepseek`)

- Catalog provider id: `deepseek`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `DeepSeek Chat` (`deepseek-chat`), `DeepSeek Reasoner` (`deepseek-reasoner`), `DeepSeek Coder (legacy alias)` (`deepseek-coder`)
- STT: support `none`, transport `none`, models: none
- TTS: support `none`, transport `none`, models: none
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### Fireworks (`fireworks-ai`)

- Catalog provider id: `fireworks-ai`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `Kimi K2.5` (`accounts/fireworks/models/kimi-k2p5`), `GLM-5` (`accounts/fireworks/models/glm-5`), `Deepseek v3.2` (`accounts/fireworks/models/deepseek-v3p2`), `OpenAI gpt-oss-120b` (`accounts/fireworks/models/gpt-oss-120b`), `OpenAI gpt-oss-20b` (`accounts/fireworks/models/gpt-oss-20b`), `Kimi K2 Thinking` (`accounts/fireworks/models/kimi-k2-thinking`)
- STT: support `provider`, transport `fireworks-pre-recorded`, models: `Whisper V3 Large` (`whisper-v3`), `Whisper V3 Turbo` (`whisper-v3-turbo`), `Streaming ASR v1` (`fireworks-asr-large`), `Streaming ASR v2` (`fireworks-asr-v2`)
- TTS: support `none`, transport `none`, models: none
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### Hugging Face (`hugging-face-inference-api`)

- Catalog provider id: `hugging-face-inference-api`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `gpt-oss-20b` (`openai/gpt-oss-20b`), `gpt-oss-120b` (`openai/gpt-oss-120b`), `Llama-3.3-70B-Instruct` (`meta-llama/Llama-3.3-70B-Instruct`), `Arch-Router-1.5B` (`katanemo/Arch-Router-1.5B`)
- STT: support `provider`, transport `huggingface-json`, models: `Whisper large-v3` (`openai/whisper-large-v3`), `Whisper large-v3-turbo` (`openai/whisper-large-v3-turbo`)
- TTS: support `none`, transport `none`, models: none
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### Hyperbolic (`hyperbolic`)

- Catalog provider id: `hyperbolic`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `gpt-oss-20b` (`openai/gpt-oss-20b`), `gpt-oss-120b` (`gpt-oss-120b`), `Qwen3-Next-80B-A3B-Thinking` (`Qwen3-Next-80B-A3B-Thinking`), `Qwen3-Next-80B-A3B-Instruct` (`Qwen3-Next-80B-A3B-Instruct`), `Qwen3-Coder-480B-A35B-Instruct` (`Qwen3-Coder-480B-A35B-Instruct`), `Qwen3-8B` (`Qwen3-8B`), `DeepSeek-R1-0528` (`DeepSeek-R1-0528`), `DeepSeek-V3-0324` (`DeepSeek-V3-0324`), `DeepSeek-R1` (`deepseek-ai/DeepSeek-R1`), `DeepSeek-V3` (`DeepSeek-V3`), `Llama-3.3-70B-Instruct` (`Llama-3.3-70B-Instruct`), `Llama 3.1 8B` (`meta-llama/Meta-Llama-3.1-8B`), `Llama 3.1 405B BASE` (`Llama 3.1 405B BASE`), `Llama 3.1 70B Instruct` (`meta-llama/Meta-Llama-3.1-70B-Instruct`), `Qwen/Qwen3-VL-32B-Thinking` (`Qwen/Qwen3-VL-32B-Thinking`), `NVIDIA-Nemotron-Nano-12B-v2-VL-BF16` (`nvidia/NVIDIA-Nemotron-Nano-12B-v2-VL-BF16`), `Qwen2.5-VL-72B-Instruct` (`Qwen/Qwen2.5-VL-72B-Instruct`), `Qwen2.5-VL-7B-Instruct` (`Qwen/Qwen2.5-VL-7B-Instruct`), `Pixtral-12B` (`mistralai/Pixtral-12B-2409`)
- STT: support `none`, transport `none`, models: none
- TTS: support `provider`, transport `hyperbolic`, models: `Melo TTS` (`Melo TTS`)
- TTS voices: static runtime list, default voice `EN-US`. Voices: `English · US` (`EN-US`), `English · British` (`EN-BR`), `English · India` (`EN-INDIA`), `English · Australia` (`EN-AU`), `Spanish` (`ES`), `French` (`FR`), `Chinese` (`ZH`), `Japanese` (`JP`), `Korean` (`KR`)
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.
- Voice policy: TTS voice list is an intentional curated runtime subset (9 baked-in voices).

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### Mistral (`mistral`)

- Catalog provider id: `mistral-ai`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `Mistral Small 4` (`mistral-small-2603`), `Mistral Large 3` (`mistral-large-2512`), `Mistral Medium 3.1` (`mistral-medium-2508`), `Mistral Small 3.2` (`mistral-small-2506`), `Ministral 3 14B` (`ministral-14b-2512`), `Ministral 3 8B` (`ministral-8b-2512`), `Ministral 3 3B` (`ministral-3b-2512`), `Magistral Medium 1.2` (`magistral-medium-2509`), `Magistral Small 1.2` (`magistral-small-2509`), `Devstral 2` (`devstral-2512`), `Devstral Small 2` (`labs-devstral-small-2512`), `Devstral Medium 1.0` (`devstral-medium-2507`), `Codestral` (`codestral-2508`), `Voxtral Small` (`voxtral-small-2507`), `Voxtral Mini` (`voxtral-mini-2507`), `Mistral Small Creative` (`labs-mistral-small-creative`), `Leanstral` (`labs-leanstral-2603`)
- STT: support `provider`, transport `multipart`, models: `Voxtral Mini Latest` (`voxtral-mini-latest`)
- TTS: support `none`, transport `none`, models: none
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### MiniMax (`minimax`)

- Catalog provider id: `minimax`
- Overall status: Fully enabled
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `MiniMax M2.7` (`MiniMax-M2.7`), `MiniMax M2.7 Highspeed` (`MiniMax-M2.7-highspeed`), `MiniMax M2.5` (`MiniMax-M2.5`), `MiniMax M2.5 Highspeed` (`MiniMax-M2.5-highspeed`), `MiniMax M2-her` (`M2-her`), `MiniMax M2.1` (`MiniMax-M2.1`), `MiniMax M2.1 Highspeed` (`MiniMax-M2.1-highspeed`), `MiniMax M2` (`MiniMax-M2`)
- STT: support `none`, transport `none`, models: none
- TTS: support `provider`, transport `minimax`, models: `MiniMax Speech 2.8 HD` (`speech-2.8-hd`), `MiniMax Speech 2.8 Turbo` (`speech-2.8-turbo`), `MiniMax Speech 2.6 HD` (`speech-2.6-hd`), `MiniMax Speech 2.6 Turbo` (`speech-2.6-turbo`), `MiniMax Speech 02 HD` (`speech-02-hd`), `MiniMax Speech 02 Turbo` (`speech-02-turbo`), `MiniMax Speech 01 HD` (`speech-01-hd`), `MiniMax Speech 01 Turbo` (`speech-01-turbo`)
- TTS voices: static runtime list, default voice `English_expressive_narrator`. Voices: `English Expressive Narrator` (`English_expressive_narrator`)
- Catalog delta: none
- Voice policy: TTS voice list is an intentional curated runtime subset (1 baked-in voices).

#### Resolution

- No open runtime work remains.
- Only routine catalog maintenance applies when upstream model or voice availability changes.

### Moonshot (`moonshot-ai-kimi`)

- Catalog provider id: `moonshot-ai-kimi`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `Kimi K2.5` (`kimi-k2.5`), `Kimi K2 0905 Preview` (`kimi-k2-0905-preview`), `Kimi K2 0711 Preview` (`kimi-k2-0711-preview`), `Kimi K2 Turbo Preview` (`kimi-k2-turbo-preview`), `Kimi K2 Thinking` (`kimi-k2-thinking`), `Kimi K2 Thinking Turbo` (`kimi-k2-thinking-turbo`), `Moonshot v1 8k` (`moonshot-v1-8k`), `Moonshot v1 32k` (`moonshot-v1-32k`), `Moonshot v1 128k` (`moonshot-v1-128k`), `Moonshot v1 Auto` (`moonshot-v1-auto`), `Moonshot v1 8k Vision Preview` (`moonshot-v1-8k-vision-preview`), `Moonshot v1 32k Vision Preview` (`moonshot-v1-32k-vision-preview`), `Moonshot v1 128k Vision Preview` (`moonshot-v1-128k-vision-preview`), `kimi-latest` (`kimi-latest`), `kimi-thinking-preview` (`kimi-thinking-preview`)
- STT: support `none`, transport `none`, models: none
- TTS: support `none`, transport `none`, models: none
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### Cohere (`cohere`)

- Catalog provider id: `cohere`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `cohere`, models: `Command A` (`command-a-03-2025`), `Command R7B` (`command-r7b-12-2024`), `Command R` (`command-r-08-2024`), `Command R+` (`command-r-plus-08-2024`), `Command A Reasoning` (`command-a-reasoning-08-2025`), `Command A Vision` (`command-a-vision-07-2025`), `Command A Translate` (`command-a-translate-08-2025`), `Aya Expanse 32B` (`c4ai-aya-expanse-32b`), `Aya Vision 32B` (`c4ai-aya-vision-32b`)
- STT: support `none`, transport `none`, models: none
- TTS: support `none`, transport `none`, models: none
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### Perplexity (`perplexity`)

- Catalog provider id: `perplexity`
- Overall status: Fully enabled under curated picker policy
- Search: enabled using `sonar`
- LLM: support `provider`, transport `openai-compatible`, models: `Sonar` (`sonar`), `Sonar Pro` (`sonar-pro`), `Sonar Reasoning Pro` (`sonar-reasoning-pro`), `Sonar Deep Research` (`sonar-deep-research`), `Perplexity Sonar (Agent API)` (`perplexity/sonar`)
- STT: support `none`, transport `none`, models: none
- TTS: support `none`, transport `none`, models: none
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### Replicate (`replicate`)

- Catalog provider id: `replicate`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `replicate`, models: `GPT-5 mini` (`openai/gpt-5-mini`), `GPT-5 nano` (`openai/gpt-5-nano`), `Claude Haiku 4.5` (`anthropic/claude-4.5-haiku`), `Claude Sonnet 4.5` (`anthropic/claude-4.5-sonnet`), `Gemini 2.5 Flash` (`google/gemini-2.5-flash`), `GPT-4o mini` (`openai/gpt-4o-mini`)
- STT: support `provider`, transport `replicate`, models: `GPT-4o Transcribe` (`openai/gpt-4o-transcribe`), `GPT-4o mini Transcribe` (`openai/gpt-4o-mini-transcribe`)
- TTS: support `provider`, transport `replicate`, models: `Inworld TTS 1.5 Mini` (`inworld/tts-1.5-mini`), `Inworld TTS 1.5 Max` (`inworld/tts-1.5-max`), `MiniMax Speech 2.8 Turbo` (`minimax/speech-2.8-turbo`), `MiniMax Speech 2.8 HD` (`minimax/speech-2.8-hd`)
- TTS voices: no static picker list, default voice `Ashley`
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.
- Discovery note: TTS is enabled, but runtime does not expose a dedicated static voice list.

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### SambaNova (`sambanova`)

- Catalog provider id: `sambanova`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `MiniMax M2.5` (`MiniMax-M2.5`), `DeepSeek R1 0528` (`DeepSeek-R1-0528`), `DeepSeek V3 0324` (`DeepSeek-V3-0324`), `DeepSeek V3.1` (`DeepSeek-V3.1`), `DeepSeek R1 Distill Llama 70B` (`DeepSeek-R1-Distill-Llama-70B`), `Meta Llama 3.3 70B Instruct` (`Meta-Llama-3.3-70B-Instruct`), `Meta Llama 3.1 8B Instruct` (`Meta-Llama-3.1-8B-Instruct`), `DeepSeek V3.1 Terminus` (`DeepSeek-V3.1-Terminus`), `DeepSeek V3.2` (`DeepSeek-V3.2`), `Llama 4 Maverick 17B 128E Instruct` (`Llama-4-Maverick-17B-128E-Instruct`), `ALLaM 7B Instruct Preview` (`ALLaM-7B-Instruct-preview`), `GPT-OSS 120B` (`gpt-oss-120b`), `Qwen3 235B A22B Instruct 2507` (`Qwen3-235B-A22B-Instruct-2507`), `Qwen3 32B` (`Qwen3-32B`), `Llama 3.3 Swallow 70B Instruct v0.4` (`Llama-3.3-Swallow-70B-Instruct-v0.4`), `DeepSeek V3.1 cb` (`DeepSeek-V3.1-cb`)
- STT: support `provider`, transport `multipart`, models: `Whisper Large v3` (`Whisper-Large-v3`)
- TTS: support `none`, transport `none`, models: none
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### SerpApi (`serpapi`)

- Catalog provider id: `serpapi`
- Overall status: Fully enabled for search only
- Search: enabled using `SerpApi Google Search API`
- LLM: support `none`, transport `none`, models: none
- STT: support `none`, transport `none`, models: none
- TTS: support `none`, transport `none`, models: none
- Catalog delta: none
- Discovery note: No provider catalog document exists for this runtime provider; runtime source files are the source of truth.

#### Resolution

- No open runtime work remains.
- Search-only runtime coverage is intentional; a matching shared catalog provider document is optional and not required.

### SiliconFlow (`siliconflow`)

- Catalog provider id: `siliconflow`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `DeepSeek-V3.2` (`deepseek-ai/DeepSeek-V3.2`), `DeepSeek-R1` (`deepseek-ai/DeepSeek-R1`), `Qwen3-32B` (`Qwen/Qwen3-32B`), `Kimi-K2.5` (`moonshotai/Kimi-K2.5`), `Qwen3-Omni-30B-A3B-Instruct` (`Qwen/Qwen3-Omni-30B-A3B-Instruct`)
- STT: support `provider`, transport `multipart`, models: `SenseVoiceSmall` (`FunAudioLLM/SenseVoiceSmall`), `TeleSpeechASR` (`TeleAI/TeleSpeechASR`)
- TTS: support `provider`, transport `binary`, models: `Fish-Speech-1.5` (`fishaudio/fish-speech-1.5`), `CosyVoice2-0.5B` (`FunAudioLLM/CosyVoice2-0.5B`), `IndexTTS-2` (`IndexTeam/IndexTTS-2`)
- TTS voices: static runtime list, default voice `fishaudio/fish-speech-1.5:alex`. Voices: `Alex` (`fishaudio/fish-speech-1.5:alex`), `Anna` (`fishaudio/fish-speech-1.5:anna`), `Bella` (`fishaudio/fish-speech-1.5:bella`), `Benjamin` (`fishaudio/fish-speech-1.5:benjamin`), `Charles` (`fishaudio/fish-speech-1.5:charles`), `Claire` (`fishaudio/fish-speech-1.5:claire`), `David` (`fishaudio/fish-speech-1.5:david`), `Diana` (`fishaudio/fish-speech-1.5:diana`)
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.
- Voice policy: TTS voice list is an intentional curated runtime subset (8 baked-in voices).

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### StepFun (`stepfun`)

- Catalog provider id: `stepfun`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `Step 3.5 Flash` (`step-3.5-flash`), `Step 3` (`step-3`), `Step 2 Mini` (`step-2-mini`), `Step 1o Audio` (`step-1o-audio`), `Step Audio 2` (`step-audio-2`), `Step Audio 2 Mini` (`step-audio-2-mini`), `Step Audio R1.1` (`step-audio-r1.1`)
- STT: support `provider`, transport `multipart`, models: `Step ASR` (`step-asr`), `Step ASR 1.1` (`step-asr-1.1`)
- TTS: support `provider`, transport `binary`, models: `Step TTS 2` (`step-tts-2`), `Step TTS Mini` (`step-tts-mini`), `Step TTS Vivid` (`step-tts-vivid`)
- TTS voices: static runtime list, default voice `cixingnansheng`. Voices: `磁性男声` (`cixingnansheng`)
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.
- Voice policy: TTS voice list is an intentional curated runtime subset (1 baked-in voices).

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### Tavily (`tavily`)

- Catalog provider id: `tavily`
- Overall status: Fully enabled for search only
- Search: enabled using `Tavily Search API`
- LLM: support `none`, transport `none`, models: none
- STT: support `none`, transport `none`, models: none
- TTS: support `none`, transport `none`, models: none
- Catalog delta: none
- Discovery note: No provider catalog document exists for this runtime provider; runtime source files are the source of truth.

#### Resolution

- No open runtime work remains.
- Search-only runtime coverage is intentional; a matching shared catalog provider document is optional and not required.

### Together (`together`)

- Catalog provider id: `together-ai`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `Kimi K2.5` (`moonshotai/Kimi-K2.5`), `GPT-OSS 20B` (`openai/gpt-oss-20b`), `GPT-OSS 120B` (`openai/gpt-oss-120b`), `GLM-5` (`zai-org/GLM-5`), `MiniMax M2.5` (`MiniMaxAI/MiniMax-M2.5`)
- STT: support `provider`, transport `multipart`, models: `Whisper Large v3` (`openai/whisper-large-v3`), `Parakeet TDT 0.6B v3` (`nvidia/parakeet-tdt-0.6b-v3`), `Voxtral Mini 3B` (`mistralai/Voxtral-Mini-3B-2507`)
- TTS: support `provider`, transport `binary`, models: `Orpheus 3B` (`canopylabs/orpheus-3b-0.1-ft`), `Kokoro` (`hexgrad/Kokoro-82M`)
- TTS voices: static runtime list, default voice `af_alloy`. Voices: `af_heart` (`af_heart`), `af_alloy` (`af_alloy`), `af_aoede` (`af_aoede`), `af_bella` (`af_bella`), `af_jessica` (`af_jessica`), `af_kore` (`af_kore`), `af_nicole` (`af_nicole`), `af_nova` (`af_nova`), `af_river` (`af_river`), `af_sarah` (`af_sarah`), `af_sky` (`af_sky`), `am_adam` (`am_adam`), `am_echo` (`am_echo`), `am_eric` (`am_eric`), `am_fenrir` (`am_fenrir`), `am_liam` (`am_liam`), `tara` (`tara`), `leah` (`leah`), `jess` (`jess`), `leo` (`leo`), `dan` (`dan`), `mia` (`mia`), `zac` (`zac`), `zoe` (`zoe`), `friendly sidekick` (`friendly sidekick`), `aura-2-thalia-en` (`aura-2-thalia-en`), `luna` (`luna`), `albion` (`albion`), `arcade` (`arcade`), `astra` (`astra`), `atrium` (`atrium`), `bond` (`bond`), `cupola` (`cupola`), `eliphas` (`eliphas`), `estelle` (`estelle`), `eucalyptus` (`eucalyptus`), `fern` (`fern`), `lintel` (`lintel`), `lyra` (`lyra`), `marlu` (`marlu`), `masonry` (`masonry`), `moss` (`moss`), `oculus` (`oculus`), `parapet` (`parapet`), `pilaster` (`pilaster`), `sirius` (`sirius`), `stucco` (`stucco`), `transom` (`transom`), `truss` (`truss`), `vashti` (`vashti`), `vespera` (`vespera`), `walnut` (`walnut`), `cove` (`cove`), `lagoon` (`lagoon`), `mari` (`mari`), `mesa_extra` (`mesa_extra`), `moon` (`moon`), `moraine` (`moraine`), `peak` (`peak`), `summit` (`summit`), `talon` (`talon`), `thunder` (`thunder`), `tundra` (`tundra`), `wildflower` (`wildflower`), `English_DeterminedMan` (`English_DeterminedMan`), `English_TrustworthMan` (`English_TrustworthMan`), `English_GracefulLady` (`English_GracefulLady`), `English_WiseWoman` (`English_WiseWoman`)
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.
- Voice policy: TTS voice list is an intentional curated runtime subset (68 baked-in voices).

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### NVIDIA (`nvidia`)

- Catalog provider id: `nvidia-nim`
- Overall status: Intentionally scoped
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `NVIDIA Nemotron Nano 9B v2` (`nvidia-nemotron-nano-9b-v2`), `NVIDIA Nemotron 3 Nano 30B A3B` (`nemotron-3-nano-30b-a3b`), `NVIDIA Nemotron 3 Super 120B A12B` (`nemotron-3-super-120b-a12b`), `Llama 3.3 Nemotron Super 49B v1` (`llama-3.3-nemotron-super-49b-v1`), `Llama 3.1 Nemotron 70B Instruct` (`llama-3.1-nemotron-70b-instruct`)
- STT: support `none`, transport `none`, models: none
- TTS: support `none`, transport `none`, models: none
- Catalog delta: Riva/NIM speech adapters stay out of runtime scope
- Catalog-only STT models: `Parakeet CTC 1.1B ASR` (`parakeet-ctc-1_1b-asr`), `Canary 1B ASR` (`canary-1b-asr`)
- Catalog-only TTS models: `Magpie TTS Multilingual` (`magpie-tts-multilingual`), `Magpie TTS Zeroshot` (`magpie-tts-zeroshot`), `Magpie TTS Flow` (`magpie-tts-flow`)
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.

#### Resolution

- No open implementation work remains under the current runtime policy.
- SchnackAI intentionally limits NVIDIA to the hosted OpenAI-compatible chat surface; the separate Riva/NIM speech adapter family stays out of scope.

### Novita (`novita-ai`)

- Catalog provider id: `novita-ai`
- Overall status: Fully enabled under curated picker policy
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `Deepseek V3.2` (`deepseek/deepseek-v3.2`), `Qwen3 235B A22B` (`qwen/qwen3-235b-a22b-fp8`), `Qwen3 Coder 30B A3B Instruct` (`qwen/qwen3-coder-30b-a3b-instruct`), `GLM 4.6V` (`zai-org/glm-4.6v`)
- STT: support `provider`, transport `novita-json`, models: `GLM Audio to Text` (`glm-asr`)
- TTS: support `provider`, transport `novita`, models: `MiniMax Speech-02 HD` (`minimax-speech-02-hd`), `MiniMax Speech-02 Turbo` (`minimax-speech-02-turbo`), `MiniMax Speech-2.6 HD` (`minimax-speech-2.6-hd`), `MiniMax Speech-2.6 Turbo` (`minimax-speech-2.6-turbo`), `MiniMax Speech 2.8 HD` (`minimax-speech-2.8-hd`), `GLM Text to Speech` (`glm-tts`), `Legacy Text to Speech` (`txt2speech`)
- TTS voices: static runtime list, default voice `tongtong`. Voices: `彤彤` (`tongtong`), `锤锤` (`chuichui`), `小陈` (`xiaochen`), `jam` (`jam`), `kazi` (`kazi`), `douji` (`douji`), `luodo` (`luodo`), `Emily` (`Emily`), `James` (`James`), `Olivia` (`Olivia`), `Michael` (`Michael`), `Sarah` (`Sarah`), `John` (`John`), `English expressive narrator` (`English_expressive_narrator`), `English determined man` (`English_DeterminedMan`), `English trustworth man` (`English_TrustworthMan`), `English graceful lady` (`English_GracefulLady`), `English wise woman` (`English_WiseWoman`)
- Catalog delta: none
- Picker policy: Runtime pickers intentionally use curated snapshot data from the bundled catalog; live model discovery is not part of the current scope.
- Voice policy: TTS voice list is an intentional curated runtime subset (18 baked-in voices).

#### Resolution

- No open implementation work remains under the current runtime policy.
- Curated model pickers and any baked-in voice subsets are intentional; update them only as routine catalog maintenance when upstream offerings change.

### Z.ai (`z-ai-zhipu-ai`)

- Catalog provider id: `z-ai-zhipu-ai`
- Overall status: Fully enabled
- Search: not exposed
- LLM: support `provider`, transport `openai-compatible`, models: `GLM-5` (`glm-5`), `GLM-5-Turbo` (`glm-5-turbo`), `GLM-4.7` (`glm-4.7`), `GLM-4.7-FlashX` (`glm-4.7-flashx`), `GLM-4.6` (`glm-4.6`), `GLM-4.5` (`glm-4.5`), `GLM-4.5-Air` (`glm-4.5-air`), `GLM-4.5-X` (`glm-4.5-x`), `GLM-4.5-AirX` (`glm-4.5-airx`), `GLM-4.5-Flash` (`glm-4.5-flash`), `GLM-4-32B-0414-128K` (`glm-4-32b-0414-128k`), `GLM-4.7-Flash` (`glm-4.7-flash`), `GLM-4-Long` (`glm-4-long`), `GLM-4-Flash-250414` (`glm-4-flash-250414`), `GLM-4-FlashX-250414` (`glm-4-flashx-250414`)
- STT: support `provider`, transport `multipart`, models: `GLM-ASR-2512` (`glm-asr-2512`)
- TTS: support `provider`, transport `binary`, models: `GLM-TTS` (`glm-tts`)
- TTS voices: static runtime list, default voice `tongtong`. Voices: `彤彤` (`tongtong`), `锤锤` (`chuichui`), `小陈` (`xiaochen`), `jam` (`jam`), `kazi` (`kazi`), `douji` (`douji`), `luodo` (`luodo`)
- Catalog delta: none
- Voice policy: TTS voice list is an intentional curated runtime subset (7 baked-in voices).

#### Resolution

- No open runtime work remains.
- Only routine catalog maintenance applies when upstream model or voice availability changes.
