package com.tobiaswinkler.app.mrbroccoli

import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class MrBroccoliVoiceTurnStateTest {
  @Test
  fun acceptsEveryVoicePipelinePhaseExposedToTheNativeService() {
    listOf(
      "listening",
      "transcribing",
      "searching",
      "thinking",
      "synthesizing",
    ).forEach { phase ->
      assertTrue(MrBroccoliVoiceTurnState.isSupportedPhase(phase))
    }
  }

  @Test
  fun rejectsUnknownPhasesAtTheNativeBoundary() {
    assertFalse(MrBroccoliVoiceTurnState.isSupportedPhase("speaking"))
    assertFalse(MrBroccoliVoiceTurnState.isSupportedPhase("prompt-content"))
  }
}
