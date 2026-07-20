package com.tobiaswinkler.app.columbo

import java.util.ArrayDeque

internal data class ColumboAudioQueueItem(
  val uri: String,
  val itemId: String,
  val requestId: String?,
  val source: String?,
)

internal data class ColumboAudioQueueEvent(
  val type: String,
  val itemId: String? = null,
  val uri: String? = null,
  val requestId: String? = null,
  val source: String? = null,
  val message: String? = null,
)

internal interface ColumboAudioQueuePlayer {
  fun start()
  fun pause()
  fun stop()
  fun release()
}

internal data class ColumboAudioQueuePlayerCallbacks(
  val onCompletion: () -> Unit,
  val onError: (String) -> Unit,
)

internal class ColumboAudioQueueCoordinator(
  private val playerFactory: (
    item: ColumboAudioQueueItem,
    callbacks: ColumboAudioQueuePlayerCallbacks,
  ) -> ColumboAudioQueuePlayer,
  private val eventSink: (ColumboAudioQueueEvent) -> Unit,
) {
  private val lock = Any()
  private val queue = ArrayDeque<ColumboAudioQueueItem>()
  private var player: ColumboAudioQueuePlayer? = null
  private var currentItem: ColumboAudioQueueItem? = null
  private var currentStarted = false

  fun enqueue(item: ColumboAudioQueueItem) {
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

    var nextPlayer: ColumboAudioQueuePlayer? = null
    val callbacks = ColumboAudioQueuePlayerCallbacks(
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
    val stoppedItems = mutableListOf<ColumboAudioQueueItem>()
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
    item: ColumboAudioQueueItem,
    message: String? = null,
  ) {
    eventSink(
      ColumboAudioQueueEvent(
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
    eventSink(ColumboAudioQueueEvent(type = "drained"))
  }
}
