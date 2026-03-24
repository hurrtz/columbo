# Integration Status

Last updated: March 24, 2026

This file is the temporary source of truth for what the app runtime should actually be able to do today.

- The committed provider catalog is broader than the live runtime.
- The Providers tab now shows the full catalog button grid for UI inspection.
- If a provider or model is not listed below as wired, treat it as browse-only for now.

## Runtime Source Files

- Runtime integration manifest: `src/constants/providers/runtimeManifest.ts`
- LLM routing: `src/services/llm.ts` and `src/services/llm/shared.ts`
- STT routing: `src/services/whisper/config.ts`
- TTS routing: `src/services/tts/shared.ts`
- App-facing provider/model picker data: `src/constants/providers/catalogData.ts` and `src/constants/providers/speech.ts`

## Wired LLM Providers And Models

All 10 app runtime providers are currently wired for LLM generation.

### OpenAI

Route: OpenAI-compatible `v1/chat/completions`

Models:
`gpt-5.4`, `gpt-5.4-mini`, `gpt-5.4-nano`, `gpt-5.4-pro`, `gpt-5.2`, `gpt-5.1`, `gpt-5`, `gpt-5-mini`, `gpt-5-nano`, `o3`, `o3-pro`, `o4-mini`, `o3-mini`, `o1`, `o1-mini`, `o1-preview`, `gpt-4.5-preview`, `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `gpt-4o`, `gpt-4o-mini`, `gpt-4-turbo`, `gpt-4`, `gpt-3.5-turbo`

### Anthropic

Route: Anthropic `v1/messages`

Models:
`claude-opus-4-6`, `claude-sonnet-4-6`, `claude-haiku-4-5-20251001`, `claude-opus-4-5-20251101`, `claude-sonnet-4-5-20250929`, `claude-opus-4-1-20250805`, `claude-opus-4-20250522`, `claude-sonnet-4-20250514`, `claude-3-haiku-20240307`

### Google

Route: Gemini OpenAI-compatible chat completions endpoint

Models:
`gemini-3.1-pro-preview`, `gemini-3.1-flash-lite-preview`, `gemini-3-flash-preview`, `gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-2.5-flash-lite`, `gemini-2.0-flash`, `gemini-2.0-flash-lite`

### xAI

Route: OpenAI-compatible `https://api.x.ai/v1/chat/completions`

Models:
`grok-4`, `grok-4-1-fast-reasoning`, `grok-4-1-fast-non-reasoning`, `grok-code-fast-1`, `grok-3`, `grok-3-fast`, `grok-3-mini`

### Groq

Route: OpenAI-compatible `https://api.groq.com/openai/v1/chat/completions`

Models:
`groq/compound`, `groq/compound-mini`, `meta-llama/llama-4-maverick-17b-128e-instruct`, `meta-llama/llama-4-scout-17b-16e-instruct`, `llama-3.3-70b-versatile`, `llama-3.1-8b-instant`, `openai/gpt-oss-120b`, `openai/gpt-oss-20b`, `moonshotai/kimi-k2-instruct-0905`, `qwen/qwen3-32b`

### DeepSeek

Route: OpenAI-compatible `https://api.deepseek.com/chat/completions`

Models:
`deepseek-chat`, `deepseek-reasoner`

### Mistral

Route: OpenAI-compatible `https://api.mistral.ai/v1/chat/completions`

Models:
`mistral-large-latest`, `mistral-medium-latest`, `magistral-medium-latest`, `magistral-small-latest`, `mistral-small-latest`, `ministral-8b-latest`, `open-mistral-nemo`, `codestral-latest`

### Cohere

Route: Cohere chat route

Models:
`command-a-03-2025`, `command-a-reasoning-08-2025`, `command-a-vision-07-2025`, `command-r7b-12-2024`, `command-r-plus-08-2024`, `command-r-08-2024`

### Together

Route: OpenAI-compatible `https://api.together.xyz/v1/chat/completions`

Models:
`MiniMaxAI/MiniMax-M2.5`, `Qwen/Qwen3.5-397B-A17B`, `Qwen/Qwen3-235B-A22B-FP8`, `Qwen/Qwen3.5-9B`, `openai/gpt-oss-20b`, `openai/gpt-oss-120b`, `moonshotai/Kimi-K2.5`, `deepseek-ai/DeepSeek-V3.1`, `deepseek-ai/DeepSeek-R1`, `meta-llama/Llama-3.3-70B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo`, `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8`, `Qwen/Qwen3-Next-80B-A3B-Instruct`, `Qwen/Qwen3-Coder-Next-FP8`

### NVIDIA

Route: OpenAI-compatible `https://integrate.api.nvidia.com/v1/chat/completions`

Models:
`nvidia/llama-3.3-nemotron-super-49b-v1.5`, `nvidia/llama-3.1-nemotron-ultra-253b-v1`, `nvidia/llama-3.1-nemotron-nano-8b-v1`

## Wired STT Providers And Models

Only these providers currently have provider-side STT routes in code.

### OpenAI

Route: `https://api.openai.com/v1/audio/transcriptions`

Models:
`gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, `whisper-1`

### Google

Route: Gemini speech understanding path under `https://generativelanguage.googleapis.com/v1beta/models`

Models:
`gemini-3.1-pro-preview`, `gemini-3.1-flash-lite-preview`, `gemini-3-flash-preview`, `gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-2.5-flash-lite`, `gemini-2.0-flash`, `gemini-2.0-flash-lite`

### Groq

Route: `https://api.groq.com/openai/v1/audio/transcriptions`

Models:
`whisper-large-v3-turbo`, `whisper-large-v3`

### Mistral

Route: `https://api.mistral.ai/v1/audio/transcriptions`

Models:
`voxtral-mini-latest`

### Together

Route: `https://api.together.xyz/v1/audio/transcriptions`

Models:
`openai/whisper-large-v3`, `mistralai/Voxtral-Mini-3B-2507`

## Wired TTS Providers And Models

Only these providers currently have provider-side TTS routes in code.

### OpenAI

Route: `https://api.openai.com/v1/audio/speech`

Models:
`gpt-4o-mini-tts`, `tts-1`, `tts-1-hd`

### Google

Route: Gemini TTS path under `https://generativelanguage.googleapis.com/v1beta/models`

Models:
`gemini-2.5-flash-preview-tts`, `gemini-2.5-pro-preview-tts`

### Together

Route: `https://api.together.xyz/v1/audio/speech`

Models:
`hexgrad/Kokoro-82M`

### xAI

Route: `https://api.x.ai/v1/audio/speech`

Models:
`grok-tts-mini`

## Catalog-Only Providers

These provider documents exist in `data/provider-catalog/providers` and now appear in the Providers-tab button grid for UI inspection, but they are not yet wired into the app runtime.

`01-ai-yi`, `ai21-labs`, `aleph-alpha`, `alibaba-qwen-dashscope`, `amazon-aws`, `assemblyai`, `baichuan`, `baidu-ernie-qianfan`, `bytedance-doubao-seed`, `cartesia`, `cerebras`, `deepgram`, `deepinfra`, `elevenlabs`, `fireworks-ai`, `fish-audio`, `gladia`, `hugging-face-inference-api`, `hyperbolic`, `ibm-watsonx`, `inworld-ai`, `lemonfox-ai`, `lepton-ai`, `lmnt`, `microsoft-azure`, `minimax`, `moonshot-ai-kimi`, `murf-ai`, `neets-ai`, `novita-ai`, `perplexity`, `picovoice`, `playht`, `reka`, `replicate`, `resemble-ai`, `rev-ai`, `sambanova`, `siliconflow`, `soniox`, `speechify`, `speechmatics`, `stepfun`, `wellsaid-labs`, `xiaomi-mimo`, `z-ai-zhipu-ai`

## Practical Rule

- Full catalog visibility in UI does not imply runtime support.
- Runtime support currently means:
  - provider is one of the 10 app providers for LLM
  - provider is one of the 5 STT providers above for provider STT
  - provider is one of the 4 TTS providers above for provider TTS
- Anything else is catalog-visible only until the transport, settings validation, defaults, and tests are wired.
