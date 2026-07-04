# Provider Model Overhaul Design

**Date:** 2026-07-04
**Status:** Implementation-ready

## Problem

SchnackAI currently exposes more provider choices than a voice-first BYOK app
needs. Five runtime providers are dedicated web-search or web-data vendors
instead of conversational AI providers. They add API-key setup, validation,
storage, provider icons, web-search routing, tests, and user-facing settings
without improving the core voice conversation loop.

The app also needs a fresh provider/model audit after the recent model-list
work. The supported catalog should favor providers that can power a spoken
conversation: strong LLMs first, then STT, TTS, and provider-native web search
where the app actually has an integration path.

## Goals

- Remove runtime support for providers that are only web-search/web-data
  services: Brave, Exa, Firecrawl, SerpApi, and Tavily.
- Keep Perplexity only as a real Sonar LLM/search-answer provider.
- Keep provider and model choices aligned with official docs and the app's
  current transport paths.
- Remove deprecated, alias-only, wrong-endpoint, coding-only, image/video-only,
  Chinese-only, and Mandarin-only model rows from user-facing pickers.
- Update effort, reasoning, and thinking metadata for every kept provider where
  the provider documents a usable request parameter.
- Keep Settings readiness, provider validation, response-mode defaults,
  migrations, tests, and i18n consistent with the reduced provider set.

## Non-goals

- Reintroducing raw web-search vendors under a different UI bucket.
- Adding price estimation back into the app.
- Adding dedicated coding models. SchnackAI is about vocal communication, not
  coding workflows.
- Claiming provider web-search support where SchnackAI is still using a
  transport that cannot call the provider's search tool.
- Rebuilding every provider to a newer API family in this same change. API
  migrations are included only when required to make a supported model or
  capability honest.

## Provider Decisions

### Removed Runtime Providers

Remove these from `RuntimeAppProviderId`, `RUNTIME_PROVIDER_ORDER`,
`RUNTIME_PROVIDER_MANIFEST`, `WEB_SEARCH_PROVIDER_IDS`, default web-search
settings, validation surfaces, setup-guide support, and web-search service
dispatch:

- `brave`
- `exa`
- `firecrawl`
- `serpapi`
- `tavily`

These providers may remain as historical catalog documents only if they are no
longer mapped as app providers. They must not appear in Settings, setup, web
search provider pickers, SecureStore key loading, or runtime validation.

### Kept Providers

Keep these runtime providers:

- `openai`
- `anthropic`
- `gemini`
- `xai`
- `mistral`
- `deepseek`
- `moonshot-ai-kimi`
- `perplexity`
- `alibaba-qwen-dashscope`
- `bytedance-doubao-seed`

Rationale:

- OpenAI, Google/Gemini, Alibaba/Qwen, Mistral, and xAI have strong alignment
  with voice-first usage because they provide LLMs plus at least one speech
  capability in public docs.
- Anthropic, DeepSeek, Kimi, and Perplexity remain useful as BYOK LLM routes
  even without native app-wired STT/TTS because SchnackAI has native speech
  input/output fallback.
- Perplexity is kept as an answer-synthesis LLM provider, not as a raw search
  vendor.
- ByteDance/Doubao remains as a LLM provider, but speech support must be
  curated carefully because public speech docs are China-first and some routes
  are not useful for non-Chinese users.

## Model Rules

For all user-facing pickers:

- Prefer canonical stable model IDs over rolling aliases when both exist.
- Keep only models that work through the service layer currently used by the
  app.
- Remove pure coding, image, video, OCR, embedding, moderation, and agent-only
  SKUs from conversation pickers.
- Remove models whose official docs identify them as deprecated, retired, or
  wrong-endpoint for the current integration.
- Remove Chinese-only or Mandarin-only speech models from STT/TTS pickers.
- Keep multilingual models from providers based in China when they are useful
  for non-Chinese users.

## Capability Rules

### LLM

LLM capability is enabled only when the provider has a working runtime
transport in `src/services/llm.ts`:

- OpenAI-compatible chat completions.
- Gemini native `generateContent`.
- Anthropic Messages.
- Existing realtime transports where explicitly listed.

Models that require Responses, Conversations, Agents, Interactions, or another
non-wired endpoint are not exposed unless the corresponding service path is
implemented in this overhaul.

### STT

Provider STT stays enabled only when SchnackAI can submit recorded audio through
a stable route that is useful for non-Chinese users.

Expected outcomes:

- Keep OpenAI STT.
- Keep Google Cloud Speech STT through the existing combined credential path.
- Keep xAI STT through the standalone `/v1/stt` route.
- Keep Mistral Voxtral batch STT and update the default to the current V2 model
  if the runtime endpoint accepts the documented model ID.
- Keep Alibaba/Qwen STT only for the multilingual Qwen ASR route already wired
  through the app.
- Remove or disable ByteDance/Doubao provider STT if the wired route cannot be
  supported as a multilingual non-Chinese STT option.

### TTS

Provider TTS stays enabled only when SchnackAI can generate speech from text
through a straightforward BYOK route.

Expected outcomes:

- Keep OpenAI TTS.
- Keep Gemini TTS.
- Keep xAI TTS.
- Keep Alibaba/Qwen TTS if the existing DashScope route remains valid for
  multilingual non-realtime TTS.
- Do not mark Mistral TTS as app-wired unless the app implements the required
  `/v1/audio/speech` route and voice-selection flow. Mistral's current TTS docs
  emphasize reusable voices or reference audio; that is not the same contract as
  SchnackAI's simple named-voice picker.

### Web Search

After dropping search-only vendors, web search providers should be provider
native and app-wired.

Initial supported runtime web-search providers:

- OpenAI, because the app already uses the Responses web-search tool.
- Perplexity, because the app already uses Sonar chat completions for grounded
  answers.

Do not expose Anthropic, Google/Gemini, Alibaba/Qwen, ByteDance/Doubao,
Mistral, xAI, or Kimi as web-search providers unless their provider-native
search route is implemented in `src/services/webSearch.ts`. Some of those
providers document web search, but several require a different API family than
the app currently uses.

## Effort Rules

Keep effort controls only where the provider documents a stable request
parameter that the service layer sends correctly:

- OpenAI and xAI: `reasoning_effort`.
- Anthropic: output/adaptive effort if supported by the Messages integration.
- Gemini: `generationConfig.thinkingConfig.thinkingLevel`.
- DeepSeek: `thinking.type` and `reasoning_effort`.
- Mistral: `reasoning_effort` for models documented to support it.
- Alibaba/Qwen: `enable_thinking`.
- ByteDance/Doubao: `reasoning.effort` only if the OpenAI-compatible request
  body currently accepts it; otherwise omit effort from Doubao pickers.
- Kimi: `thinking.type`.
- Perplexity: only keep effort where Sonar API docs document an equivalent
  request control; otherwise remove effort metadata from Perplexity models.

Provider-documented defaults win. If a model has effort options but no provider
default is documented, default to the normal/medium option when present.

## Data Flow

Provider capability data flows through:

1. `src/constants/providers/runtimeManifest.ts`
2. `src/constants/providers/catalogData.ts`
3. `src/constants/providers/defaults.ts`
4. `src/constants/providers/providerMetadata.ts`
5. `src/constants/models.ts`
6. `src/types.ts`
7. settings persistence and migration helpers
8. Settings/provider UI
9. LLM/STT/TTS/web-search services

The runtime manifest remains the source of truth. Derived maps and defaults
should continue to be generated from the manifest wherever possible.

## Migration

Existing installs may contain removed provider IDs in:

- `apiKeys`
- `lastProvider`
- `responseModes`
- `activeResponseMode`
- `sttProvider`
- `ttsProvider`
- `webSearchProvider`
- `webSearchProviderSettings`
- provider model maps

Normalization must repair these values to valid kept providers. Removed
search-only providers should not crash older installs or leave unreachable
settings selected.

## Testing

Add or update tests for:

- Removed providers are absent from `PROVIDER_ORDER`,
  `WEB_SEARCH_PROVIDER_IDS`, default settings, and setup-guide provider lists.
- Stored removed provider selections migrate to valid kept providers.
- Curated model lists match the new provider decisions.
- Effort option defaults and request-body mappings match documented provider
  behavior.
- Web-search service dispatch only accepts currently wired providers.
- Provider validation/readiness does not treat removed providers as selectable.
- Full translation parity remains green.

## Verification

Required verification before completion:

- `git diff --check`
- `npx tsc --noEmit`
- Focused Jest for provider constants, model effort, provider validation,
  response modes, settings normalization, LLM, STT, TTS, and web search.
- Full `npm test -- --runInBand --forceExit`.
- Obsidian update with final kept/dropped provider decisions and commit hash.

## Official Sources Consulted

- OpenAI model/pricing, speech-to-text, and text-to-speech docs.
- Anthropic model overview, extended thinking, and web search docs.
- Google Gemini model, pricing, and Gemini 3.x docs.
- Alibaba Model Studio model, thinking, ASR, TTS, and web-search docs.
- Volcengine Ark/Doubao model, pricing, reasoning, speech, and web-search docs.
- xAI model, reasoning, speech, and web-search/tool docs.
- DeepSeek V4, chat completion, and thinking mode docs.
- Mistral model overview, reasoning, audio, and agent-tool docs.
- Kimi K2.6, thinking, and web-search docs.
- Perplexity Sonar model, Search, and API-reference docs.
