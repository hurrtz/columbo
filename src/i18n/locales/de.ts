import type { TranslationDictionary } from "../types";

export const de: TranslationDictionary = {
    retry: "Noch mal",
    dismiss: "Schließen",
    unavailable: "Gibt's nich",
    selection: "Auswahl",
    chooseCompatibleProviderFirst: "Wähle zuerst nen geeigneten Anbieter",
    settings: "Einstellungen",
    all: "Alle",
    firstRun: "Erster Start",
    instructions: "Befehle",
    providers: "Anbieter",
    webSearch: "Websuche",
    stt: "STT",
    tts: "TTS",
    ui: "UI",
    settingsSectionApiKeys: "API-Keys",
    settingsSectionApiKeysDescription:
      "Hinterlege hier alle Anbieter-Keys zentral und filtere bei Bedarf nach Fähigkeiten.",
    settingsSectionAiModels: "KI & Modelle",
    settingsSectionAiModelsDescription:
      "Lege Systemprompt, Antwortstil, Modellrouting und optionale Web-Grundierung an einer Stelle fest.",
    settingsSectionVoice: "Stimme",
    settingsSectionVoiceDescription:
      "Bestimme, wie du mit der App sprichst und wie die App mit dir spricht.",
    settingsSectionApp: "App",
    settingsSectionAppDescription:
      "Steuere Design, Sprache, Sichtbarkeit der Nutzung und Preisreferenzen.",
    theme: "Design",
    language: "Sprache",
    usageStats: "Nutzungsdaten",
    model: "Modell",
    english: "Englisch",
    german: "Deutsch",
    light: "Hell",
    dark: "Dunkel",
    system: "System",
    languageCoverage: ({ note }) => `Sprachabdeckung: ${note}`,
    recordingLimits: ({ note }) => `Aufnahmelimits: ${note}`,
    replyGenerationAction: "Erzeuge Antwort",
    speechTranscriptionAction: "Transkribiere Sprache",
    instructionsTabDescription:
      "Definiere, was jeder Anfrage als Befehl an das Model vorangestellt wird.",
    providersTabDescription:
      "Verbinde dich mit Anbietern, indem du API-Keys hinterlegts und ordne jeder Gesprächskategorie ein Modell zu.",
    webSearchTabDescription:
      "Wähle den Anbieter, der vor der eigentlichen Antwort frischen Web-Kontext holt.",
    catalogOnlyProvidersHint: ({ count }) =>
      `Hier werden ${count} zusaetzliche Anbieter nur aus dem Katalog fuer die UI-Pruefung angezeigt. Konfigurierbar und wirklich aufrufbar sind aktuell nur die verdrahteten Anbieter.`,
    openProviderCatalogDetails: ({ provider }) =>
      `Katalogdetails für ${provider} öffnen`,
    responseModes: "Gesprächskategorien",
    quickAndShallow: "Zackig",
    deepThinking: "Tiefgründig",
    quickModeDescription:
      "Nutze das für schnelle Antworten, wenn Tempo wichtiger ist als Nuancen.",
    normalModeDescription:
      "Nutze das für die meisten Gespräche, wenn du eine ausgewogene Antwort willst.",
    deepModeDescription:
      "Nutze das, wenn du das stärkste Modell für Details, Abwägungen und Reasoning willst.",
    useResponseMode: ({ mode }) => `${mode} verwenden`,
    sttTabDescription:
      "Steuere, wie Sprache aufgenommen wird und welches Backend Audio in Text umwandelt, bevor es das Modell erreicht.",
    ttsTabDescription:
      "Steuere, wann Antworten vorgelesen werden und welches Backend die Sprachausgabe übernimmt.",
    brief: "Kurz",
    briefDescription:
      "Halte die Antwort knapp. Nutze nur so viele Sätze wie nötig, um die Frage vollständig zu beantworten.",
    normal: "Normal",
    normalDescription:
      "Strebe eine ausgewogene Antwortlänge an. Decke die wichtigsten Punkte ab, ohne die Antwort unnötig in die Länge zu ziehen.",
    thorough: "Ausführlich",
    thoroughDescription:
      "Geh in die Tiefe und sei umfassend. Berücksichtige Nuancen, Details, Abwägungen und die relevante Begründung.",
    professional: "Professionell",
    professionalDescription:
      "Sprich wie ein erfahrener Berater im Kundengespräch. Präzise Wortwahl, kein Slang, souverän und bestimmt.",
    casual: "Locker",
    casualDescription:
      "Sprich wie ein kluger Freund im Café. Entspannt, natürlich, gesprächig. Abkürzungen und kleine Abschweifungen sind völlig okay.",
    nerdy: "Nerdig",
    nerdyDescription:
      "Sprich wie ein begeisterter Experte, der gerne in die Tiefe geht. Nutze Fachbegriffe frei und geh entspannt ins Detail.",
    concise: "Prägnant",
    conciseDescription:
      "Sei so kurz wie möglich und trotzdem vollständig. Keine Einleitung, kein Fülltext, nur die Antwort. Telegramm-Stil.",
    socratic: "Sokratisch",
    socraticDescription:
      "Fordere das Denken heraus. Stelle Gegenfragen, biete alternative Perspektiven an und bestätige nicht einfach, was gesagt wurde.",
    eli5: "Einfach erklärt",
    eli5Description:
      "Erkläre alles so einfach wie möglich. Nutze Analogien, Alltagssprache und verzichte auf Fachjargon.",
    openProviderSettings: ({ provider }) => `${provider}-Einstellungen öffnen`,
    createProviderApiKey: ({ provider }) =>
      `API-Schlüssel für ${provider} erstellen`,
    useProvider: ({ provider }) => `${provider} verwenden`,
    createApiKey: "API-Schlüssel erstellen",
    searchProviders: "Anbieter suchen",
    aboutThisProvider: "Über diesen Anbieter",
    providerStatusInvalid: "Ungültig",
    providerStatusTesting: "Prüfe",
    providerStatusConfigured: "Konfiguriert",
    providerStatusNotSetup: "Nicht eingerichtet",
    testProviderKey: "Key testen",
    providerValidationUnavailable:
      "Für diesen Anbieter ist noch kein Live-Test verdrahtet. Speichere den Key hier und prüfe ihn bei der echten Nutzung.",
    providerNeedsAttention: "braucht Aufmerksamkeit",
    catalogProviderReadOnlyHint:
      "Dieser Anbieter ist zur Ansicht im zentralen Katalog vorhanden, aber noch nicht in die App-Laufzeit integriert.",
    catalogProviderReferenceHint:
      "Katalogreferenz für diesen Anbieter:",
    catalogProviderModelCounts: ({ llm, stt, tts }) =>
      `Katalogmodelle: ${llm} LLM, ${stt} STT, ${tts} TTS.`,
    catalogProviderSupportSummary: ({ llm, stt, tts }) =>
      `Verifizierte Unterstützung: LLM ${llm}, STT ${stt}, TTS ${tts}.`,
    catalogProviderLiveDiscoveryHint:
      "Dieser Anbieter hat einen dynamischen Katalog. Für eine echte Integration wird voraussichtlich eine Live-Modellerkennung nötig sein.",
    catalogProviderPricingSummary: ({ summary }) => `Preise: ${summary}`,
    catalogProviderLimitsSummary: ({ summary }) => `Limits: ${summary}`,
    catalogProviderRegionSummary: ({ summary }) => `Regionen: ${summary}`,
    catalogProviderSttLanguagesSummary: ({ summary }) =>
      `STT-Sprachen: ${summary}`,
    catalogProviderTtsLanguagesSummary: ({ summary }) =>
      `TTS-Sprachen: ${summary}`,
    catalogProviderFreeTierSummary: ({ summary }) =>
      `Kostenloser Umfang: ${summary}`,
    catalogProviderIntegrationNotesSummary: ({ summary }) =>
      `Integrationshinweise: ${summary}`,
    catalogProviderNoModels: "Keine dokumentierten Modelle.",
    validateKey: "Schlüssel prüfen",
    validatingKey: "Prüfe …",
    showKey: "API-Key anzeigen",
    hideKey: "API-Key ausblenden",
    apiKeyProtectedHint:
      "Gespeicherte API-Keys bleiben standardmäßig verborgen. Zeige sie nur an, wenn du einen Wert prüfen oder ändern musst.",
    assistantInstructions: "Assistent-Anweisungen",
    systemPrompt: "Systemprompt",
    assistantInstructionsIntro:
      "Definiere den versteckten Befehl, der jedem Modell vor jeder Antwort vorangestellt wird.",
    baseInstructions: "Grundbefehle",
    assistantInstructionsPlaceholder:
      "Definiere, wie sich der Assistent verhalten soll.",
    assistantInstructionsHint:
      "Dieser Text wird immer vor der gewählten Antwortlänge und dem Stil vorangestellt.",
    adaptiveLength: "Antwortlänge",
    responseTone: "Antwortstil",
    inputMode: "Eingabemodus",
    voiceInput: "Spracheingabe",
    voiceInputDescription:
      "Steuere, wie deine Sprache aufgenommen wird, bevor sie das Modell erreicht.",
    pushToTalk: "Push to talk",
    pushToTalkDescription:
      "Lass den Button während des Sprechens gedrückt und lass ihn los, wenn du fertig bist.",
    toggleToTalk: "Toggle to talk",
    toggleToTalkDescription:
      "Button einmal drücken zum Losreden und dann noch einmal, wenn du fertig bist.",
    speechToText: "Sprache zu Text",
    appNative: "App-intern",
    nativeSttDescription:
      "Verwende die eingebaute Spracherkennung deines Handys. Kein API-Key nötig.",
    provider: "Anbieter",
    webSearchProvider: "Websuche-Anbieter",
    webSearchProviderHint:
      "Wähle den Anbieter für Live-Websuchen. Sein API-Key wird wie alle anderen Anbieter-Keys lokal auf dem Gerät gespeichert.",
    webSearchProviderMissingHint:
      "Richte in den API-Keys mindestens einen suchfähigen Anbieter ein, damit Web-Grundierung hier verfügbar ist.",
    webSearchMode: "Websuche-Modus",
    webSearchBehavior: "Wann gesucht wird",
    webSearchModeOff: "Aus",
    webSearchModeAuto: "Auto",
    webSearchModeOn: "An",
    webSearchModeAlways: "Immer",
    webSearchModeOffDescription:
      "Vor der Antwort wird niemals eine Websuche ausgeführt.",
    webSearchModeAutoDescription:
      "Nur suchen, wenn die Anfrage nach aktuellem Wissen aussieht oder an eine bereits geerdete Antwort anknüpft.",
    webSearchModeOnDescription:
      "Vor jeder Antwort suchen, sobald der Anbieter korrekt konfiguriert ist.",
    webSearchModelHint: ({ model }) =>
      `Verwendet im Hintergrund ${model} für die Live-Webrecherche.`,
    webSearchHomeHint:
      "Nutze den Homescreen-Schalter, um Web-Grundierung für diesen Schnack auszuschalten, automatisch zu steuern oder immer zu erzwingen.",
    settingsWebSearchCompactHint:
      "Optional wird vor der eigentlichen Antwort frischer Web-Kontext eingefügt.",
    webSearchAdvanced: "Erweiterte Suchregler",
    webSearchSetupNeeded:
      "Hinterlege den Anbieter-Key, um die Live-Websuche zu nutzen.",
    webSearchEnabledDescription:
      "Vor der Modellantwort wird frischer Web-Kontext ergänzt.",
    webSearchDisabledDescription:
      "Nutze Live-Web-Kontext, wenn aktuelle Fakten wichtig sind.",
    webSearchQualityControls: "Suchqualität",
    webSearchSearchMode: "Suchmodus",
    webSearchSearchModeQuick: "Schnell",
    webSearchSearchModeBalanced: "Ausgewogen",
    webSearchSearchModeDeep: "Tief",
    webSearchDepth: "Suchtiefe",
    webSearchDepthStandard: "Standard",
    webSearchDepthDeep: "Tief",
    webSearchResultCount: "Trefferanzahl",
    webSearchQualityHint: ({ provider }) =>
      `Diese Regler steuern, wie ${provider} frischen Kontext vor der Antwort einsammelt.`,
    webSearchNoExtraControls: ({ provider }) =>
      `${provider} bietet in dieser App derzeit keine zusätzlichen Suchregler an.`,
    setWebSearchMode: ({ mode }) => `Websuche auf ${mode} setzen`,
    openWebSearchSettings: "Websuche-Einstellungen öffnen",
    providerSttDescription:
      "Verwende einen der Anbieter aus der Liste, um deine Sprache zu transkribieren, bevor sie an das Modell geht.",
    sttProvider: "STT-Anbieter",
    sttProviderEnabledHint:
      "Hier erscheinen nur aktivierte Anbieter mit Transkriptionsunterstützung.",
    sttProviderMissingHint:
      'Aktiviere im Tab "Anbieter" einen Dienst mit STT-Unterstützung, um ihn hier auszuwählen.',
    nativeSttHint:
      "Native STT nutzt die Spracherkennung des Geräts direkt und funktioniert unabhängig von deinen API-Keys.",
    replyPlayback: "Wiedergabe",
    sentencesArrive: "Satzweise",
    sentencesArriveDescription:
      "Fange an Vorzulesen, sobald die ersten Daten angekommen sind.",
    fullReplyFirst: "Komplette Antwort zuerst",
    fullReplyFirstDescription:
      "Warte erst ab, bis die Antwort komplett eingegangen ist, bevor der Vorleseonkel loslegt.",
    textToSpeech: "Text zu Sprache",
    nativeTtsDescription:
      "Verwende die Sprachausgabe des Geräts für die Sprachausgabe.",
    voiceOutputDescription:
      "Wähle Sprachengine, Zielsprachen und Stimmvorschauen für die Sprachausgabe.",
    localTts: "Lokal",
    localTtsDescription:
      "Nutze zuerst ein passendes lokales LLM, dann (falls vorhanden) den ausgewählten Anbieter, und zuletzt die Systemstimme.",
    providerTtsDescription:
      "Nutze zuerst den ausgewählten Anbieter, dann das passende lokale LLM und zuletzt die Systemstimme.",
    ttsProvider: "TTS-Anbieter",
    ttsProviderEnabledHint:
      "Hier erscheinen nur aktivierte Anbieter mit Sprachausgabe-Unterstützung.",
    ttsProviderMissingHint:
      'Aktiviere im Tab "Anbieter" einen Dienst mit TTS-Unterstützung, um ihn hier auszuwählen.',
    localTtsOrderHint:
      "Reihenfolge: passende lokale LLM zuerst, dann der ausgewählte Anbieter (falls vorhanden), dann die Systemstimme.",
    providerTtsOrderHint:
      "Reihenfolge: ausgewählter Anbieter zuerst, dann eine passende lokale LLM, dann die Systemstimme.",
    nativeTtsHint:
      "Native TTS nutzt die Systemstimmen des Geräts und benötigt keinen API-Key.",
    localTtsLanguageCoverageHint:
      "Lokale Sprachpakete decken derzeit Englisch, Deutsch, vereinfachtes Chinesisch, Spanisch, Portugiesisch, Hindi, Französisch und Italienisch ab.",
    ttsVoice: "TTS-Stimme",
    providerDefaultVoiceHint:
      "Dieser Anbieter nutzt aktuell seine Standardstimme für Vorschau und Sprachausgabe.",
    listenLanguages: "Sprachen",
    listenLanguagesHint:
      "Wähle die Sprachen aus, die gut klingen sollen. SchnackAI probiert sie in dieser Reihenfolge für die Sprachausgabe.",
    localVoicePacks: "Lokale LLMs",
    localVoicePacksHint:
      "Jede Sprache bringt eigene Stimmen mit. Wähle zuerst eine Stimme pro Sprache aus und lade dann die LLMs herunter, die du brauchst.",
    localVoiceForLanguage: ({ languageLabel }) => `Stimme für ${languageLabel}`,
    providerVoicePreviews: "Anbieter-Stimmvorschau",
    providerVoicePreviewsHint:
      "Teste hier den aktuell ausgewählten TTS-Anbieter mit eigener Stimme und einem separaten Vorschautext pro Antwortsprache.",
    nativeVoicePreviewSection: "Native Stimmvorschau",
    nativeVoicePreviewSectionHint:
      "Nutzt direkt die eingebaute Sprachsynthese des Geräts, damit du sie mit lokalen und Cloud-Stimmen vergleichen kannst.",
    nativeVoiceUnavailable:
      "Dieses Gerät hat keine nativen Systemstimmen für die Vorschau.",
    speechDiagnostics: "Letzte Aktivität",
    speechDiagnosticsHint:
      "Zeigt die letzten Aktivitäten, das gewünschte Sprachsetting, die tatsächlich Sprachsetting und den jeweiligen Grund für einen Fallback.",
    speechDiagnosticsEmpty:
      "Noch keine aktuellen Aktivitäten. Teste eine Stimme oder spiele eine Antwort ab, um hier Routing-Details zu sehen.",
    speechDiagnosticSourceConversation: "Antwort aus dem Schnack",
    speechDiagnosticSourceRepeat: "Antwort wiederholen",
    speechDiagnosticSourcePreview: "Vorschau der Stimme",
    speechDiagnosticSourceUnknown: "Anfrage",
    speechDiagnosticRouteLine: ({ requested, actual }) =>
      `Angefragt: ${requested} -> Tatsächlich: ${actual}`,
    speechDiagnosticStageLine: ({ stage }) => `Letzte Stufe: ${stage}`,
    speechDiagnosticLanguageLine: ({ languageLabel }) =>
      `Sprache: ${languageLabel}`,
    speechDiagnosticProviderLine: ({ provider }) => `Anbieter: ${provider}`,
    speechDiagnosticVoiceLine: ({ voice }) => `Stimme: ${voice}`,
    localTtsPackReady: "Auf diesem Gerät installiert.",
    localTtsPackBroken:
      "Heruntergeladen, aber es liegt ein Fehler vor. Lade erneut herunter oder wähle eine andere Stimme.",
    localTtsPackMissing:
      "Noch nicht installiert. Bis zum Download werden Cloud-TTS oder die Systemstimme genutzt.",
    localTtsUnsupportedLanguageFallback:
      "Für diese Sprache gibt es noch kein lokales LLM. Cloud-TTS oder die Systemstimme übernehmen.",
    downloadingLocalTtsPack: ({ progress }) =>
      `Lokales Paket wird geladen… ${progress} %`,
    download: "Download",
    downloadingShort: "Lädt …",
    voicePreviewText: "Text für Stimmvorschau",
    voicePreviewPlaceholder: "Gib einen Satz ein, um diese Stimme zu hören.",
    voicePreviewHint:
      "Verwendet das aktuell gewählte Sprach-Backend, ohne etwas an das Sprachmodell zu senden.",
    previewVoice: "Stimme testen",
    generatingPreview: "Vorschau wird erzeugt…",
    playingPreview: "Vorschau wird abgespielt…",
    systemVoice: "Systemstimme",
    noTtsProvider: "Kein TTS-Anbieter",
    nothingToCopyYet: "Noch nichts zum Kopieren.",
    couldntCopyText: "Der Text konnte nicht kopiert werden.",
    nothingToShareYet: "Noch nichts zum Teilen.",
    couldntShareText: "Der Text konnte nicht geteilt werden.",
    couldntReplayReply: "Die Antwort konnte nicht erneut abgespielt werden.",
    messageCopied: "Schnack kopiert.",
    noConversationToCopyYet: "Noch kein Schnack zum Kopieren.",
    noConversationToShareYet: "Noch kein Schnack zum Teilen.",
    noReplyToRepeatYet: "Noch keine Antwort zum Wiederholen.",
    threadCopied: "Schnack kopiert.",
    threadRenamed: "Schnack umbenannt.",
    threadPinned: "Schnack angeheftet.",
    threadUnpinned: "Nicht mehr angeheftet.",
    addProviderKeyToUseProvider: ({ provider }) =>
      `Füge in den Einstellungen deinen API-Schlüssel für ${provider} hinzu, um diesen Anbieter zu nutzen.`,
    endpointCredentialFormatInvalid: ({ provider }) =>
      `Gib für ${provider} die Basis-URL des Anbieters und den API-Schlüssel als https://dein-endpunkt.example.com|dein-api-schluessel ein.`,
    azureCredentialFormatInvalid: ({ provider }) =>
      `Gib für ${provider} den Azure-Endpunkt und den API-Schlüssel als https://your-resource.openai.azure.com|dein-api-schluessel ein.`,
    awsCredentialFormatInvalid: ({ provider }) =>
      `Gib für ${provider} AWS-Region, Access Key ID, Secret Access Key und optional Session-Token als us-east-1|access-key-id|secret-access-key|session-token ein.`,
    ibmCredentialFormatInvalid: ({ provider }) =>
      `Gib für ${provider} watsonx-URL, watsonx-API-Schlüssel, Projekt-ID, Speech-to-Text-URL, Speech-to-Text-API-Schlüssel, Text-to-Speech-URL und Text-to-Speech-API-Schlüssel getrennt durch | ein.`,
    speechRecognitionUnavailableOnDevice:
      "Spracherkennung ist auf diesem Gerät nicht verfügbar.",
    debugLogLabel: "LOG",
    debugLogCaptureStarted: "Debug-Logging gestartet.",
    debugLogCaptureStopped: ({ entryCount, fileName }) =>
      `Debug-Log als ${fileName} gespeichert und in die Zwischenablage kopiert (${entryCount} Einträge).`,
    debugLogCaptureStoppedNoClipboard: ({ entryCount, fileName }) =>
      `Debug-Log als ${fileName} gespeichert (${entryCount} Einträge).`,
    debugLogCaptureRecovered: ({ entryCount, fileName }) =>
      `Vorheriges Debug-Log ${fileName} wiederhergestellt und in die Zwischenablage kopiert (${entryCount} Einträge).`,
    debugLogCaptureRecoveredNoClipboard: ({ entryCount, fileName }) =>
      `Vorheriges Debug-Log ${fileName} wiederhergestellt (${entryCount} Einträge).`,
    debugLogCaptureFailed: "Das Debug-Log konnte nicht gespeichert werden.",
    chooseSttBeforeVoiceSession:
      "Wähle in den Einstellungen einen aktivierten STT-Anbieter, bevor du eine Sprachsitzung startest.",
    chooseTtsBeforeSpokenReplies:
      "Wähle in den Einstellungen einen aktivierten TTS-Anbieter, bevor du gesprochene Antworten nutzt.",
    stopSessionBeforeReplay:
      "Beende die laufende Sprachsitzung, bevor du die letzte Antwort erneut abspielst.",
    couldntCatchThatTryAgain:
      "Das wurde nicht richtig erkannt - versuch es noch einmal.",
    couldntStartVoiceInput: "Schnack konnte nicht gestartet werden.",
    couldntProcessVoiceInput: "Schnack konnte nicht verarbeitet werden.",
    addProviderKeyToEnableProvider: ({ provider }) =>
      `Füge in den Einstellungen deinen API-Schlüssel für ${provider} hinzu, um ihn zu aktivieren.`,
    stopSessionBeforePreview:
      "Beende den laufenden Schnack, bevor du eine Stimme testest.",
    chooseTtsToPreviewVoices:
      "Wähle in den Einstellungen einen aktivierten TTS-Anbieter, um Stimmen zu testen.",
    downloadSelectedLocalVoiceFirst: ({ languageLabel }) =>
      `Lade zuerst die ausgewählte lokale Stimme für ${languageLabel} herunter.`,
    couldntPreviewVoice: "Die Stimmvorschau konnte nicht abgespielt werden.",
    providerVoiceFallback:
      "Die Anbieter-Stimme ist ausgefallen. Diese Antwort wird mit der Systemstimme abgespielt.",
    localVoiceFallback:
      "Die lokale Stimme war nicht verfügbar. Diese Antwort nutzt die beste verfügbare Ersatzstimme.",
    localTtsPackInstalled: ({ languageLabel }) =>
      `Lokales Sprachpaket für ${languageLabel} installiert.`,
    localTtsPackInstallFailed:
      "Das lokale Sprachpaket konnte nicht installiert werden.",
    clear: "Leeren",
    voiceOutput: "Sprachausgabe",
    currentSetup: "Aktuelles Setup",
    listeningToYourVoice: "Ich höre dir zu",
    parsingYourVoiceInput: "Dein Schnack wird verarbeitet",
    searchingTheWeb: "Suche im Web nach frischem Kontext",
    waitingForProvider: ({ provider }) => `Warte auf ${provider}`,
    preparingVoiceWithProvider: ({ provider }) =>
      `Bereite Stimme mit ${provider} vor`,
    speakingBackToYou: "Antwort wird gesprochen",
    freshSession: "Neuer Schnack",
    messageCount: ({ count }) =>
      Number(count) === 1 ? "1 Nachricht" : `${count} Nachrichten`,
    speechInputRoute: ({ route }) => `Sprache rein: ${route}`,
    replyModelRoute: ({ route }) => `Antwortmodell: ${route}`,
    voiceOutputRoute: ({ route }) => `Stimme raus: ${route}`,
    fallbackVoiceOutputRoute: ({ route }) =>
      `Fallback Stimme raus: ${route}`,
    conversation: "Schnack",
    show: "Anzeigen",
    showTranscript: "Schnack anzeigen",
    hide: "Ausblenden",
    copyThread: "Schnack kopieren",
    shareThread: "Schnack teilen",
    repeatReply: "Antwort wiederholen",
    renameThread: "Schnack umbenennen",
    renameThreadHint:
      "Gib diesem Schnack einen Titel, den du später schnell wiederfindest.",
    threadTitle: "Titel vom Schnack",
    noTranscriptYet: "Noch kein Transkript",
    previewTranscriptEmptyDescription:
      "Starte oben mit der Sprachsteuerung. Deine Nachrichten und die Modellantwort erscheinen hier sofort.",
    noConversationYet: "Noch kein Schnack",
    expandedTranscriptEmptyDescription:
      "Sprich über die Steuerung oben. Schließe diesen Bildschirm, wenn du zur Hauptansicht zurückkehren willst.",
    transcriptSelectionHint:
      "Du kannst Text direkt markieren oder einzelne Nachrichten unten teilen und kopieren.",
    usageStatsHiddenDescription:
      "Blende Token- und Kostenschätzungen im Transkript aus.",
    usageStatsVisibleDescription:
      "Zeige geschätzte Token-Nutzung und geschätzte Kosten pro Antwort sowie für den gesamten Schnack.",
    estimatedUsageTitle: "Geschätzte Nutzung",
    estimatedUsageCounts: ({ replies, summaries }) =>
      `${replies} Antworten · ${summaries} Speicher-Updates`,
    estimatedUsageConversationScope:
      "Die Summen enthalten alle Anbieter und Modelle, die in diesem Schnack verwendet wurden.",
    estimatedPromptTokens: ({ count }) => `Prompt: ${count}`,
    estimatedReplyTokens: ({ count }) => `Antwort: ${count}`,
    estimatedTotalTokens: ({ count }) => `Gesamt: ${count}`,
    estimatedCost: ({ cost }) => `Kosten: ${cost}`,
    estimatedCostPartial: ({ cost }) => `Kosten: ${cost} teilweise`,
    estimatedUsageInline: ({ prompt, completion, total }) =>
      `Geschätzt: ${prompt} rein · ${completion} raus · ${total} gesamt`,
    usedWebSearch: "Mit Websuche",
    sources: "Quellen",
    openSourceLink: ({ source }) => `Quelle öffnen: ${source}`,
    estimatedRouteUsage: ({ tokens, cost }) => `${tokens} Token · ${cost}`,
    estimatedRouteUsagePartial: ({ tokens, cost }) =>
      `${tokens} Token · ${cost} teilweise`,
    estimatedRouteUsageTokensOnly: ({ tokens }) => `${tokens} Token`,
    unknownUsageRoute: "Unbekannte Route",
    pricingAssumptions: "Preisannahmen",
    pricingAssumptionsHint: ({ date }) =>
      `Zuletzt geprüft am ${date}. Kosten werden nur gezeigt, wenn das aktive Modell zu einer dieser quellenbasierten Annahmen passt.`,
    pricingAssumptionRates: ({ input, output }) =>
      `$${input}/1M Input · $${output}/1M Output`,
    pricingAssumptionCheckedAt: ({ date }) => `Geprüft: ${date}`,
    openPricingSource: ({ source }) => `Preisquelle öffnen: ${source}`,
    source: "Quelle",
    startWithGroq: "Mit Groq starten",
    groqStarterDescription:
      "Groq bietet einen kostenlosen Tarif und ist damit der schnellste Weg, die App freizuschalten. Füge in den Einstellungen den API-Schlüssel hinzu – der Anbieter-Umschalter erscheint dann sofort hier.",
    idle: "Bereit",
    yourConversationAppearsHere: "Dein Schnack erscheint hier",
    defaultTranscriptEmptyDescription:
      "Halte die Sprachsteuerung gedrückt und sprich ganz natürlich. SchnackAI behält den Schnack und antwortet dir per Stimme.",
    delete: "Löschen",
    memory: "Speicher",
    conversations: "Schnacks",
    drawerSubtitle:
      "Wechsle zwischen aktiven Schnacks oder starte einen neuen Raum.",
    newSession: "Neue Sitzung",
    noSavedConversationsYet: "Noch keine gespeicherten Schnacks",
    drawerEmptyDescription:
      "Sprich in der Hauptansicht los und SchnackAI erstellt automatisch einen Schnack.",
    setupGuideTitle: "Wähle ein Start-Setup",
    setupGuideSubtitle:
      "Such dir zuerst einen Stack aus. Du kannst später alles in den Einstellungen ändern.",
    fastestStartPreset: "Schnellster Start",
    fastestStartDescription:
      "Groq übernimmt die Antworten, das Gerät kümmert sich ums Hören und Sprechen. Minimaler Aufwand.",
    fullVoicePreset: "Kompletter Anbieter-Stack",
    fullVoiceDescription:
      "OpenAI übernimmt Antworten, Transkription und Sprachausgabe. Ideal, wenn du alles über einen Anbieter laufen lassen willst.",
    setupGuideNote:
      "Danach öffnen wir die Einstellungen, damit du den API-Key einfügen und prüfen kannst.",
    useThisSetup: "Dieses Setup nutzen",
    notNow: "Jetzt nicht",
    searchConversationsPlaceholder:
      "Suche nach Titeln, Modellen und Nachrichtentext",
    noMatchingConversations: "Keine passenden Schnacks",
    noMatchingConversationsDescription:
      "Versuch es mit einem anderen Titel, Anbieter, Modell oder Satz aus dem Transkript.",
    memoryModalTitle: "Alle deine Schnacks",
    memoryModalDescription:
      "Das ist die kompakte Zusammenfassung, die SchnackAI weiterträgt, sobald ein Schnack lang genug wird und ältere Beiträge zusammengefasst werden.",
    memorySummary: "Gespeicherte Zusammenfassung",
    memorySummaryEmpty:
      "Noch kein kompakter Speicher. Sobald dieser Schnack länger wird, werden ältere Beiträge hier zusammengefasst.",
    summarizedTurnsCount: ({ count }) =>
      Number(count) === 1
        ? "1 zusammengefasster Beitrag"
        : `${count} zusammengefasste Beiträge`,
    copyMemory: "Speicher kopieren",
    forgetMemory: "Speicher vergessen",
    memoryCopied: "Speicher kopiert.",
    memoryCleared: "Speicher gelöscht.",
    noConversationToManageYet: "Noch kein Speicher verfügbar.",
    noProviderYet: "Noch kein Anbieter",
    noModelYet: "Noch kein Modell",
    startedAt: "Begonnen",
    endedAt: "Beendet",
    pinned: "Angeheftet",
    copy: "Kopieren",
    share: "Teilen",
    rename: "Umbenennen",
    pin: "Anheften",
    unpin: "Lösen",
    save: "Speichern",
    cancel: "Abbrechen",
    stop: "Stopp",
    listening: "Hört zu",
    parsing: "Verarbeitet",
    webSearchAction: "Websuche",
    thinking: "Denkt nach",
    speaking: "Spricht",
    holdToSpeak: "Zum Sprechen halten",
    tapToSpeak: "Bereit zum Losschnacken",
    waitingForReply: "Warte auf Antwort",
    parsingYourVoice: "Sprache wird verarbeitet",
    providerConfiguredInSettings: ({ provider }) =>
      `${provider} ist in den Einstellungen nicht konfiguriert.`,
    providerNetworkError: ({ provider, action }) =>
      `${provider} war für ${action} nicht erreichbar. Prüfe die Verbindung und versuch es erneut.`,
    providerAuthError: ({ provider, action }) =>
      `${provider} hat die Zugangsdaten für ${action} abgelehnt. Prüfe API-Schlüssel und Berechtigungen.`,
    providerRateLimitError: ({ provider, action }) =>
      `${provider} drosselt ${action} gerade. Versuch es gleich noch einmal.`,
    providerTimeoutError: ({ provider, action }) =>
      `${provider} hat für ${action} zu lange gebraucht. Versuch es erneut.`,
    providerTemporaryError: ({ provider, action }) =>
      `${provider} hatte während ${action} ein vorübergehendes Problem. Versuch es in Kürze erneut.`,
    providerContextTooLong: ({ provider }) =>
      `${provider} hat die Antwort abgelehnt, weil der Schnack zu lang geworden ist. Starte einen neuen Schnack oder kürze die Anfrage.`,
    providerRequestRejected: ({ provider, action, detail }) =>
      detail
        ? `${provider} hat die Anfrage für ${action} abgelehnt: ${detail}`
        : `${provider} hat die Anfrage für ${action} abgelehnt.`,
    providerValidationSuccess: ({ provider }) =>
      `${provider} ist einsatzbereit.`,
    providerValidationFailed: "Anbieter-Prüfung fehlgeschlagen.",
    providerHealthSummaryReady: ({ count }) => `Bereit ${count}`,
    providerHealthSummaryConfigured: ({ count }) => `Konfiguriert ${count}`,
    providerHealthSummaryChecking: ({ count }) => `Prüft ${count}`,
    providerHealthSummaryFailing: ({ count }) => `Fehler ${count}`,
    providerHealthSummaryMissing: ({ count }) => `Fehlt ${count}`,
    webSearchFallback:
      "Die Websuche war nicht verfügbar. Die Antwort lief ohne frischen Web-Kontext weiter.",
    noBase64EncoderAvailable: "Kein Base64-Encoder verfügbar.",
    noBase64DecoderAvailable: "Kein Base64-Decoder verfügbar.",
    nativeTtsDoesNotSynthesizeAudioFiles:
      "Native TTS erzeugt keine Audiodateien.",
    localTtsUnavailableForLanguage: ({ languageLabel }) =>
      `Für ${languageLabel} ist aktuell weder lokal noch in der Cloud eine Sprachroute bereit.`,
    chooseTextToSpeechProviderInSettings:
      "Wähle in den Einstellungen einen TTS-Anbieter.",
    ttsNotSupportedYet: ({ provider }) =>
      `TTS wird für ${provider} noch nicht unterstützt.`,
    ttsError: ({ provider, status, errorText }) =>
      `TTS-Fehler bei ${provider} (${status}): ${errorText}`,
    ttsReplyTooLong: ({ provider }) =>
      `${provider} hat die Sprachausgabe abgelehnt, weil die Antwort zu lang war.`,
    ttsTimeout: ({ provider }) =>
      `Die Sprachausgabe bei ${provider} hat zu lange gedauert.`,
    sttTimeout: ({ provider }) =>
      `Die Sprachtranskription bei ${provider} hat zu lange gedauert.`,
    sttFileSizeLimitExceeded: ({ provider, model, limit }) =>
      `${provider} ${model} akzeptiert nur Aufnahmen bis ${limit}. Nutze einen kuerzeren Clip oder wechsle das STT-Modell.`,
    voiceInputCaptureIncomplete:
      "Die Spracheingabe konnte nicht sauber aufgenommen werden. Bitte versuch es noch einmal.",
    ttsDidNotReturnAudio: ({ provider }) =>
      `${provider} hat kein Audio zurückgegeben.`,
    nativeSttHandledInApp: "Native STT wird direkt in der App verarbeitet.",
    chooseSpeechToTextProviderInSettings:
      "Wähle in den Einstellungen einen STT-Anbieter.",
    sttNotSupportedYet: ({ provider }) =>
      `STT wird für ${provider} noch nicht unterstützt.`,
    providerNotWiredUpYet: ({ provider }) =>
      `${provider} ist noch nicht angebunden.`,
    you: "Du",
    assistant: "Assistent",
    untitledConversation: "Unbenannter Schnack",
    conversationExportHeader: ({ title }) => `Schnack: ${title}`,
    speechRecognitionPermissionNotGranted:
      "Berechtigung für Spracherkennung wurde nicht erteilt.",
    speechRecognitionUnavailableForDeviceLanguage:
      "Spracherkennung ist für die aktuelle Gerätesprache nicht verfügbar.",
    nativeSpeechRecognitionNeedsNetwork:
      "Die native Spracherkennung benötigt gerade eine Netzwerkverbindung.",
    noSpeechDetected: "Es wurde keine Sprache erkannt.",
    nativeSpeechRecognitionFailed:
      "Die native Spracherkennung ist fehlgeschlagen.",
    couldntStartNativeSpeechRecognition:
      "Die native Spracherkennung konnte nicht gestartet werden.",
    microphonePermissionNotGranted:
      "Berechtigung für das Mikrofon wurde nicht erteilt",
  }
