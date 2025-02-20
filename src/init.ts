import { store } from "./session-store";

async function getUniqueSessionId(): Promise<string> {
  try {
    const snapshot = await navigator.locks.query();
    // @ts-ignore: it's ok if clientId doesn't exist because we're in a try block.
    return snapshot.clientId;
  } catch {
    return crypto.randomUUID();
  }
}

/**
 * Initialize the Sticklight SDK with an API key, and an optional custom API base URL.
 * Generates and stores a unique session ID if one doesn't already exist.
 *
 * Call this function once at the start of your application.
 * @param {string} apiKey - Generated in the Sticklight Platform.
 * @param {string?} apiBaseUrl - An optional Sticklight API base URL.
 *   Defaults to {@link [DEFAULT_API_BASE_URL](./consts.ts)}
 * @returns {Promise<void>}
 */
export async function init(apiKey: string, apiBaseUrl?: string): Promise<void> {
  store.setApiKey(apiKey);
  store.setApiBaseUrl(apiBaseUrl);

  let sessionId = store.getSessionId();
  if (!sessionId) {
    sessionId = await getUniqueSessionId();
    store.setSessionId(sessionId);
  }
}
