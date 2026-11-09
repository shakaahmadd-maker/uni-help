// Uni Help API Client - Configurable for Self-Hosted Node.js + PostgreSQL Backend
export function getApiBase(): string {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, "");
  }
  if (typeof window !== "undefined") {
    const host = (window.location.hostname || "").toLowerCase();
    if (host === "unihelpconsultants.com" || host === "www.unihelpconsultants.com") {
      return "https://api.unihelpconsultants.com";
    }
  }
  return "";
}

const API_BASE = getApiBase();

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any[];
  };
}

export class ApiError extends Error {
  code: string;
  details?: any[];
  constructor(message: string, code = "API_ERROR", details?: any[]) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.details = details;
  }
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("unihelp_auth_token");
}

export function setAuthToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem("unihelp_auth_token", token);
  } else {
    localStorage.removeItem("unihelp_auth_token");
  }
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data: ApiResponse<T> = await response.json();

    if (!response.ok || !data.success) {
      const errMessage = data.error?.message || `Request failed with status ${response.status}`;
      const errCode = data.error?.code || `HTTP_${response.status}`;
      throw new ApiError(errMessage, errCode, data.error?.details);
    }

    return data.data as T;
  } catch (err: any) {
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError(err.message || "Network request failed", "NETWORK_ERROR");
  }
}
