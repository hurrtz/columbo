package com.tobiaswinkler.app.columbo

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

class SchnackWaveformStateCoordinatorTest {
  @Before
  fun resetCoordinator() {
    SchnackWaveformStateCoordinator.clear("input")
    SchnackWaveformStateCoordinator.clear("output")
  }

  @Test
  fun normalizesLiveSamplesForTheRequestedChannel() {
    SchnackWaveformStateCoordinator.setSamples(
      channel = "input",
      samples = listOf(-1.0, 0.25, 2.0),
    )

    val samples = SchnackWaveformStateCoordinator.samples("input")

    assertEquals(listOf(1.0, 0.25, 1.0), samples)
  }

  @Test
  fun outputPlaybackCanBeStoppedByItemId() {
    SchnackWaveformStateCoordinator.startPlayback(
      channel = "output",
      itemId = "reply-1",
      samples = listOf(0.1, 0.5, 0.9),
      durationMs = 1000.0,
    )

    assertTrue(SchnackWaveformStateCoordinator.samples("output").any { it > 0.0 })

    SchnackWaveformStateCoordinator.stopPlayback(
      channel = "output",
      itemId = "reply-1",
    )

    assertTrue(SchnackWaveformStateCoordinator.samples("output").all { it == 0.0 })
  }
}
