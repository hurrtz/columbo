# Android Local Development Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Columbo reliable to build and run on a local Android device from the existing Expo/React Native Android project.

**Architecture:** Keep the existing native Android project and Expo Router entrypoint. Align the native Android Gradle metadata with `app.json`, add a concise local-dev note, and verify the debug build path without changing release signing or store configuration.

**Tech Stack:** Expo 55, React Native 0.83.2, Android Gradle Plugin via Expo, Kotlin Android native host, Hermes.

---

## File Structure

- Modify `.gitignore`: track the minimal Android build entrypoints while keeping generated Android output ignored.
- Modify `android/app/build.gradle`: align `versionCode` and `versionName` with `app.json` so local Android builds reflect the current app version.
- Modify `android/gradle/wrapper/gradle-wrapper.properties`: use Gradle 8.14.3 so the current React Native Foojay toolchain resolver does not crash before compilation.
- Create `docs/android-local-development.md`: record the local device workflow, required host tools, useful commands, and known Android voice limitation.
- No runtime TypeScript files should change in this pass unless verification uncovers an Android-only blocker.

## Task 1: Align Android Native Version Metadata

**Files:**
- Modify: `.gitignore`
- Modify: `android/app/build.gradle`
- Reference: `app.json`

- [ ] **Step 1: Make Android build entrypoints trackable**

Add these exceptions below `/android/*` in `.gitignore`:

```gitignore
!/android/build.gradle
!/android/gradle.properties
!/android/gradle/
!/android/gradle/wrapper/
!/android/gradle/wrapper/gradle-wrapper.jar
!/android/gradle/wrapper/gradle-wrapper.properties
!/android/gradlew
!/android/gradlew.bat
!/android/settings.gradle
```

Add this exception below `/android/app/*`:

```gitignore
!/android/app/build.gradle
```

- [ ] **Step 2: Confirm current metadata mismatch**

Run:

```bash
node -e 'const app=require("./app.json").expo; console.log({expoVersion: app.version, androidVersionCode: app.android.versionCode});'
rg -n 'versionCode|versionName' android/app/build.gradle
```

Expected:

```text
{ expoVersion: '2.1.1', androidVersionCode: 5 }
android/app/build.gradle:...:        versionCode 3
android/app/build.gradle:...:        versionName "2.0.0"
```

- [ ] **Step 3: Update native Android metadata**

Change this block in `android/app/build.gradle`:

```gradle
        versionCode 3
        versionName "2.0.0"
```

to:

```gradle
        versionCode 5
        versionName "2.1.1"
```

- [ ] **Step 4: Re-check metadata**

Run:

```bash
rg -n 'versionCode|versionName' android/app/build.gradle
```

Expected:

```text
android/app/build.gradle:...:        versionCode 5
android/app/build.gradle:...:        versionName "2.1.1"
```

## Task 2: Add Local Android Development Notes

**Files:**
- Create: `docs/android-local-development.md`
- Modify: `android/gradle/wrapper/gradle-wrapper.properties`
- Reference: `package.json`
- Reference: `android/gradle.properties`

- [ ] **Step 1: Pin the Android Gradle wrapper**

Change this line in `android/gradle/wrapper/gradle-wrapper.properties`:

```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-9.0.0-bin.zip
```

to:

```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.14.3-bin.zip
```

This avoids the React Native included build failure:

```text
Class org.gradle.jvm.toolchain.JvmVendorSpec does not have member field 'org.gradle.jvm.toolchain.JvmVendorSpec IBM_SEMERU'
```

- [ ] **Step 2: Add the local development guide**

Create `docs/android-local-development.md` with:

```markdown
# Android Local Development

Columbo already contains a native Android project under `android/`. Use this path for local device development; do not regenerate the native project unless an Expo upgrade requires it.

## Prerequisites

- Android Studio with the Android SDK installed.
- A JDK compatible with the Android Gradle Plugin used by Expo SDK 55. Android Studio's bundled JBR works.
- A physical Android device with USB debugging enabled, or a running Android emulator.
- Project dependencies installed with `npm install`.

## Run On A Device

From the repo root:

```bash
npm run android
```

This runs `expo run:android`, builds the native Android debug app, installs it on the selected device, and starts Metro.

If Metro is already running, keep it open and run:

```bash
npx expo run:android
```

## Build Without Installing

From the repo root:

```bash
cd android
./gradlew assembleDebug
```

The debug APK is written under `android/app/build/outputs/apk/debug/`.

## Useful Checks

```bash
adb devices
npx tsc --noEmit
cd android && ./gradlew assembleDebug
```

## Android Notes

- The project wrapper is pinned to Gradle 8.14.3. Gradle 9.0.0 currently trips React Native's included Foojay toolchain resolver before app compilation.
- Microphone, foreground service, and media playback permissions are declared in `app.json` and `android/app/src/main/AndroidManifest.xml`.
- Android native `expo-speech` pause is not available through Expo. The app should keep surfacing its existing pause fallback instead of pretending pause/resume is supported for that route.
- Release signing and Play Store/internal testing setup are out of scope for local development.
```

- [ ] **Step 3: Verify the guide mentions the repo command**

Run:

```bash
rg -n 'npm run android|assembleDebug|expo-speech' docs/android-local-development.md
```

Expected output includes all three terms.

## Task 3: Verify Local Android Debug Build Health

**Files:**
- No code changes expected.

- [ ] **Step 1: Run TypeScript verification**

Run:

```bash
npx tsc --noEmit
```

Expected: command exits with status 0.

- [ ] **Step 2: Run Android debug build**

Run:

```bash
cd android
./gradlew assembleDebug
```

Expected: command exits with status 0 and produces `android/app/build/outputs/apk/debug/app-debug.apk`.

If this fails because Android SDK, Gradle, or JDK is missing or misconfigured, capture the exact failing message and do not add workaround code.

- [ ] **Step 3: Check final diff**

Run:

```bash
git diff -- .gitignore android/app/build.gradle android/gradle/wrapper/gradle-wrapper.properties docs/android-local-development.md docs/superpowers/specs/2026-07-01-android-local-development-design.md docs/superpowers/plans/2026-07-01-android-local-development.md
git status --short
```

Expected: only the planned Android metadata and documentation files changed.
