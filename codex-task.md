# Codex Task Handoff

This file captures the remaining work around the provider catalog refactor and its app integration.

## Current State

- The old JSON/report-based catalog artifacts are gone.
- The catalog now lives as typed TypeScript provider documents under `data/provider-catalog/`.
- Shared schema lives in `src/catalog/types.ts`.
- Shared authoring and validation helpers live in `data/provider-catalog/definitions.ts`.
- Generated provider index lives in `data/provider-catalog/providers/index.ts`.
- These providers are already migrated into folder-based modules with `provider.ts`, `llms.ts`, `stt.ts`, `tts.ts`, and `index.ts` where applicable:
  - `amazon-aws`
  - `deepgram`
  - `google-vertex-ai-studio`
  - `mistral-ai`
  - `openai`
- Catalog-backed integration already exists for:
  - pricing lookups
  - STT limits
  - speech language notes
  - speech model labels
  - app-provider metadata bridge

## Important Gap

The provider migration is only partially complete.

Many providers still live as single large files under `data/provider-catalog/providers/*.ts` instead of the newer folder structure. The folder migration was started, but not finished.

## Primary Open Tasks

1. Finish the provider catalog migration.
   - Migrate the remaining large single-file providers into the folder/module structure when that improves maintainability.
   - Use the existing builder pattern from `data/provider-catalog/definitions.ts`.
   - Keep behavior unchanged.
   - Highest-priority candidates:
     - `cohere`
     - `together-ai`
     - `xai`
     - `z-ai-zhipu-ai`
   - Also review other large providers and split them if they are still hard to maintain.

2. Reduce remaining runtime drift between app constants and the catalog.
   - Start with `src/constants/models.ts`.
   - Derive app-facing provider/model metadata from the catalog for providers already supported by the transport layer.
   - Do not expose unsupported providers just because they exist in the catalog.

3. Continue catalog-backed UI integration.
   - Use catalog data for provider/model pickers where safe.
   - Derive labels, ordering, realtime/batch hints, STT/TTS availability, and other display metadata from the catalog instead of duplicating constants.
   - Likely follow-up files:
     - `src/components/SettingsModal.tsx`
     - `src/components/settings/useSettingsModalController.ts`
     - `src/utils/responseModes.ts`
     - `src/screens/MainScreen.tsx`

4. Tighten catalog validations as needed during migration.
   - Preserve duplicate/alias protections already in `definitions.ts`.
   - Add narrow validations only when they catch real catalog mistakes without making authoring brittle.

## Working Rules

- `src/constants/models.ts` is still the app-facing source of truth for what users can actually pick today.
- Do not turn the catalog into a raw dump of every provider SKU in the UI.
- Only surface models/providers that the current service layer actually supports.
- Prefer canonical model IDs over rolling aliases in user-facing pickers.
- Keep `src/types.ts`, `src/hooks/useSettings.ts`, and response-mode logic in sync if picker behavior changes.

## Suggested Execution Order

1. Finish migrating the biggest remaining provider files to the folder structure.
2. Refactor `src/constants/models.ts` to consume catalog-backed adapters for already-supported providers.
3. Update settings and response-mode surfaces to consume the same catalog-backed data.
4. Run focused tests after each slice.

## Suggested Verification

- `npm run typecheck`
- `npm run catalog:test`
- `npx jest __tests__/utils/responseModes.test.ts --runInBand --watchman=false`
- `npx jest __tests__/hooks/useSettings.test.ts --runInBand --watchman=false`
- `npx jest __tests__/services/llm.test.ts --runInBand --watchman=false`
- `npx jest __tests__/services/whisper.test.ts --runInBand --watchman=false`
- `npx jest __tests__/services/tts.test.ts --runInBand --watchman=false`

## Resume Prompt

Use this prompt in a new Codex session if needed:

`Continue the provider-catalog migration in this repo. The typed schema and builder layer already exist in data/provider-catalog/definitions.ts and src/catalog/types.ts. amazon-aws, deepgram, google-vertex-ai-studio, mistral-ai, and openai are already migrated into folder modules. Finish migrating the remaining large provider files where that improves maintainability, then reduce drift by making src/constants/models.ts and the relevant settings/response-mode surfaces read from the catalog for already-supported providers only. Keep behavior unchanged and run targeted tests.`
