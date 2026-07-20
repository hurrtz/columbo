package com.tobiaswinkler.app.columbo

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ColumboVoiceLiveActivityModule(
  reactContext: ReactApplicationContext,
) : ReactContextBaseJavaModule(reactContext) {
  companion object {
    const val NAME = "ColumboVoiceLiveActivity"
  }

  override fun getName(): String = NAME

  @ReactMethod
  fun setState(
    phase: String,
    expectedSpeechAtMs: Double?,
    promise: Promise,
  ) {
    if (!ColumboVoiceTurnState.isSupportedPhase(phase)) {
      promise.reject(
        "voice_turn_status_invalid_phase",
        "Unsupported voice-turn phase: $phase",
      )
      return
    }

    try {
      ColumboVoiceTurnService.setState(
        context = reactApplicationContext,
        phase = phase,
        expectedSpeechAtMs = expectedSpeechAtMs
          ?.takeIf(Double::isFinite)
          ?.toLong(),
      )
      promise.resolve(true)
    } catch (error: Exception) {
      promise.reject(
        "voice_turn_status_error",
        error.message ?: "Could not update voice-turn status.",
        error,
      )
    }
  }

  @ReactMethod
  fun endActivity(promise: Promise) {
    try {
      ColumboVoiceTurnService.end(reactApplicationContext)
      promise.resolve(true)
    } catch (error: Exception) {
      promise.reject(
        "voice_turn_status_end_error",
        error.message ?: "Could not end voice-turn status.",
        error,
      )
    }
  }
}
