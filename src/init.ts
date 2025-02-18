import { postEvent } from "./post-event.internal";
import store from "./sessionStore";
import type { DEFAULT_API_BASE_URL } from "./sessionStore";

async function getUniqueSessionId(): Promise<string> {
  try {
    const snapshot = await navigator.locks.query();
    return snapshot.clientId;
  } catch (error) {
    console.warn("Web Locks API failed, falling back to random UUID.", error);
  }

  // Fallback to crypto.randomUUID()
  return crypto.randomUUID();
}

/**
 * Initialize the Sticklight SDK.
 * Call this function once at the start of your application.
 * Gets a unique session ID if it exists, otherwise generates a new one.
 *
 * @param {string} apiKey - Generated in the Sticklight Platform.
 * @param {string?} apiBaseUrl - An optional Sticklight API base URL.
 *   Defaults to {@link DEFAULT_API_BASE_URL}.
 * @returns {Promise<void>}
 */
export async function init(apiKey: string, apiBaseUrl?: string): Promise<void> {
  store.setApiKey(apiKey);
  const baseUrl = store.setApiBaseUrl(apiBaseUrl);

  let sessionId = store.getSessionId();
  // Only set session ID if not already set
  if (!sessionId) {
    sessionId = await getUniqueSessionId();
    store.setSessionId(sessionId);
  }

  // TODO: Include api key?

  postEvent("sticklight_init", {
    sessionId,
    apiBaseUrl: baseUrl,
  });
}
