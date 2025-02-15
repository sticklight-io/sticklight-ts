import store from "./sessionStore";
import type { DEFAULT_API_BASE_URL } from "./sessionStore";

/**
 * Initialize the Sticklight SDK.
 * Call this function once at the start of your application.
 *
 * @param {string} sticklightApiKey - Generated in the Sticklight Platform.
 * @param {string?} sticklightApiBaseUrl - An optional Sticklight API base URL.
 *   Defaults to {@link DEFAULT_API_BASE_URL}.
 */
export function init(sticklightApiKey: string, sticklightApiBaseUrl?: string) {
  store.setApiKey(sticklightApiKey);
  sticklightApiBaseUrl && store.setApiBaseUrl(sticklightApiBaseUrl);
}
