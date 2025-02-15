import axios, { type AxiosResponse } from "axios";
import { resolveSticklightApiKey } from "./auth";
import store from "./sessionStore";

export interface CaptureOptions {
  /**
   * The Sticklight API key to use. If not provided, will be resolved from session storage.
   * @see {@link resolveSticklightApiKey}
   */
  $sticklightApiKey?: string;
  [key: string]: unknown;
}

/**
 * Publish an event to Sticklight API.
 *
 * @param {number} eventName - Name of the event to publish
 * @param {CaptureOptions} data - Additional data to publish with the event. If `$sticklightApiKey` is included, it will be used as the API key.
 * @returns {Promise<AxiosResponse>} Promise resolving to the API response
 */
export async function capture(
  eventName: string,
  data: CaptureOptions
): Promise<AxiosResponse> {
  const { $sticklightApiKey, ...dataWithoutApiKey } = data;
  const apiKey = resolveSticklightApiKey($sticklightApiKey);
  console.log("[capture] apiKey:", apiKey);
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
        // transformRequest: (data) => {
        //   console.log("[capture] request:", data);
        //   return data;
        // },
        // transformResponse: (data) => {
        //   console.log("[capture] response:", data);
        //   return data;
        // },
        responseType: "json",
        validateStatus: (status) => {
          console.log("[capture] status:", status);
          return status >= 200 && status < 300;
        },
      }
    );
  } catch (error) {
    console.error("[capture] error:", error);
    throw error;
  } finally {
    console.log("[capture] finally");
  }
}
