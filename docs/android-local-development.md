# Android Local Development

SchnackAI contains a native Android project under `android/`. Use this path for local device development; do not regenerate the native project unless an Expo upgrade requires it.

The repo tracks the Android build entrypoints (`build.gradle`, `settings.gradle`, `gradle.properties`, the Gradle wrapper, `android/app/build.gradle`), app manifests, required launcher/splash resources, and custom native Kotlin sources. Build output stays ignored.

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

For emulator sessions where you install with Gradle directly, start Metro in development-build mode on a host the emulator can reach:

```bash
npx expo start --dev-client --host lan
adb reverse tcp:8081 tcp:8081
cd android && ./gradlew installDebug
adb shell am start -n com.tobiaswinkler.schnackai/.MainActivity
```

Avoid `npx expo start --localhost` for this path: on macOS it can bind Metro only to loopback, while Android probes the host at `10.0.2.2:8081`.

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
