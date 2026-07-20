package com.tobiaswinkler.app.columbo

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.ServiceInfo
import android.graphics.Color
import android.os.Build
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import androidx.core.app.NotificationCompat
import androidx.core.app.ServiceCompat
import androidx.core.content.ContextCompat

internal data class ColumboVoiceTurnState(
  val phase: String,
  val expectedSpeechAtMs: Long?,
) {
  companion object {
    private val supportedPhases = setOf(
      "listening",
      "transcribing",
      "searching",
      "thinking",
      "synthesizing",
    )

    fun isSupportedPhase(phase: String): Boolean = phase in supportedPhases
  }
}

class ColumboVoiceTurnService : Service() {
  companion object {
    private const val ACTION_SET_STATE =
      "com.tobiaswinkler.app.columbo.action.SET_VOICE_TURN_STATE"
    private const val EXTRA_PHASE = "phase"
    private const val EXTRA_EXPECTED_SPEECH_AT_MS = "expectedSpeechAtMs"
    private const val CHANNEL_ID = "columbo_voice_turn"
    private const val NOTIFICATION_ID = 2404

    @Volatile
    private var activeService: ColumboVoiceTurnService? = null

    fun setState(
      context: Context,
      phase: String,
      expectedSpeechAtMs: Long?,
    ) {
      val state = ColumboVoiceTurnState(phase, expectedSpeechAtMs)
      activeService?.let { service ->
        service.handler.post {
          service.updateState(state)
        }
      } ?: run {
        val intent = Intent(context, ColumboVoiceTurnService::class.java).apply {
          action = ACTION_SET_STATE
          putExtra(EXTRA_PHASE, phase)
          if (expectedSpeechAtMs != null) {
            putExtra(EXTRA_EXPECTED_SPEECH_AT_MS, expectedSpeechAtMs)
          }
        }
        ContextCompat.startForegroundService(context, intent)
      }
    }

    fun end(context: Context) {
      activeService?.let { service ->
        service.handler.post(service::stopVoiceTurn)
      } ?: context.stopService(Intent(context, ColumboVoiceTurnService::class.java))
    }
  }

  private val handler = Handler(Looper.getMainLooper())
  private val notificationManager by lazy {
    getSystemService(NotificationManager::class.java)
  }
  private var currentState: ColumboVoiceTurnState? = null

  private val overtimeUpdate = Runnable {
    currentState?.let(::publishNotification)
  }

  override fun onCreate() {
    super.onCreate()
    activeService = this
    createNotificationChannel()
  }

  override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
    if (intent?.action != ACTION_SET_STATE) {
      stopVoiceTurn()
      return START_NOT_STICKY
    }

    val phase = intent.getStringExtra(EXTRA_PHASE)
    if (phase == null || !ColumboVoiceTurnState.isSupportedPhase(phase)) {
      stopVoiceTurn()
      return START_NOT_STICKY
    }

    val expectedSpeechAtMs = if (
      intent.hasExtra(EXTRA_EXPECTED_SPEECH_AT_MS)
    ) {
      intent.getLongExtra(EXTRA_EXPECTED_SPEECH_AT_MS, 0L)
        .takeIf { it > 0L }
    } else {
      null
    }

    updateState(ColumboVoiceTurnState(phase, expectedSpeechAtMs))
    return START_NOT_STICKY
  }

  override fun onBind(intent: Intent?): IBinder? = null

  override fun onTimeout(startId: Int, fgsType: Int) {
    stopVoiceTurn()
  }

  override fun onDestroy() {
    handler.removeCallbacks(overtimeUpdate)
    if (activeService === this) {
      activeService = null
    }
    super.onDestroy()
  }

  private fun updateState(state: ColumboVoiceTurnState) {
    currentState = state
    publishNotification(state)
  }

  private fun publishNotification(state: ColumboVoiceTurnState) {
    handler.removeCallbacks(overtimeUpdate)
    val notification = buildNotification(state)
    val foregroundType = foregroundTypeFor(state.phase)

    // Calling startForeground again updates both the notification and the
    // declared service type when capture becomes network processing.
    ServiceCompat.startForeground(
      this,
      NOTIFICATION_ID,
      notification,
      foregroundType,
    )

    state.expectedSpeechAtMs
      ?.takeIf { it > System.currentTimeMillis() }
      ?.let { deadline ->
        handler.postDelayed(
          overtimeUpdate,
          (deadline - System.currentTimeMillis()).coerceAtLeast(1L),
        )
      }
  }

  private fun buildNotification(state: ColumboVoiceTurnState): Notification {
    val openAppIntent = Intent(this, MainActivity::class.java).apply {
      flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
    }
    val contentIntent = PendingIntent.getActivity(
      this,
      0,
      openAppIntent,
      PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
    )

    val builder = NotificationCompat.Builder(this, CHANNEL_ID)
      .setSmallIcon(R.drawable.ic_columbo_voice_turn)
      .setContentTitle(getString(R.string.voice_turn_notification_title))
      .setContentText(getString(phaseLabel(state.phase)))
      .setContentIntent(contentIntent)
      .setCategory(NotificationCompat.CATEGORY_PROGRESS)
      .setColor(Color.rgb(35, 205, 225))
      .setLocalOnly(true)
      .setOngoing(true)
      .setOnlyAlertOnce(true)
      .setPriority(NotificationCompat.PRIORITY_LOW)
      .setSilent(true)
      .setRequestPromotedOngoing(true)

    val deadline = state.expectedSpeechAtMs
    if (deadline != null) {
      val countingDown = deadline > System.currentTimeMillis()
      builder
        .setWhen(deadline)
        .setShowWhen(true)
        .setUsesChronometer(true)
        .setChronometerCountDown(countingDown)
    } else {
      builder
        .setShowWhen(false)
        .setProgress(0, 0, true)
    }

    return builder.build()
  }

  private fun phaseLabel(phase: String): Int = when (phase) {
    "listening" -> R.string.voice_turn_listening
    "transcribing" -> R.string.voice_turn_transcribing
    "searching" -> R.string.voice_turn_searching
    "synthesizing" -> R.string.voice_turn_synthesizing
    else -> R.string.voice_turn_thinking
  }

  private fun foregroundTypeFor(phase: String): Int {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) {
      return 0
    }

    return if (
      Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE &&
      phase == "listening"
    ) {
      ServiceInfo.FOREGROUND_SERVICE_TYPE_SHORT_SERVICE
    } else {
      ServiceInfo.FOREGROUND_SERVICE_TYPE_DATA_SYNC
    }
  }

  private fun createNotificationChannel() {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
      return
    }

    val channel = NotificationChannel(
      CHANNEL_ID,
      getString(R.string.voice_turn_channel_name),
      NotificationManager.IMPORTANCE_LOW,
    ).apply {
      description = getString(R.string.voice_turn_channel_description)
      setSound(null, null)
      enableVibration(false)
    }
    notificationManager.createNotificationChannel(channel)
  }

  private fun stopVoiceTurn() {
    handler.removeCallbacks(overtimeUpdate)
    currentState = null
    ServiceCompat.stopForeground(this, ServiceCompat.STOP_FOREGROUND_REMOVE)
    stopSelf()
  }
}
