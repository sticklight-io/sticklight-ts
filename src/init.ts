import store from "./sessionStore";
import type { DEFAULT_API_BASE_URL } from "./sessionStore";

/**
 * Initialize the Sticklight SDK.
 * Call this function once at the start of your application.
 *
 * @param {string} apiKey - Generated in the Sticklight Platform.
 * @param {string?} apiBaseUrl - An optional Sticklight API base URL.
 *   Defaults to {@link DEFAULT_API_BASE_URL}.
 */
export function init(apiKey: string, apiBaseUrl?: string) {
  store.setApiKey(apiKey);
  store.setApiBaseUrl(apiBaseUrl);
}
