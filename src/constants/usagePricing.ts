import {
  getCatalogModelForAppProvider,
  getCatalogModelsForAppProvider,
  type CatalogModelDocument,
  PROVIDER_CATALOG,
} from "../catalog";
import { Provider } from "../types";

export interface PricingAssumption {
  provider: Provider;
  modelPattern: RegExp;
  modelLabel: string;
  inputUsdPerMillion: number;
  outputUsdPerMillion: number;
  sourceLabel: string;
  sourceUrl: string;
  checkedAt: string;
}

export const PRICING_ASSUMPTIONS_LAST_UPDATED = "2026-03-17";

const APP_PROVIDERS: Provider[] = [
  "openai",
  "anthropic",
  "gemini",
  "cohere",
  "deepseek",
  "groq",
  "mistral",
  "nvidia",
  "together",
  "xai",
];

const CATALOG_PRICING_ALIAS_MODELS: Array<{
  provider: Provider;
  aliasModelId: string;
  catalogModelId: string;
  modelLabel: string;
}> = [
  {
    provider: "mistral",
    aliasModelId: "mistral-large-latest",
    catalogModelId: "mistral-large-2512",
    modelLabel: "Mistral Large 3",
  },
  {
    provider: "mistral",
    aliasModelId: "mistral-medium-latest",
    catalogModelId: "mistral-medium-2508",
    modelLabel: "Mistral Medium 3",
  },
  {
    provider: "mistral",
    aliasModelId: "mistral-small-latest",
    catalogModelId: "mistral-small-3.2",
    modelLabel: "Mistral Small 3.2",
  },
  {
    provider: "mistral",
    aliasModelId: "magistral-medium-latest",
    catalogModelId: "magistral-medium-1.2",
    modelLabel: "Magistral Medium",
  },
  {
    provider: "mistral",
    aliasModelId: "magistral-small-latest",
    catalogModelId: "magistral-small-1.2",
    modelLabel: "Magistral Small",
  },
  {
    provider: "mistral",
    aliasModelId: "ministral-8b-latest",
    catalogModelId: "ministral-3-8b",
    modelLabel: "Ministral 8B",
  },
  {
    provider: "mistral",
    aliasModelId: "codestral-latest",
    catalogModelId: "codestral",
    modelLabel: "Codestral 2",
  },
];

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function createCatalogPricingAssumption(params: {
  provider: Provider;
  model: CatalogModelDocument;
  modelId: string;
  modelLabel: string;
}): PricingAssumption | null {
  const inputPrice = params.model.derived.priceMeasurements.find(
    (measurement) => measurement.unit === "million_input_tokens",
  );
  const outputPrice = params.model.derived.priceMeasurements.find(
    (measurement) => measurement.unit === "million_output_tokens",
  );

  if (!inputPrice || !outputPrice) {
    return null;
  }

  return {
    provider: params.provider,
    modelPattern: new RegExp(`^${escapeRegExp(params.modelId)}$`),
    modelLabel: params.modelLabel,
    inputUsdPerMillion: inputPrice.amountUsd,
    outputUsdPerMillion: outputPrice.amountUsd,
    sourceLabel: `${params.model.providerName} catalog pricing`,
    sourceUrl: params.model.officialSources[0] ?? "",
    checkedAt: PROVIDER_CATALOG.generatedAt.slice(0, 10),
  };
}

function createCatalogPricingAssumptions() {
  const exactAssumptions = APP_PROVIDERS.flatMap((provider) =>
    getCatalogModelsForAppProvider(provider, "llm")
      .map((model) =>
        createCatalogPricingAssumption({
          provider,
          model,
          modelId: model.modelId,
          modelLabel: model.publicName,
        }),
      )
      .filter((assumption): assumption is PricingAssumption => assumption !== null),
  );

  const aliasAssumptions = CATALOG_PRICING_ALIAS_MODELS.map((aliasEntry) => {
    const catalogModel = getCatalogModelForAppProvider(
      aliasEntry.provider,
      aliasEntry.catalogModelId,
      "llm",
    );

    if (!catalogModel) {
      return null;
    }

    return createCatalogPricingAssumption({
      provider: aliasEntry.provider,
      model: catalogModel,
      modelId: aliasEntry.aliasModelId,
      modelLabel: aliasEntry.modelLabel,
    });
  }).filter((assumption): assumption is PricingAssumption => assumption !== null);

  return [...exactAssumptions, ...aliasAssumptions];
}

export const PRICING_ASSUMPTIONS: PricingAssumption[] = [
  {
    provider: "openai",
    modelPattern: /^gpt-5\.4$/,
    modelLabel: "GPT-5.4",
    inputUsdPerMillion: 2.5,
    outputUsdPerMillion: 15,
    sourceLabel: "OpenAI API pricing",
    sourceUrl: "https://developers.openai.com/api/docs/pricing",
    checkedAt: "2026-03-17",
  },
  {
    provider: "anthropic",
    modelPattern: /^claude-sonnet-4/,
    modelLabel: "Claude Sonnet 4",
    inputUsdPerMillion: 3,
    outputUsdPerMillion: 15,
    sourceLabel: "Anthropic pricing",
    sourceUrl: "https://docs.anthropic.com/en/docs/about-claude/pricing",
    checkedAt: "2026-03-17",
  },
  {
    provider: "gemini",
    modelPattern: /^gemini-2\.5-flash$/,
    modelLabel: "Gemini 2.5 Flash",
    inputUsdPerMillion: 0.3,
    outputUsdPerMillion: 2.5,
    sourceLabel: "Gemini API pricing",
    sourceUrl: "https://ai.google.dev/gemini-api/docs/pricing",
    checkedAt: "2026-03-17",
  },
  {
    provider: "cohere",
    modelPattern: /^command-a-03-2025$/,
    modelLabel: "Command A",
    inputUsdPerMillion: 1,
    outputUsdPerMillion: 2,
    sourceLabel: "Cohere pricing",
    sourceUrl: "https://cohere.com/pricing",
    checkedAt: "2026-03-17",
  },
  {
    provider: "deepseek",
    modelPattern: /^deepseek-chat$/,
    modelLabel: "DeepSeek Chat",
    inputUsdPerMillion: 0.28,
    outputUsdPerMillion: 0.42,
    sourceLabel: "DeepSeek models and pricing",
    sourceUrl: "https://api-docs.deepseek.com/quick_start/pricing/",
    checkedAt: "2026-03-17",
  },
  {
    provider: "groq",
    modelPattern: /^llama-3\.3-70b-versatile$/,
    modelLabel: "Llama 3.3 70B Versatile",
    inputUsdPerMillion: 0.59,
    outputUsdPerMillion: 0.79,
    sourceLabel: "Groq supported models",
    sourceUrl: "https://console.groq.com/docs/models",
    checkedAt: "2026-03-17",
  },
];

export const CATALOG_PRICING_ASSUMPTIONS: PricingAssumption[] =
  createCatalogPricingAssumptions();

export const RUNTIME_PRICING_ASSUMPTIONS: PricingAssumption[] = [
  ...CATALOG_PRICING_ASSUMPTIONS,
  ...PRICING_ASSUMPTIONS,
];

export function findPricingAssumption(provider: Provider, model: string) {
  return (
    RUNTIME_PRICING_ASSUMPTIONS.find(
      (entry) => entry.provider === provider && entry.modelPattern.test(model),
    ) ?? null
  );
}
