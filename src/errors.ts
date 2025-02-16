/**
 * Sticklight errors base class.
 */
export class SticklightError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

/** Coupled with the Sticklight API. */
interface ErrorResponseData {
  correlation_id?: string;
  request_path?: string;
  timestamp?: string;
  message?: string;
  error_type?: string;
  error_class?: string; // Backend error class name (e.g., KeyError, TypeError)
  action_hint?: string; // Suggested action for the user
}

export class SticklightRequestError extends SticklightError {
  public readonly statusCode: number;
  public readonly correlationId: string | undefined;
  public readonly path: string | undefined;
  public readonly timestamp: string | undefined;
  public readonly errorType: string | undefined;
  public readonly errorClass: string | undefined;
  public readonly actionHint: string | undefined;
  public readonly debugInfo: Record<string, unknown> | undefined;

  constructor(
    message: string,
    statusCode: number,
    responseData?: ErrorResponseData
  ) {
    // If there's an action hint, append it to the message.
    const actionHintSeparator = message.endsWith(".") ? " " : ". ";
    const fullMessage = responseData?.action_hint
      ? `${message}${actionHintSeparator}${responseData.action_hint}`
      : message;

    super(fullMessage);
    this.statusCode = statusCode;
    if (responseData) {
      this.correlationId = responseData.correlation_id;
      this.path = responseData.request_path;
      this.timestamp = responseData.timestamp;
      this.errorType = responseData.error_type;
      this.errorClass = responseData.error_class;
      this.actionHint = responseData.action_hint;
    }
  }

  /**
   * Returns a string representation of the error, including all available context
   */
  public override toString(): string {
    const parts = [
      `${this.name} [${this.statusCode}]: ${this.message}`,
      this.correlationId && `Correlation ID: ${this.correlationId}`,
      this.path && `Path: ${this.path}`,
      this.errorType && `Error Type: ${this.errorType}`,
      this.errorClass && `Error Class: ${this.errorClass}`,
    ].filter(Boolean);

    return parts.join("\n");
  }
}

/**
 * Invalid Sticklight API key (401)
 */
export class SticklightAuthenticationError extends SticklightRequestError {}

/**
 * Sticklight API key not found during initialization
 */
export class SticklightApiKeyNotFoundError extends SticklightError {}

/**
 * Rate limit exceeded (429)
 */
export class SticklightRateLimitError extends SticklightRequestError {}

/**
 * Server-side error (500-599)
 */
export class SticklightServerError extends SticklightRequestError {}

/**
 * Resource not found error (404)
 */
export class SticklightResourceNotFoundError extends SticklightRequestError {}

/**
 * Validation error (400)
 */
export class SticklightValidationError extends SticklightRequestError {}

/**
 * Authorization error (403)
 */
export class SticklightAuthorizationError extends SticklightRequestError {}

/**
 * Timeout error (504)
 */
export class SticklightTimeoutError extends SticklightServerError {}

/**
 * Database error (specific 500 error)
 */
export class SticklightDatabaseError extends SticklightServerError {}

/**
 * External service error (502)
 * Thrown when an external service (including timeouts) fails
 */
export class SticklightExternalServiceError extends SticklightServerError {}

export interface AxiosErrorResponse {
  response?: {
    status: number;
    data: ErrorResponseData;
  };
  message: string;
}

/**
 * Parse an error response from the Sticklight API and return an appropriate error instance.
 * First checks the error_type from the backend for precise error classification,
 * then falls back to HTTP status code based classification.
 */
export function parseErrorResponse(
  error: AxiosErrorResponse
): SticklightRequestError {
  const response = error.response;
  if (!response) {
    console.error("No 'error.response' from Axios", error);
    throw error;
  }

  const { status, data } = response;
  const message = data?.message || error.message;

  // First try to classify by error_type if available
  if (data?.error_type) {
    switch (data.error_type) {
      case "ResourceNotFound":
        return new SticklightResourceNotFoundError(message, status, data);
      case "ValidationError":
        return new SticklightValidationError(message, status, data);
      case "AuthenticationError":
        return new SticklightAuthenticationError(message, status, data);
      case "AuthorizationError":
        return new SticklightAuthorizationError(message, status, data);
      case "TimeoutError":
        return new SticklightTimeoutError(message, status, data);
      case "DatabaseError":
        return new SticklightDatabaseError(message, status, data);
      case "ExternalServiceError":
        return new SticklightExternalServiceError(message, status, data);
      default:
        return new SticklightServerError(message, status, data);
    }
  }

  // Fall back to status code based classification
  if (status === 401) {
    return new SticklightAuthenticationError(message, status, data);
  }

  if (status === 429) {
    return new SticklightRateLimitError(message, status, data);
  }

  if (status === 404) {
    return new SticklightResourceNotFoundError(message, status, data);
  }

  if (status === 403) {
    return new SticklightAuthorizationError(message, status, data);
  }

  if (status === 400) {
    return new SticklightValidationError(message, status, data);
  }

  if (status === 502) {
    return new SticklightExternalServiceError(message, status, data);
  }

  if (status === 504) {
    return new SticklightTimeoutError(message, status, data);
  }

  if (status >= 500 && status < 600) {
    return new SticklightServerError(message, status, data);
  }

  // Client errors (excluding ones handled above)
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
