const DEFAULT_API_BASE_URL = "https://api.platform.sticklight.io";

const store = {
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

  setApiBaseUrl(apiBaseUrl: string): string {
    sessionStorage.setItem("sticklight_api_base_url", apiBaseUrl);
    return apiBaseUrl;
  },
};

export default store;
