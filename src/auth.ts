import { SticklightApiKeyNotFoundError } from "./errors";
import store from "./session-store";

/**
 * Resolve the Sticklight API key with the following order of precedence:
 * 1. Value passed to the function
 * 2. Value stored in session storage
 * 3. If no API key could be resolved, throw an error
 *
 * @param {string} [apiKey] - Optional API key to use
 * @returns {string} The resolved Sticklight API key
 * @throws {SticklightApiKeyNotFoundError} If no API key could be resolved
 */
export function resolveSticklightApiKey(apiKey?: string): string {
  if (apiKey) {
    return apiKey;
  }

  const sessionApiKey = store.getApiKey();
  if (!sessionApiKey) {
    throw new SticklightApiKeyNotFoundError(
      "Sticklight API key not found. Either call sticklight.init() with the API key at the start of your application or pass it to the sticklight.capture() function."
    );
  }

  return sessionApiKey;
}
