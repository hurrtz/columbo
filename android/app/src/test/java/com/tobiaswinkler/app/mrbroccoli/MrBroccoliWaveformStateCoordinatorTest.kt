package com.tobiaswinkler.app.mrbroccoli

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

class MrBroccoliWaveformStateCoordinatorTest {
  @Before
  fun resetCoordinator() {
    MrBroccoliWaveformStateCoordinator.clear("input")
    MrBroccoliWaveformStateCoordinator.clear("output")
  }

  @Test
  fun normalizesLiveSamplesForTheRequestedChannel() {
    MrBroccoliWaveformStateCoordinator.setSamples(
      channel = "input",
      samples = listOf(-1.0, 0.25, 2.0),
    )

    val samples = MrBroccoliWaveformStateCoordinator.samples("input")

    assertEquals(listOf(1.0, 0.25, 1.0), samples)
  }

  @Test
  fun outputPlaybackCanBeStoppedByItemId() {
    MrBroccoliWaveformStateCoordinator.startPlayback(
      channel = "output",
      itemId = "reply-1",
      samples = listOf(0.1, 0.5, 0.9),
      durationMs = 1000.0,
    )

    assertTrue(MrBroccoliWaveformStateCoordinator.samples("output").any { it > 0.0 })

    MrBroccoliWaveformStateCoordinator.stopPlayback(
      channel = "output",
      itemId = "reply-1",
    )

    assertTrue(MrBroccoliWaveformStateCoordinator.samples("output").all { it == 0.0 })
  }
}
