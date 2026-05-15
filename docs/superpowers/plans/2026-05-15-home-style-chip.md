# Home-screen Style Chip Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Surface `responseLength` and `responseTone` on the home screen via a single chip below the Route Card. Tapping the chip opens a modal with both pickers and active-option descriptions. Writes go to the same global `settings` fields that `Settings → Instructions` edits.

**Architecture:** Two new components in `src/screens/main/`: `MainScreenStyleChip.tsx` (the pressable pill) and `StyleSheetModal.tsx` (the picker modal). Both reuse `getResponseLengthOptions` / `getResponseToneOptions` from `src/components/settings/helpers.ts` for labels and descriptions. The modal follows the existing `StatusDetailsModal` pattern (centered card overlay with tap-outside-to-close) — the spec's "bottom sheet" wording is honored functionally, but visually we match the app's existing modal convention. `MainScreen.tsx` wires both into the portrait and landscape layouts.

**Tech Stack:** React Native, Expo, TypeScript, `@testing-library/react-native`, Jest.

**Spec:** `docs/superpowers/specs/2026-05-15-home-style-chip-design.md`.

---

## File Structure

**Files to create:**

- `src/screens/main/MainScreenStyleChip.tsx` — pressable pill displaying current tone + length, opens modal on press.
- `src/screens/main/StyleSheetModal.tsx` — modal with two pickers (length + tone) and active-option descriptions.
- `__tests__/screens/main/MainScreenStyleChip.test.tsx` — render + interaction tests.
- `__tests__/screens/main/StyleSheetModal.test.tsx` — render + interaction tests.

**Files to modify:**

- `src/i18n/locales/en.ts` — add 4 new keys: `homeStyleChipLabel`, `styleSheetTitle`, `styleSheetSubtitle`, `openStyleSheet`.
- `src/i18n/locales/de.ts` — add the same 4 keys with German values.
- `src/screens/main/styles.ts` — add styles for chip + modal pill rows + descriptions.
- `src/screens/MainScreen.tsx` — modal visibility state; render chip + modal in both portrait (`~line 1196`) and landscape (`~line 1082-1106`) layouts.

**Visibility rule:** The chip renders only when `availableResponseModes.length > 0` (matches the Route Card's non-empty state). Decision made in `MainScreen.tsx`, not inside the chip.

---

## Task 1: Add i18n keys for chip and modal

**Files:**
- Modify: `src/i18n/locales/en.ts` (after line 146, near `adaptiveLength`/`responseTone`)
- Modify: `src/i18n/locales/de.ts` (after line 146, mirror)
- Test: `__tests__/i18n/translations.test.ts` (already exists; new assertions added)

- [ ] **Step 1: Write failing tests for the new keys**

Replace the contents of `__tests__/i18n/translations.test.ts` with:

```ts
import { translations } from "../../src/i18n/translations";

describe("translations", () => {
  it("keeps English and German translation keys in sync", () => {
    expect(Object.keys(translations.de).sort()).toEqual(
      Object.keys(translations.en).sort(),
    );
  });

  describe("home-screen style chip keys", () => {
    it.each(["en", "de"] as const)(
      "%s defines homeStyleChipLabel as a formatter",
      (lang) => {
        const value = translations[lang].homeStyleChipLabel;
        expect(typeof value).toBe("function");
        if (typeof value !== "function") return;
        const rendered = value({ tone: "Casual", length: "Brief" });
        expect(rendered).toContain("Casual");
        expect(rendered).toContain("Brief");
      },
    );

    it.each(["en", "de"] as const)(
      "%s defines styleSheetTitle as a non-empty string",
      (lang) => {
        const value = translations[lang].styleSheetTitle;
        expect(typeof value).toBe("string");
        expect((value as string).length).toBeGreaterThan(0);
      },
    );

    it.each(["en", "de"] as const)(
      "%s defines styleSheetSubtitle as a non-empty string",
      (lang) => {
        const value = translations[lang].styleSheetSubtitle;
        expect(typeof value).toBe("string");
        expect((value as string).length).toBeGreaterThan(0);
      },
    );

    it.each(["en", "de"] as const)(
      "%s defines openStyleSheet as a non-empty string",
      (lang) => {
        const value = translations[lang].openStyleSheet;
        expect(typeof value).toBe("string");
        expect((value as string).length).toBeGreaterThan(0);
      },
    );
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx jest __tests__/i18n/translations.test.ts`
Expected: 8 of the new tests fail (keys not defined). The parity test passes because both locales lack the keys equally.

- [ ] **Step 3: Add keys to `src/i18n/locales/en.ts`**

Insert these entries after the existing `responseTone: "Response Tone",` line (around line 144):

```ts
    homeStyleChipLabel: ({ tone, length }) => `Style — ${tone} · ${length}`,
    styleSheetTitle: "Style & Length",
    styleSheetSubtitle: "How the assistant replies to you.",
    openStyleSheet: "Open style and length",
```

- [ ] **Step 4: Add keys to `src/i18n/locales/de.ts`**

Insert these entries after the existing `responseTone: "Antwortstil",` line (around line 146):

```ts
    homeStyleChipLabel: ({ tone, length }) => `Stil — ${tone} · ${length}`,
    styleSheetTitle: "Stil & Länge",
    styleSheetSubtitle: "Wie der Assistent dir antwortet.",
    openStyleSheet: "Stil und Länge öffnen",
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx jest __tests__/i18n/translations.test.ts`
Expected: all 9 tests pass.

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/i18n/locales/en.ts src/i18n/locales/de.ts __tests__/i18n/translations.test.ts
git commit -m "feat(i18n): add keys for home-screen Style chip and sheet"
```

---

## Task 2: Build the `MainScreenStyleChip` component

**Files:**
- Create: `src/screens/main/MainScreenStyleChip.tsx`
- Test: `__tests__/screens/main/MainScreenStyleChip.test.tsx`
- Modify: `src/screens/main/styles.ts` (add chip styles at the end of the `StyleSheet.create` object, before the closing `});`)

- [ ] **Step 1: Write the failing test**

Create `__tests__/screens/main/MainScreenStyleChip.test.tsx`:

```tsx
import React from "react";
import { fireEvent } from "@testing-library/react-native";

import { MainScreenStyleChip } from "../../../src/screens/main/MainScreenStyleChip";
import { renderWithProviders } from "../../test-utils/renderWithProviders";

jest.mock("@expo/vector-icons", () => ({
  Feather: ({ children }: { children?: React.ReactNode }) => children ?? null,
}));

describe("MainScreenStyleChip", () => {
  it("renders the current tone and length in the label", () => {
    const { getByText } = renderWithProviders(
      <MainScreenStyleChip
        responseLength="brief"
        responseTone="casual"
        onPress={() => {}}
      />,
    );

    expect(getByText(/Casual/)).toBeTruthy();
    expect(getByText(/Brief/)).toBeTruthy();
  });

  it("calls onPress when tapped", () => {
    const onPress = jest.fn();
    const { getByRole } = renderWithProviders(
      <MainScreenStyleChip
        responseLength="thorough"
        responseTone="nerdy"
        onPress={onPress}
      />,
    );

    fireEvent.press(getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("exposes an accessibility label with current values", () => {
    const { getByLabelText } = renderWithProviders(
      <MainScreenStyleChip
        responseLength="normal"
        responseTone="professional"
        onPress={() => {}}
      />,
    );

    expect(
      getByLabelText(/Open style and length.*Professional.*Normal/i),
    ).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest __tests__/screens/main/MainScreenStyleChip.test.tsx`
Expected: FAIL — cannot find module `MainScreenStyleChip`.

- [ ] **Step 3: Add styles to `src/screens/main/styles.ts`**

Find the closing `});` at the end of the `StyleSheet.create({...})` call. Insert these entries just before it:

```ts
  styleChip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    gap: 8,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  styleChipLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexShrink: 1,
  },
  styleChipLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fonts.body,
    flexShrink: 1,
  },
```

- [ ] **Step 4: Create `src/screens/main/MainScreenStyleChip.tsx`**

```tsx
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useLocalization } from "../../i18n";
import {
  getResponseLengthOptions,
  getResponseToneOptions,
} from "../../components/settings/helpers";
import { useTheme } from "../../theme/ThemeContext";
import {
  AssistantResponseLength,
  AssistantResponseTone,
} from "../../types";

import { styles } from "./styles";

interface MainScreenStyleChipProps {
  responseLength: AssistantResponseLength;
  responseTone: AssistantResponseTone;
  onPress: () => void;
}

export function MainScreenStyleChip({
  responseLength,
  responseTone,
  onPress,
}: MainScreenStyleChipProps) {
  const { colors } = useTheme();
  const { t } = useLocalization();

  const toneLabel =
    getResponseToneOptions(t).find((o) => o.value === responseTone)?.label ??
    responseTone;
  const lengthLabel =
    getResponseLengthOptions(t).find((o) => o.value === responseLength)
      ?.label ?? responseLength;

  const chipLabel = t("homeStyleChipLabel", {
    tone: toneLabel,
    length: lengthLabel,
  });
  const accessibilityLabel = `${t("openStyleSheet")}. ${toneLabel}. ${lengthLabel}.`;

  return (
    <TouchableOpacity
      style={[
        styles.styleChip,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          shadowColor: colors.glow,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <View style={styles.styleChipLabelRow}>
        <Feather name="sliders" size={16} color={colors.textSecondary} />
        <Text
          style={[styles.styleChipLabel, { color: colors.text }]}
          numberOfLines={1}
        >
          {chipLabel}
        </Text>
      </View>
      <Feather name="chevron-right" size={18} color={colors.textMuted} />
    </TouchableOpacity>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx jest __tests__/screens/main/MainScreenStyleChip.test.tsx`
Expected: 3 tests pass.

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/screens/main/MainScreenStyleChip.tsx __tests__/screens/main/MainScreenStyleChip.test.tsx src/screens/main/styles.ts
git commit -m "feat(home): add MainScreenStyleChip component"
```

---

## Task 3: Build the `StyleSheetModal` component

**Files:**
- Create: `src/screens/main/StyleSheetModal.tsx`
- Test: `__tests__/screens/main/StyleSheetModal.test.tsx`
- Modify: `src/screens/main/styles.ts` (add modal-specific styles)

- [ ] **Step 1: Write the failing test**

Create `__tests__/screens/main/StyleSheetModal.test.tsx`:

```tsx
import React from "react";
import { fireEvent } from "@testing-library/react-native";

import { StyleSheetModal } from "../../../src/screens/main/StyleSheetModal";
import { renderWithProviders } from "../../test-utils/renderWithProviders";

jest.mock("@expo/vector-icons", () => ({
  Feather: ({ children }: { children?: React.ReactNode }) => children ?? null,
}));

describe("StyleSheetModal", () => {
  function setup(overrides: Partial<React.ComponentProps<typeof StyleSheetModal>> = {}) {
    const onChange = jest.fn();
    const onClose = jest.fn();
    const utils = renderWithProviders(
      <StyleSheetModal
        visible
        responseLength="brief"
        responseTone="casual"
        onChange={onChange}
        onClose={onClose}
        {...overrides}
      />,
    );
    return { ...utils, onChange, onClose };
  }

  it("renders title, subtitle, and active option descriptions", () => {
    const { getByText } = setup();
    expect(getByText("Style & Length")).toBeTruthy();
    expect(getByText("How the assistant replies to you.")).toBeTruthy();
    // brief description
    expect(
      getByText(/Keep the answer tight/),
    ).toBeTruthy();
    // casual description
    expect(
      getByText(/Speak like a smart friend/),
    ).toBeTruthy();
  });

  it("renders all length and tone pills", () => {
    const { getByText } = setup();
    ["Brief", "Normal", "Thorough"].forEach((label) =>
      expect(getByText(label)).toBeTruthy(),
    );
    ["Professional", "Casual", "Nerdy", "Concise", "Socratic", "ELI5"].forEach(
      (label) => expect(getByText(label)).toBeTruthy(),
    );
  });

  it("calls onChange with new responseLength when a length pill is pressed", () => {
    const { getByText, onChange } = setup();
    fireEvent.press(getByText("Thorough"));
    expect(onChange).toHaveBeenCalledWith({ responseLength: "thorough" });
  });

  it("calls onChange with new responseTone when a tone pill is pressed", () => {
    const { getByText, onChange } = setup();
    fireEvent.press(getByText("Nerdy"));
    expect(onChange).toHaveBeenCalledWith({ responseTone: "nerdy" });
  });

  it("calls onClose when Done button is pressed", () => {
    const { getByText, onClose } = setup();
    fireEvent.press(getByText("Done"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest __tests__/screens/main/StyleSheetModal.test.tsx`
Expected: FAIL — cannot find module `StyleSheetModal`.

- [ ] **Step 3: Add modal styles to `src/screens/main/styles.ts`**

Insert these entries before the closing `});` of `StyleSheet.create`:

```ts
  styleSheetOverlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.16)",
  },
  styleSheetCard: {
    width: "100%",
    alignSelf: "center",
    borderRadius: 30,
    borderWidth: 1,
    padding: 20,
    gap: 18,
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.12,
    shadowRadius: 30,
    elevation: 12,
  },
  styleSheetHeader: {
    gap: 4,
  },
  styleSheetTitle: {
    fontSize: 22,
    lineHeight: 26,
    fontFamily: fonts.display,
  },
  styleSheetSubtitle: {
    fontSize: 13,
    lineHeight: 19,
    fontFamily: fonts.body,
  },
  styleSheetGroup: {
    gap: 8,
  },
  styleSheetGroupLabel: {
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
    fontFamily: fonts.mono,
  },
  styleSheetPillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  styleSheetPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  styleSheetPillText: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: fonts.body,
  },
  styleSheetDescription: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: fonts.body,
    paddingHorizontal: 4,
  },
  styleSheetDoneButton: {
    alignSelf: "stretch",
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  styleSheetDoneButtonText: {
    fontSize: 14,
    fontFamily: fonts.display,
  },
```

- [ ] **Step 4: Create `src/screens/main/StyleSheetModal.tsx`**

```tsx
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  getResponseLengthOptions,
  getResponseToneOptions,
} from "../../components/settings/helpers";
import { useLocalization } from "../../i18n";
import { useTheme } from "../../theme/ThemeContext";
import {
  AssistantResponseLength,
  AssistantResponseTone,
} from "../../types";

import { styles } from "./styles";

interface StyleSheetModalProps {
  visible: boolean;
  responseLength: AssistantResponseLength;
  responseTone: AssistantResponseTone;
  onChange: (
    partial:
      | { responseLength: AssistantResponseLength }
      | { responseTone: AssistantResponseTone },
  ) => void;
  onClose: () => void;
}

export function StyleSheetModal({
  visible,
  responseLength,
  responseTone,
  onChange,
  onClose,
}: StyleSheetModalProps) {
  const { colors } = useTheme();
  const { t } = useLocalization();
  const { height, width } = useWindowDimensions();
  const isLandscape = width > height;
  const cardMaxWidth = isLandscape ? Math.min(width - 40, 760) : 520;

  const lengthOptions = getResponseLengthOptions(t);
  const toneOptions = getResponseToneOptions(t);
  const activeLength = lengthOptions.find((o) => o.value === responseLength);
  const activeTone = toneOptions.find((o) => o.value === responseTone);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.styleSheetOverlay}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          activeOpacity={1}
        />
        <View
          style={[
            styles.styleSheetCard,
            { maxWidth: cardMaxWidth },
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              shadowColor: colors.glow,
            },
          ]}
        >
          <View style={styles.styleSheetHeader}>
            <Text style={[styles.styleSheetTitle, { color: colors.text }]}>
              {t("styleSheetTitle")}
            </Text>
            <Text
              style={[
                styles.styleSheetSubtitle,
                { color: colors.textSecondary },
              ]}
            >
              {t("styleSheetSubtitle")}
            </Text>
          </View>

          <View style={styles.styleSheetGroup}>
            <Text
              style={[styles.styleSheetGroupLabel, { color: colors.textMuted }]}
            >
              {t("adaptiveLength")}
            </Text>
            <View style={styles.styleSheetPillRow}>
              {lengthOptions.map((option) => {
                const active = option.value === responseLength;
                return (
                  <Pressable
                    key={option.value}
                    style={[
                      styles.styleSheetPill,
                      {
                        backgroundColor: active
                          ? colors.accentSoft
                          : colors.surfaceElevated,
                        borderColor: active ? colors.accent : colors.border,
                      },
                    ]}
                    onPress={() => onChange({ responseLength: option.value })}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                  >
                    <Text
                      style={[
                        styles.styleSheetPillText,
                        { color: active ? colors.text : colors.textSecondary },
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            {activeLength ? (
              <Text
                style={[
                  styles.styleSheetDescription,
                  { color: colors.textMuted },
                ]}
              >
                {activeLength.description}
              </Text>
            ) : null}
          </View>

          <View style={styles.styleSheetGroup}>
            <Text
              style={[styles.styleSheetGroupLabel, { color: colors.textMuted }]}
            >
              {t("responseTone")}
            </Text>
            <View style={styles.styleSheetPillRow}>
              {toneOptions.map((option) => {
                const active = option.value === responseTone;
                return (
                  <Pressable
                    key={option.value}
                    style={[
                      styles.styleSheetPill,
                      {
                        backgroundColor: active
                          ? colors.accentSoft
                          : colors.surfaceElevated,
                        borderColor: active ? colors.accent : colors.border,
                      },
                    ]}
                    onPress={() => onChange({ responseTone: option.value })}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                  >
                    <Text
                      style={[
                        styles.styleSheetPillText,
                        { color: active ? colors.text : colors.textSecondary },
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            {activeTone ? (
              <Text
                style={[
                  styles.styleSheetDescription,
                  { color: colors.textMuted },
                ]}
              >
                {activeTone.description}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={[
              styles.styleSheetDoneButton,
              { backgroundColor: colors.accent },
            ]}
            onPress={onClose}
            accessibilityRole="button"
          >
            <Text
              style={[
                styles.styleSheetDoneButtonText,
                { color: colors.surface },
              ]}
            >
              {t("setupGuideFinish")}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
```

Note: `setupGuideFinish` ("Done" / "Fertig") is reused for the dismiss button rather than introducing a new key — the semantics line up and it keeps the i18n surface smaller.

`colors.surface` is intentionally used as the "on-accent" color: in light mode the surface is near-white (legible on the blue accent), in dark mode it's near-black (legible on the light-blue accent). If the `Colors` type later gains a dedicated `onAccent` token, switch to it.

- [ ] **Step 5: Verify the "Done" string the test expects**

The test asserts `getByText("Done")`. Confirm `setupGuideFinish: "Done"` exists in `src/i18n/locales/en.ts` (line ~530). If not, change the test's `getByText("Done")` to whatever string the key resolves to in English.

Run: `grep -n "setupGuideFinish" src/i18n/locales/en.ts`
Expected: line shows `setupGuideFinish: "Done",`.

- [ ] **Step 6: Run test to verify it passes**

Run: `npx jest __tests__/screens/main/StyleSheetModal.test.tsx`
Expected: 5 tests pass.

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add src/screens/main/StyleSheetModal.tsx __tests__/screens/main/StyleSheetModal.test.tsx src/screens/main/styles.ts
git commit -m "feat(home): add StyleSheetModal with length and tone pickers"
```

---

## Task 4: Wire chip + modal into MainScreen

**Files:**
- Modify: `src/screens/MainScreen.tsx` (imports, state, two render sites)

- [ ] **Step 1: Add imports**

In `src/screens/MainScreen.tsx`, near the existing import of `MainScreenRouteCard` (line 60), add two new imports:

```ts
import { MainScreenStyleChip } from "./main/MainScreenStyleChip";
import { StyleSheetModal } from "./main/StyleSheetModal";
```

- [ ] **Step 2: Add modal visibility state**

Find the block where component state hooks are declared near the top of the `MainScreen` function (search for an existing `useState` declaration like `setDrawerVisible` and add nearby):

```ts
const [styleSheetVisible, setStyleSheetVisible] = React.useState(false);
```

If `React` isn't already imported as a namespace at the top of the file, use `useState` from React's named export instead — match the existing convention in the file.

- [ ] **Step 3: Wire chip into the portrait layout**

Find the portrait `MainScreenRouteCard` render site (around line 1196). Immediately after the closing `/>` of that `MainScreenRouteCard`, insert:

```tsx
{loaded && availableResponseModes.length > 0 ? (
  <MainScreenStyleChip
    responseLength={settings.responseLength}
    responseTone={settings.responseTone}
    onPress={() => setStyleSheetVisible(true)}
  />
) : null}
```

- [ ] **Step 4: Wire chip into the landscape layout**

Find the landscape `MainScreenRouteCard` render site (around line 1082). Immediately after its closing `/>` and before the `<View style={styles.landscapeStageArea}>` opening tag, insert the same block:

```tsx
{loaded && availableResponseModes.length > 0 ? (
  <MainScreenStyleChip
    responseLength={settings.responseLength}
    responseTone={settings.responseTone}
    onPress={() => setStyleSheetVisible(true)}
  />
) : null}
```

- [ ] **Step 5: Render the modal once at the top level**

Find where other modals (e.g. `StatusDetailsModal`, `TranscriptModal`) are rendered near the end of `MainScreen`'s JSX. Add the `StyleSheetModal` alongside them:

```tsx
<StyleSheetModal
  visible={styleSheetVisible}
  responseLength={settings.responseLength}
  responseTone={settings.responseTone}
  onChange={(partial) => updateSettings(partial)}
  onClose={() => setStyleSheetVisible(false)}
/>
```

If `updateSettings` requires a `Partial<Omit<Settings, "apiKeys" | "providerModels">>` shape, the inline object satisfies it. Verify with typecheck in the next step.

- [ ] **Step 6: Typecheck and run full test suite**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npx jest`
Expected: all tests pass — including the new chip, modal, and i18n tests.

- [ ] **Step 7: Manual smoke test**

This is a UI feature; type checks and unit tests don't cover the live render. Run the app and verify:

```bash
npx expo start
```

Then, in the running app:
1. With no provider configured: chip is **not** visible on home.
2. After configuring a provider: chip appears below the Route Card showing `Style — Casual · Normal` (or whatever the current settings are).
3. Tap the chip → modal opens with both pickers and active descriptions.
4. Tap a different length pill → chip updates to show the new length.
5. Tap a different tone pill → chip updates to show the new tone.
6. Switch language to German in Settings → chip reads `Stil — …`.
7. Tap "Done" → modal closes.
8. Tap outside the modal card → modal closes.
9. Open Settings → Instructions and confirm the same values are reflected there (single source of truth).
10. Rotate to landscape → chip still appears below the Route Card.

If any step fails, fix it and re-run. Don't claim done until all 10 pass.

- [ ] **Step 8: Commit**

```bash
git add src/screens/MainScreen.tsx
git commit -m "feat(home): surface Style chip + sheet on main screen"
```

---

## Self-Review

**Spec coverage:**

| Spec requirement | Task |
|---|---|
| Single chip showing `Style — <tone> · <length>` | Task 2 |
| Modal with both pickers and active descriptions | Task 3 |
| Reuse existing tone/length labels + descriptions | Task 2 & 3 (via `helpers.ts`) |
| Global persistence via existing `onUpdate` path | Task 4 (Step 5) |
| Hide chip when no reply mode available | Task 4 (Steps 3 & 4 — `availableResponseModes.length > 0`) |
| Mid-session always tappable | Task 4 (no gating on session state) |
| Dismiss on tap-outside / Done | Task 3 (overlay press + Done button) |
| Settings → Instructions unchanged | No tasks modify `InstructionsTab.tsx` |
| New i18n keys | Task 1 |
| `MainScreenStyleChip` + `StyleSheetModal` files | Task 2 & 3 |
| Landscape + portrait support | Task 4 (Steps 3 & 4) |

No gaps.

**Placeholder scan:** No "TBD" / "fill in later" / "add validation" / "implement later". One conditional fallback ("if `colors.onAccent` doesn't exist") in Task 3 — explicitly handled with a concrete substitute.

**Type consistency:** `responseLength: AssistantResponseLength`, `responseTone: AssistantResponseTone`, and `onChange` partial shapes match across `MainScreenStyleChip`, `StyleSheetModal`, and the `MainScreen` wiring. Both new components import the existing types from `src/types.ts`.

**Reused i18n key for "Done":** Task 3 reuses `setupGuideFinish` rather than adding a new key, on the assumption it already maps to "Done"/"Fertig". Verified at Step 5 of Task 3 with a `grep` check.
