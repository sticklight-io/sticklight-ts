import { SticklightApiKeyNotFoundError } from "./errors";

export function resolveSticklightApiKey(sticklightApiKey?: string): string {
  if (sticklightApiKey) {
    return sticklightApiKey;
  }

  const sessionApiKey = sessionStorage.getItem("sticklight_api_key");
  if (!sessionApiKey) {
    throw new SticklightApiKeyNotFoundError(
      "Sticklight API key not found. Either call sticklight.init() with the API key at the start of your application or pass it to the capture function."
    );
  }

  return sessionApiKey;
} 