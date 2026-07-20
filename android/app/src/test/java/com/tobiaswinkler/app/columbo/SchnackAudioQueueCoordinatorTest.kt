package com.tobiaswinkler.app.columbo

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class SchnackAudioQueueCoordinatorTest {
  private val events = mutableListOf<SchnackAudioQueueEvent>()
  private val players = mutableListOf<FakeAudioQueuePlayer>()
  private val coordinator = SchnackAudioQueueCoordinator(
    playerFactory = { _, callbacks ->
      FakeAudioQueuePlayer(callbacks).also(players::add)
    },
    eventSink = events::add,
  )

  @Test
  fun playsQueuedItemsSequentiallyAndDrainsOnce() {
    coordinator.enqueue(item("first"))
    coordinator.enqueue(item("second"))

    assertTrue(coordinator.start())
    assertEventTypes("started")
    assertEquals("first", events.single().itemId)

    players[0].complete()

    assertEventTypes("started", "finished", "started")
    assertEquals("second", events.last().itemId)

    players[1].complete()

    assertEventTypes("started", "finished", "started", "finished", "drained")
  }

  @Test
  fun resumeDoesNotEmitDuplicateStartedForCurrentItem() {
    coordinator.enqueue(item("reply"))

    assertTrue(coordinator.start())
    coordinator.pause()
    assertTrue(coordinator.resume())

    assertEventTypes("started")
    assertEquals(2, players.single().startCount)
  }

  @Test
  fun stopEmitsStoppedForCurrentAndPendingItemsThenDrains() {
    coordinator.enqueue(item("current"))
    coordinator.enqueue(item("pending"))

    assertTrue(coordinator.start())
    coordinator.stop(emitStopped = true)

    assertEventTypes("started", "stopped", "stopped", "drained")
    assertEquals(listOf("current", "pending"), events.filter { it.type == "stopped" }.map { it.itemId })
    assertTrue(players.single().released)
  }

  @Test
  fun failedItemAdvancesToNextQueuedItem() {
    coordinator.enqueue(item("broken"))
    coordinator.enqueue(item("next"))

    assertTrue(coordinator.start())
    players[0].fail("no decoder")

    assertEventTypes("started", "failed", "started")
    assertEquals("no decoder", events[1].message)

    players[1].complete()

    assertEventTypes("started", "failed", "started", "finished", "drained")
  }

  @Test
  fun startReturnsFalseWhenQueueIsEmpty() {
    assertFalse(coordinator.start())
    assertTrue(events.isEmpty())
  }

  private fun item(id: String) = SchnackAudioQueueItem(
    uri = "file:///tmp/$id.m4a",
    itemId = id,
    requestId = "request-$id",
    source = "test",
  )

  private fun assertEventTypes(vararg expected: String) {
    assertEquals(expected.toList(), events.map { it.type })
  }

  private class FakeAudioQueuePlayer(
    private val callbacks: SchnackAudioQueuePlayerCallbacks,
  ) : SchnackAudioQueuePlayer {
    var startCount = 0
    var released = false

    override fun start() {
      startCount += 1
    }

    override fun pause() = Unit

    override fun stop() = Unit

    override fun release() {
      released = true
    }

    fun complete() {
      callbacks.onCompletion()
    }

    fun fail(message: String) {
      callbacks.onError(message)
    }
  }
}
