import store from "./sessionStore";

/**
 * Initialize the Sticklight SDK.
 * Call this function once at the start of your application.
 *
 * @param {string} sticklightApiKey - The Sticklight API key. Generated in the Sticklight Platform.
 * @param {string?} sticklightApiBaseUrl - An optional Sticklight API base URL.
 */
export function init(sticklightApiKey: string, sticklightApiBaseUrl?: string) {
  store.setApiKey(sticklightApiKey);
  sticklightApiBaseUrl && store.setApiBaseUrl(sticklightApiBaseUrl);
}
