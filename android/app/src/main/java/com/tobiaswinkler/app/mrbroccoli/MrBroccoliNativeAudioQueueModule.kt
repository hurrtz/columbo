package com.tobiaswinkler.app.mrbroccoli

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule

class MrBroccoliNativeAudioQueueModule(
  reactContext: ReactApplicationContext,
) : ReactContextBaseJavaModule(reactContext) {
  companion object {
    const val NAME = "MrBroccoliNativeAudioQueue"
    private const val EVENT_NAME = "MrBroccoliNativeAudioQueueEvent"
  }

  private val coordinator = MrBroccoliAudioQueueCoordinator(
    playerFactory = { item, callbacks ->
      MrBroccoliAndroidAudioQueuePlayer(
        context = reactApplicationContext,
        item = item,
        callbacks = callbacks,
      )
    },
    eventSink = ::emitQueueEvent,
  )

  override fun getName(): String = NAME

  @ReactMethod
  fun addListener(eventName: String?) = Unit

  @ReactMethod
  fun removeListeners(count: Int) = Unit

  @ReactMethod
  fun prepare(promise: Promise) {
    promise.resolve(true)
  }

  @ReactMethod
  fun enqueue(
    uri: String,
    itemId: String,
    requestId: String?,
    source: String?,
    promise: Promise,
  ) {
    if (uri.isBlank() || itemId.isBlank()) {
      promise.reject(
        "audio_queue_enqueue_error",
        "Audio URI and itemId are required.",
      )
      return
    }

    coordinator.enqueue(
      MrBroccoliAudioQueueItem(
        uri = uri,
        itemId = itemId,
        requestId = requestId,
        source = source,
      ),
    )
    promise.resolve(true)
  }

  @ReactMethod
  fun start(promise: Promise) {
    try {
      val started = coordinator.start()
      promise.resolve(started)
    } catch (error: Exception) {
      promise.reject(
        "audio_queue_start_error",
        error.message ?: "Audio queue start failed.",
        error,
      )
    }
  }

  @ReactMethod
  fun pause(promise: Promise) {
    try {
      coordinator.pause()
      promise.resolve(true)
    } catch (error: Exception) {
      promise.reject(
        "audio_queue_pause_error",
        error.message ?: "Audio queue pause failed.",
        error,
      )
    }
  }

  @ReactMethod
  fun resume(promise: Promise) {
    try {
      val resumed = coordinator.resume()
      promise.resolve(resumed)
    } catch (error: Exception) {
      promise.reject(
        "audio_queue_resume_error",
        error.message ?: "Audio queue resume failed.",
        error,
      )
    }
  }

  @ReactMethod
  fun stop(promise: Promise) {
    try {
      coordinator.stop(emitStopped = true)
      promise.resolve(true)
    } catch (error: Exception) {
      promise.reject(
        "audio_queue_stop_error",
        error.message ?: "Audio queue stop failed.",
        error,
      )
    }
  }

  override fun invalidate() {
    coordinator.stop(emitStopped = false)
    super.invalidate()
  }

  private fun emitQueueEvent(event: MrBroccoliAudioQueueEvent) {
    val payload = Arguments.createMap().apply {
      putString("type", event.type)
      if (event.itemId != null) {
        putString("itemId", event.itemId)
      }
      if (event.uri != null) {
        putString("uri", event.uri)
      }
      if (event.requestId != null || event.itemId != null) {
        putNullableString("requestId", event.requestId)
      }
      if (event.source != null || event.itemId != null) {
        putNullableString("source", event.source)
      }
      if (event.message != null) {
        putString("message", event.message)
      }
    }
    emitEvent(payload)
  }

  private fun emitEvent(payload: WritableMap) {
    val reactContext = getReactApplicationContextIfActiveOrWarn() ?: return
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(EVENT_NAME, payload)
  }

  private fun WritableMap.putNullableString(key: String, value: String?) {
    if (value == null) {
      putNull(key)
    } else {
      putString(key, value)
    }
  }
}
