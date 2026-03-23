import type { TranslationDictionary } from "../types";

export const en: TranslationDictionary = {
    retry: "Retry",
    dismiss: "Dismiss",
    unavailable: "Unavailable",
    selection: "Selection",
    chooseCompatibleProviderFirst: "Choose a compatible provider first",
    settings: "Settings",
    firstRun: "First Run",
    instructions: "Instructions",
    providers: "Providers",
    stt: "STT",
    tts: "TTS",
    ui: "UI",
    theme: "Theme",
    language: "Language",
    usageStats: "Usage Stats",
    model: "Model",
    english: "English",
    german: "German",
    light: "Light",
    dark: "Dark",
    system: "System",
    languageCoverage: ({ note }) => `Language coverage: ${note}`,
    recordingLimits: ({ note }) => `Recording limits: ${note}`,
    replyGenerationAction: "reply generation",
    speechTranscriptionAction: "speech transcription",
    instructionsTabDescription:
      "Shape the hidden guidance that steers the assistant before any provider sees the request.",
    providersTabDescription:
      "Connect providers, store keys on-device, and map each home-screen response mode to a provider and model.",
    responseModes: "Response Modes",
    quickAndShallow: "Quick",
    deepThinking: "Deep",
    quickModeDescription:
      "Use this for fast answers where speed matters more than nuance.",
    normalModeDescription:
      "Use this for most conversations when you want a balanced answer.",
    deepModeDescription:
      "Use this when you want the strongest model for detail, tradeoffs, and reasoning.",
    useResponseMode: ({ mode }) => `Use ${mode}`,
    sttTabDescription:
      "Control how speech is captured and which backend turns audio into text before it reaches the model.",
    ttsTabDescription:
      "Control when replies start speaking and which backend handles spoken output.",
    brief: "Brief",
    briefDescription:
      "Keep the answer tight. Use the minimum number of sentences needed to fully answer the user.",
    normal: "Normal",
    normalDescription:
      "Aim for a balanced response length. Cover the important points without dragging the answer out.",
    thorough: "Thorough",
    thoroughDescription:
      "Go deep and be comprehensive. Include nuance, detail, tradeoffs, and the reasoning that matters.",
    professional: "Professional",
    professionalDescription:
      "Speak like a senior consultant briefing a client. Precise language, no slang, measured and authoritative.",
    casual: "Casual",
    casualDescription:
      "Speak like a smart friend at a coffee shop. Relaxed, natural, conversational. Contractions are fine, tangents are fine.",
    nerdy: "Nerdy",
    nerdyDescription:
      "Speak like an enthusiastic expert who loves going deep. Use technical terminology freely, geek out about details, assume the user can keep up.",
    concise: "Concise",
    conciseDescription:
      "Be as brief as possible while still being complete. No preamble, no filler, just the answer. Think telegram style.",
    socratic: "Socratic",
    socraticDescription:
      "Challenge the user's thinking. Ask counter-questions, offer alternative perspectives, don't just confirm what they said. Be a sparring partner, not a yes-machine.",
    eli5: "ELI5",
    eli5Description:
      "Explain everything as simply as possible. Use analogies, everyday language, zero jargon. Assume no prior knowledge on any topic.",
    openProviderSettings: ({ provider }) => `Open ${provider} settings`,
    createProviderApiKey: ({ provider }) => `Create ${provider} API key`,
    useProvider: ({ provider }) => `Use ${provider}`,
    createApiKey: "Create API key",
    validateKey: "Validate key",
    validatingKey: "Validating...",
    showKey: "Show key",
    hideKey: "Hide key",
    apiKeyProtectedHint:
      "Stored keys stay hidden by default. Reveal them only when you need to verify or edit a value.",
    assistantInstructions: "Assistant Instructions",
    assistantInstructionsIntro:
      "Shape the hidden guidance the model receives before every reply.",
    baseInstructions: "Base Instructions",
    assistantInstructionsPlaceholder: "Define how the assistant should behave.",
    assistantInstructionsHint:
      "This is always prepended before the selected response length and tone.",
    adaptiveLength: "Adaptive Length",
    responseTone: "Response Tone",
    inputMode: "Input Mode",
    pushToTalk: "Push to Talk",
    pushToTalkDescription:
      "Hold the main button while speaking, then release to send.",
    toggleToTalk: "Toggle to Talk",
    toggleToTalkDescription:
      "Tap once to start recording and tap again when you are done.",
    speechToText: "Speech to Text",
    appNative: "App Native",
    nativeSttDescription:
      "Use the system speech recognizer built into the device. No provider key is required.",
    provider: "Provider",
    providerSttDescription:
      "Use a configured provider to transcribe your voice before it is sent to the model.",
    sttProvider: "STT Provider",
    sttProviderEnabledHint:
      "Only enabled providers with transcription support appear here.",
    sttProviderMissingHint:
      "Enable a provider with STT support in the Providers tab to choose it here.",
    nativeSttHint:
      "Native STT uses the device speech recognizer directly and works independently of your provider keys.",
    replyPlayback: "Reply Playback",
    sentencesArrive: "Sentences Arrive",
    sentencesArriveDescription:
      "Start speaking as soon as complete sentences are ready.",
    fullReplyFirst: "Full Reply First",
    fullReplyFirstDescription:
      "Generate the entire answer first, then play it in one pass.",
    textToSpeech: "Text to Speech",
    nativeTtsDescription:
      "Use the device speech engine for spoken replies and voice preview.",
    localTts: "Local",
    localTtsDescription:
      "Try a matching downloaded local voice first, then the selected provider if available, then the system voice.",
    providerTtsDescription:
      "Try the selected provider first, then a matching downloaded local voice, then the system voice.",
    ttsProvider: "TTS Provider",
    ttsProviderEnabledHint:
      "Only enabled providers with spoken-reply support appear here.",
    ttsProviderMissingHint:
      "Enable a provider with TTS support in the Providers tab to choose it here.",
    localTtsOrderHint:
      "Playback order: matching local voice first, then the selected provider if configured, then the system voice.",
    providerTtsOrderHint:
      "Playback order: selected provider first, then a matching downloaded local voice, then the system voice.",
    nativeTtsHint:
      "Native TTS uses the system voice stack and does not require a provider key.",
    localTtsLanguageCoverageHint:
      "Local packs currently cover English, German, Simplified Chinese, Spanish, Portuguese, Hindi, French, and Italian. Japanese still falls back automatically.",
    ttsVoice: "TTS Voice",
    providerDefaultVoiceHint:
      "This provider currently uses its default voice for preview and spoken replies.",
    listenLanguages: "Listen Languages",
    listenLanguagesHint:
      "Pick the reply languages you want to sound good. SchnackAI tries them in this order when routing speech output.",
    localVoicePacks: "Local Voice Packs",
    localVoicePacksHint:
      "Each language keeps its own local voice. Choose the voice you want for that language, then download only the packs you actually care about.",
    localVoiceForLanguage: ({ languageLabel }) => `Voice for ${languageLabel}`,
    providerVoicePreviews: "Provider Voice Previews",
    providerVoicePreviewsHint:
      "Test the currently selected TTS provider here with its own voice and a separate preview text for each reply language.",
    nativeVoicePreviewSection: "Native Voice Preview",
    nativeVoicePreviewSectionHint:
      "This speaks directly through the phone's built-in speech synthesizer so you can compare it against local and cloud voices.",
    nativeVoiceUnavailable:
      "This device did not report any native system voices for preview.",
    speechDiagnostics: "Recent Speech Activity",
    speechDiagnosticsHint:
      "Shows the latest speech requests, the route they asked for, the route they actually used, and any fallback reason.",
    speechDiagnosticsEmpty:
      "No recent speech requests yet. Preview a voice or play a reply to see routing details here.",
    speechDiagnosticSourceConversation: "Conversation reply",
    speechDiagnosticSourceRepeat: "Repeat reply",
    speechDiagnosticSourcePreview: "Voice preview",
    speechDiagnosticSourceUnknown: "Speech request",
    speechDiagnosticRouteLine: ({ requested, actual }) =>
      `Requested: ${requested} -> Actual: ${actual}`,
    speechDiagnosticStageLine: ({ stage }) => `Latest stage: ${stage}`,
    speechDiagnosticLanguageLine: ({ languageLabel }) =>
      `Language: ${languageLabel}`,
    speechDiagnosticProviderLine: ({ provider }) => `Provider: ${provider}`,
    speechDiagnosticVoiceLine: ({ voice }) => `Voice: ${voice}`,
    localTtsPackReady: "Installed on this device.",
    localTtsPackBroken:
      "Downloaded, but this voice failed local verification on this device. Re-download it or choose another voice.",
    localTtsPackMissing:
      "Not installed yet. Cloud TTS or the system voice will be used until you download it.",
    localTtsUnsupportedLanguageFallback:
      "A local pack is not available yet for this language. Cloud TTS or the system voice will handle it.",
    downloadingLocalTtsPack: ({ progress }) =>
      `Downloading local pack... ${progress}%`,
    download: "Download",
    downloadingShort: "Loading...",
    voicePreviewText: "Voice Preview Text",
    voicePreviewPlaceholder: "Type a phrase to hear this voice.",
    voicePreviewHint:
      "Uses the currently selected reply voice backend without sending anything to the language model.",
    previewVoice: "Preview Voice",
    generatingPreview: "Generating Preview...",
    playingPreview: "Playing Preview...",
    systemVoice: "System voice",
    noTtsProvider: "No TTS provider",
    nothingToCopyYet: "Nothing to copy yet.",
    couldntCopyText: "Couldn't copy that text.",
    nothingToShareYet: "Nothing to share yet.",
    couldntShareText: "Couldn't share that text.",
    couldntReplayReply: "Couldn't replay that reply.",
    messageCopied: "Message copied.",
    noConversationToCopyYet: "No conversation to copy yet.",
    noConversationToShareYet: "No conversation to share yet.",
    noReplyToRepeatYet: "No reply to replay yet.",
    threadCopied: "Thread copied.",
    threadRenamed: "Thread renamed.",
    threadPinned: "Thread pinned.",
    threadUnpinned: "Thread unpinned.",
    addProviderKeyToUseProvider: ({ provider }) =>
      `Add your ${provider} API key in Settings to use this provider.`,
    speechRecognitionUnavailableOnDevice:
      "Speech recognition is unavailable on this device.",
    debugLogLabel: "LOG",
    debugLogCaptureStarted: "Debug logging started.",
    debugLogCaptureStopped: ({ entryCount, fileName }) =>
      `Debug log saved as ${fileName} and copied to the clipboard (${entryCount} entries).`,
    debugLogCaptureStoppedNoClipboard: ({ entryCount, fileName }) =>
      `Debug log saved as ${fileName} (${entryCount} entries).`,
    debugLogCaptureRecovered: ({ entryCount, fileName }) =>
      `Recovered previous debug log ${fileName} and copied it to the clipboard (${entryCount} entries).`,
    debugLogCaptureRecoveredNoClipboard: ({ entryCount, fileName }) =>
      `Recovered previous debug log ${fileName} (${entryCount} entries).`,
    debugLogCaptureFailed: "Couldn't save the debug log.",
    chooseSttBeforeVoiceSession:
      "Choose an enabled STT provider in Settings before starting a voice session.",
    chooseTtsBeforeSpokenReplies:
      "Choose an enabled TTS provider in Settings before using spoken replies.",
    stopSessionBeforeReplay:
      "Stop the active voice session before replaying the last reply.",
    couldntCatchThatTryAgain: "Couldn't catch that, try again.",
    couldntStartVoiceInput: "Couldn't start voice input.",
    couldntProcessVoiceInput: "Couldn't process voice input.",
    addProviderKeyToEnableProvider: ({ provider }) =>
      `Add your ${provider} API key in Settings to enable it.`,
    stopSessionBeforePreview:
      "Stop the active voice session before previewing a voice.",
    chooseTtsToPreviewVoices:
      "Choose an enabled TTS provider in Settings to preview voices.",
    downloadSelectedLocalVoiceFirst: ({ languageLabel }) =>
      `Download the selected ${languageLabel} local voice first.`,
    couldntPreviewVoice: "Couldn't preview voice.",
    providerVoiceFallback:
      "Provider voice failed. Switched this reply to the system voice.",
    localVoiceFallback:
      "Local voice was unavailable. Switched this reply to the best fallback voice.",
    localTtsPackInstalled: ({ languageLabel }) =>
      `${languageLabel} local voice pack installed.`,
    localTtsPackInstallFailed: "Couldn't install the local voice pack.",
    clear: "Clear",
    voiceOutput: "Voice Output",
    currentSetup: "Current Setup",
    listeningToYourVoice: "Listening to your voice",
    parsingYourVoiceInput: "Parsing your voice input",
    waitingForProvider: ({ provider }) => `Waiting for ${provider}`,
    preparingVoiceWithProvider: ({ provider }) =>
      `Preparing voice with ${provider}`,
    speakingBackToYou: "Speaking back to you",
    freshSession: "Fresh session",
    messageCount: ({ count }) =>
      Number(count) === 1 ? "1 message" : `${count} messages`,
    speechInputRoute: ({ route }) => `Speech in: ${route}`,
    replyModelRoute: ({ route }) => `Reply model: ${route}`,
    voiceOutputRoute: ({ route }) => `Voice out: ${route}`,
    fallbackVoiceOutputRoute: ({ route }) => `Fallback voice out: ${route}`,
    conversation: "Conversation",
    show: "Show",
    showTranscript: "Show transcript",
    hide: "Hide",
    copyThread: "Copy Thread",
    shareThread: "Share Thread",
    repeatReply: "Repeat Reply",
    renameThread: "Rename Thread",
    renameThreadHint:
      "Give this conversation a title you can find quickly later.",
    threadTitle: "Thread title",
    noTranscriptYet: "No transcript yet",
    previewTranscriptEmptyDescription:
      "Start with the voice stage above. Your messages and the model reply will land here instantly.",
    noConversationYet: "No conversation yet",
    expandedTranscriptEmptyDescription:
      "Speak with the control above. Close this screen when you want to return to the main stage.",
    transcriptSelectionHint:
      "Select any message text directly, or share and copy individual messages below.",
    usageStatsHiddenDescription:
      "Keep token and cost estimates out of the transcript UI.",
    usageStatsVisibleDescription:
      "Show estimated token usage and estimated cost for replies and conversation totals.",
    estimatedUsageTitle: "Estimated Usage",
    estimatedUsageCounts: ({ replies, summaries }) =>
      `${replies} replies · ${summaries} memory updates`,
    estimatedUsageConversationScope:
      "Totals include every provider and model used inside this conversation.",
    estimatedPromptTokens: ({ count }) => `Prompt: ${count}`,
    estimatedReplyTokens: ({ count }) => `Reply: ${count}`,
    estimatedTotalTokens: ({ count }) => `Total: ${count}`,
    estimatedCost: ({ cost }) => `Cost: ${cost}`,
    estimatedCostPartial: ({ cost }) => `Cost: ${cost} partial`,
    estimatedUsageInline: ({ prompt, completion, total }) =>
      `Est. ${prompt} in · ${completion} out · ${total} total`,
    estimatedRouteUsage: ({ tokens, cost }) => `${tokens} tokens · ${cost}`,
    estimatedRouteUsagePartial: ({ tokens, cost }) =>
      `${tokens} tokens · ${cost} partial`,
    estimatedRouteUsageTokensOnly: ({ tokens }) => `${tokens} tokens`,
    unknownUsageRoute: "Unknown route",
    pricingAssumptions: "Pricing Assumptions",
    pricingAssumptionsHint: ({ date }) =>
      `Last reviewed ${date}. Costs are only shown when the active model matches one of these source-backed assumptions.`,
    pricingAssumptionRates: ({ input, output }) =>
      `$${input}/1M input · $${output}/1M output`,
    pricingAssumptionCheckedAt: ({ date }) => `Checked: ${date}`,
    openPricingSource: ({ source }) => `Open pricing source: ${source}`,
    source: "Source",
    startWithGroq: "Start with Groq",
    groqStarterDescription:
      "Groq offers a free tier, so it is the fastest way to unlock the app. Add its API key in Settings and the provider switcher will appear here right away.",
    idle: "Idle",
    yourConversationAppearsHere: "Your conversation appears here",
    defaultTranscriptEmptyDescription:
      "Press and hold the voice control, then speak naturally. SchnackAI will keep the thread and speak back.",
    delete: "Delete",
    memory: "Memory",
    conversations: "Conversations",
    drawerSubtitle: "Jump between live threads or start a fresh room.",
    newSession: "New Session",
    noSavedConversationsYet: "No saved conversations yet",
    drawerEmptyDescription:
      "Start speaking from the main view and SchnackAI will build a session automatically.",
    setupGuideTitle: "Choose a starting setup",
    setupGuideSubtitle:
      "Pick the stack you want first. You can change every route later in Settings.",
    fastestStartPreset: "Fastest start",
    fastestStartDescription:
      "Groq handles replies, while the device handles listening and speaking. Lowest setup friction.",
    fullVoicePreset: "Full provider voice",
    fullVoiceDescription:
      "OpenAI handles replies, transcription, and spoken output. Best if you want one provider stack.",
    setupGuideNote:
      "We will open Settings next so you can paste and validate the provider key.",
    useThisSetup: "Use this setup",
    notNow: "Not now",
    searchConversationsPlaceholder: "Search titles, models, and message text",
    noMatchingConversations: "No matching conversations",
    noMatchingConversationsDescription:
      "Try a different title, provider, model, or phrase from the transcript.",
    memoryModalTitle: "Conversation memory",
    memoryModalDescription:
      "This is the compact summary SchnackAI carries forward once a thread gets long enough to compress older turns.",
    memorySummary: "Saved summary",
    memorySummaryEmpty:
      "No compact memory yet. Once this thread gets longer, older turns will be summarized here.",
    summarizedTurnsCount: ({ count }) =>
      Number(count) === 1 ? "1 summarized turn" : `${count} summarized turns`,
    copyMemory: "Copy memory",
    forgetMemory: "Forget memory",
    memoryCopied: "Memory copied.",
    memoryCleared: "Conversation memory cleared.",
    noConversationToManageYet: "No conversation memory available yet.",
    noProviderYet: "No provider yet",
    noModelYet: "No model yet",
    startedAt: "Started",
    endedAt: "Ended",
    pinned: "Pinned",
    copy: "Copy",
    share: "Share",
    rename: "Rename",
    pin: "Pin",
    unpin: "Unpin",
    save: "Save",
    cancel: "Cancel",
    stop: "Stop",
    listening: "Listening",
    parsing: "Parsing",
    thinking: "Thinking",
    speaking: "Speaking",
    holdToSpeak: "Hold to speak",
    tapToSpeak: "Tap to speak",
    waitingForReply: "Waiting for reply",
    parsingYourVoice: "Parsing your voice",
    providerConfiguredInSettings: ({ provider }) =>
      `${provider} is not configured in Settings.`,
    providerNetworkError: ({ provider, action }) =>
      `Couldn't reach ${provider} for ${action}. Check the connection and try again.`,
    providerAuthError: ({ provider, action }) =>
      `${provider} rejected the credentials for ${action}. Check the API key and permissions.`,
    providerRateLimitError: ({ provider, action }) =>
      `${provider} is rate limiting ${action} right now. Try again in a moment.`,
    providerTemporaryError: ({ provider, action }) =>
      `${provider} had a temporary problem during ${action}. Try again shortly.`,
    providerContextTooLong: ({ provider }) =>
      `${provider} rejected the reply because the conversation got too long. Start a fresh thread or shorten the request.`,
    providerRequestRejected: ({ provider, action, detail }) =>
      detail
        ? `${provider} rejected the ${action} request: ${detail}`
        : `${provider} rejected the ${action} request.`,
    providerValidationSuccess: ({ provider }) => `${provider} is ready to use.`,
    providerValidationFailed: "Provider validation failed.",
    noBase64EncoderAvailable: "No base64 encoder available.",
    noBase64DecoderAvailable: "No base64 decoder available.",
    nativeTtsDoesNotSynthesizeAudioFiles:
      "Native TTS does not synthesize audio files.",
    localTtsUnavailableForLanguage: ({ languageLabel }) =>
      `No local or cloud voice route is ready for ${languageLabel}.`,
    chooseTextToSpeechProviderInSettings:
      "Choose a text-to-speech provider in Settings.",
    ttsNotSupportedYet: ({ provider }) =>
      `${provider} TTS is not supported yet.`,
    ttsError: ({ provider, status, errorText }) =>
      `${provider} TTS error (${status}): ${errorText}`,
    ttsReplyTooLong: ({ provider }) =>
      `${provider} speech output rejected the reply because it was too long.`,
    ttsTimeout: ({ provider }) => `${provider} speech output took too long.`,
    sttTimeout: ({ provider }) =>
      `${provider} speech transcription took too long.`,
    sttFileSizeLimitExceeded: ({ provider, model, limit }) =>
      `${provider} ${model} only accepts recordings up to ${limit}. Use a shorter clip or switch STT models.`,
    voiceInputCaptureIncomplete:
      "Voice input could not be captured cleanly. Please try again.",
    ttsDidNotReturnAudio: ({ provider }) =>
      `${provider} TTS did not return audio.`,
    nativeSttHandledInApp: "Native STT is handled directly in the app.",
    chooseSpeechToTextProviderInSettings:
      "Choose a speech-to-text provider in Settings.",
    sttNotSupportedYet: ({ provider }) =>
      `${provider} STT is not supported yet.`,
    providerNotWiredUpYet: ({ provider }) => `${provider} is not wired up yet.`,
    you: "You",
    assistant: "Assistant",
    untitledConversation: "Untitled conversation",
    conversationExportHeader: ({ title }) => `Conversation: ${title}`,
    speechRecognitionPermissionNotGranted:
      "Speech recognition permission not granted.",
    speechRecognitionUnavailableForDeviceLanguage:
      "Speech recognition is not available for the current device language.",
    nativeSpeechRecognitionNeedsNetwork:
      "Native speech recognition needs network access right now.",
    noSpeechDetected: "No speech was detected.",
    nativeSpeechRecognitionFailed: "Native speech recognition failed.",
    couldntStartNativeSpeechRecognition:
      "Couldn't start native speech recognition.",
    microphonePermissionNotGranted: "Microphone permission not granted",
  }
