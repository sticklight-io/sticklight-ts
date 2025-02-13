namespace store {
	const DEFAULT_API_BASE_URL = "https://api.platform.sticklight.io";

	export function getApiKey(): string | null {
		return sessionStorage.getItem("sticklight_api_key");
	}

	export function setApiKey(apiKey: string): string {
		sessionStorage.setItem("sticklight_api_key", apiKey);
		return apiKey;
	}

	export function getApiBaseUrl(): string {
		return sessionStorage.getItem("sticklight_api_base_url") || DEFAULT_API_BASE_URL;
	}

	export function setApiBaseUrl(apiBaseUrl: string): string {
		sessionStorage.setItem("sticklight_api_base_url", apiBaseUrl);
		return apiBaseUrl;
	}
}

export default store;