import React from "react";
import { Image, Text } from "react-native";
import { SvgUri } from "react-native-svg";
import { Provider } from "../types";

const PROVIDER_ICON_ASSETS: Record<string, number> = {
  "01-ai-yi": require("../../assets/providers/01-ai-yi.svg"),
  "ai21-labs": require("../../assets/providers/ai21-labs.svg"),
  "aleph-alpha": require("../../assets/providers/aleph-alpha.svg"),
  "alibaba-qwen-dashscope": require(
    "../../assets/providers/alibaba-qwen-dashscope.svg"
  ),
  "amazon-aws": require("../../assets/providers/amazon-aws.svg"),
  anthropic: require("../../assets/providers/anthropic.svg"),
  assemblyai: require("../../assets/providers/assemblyai.svg"),
  baichuan: require("../../assets/providers/baichuan.svg"),
  "baidu-ernie-qianfan": require(
    "../../assets/providers/baidu-ernie-qianfan.svg"
  ),
  brave: require("../../assets/providers/brave.svg"),
  "bytedance-doubao-seed": require(
    "../../assets/providers/bytedance-doubao-seed.svg"
  ),
  cerebras: require("../../assets/providers/cerebras.svg"),
  cohere: require("../../assets/providers/cohere.svg"),
  deepgram: require("../../assets/providers/deepgram.svg"),
  deepinfra: require("../../assets/providers/deepinfra.svg"),
  deepseek: require("../../assets/providers/deepseek.svg"),
  elevenlabs: require("../../assets/providers/elevenlabs.svg"),
  exa: require("../../assets/providers/exa.svg"),
  firecrawl: require("../../assets/providers/firecrawl.svg"),
  "fireworks-ai": require("../../assets/providers/fireworks-ai.svg"),
  "fish-audio": require("../../assets/providers/fish-audio.svg"),
  gemini: require("../../assets/providers/google-vertex-ai-studio.svg"),
  "google-vertex-ai-studio": require(
    "../../assets/providers/google-vertex-ai-studio.svg"
  ),
  grok: require("../../assets/providers/grok.svg"),
  groq: require("../../assets/providers/groq.svg"),
  "hugging-face-inference-api": require(
    "../../assets/providers/hugging-face-inference-api.svg"
  ),
  hyperbolic: require("../../assets/providers/hyperbolic.svg"),
  "ibm-watsonx": require("../../assets/providers/ibm-watsonx.svg"),
  "lepton-ai": require("../../assets/providers/lepton-ai.svg"),
  "microsoft-azure": require("../../assets/providers/microsoft-azure.svg"),
  minimax: require("../../assets/providers/minimax.svg"),
  mistral: require("../../assets/providers/mistral-ai.svg"),
  "mistral-ai": require("../../assets/providers/mistral-ai.svg"),
  "moonshot-ai-kimi": require("../../assets/providers/moonshot-ai-kimi.svg"),
  "novita-ai": require("../../assets/providers/novita-ai.svg"),
  nvidia: require("../../assets/providers/nvidia-nim.svg"),
  "nvidia-nim": require("../../assets/providers/nvidia-nim.svg"),
  openai: require("../../assets/providers/openai.svg"),
  perplexity: require("../../assets/providers/perplexity.svg"),
  replicate: require("../../assets/providers/replicate.svg"),
  sambanova: require("../../assets/providers/sambanova.svg"),
  serpapi: require("../../assets/providers/serpapi.svg"),
  siliconflow: require("../../assets/providers/siliconflow.svg"),
  stepfun: require("../../assets/providers/stepfun.svg"),
  tavily: require("../../assets/providers/tavily.svg"),
  together: require("../../assets/providers/together-ai.svg"),
  "together-ai": require("../../assets/providers/together-ai.svg"),
  xai: require("../../assets/providers/xai.svg"),
  "xiaomi-mimo": require("../../assets/providers/xiaomi-mimo.svg"),
  "z-ai-zhipu-ai": require("../../assets/providers/z-ai-zhipu-ai.svg"),
};

const PROVIDER_ICON_SIZES: Record<string, { width: number; height: number }> = {
  openai: { width: 24, height: 24 },
  anthropic: { width: 24, height: 24 },
  gemini: { width: 24, height: 24 },
  "google-vertex-ai-studio": { width: 24, height: 24 },
  cohere: { width: 24, height: 24 },
  deepseek: { width: 24, height: 24 },
  grok: { width: 24, height: 24 },
  groq: { width: 24, height: 24 },
  mistral: { width: 24, height: 24 },
  "mistral-ai": { width: 24, height: 24 },
  nvidia: { width: 28, height: 28 },
  "nvidia-nim": { width: 28, height: 28 },
  together: { width: 24, height: 24 },
  "together-ai": { width: 24, height: 24 },
  xai: { width: 24, height: 24 },
};

interface ProviderIconProps {
  provider: Provider | string;
  color: string;
  label?: string;
}

function getFallbackProviderGlyph(value: string) {
  const parts = value
    .split(/[^a-zA-Z0-9]+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  const normalized = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  return normalized.slice(0, 2) || "AI";
}

export function ProviderIcon({ provider, color, label }: ProviderIconProps) {
  const asset = PROVIDER_ICON_ASSETS[provider];

  if (!asset) {
    return (
      <Text
        style={{
          color,
          fontSize: 12,
          fontWeight: "700",
          letterSpacing: 0.8,
        }}
      >
        {getFallbackProviderGlyph(label ?? provider)}
      </Text>
    );
  }

  const uri = Image.resolveAssetSource(asset).uri;
  const size = PROVIDER_ICON_SIZES[provider] ?? {
    width: 24,
    height: 24,
  };

  return (
    <SvgUri
      width={size.width}
      height={size.height}
      uri={uri}
      color={color}
    />
  );
}
