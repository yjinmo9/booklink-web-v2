import { getAuthHeader, removeToken } from "./auth";

const DEFAULT_API_BASE_URL = "http://localhost:8081";

const rawBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;
const normalizedBaseUrl = rawBaseUrl.endsWith("/")
  ? rawBaseUrl.slice(0, -1)
  : rawBaseUrl;

function buildUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBaseUrl}${normalizedPath}`;
}

async function parseJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!text) {
    return {} as T;
  }
  return JSON.parse(text) as T;
}

async function handleResponse<T>(response: Response): Promise<T> {
  // 401 Unauthorized인 경우 토큰 삭제
  if (response.status === 401) {
    removeToken();
  }

  if (!response.ok) {
    let errorMessage = response.statusText;
    try {
      const errorBody = await parseJson<{ error?: string; message?: string }>(response);
      errorMessage = errorBody.error ?? errorBody.message ?? errorMessage;
    } catch {
      // ignore JSON parse error
    }
    throw new Error(errorMessage);
  }
  return parseJson<T>(response);
}

function getHeaders(init?: RequestInit): Headers {
  const headers = new Headers(init?.headers);
  
  // Content-Type 설정
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  
  // Authorization 헤더 추가
  const authHeader = getAuthHeader();
  if (authHeader) {
    headers.set("Authorization", authHeader);
  }
  
  return headers;
}

export async function getJson<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(buildUrl(path), {
    method: "GET",
    ...init,
    headers: getHeaders(init),
  });

  return handleResponse<T>(response);
}

export async function postJson<T>(
  path: string,
  body: Record<string, unknown> | undefined,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(buildUrl(path), {
    method: "POST",
    ...init,
    headers: getHeaders(init),
    body: body ? JSON.stringify(body) : undefined,
  });

  return handleResponse<T>(response);
}

export async function putJson<T>(
  path: string,
  body: Record<string, unknown> | undefined,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(buildUrl(path), {
    method: "PUT",
    ...init,
    headers: getHeaders(init),
    body: body ? JSON.stringify(body) : undefined,
  });

  return handleResponse<T>(response);
}

export async function deleteJson<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(buildUrl(path), {
    method: "DELETE",
    ...init,
    headers: getHeaders(init),
  });

  return handleResponse<T>(response);
}

