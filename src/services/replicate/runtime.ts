import { networkFetch } from "../networkFetch";

const REPLICATE_API_BASE = "https://api.replicate.com/v1";
const REPLICATE_POLL_DELAYS_MS = [
  500, 750, 1000, 1500, 2500, 4000, 6000, 8000, 10000,
];
const REPLICATE_MAX_POLLS = 30;

type ReplicateInputProperties = Record<string, unknown>;

interface ReplicatePredictionResponse {
  id?: string;
  status?: string;
  output?: unknown;
  error?: string | null;
  urls?: {
    get?: string;
  };
}

interface ReplicateModelMetadata {
  latestVersionId: string;
  inputProperties: ReplicateInputProperties;
}

const replicateMetadataCache = new Map<string, ReplicateModelMetadata>();

function splitReplicateModelId(modelId: string) {
  const parts = modelId.split("/");

  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    throw new Error(`Invalid Replicate model id: ${modelId}`);
  }

  return {
    owner: parts[0],
    name: parts[1],
  };
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getReplicateHeaders(apiKey: string, extraHeaders?: Record<string, string>) {
  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    ...extraHeaders,
  };
}

export function getReplicateInputProperty(
  inputProperties: ReplicateInputProperties,
  candidates: string[],
) {
  return candidates.find((candidate) => candidate in inputProperties) ?? null;
}

export async function getReplicateModelMetadata(params: {
  apiKey: string;
  modelId: string;
  abortSignal?: AbortSignal;
}) {
  const cached = replicateMetadataCache.get(params.modelId);

  if (cached) {
    return cached;
  }

  const { owner, name } = splitReplicateModelId(params.modelId);
  const response = await networkFetch(
    `${REPLICATE_API_BASE}/models/${encodeURIComponent(owner)}/${encodeURIComponent(name)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${params.apiKey}`,
        Accept: "application/json",
      },
      signal: params.abortSignal,
    },
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const data = await response.json();
  const latestVersionId =
    typeof data?.latest_version?.id === "string" ? data.latest_version.id : null;
  const inputProperties =
    (data?.latest_version?.openapi_schema?.components?.schemas?.Input
      ?.properties as ReplicateInputProperties | undefined) ?? {};

  if (!latestVersionId) {
    throw new Error(`Replicate model ${params.modelId} has no latest version.`);
  }

  const metadata = {
    latestVersionId,
    inputProperties,
  };

  replicateMetadataCache.set(params.modelId, metadata);
  return metadata;
}

async function getReplicatePrediction(params: {
  apiKey: string;
  url: string;
  abortSignal?: AbortSignal;
}) {
  const response = await networkFetch(params.url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${params.apiKey}`,
      Accept: "application/json",
    },
    signal: params.abortSignal,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return (await response.json()) as ReplicatePredictionResponse;
}

export async function runReplicatePrediction(params: {
  apiKey: string;
  modelId: string;
  input: Record<string, unknown>;
  abortSignal?: AbortSignal;
}) {
  const metadata = await getReplicateModelMetadata({
    apiKey: params.apiKey,
    modelId: params.modelId,
    abortSignal: params.abortSignal,
  });
  const response = await networkFetch(`${REPLICATE_API_BASE}/predictions`, {
    method: "POST",
    headers: getReplicateHeaders(params.apiKey, {
      Prefer: "wait=60",
    }),
    body: JSON.stringify({
      version: metadata.latestVersionId,
      input: params.input,
    }),
    signal: params.abortSignal,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  let prediction = (await response.json()) as ReplicatePredictionResponse;

  if (prediction.status === "succeeded") {
    return prediction.output;
  }

  const pollUrl = prediction.urls?.get;

  if (!pollUrl) {
    throw new Error("Replicate prediction response did not include a poll URL.");
  }

  for (let pollIndex = 0; pollIndex < REPLICATE_MAX_POLLS; pollIndex += 1) {
    const delay =
      REPLICATE_POLL_DELAYS_MS[
        Math.min(pollIndex, REPLICATE_POLL_DELAYS_MS.length - 1)
      ];
    await wait(delay);
    prediction = await getReplicatePrediction({
      apiKey: params.apiKey,
      url: pollUrl,
      abortSignal: params.abortSignal,
    });

    if (prediction.status === "succeeded") {
      return prediction.output;
    }

    if (
      prediction.status &&
      ["failed", "canceled"].includes(prediction.status)
    ) {
      throw new Error(prediction.error || `Replicate prediction ${prediction.status}.`);
    }
  }

  throw new Error("Replicate prediction timed out.");
}
