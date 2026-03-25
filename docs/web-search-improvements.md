# Web Search And Transparency Improvements

This file tracks the remaining feature work requested for SchnackAI's web-search and pipeline transparency layer. It is temporary and will be removed after all items below are implemented.

## 1. Web-search citations in the conversation UI

Steps:
1. Extend the persisted `Message` shape with assistant-response metadata that can store web-search attribution and citation sources.
2. Pass normalized web-search result details from the voice pipeline through the completion callback into the stored assistant message.
3. Render source links in transcript bubbles for assistant messages that used web search.
4. Keep the inline source UI compact in both the preview transcript and the full transcript modal.
5. Add tests for message metadata persistence and citation rendering.

## 2. A visible "this answer used web search" marker per message

Steps:
1. Add a compact per-message marker in assistant chat bubbles.
2. Use the same message metadata that powers citations so the marker is only shown when search actually ran.
3. Make the marker visually distinct from the model chip without adding too much noise.
4. Cover the marker state in transcript rendering tests.

## 3. An auto web-search mode instead of only manual on/off

Steps:
1. Replace the binary `webSearchEnabled` setting with a mode enum such as `off | auto | on`.
2. Migrate stored settings safely so existing installs preserve behavior.
3. Add heuristic gating that decides whether a given request is freshness-sensitive enough to trigger search in `auto`.
4. Update the home-screen control and settings tab to expose the three modes clearly.
5. Record whether search was configured, considered, triggered, skipped by heuristic, or skipped by missing provider configuration.
6. Add focused tests for settings migration and the auto-trigger logic.

## 4. Better retry/fallback transparency for STT/TTS/search failures

Steps:
1. Introduce persisted assistant-message diagnostics that can store pipeline notices and fallback events.
2. Capture STT timeout/failure, web-search fallback, and TTS fallback information at the point where the voice pipeline already knows about them.
3. Attach those notices to the assistant reply that was ultimately produced, or to the related user message if no assistant reply exists.
4. Render the notices in the transcript UI in a compact, readable format.
5. Keep the existing toasts, but make the transcript itself the durable record of what happened.
6. Add tests for the new diagnostics metadata and rendering.

## 5. Per-provider quality controls for web search like result count, depth, or search mode

Steps:
1. Extend the web-search settings model with provider-aware controls such as result limit and optional quality mode/depth.
2. Define sane defaults and merge logic for existing installs.
3. Map the controls only onto providers that actually support them, while keeping the UI stable for providers that do not.
4. Thread the configured controls into the request builders for Tavily, Brave, Exa, Firecrawl, SerpApi, OpenAI, and Perplexity where appropriate.
5. Reflect the effective configuration in validation and debug logging.
6. Add service tests that verify provider-specific request payloads/query params.

## 6. Richer validation in settings, for example showing which providers are configured and healthy at a glance

Steps:
1. Add derived provider-health summaries for the core provider tab and the web-search tab.
2. Show whether a provider is unconfigured, configured but unvalidated, validating, healthy, or failing validation.
3. Surface health state directly in the provider grid rather than only inside the selected provider card.
4. Keep validation state per provider so switching between providers does not discard recent results.
5. Reuse the same pattern for web-search providers and standard providers.
6. Add UI tests for the new health-state indicators.
