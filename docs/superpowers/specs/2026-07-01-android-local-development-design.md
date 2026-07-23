# Android Local Development Design

## Goal

Make Mr Broccoli straightforward to run and debug on a local Android device with the existing Expo/React Native bare Android project. This pass is for developer feedback loops, not Play Store release readiness.

## Current State

- The repo already contains an `android/` native project and `app.json` Android configuration.
- `package.json` exposes `npm run android` as `expo run:android`.
- Android permissions already include microphone recording, audio settings, foreground service, and media playback service support.
- App metadata is out of sync: `app.json` uses version `2.1.1` / Android `versionCode` `5`, while `android/app/build.gradle` still uses version `2.0.0` / `versionCode` `3`.
- The Android wrapper started on Gradle `9.0.0`, but React Native's included Foojay toolchain resolver crashes before app compilation on this dependency set.
- Existing project notes record one expected Android limitation: native `expo-speech` pause is unavailable and should surface the current fallback behavior.

## Scope

This pass will:

- Align native Android app metadata with `app.json`.
- Pin the Android Gradle wrapper to a version that works with the current React Native/Expo Android toolchain.
- Track the minimal Android build entrypoints needed to preserve local-development fixes.
- Inspect Android manifest/build configuration for local device blockers.
- Add a concise local Android development note or script only if the existing repo lacks a clear path.
- Verify TypeScript and Android debug build health.
- Keep release signing, Play Store metadata, store privacy declarations, and full voice parity QA out of scope.

## Approach

Use the existing native Android project as the source of truth for local device execution. Keep changes minimal and config-focused. Avoid regenerating native projects or churning unrelated lockfiles.

## Verification

Baseline verification should include:

- `npx tsc --noEmit`
- Targeted Jest tests only if touched files affect tested runtime behavior.
- `cd android && ./gradlew assembleDebug` or the closest available Android build command if local SDK configuration allows it.

If Gradle cannot run because the local Android SDK/JDK environment is missing or misconfigured, capture the exact blocker and leave the repo changes in a state that is still typechecked.
