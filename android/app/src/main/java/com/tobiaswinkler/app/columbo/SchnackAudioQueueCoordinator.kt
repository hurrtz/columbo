package com.tobiaswinkler.app.columbo

import java.util.ArrayDeque

internal data class SchnackAudioQueueItem(
  val uri: String,
  val itemId: String,
  val requestId: String?,
  val source: String?,
)

internal data class SchnackAudioQueueEvent(
  val type: String,
  val itemId: String? = null,
  val uri: String? = null,
  val requestId: String? = null,
  val source: String? = null,
  val message: String? = null,
)

internal interface SchnackAudioQueuePlayer {
  fun start()
  fun pause()
  fun stop()
  fun release()
}

internal data class SchnackAudioQueuePlayerCallbacks(
  val onCompletion: () -> Unit,
  val onError: (String) -> Unit,
)

internal class SchnackAudioQueueCoordinator(
  private val playerFactory: (
    item: SchnackAudioQueueItem,
    callbacks: SchnackAudioQueuePlayerCallbacks,
  ) -> SchnackAudioQueuePlayer,
  private val eventSink: (SchnackAudioQueueEvent) -> Unit,
) {
  private val lock = Any()
  private val queue = ArrayDeque<SchnackAudioQueueItem>()
  private var player: SchnackAudioQueuePlayer? = null
  private var currentItem: SchnackAudioQueueItem? = null
  private var currentStarted = false

  fun enqueue(item: SchnackAudioQueueItem) {
    synchronized(lock) {
      queue.addLast(item)
    }
  }

  fun start(): Boolean =
    synchronized(lock) {
      startLocked()
    }

  fun pause() {
    synchronized(lock) {
      player?.pause()
    }
  }

  fun resume(): Boolean = start()

  fun stop(emitStopped: Boolean) {
    synchronized(lock) {
      stopLocked(emitStopped)
    }
  }

  private fun startLocked(): Boolean {
    val activePlayer = player
    if (activePlayer != null) {
      activePlayer.start()
      emitStartedForCurrentItemLocked()
      return true
    }

    val nextItem = queue.pollFirst() ?: return false
    currentItem = nextItem
    currentStarted = false

    var nextPlayer: SchnackAudioQueuePlayer? = null
    val callbacks = SchnackAudioQueuePlayerCallbacks(
      onCompletion = {
        synchronized(lock) {
          if (player !== nextPlayer) {
            return@synchronized
          }

          currentItem?.let { emitItemEvent("finished", it) }
          cleanupCurrentPlayerLocked()
          if (!startLocked()) {
            emitDrainedLocked()
          }
        }
      },
      onError = { message ->
        synchronized(lock) {
          if (player !== nextPlayer) {
            return@synchronized
          }

          currentItem?.let { emitItemEvent("failed", it, message) }
          cleanupCurrentPlayerLocked()
          if (!startLocked()) {
            emitDrainedLocked()
          }
        }
      },
    )

    nextPlayer = playerFactory(nextItem, callbacks)
    player = nextPlayer
    nextPlayer.start()
    emitStartedForCurrentItemLocked()
    return true
  }

  private fun stopLocked(emitStopped: Boolean) {
    val stoppedItems = mutableListOf<SchnackAudioQueueItem>()
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
        activePlayer.stop()
      } finally {
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
    item: SchnackAudioQueueItem,
    message: String? = null,
  ) {
    eventSink(
      SchnackAudioQueueEvent(
        type = type,
        itemId = item.itemId,
        uri = item.uri,
        requestId = item.requestId,
        source = item.source,
        message = message,
      ),
    )
  }

  private fun emitDrainedLocked() {
    eventSink(SchnackAudioQueueEvent(type = "drained"))
  }
}
