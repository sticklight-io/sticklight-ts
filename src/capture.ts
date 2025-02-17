import axios from "axios";
import { resolveSticklightApiKey } from "./auth";
import { parseErrorResponse } from "./errors";
import type { AxiosErrorResponse } from "./errors";
import type { init } from "./init";
import store from "./sessionStore";

/**
 * Capture an event with Sticklight API.
 * Requires that {@link init} has already been called with the API key.
 *
 * @param {string} eventName - Name of the event to publish
 * @param {Record<string, unknown>} [data] - Data to publish with the event
 */
export async function capture(
  eventName: string,
  data: Record<string, unknown> = {}
): Promise<void> {
  const apiKey = resolveSticklightApiKey();
  const requestBody = [{ event_name: eventName, data }];

  try {
    return axios.post(
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
    console.error(parseErrorResponse(error as AxiosErrorResponse));
  }
}
