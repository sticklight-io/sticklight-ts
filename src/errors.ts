/**
 * Exception raised when the Sticklight API key is not found.
 * This can happen when:
 * 1. No API key is passed to the capture function
 * 2. No API key is found in session storage
 */
export class SticklightApiKeyNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SticklightApiKeyNotFoundError";
  }
}
