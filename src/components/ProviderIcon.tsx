import React from "react";
import { Image, Text } from "react-native";
import { SvgUri } from "react-native-svg";
import { Provider } from "../types";

const PROVIDER_ICON_ASSETS: Record<string, number> = {
  "alibaba-qwen-dashscope": require(
    "../../assets/providers/alibaba-qwen-dashscope.svg"
  ),
  anthropic: require("../../assets/providers/anthropic.svg"),
  brave: require("../../assets/providers/brave.svg"),
  "bytedance-doubao-seed": require(
    "../../assets/providers/bytedance-doubao-seed.svg"
  ),
  deepseek: require("../../assets/providers/deepseek.svg"),
  exa: require("../../assets/providers/exa.svg"),
  firecrawl: require("../../assets/providers/firecrawl.svg"),
  gemini: require("../../assets/providers/google-vertex-ai-studio.svg"),
  "google-vertex-ai-studio": require(
    "../../assets/providers/google-vertex-ai-studio.svg"
  ),
  grok: require("../../assets/providers/grok.svg"),
  mistral: require("../../assets/providers/mistral-ai.svg"),
  "mistral-ai": require("../../assets/providers/mistral-ai.svg"),
  "moonshot-ai-kimi": require("../../assets/providers/moonshot-ai-kimi.svg"),
  openai: require("../../assets/providers/openai.svg"),
  perplexity: require("../../assets/providers/perplexity.svg"),
  serpapi: require("../../assets/providers/serpapi.svg"),
  tavily: require("../../assets/providers/tavily.svg"),
  xai: require("../../assets/providers/xai.svg"),
};

const PROVIDER_ICON_SIZES: Record<string, { width: number; height: number }> = {
  openai: { width: 24, height: 24 },
  anthropic: { width: 24, height: 24 },
  gemini: { width: 24, height: 24 },
  "google-vertex-ai-studio": { width: 24, height: 24 },
  deepseek: { width: 24, height: 24 },
  grok: { width: 24, height: 24 },
  mistral: { width: 24, height: 24 },
  "mistral-ai": { width: 24, height: 24 },
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
