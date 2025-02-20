import { DEFAULT_API_BASE_URL } from "./consts";

export const store = {
  getApiKey(): string | null {
    return sessionStorage.getItem("sticklight_api_key");
  },

  setApiKey(apiKey: string): string {
    sessionStorage.setItem("sticklight_api_key", apiKey);
    return apiKey;
  },

  getApiBaseUrl(): string {
    return (
      sessionStorage.getItem("sticklight_api_base_url") ?? DEFAULT_API_BASE_URL
    );
  },

  setApiBaseUrl(apiBaseUrl?: string): string {
    const baseUrl = apiBaseUrl ?? DEFAULT_API_BASE_URL;
    sessionStorage.setItem("sticklight_api_base_url", baseUrl);
    return baseUrl;
  },

  getSessionId(): string | null {
    return sessionStorage.getItem("sticklight_session_id");
  },

  setSessionId(sessionId: string): string {
    sessionStorage.setItem("sticklight_session_id", sessionId);
    return sessionId;
  },

  getCurrentUser(): User | null {
    const currentUser = sessionStorage.getItem("sticklight_current_user");
    return currentUser ? JSON.parse(currentUser) : null;
  },

  setCurrentUser(uniqueId: string, userData: Record<string, unknown>): User {
    const currentUser: User = {
      id: uniqueId,
      ...userData,
    };
    sessionStorage.setItem(
      "sticklight_current_user",
      JSON.stringify(currentUser)
    );
    return currentUser;
  },
};

export interface User {
  id: string;
  [key: string]: unknown;
}
