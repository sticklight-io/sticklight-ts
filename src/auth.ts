import { STICKLIGHT_API_KEY_ENV_VAR_NAME } from "./consts";
import { SticklightApiKeyNotFoundError } from "./errors";

export function resolveSticklightApiKey(sticklightApiKey?: string): string {
  if (sticklightApiKey) {
    return sticklightApiKey;
  }

  const envApiKey = process.env[STICKLIGHT_API_KEY_ENV_VAR_NAME];
  if (!envApiKey) {
    throw new SticklightApiKeyNotFoundError(
      `Sticklight API key not found. Either set the ${STICKLIGHT_API_KEY_ENV_VAR_NAME} environment variable or pass it to the capture function.`
    );
  }

  return envApiKey;
} 