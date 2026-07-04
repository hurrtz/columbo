# Provider Model Overhaul Implementation Plan

> **For Tobias:** This plan executes the active goal to remove search-only
> providers and refresh the supported provider/model/effort catalog. It assumes
> the design in
> `docs/superpowers/specs/2026-07-04-provider-model-overhaul-design.md`.

**Goal:** Reduce SchnackAI's provider surface to conversational providers that
make sense for a voice-first BYOK app, keep Perplexity only as a Sonar
LLM/search-answer provider, and make model/effort/speech/search metadata honest
against official docs and the app's current transports.

## Phase 1: Guardrails

- Add/update tests that assert Brave, Exa, Firecrawl, SerpApi, and Tavily are no
  longer runtime providers or web-search providers.
- Add/update settings migration tests for stored removed web-search selections.
- Update provider/model effort tests to reflect documented controls only.

## Phase 2: Remove Search-Only Runtime Providers

- Remove `brave`, `exa`, `firecrawl`, `serpapi`, and `tavily` from:
  - `RuntimeAppProviderId`
  - `RUNTIME_PROVIDER_ORDER`
  - `RUNTIME_PROVIDER_MANIFEST`
  - `WEB_SEARCH_PROVIDER_IDS`
  - default web-search provider settings
  - provider icon runtime map
- Remove the now-unused `searchOnlyProviderEntry` helper.
- Keep historical notes/docs only where clearly marked as obsolete or update
  docs to match the new provider roster.

## Phase 3: Simplify Web Search Runtime

- Keep web search wired only for:
  - `openai`
  - `perplexity`
- Remove Tavily, Brave, Exa, Firecrawl, and SerpApi request builders,
  normalizers, timeout entries, provider-kind entries, and tests.
- Ensure stored removed web-search providers migrate to `openai`.

## Phase 4: Refresh Kept Provider Models And Effort

- Keep current conversational provider set:
  - OpenAI
  - Anthropic
  - Google/Gemini
  - xAI
  - Mistral
  - DeepSeek
  - Moonshot/Kimi
  - Perplexity
  - Alibaba/Qwen
  - ByteDance/Doubao
- Remove deprecated, alias-only, wrong-endpoint, coding-only, image/video-only,
  Chinese-only, and Mandarin-only rows from user-facing pickers.
- Keep effort controls only where provider docs expose a stable parameter and
  the app sends it correctly.
- Update Mistral STT to the canonical current Voxtral Mini Transcribe 2 ID.
- Remove Perplexity effort metadata unless an official Sonar parameter is found.
- Disable ByteDance provider STT unless it remains clearly useful for
  non-Chinese users through the wired route.

## Phase 5: Settings, i18n, Docs

- Make Settings provider readiness and setup-guide support reflect the reduced
  provider roster.
- Keep English and German user-facing strings structurally aligned if any copy
  changes.
- Update `docs/provider-runtime-reference.md` to match the new provider set.

## Phase 6: Verification And Commit

- Run `git diff --check`.
- Run `npx tsc --noEmit`.
- Run focused provider/settings/web-search/LLM/STT/TTS tests.
- Run full Jest with `npm test -- --runInBand --forceExit`.
- Update Obsidian with decisions, verification, commit hash, and remaining
  caveats.
- Commit the completed overhaul.
