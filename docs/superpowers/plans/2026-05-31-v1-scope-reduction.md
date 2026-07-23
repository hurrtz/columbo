# Mr Broccoli v1 Scope Reduction — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Shrink Mr Broccoli to a focused, launchable v1 by removing the cost/pricing system, reducing the voice backend matrix to one STT + one TTS path, and culling the provider catalog from 42 providers to a 3–5 "core" set.

**Architecture:** The app keys nearly all provider state off the `Provider` union in `src/constants/providers/runtimeManifest.ts`, with `Record<Provider, …>` maps generated from `RUNTIME_PROVIDER_MANIFEST` / `PROVIDER_ORDER`. Shrinking the manifest therefore propagates through the type system — `tsc --noEmit` becomes the primary safety net for the cull. Work proceeds in four independent, individually-shippable phases, smallest-and-safest first.

**Tech Stack:** Expo SDK 55, React Native 0.83, React 19, TypeScript (strict), Jest + @testing-library/react-native.

**Baseline verification (run before starting any phase):**
```bash
npx tsc --noEmit && npm test
```
Capture the passing baseline so each phase can be diffed against it.

---

## Decisions locked for this plan

- **Core LLM/voice providers (9, Phase 3):** `openai`, `anthropic`, `gemini`, `xai` (merged — see below), `mistral`, `bytedance-doubao-seed`, `deepseek`, `alibaba-qwen-dashscope` (Qwen), `moonshot-ai-kimi` (Kimi).
- **xAI merge:** the codebase currently splits xAI into `xai` (Grok LLM) and `grok` (standalone voice endpoints). **Merge into a single `xai` provider** exposing LLM + STT + TTS under one credential.
- **STT (Phase 2):** capability-gated across the core set — **native** system recognizer (always, no key) **plus** provider STT for `openai`, `gemini`, `xai`, `mistral`, `bytedance-doubao-seed`, `alibaba-qwen-dashscope`. (Anthropic, DeepSeek, Moonshot = LLM-only, no STT.)
- **TTS (Phase 2):** capability-gated — **native** `expo-speech` fallback (always) **plus** provider TTS for `openai`, `gemini`, `xai`, `bytedance-doubao-seed`, `alibaba-qwen-dashscope`. **Remove** on-device ONNX/local TTS (Kokoro/Sherpa) and realtime TTS transports.
- **Web search (kept, selectable list):** web search is essential (post-cutoff knowledge). Keep it as a **user-selectable provider list**: native per-model search where available (`openai`, `anthropic`, `gemini`, `xai`) **plus** dedicated backends usable with ANY model (`perplexity`, `tavily`, `brave`, `exa`, `firecrawl`, `serpapi`). The user always chooses which provider runs.

**Capability matrix (verified from `verifiedSupport`):**

| Provider | LLM | STT | TTS |
|---|---|---|---|
| openai | ✅ | ✅ | ✅ |
| anthropic | ✅ | — | — |
| gemini | ✅ | ✅ (partial) | ✅ |
| xai (merged) | ✅ | ✅ | ✅ |
| mistral | ✅ | ✅ | — |
| bytedance-doubao-seed | ✅ | ✅ | ✅ |
| deepseek | ✅ | — | — |
| alibaba-qwen-dashscope | ✅ | ✅ | ✅ |
| moonshot-ai-kimi | ✅ | — | — |

> **Realtime caveat:** Gemini/xAI STT are marked `partial`. Keep the non-realtime provider transport for each kept provider; defer/remove realtime-only transports (`openai-realtime`, `gemini-live`, `*-realtime`) **unless** a kept provider's only working path is realtime — verify per provider in Phase 2 Step 2.1.

---

## Phase ordering & independence

| Phase | What | Depends on | Shippable alone |
|---|---|---|---|
| 1 | Remove pricing/cost system | nothing | ✅ |
| 2 | Trim voice backends: capability-gated STT/TTS, drop on-device + realtime | nothing (independent of 1) | ✅ |
| 3 | Cull providers 42 → 9 core (+ search backends), merge xAI | easier after 1 & 2 (less surface) | ✅ |
| 4 | Break up god files + refresh docs | 1–3 (falls out of them) | ✅ |
| 5 | UX: onboarding, humanized copy, collapse controls, Advanced bucket | best after 1–3 | ✅ |

Each phase ends green on `npx tsc --noEmit && npm test` and is committed as its own PR.

**Product thesis:** *Depth over speed.* The app deliberately trades latency for answer quality — the opposite of OpenAI/Claude voice modes, which feel snappy but shallow. Speed is **not** a goal (so no fast-inference hosts). The corollary for UX: when a deep answer takes 30–60s, the **waiting experience must reassure** rather than read as broken.

**Distribution & audience:** Ships via **AltStore PAL** on iOS (not the App Store — Apple rejects BYOK key entry under rule 3.1.1). Audience = technical, BYOK-comfortable users. This *lowers* the onboarding-intimidation risk, so Phase 5 can keep onboarding light and need not hide power surfaces aggressively.

**Product direction (drives Phase 5):** *Hybrid — simple front, deep back.* The voice-first surface is calm and vendor-agnostic; multi-provider/model routing is **kept** but demoted into a clearly-marked **Advanced/Pro** area. Phase 5 relocates and de-emphasizes power features rather than removing them.

---

## Phase 1 — Remove the pricing / cost system

**Why:** Costs are doubly estimated (heuristic token counts × hand-entered, dated prices), always `source: "estimated"`, and hidden by default (`showUsageStats: false`). Showing a precise-looking but fictional dollar figure is a launch liability.

**Files touched:**
- Delete: `src/constants/usagePricing.ts`
- Delete: `src/components/settings/UsagePricingReferenceSection.tsx`
- Modify: `src/types.ts` (drop USD fields from `UsageEstimate`)
- Modify: `src/utils/usageStats.ts` (drop cost aggregation + `formatUsd`)
- Modify: `src/catalog/types.ts` (drop `priceMeasurements` from model docs) — **optional**, see Task 1.6
- Modify: `src/catalog/appProviders.ts` (`getCatalogPriceMeasurementsForAppProvider`)
- Modify: `src/components/settings/shared.tsx`, `src/components/settings/UiTab.tsx` (remove pricing-section wiring)
- Modify: `src/i18n/locales/en.ts` + `src/i18n/locales/de.ts` (remove pricing keys)
- Tests: `__tests__/utils/usageStats.test.ts`, `__tests__/catalog/*` (update expectations)

- [ ] **Step 1.1 — Map all references (verify nothing was missed)**

Run:
```bash
grep -rln "usagePricing\|PRICING_ASSUMPTION\|findPricingAssumption\|inputCostUsd\|outputCostUsd\|totalCostUsd\|formatUsd\|priceMeasurements\|UsagePricingReference\|estimatedCost\|pricingAssumption" src __tests__
```
Expected: the set already known — `usageStats.ts`, `types.ts`, `usagePricing.ts`, `UsagePricingReferenceSection.tsx`, `shared.tsx`, `UiTab.tsx`, `appProviders.ts`, `catalog/types.ts`, plus tests. Reconcile any new hits into the task list before proceeding.

- [ ] **Step 1.2 — Update `usageStats.test.ts` first (TDD: define the post-removal contract)**

In `__tests__/utils/usageStats.test.ts`, delete assertions on `totalCostUsd`, `inputCostUsd`, `outputCostUsd`, `pricedEntryCount`, `unpricedEntryCount`, and `formatUsd`. Keep token-count assertions (`promptTokens`, `completionTokens`, `totalTokens`, `replyCount`, `summaryCount`).

Run: `npx jest __tests__/utils/usageStats.test.ts`
Expected: FAIL to compile (references to removed-but-still-present symbols differ) — this is the red state guiding the edit.

- [ ] **Step 1.3 — Strip USD from `UsageEstimate` in `src/types.ts`**

Change the interface (types.ts:121-130) to:
```ts
export interface UsageEstimate {
  kind: UsageEstimateKind;
  source: "estimated";
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}
```
(Removed: `inputCostUsd`, `outputCostUsd`, `totalCostUsd`.)

- [ ] **Step 1.4 — Rewrite `src/utils/usageStats.ts`**

Remove `import { findPricingAssumption }`, `findPricing`, `tokensToUsd`, `roundTo`, `formatUsd`, and all `*CostUsd` / `pricedEntryCount` / `unpricedEntryCount` fields from `ConversationUsageTotals`, `ConversationUsageRouteTotals`, `estimateChatUsage`, `aggregateConversationUsage`, and `aggregateConversationUsageByRoute`. `estimateChatUsage` returns only the token fields. Keep `formatTokenCount`.

- [ ] **Step 1.5 — Delete the price source files & UI**

```bash
git rm src/constants/usagePricing.ts src/components/settings/UsagePricingReferenceSection.tsx
```
Then remove the `UsagePricingReferenceSection` import + render site in `src/components/settings/shared.tsx` and/or `src/components/settings/UiTab.tsx` (whichever renders it — grep from Step 1.1). Remove the `showUsageStats`-adjacent cost copy in `UiTab.tsx` if it references cost.

- [ ] **Step 1.6 — Catalog price fields (decide scope)**

Two options:
- **Minimal:** keep `priceMeasurements` in the catalog data (harmless, just unused) and only delete `getCatalogPriceMeasurementsForAppProvider` from `src/catalog/appProviders.ts`. Faster; leaves dead data that Phase 3 deletes anyway.
- **Thorough:** remove `priceMeasurements` from `CatalogModelDocument` in `src/catalog/types.ts`, the builder in `data/providers/definitions.ts`, and every `priceMeasurements: [...]` block across `data/providers/*`. Large mechanical change — **defer to Phase 3**, where most of that data is deleted with the providers.

Recommended: take the **minimal** path here, delete the accessor, and let Phase 3 remove the rest with the culled providers.

- [ ] **Step 1.7 — Remove i18n keys**

In `src/i18n/locales/en.ts` and `de.ts`, delete: `estimatedCost`, `estimatedCostPartial`, `pricingAssumptions`, `pricingAssumptionsHint`, `pricingAssumptionRates`, `pricingAssumptionCheckedAt`, `openPricingSource`, and the `source` key if only used by the pricing section. Update `src/i18n/types.ts` if it enumerates keys.

- [ ] **Step 1.8 — Verify green**

Run: `npx tsc --noEmit && npm test`
Expected: PASS. Fix any remaining references surfaced by `tsc`.

- [ ] **Step 1.9 — Commit**

```bash
git add -A && git commit -m "feat: remove estimated cost/pricing system"
```

---

## Phase 2 — Trim voice backends: capability-gated STT/TTS, drop on-device + realtime

**Why:** The complexity worth cutting is the **on-device ONNX/local TTS stack** (`onnxruntime-react-native`, `react-native-sherpa-onnx`, Kokoro tokenizer, per-language strategies — the largest native footprint, used by almost no one) and the **realtime transports** (extra protocol surface). Provider STT/TTS themselves stay, but only for the culled core providers that support them. Net: keep `native` + `provider` modes; remove `local`; remove realtime unless a kept provider needs it.

**Target end state:**
- `SttBackendMode = "native" | "provider"` (unchanged shape; provider list narrows to core STT providers in Phase 3).
- `TtsBackendMode = "native" | "provider"` only (**drop `"local"`**).
- Remove on-device/local TTS entirely; remove realtime STT/TTS transports (per Step 2.1 verification).
- Web search untouched here (kept as a selectable list; only its provider roster narrows in Phase 3).

**Files touched (primary):**
- `src/types.ts` (`SttBackendMode`, `TtsBackendMode`, settings fields `localTtsVoices`, related)
- `src/hooks/useSettings.ts` + `src/hooks/settings/*` (migration: coerce stored `"provider"`/`"local"`/realtime → allowed values)
- Delete: `src/services/localTts.ts`, `src/services/localTts/**`, `src/services/nativeLocalTts.ts`, `src/hooks/useLocalTtsPacks.ts`, `src/constants/localTts.ts` (or trim to language labels still used)
- Delete: `src/services/tts/localRoute.ts`, `src/services/tts/realtimeProviders.ts`, `src/services/whisper/realtimeProviders.ts`, `src/services/whisper/realtimeAudio.ts`
- Trim: `src/services/tts/providerRoute.ts` (keep only OpenAI binary path), `src/services/whisper/providers.ts` (native-only ⇒ may collapse substantially)
- Settings UI: `src/components/settings/SttTab.tsx`, `TtsTab.tsx`, `TtsSections.tsx`, `ListenLanguageSelector.tsx`, `SpeechDiagnosticsSection.tsx`
- `package.json`: remove `onnxruntime-react-native`, `react-native-sherpa-onnx`, `@dr.pogodin/react-native-fs` (if only used by local TTS — verify), then `npx pod-install`
- Tests: `__tests__/services/whisper.test.ts`, `tts.test.ts`, local-TTS tests

- [ ] **Step 2.1 — Inventory the local/realtime surface**

Run:
```bash
grep -rln "localTts\|LocalTts\|nativeLocalTts\|sherpa\|onnxruntime\|kokoro\|Kokoro\|realtime\|Realtime" src __tests__ data | sort
```
Produce a delete-vs-trim list from the output. Anything under `localTts/`, `*realtime*`, `nativeLocalTts` → delete. `providerRoute.ts` / `whisper/providers.ts` → trim.

- [ ] **Step 2.2 — Drop the `local` TTS mode in `src/types.ts` (TDD via tsc)**

```ts
export type SttBackendMode = "native" | "provider"; // unchanged
export type TtsBackendMode = "native" | "provider"; // drop "local"
```
Remove `localTtsVoices` from `Settings` and `LocalTtsVoiceSelections` from the type set.

Run: `npx tsc --noEmit`
Expected: FAIL with every site that referenced `"local"` TTS / `localTtsVoices`. This error list is the work-list for the local-TTS removal.

- [ ] **Step 2.3 — Add settings migration**

In `src/hooks/settings/mergeStoredSettings.ts` (and/or `useSettings.ts`), coerce persisted values from existing installs:
```ts
ttsMode: stored.ttsMode === "local" ? "native" : stored.ttsMode, // local → native; keep native/provider
```
Drop `localTtsVoices` on read. (STT mode is unchanged — `native`/`provider` both stay.) Add/adjust a focused test in `__tests__/hooks/useSettings.test.ts` asserting a stored `{ ttsMode: "local" }` migrates to `{ ttsMode: "native" }`.

- [ ] **Step 2.4 — Delete local/realtime service + hook files**

```bash
git rm -r src/services/localTts src/services/localTts.ts src/services/nativeLocalTts.ts \
  src/hooks/useLocalTtsPacks.ts src/services/tts/localRoute.ts \
  src/services/tts/realtimeProviders.ts src/services/whisper/realtimeProviders.ts \
  src/services/whisper/realtimeAudio.ts
```
Trim `src/constants/localTts.ts` to only the `getTtsListenLanguageLabel` / language-label exports still imported by the UI (grep first); delete if nothing remains.

- [ ] **Step 2.5 — Trim TTS routing to the core TTS providers**

In `src/services/tts/providerRoute.ts`, keep the provider branches for the core TTS providers — `openai`, `gemini`, `xai` (merged Grok voice), `bytedance-doubao-seed`, `alibaba-qwen-dashscope` — and remove every other provider branch (deepinfra, deepgram, fish-audio, hyperbolic, minimax, novita, elevenlabs, replicate, azure-speech, baidu, etc.) plus the now-unused `RuntimeTtsBinaryRequestFormat` entries. Remove the `local` route entirely (`src/services/tts/localRoute.ts`). Defer realtime TTS (`realtimeProviders.ts`) per Step 2.1. Update `src/services/tts.ts` routing and `src/services/tts/shared.ts`.

- [ ] **Step 2.6 — Trim STT routing to the core STT providers**

In `src/services/whisper/providers.ts` and `src/services/whisper.ts`, keep the native recognizer (`src/hooks/nativeSpeechRecognizer/**`) and the provider STT paths for `openai`, `gemini`, `xai`, `mistral`, `bytedance-doubao-seed`, `alibaba-qwen-dashscope`; remove all other provider STT branches. Remove realtime STT transports and `src/services/whisper/realtimeAudio.ts`/`realtimeProviders.ts` consumers unless Step 2.1 found a kept provider whose only path is realtime (e.g. verify xAI/Gemini `partial` STT).

- [ ] **Step 2.7 — Prune settings UI**

Keep the STT mode toggle (`App Native` / `Provider`) and the STT provider/model selectors in `SttTab.tsx` (the provider list narrows in Phase 3). In `TtsTab.tsx`/`TtsSections.tsx`: change the TTS mode control from three options (`App Native` / `Local` / `Provider`) to two (`App Native` / `Provider`) and remove all **local-TTS pack** UI + language-pack install flows. Remove `installLocalTtsLanguage` wiring from `MainScreen.tsx` (the `handleInstallLocalTtsLanguage` block ~MainScreen.tsx:303) and the `useLocalTtsPacks` usage (MainScreen.tsx:122). Keep `SpeechDiagnosticsSection.tsx` (provider diagnostics still relevant); it moves under Advanced in Phase 5.

- [ ] **Step 2.8 — Remove native deps**

Confirm `onnxruntime-react-native`, `react-native-sherpa-onnx`, and `@dr.pogodin/react-native-fs` are now unreferenced:
```bash
grep -rln "onnxruntime\|sherpa\|react-native-fs" src
```
If clean, remove them from `package.json`, then:
```bash
npm install && npx pod-install
```

- [ ] **Step 2.9 — Verify green (typecheck, tests, and a real build)**

```bash
npx tsc --noEmit && npm test
```
Then a native smoke build (local-TTS removal changes native deps, so OTA is not enough):
```bash
npm run ios
```
Expected: app launches, native STT records, OpenAI TTS plays, native TTS fallback works with no key.

- [ ] **Step 2.10 — Commit**

```bash
git add -A && git commit -m "feat: reduce voice backends to native STT + OpenAI/native TTS"
```

---

## Phase 3 — Cull providers 42 → core set

**Why:** 38.7k LOC of catalog data + a 1,982-line manifest for ~4 launch providers is the single largest maintenance liability and bundles a vendor encyclopedia into the app.

**Target keep-list:**
- **9 LLM/voice providers:** `openai`, `anthropic`, `gemini`, `xai` (merged), `mistral`, `bytedance-doubao-seed`, `deepseek`, `alibaba-qwen-dashscope`, `moonshot-ai-kimi`.
- **Dedicated web-search providers (kept, selectable):** `perplexity`, `tavily`, `brave`, `exa`, `firecrawl`, `serpapi`.
- Everything else in the 42-provider catalog and the `RuntimeAppProviderId` union is removed.

**Files touched (primary):**
- `src/constants/providers/runtimeManifest.ts` (shrink `RuntimeAppProviderId` union + manifest entries)
- `src/constants/providers/catalogData.ts` (`PROVIDER_ORDER`, metadata), `providerMetadata.ts`, `runtimeState.ts`
- `data/providers/index.ts` + delete unused `data/providers/<provider>/` dirs
- `data/providers/definitions.ts` (only if removing `priceMeasurements` — Phase 1 Task 1.6 thorough path)
- `src/constants/providers/defaults.ts` (`DEFAULT_RESPONSE_MODES` — see fallout below)
- `src/components/ProviderIcon.tsx` (drop removed brands)
- `src/i18n/*` provider labels; `__tests__/catalog/*`, `__tests__/utils/responseModes.test.ts`

- [ ] **Step 3.1 — Merge `xai` + `grok` into one `xai` provider**

The catalog/manifest split xAI into `xai` (Grok LLM, `verifiedSupport.llm = native`) and `grok` (voice-only endpoints, `verifiedSupport = { stt: native, tts: native }`). Consolidate into a single `xai` provider whose `verifiedSupport` is `{ llm: native, stt: native, tts: native }`, merging the model docs from `data/providers/grok/*` (stt/tts) into `data/providers/xai/*`, and the `grok-speech` TTS binary format + STT transport into the `xai` runtime manifest entry. Delete the standalone `grok` provider id from `RuntimeAppProviderId`. Update `ProviderIcon.tsx`/labels so the merged provider shows as xAI/Grok. Re-run `npm run catalog:test` to confirm `assertProviderDocument` still passes.

- [ ] **Step 3.2 — Shrink the `RuntimeAppProviderId` union (TDD via tsc)**

Edit `src/constants/providers/runtimeManifest.ts:4-46` down to the keep-list (9 LLM/voice + 6 web-search ids), and delete the corresponding `RUNTIME_PROVIDER_MANIFEST` entries.

Run: `npx tsc --noEmit`
Expected: FAIL at every literal reference to a removed provider (`DEFAULT_RESPONSE_MODES`, tests, `ProviderIcon`, etc.). This is the cull work-list.

- [ ] **Step 3.3 — Replace hardcoded default response modes with provider-derived mapping**

There are **no hardcoded default models**. Remove the static `DEFAULT_RESPONSE_MODES` (defaults.ts:41, which pins `groq`/`anthropic`/`openai`). Instead:
- `DEFAULT_SETTINGS.responseModes` starts unset/placeholder; the home modes are inert until a provider is configured (the existing `voiceInputDisabled`/credential gating already covers the no-key state).
- When the **first** provider is configured (via the onboarding wizard or Settings → Credentials), auto-map the three modes (`quick`/`normal`/`deep` internal keys → Chat/Reason/Research) to three LLM models **of that provider** taken from the trimmed catalog (first three by catalog order; pad by repetition if the provider exposes fewer than three). Picks don't need to be "right" — users re-map freely.
- Implement as a pure helper `deriveResponseModesForProvider(provider): ResponseModeSelections` in `src/utils/responseModes.ts`, invoked from `src/hooks/settings/useSettingsActions.ts` (or `useSettings.ts`) on the no-provider → first-provider transition. Don't overwrite modes the user has already set.

Tests: add `responseModes.test.ts` cases for the derivation (3+ models, <3 models, already-configured no-op); update `useSettings.test.ts` to assert first-provider configuration populates modes from that provider and a fresh install has no pinned provider.

- [ ] **Step 3.4 — Delete catalog data dirs + manifest imports**

Keep `data/providers/` dirs for the 9 core providers (after the xAI merge folds `grok/` into `xai/`). For every other provider, `git rm -r data/providers/<provider>/` and remove its import + array entry in `data/providers/index.ts`. Remove removed ids from `PROVIDER_ORDER` in `catalogData.ts` and from `providerMetadata.ts`. Remove their brands from `ProviderIcon.tsx` and labels from i18n. (The dedicated web-search providers `brave`/`tavily`/`exa`/`serpapi`/`firecrawl` are config-only in `webSearch.ts`, not `data/providers/` catalog dirs — leave them.)

- [ ] **Step 3.5 — Keep web search; narrow nothing**

Per the decision, web search stays a **user-selectable provider list**. Leave `src/services/webSearch.ts`, `webSearchHeuristics.ts`, `WebSearchTab.tsx`, `src/constants/webSearch.ts`, the `webSearch*` `Settings` fields, and the `voicePipeline.ts` web-search block intact. Confirm the selectable roster = native per-model (`openai`, `anthropic`, `gemini`, `xai`) + dedicated (`perplexity`, `tavily`, `brave`, `exa`, `firecrawl`, `serpapi`). The only edits here are removing any web-search routing that referenced a now-deleted LLM provider, and confirming `DEFAULT_WEB_SEARCH_PROVIDER` (`openai`) is still valid.

- [ ] **Step 3.6 — (Optional) finish `priceMeasurements` removal**

If Phase 1 took the minimal path, remove the now-orphaned `priceMeasurements` field from `src/catalog/types.ts`, `data/providers/definitions.ts`, and the remaining (few) core provider data files. With only ~4 providers left this is small.

- [ ] **Step 3.7 — Verify green + catalog tests**

```bash
npx tsc --noEmit && npm test && npm run catalog:test
```
Expected: PASS. `assertProviderDocument`/`defineProviderDocuments` validate the trimmed catalog.

- [ ] **Step 3.8 — Commit**

```bash
git add -A && git commit -m "feat: cull provider catalog to core launch set"
```

---

## Phase 4 — God-file breakup + docs refresh

**Why:** Several files exceed your own 30-line-function / focused-file standard; most shrink automatically after Phases 1–3. This phase mops up and re-aligns docs with reality.

- [ ] **Step 4.1 — Re-measure after the cull**

```bash
find src data -name "*.ts" -o -name "*.tsx" | xargs wc -l | sort -rn | head -20
```
Re-evaluate which files are still oversized. `runtimeManifest.ts`, `providerRoute.ts`, `whisper/providers.ts`, `webSearch.ts` should be dramatically smaller or gone. Only split what remains genuinely large (e.g. `SettingsFlowSections.tsx`, `SetupGuideModal.tsx`, `MainScreen.tsx`).

- [ ] **Step 4.2 — Group `MainScreen` pipeline inputs**

`useVoicePipeline` is called with ~30 loose props (MainScreen.tsx:265-299). Introduce derived selector hooks (e.g. `useActiveRoute(settings)` → `{ provider, model, apiKey }`, `useSpeechConfig(settings)` → STT/TTS sub-object) so the call site passes a few cohesive objects. One selector per commit, each with a focused unit test. (Per `Projects/CLAUDE.md`: >3 groupable props.)

- [ ] **Step 4.3 — Refresh docs**

Update `README.md` (provider list, "OpenAI TTS" claims, stack), `AGENTS.md` (provider-maintenance file list, voice-pipeline notes), and delete the dead `App.tsx` Expo stub (real entry is `app/index.tsx`). Verify `index.ts` / `expo-router/entry` wiring still resolves.

- [ ] **Step 4.4 — Verify + commit**

```bash
npx tsc --noEmit && npm test
git add -A && git commit -m "refactor: break up oversized files and refresh docs"
```

---

## Phase 5 — UX: onboarding, humanized copy, collapse overlapping controls, Advanced bucket

**Why:** The voice stage is excellent, but the app currently presents a consumer voice assistant wrapped around a power-user routing console. Direction = **hybrid**: keep routing, but make the default surface calm and vendor-agnostic and push the machinery into Advanced. These changes pair with Phases 1–3 (fewer providers/backends mechanically shrink the intimidating Settings surfaces).

**Files touched (primary):**
- Onboarding: `src/components/SetupGuideModal.tsx`, `src/screens/main/useSetupGuideController.ts`, `src/screens/main/setupGuideSupport.ts`, `src/types.ts` (`setupGuideDismissed`)
- Status copy: `src/screens/main/statusSelectors.ts`, `src/i18n/locales/en.ts` + `de.ts`
- Current-Setup sheet: `src/screens/main/StatusDetailsModal.tsx`
- Overlapping controls: `src/screens/main/MainScreenStyleChip.tsx`, `StyleSheetModal.tsx`, `src/components/ResponseModeToggle.tsx`, `src/components/settings/InstructionsTab.tsx` (length/tone), `src/utils/responseModes.ts`
- Advanced bucket: `src/components/SettingsModal.tsx`, `src/components/settings/SettingsFlowSections.tsx`, `SpeechDiagnosticsSection.tsx`, `UiTab.tsx`
- Web-search state label: home toggle in `src/screens/main/MainScreenTopBar.tsx` (or its container) + `src/i18n/*`
- Tests: `__tests__/screens/*`, `__tests__/i18n/*`, `__tests__/utils/responseModes.test.ts`

- [ ] **Step 5.1 — Verify the existing onboarding wizard (already built)**

The onboarding wizard (`SetupGuideModal` + `useSetupGuideController.ts`) already exists and is considered good — do **not** rebuild it. Just verify after the provider cull: (a) it still gates correctly on "no LLM credential configured", (b) it offers a sensible provider from the trimmed core set, and (c) on completion it triggers the Step 3.3 provider-derived response-mode mapping. Add/adjust a test only if the cull broke an assumption (e.g. a removed provider was referenced).

- [ ] **Step 5.2 — Humanize status copy + stop vendor leakage**

In `src/i18n/locales/en.ts` / `de.ts`, change the conversational-surface strings:
```ts
// en.ts
parsing: "Transcribing",            // was "Parsing"
parsingYourVoiceInput: "Turning your voice into text",
waitingForProvider: () => "Thinking",        // drop the provider name from the main surface
preparingVoiceWithProvider: () => "Preparing the voice reply",
```
Mirror in `de.ts`. In `statusSelectors.ts:101` / `:95`, the `waitingForProvider`/`preparingVoiceWithProvider` calls can keep passing `provider` for the **Advanced** "Current Setup" sheet, but the main status detail should use the vendor-free variant. Add/adjust a `statusSelectors` test asserting `statusDetail` for `thinking` no longer contains the provider label.

- [ ] **Step 5.3 — Collapse the three length/depth axes into one**

Today: home `Quick/Normal/Deep` (model routing) + Style chip `Brief/Normal/Thorough` (length) + Behavior tab `Adaptive Length` (same length again). Keep `Quick/Normal/Deep` as the single primary control on the home surface. Fold tone + length into the one **Style** chip/sheet (`StyleSheetModal.tsx`) and remove the duplicate Adaptive-Length control from the default Behavior tab (move it under Advanced, or bind it to the Style sheet so there is exactly one source of truth). Verify `responseLength`/`responseTone` still have a single editing entry point; update `responseModes.test.ts` if routing helpers change.

- [ ] **Step 5.4 — Introduce an "Advanced / Pro" bucket in Settings**

Relocate power-user controls out of the default tabs into a clearly-labeled Advanced section: per-mode model identity, STT/TTS provider+model+voice internals that survive Phase 2, `Recent Speech Activity` diagnostics (`SpeechDiagnosticsSection.tsx`), the `Debug Log Button` toggle, and raw `file://` paths. Default tabs keep only: connect-a-provider, voice on/off + voice picker, theme/language, style. This is reorganization within `SettingsModal.tsx` / `SettingsFlowSections.tsx`, not deletion.

- [ ] **Step 5.5 — Demote model identity on the home surface (hybrid)**

Keep the `Quick/Normal/Deep` tiles, but make the vendor/model line (`Grok 4.3`, `Claude Opus 4.8`, `GPT-5.5`) visually secondary (smaller, lower emphasis) in `ResponseModeToggle.tsx` — or behind a "show model details" toggle that lives in Advanced and is **off** by default. The tri-mode labels stay primary; the brand names become a power-user detail. Do not remove them (hybrid keeps routing visible to those who want it).

- [ ] **Step 5.6 — Web search: always-present toggle + honest state**

Web search must be an **always-available toggle** on the home surface (independent of which model/mode is active — every model can be augmented via the selectable search-provider list). Keep the toggle always visible. Fix the state display: when off/unconfigured → "Web Search · Off" with no provider logo; when on + configured → show the selected provider. Adjust the home toggle component + i18n; add a test for the off/unconfigured label.

- [ ] **Step 5.7 — Rename the home mode buttons to `Chat · Reason · Research`**

`Quick / Normal / Deep` frames the axis as speed, which is off-thesis. Rename the display labels to **Chat · Reason · Research** (increasing depth). Update `ResponseModeToggle.tsx` + `MainScreenStyleChip.tsx`/`StatusDetailsModal.tsx` copy + i18n (en/de). Keep the internal `ResponseMode` keys (`quick`/`normal`/`deep`) unchanged — display strings only. Note: `Research` is a *depth* tier and does **not** auto-enable web search (web search is an independent always-available toggle — Step 5.6).

- [ ] **Step 5.8 — Design the wait (the thesis's make-or-break moment)**

Because deep replies may take 30–60s, the `thinking` state must read as intentional, not hung. In `MainScreenVoiceStage`/`statusSelectors.ts`, add reassurance to the long-running states: an elapsed-time hint and/or copy like "Thinking deeply — good answers take a moment." Ensure the orange thinking animation never looks stalled. Add a test for the elapsed/long-wait copy threshold.

- [ ] **Step 5.9 — Contrast pass**

Audit low-contrast text (unselected mode-tile model names, hint lines, `Fresh session`) against WCAG AA in `src/theme/colors.ts` / relevant styles. Bump muted-on-dark tokens where they fail. No behavior change; visual only.

- [ ] **Step 5.10 — Verify + commit**

```bash
npx tsc --noEmit && npm test && npm run ios
```
Manually confirm: fresh install → onboarding asks for one key → mic works; status copy reads human and vendor-free; one length control; renamed mode buttons; long "thinking" waits read as intentional; Advanced holds the routing/diagnostics.
```bash
git add -A && git commit -m "feat: hybrid UX — onboarding, humanized status, collapsed controls, Advanced bucket"
```

---

## Self-review against the review findings

- ✅ Pricing removal → Phase 1 (Review §2).
- ✅ Provider cull 42→9 core (+ search backends) + xAI merge + single source of truth → Phase 3 (Review §1).
- ✅ Capability-gated STT/TTS across core set, drop on-device ONNX + realtime → Phase 2 (Review §3).
- ✅ God files → Phase 4 + falls out of 1–3 (Review §4).
- ✅ Stale docs / `App.tsx` stub → Phase 4 (Review §5).
- ✅ UX: onboarding wall, vendor leakage, overlapping length axes, overwhelming Voice tab, web-search state, contrast → Phase 5 (UX Review Issues 1–5), hybrid direction.
- ✅ Open decisions resolved: 9-provider core set (incl. Qwen + Kimi); capability-gated STT/TTS + native fallback; web search = always-on toggle over a selectable provider list; xAI/Grok merged; home modes renamed **Chat · Reason · Research**; **no hardcoded default models** — response modes derived from the first configured provider (Step 3.3); onboarding wizard already exists (Step 5.1 just verifies it).
- Note: `tsc --noEmit` is the load-bearing safety net for Phases 2–3 because `Provider` is a union that drives `Record<Provider, …>` maps app-wide — the compiler enumerates every site to fix.
