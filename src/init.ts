import store, { type DEFAULT_API_BASE_URL } from "./session-store";

async function getUniqueSessionId(): Promise<string> {
  try {
    const snapshot = await navigator.locks.query();
    // @ts-ignore: it's ok if clientId doesn't exist because we're in a try block.
    return snapshot.clientId;
  } catch (error) {
    console.warn("Web Locks API failed, falling back to random UUID.", error);
  }

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
 * @returns {Promise<string>} The session ID.
 */
export async function init(
  apiKey: string,
  apiBaseUrl?: string
): Promise<string> {
  store.setApiKey(apiKey);
  store.setApiBaseUrl(apiBaseUrl);

  let sessionId = store.getSessionId();

  if (!sessionId) {
    sessionId = await getUniqueSessionId();
    store.setSessionId(sessionId);
  }

  return sessionId;
}
