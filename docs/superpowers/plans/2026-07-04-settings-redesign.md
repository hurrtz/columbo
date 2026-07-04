# Settings Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Settings as a runtime readiness overview with drill-in pages for Connections, Thinking, Listening, Speaking, Search, and App & diagnostics.

**Architecture:** Keep the existing settings state, validation state, preview state, and provider normalization. Add derived readiness helpers and replace the current tab shell with an overview/drill-in shell. Reuse the existing section components where possible, but move controls into pages that match the approved information architecture.

**Tech Stack:** Expo, React Native, TypeScript, Jest, React Native Testing Library.

---

## File Structure

- Modify `src/components/settings/types.ts`
  - Replace `SettingsFlowTab` with a drill-in page union.
  - Keep legacy `SettingsTab` focus values so callers do not need to change.
- Create `src/components/settings/readiness.ts`
  - Pure selectors for Think, Listen, Speak, and Search readiness.
  - No React imports. This keeps status computation testable.
- Create `src/components/settings/SettingsOverview.tsx`
  - Renders the readiness strip and six overview rows.
  - Emits `onOpenPage(page)` when a status chip or row is tapped.
- Create `src/components/settings/SettingsPages.tsx`
  - Re-exports page-level wrappers around existing section content.
  - Keeps drill-in rendering readable inside `SettingsModal`.
- Modify `src/components/settings/SettingsFlowSections.tsx`
  - Split the current `AiModelsSection` content into Thinking and Search exports.
  - Remove response length and response tone from Settings.
  - Move speech diagnostics out of Speaking page props.
- Modify `src/components/settings/UiTab.tsx`
  - Fold App controls into an `AppDiagnosticsSettingsPage` or keep as reused content under the new page wrapper.
- Modify `src/components/SettingsModal.tsx`
  - Replace top tab row with overview/drill-in navigation.
  - Route `focusTab`/provider focus to the correct drill-in page.
- Modify `src/components/settings/styles.ts`
  - Add readiness strip, overview row, drill-in header/back button styles.
- Modify `src/i18n/locales/en.ts` and `src/i18n/locales/de.ts`
  - Add labels/status copy for readiness and section rows.
  - Existing translation parity test will guard structure.
- Modify `__tests__/components/SettingsModal.test.tsx`
  - Red/green coverage for overview, drill-in navigation, removed controls, and focus routing.
- Create `__tests__/components/settingsReadiness.test.ts`
  - Pure unit tests for readiness status helpers.

## Task 1: Readiness Selectors

**Files:**
- Create: `src/components/settings/readiness.ts`
- Test: `__tests__/components/settingsReadiness.test.ts`

- [ ] **Step 1: Write failing readiness tests**

Create `__tests__/components/settingsReadiness.test.ts`:

```ts
import { DEFAULT_SETTINGS, Settings } from "../../src/types";
import {
  getSettingsReadiness,
  type SettingsReadinessStatus,
} from "../../src/components/settings/readiness";

function withSettings(partial: Partial<Settings>): Settings {
  return {
    ...DEFAULT_SETTINGS,
    ...partial,
  };
}

function expectStatus(
  status: SettingsReadinessStatus,
  expected: SettingsReadinessStatus["state"],
) {
  expect(status.state).toBe(expected);
}

describe("settings readiness", () => {
  it("marks the default native voice pipeline as listen-ready and search-off", () => {
    const readiness = getSettingsReadiness(DEFAULT_SETTINGS, {
      llmProviders: ["openai"],
      sttProviders: [],
      ttsProviders: [],
      searchProviders: [],
    });

    expectStatus(readiness.listen, "ready");
    expectStatus(readiness.search, "off");
  });

  it("marks thinking broken when no response route can run", () => {
    const readiness = getSettingsReadiness(DEFAULT_SETTINGS, {
      llmProviders: [],
      sttProviders: [],
      ttsProviders: [],
      searchProviders: [],
    });

    expectStatus(readiness.think, "broken");
  });

  it("marks provider STT broken when provider STT is selected without an enabled STT provider", () => {
    const settings = withSettings({
      sttMode: "provider",
      sttProvider: null,
    });

    const readiness = getSettingsReadiness(settings, {
      llmProviders: ["openai"],
      sttProviders: [],
      ttsProviders: [],
      searchProviders: [],
    });

    expectStatus(readiness.listen, "broken");
  });

  it("marks spoken replies off when spoken replies are disabled", () => {
    const settings = withSettings({
      spokenRepliesEnabled: false,
    });

    const readiness = getSettingsReadiness(settings, {
      llmProviders: ["openai"],
      sttProviders: [],
      ttsProviders: [],
      searchProviders: [],
    });

    expectStatus(readiness.speak, "off");
  });
});
```

- [ ] **Step 2: Run the failing readiness tests**

Run: `npm test -- --runInBand __tests__/components/settingsReadiness.test.ts --forceExit`

Expected: FAIL because `src/components/settings/readiness.ts` does not exist.

- [ ] **Step 3: Implement readiness helpers**

Create `src/components/settings/readiness.ts`:

```ts
import type { Provider, Settings } from "../../types";
import type { WebSearchProvider } from "../../constants/webSearch";

export type SettingsReadinessState = "ready" | "attention" | "broken" | "off";

export interface SettingsReadinessStatus {
  state: SettingsReadinessState;
  summaryKey:
    | "settingsReadinessReady"
    | "settingsReadinessNeedsAttention"
    | "settingsReadinessBroken"
    | "settingsReadinessOff";
}

export interface SettingsReadiness {
  think: SettingsReadinessStatus;
  listen: SettingsReadinessStatus;
  speak: SettingsReadinessStatus;
  search: SettingsReadinessStatus;
}

export interface SettingsReadinessContext {
  llmProviders: Provider[];
  sttProviders: Provider[];
  ttsProviders: Provider[];
  searchProviders: WebSearchProvider[];
}

function status(state: SettingsReadinessState): SettingsReadinessStatus {
  switch (state) {
    case "ready":
      return { state, summaryKey: "settingsReadinessReady" };
    case "attention":
      return { state, summaryKey: "settingsReadinessNeedsAttention" };
    case "broken":
      return { state, summaryKey: "settingsReadinessBroken" };
    case "off":
      return { state, summaryKey: "settingsReadinessOff" };
  }
}

function hasConfiguredKey(settings: Settings, provider: Provider | null | undefined) {
  return !!provider && !!settings.apiKeys[provider]?.trim();
}

function getThinkReadiness(settings: Settings, context: SettingsReadinessContext) {
  const runnableModes = settings.responseModes.filter((mode) => {
    const provider = mode.route.provider;
    return context.llmProviders.includes(provider) && hasConfiguredKey(settings, provider);
  });

  if (runnableModes.length === 0) {
    return status("broken");
  }

  return runnableModes.length === settings.responseModes.length
    ? status("ready")
    : status("attention");
}

function getListenReadiness(settings: Settings, context: SettingsReadinessContext) {
  if (settings.sttMode === "native") {
    return status("ready");
  }

  const provider = settings.sttProvider;
  if (!provider || !context.sttProviders.includes(provider) || !hasConfiguredKey(settings, provider)) {
    return status("broken");
  }

  return status("ready");
}

function getSpeakReadiness(settings: Settings, context: SettingsReadinessContext) {
  if (!settings.spokenRepliesEnabled) {
    return status("off");
  }

  if (settings.ttsMode === "native") {
    return status("ready");
  }

  const provider = settings.ttsProvider;
  if (!provider || !context.ttsProviders.includes(provider) || !hasConfiguredKey(settings, provider)) {
    return status("broken");
  }

  return status("ready");
}

function getSearchReadiness(settings: Settings, context: SettingsReadinessContext) {
  if (settings.webSearchMode === "off") {
    return status("off");
  }

  const provider = settings.webSearchProvider;
  if (!provider || !context.searchProviders.includes(provider) || !settings.apiKeys[provider]?.trim()) {
    return status("broken");
  }

  return status("ready");
}

export function getSettingsReadiness(
  settings: Settings,
  context: SettingsReadinessContext,
): SettingsReadiness {
  return {
    think: getThinkReadiness(settings, context),
    listen: getListenReadiness(settings, context),
    speak: getSpeakReadiness(settings, context),
    search: getSearchReadiness(settings, context),
  };
}
```

- [ ] **Step 4: Run readiness tests**

Run: `npm test -- --runInBand __tests__/components/settingsReadiness.test.ts --forceExit`

Expected: PASS.

## Task 2: Overview and Drill-in Shell

**Files:**
- Modify: `src/components/settings/types.ts`
- Create: `src/components/settings/SettingsOverview.tsx`
- Modify: `src/components/SettingsModal.tsx`
- Modify: `src/components/settings/styles.ts`
- Modify: `src/i18n/locales/en.ts`
- Modify: `src/i18n/locales/de.ts`
- Test: `__tests__/components/SettingsModal.test.tsx`

- [ ] **Step 1: Write failing SettingsModal tests for the new shell**

Replace the existing `SettingsModal` tab-switching test with assertions that:

```ts
expect(screen.getByText("Runtime Readiness")).toBeTruthy();
expect(screen.getByText("Connections")).toBeTruthy();
expect(screen.getByText("Thinking")).toBeTruthy();
expect(screen.getByText("Listening")).toBeTruthy();
expect(screen.getByText("Speaking")).toBeTruthy();
expect(screen.getByText("Search")).toBeTruthy();
expect(screen.getByText("App & diagnostics")).toBeTruthy();
expect(screen.queryByPlaceholderText("Search services")).toBeNull();
```

Add a navigation assertion:

```ts
fireEvent.press(screen.getByText("Connections"));
await waitFor(() => {
  expect(screen.getByText("Back to overview")).toBeTruthy();
  expect(screen.getByPlaceholderText("Search services")).toBeTruthy();
});
fireEvent.press(screen.getByText("Back to overview"));
await waitFor(() => {
  expect(screen.getByText("Runtime Readiness")).toBeTruthy();
});
```

- [ ] **Step 2: Run the failing SettingsModal test**

Run: `npm test -- --runInBand __tests__/components/SettingsModal.test.tsx --forceExit`

Expected: FAIL because Settings still renders tabs.

- [ ] **Step 3: Add page types and overview component**

Change `src/components/settings/types.ts`:

```ts
export type SettingsPage =
  | "overview"
  | "connections"
  | "thinking"
  | "listening"
  | "speaking"
  | "search"
  | "app";
```

Create `src/components/settings/SettingsOverview.tsx` with props:

```ts
interface SettingsOverviewProps {
  readiness: SettingsReadiness;
  onOpenPage: (page: Exclude<SettingsPage, "overview">) => void;
}
```

Render a `Runtime Readiness` card with four pressable status chips and six overview rows. Use `Feather` icons already used elsewhere.

- [ ] **Step 4: Refactor SettingsModal shell**

In `src/components/SettingsModal.tsx`, replace `activeTab` with `activePage`.

Use routing:

```ts
function getInitialSettingsPage(params): SettingsPage {
  if (params.focusProvider || params.focusCatalogProviderId || params.focusTab === "providers") return "connections";
  if (params.focusTab === "instructions") return "thinking";
  if (params.focusTab === "stt") return "listening";
  if (params.focusTab === "tts") return "speaking";
  if (params.focusTab === "web") return "search";
  if (params.focusTab === "ui") return "app";
  return "overview";
}
```

Render `SettingsOverview` when `activePage === "overview"`. For other pages, render a back button and page content.

- [ ] **Step 5: Run SettingsModal shell test**

Run: `npm test -- --runInBand __tests__/components/SettingsModal.test.tsx --forceExit`

Expected: PASS for overview navigation, remaining content tests may fail until pages are split in later tasks.

## Task 3: Split Settings Content into Approved Pages

**Files:**
- Modify: `src/components/settings/SettingsFlowSections.tsx`
- Modify: `src/components/settings/UiTab.tsx`
- Modify: `src/components/SettingsModal.tsx`
- Test: `__tests__/components/SettingsModal.test.tsx`

- [ ] **Step 1: Add failing assertions for content relocation**

Add tests that:

```ts
fireEvent.press(screen.getByText("Thinking"));
await waitFor(() => {
  expect(screen.getByText("Response Modes")).toBeTruthy();
  expect(screen.getByText("System Prompt")).toBeTruthy();
  expect(screen.queryByText("Adaptive Length")).toBeNull();
  expect(screen.queryByText("Response Tone")).toBeNull();
});

fireEvent.press(screen.getByText("Back to overview"));
fireEvent.press(screen.getByText("Search"));
await waitFor(() => {
  expect(screen.getByText("Web Search Provider")).toBeTruthy();
});

fireEvent.press(screen.getByText("Back to overview"));
fireEvent.press(screen.getByText("App & diagnostics"));
await waitFor(() => {
  expect(screen.getByText("Theme")).toBeTruthy();
  expect(screen.getByText("Usage Stats")).toBeTruthy();
  expect(screen.getByText("Recent Speech Activity")).toBeTruthy();
});
```

- [ ] **Step 2: Run the failing content test**

Run: `npm test -- --runInBand __tests__/components/SettingsModal.test.tsx --forceExit`

Expected: FAIL until sections are split.

- [ ] **Step 3: Split AI content**

In `SettingsFlowSections.tsx`:

- Rename `AiModelsSection` to `ThinkingSection`.
- Remove `getResponseLengthOptions`, `getResponseToneOptions`, and the two `RadioGroup` blocks for adaptive length and response tone.
- Keep the system prompt card and `ResponseModesSection`.
- Add a `SearchSection` export containing the current web search provider and advanced controls.

- [ ] **Step 4: Split voice content**

In `SettingsFlowSections.tsx`:

- Split current `VoiceSection` into `ListeningSection` and `SpeakingSection`.
- `ListeningSection` gets input mode, STT mode, STT provider/model, language/limit notes.
- `SpeakingSection` gets spoken replies, listen languages, reply playback, TTS mode/provider/model, and voice previews.
- Remove `SpeechDiagnosticsSection` from `SpeakingSection`.

- [ ] **Step 5: Add App diagnostics content**

Create or refactor `AppDiagnosticsSection` so it renders:

- Existing `UiTab` controls.
- `SpeechDiagnosticsSection summaries={speechDiagnostics}`.

- [ ] **Step 6: Wire new pages in SettingsModal**

Map drill-in pages:

- `connections` -> current API key section.
- `thinking` -> `ThinkingSection`.
- `listening` -> `ListeningSection`.
- `speaking` -> `SpeakingSection`.
- `search` -> `SearchSection`.
- `app` -> `AppDiagnosticsSection`.

- [ ] **Step 7: Run SettingsModal test**

Run: `npm test -- --runInBand __tests__/components/SettingsModal.test.tsx --forceExit`

Expected: PASS.

## Task 4: Copy, Styles, and Focus Routing Polish

**Files:**
- Modify: `src/i18n/locales/en.ts`
- Modify: `src/i18n/locales/de.ts`
- Modify: `src/components/settings/styles.ts`
- Modify: `src/components/settings/useSettingsModalController.ts`
- Test: `__tests__/i18n/translations.test.ts`
- Test: `__tests__/components/SettingsModal.test.tsx`

- [ ] **Step 1: Add i18n keys**

Add English/German keys for:

- `settingsRuntimeReadiness`
- `settingsReadinessThink`
- `settingsReadinessListen`
- `settingsReadinessSpeak`
- `settingsReadinessSearch`
- `settingsReadinessReady`
- `settingsReadinessNeedsAttention`
- `settingsReadinessBroken`
- `settingsReadinessOff`
- `settingsConnections`
- `settingsThinking`
- `settingsListening`
- `settingsSpeaking`
- `settingsSearch`
- `settingsAppDiagnostics`
- `settingsBackToOverview`
- `settingsOpenSection`

- [ ] **Step 2: Add styles**

Add focused styles to `styles.ts`:

- `readinessCard`
- `readinessGrid`
- `readinessPill`
- `readinessPillTitle`
- `readinessPillSummary`
- `overviewRowList`
- `overviewRow`
- `overviewRowCopy`
- `overviewRowTitle`
- `overviewRowSummary`
- `drillInHeader`
- `drillInBackButton`
- `drillInTitle`

- [ ] **Step 3: Ensure focus targets route to drill-in pages**

Update controller/shell routing so:

- provider focus opens Connections.
- catalog provider focus opens Connections.
- `focusTab="instructions"` opens Thinking.
- `focusTab="stt"` opens Listening.
- `focusTab="tts"` opens Speaking.
- `focusTab="web"` opens Search.
- `focusTab="ui"` opens App & diagnostics.

- [ ] **Step 4: Run focused tests**

Run:

```bash
npm test -- --runInBand __tests__/components/SettingsModal.test.tsx __tests__/i18n/translations.test.ts --forceExit
```

Expected: PASS.

## Task 5: Verification and Commit

**Files:**
- All modified implementation and tests.

- [ ] **Step 1: Run typecheck**

Run: `npx tsc --noEmit`

Expected: exit 0.

- [ ] **Step 2: Run focused settings suites**

Run:

```bash
npm test -- --runInBand __tests__/components/SettingsModal.test.tsx __tests__/components/settingsReadiness.test.ts __tests__/components/settingsRules.test.ts __tests__/hooks/useSettingsNormalization.test.ts __tests__/i18n/translations.test.ts --forceExit
```

Expected: PASS.

- [ ] **Step 3: Run full suite**

Run: `npm test -- --runInBand --forceExit`

Expected: PASS. The existing Jest force-exit/open-handle warning may still appear.

- [ ] **Step 4: Check diff hygiene**

Run:

```bash
git diff --check
git status -sb
```

Expected: whitespace clean; only intended settings redesign files modified.

- [ ] **Step 5: Commit**

Commit:

```bash
git add src/components/SettingsModal.tsx src/components/settings src/i18n/locales/en.ts src/i18n/locales/de.ts __tests__/components/SettingsModal.test.tsx __tests__/components/settingsReadiness.test.ts
git commit -m "Redesign settings navigation"
```
