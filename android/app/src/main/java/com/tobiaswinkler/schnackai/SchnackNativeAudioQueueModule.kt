package com.tobiaswinkler.schnackai

import android.media.MediaPlayer
import android.net.Uri
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.io.File
import java.util.ArrayDeque

class SchnackNativeAudioQueueModule(
  reactContext: ReactApplicationContext,
) : ReactContextBaseJavaModule(reactContext) {
  companion object {
    const val NAME = "SchnackNativeAudioQueue"
    private const val EVENT_NAME = "SchnackNativeAudioQueueEvent"
  }

  private val lock = Any()
  private val queue = ArrayDeque<AudioQueueItem>()
  private var player: MediaPlayer? = null
  private var currentItem: AudioQueueItem? = null
  private var currentStarted = false

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

    synchronized(lock) {
      queue.addLast(
        AudioQueueItem(
          uri = uri,
          itemId = itemId,
          requestId = requestId,
          source = source,
        ),
      )
    }
    promise.resolve(true)
  }

  @ReactMethod
  fun start(promise: Promise) {
    try {
      val started =
        synchronized(lock) {
          startLocked()
        }
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
      synchronized(lock) {
        player?.pause()
      }
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
      val resumed =
        synchronized(lock) {
          startLocked()
        }
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
      synchronized(lock) {
        stopLocked(emitStopped = true)
      }
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
    synchronized(lock) {
      stopLocked(emitStopped = false)
    }
    super.invalidate()
  }

  private fun startLocked(): Boolean {
    val activePlayer = player
    if (activePlayer != null) {
      activePlayer.start()
      emitStartedForCurrentItemLocked()
      return true
    }

    val nextItem = queue.pollFirst() ?: return false
    val nextPlayer = MediaPlayer()
    currentItem = nextItem
    currentStarted = false
    player = nextPlayer

    nextPlayer.setOnCompletionListener {
      synchronized(lock) {
        val finishedItem = currentItem
        if (finishedItem != null) {
          emitItemEvent("finished", finishedItem)
        }
        cleanupCurrentPlayerLocked()
        if (!startLocked()) {
          emitDrainedLocked()
        }
      }
    }
    nextPlayer.setOnErrorListener { _, _, _ ->
      synchronized(lock) {
        val failedItem = currentItem
        if (failedItem != null) {
          emitItemEvent("failed", failedItem, "Audio playback failed.")
        }
        cleanupCurrentPlayerLocked()
        if (!startLocked()) {
          emitDrainedLocked()
        }
      }
      true
    }

    val resolvedUri = resolveUri(nextItem.uri)
    nextPlayer.setDataSource(reactApplicationContext, resolvedUri)
    nextPlayer.prepare()
    nextPlayer.start()
    emitStartedForCurrentItemLocked()
    return true
  }

  private fun stopLocked(emitStopped: Boolean) {
    val stoppedItems = mutableListOf<AudioQueueItem>()
    currentItem?.let(stoppedItems::add)
    while (queue.isNotEmpty()) {
      queue.pollFirst()?.let(stoppedItems::add)
    }

    cleanupCurrentPlayerLocked()

    if (emitStopped) {
      stoppedItems.forEach { emitItemEvent("stopped", it) }
      emitDrainedLocked()
    }
  }

  private fun cleanupCurrentPlayerLocked() {
    val activePlayer = player
    player = null
    currentItem = null
    currentStarted = false

    if (activePlayer != null) {
      try {
        activePlayer.setOnCompletionListener(null)
        activePlayer.setOnErrorListener(null)
        activePlayer.stop()
      } catch (_: IllegalStateException) {
      } finally {
        activePlayer.reset()
        activePlayer.release()
      }
    }
  }

  private fun emitStartedForCurrentItemLocked() {
    val item = currentItem ?: return
    if (currentStarted) {
      return
    }

    currentStarted = true
    emitItemEvent("started", item)
  }

  private fun emitItemEvent(
    type: String,
    item: AudioQueueItem,
    message: String? = null,
  ) {
    val payload = Arguments.createMap().apply {
      putString("type", type)
      putString("itemId", item.itemId)
      putString("uri", item.uri)
      putNullableString("requestId", item.requestId)
      putNullableString("source", item.source)
      if (message != null) {
        putString("message", message)
      }
    }
    emitEvent(payload)
  }

  private fun emitDrainedLocked() {
    emitEvent(
      Arguments.createMap().apply {
        putString("type", "drained")
      },
    )
  }

  private fun emitEvent(payload: WritableMap) {
    val reactContext = getReactApplicationContextIfActiveOrWarn() ?: return
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(EVENT_NAME, payload)
  }

  private fun resolveUri(uri: String): Uri {
    val parsed = Uri.parse(uri)
    if (!parsed.scheme.isNullOrBlank()) {
      return parsed
    }

    return Uri.fromFile(File(uri))
  }

  private fun WritableMap.putNullableString(key: String, value: String?) {
    if (value == null) {
      putNull(key)
    } else {
      putString(key, value)
    }
  }

  private data class AudioQueueItem(
    val uri: String,
    val itemId: String,
    val requestId: String?,
    val source: String?,
  )
}
