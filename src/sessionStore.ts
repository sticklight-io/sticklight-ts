export const DEFAULT_API_BASE_URL = "https://api.platform.sticklight.io";

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
};

export default store;
