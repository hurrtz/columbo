package com.tobiaswinkler.app.columbo

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
