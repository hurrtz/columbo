# Settings Redesign Design

**Date:** 2026-07-04
**Status:** Approved

## Problem

Mr Broccoli Settings currently expose a long list of implementation controls:
provider keys, model routing, response style, STT, TTS, voice previews, web
search, diagnostics, theme, language, usage stats, and debug controls. The
controls are useful, but the grouping makes users reason about the app's
internal pipeline before they can understand what is ready or what needs
attention.

The app is not released yet, so this is the right time for a deep settings
redesign rather than a small tab rename. The target audience is BYOK and
power-user friendly, so the goal is not to hide power. The goal is to make the
power legible and efficient.

## Goals

- Make Settings open on a clear runtime health overview.
- Organize settings by the user-visible parts of the experience: connecting
  services, thinking, listening, speaking, searching, and app diagnostics.
- Keep advanced provider/model/STT/TTS/search controls available.
- Remove duplicate or misplaced controls from Settings when the home screen is
  the better place to adjust them.
- Make broken or incomplete configuration obvious without forcing users to
  inspect every section.

## Non-goals

- Removing BYOK provider configuration.
- Hiding provider-specific model, STT, TTS, or web-search controls from power
  users.
- Changing provider capability rules or model catalogs as part of the settings
  redesign.
- Redesigning the home screen, except where Settings now links to controls that
  already live there.
- Adding telemetry.

## Design Summary

Settings becomes a runtime readiness dashboard plus focused drill-in pages.

The first screen shows a top **Runtime Readiness** strip with four status
indicators:

- **Think**: at least one home response card can send an LLM request.
- **Listen**: speech-to-text is ready through the app-native recognizer or a
  configured provider route.
- **Speak**: spoken replies are off intentionally, app-native TTS is ready, or
  provider TTS is configured.
- **Search**: web search is off intentionally, or a configured search provider
  can run.

Below the strip, Settings shows six rows:

1. **Connections**
2. **Thinking**
3. **Listening**
4. **Speaking**
5. **Search**
6. **App & diagnostics**

Tapping a row opens a focused drill-in page with a back button. The overview is
calm and scannable; the drill-in pages preserve the power-user controls.

## Runtime Readiness

Each status indicator uses four states:

- **Green / ready**: the path is configured and expected to work.
- **Yellow / attention**: the path can work, but has a caveat, fallback, or
  incomplete related configuration.
- **Red / broken**: the path is selected but cannot work.
- **Gray / off**: the path is intentionally off or not configured.

Status semantics:

### Think

- Green: at least one response mode has a valid provider, valid model, and a
  configured provider key.
- Yellow: at least one response mode is valid but another configured home card
  needs attention.
- Red: no response mode can run.
- Gray: no provider is configured yet.

### Listen

- Green: `sttMode` is `native`, or `sttMode` is `provider` with a configured
  STT-capable provider and valid model.
- Yellow: native STT is selected but the current app/platform may have known
  limitations, or provider STT is selected and the provider has a capability
  caveat.
- Red: provider STT is selected but no usable provider/key/model is available.
- Gray: speech input is not configured yet. This should normally be rare because
  the app defaults to native STT.

### Speak

- Green: spoken replies are enabled and the selected native/provider TTS route
  is ready.
- Yellow: spoken replies are enabled but the selected route has a caveat or
  fallback behavior.
- Red: spoken replies are enabled but the selected TTS route cannot work.
- Gray: spoken replies are intentionally off.

### Search

- Green: web search is enabled and the selected search provider can run.
- Yellow: web search is enabled with a caveat or limited provider setting.
- Red: web search is enabled but no usable provider/key is available.
- Gray: web search is intentionally off.

Each indicator opens the relevant drill-in section. The overview row summaries
should use practical text, for example
`3 response cards ready`, `Native speech recognition`, `xAI voice needs key`,
or `Off`.

## Section Map

### Connections

Purpose: manage provider access and validation.

Contains:

- Provider API key rows.
- Provider validation state.
- Provider capability badges for LLM, STT, TTS, and search.
- Provider search/filter controls, because the provider list is longer than a
  single comfortable mobile viewport.
- "Create API key" links.
- Provider details/about accordion.

Provider API keys should live only here. Runtime sections may show a needs-key
message and link to Connections, but must not duplicate key entry fields.

### Thinking

Purpose: configure how the assistant thinks and which models appear on the home
screen.

Contains:

- Response mode slots for the home screen, minimum 1 and maximum 4.
- Provider picker, model picker, and effort picker per slot when supported.
- Add/remove response mode controls.
- System prompt / assistant instructions, collapsed by default as a power-user
  field.

Removed from this section:

- Adaptive response length.
- Response tone.

Those two controls remain on the home screen because they shape the current
conversation and are already easier to adjust there.

### Listening

Purpose: configure speech input.

Contains:

- Input mode: push-to-talk or toggle-to-talk.
- Speech-to-text route: app-native or provider.
- STT provider picker when provider STT is selected.
- STT model picker when the selected provider exposes multiple supported STT
  models.
- STT language and recording-limit notes.

### Speaking

Purpose: configure spoken output.

Contains:

- Spoken replies on/off.
- Preferred listen languages.
- Reply playback: play sentences as they arrive or wait for the full reply.
- Text-to-speech route: app-native or provider.
- TTS provider picker when provider TTS is selected.
- TTS model picker when the selected provider exposes multiple supported TTS
  models.
- Native voice preview when native TTS is selected.
- Provider voice preview per preferred listen language when provider TTS is
  selected.

### Search

Purpose: configure web search as its own runtime path.

Contains:

- Web search provider picker.
- Provider-specific web search controls such as result count, depth, or search
  mode when supported.
- Clear state when search is off intentionally.
- Link to Connections when the chosen search provider needs a key.

Web search should no longer be buried inside the AI/models section.

### App & Diagnostics

Purpose: configure app-level behavior and inspect recent operational state.

Contains:

- Theme: light, dark, or system.
- App language.
- Usage stats visibility.
- Debug log button visibility.
- Recent activity.
- Speech diagnostics.

Diagnostics belong here instead of being buried under Speaking. A user looking
for logs or recent runtime behavior should not need to know whether the issue
was STT, TTS, or app state before opening the section.

## Control Cleanup

Remove these controls from Settings:

- Adaptive response length.
- Response tone.

Keep their existing home-screen controls. They remain backed by the current
settings fields unless implementation later chooses a cleaner state model.

Keep these controls in Settings:

- System prompt / assistant instructions.
- Provider-specific model, effort, STT, TTS, search, and voice controls.
- Usage stats and debug log visibility.

Move these controls:

- Web search: from AI/models to Search.
- Recent activity: to App & diagnostics.
- Speech diagnostics: to App & diagnostics.

## UX Behavior

Settings opens on the overview page every time unless the caller passes an
explicit focus target. Existing focus targets should route to the matching
drill-in page:

- Provider focus -> Connections.
- STT focus -> Listening.
- TTS focus -> Speaking.
- Web-search focus -> Search.
- UI/app focus -> App & diagnostics.
- Instructions/model focus -> Thinking.

Each drill-in page has:

- A back button to the overview.
- A compact current-state summary at the top.
- The relevant controls below.
- Links to Connections when a selected runtime path needs a key.

The overview should avoid tutorial prose. It should use short status summaries
and recognizable status colors/icons.

## Data and State

The redesign should primarily reuse existing settings state:

- `settings.responseModes`
- `settings.activeResponseMode`
- `settings.providerModels`
- `settings.providerSttModels`
- `settings.providerTtsModels`
- `settings.providerTtsVoices`
- `settings.sttMode`
- `settings.sttProvider`
- `settings.ttsMode`
- `settings.ttsProvider`
- `settings.ttsListenLanguages`
- `settings.spokenRepliesEnabled`
- `settings.replyPlayback`
- `settings.webSearchMode`
- `settings.webSearchProvider`
- `settings.webSearchProviderSettings`
- `settings.assistantInstructions`
- `settings.theme`
- `settings.language`
- `settings.showUsageStats`
- `settings.showDebugLogButton`
- `settings.apiKeys`

No persistence migration is required just to reorganize Settings. If
implementation removes fields from Settings UI but keeps the underlying fields
for home-screen controls, existing installs continue to work.

The readiness strip should be derived state, not persisted state.

## Component Direction

The current `SettingsModal` can evolve into a small shell that manages:

- active page: overview or one drill-in section.
- focus target routing.
- shared validation/preview/diagnostic state.

Suggested new or refactored units:

- `SettingsOverview`
- `SettingsReadinessStrip`
- `SettingsOverviewRow`
- `ConnectionsSettingsPage`
- `ThinkingSettingsPage`
- `ListeningSettingsPage`
- `SpeakingSettingsPage`
- `SearchSettingsPage`
- `AppDiagnosticsSettingsPage`
- readiness selectors/helpers, kept separate from rendering.

Existing large section code can be moved gradually into the new pages. The
implementation should avoid broad behavioral rewrites while reorganizing the
surface.

## Testing

Add focused tests for:

- Readiness selector states for Think, Listen, Speak, and Search.
- Focus-target routing to the correct drill-in page.
- Settings overview rendering the six rows and status summaries.
- Response length and response tone no longer appearing in Settings.
- System prompt still appearing in Thinking.
- Web search controls appearing in Search.
- Speech diagnostics and recent activity appearing in App & diagnostics.

Run baseline verification:

- `npx tsc --noEmit`
- Focused Jest suites for settings, provider capability guards, response modes,
  and readiness helpers.
- Full `npm test -- --runInBand --forceExit` if the implementation touches broad
  Settings state or shared settings normalization.

## Out of Scope

- Changing the home-screen response length/tone controls.
- Changing provider model catalogs.
- Changing provider validation behavior.
- Redesigning the onboarding wizard.
- Adding a new setup wizard inside Settings.
- Persisting readiness state.

## Open Questions

None at design time. Implementation may choose exact icon names, copy, and
small layout details as long as the approved information architecture remains:
top readiness strip, overview plus drill-in, six sections, and no duplicated
provider key entry outside Connections.
