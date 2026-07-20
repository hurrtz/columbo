package com.tobiaswinkler.app.columbo

import android.content.Context
import android.media.MediaPlayer
import android.net.Uri
import java.io.File

internal class SchnackAndroidAudioQueuePlayer(
  context: Context,
  item: SchnackAudioQueueItem,
  callbacks: SchnackAudioQueuePlayerCallbacks,
) : SchnackAudioQueuePlayer {
  private val mediaPlayer = MediaPlayer()

  init {
    mediaPlayer.setOnCompletionListener {
      callbacks.onCompletion()
    }
    mediaPlayer.setOnErrorListener { _, _, _ ->
      callbacks.onError("Audio playback failed.")
      true
    }
    mediaPlayer.setDataSource(context, resolveUri(item.uri))
    mediaPlayer.prepare()
  }

  override fun start() {
    mediaPlayer.start()
  }

  override fun pause() {
    mediaPlayer.pause()
  }

  override fun stop() {
    try {
      mediaPlayer.stop()
    } catch (_: IllegalStateException) {
    }
  }

  override fun release() {
    mediaPlayer.setOnCompletionListener(null)
    mediaPlayer.setOnErrorListener(null)
    mediaPlayer.reset()
    mediaPlayer.release()
  }

  private fun resolveUri(uri: String): Uri {
    val parsed = Uri.parse(uri)
    if (!parsed.scheme.isNullOrBlank()) {
      return parsed
    }

    return Uri.fromFile(File(uri))
  }
}
