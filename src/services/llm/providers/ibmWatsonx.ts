import { networkFetch } from "../../networkFetch";
import {
  buildProviderHttpError,
  normalizeProviderTransportError,
} from "../../providerErrors";
import {
  IbmWatsonxCredentials,
  parseIbmWatsonxCredentials,
} from "../../providerCredentials";
import { AppLanguage, Provider } from "../../../types";

import { ChatMessage } from "../shared";

const IBM_WATSONX_API_VERSION = "2024-05-31";
const IBM_IAM_TOKEN_URL = "https://iam.cloud.ibm.com/identity/token";
const IBM_IAM_TOKEN_GRANT_TYPE =
  "urn:ibm:params:oauth:grant-type:apikey";

const ibmIamTokenCache = new Map<
  string,
  {
    accessToken: string;
    expiresAt: number;
  }
>();

function toIbmChatMessages(systemPrompt: string, messages: ChatMessage[]) {
  return [
    {
      role: "system" as const,
      content: systemPrompt,
    },
    ...messages.map((message) =>
      message.role === "user"
        ? {
            role: "user" as const,
            content: [
              {
                type: "text" as const,
                text: message.content,
              },
            ],
          }
        : {
            role: "assistant" as const,
            content: message.content,
          },
    ),
  ];
}

function extractIbmWatsonxText(data: any): string {
  const directText =
    typeof data?.choices?.[0]?.message?.content === "string"
      ? data.choices[0].message.content
      : typeof data?.results?.[0]?.generated_text === "string"
        ? data.results[0].generated_text
        : typeof data?.result?.generated_text === "string"
          ? data.result.generated_text
          : "";

  return directText.trim();
}

async function getIbmIamAccessToken(
  credentials: IbmWatsonxCredentials,
  provider: Provider,
  language: AppLanguage,
  abortSignal?: AbortSignal,
) {
  const cached = ibmIamTokenCache.get(credentials.watsonxApiKey);
  const now = Date.now();

  if (cached && cached.expiresAt - 60_000 > now) {
    return cached.accessToken;
  }

  let response: Awaited<ReturnType<typeof networkFetch>>;

  try {
    response = await networkFetch(IBM_IAM_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        grant_type: IBM_IAM_TOKEN_GRANT_TYPE,
        apikey: credentials.watsonxApiKey,
      }).toString(),
      signal: abortSignal,
    });
  } catch (error) {
    throw normalizeProviderTransportError({
      provider,
      language,
      error,
      action: "reply",
    });
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw buildProviderHttpError({
      provider,
      language,
      status: response.status,
      errorText,
      action: "reply",
    });
  }

  const data = await response.json();
  const accessToken =
    typeof data?.access_token === "string" ? data.access_token : null;
  const expiresIn =
    typeof data?.expires_in === "number" ? data.expires_in : 3600;

  if (!accessToken) {
    throw new Error("IBM watsonx token response did not include access_token.");
  }

  ibmIamTokenCache.set(credentials.watsonxApiKey, {
    accessToken,
    expiresAt: now + expiresIn * 1000,
  });

  return accessToken;
}

export async function requestIbmWatsonxChat(params: {
  provider: Provider;
  model: string;
  messages: ChatMessage[];
  apiKey: string;
  language: AppLanguage;
  systemPrompt: string;
  abortSignal?: AbortSignal;
}) {
  const credentials = parseIbmWatsonxCredentials(
    params.provider,
    params.apiKey,
    params.language,
  );
  const accessToken = await getIbmIamAccessToken(
    credentials,
    params.provider,
    params.language,
    params.abortSignal,
  );

  let response: Awaited<ReturnType<typeof networkFetch>>;

  try {
    response = await networkFetch(
      `${credentials.watsonxUrl}/ml/v1/text/chat?version=${IBM_WATSONX_API_VERSION}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          messages: toIbmChatMessages(params.systemPrompt, params.messages),
          model_id: params.model,
          project_id: credentials.projectId,
          parameters: {
            max_new_tokens: 1024,
            time_limit: 10000,
          },
        }),
        signal: params.abortSignal,
      },
    );
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
  return extractIbmWatsonxText(data);
}
