import { networkFetch } from "../../networkFetch";
import {
  buildProviderHttpError,
  normalizeProviderTransportError,
} from "../../providerErrors";
import { parseAmazonAwsCredentials } from "../../providerCredentials";
import { AppLanguage, Provider } from "../../../types";

import { ChatMessage } from "../shared";

const AWS_ALGORITHM = "AWS4-HMAC-SHA256";
const AWS_SERVICE = "bedrock";

function getSubtleCrypto() {
  const subtle = globalThis.crypto?.subtle;

  if (!subtle) {
    throw new Error("Web Crypto SubtleCrypto is not available.");
  }

  return subtle;
}

function toHex(value: ArrayBuffer) {
  return Array.from(new Uint8Array(value))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function toIsoTimestamp(date: Date) {
  return date.toISOString().replace(/[:-]|\.\d{3}/g, "");
}

function toDateStamp(timestamp: string) {
  return timestamp.slice(0, 8);
}

function encodeUtf8(value: string) {
  return new TextEncoder().encode(value);
}

async function sha256Hex(value: string) {
  const digest = await getSubtleCrypto().digest("SHA-256", encodeUtf8(value));
  return toHex(digest);
}

async function importHmacKey(key: Uint8Array) {
  const keyBytes = new Uint8Array(key);

  return getSubtleCrypto().importKey(
    "raw",
    keyBytes.buffer,
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign"],
  );
}

async function hmacRaw(key: Uint8Array, value: string) {
  const cryptoKey = await importHmacKey(key);
  const signature = await getSubtleCrypto().sign("HMAC", cryptoKey, encodeUtf8(value));
  return new Uint8Array(signature);
}

async function hmacHex(key: Uint8Array, value: string) {
  return toHex((await hmacRaw(key, value)).buffer);
}

async function getAwsSigningKey(secretAccessKey: string, dateStamp: string, region: string) {
  const kDate = await hmacRaw(encodeUtf8(`AWS4${secretAccessKey}`), dateStamp);
  const kRegion = await hmacRaw(kDate, region);
  const kService = await hmacRaw(kRegion, AWS_SERVICE);
  return hmacRaw(kService, "aws4_request");
}

function toAmazonMessages(messages: ChatMessage[]) {
  return messages.map((message) => ({
    role: message.role === "assistant" ? "assistant" : "user",
    content: [
      {
        text: message.content,
      },
    ],
  }));
}

function extractAmazonBedrockText(data: any): string {
  const output = data?.output?.message?.content;

  if (!Array.isArray(output)) {
    return "";
  }

  return output
    .map((part) =>
      typeof part?.text === "string"
        ? part.text
        : typeof part === "string"
          ? part
          : "",
    )
    .join("")
    .trim();
}

async function buildSignedBedrockRequest(params: {
  model: string;
  systemPrompt: string;
  messages: ChatMessage[];
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
}) {
  const host = `bedrock-runtime.${params.region}.amazonaws.com`;
  const canonicalUri = `/model/${encodeURIComponent(params.model)}/converse`;
  const requestUrl = `https://${host}${canonicalUri}`;
  const timestamp = toIsoTimestamp(new Date());
  const dateStamp = toDateStamp(timestamp);
  const body = JSON.stringify({
    system: [
      {
        text: params.systemPrompt,
      },
    ],
    messages: toAmazonMessages(params.messages),
    inferenceConfig: {
      maxTokens: 1024,
    },
  });
  const payloadHash = await sha256Hex(body);

  const canonicalHeaders = [
    ["content-type", "application/json"],
    ["host", host],
    ["x-amz-content-sha256", payloadHash],
    ["x-amz-date", timestamp],
    ...(params.sessionToken
      ? [["x-amz-security-token", params.sessionToken] as const]
      : []),
  ]
    .map(([key, value]) => `${key}:${value}\n`)
    .join("");
  const signedHeaders = [
    "content-type",
    "host",
    "x-amz-content-sha256",
    "x-amz-date",
    ...(params.sessionToken ? ["x-amz-security-token"] : []),
  ].join(";");
  const canonicalRequest = [
    "POST",
    canonicalUri,
    "",
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");
  const scope = `${dateStamp}/${params.region}/${AWS_SERVICE}/aws4_request`;
  const stringToSign = [
    AWS_ALGORITHM,
    timestamp,
    scope,
    await sha256Hex(canonicalRequest),
  ].join("\n");
  const signingKey = await getAwsSigningKey(
    params.secretAccessKey,
    dateStamp,
    params.region,
  );
  const signature = await hmacHex(signingKey, stringToSign);

  return {
    url: requestUrl,
    body,
    headers: {
      "Content-Type": "application/json",
      "X-Amz-Date": timestamp,
      "X-Amz-Content-Sha256": payloadHash,
      Authorization: `${AWS_ALGORITHM} Credential=${params.accessKeyId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
      ...(params.sessionToken
        ? {
            "X-Amz-Security-Token": params.sessionToken,
          }
        : {}),
    },
  };
}

export async function requestAmazonBedrockChat(params: {
  provider: Provider;
  model: string;
  messages: ChatMessage[];
  apiKey: string;
  language: AppLanguage;
  systemPrompt: string;
  abortSignal?: AbortSignal;
}) {
  const credentials = parseAmazonAwsCredentials(
    params.provider,
    params.apiKey,
    params.language,
  );

  let request;

  try {
    request = await buildSignedBedrockRequest({
      model: params.model,
      systemPrompt: params.systemPrompt,
      messages: params.messages,
      region: credentials.region,
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      sessionToken: credentials.sessionToken,
    });
  } catch (error) {
    throw normalizeProviderTransportError({
      provider: params.provider,
      language: params.language,
      error,
      action: "reply",
    });
  }

  let response: Awaited<ReturnType<typeof networkFetch>>;

  try {
    response = await networkFetch(request.url, {
      method: "POST",
      headers: request.headers,
      body: request.body,
      signal: params.abortSignal,
    });
  } catch (error) {
    throw normalizeProviderTransportError({
      provider: params.provider,
      language: params.language,
      error,
      action: "reply",
    });
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw buildProviderHttpError({
      provider: params.provider,
      language: params.language,
      status: response.status,
      errorText,
      action: "reply",
    });
  }

  const data = await response.json();
  return extractAmazonBedrockText(data);
}
