#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const ts = require("typescript");

require.extensions[".ts"] = function registerTs(module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
    fileName: filename,
  });

  module._compile(outputText, filename);
};

const rootDir = path.resolve(__dirname, "../..");
const outputPath = path.join(rootDir, "INTEGRATION_STATUS.md");

const { PROVIDER_DOCUMENTS, PROVIDER_CATALOG_UPDATED_AT } = require(path.join(
  rootDir,
  "data/providers",
));
const { RUNTIME_PROVIDER_MANIFEST } = require(path.join(
  rootDir,
  "src/constants/providers/runtimeManifest",
));

const services = ["llm", "stt", "tts"];
const serviceLabels = {
  llm: "LLM",
  stt: "STT",
  tts: "TTS",
};

function getModelsForService(document, service) {
  if (service === "llm") {
    return document.llms;
  }

  if (service === "stt") {
    return document.stt;
  }

  return document.tts;
}

function getProviderDocument(providerId) {
  return PROVIDER_DOCUMENTS.find(
    (document) => document.provider.providerId === providerId,
  );
}

function getModelKey(providerId, service, modelId) {
  return `${providerId}::${service}::${modelId}`;
}

function escapeCell(value) {
  if (!value) {
    return "—";
  }

  return String(value).replace(/\|/g, "\\|");
}

const runtimeManifestByCatalogProviderId = new Map();

for (const [appProviderId, manifest] of Object.entries(RUNTIME_PROVIDER_MANIFEST)) {
  runtimeManifestByCatalogProviderId.set(manifest.catalogProviderId, {
    appProviderId,
    manifest,
  });
}

const integratedModelKeys = new Set();
const runtimeIdsByModelKey = new Map();
const unresolvedRuntimeEntries = [];

for (const [appProviderId, manifest] of Object.entries(RUNTIME_PROVIDER_MANIFEST)) {
  const providerId = manifest.catalogProviderId;
  const document = getProviderDocument(providerId);

  if (!document) {
    unresolvedRuntimeEntries.push({
      appProviderId,
      providerId,
      service: "provider",
      runtimeModelId: null,
    });
    continue;
  }

  for (const service of services) {
    for (const spec of manifest[service].models) {
      const model = getModelsForService(document, service).find(
        (candidate) =>
          candidate.modelId === spec.id ||
          (candidate.aliases ?? []).includes(spec.id),
      );

      if (!model) {
        unresolvedRuntimeEntries.push({
          appProviderId,
          providerId,
          service,
          runtimeModelId: spec.id,
        });
        continue;
      }

      const key = getModelKey(providerId, service, model.modelId);
      integratedModelKeys.add(key);

      const runtimeIds = runtimeIdsByModelKey.get(key) ?? [];

      if (!runtimeIds.includes(spec.id)) {
        runtimeIds.push(spec.id);
      }

      runtimeIdsByModelKey.set(key, runtimeIds);
    }
  }
}

const allModels = PROVIDER_DOCUMENTS.flatMap((document) => [
  ...document.llms,
  ...document.stt,
  ...document.tts,
]);

const integratedCountsByService = {
  llm: 0,
  stt: 0,
  tts: 0,
};
const totalCountsByService = {
  llm: 0,
  stt: 0,
  tts: 0,
};

for (const model of allModels) {
  totalCountsByService[model.service] += 1;

  if (
    integratedModelKeys.has(
      getModelKey(model.providerId, model.service, model.modelId),
    )
  ) {
    integratedCountsByService[model.service] += 1;
  }
}

const lines = [
  "# Integration Status",
  "",
  `Generated from \`data/providers\` and \`src/constants/providers/runtimeManifest.ts\`.`,
  `Catalog updated: ${PROVIDER_CATALOG_UPDATED_AT}`,
  "",
  "## Legend",
  "",
  "- `Integrated`: this exact catalog model is currently wired into the app runtime. Alias-backed runtime IDs resolve to the canonical catalog row.",
  "- `Not integrated`: this model exists in the catalog but is not currently runnable in the app.",
  "",
  "## Summary",
  "",
  `- Catalog providers: ${PROVIDER_DOCUMENTS.length}`,
  `- Providers with any runtime integration: ${runtimeManifestByCatalogProviderId.size}`,
  `- Catalog models: ${allModels.length}`,
  `- Integrated models: ${integratedModelKeys.size}`,
  `- LLM: ${integratedCountsByService.llm}/${totalCountsByService.llm} integrated`,
  `- STT: ${integratedCountsByService.stt}/${totalCountsByService.stt} integrated`,
  `- TTS: ${integratedCountsByService.tts}/${totalCountsByService.tts} integrated`,
  `- Unresolved runtime manifest entries: ${unresolvedRuntimeEntries.length}`,
  "",
];

for (const document of PROVIDER_DOCUMENTS) {
  const { provider } = document;
  const runtimeEntry = runtimeManifestByCatalogProviderId.get(provider.providerId) ?? null;
  const providerModels = [...document.llms, ...document.stt, ...document.tts];
  const integratedCount = providerModels.filter((model) =>
    integratedModelKeys.has(
      getModelKey(model.providerId, model.service, model.modelId),
    ),
  ).length;

  lines.push(`## ${provider.providerName} \`${provider.providerId}\``);
  lines.push("");
  lines.push(
    `- Runtime provider: ${
      runtimeEntry ? `\`${runtimeEntry.appProviderId}\`` : "catalog-only"
    }`,
  );
  lines.push(
    `- Model integration: ${integratedCount}/${providerModels.length} integrated`,
  );
  lines.push(
    `- Verified support: LLM \`${provider.verifiedSupport.llm}\`, STT \`${provider.verifiedSupport.stt}\`, TTS \`${provider.verifiedSupport.tts}\``,
  );
  lines.push("");
  lines.push("| Service | Model ID | Public Name | App Status | Runtime ID |");
  lines.push("| --- | --- | --- | --- | --- |");

  for (const service of services) {
    const models = [...getModelsForService(document, service)].sort((left, right) =>
      left.publicName.localeCompare(right.publicName),
    );

    for (const model of models) {
      const key = getModelKey(model.providerId, model.service, model.modelId);
      const integrated = integratedModelKeys.has(key);
      const runtimeIds = runtimeIdsByModelKey.get(key) ?? [];
      const runtimeIdCell =
        runtimeIds.length === 0
          ? "—"
          : runtimeIds.map((runtimeId) => `\`${runtimeId}\``).join(", ");

      lines.push(
        `| ${serviceLabels[service]} | \`${model.modelId}\` | ${escapeCell(
          model.publicName,
        )} | ${integrated ? "Integrated" : "Not integrated"} | ${runtimeIdCell} |`,
      );
    }
  }

  lines.push("");
}

if (unresolvedRuntimeEntries.length > 0) {
  lines.push("## Unresolved Runtime Entries");
  lines.push("");
  lines.push(
    "These runtime manifest rows did not resolve to a canonical catalog model and should be investigated.",
  );
  lines.push("");
  lines.push("| App Provider | Catalog Provider | Service | Runtime ID |");
  lines.push("| --- | --- | --- | --- |");

  for (const entry of unresolvedRuntimeEntries) {
    lines.push(
      `| \`${entry.appProviderId}\` | \`${entry.providerId}\` | \`${entry.service}\` | ${
        entry.runtimeModelId ? `\`${entry.runtimeModelId}\`` : "—"
      } |`,
    );
  }

  lines.push("");
}

fs.writeFileSync(outputPath, `${lines.join("\n")}\n`, "utf8");
