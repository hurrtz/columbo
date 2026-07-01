# Android Native Parity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring SchnackAI's Android native waveform and audio playback implementation to feature parity with the existing iOS Swift/Objective-C native modules.

**Architecture:** Mirror the iOS public native contracts on Android while using Android-native media and drawing APIs internally. Keep bridge modules small, move pure waveform analysis/state/rendering helpers into focused Kotlin files, and update JavaScript platform gates only after Android has registered real native implementations.

**Tech Stack:** Expo 55, React Native 0.83.2, Kotlin Android native modules, Android `MediaRecorder`, `MediaExtractor`, `MediaCodec`, `MediaPlayer`, Android `Canvas`, Jest, Gradle.

---

## File Structure

- Modify `android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackNativeWaveformModule.kt`: replace analysis/playback stubs with real behavior and wire input/output waveform state.
- Modify `android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackNativeWaveformPackage.kt`: register the audio queue module and native waveform view manager.
- Create `android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackWaveformAudioAnalyzer.kt`: decode local audio files and produce normalized peak samples plus duration.
- Create `android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackWaveformStateCoordinator.kt`: hold input/output waveform samples and output playback window state.
- Create `android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackNativeAudioQueueModule.kt`: expose the same audio queue methods/events as iOS.
- Create `android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackWaveformView.kt`: draw waveform/envelope visuals with Android `Canvas`.
- Create `android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackNativeWaveformViewManager.kt`: expose the Android view as `SchnackNativeWaveformView`.
- Modify `src/services/nativeWaveform.ts`: allow Android output waveform playback once the module methods exist.
- Modify `src/services/nativeAudioQueue.ts`: allow Android native audio queue once the module exists.
- Modify `src/components/NativeWaveformView.tsx`: load the native waveform view on Android and iOS.
- Modify `src/hooks/useAudioPlayer.ts`: choose native audio queue based on module availability, preserving iOS-only route-settle waits.
- Add focused Jest tests under `__tests__/services/` and `__tests__/hooks/` for platform gate behavior.
- Add focused Android unit tests under `android/app/src/test/java/com/tobiaswinkler/schnackai/` for pure waveform helper behavior when local Gradle test support is available.

## Task 1: Commit The Native Parity Design And Plan

**Files:**
- Create: `docs/superpowers/specs/2026-07-01-android-native-parity-design.md`
- Create: `docs/superpowers/plans/2026-07-01-android-native-parity.md`

- [ ] **Step 1: Review the design for concrete parity requirements**

Run:

```bash
rg -n "SchnackNativeWaveform|SchnackNativeAudioQueue|SchnackNativeWaveformView|analyzeAudioFile|drained" docs/superpowers/specs/2026-07-01-android-native-parity-design.md
```

Expected: output includes the three native surfaces, waveform analysis, and audio queue event requirements.

- [ ] **Step 2: Commit the docs**

Run:

```bash
git add docs/superpowers/specs/2026-07-01-android-native-parity-design.md docs/superpowers/plans/2026-07-01-android-native-parity.md
git commit -m "docs(android): map native parity work"
```

Expected: commit succeeds with only the two docs staged.

## Task 2: Add Android Waveform Analysis

**Files:**
- Create: `android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackWaveformAudioAnalyzer.kt`
- Modify: `android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackNativeWaveformModule.kt`
- Test: `android/app/src/test/java/com/tobiaswinkler/schnackai/SchnackWaveformAudioAnalyzerTest.kt` if Gradle unit tests can run in this repo

- [ ] **Step 1: Write failing analyzer tests**

Create `android/app/src/test/java/com/tobiaswinkler/schnackai/SchnackWaveformAudioAnalyzerTest.kt`:

```kotlin
package com.tobiaswinkler.schnackai

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class SchnackWaveformAudioAnalyzerTest {
  @Test
  fun peakSamplesUseAtLeastSixtyFourBuckets() {
    val samples = listOf(0.0f, 0.25f, -0.5f, 1.0f, -1.0f)

    val peaks = SchnackWaveformAudioAnalyzer.extractPeakSamples(
      samples = samples,
      targetCount = 8,
    )

    assertEquals(64, peaks.size)
    assertTrue(peaks.maxOrNull()!! <= 1.0)
    assertTrue(peaks.minOrNull()!! >= 0.0)
    assertTrue(peaks.any { it > 0.9 })
  }

  @Test
  fun peakSamplesRespectRequestedTargetCount() {
    val samples = (0 until 1000).map { index ->
      if (index % 2 == 0) 0.8f else -0.2f
    }

    val peaks = SchnackWaveformAudioAnalyzer.extractPeakSamples(
      samples = samples,
      targetCount = 128,
    )

    assertEquals(128, peaks.size)
    assertTrue(peaks.all { it in 0.0..1.0 })
  }
}
```

- [ ] **Step 2: Run the failing Android unit test**

Run:

```bash
cd android
./gradlew :app:testDebugUnitTest --tests '*SchnackWaveformAudioAnalyzerTest'
```

Expected: fails because `SchnackWaveformAudioAnalyzer` does not exist.

- [ ] **Step 3: Implement the analyzer helper**

Create `android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackWaveformAudioAnalyzer.kt` with:

```kotlin
package com.tobiaswinkler.schnackai

import android.media.MediaCodec
import android.media.MediaExtractor
import android.media.MediaFormat
import android.net.Uri
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableMap
import java.io.File
import java.nio.ByteBuffer
import java.nio.ByteOrder
import kotlin.math.abs
import kotlin.math.ceil
import kotlin.math.max

object SchnackWaveformAudioAnalyzer {
  fun analyze(
    reactContext: ReactApplicationContext,
    uri: String,
    sampleCount: Int?,
  ): WritableMap {
    val file = resolveFile(uri)
    if (!file.exists()) {
      throw IllegalArgumentException("The audio file could not be found for waveform analysis.")
    }

    val targetCount = max(64, sampleCount ?: 960)
    val decoded = decodePcmSamples(file)
    val durationMs =
      if (decoded.sampleRate > 0 && decoded.samples.isNotEmpty()) {
        decoded.samples.size.toDouble() / decoded.sampleRate.toDouble() * 1000.0
      } else {
        decoded.durationUs.coerceAtLeast(0L).toDouble() / 1000.0
      }

    val samples = extractPeakSamples(decoded.samples, targetCount)
    return Arguments.createMap().apply {
      putArray(
        "samples",
        Arguments.createArray().apply {
          samples.forEach { pushDouble(it) }
        },
      )
      putDouble("durationMs", durationMs)
    }
  }

  fun extractPeakSamples(samples: List<Float>, targetCount: Int): List<Double> {
    val count = max(64, targetCount)
    if (samples.isEmpty()) {
      return emptyList()
    }

    val bucketSize = ceil(samples.size.toDouble() / count.toDouble()).toInt().coerceAtLeast(1)
    return (0 until count).map { bucketIndex ->
      val start = bucketIndex * bucketSize
      val end = minOf(samples.size, start + bucketSize)
      if (start >= samples.size || start >= end) {
        0.0
      } else {
        var peak = 0.0f
        for (index in start until end) {
          peak = max(peak, abs(samples[index]))
        }
        peak.coerceIn(0.0f, 1.0f).toDouble()
      }
    }
  }

  private fun resolveFile(uri: String): File {
    val parsed = Uri.parse(uri)
    val path = if (parsed.scheme == "file") parsed.path else uri
    require(!path.isNullOrBlank()) {
      "The audio file could not be found for waveform analysis."
    }
    return File(path)
  }

  private fun decodePcmSamples(file: File): DecodedAudio {
    val extractor = MediaExtractor()
    extractor.setDataSource(file.absolutePath)
    try {
      val trackIndex = selectAudioTrack(extractor)
      if (trackIndex < 0) {
        return DecodedAudio(emptyList(), 0, 0L)
      }

      extractor.selectTrack(trackIndex)
      val format = extractor.getTrackFormat(trackIndex)
      val mime = format.getString(MediaFormat.KEY_MIME)
        ?: return DecodedAudio(emptyList(), 0, 0L)
      val sampleRate = format.getInteger(MediaFormat.KEY_SAMPLE_RATE)
      val channelCount = format.getInteger(MediaFormat.KEY_CHANNEL_COUNT).coerceAtLeast(1)
      val durationUs =
        if (format.containsKey(MediaFormat.KEY_DURATION)) {
          format.getLong(MediaFormat.KEY_DURATION)
        } else {
          0L
        }

      val codec = MediaCodec.createDecoderByType(mime)
      codec.configure(format, null, null, 0)
      codec.start()
      try {
        val samples = drainDecoder(extractor, codec, channelCount)
        return DecodedAudio(samples, sampleRate, durationUs)
      } finally {
        codec.stop()
        codec.release()
      }
    } finally {
      extractor.release()
    }
  }

  private fun selectAudioTrack(extractor: MediaExtractor): Int {
    for (index in 0 until extractor.trackCount) {
      val format = extractor.getTrackFormat(index)
      val mime = format.getString(MediaFormat.KEY_MIME) ?: continue
      if (mime.startsWith("audio/")) {
        return index
      }
    }
    return -1
  }

  private fun drainDecoder(
    extractor: MediaExtractor,
    codec: MediaCodec,
    channelCount: Int,
  ): List<Float> {
    val bufferInfo = MediaCodec.BufferInfo()
    val samples = mutableListOf<Float>()
    var inputDone = false
    var outputDone = false

    while (!outputDone) {
      if (!inputDone) {
        val inputIndex = codec.dequeueInputBuffer(10_000)
        if (inputIndex >= 0) {
          val inputBuffer = codec.getInputBuffer(inputIndex)
          val size = inputBuffer?.let { extractor.readSampleData(it, 0) } ?: -1
          if (size < 0) {
            codec.queueInputBuffer(
              inputIndex,
              0,
              0,
              0L,
              MediaCodec.BUFFER_FLAG_END_OF_STREAM,
            )
            inputDone = true
          } else {
            codec.queueInputBuffer(
              inputIndex,
              0,
              size,
              extractor.sampleTime.coerceAtLeast(0L),
              0,
            )
            extractor.advance()
          }
        }
      }

      val outputIndex = codec.dequeueOutputBuffer(bufferInfo, 10_000)
      if (outputIndex >= 0) {
        val outputBuffer = codec.getOutputBuffer(outputIndex)
        if (outputBuffer != null && bufferInfo.size > 0) {
          appendPcm16Samples(outputBuffer, bufferInfo.offset, bufferInfo.size, channelCount, samples)
        }
        outputDone = bufferInfo.flags and MediaCodec.BUFFER_FLAG_END_OF_STREAM != 0
        codec.releaseOutputBuffer(outputIndex, false)
      }
    }

    return samples
  }

  private fun appendPcm16Samples(
    buffer: ByteBuffer,
    offset: Int,
    size: Int,
    channelCount: Int,
    output: MutableList<Float>,
  ) {
    val duplicate = buffer.duplicate().order(ByteOrder.LITTLE_ENDIAN)
    duplicate.position(offset)
    duplicate.limit(offset + size)

    val shorts = size / 2
    var index = 0
    while (index < shorts) {
      var peak = 0.0f
      for (channel in 0 until channelCount) {
        if (index >= shorts) {
          break
        }
        peak = max(peak, abs(duplicate.short / Short.MAX_VALUE.toFloat()))
        index += 1
      }
      output.add(peak.coerceIn(0.0f, 1.0f))
    }
  }

  private data class DecodedAudio(
    val samples: List<Float>,
    val sampleRate: Int,
    val durationUs: Long,
  )
}
```

- [ ] **Step 4: Wire `analyzeAudioFile`**

In `SchnackNativeWaveformModule.kt`, replace:

```kotlin
  @ReactMethod
  fun analyzeAudioFile(uri: String, sampleCount: Double?, promise: Promise) {
    promise.resolve(null)
  }
```

with:

```kotlin
  @ReactMethod
  fun analyzeAudioFile(uri: String, sampleCount: Double?, promise: Promise) {
    try {
      promise.resolve(
        SchnackWaveformAudioAnalyzer.analyze(
          reactApplicationContext,
          uri,
          sampleCount?.toInt(),
        ),
      )
    } catch (error: Exception) {
      promise.reject(
        "native_waveform_analysis_error",
        error.message ?: "The audio file could not be analyzed for waveform output.",
        error,
      )
    }
  }
```

- [ ] **Step 5: Verify analyzer tests and build**

Run:

```bash
cd android
./gradlew :app:testDebugUnitTest --tests '*SchnackWaveformAudioAnalyzerTest'
./gradlew assembleDebug
```

Expected: both commands exit 0.

- [ ] **Step 6: Commit waveform analysis**

Run:

```bash
git add android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackWaveformAudioAnalyzer.kt android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackNativeWaveformModule.kt android/app/src/test/java/com/tobiaswinkler/schnackai/SchnackWaveformAudioAnalyzerTest.kt
git commit -m "feat(android): analyze native audio waveforms"
```

## Task 3: Add Android Native Audio Queue

**Files:**
- Create: `android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackNativeAudioQueueModule.kt`
- Modify: `android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackNativeWaveformPackage.kt`
- Modify: `src/services/nativeAudioQueue.ts`
- Modify: `src/hooks/useAudioPlayer.ts`
- Test: `__tests__/services/nativeAudioQueue.test.ts`

- [ ] **Step 1: Write failing JS availability tests**

Create `__tests__/services/nativeAudioQueue.test.ts`:

```typescript
describe("nativeAudioQueue", () => {
  const originalPlatform = jest.requireActual("react-native").Platform.OS;

  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    const reactNative = require("react-native");
    Object.defineProperty(reactNative.Platform, "OS", {
      value: originalPlatform,
      configurable: true,
    });
  });

  it("is available on Android when the native module is registered", () => {
    const reactNative = require("react-native");
    Object.defineProperty(reactNative.Platform, "OS", {
      value: "android",
      configurable: true,
    });
    reactNative.NativeModules.SchnackNativeAudioQueue = {
      prepare: jest.fn(),
      enqueue: jest.fn(),
      start: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      stop: jest.fn(),
    };

    const { isNativeAudioQueueAvailable } = require("../../src/services/nativeAudioQueue");

    expect(isNativeAudioQueueAvailable()).toBe(true);
  });
});
```

- [ ] **Step 2: Run the failing JS test**

Run:

```bash
npm test -- --runInBand --watchman=false __tests__/services/nativeAudioQueue.test.ts
```

Expected: fails because availability is restricted to iOS.

- [ ] **Step 3: Implement Android audio queue module**

Create `SchnackNativeAudioQueueModule.kt` with a FIFO-backed `MediaPlayer` implementation exposing `prepare`, `enqueue`, `start`, `pause`, `resume`, and `stop`, emitting `SchnackNativeAudioQueueEvent` payloads with the iOS field names.

The implementation must:

- Reject blank `uri` or `itemId` with `audio_queue_enqueue_error`.
- Return `false` from `start` and `resume` when no current or queued item exists.
- Emit `started` after `MediaPlayer.start()`.
- Emit `finished` from `setOnCompletionListener`.
- Emit `failed` from `setOnErrorListener`.
- Emit `stopped` for current and queued items when `stop()` is called.
- Emit `drained` when the current item and queue are empty.
- Release the current `MediaPlayer` in `invalidate()`.

- [ ] **Step 4: Register the module**

Update `SchnackNativeWaveformPackage.kt`:

```kotlin
  ): List<NativeModule> =
    listOf(
      SchnackNativeWaveformModule(reactContext),
      SchnackNativeAudioQueueModule(reactContext),
    )
```

- [ ] **Step 5: Remove iOS-only JS audio queue gates**

In `src/services/nativeAudioQueue.ts`, make the emitter and availability depend on module presence rather than `Platform.OS === "ios"`.

In `src/hooks/useAudioPlayer.ts`, change:

```typescript
const usingNativeAudioQueue =
  Platform.OS === "ios" && isNativeAudioQueueAvailable();
```

to:

```typescript
const usingNativeAudioQueue = isNativeAudioQueueAvailable();
```

Keep `waitForPlaybackRouteSettle` iOS-only.

- [ ] **Step 6: Verify JS and Android build**

Run:

```bash
npm test -- --runInBand --watchman=false __tests__/services/nativeAudioQueue.test.ts
npx tsc --noEmit
cd android && ./gradlew assembleDebug
```

Expected: all commands exit 0.

- [ ] **Step 7: Commit audio queue**

Run:

```bash
git add android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackNativeAudioQueueModule.kt android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackNativeWaveformPackage.kt src/services/nativeAudioQueue.ts src/hooks/useAudioPlayer.ts __tests__/services/nativeAudioQueue.test.ts
git commit -m "feat(android): add native audio queue"
```

## Task 4: Add Android Output Waveform State

**Files:**
- Create: `android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackWaveformStateCoordinator.kt`
- Modify: `android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackNativeWaveformModule.kt`
- Modify: `src/services/nativeWaveform.ts`
- Test: `__tests__/services/nativeWaveform.test.ts`

- [ ] **Step 1: Write failing JS output waveform support test**

Create `__tests__/services/nativeWaveform.test.ts`:

```typescript
describe("nativeWaveform", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("supports output waveform playback on Android when native methods exist", () => {
    const reactNative = require("react-native");
    Object.defineProperty(reactNative.Platform, "OS", {
      value: "android",
      configurable: true,
    });
    reactNative.NativeModules.SchnackNativeWaveform = {
      startRecording: jest.fn(),
      stopRecording: jest.fn(),
      cancelRecording: jest.fn(),
      analyzeAudioFile: jest.fn(),
      startOutputPlayback: jest.fn(),
      stopOutputPlayback: jest.fn(),
    };

    const {
      supportsNativeOutputWaveformPlayback,
    } = require("../../src/services/nativeWaveform");

    expect(supportsNativeOutputWaveformPlayback()).toBe(true);
  });
});
```

- [ ] **Step 2: Run the failing test**

Run:

```bash
npm test -- --runInBand --watchman=false __tests__/services/nativeWaveform.test.ts
```

Expected: fails because support is restricted to iOS.

- [ ] **Step 3: Implement Android waveform state coordinator**

Create `SchnackWaveformStateCoordinator.kt` with:

- `setSamples(channel, samples)`
- `clear(channel)`
- `samples(channel): List<Double>`
- `startPlayback(channel, itemId, samples, durationMs)`
- `stopPlayback(channel, itemId)`

Use normalized samples in the `0.0..1.0` range. For output playback, return a moving trailing playback window based on elapsed wall-clock time, matching the iOS coordinator's public behavior.

- [ ] **Step 4: Wire input and output module methods**

In `SchnackNativeWaveformModule.kt`:

- On recording level ticks, call `SchnackWaveformStateCoordinator.setSamples("input", snapshot)`.
- In `startOutputPlayback`, reject blank `itemId`, store output playback state, resolve `true`.
- In `stopOutputPlayback`, clear matching output playback state, resolve `true`.
- In `invalidate`, clear output state.

- [ ] **Step 5: Remove iOS-only output waveform gate**

In `src/services/nativeWaveform.ts`, remove `Platform.OS === "ios"` from `supportsNativeOutputWaveformPlayback`.

- [ ] **Step 6: Verify**

Run:

```bash
npm test -- --runInBand --watchman=false __tests__/services/nativeWaveform.test.ts
npx tsc --noEmit
cd android && ./gradlew assembleDebug
```

Expected: all commands exit 0.

- [ ] **Step 7: Commit output waveform state**

Run:

```bash
git add android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackWaveformStateCoordinator.kt android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackNativeWaveformModule.kt src/services/nativeWaveform.ts __tests__/services/nativeWaveform.test.ts
git commit -m "feat(android): add output waveform state"
```

## Task 5: Add Android Native Waveform View

**Files:**
- Create: `android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackWaveformView.kt`
- Create: `android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackNativeWaveformViewManager.kt`
- Modify: `android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackNativeWaveformPackage.kt`
- Modify: `src/components/NativeWaveformView.tsx`
- Test: `__tests__/components/NativeWaveformView.test.tsx`

- [ ] **Step 1: Write failing component gate test**

Create `__tests__/components/NativeWaveformView.test.tsx`:

```tsx
import React from "react";
import { render } from "@testing-library/react-native";

describe("NativeWaveformView", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("requires the native waveform view on Android", () => {
    const reactNative = require("react-native");
    Object.defineProperty(reactNative.Platform, "OS", {
      value: "android",
      configurable: true,
    });
    const requireNativeComponent = jest.fn(() => "SchnackNativeWaveformView");
    reactNative.requireNativeComponent = requireNativeComponent;

    const { NativeWaveformView } = require("../../src/components/NativeWaveformView");

    render(<NativeWaveformView channel="input" active style={{ width: 120, height: 40 }} />);

    expect(requireNativeComponent).toHaveBeenCalledWith("SchnackNativeWaveformView");
  });
});
```

- [ ] **Step 2: Run the failing test**

Run:

```bash
npm test -- --runInBand --watchman=false __tests__/components/NativeWaveformView.test.tsx
```

Expected: fails because the native view is only required on iOS.

- [ ] **Step 3: Implement the Android view**

Create `SchnackWaveformView.kt` as a custom `View` that:

- Has `channel`, `active`, `lineColor`, `baselineColor`, `lineWidth`, and `renderStyle` properties.
- Draws a baseline.
- Draws input as envelope style by default.
- Draws output as waveform style by default.
- Invalidates itself with `postInvalidateOnAnimation()` while attached and active.
- Pulls samples from `SchnackWaveformStateCoordinator.samples(channel)`.

- [ ] **Step 4: Implement and register the view manager**

Create `SchnackNativeWaveformViewManager.kt` exposing `SchnackNativeWaveformView`.

Update `SchnackNativeWaveformPackage.kt`:

```kotlin
  override fun createViewManagers(
    reactContext: ReactApplicationContext,
  ): List<ViewManager<*, *>> = listOf(SchnackNativeWaveformViewManager())
```

- [ ] **Step 5: Remove Android fallback view**

In `src/components/NativeWaveformView.tsx`, require the native component on iOS and Android. Keep the fallback `<View>` only for unsupported platforms.

- [ ] **Step 6: Verify**

Run:

```bash
npm test -- --runInBand --watchman=false __tests__/components/NativeWaveformView.test.tsx
npx tsc --noEmit
cd android && ./gradlew assembleDebug
```

Expected: all commands exit 0.

- [ ] **Step 7: Commit native view**

Run:

```bash
git add android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackWaveformView.kt android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackNativeWaveformViewManager.kt android/app/src/main/java/com/tobiaswinkler/schnackai/SchnackNativeWaveformPackage.kt src/components/NativeWaveformView.tsx __tests__/components/NativeWaveformView.test.tsx
git commit -m "feat(android): render native waveform view"
```

## Task 6: Android Emulator Smoke And Notes

**Files:**
- Modify: `docs/android-local-development.md`
- Modify: Obsidian project note after verification

- [ ] **Step 1: Build and install debug app**

Run:

```bash
cd android && ./gradlew installDebug
```

Expected: app installs on an attached emulator/device.

- [ ] **Step 2: Start Metro for emulator**

Run:

```bash
adb reverse tcp:8081 tcp:8081
npx expo start --dev-client --host lan
```

Expected: Metro serves the dev client bundle.

- [ ] **Step 3: Smoke native recording and waveform**

Manual checks:

- Start recording from the main screen.
- Confirm the Android waveform animates while recording.
- Stop recording after more than 300 ms.
- Confirm no native crash or JS redbox.

- [ ] **Step 4: Smoke text reply and native playback**

Manual checks:

- Use the dev key `sk-test-android-local-dev`.
- Submit a typed transcript message.
- Confirm the assistant local reply renders.
- Confirm native audio playback logs `started` and `finished`.
- Confirm output waveform starts during audio playback and clears after finish.

- [ ] **Step 5: Smoke queue sequencing**

Manual checks:

- Trigger two audio items in sequence.
- Confirm the event order is `started`, `finished`, `started`, `finished`, `drained`.
- Confirm pause/resume/stop controls behave as expected for Android native queue playback.

- [ ] **Step 6: Update docs and notes**

Add a short Android native parity section to `docs/android-local-development.md` with the verified native surfaces and any remaining known limitations.

Add a concise Obsidian note under `02 Projects/SchnackAI/SchnackAI.md` with commits, verification commands, emulator/device used, and any remaining gaps.

- [ ] **Step 7: Final verification**

Run:

```bash
npm test -- --runInBand --watchman=false __tests__/services/nativeWaveform.test.ts __tests__/services/nativeAudioQueue.test.ts __tests__/components/NativeWaveformView.test.tsx
npx tsc --noEmit
cd android && ./gradlew assembleDebug
git status --short
```

Expected: all commands exit 0 and working tree is clean after final commit.
