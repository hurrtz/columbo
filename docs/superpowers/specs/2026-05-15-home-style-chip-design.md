# Home-screen Style chip — design

**Date:** 2026-05-15
**Status:** Approved

## Problem

`adaptiveLength` and `responseTone` shape how the assistant writes, but they live three taps deep in Settings → Instructions. Users can change them but rarely do, because mid-conversation course-correction means leaving the active screen. The risk is that these levers go unused.

The web-search mode already exposes a thread-level control on the home screen (`MainScreenRouteCard`), establishing a precedent for mirroring relevant settings on home.

## Goal

Make length and tone changeable in one tap from the home screen, without crowding the existing hero card.

Non-goals: per-thread overrides, removing the controls from Settings, animating the chip, voice-driven changes.

## Solution

A single **Style chip** placed in a new full-width row directly below `MainScreenRouteCard`. The chip displays the current selection as `Style — <tone> · <length>` (or `Stil — <tone> · <length>` in German). Tapping the chip opens a bottom-sheet modal that lets the user change both values.

Changes write to the existing `settings.responseLength` and `settings.responseTone` fields — the same state the Settings → Instructions tab edits. No new persistence layer.

## User flow

1. User is on the home screen mid-conversation.
2. User sees the Style chip showing the current values, e.g. `Stil — Locker · Kurz`.
3. User taps the chip → bottom sheet slides up.
4. Sheet shows two pickers: **Antwortlänge** (3 pill buttons) and **Antwortstil** (6 pill buttons). The description of the active option appears below each picker, matching what Settings shows today.
5. Tapping a pill immediately updates the setting (no save button).
6. User dismisses the sheet by tapping outside, swiping down, or pressing **Fertig**. The chip on home reflects the new values.
7. The next reply uses the new tone/length. An in-flight reply is unaffected (settings are read at request time).

## Components

### `MainScreenStyleChip`
- New component, sibling of `MainScreenRouteCard`.
- Renders nothing when no reply mode is available — same gate as the Route Card's non-empty state, so the chip and the mode toggle appear and disappear together.
- Renders a full-width pill with:
  - A small "style" glyph (Feather icon, e.g. `feather`).
  - Text: localized `homeStyleChipLabel` formatter that takes the active tone label and length label.
  - A chevron on the right.
- Tap opens the `StyleSheetModal`.
- Accessibility label: full text plus the current selection.

### `StyleSheetModal`
- New component using the existing modal/sheet pattern (look at how `StatusDetailsModal` or `TranscriptModal` is built — pick the one closest to a bottom sheet).
- Two sections, in this order: length, then tone. Each section has:
  - Section label (`adaptiveLength` / `responseTone`, existing keys).
  - A row of pill buttons reusing the styling of `ResponseModeToggle` (or factoring a shared `PillRadioGroup` if `ResponseModeToggle` isn't naturally reusable).
  - A description block below the row showing `selectedOption.description` — same pattern as `InstructionsTab.tsx:101-105`.
- A "Fertig" button in the sheet footer.
- Selecting an option calls the same `onUpdate({ responseLength })` / `onUpdate({ responseTone })` pipeline used by the Instructions tab.

### Reused
- `getResponseLengthOptions(t)` and `getResponseToneOptions(t)` from `src/components/settings/helpers`.
- All tone/length labels and descriptions in `en.ts` / `de.ts`.

## i18n

New keys (with English + German values):
- `homeStyleChipLabel({ tone, length })` — formatter, e.g. `"Style — ${tone} · ${length}"` / `"Stil — ${tone} · ${length}"`.
- `styleSheetTitle` — e.g. `"Style & Length"` / `"Stil & Länge"`.
- `styleSheetSubtitle` — e.g. `"How the assistant replies to you."` / `"Wie der Assistent dir antwortet."`.
- `openStyleSheet` — accessibility label, e.g. `"Open style and length"` / `"Stil und Länge öffnen"`.

The translation key-parity test (`__tests__/i18n/translations.test.ts`) guards this — both locales must define the new keys.

## State and data flow

```
MainScreen
  ├─ settings (existing)
  ├─ onUpdate(partial) (existing)
  ├─ MainScreenRouteCard (existing)
  └─ MainScreenStyleChip
       ├─ activeTone = settings.responseTone
       ├─ activeLength = settings.responseLength
       ├─ onPress → opens StyleSheetModal
       └─ StyleSheetModal
            ├─ value: { responseLength, responseTone }
            ├─ onChange → onUpdate(partial)
            └─ onDismiss → closes sheet
```

No new context, no new hooks. Visibility is computed from the same data `MainScreenRouteCard` already uses (`availableResponseModes.length > 0`); pass the same flag in or compute once at the MainScreen level and pass to both.

## Edge cases

- **No provider configured:** chip is not rendered (matches Route Card's empty state).
- **Mid-listening / mid-reply:** chip remains tappable; sheet opens normally. Setting changes apply to the next request.
- **Long tone label + long length label:** the chip uses a single line with ellipsis at the end. Both label sets are short enough in EN and DE that ellipsis is unlikely, but we don't crash if it happens.
- **Voice session active:** no interaction with the session lifecycle. Opening the sheet does not pause or stop the session.

## Testing

- Add coverage for the i18n key-parity (automatic via existing test once new keys are present).
- Add a small unit/render test for `MainScreenStyleChip` confirming it shows the correct label format and hides when no reply mode is available.
- Manual: change length on home → run a reply → confirm it respected the new length. Repeat for tone. Confirm chip text updates immediately on selection.

## Out of scope

- Per-thread overrides (we chose global-only).
- Removing or hiding the controls from Settings → Instructions.
- Animating chip transitions, sheet open animation tuning beyond defaults.
- Adding new tones/lengths.
- Telemetry / usage tracking of how often these change from home vs Settings.

## Open questions

None at design time. Implementation may surface micro-decisions (exact icon, exact sheet animation timing) — those are within the implementer's discretion.
