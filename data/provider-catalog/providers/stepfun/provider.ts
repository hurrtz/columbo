import {
  createProviderContext,
  defineProviderDefinition,
} from "../../definitions";

export const providerDefinition = defineProviderDefinition(
  {
    "providerId": "stepfun",
    "providerName": "StepFun",
    "categoryName": "Chinese Providers",
    "hq": "CN",
    "verifiedSupport": {
      "llm": "native",
      "stt": "native",
      "tts": "native"
    },
    "officialSources": [
      "https://platform.stepfun.com/",
      "https://platform.stepfun.com/docs",
      "https://huggingface.co/stepfun-ai/Step-Audio-TTS-3B"
    ],
    "integration": {
      "catalogType": "Fixed first-party multimodal/audio catalog",
      "coverage": "Mostly exhaustive",
      "hasDynamicCatalog": false,
      "needsLiveDiscovery": false,
      "supportsSpeech": true,
      "lowConfidence": false,
      "openAiCompatible": true,
      "protocols": [],
      "regionSplitRecommended": false
    },
    "summaries": {
      "activeModels": {
        "llm": "Step 3.5 Flash [step-3.5-flash]\nStep R1 V Mini [step-r1-v-mini]\nStep 3 [step-3]\nStep 2 Mini [step-2-mini]",
        "tts": "Step TTS 2 [step-tts-2]\nStep TTS Mini [step-tts-mini]\nStep TTS Vivid [step-tts-vivid]\nStep Audio TTS 3B [step-audio-tts-3b] — Open-weight family reference",
        "stt": "Step 1o Audio [step-1o-audio]\nStep Audio 2 [step-audio-2]\nStep Audio R1.1 [step-audio-r1.1]"
      },
      "pricing": "Official platform shows multiple plan/model rates; end-to-end audio chat pricing has been described at roughly RMB 3.8 per chat hour in docs/promos.",
      "limits": "Public English-facing documentation is thinner than for western providers. Expect CN-centric onboarding.",
      "region": "Likely China-centric; precise regional data center detail not prominently published.",
      "sttLanguages": "Audio/omni models support speech understanding; exact language list should be validated in live docs before production.",
      "ttsLanguages": "Multilingual/emotional TTS per model literature, but official API language matrix is not as clearly centralized.",
      "freeTier": "Paid plans plus promotional offers; not a simple always-on free tier.",
      "integrationNotes": "Your source sheet is outdated here: StepFun is no longer just text/multimodal; it has notable audio/TTS lines."
    }
  }
);

export const providerContext = createProviderContext(providerDefinition);
