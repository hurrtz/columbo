import React from "react";
import { Image, Text } from "react-native";
import { SvgUri } from "react-native-svg";
import { Provider } from "../types";

const PROVIDER_ICON_ASSETS: Partial<Record<Provider, number>> = {
  openai: require("../../assets/branding/openai.svg"),
  anthropic: require("../../assets/branding/anthropic.svg"),
  gemini: require("../../assets/branding/google.svg"),
  cohere: require("../../assets/branding/cohere.svg"),
  deepseek: require("../../assets/branding/deepseek.svg"),
  groq: require("../../assets/branding/groq.svg"),
  mistral: require("../../assets/branding/mistral.svg"),
  nvidia: require("../../assets/branding/nvidia.svg"),
  together: require("../../assets/branding/together.svg"),
  xai: require("../../assets/branding/xai.svg"),
};

const PROVIDER_ICON_SIZES: Partial<
  Record<Provider, { width: number; height: number }>
> = {
  openai: { width: 24, height: 24 },
  anthropic: { width: 24, height: 24 },
  gemini: { width: 24, height: 24 },
  cohere: { width: 24, height: 24 },
  deepseek: { width: 24, height: 24 },
  groq: { width: 24, height: 24 },
  mistral: { width: 24, height: 24 },
  nvidia: { width: 28, height: 28 },
  together: { width: 24, height: 24 },
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
  const asset = PROVIDER_ICON_ASSETS[provider as Provider];

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
  const size = PROVIDER_ICON_SIZES[provider as Provider] ?? {
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
