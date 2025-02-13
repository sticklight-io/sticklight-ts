import axios, { AxiosResponse } from "axios";
import { STICKLIGHT_API_BASE_URL } from "./consts";
import { resolveSticklightApiKey } from "./auth";


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
export async function capture(eventName: string, data: CaptureOptions): Promise<AxiosResponse> {
  const { $sticklightApiKey, ...dataWithoutApiKey } = data;
  const apiKey = resolveSticklightApiKey($sticklightApiKey);
  const requestBody = {event_name: eventName, data: dataWithoutApiKey};
  
  const response = await axios.post(
    `${STICKLIGHT_API_BASE_URL}/events-collect/v1/events`,
    requestBody,
    {
      headers: {
        accept: "application/json",
        "x-api-key": apiKey,
      },
      timeout: 5000,
    }
  );

  return response;
}