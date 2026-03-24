# Provider Catalog Research Plan

Last reviewed: March 24, 2026

## Status

- `provider-research/` covers the same 40 provider slugs as `data/providers`.
- The research import has now been applied across the full catalog.
- Current catalog totals after import and normalization:
  - 40 providers
  - 455 models
  - 294 LLM
  - 71 STT
  - 90 TTS

## What Changed

- The catalog schema was widened so the researched data fits without lossy coercion:
  - provider-level `sources`
  - wider pricing units
  - wider constraint metrics, units, and comparators
- A one-way importer now exists:
  - [scripts/provider_catalog/import_research_provider.py](/Users/tobias.winkler/Projects/SchnackAI/scripts/provider_catalog/import_research_provider.py)
- The importer writes the checked-in TS provider documents directly from:
  - `provider-research/<slug>/provider.json`
  - `provider-research/<slug>/models.json`

## Import Normalization Rules

The research set is richer than the old catalog, but not perfectly shaped for app use. The importer now normalizes a few recurring issues:

- generic file-size constraints are converted into byte constraints where the source text is precise enough
- self-aliases are removed
- aliases that collide with another canonical model ID in the same provider/service are removed
- duplicate research rows for the same `(provider, service, modelId)` are merged into one catalog model

These rules were needed for real imported cases like:

- `baichuan` alias collisions between deprecated and current model IDs
- `bytedance-doubao-seed` duplicated `bigmodel` / `unknown` rows that actually represent one model identifier exposed in multiple modes

## Delta From The Previous Catalog

- previous catalog:
  - 40 providers
  - 278 models
  - 147 LLM
  - 61 STT
  - 70 TTS
- current catalog:
  - 40 providers
  - 455 models
  - 294 LLM
  - 71 STT
  - 90 TTS

This means the researched import added:

- 177 total models
- 147 LLM
- 10 STT
- 20 TTS

## What Is Done

- the central provider catalog now reflects the researched provider/model inventory
- provider-level source attribution is stored in the catalog
- richer pricing, limits, and language data are available to app consumers
- existing catalog/runtime consumers still typecheck and the focused tests pass

## What Is Not Done

The remaining work is not bulk import anymore. It is curation and runtime adoption.

- The runtime manifest is still the gate for what the app can actually call.
- Dynamic/non-exhaustive providers still need stable-picker curation.
- Some researched rows are service-family surfaces rather than perfect model SKUs, so they may need hand review before being promoted into runtime pickers.
- The settings UI currently exposes the catalog, but not every researched model should become a user-selectable runtime option.

## Next Work Items

### 1. Curate high-growth providers

Review the biggest expansions and decide which entries are stable model IDs vs dynamic catalog inventory:

- `assemblyai`
- `hyperbolic`
- `sambanova`
- `together-ai`
- `moonshot-ai-kimi`
- `baidu-ernie-qianfan`
- `microsoft-azure`
- `novita-ai`
- `z-ai-zhipu-ai`
- `ibm-watsonx`

### 2. Surface more catalog metadata in the app

Good next UI/runtime consumers:

- provider pricing summaries
- provider/model limits summaries
- provider/model language summaries
- provider-level source links for inspection/debugging

### 3. Keep runtime curation separate

Do not turn the researched catalog directly into runtime picker truth.

Instead:

- keep the catalog as the broad factual database
- keep the runtime manifest as the integration boundary
- promote models into runtime pickers only when the transport path is verified

### 4. Use the research importer as the update path

When refreshed research arrives:

1. replace the provider JSON in `provider-research/<slug>`
2. rerun the importer for the affected providers
3. review the generated provider docs
4. rerun:
   - `npm run typecheck`
   - `npm run catalog:test`
   - focused app-facing tests for speech notes, provider cards, and runtime manifests

## Verification Run For This Import

- `npm run typecheck`
- `npm run catalog:test`
- `npx jest __tests__/components/ProvidersSections.test.tsx __tests__/constants/providers/languageNotes.test.ts __tests__/constants/providers/speech.test.ts __tests__/services/whisper.test.ts __tests__/catalog/appProviders.test.ts __tests__/utils/responseModes.test.ts --runInBand --watchman=false`
