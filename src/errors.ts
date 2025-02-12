export class SticklightApiKeyNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SticklightApiKeyNotFoundError";
  }
} 