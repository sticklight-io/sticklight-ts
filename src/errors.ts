/**
 * Sticklight errors base class
 */
export class SticklightError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

interface ErrorResponseData {
  correlation_id?: string;
  request_path?: string;
  timestamp?: string;
  message?: string;
}

export class SticklightRequestError extends SticklightError {
  public readonly statusCode: number;
  public readonly correlationId: string | undefined;
  public readonly path: string | undefined;
  public readonly timestamp: string | undefined;

  constructor(
    message: string,
    statusCode: number,
    responseData?: ErrorResponseData
  ) {
    super(message);
    this.statusCode = statusCode;
    if (responseData) {
      this.correlationId = responseData.correlation_id;
      this.path = responseData.request_path;
      this.timestamp = responseData.timestamp;
    }
  }
}

/**
 * Sticklight API key not found or invalid
 */
export class SticklightAuthenticationError extends SticklightRequestError {}

/**
 * Sticklight API key not found during initialization
 */
export class SticklightApiKeyNotFoundError extends SticklightError {}

export class SticklightRateLimitError extends SticklightRequestError {}

export class SticklightServerError extends SticklightRequestError {}

export interface AxiosErrorResponse {
  response?: {
    status: number;
    data: ErrorResponseData;
  };
  message: string;
}

/**
 * Parse an error response from the Sticklight API and return an appropriate error instance
 */
export function parseErrorResponse(
  error: AxiosErrorResponse
): SticklightRequestError {
  const response = error.response;
  if (!response) {
    return new SticklightRequestError("Network error occurred", 0);
  }

  const { status, data } = response;
  const message = data?.message || error.message;

  // Authentication errors
  if (status === 401) {
    return new SticklightAuthenticationError(message, 401, data);
  }

  // Rate limiting
  if (status === 429) {
    return new SticklightRateLimitError(message, 429, data);
  }

  // Server errors
  if (status >= 500 && status < 600) {
    return new SticklightServerError(message, status, data);
  }

  // Client errors (excluding 401, 429 which are handled above)
  if (status >= 400 && status < 500) {
    return new SticklightRequestError(message, status, data);
  }

  // Unexpected status codes
  return new SticklightRequestError(
    `Unexpected status code: ${status}. ${message}`,
    status,
    data
  );
}
