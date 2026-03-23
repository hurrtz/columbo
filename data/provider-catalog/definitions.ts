import type {
  CatalogLlm,
  CatalogModelDocument,
  CatalogProvider,
  CatalogProviderDocument,
  CatalogStt,
  CatalogTts,
} from "../../src/catalog/types";

export function defineProvider<T extends CatalogProvider>(provider: T) {
  return provider;
}

export function defineLlms<T extends CatalogLlm[]>(models: T) {
  return models;
}

export function defineSttModels<T extends CatalogStt[]>(models: T) {
  return models;
}

export function defineTtsModels<T extends CatalogTts[]>(models: T) {
  return models;
}

function assertProviderDocument(document: CatalogProviderDocument) {
  const { provider } = document;
  const modelsByService: Record<CatalogModelDocument["service"], CatalogModelDocument[]> = {
    llm: document.llms,
    stt: document.stt,
    tts: document.tts,
  };

  for (const [service, models] of Object.entries(modelsByService) as Array<
    [CatalogModelDocument["service"], CatalogModelDocument[]]
  >) {
    const ids = new Set<string>();
    const aliases = new Map<string, string>();

    for (const model of models) {
      if (model.providerId !== provider.providerId) {
        throw new Error(
          `Catalog provider mismatch for ${provider.providerId}/${service}/${model.modelId}: providerId ${model.providerId}`,
        );
      }

      if (model.providerName !== provider.providerName) {
        throw new Error(
          `Catalog provider mismatch for ${provider.providerId}/${service}/${model.modelId}: providerName ${model.providerName}`,
        );
      }

      if (model.service !== service) {
        throw new Error(
          `Catalog service mismatch for ${provider.providerId}/${service}/${model.modelId}: service ${model.service}`,
        );
      }

      if (ids.has(model.modelId)) {
        throw new Error(
          `Duplicate catalog model ID ${provider.providerId}/${service}/${model.modelId}`,
        );
      }

      ids.add(model.modelId);

      for (const alias of model.aliases ?? []) {
        if (alias === model.modelId) {
          throw new Error(
            `Catalog alias duplicates canonical model ID ${provider.providerId}/${service}/${model.modelId}`,
          );
        }

        if (ids.has(alias)) {
          throw new Error(
            `Catalog alias collides with canonical model ID ${provider.providerId}/${service}/${alias}`,
          );
        }

        const existingOwner = aliases.get(alias);

        if (existingOwner && existingOwner !== model.modelId) {
          throw new Error(
            `Catalog alias collision ${provider.providerId}/${service}/${alias} shared by ${existingOwner} and ${model.modelId}`,
          );
        }

        aliases.set(alias, model.modelId);
      }
    }
  }
}

export function defineProviderDocument<T extends CatalogProviderDocument>(
  document: T,
) {
  assertProviderDocument(document);
  return document;
}

export function defineProviderDocuments<T extends CatalogProviderDocument[]>(
  documents: T,
) {
  const providerIds = new Set<string>();

  for (const document of documents) {
    assertProviderDocument(document);

    if (providerIds.has(document.provider.providerId)) {
      throw new Error(
        `Duplicate catalog provider ID ${document.provider.providerId}`,
      );
    }

    providerIds.add(document.provider.providerId);
  }

  return documents;
}
