package com.tobiaswinkler.app.columbo

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

class ColumboWaveformStateCoordinatorTest {
  @Before
  fun resetCoordinator() {
    ColumboWaveformStateCoordinator.clear("input")
    ColumboWaveformStateCoordinator.clear("output")
  }

  @Test
  fun normalizesLiveSamplesForTheRequestedChannel() {
    ColumboWaveformStateCoordinator.setSamples(
      channel = "input",
      samples = listOf(-1.0, 0.25, 2.0),
    )

    val samples = ColumboWaveformStateCoordinator.samples("input")

    assertEquals(listOf(1.0, 0.25, 1.0), samples)
  }

  @Test
  fun outputPlaybackCanBeStoppedByItemId() {
    ColumboWaveformStateCoordinator.startPlayback(
      channel = "output",
      itemId = "reply-1",
      samples = listOf(0.1, 0.5, 0.9),
      durationMs = 1000.0,
    )

    assertTrue(ColumboWaveformStateCoordinator.samples("output").any { it > 0.0 })

    ColumboWaveformStateCoordinator.stopPlayback(
      channel = "output",
      itemId = "reply-1",
    )

    assertTrue(ColumboWaveformStateCoordinator.samples("output").all { it == 0.0 })
  }
}
