package com.tobiaswinkler.app.columbo

import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class ColumboVoiceTurnStateTest {
  @Test
  fun acceptsEveryVoicePipelinePhaseExposedToTheNativeService() {
    listOf(
      "listening",
      "transcribing",
      "searching",
      "thinking",
      "synthesizing",
    ).forEach { phase ->
      assertTrue(ColumboVoiceTurnState.isSupportedPhase(phase))
    }
  }

  @Test
  fun rejectsUnknownPhasesAtTheNativeBoundary() {
    assertFalse(ColumboVoiceTurnState.isSupportedPhase("speaking"))
    assertFalse(ColumboVoiceTurnState.isSupportedPhase("prompt-content"))
  }
}
