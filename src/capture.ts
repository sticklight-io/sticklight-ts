import axios, { type AxiosResponse } from "axios";
import { resolveSticklightApiKey } from "./auth";
import {
  SticklightAuthenticationError,
  SticklightServerError,
  parseErrorResponse,
} from "./errors";
import type { AxiosErrorResponse } from "./errors";
import type { init } from "./init";
import store from "./sessionStore";

export interface CaptureSettings {
  /**
   * If not provided, will be resolved from session storage.
   * @see {@link resolveSticklightApiKey}
   */
  sticklightApiKey?: string;
}

export type CaptureData = {
  [key: string]: unknown;
} & {
  [K in keyof CaptureSettings]: never;
};

/**
 * Capture an event with Sticklight API.
 * Either provide the API key in {@link CaptureSettings captureSettings} or call {@link init} first.
 *
 * @param {number} eventName - Name of the event to publish
 * @param {CaptureData} data - Data to publish with the event
 * @param {CaptureSettings} captureSettings - E.g. optional API key, with session storage fallback
 */
export async function capture(
  eventName: string,
  data: CaptureData,
  captureSettings: CaptureSettings = {}
): Promise<AxiosResponse> {
  const { $sticklightApiKey, ...dataWithoutApiKey } = data;
  const apiKey = resolveSticklightApiKey(captureSettings.sticklightApiKey);
  const requestBody = [{ event_name: eventName, data: dataWithoutApiKey }];

  try {
    return await axios.post(
      `${store.getApiBaseUrl()}/events-collect/v1/events`,
      requestBody,
      {
        headers: {
          accept: "application/json",
          "x-api-key": apiKey,
        },
        timeout: 30000,
        responseType: "json",
        validateStatus: (status) => {
          return status >= 200 && status < 300;
        },
      }
    );
  } catch (error) {
    if (error instanceof SticklightServerError) {
      // Handle server errors (any 5xx)
    } else if (error instanceof SticklightAuthenticationError) {
      // Handle auth issues specifically
    }
    throw parseErrorResponse(error as AxiosErrorResponse);
  }
}
