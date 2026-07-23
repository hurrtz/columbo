# Android Native Parity Design

## Goal

Make Android expose the same native Mr Broccoli waveform and audio playback capabilities that iOS currently exposes through Swift/Objective-C, so the React Native app can use equivalent recording, waveform analysis, playback events, output waveform state, and native waveform rendering on both platforms.

## Current State

iOS exports three native surfaces:

- `MrBroccoliNativeWaveform`: recording, recording lifecycle events, audio-file waveform analysis, and output waveform playback state.
- `MrBroccoliNativeAudioQueue`: queued audio-file playback with `started`, `finished`, `failed`, `stopped`, and `drained` events.
- `MrBroccoliNativeWaveformView`: a native view that renders input and output waveform channels from shared native waveform state.

Android currently exports only `MrBroccoliNativeWaveform`. Its recording route works well enough for local emulator smoke tests, but the rest of the contract is incomplete:

- `analyzeAudioFile()` returns `null`.
- `startOutputPlayback()` returns `false`.
- `stopOutputPlayback()` returns `false`.
- There is no Android `MrBroccoliNativeAudioQueue`.
- There is no Android `MrBroccoliNativeWaveformView`.
- React Native service gates still restrict native audio queue, native output waveform playback, and native waveform view rendering to iOS.

## Exported Capability Map

| Capability | iOS Source | Android Target |
| --- | --- | --- |
| Start/stop/cancel native recording | `ios/MrBroccoli/MrBroccoliNativeWaveform.swift`, `ios/MrBroccoli/Waveform/MrBroccoliWaveformRecorder.swift` | Existing `MrBroccoliNativeWaveformModule.kt`, refined for event and file-shape parity |
| Emit recording lifecycle and level events | `MrBroccoliWaveformRecorder`, `MrBroccoliWaveformLevelEmitter` | Existing module, keep event names and payload shape aligned |
| Analyze audio files into peak samples and duration | `MrBroccoliWaveformFileAnalyzer.swift` | New Kotlin analyzer using `MediaExtractor` + `MediaCodec` PCM decoding |
| Store output waveform playback state | `MrBroccoliWaveformCoordinator.swift` | New Android waveform state coordinator shared by module and view |
| Start/stop output waveform playback state | `MrBroccoliNativeWaveform.startOutputPlayback/stopOutputPlayback` | Implement real Kotlin methods returning `true` and updating coordinator state |
| Queue audio-file playback | `MrBroccoliNativeAudioQueue.m`, `MrBroccoliAudioQueueCoordinator.m` | New `MrBroccoliNativeAudioQueueModule.kt` using Android media playback |
| Emit audio queue events | `MrBroccoliAudioQueueCoordinator.m` | Android module emits the same event types and context fields |
| Render native waveform view | `MrBroccoliNativeWaveformView.swift` | New Android `ViewManager` and custom `View` consuming shared coordinator state |

## Architecture

Android should mirror the iOS module boundaries where that keeps the JavaScript contract simple:

- Keep `MrBroccoliNativeWaveformModule.kt` as the bridge module for recording, analysis, and output waveform state.
- Add focused Kotlin helpers under the app package:
  - `MrBroccoliWaveformAudioAnalyzer.kt` for file decoding and peak extraction.
  - `MrBroccoliWaveformStateCoordinator.kt` for input/output samples and playback windows.
  - `MrBroccoliNativeWaveformViewManager.kt` and `MrBroccoliWaveformView.kt` for native rendering.
  - `MrBroccoliNativeAudioQueueModule.kt` for queued playback and event emission.
- Register both native modules and the waveform view manager from `MrBroccoliNativeWaveformPackage.kt`.
- Update JS platform gates only after Android native implementations exist and are registered.

The Android implementation does not need to clone AVFoundation internals. It must match the public contract and observable behavior that the React Native app depends on.

## Recording Parity

The existing Android recorder may continue using `MediaRecorder` for the first parity pass if it preserves the JS contract:

- Reject blank `sessionId`.
- Reject overlapping sessions.
- Resolve `startRecording` and `stopRecording` with `{ uri }`.
- Resolve `cancelRecording` with `true` for an active matching session and `false` when there is no matching active session.
- Emit `started`, `stopped`, `cancelled`, `levels`, and `error` events through `MrBroccoliNativeWaveformEvent`.
- Produce an audio file that app STT routes can consume.

The iOS recorder writes mono 16 kHz PCM WAV. Android currently writes AAC-in-MP4 at 16 kHz. That is acceptable only if downstream STT and waveform analysis consume it reliably. If analysis or STT exposes format-specific issues, Android recording should move to a PCM WAV recorder in a later slice.

## Waveform Analysis Parity

Android `analyzeAudioFile(uri, sampleCount)` should:

- Resolve file URIs and plain file paths.
- Reject missing files with `native_waveform_analysis_error`.
- Decode common app-produced audio files with Android media APIs.
- Downmix multi-channel audio by taking the strongest channel magnitude per frame.
- Return at least `max(64, sampleCount ?? 960)` normalized peak samples when the file has audio.
- Return `{ samples: [], durationMs: 0 }` for zero-frame decodes.
- Return `durationMs` from decoded frame count and sample rate when available, falling back to metadata duration.

This should match the intent of iOS `MrBroccoliWaveformFileAnalyzer`: compact, normalized peak samples for output visualization, not archival DSP precision.

## Audio Queue Parity

Android should add `MrBroccoliNativeAudioQueue` with the same JS methods:

- `prepare(): Promise<boolean>`
- `enqueue(uri, itemId, requestId, source): Promise<boolean>`
- `start(): Promise<boolean>`
- `pause(): Promise<boolean>`
- `resume(): Promise<boolean>`
- `stop(): Promise<boolean>`

Event payloads should match iOS:

- `started`: includes `itemId`, `uri`, `requestId`, `source`
- `finished`: includes `itemId`, `uri`, `requestId`, `source`
- `failed`: includes `itemId`, `uri`, `requestId`, `source`, `message`
- `stopped`: includes `itemId`, `uri`, `requestId`, `source`
- `drained`: no item fields required

The Android queue can use one `MediaPlayer` at a time plus an in-memory FIFO. It should emit `started` only when playback actually begins, advance to the next queued item after finish/failure, and emit `drained` when no current or queued items remain.

## Native Waveform View Parity

Android should add `MrBroccoliNativeWaveformView` so `NativeWaveformView.tsx` can render native waveform channels on Android as well as iOS. The Android view should support the existing props:

- `channel`: `input` or `output`
- `active`: boolean
- `lineColor`
- `baselineColor`
- `lineWidth`
- `renderStyle`: `automatic`, `waveform`, or `envelope`

The first Android view can use Android `Canvas` instead of Core Animation layers. It should preserve the visible contract: a baseline, an envelope-style input waveform, an output waveform shape, and frame updates while active and attached.

## JavaScript Changes

After Android native support is implemented:

- `src/services/nativeAudioQueue.ts` should not restrict availability to iOS.
- `src/services/nativeWaveform.ts` should not restrict output waveform playback support to iOS.
- `src/components/NativeWaveformView.tsx` should require `MrBroccoliNativeWaveformView` on Android as well.
- `src/hooks/useAudioPlayer.ts` should select the native audio queue when the module is available, not because the platform is iOS.
- `waitForPlaybackRouteSettle` should continue to be iOS-only unless Android needs an equivalent route-settle wait.

## Testing

Use test-first slices:

- Unit-test JS platform gates with mocked `Platform.OS` and `NativeModules`.
- Add focused Kotlin JVM tests for pure helpers where possible, especially waveform sample normalization and peak extraction.
- Use Gradle build verification for native module registration and Android compilation.
- Use emulator smoke tests for recording, waveform event delivery, audio queue playback events, output waveform startup/stop, and visible native waveform view rendering.

Baseline verification for each implementation slice:

- `npx tsc --noEmit`
- focused Jest tests for touched JS services/hooks/components
- `cd android && ./gradlew assembleDebug`

Native parity completion requires an emulator or device smoke pass. Passing TypeScript and Gradle alone is not enough.

## Commit Strategy

Use small commits in this order:

1. Design and implementation plan.
2. Android waveform analysis implementation and tests.
3. Android audio queue module and JS availability gates.
4. Android output waveform state implementation.
5. Android native waveform view implementation.
6. Final Android emulator smoke fixes and documentation updates.

## Out Of Scope

- Play Store release signing.
- Replacing all Android audio recording with a custom PCM WAV recorder unless parity testing proves the current AAC route is insufficient.
- Redesigning the app waveform visuals beyond matching the current native contract.
