import axios from "axios";
import { resolveSticklightApiKey } from "./auth";
import { parseErrorResponse } from "./errors";
import type { AxiosErrorResponse } from "./errors";
import store from "./sessionStore";
const safeGetWindowData = () => {
  if (typeof window === "undefined") {
    return {};
  }
  return {
    "location.pathname": window.location?.pathname,
    "location.origin": window.location?.origin,
    "location.protocol": window.location?.protocol,
  };
};

const safeGetNavigatorData = () => {
  if (typeof navigator === "undefined") {
    return {};
  }
  return {
    userAgent: navigator.userAgent,
    "userAgentData.mobile": navigator.userAgentData?.mobile,
    "userAgentData.platform": navigator.userAgentData?.platform,
    deviceMemory: navigator.deviceMemory,
    hardwareConcurrency: navigator.hardwareConcurrency,
    language: navigator.language,
    // "languages": navigator.languages,  // TODO: uncomment when we support lists
    onLine: navigator.onLine,
    "connection.effectiveType": navigator.connection?.effectiveType,
    "userActivation.hasBeenActive": navigator.userActivation?.hasBeenActive,
    "userActivation.isActive": navigator.userActivation?.isActive,
  };
};
const safeGetBrowserData = () => {
  try {
    return {
      ...safeGetWindowData(),
      ...safeGetNavigatorData(),
    };
  } catch (_error) {
    console.warn("Failed to get browser data", _error);
    return {};
  }
};

const enrichMetaData = (
  data: Record<string, unknown>
): Record<string, unknown> => {
  const meta = {
    browser: safeGetBrowserData(),
    sessionId: store.getSessionId(),
    user: store.getCurrentUser(),
  };

  if (data.meta) {
    data.meta = { ...meta, ...data.meta };
  } else {
    data.meta = meta;
  }
  return data;
};

/** Low-level function making the HTTP request to the Sticklight API.
 * Enriches data.meta with the current window location and session ID.
 */
export async function postEvent(
  eventName: string,
  data: Record<string, unknown> = {}
): Promise<void> {
  const apiKey = resolveSticklightApiKey();
  const requestBody = [{ event_name: eventName, ...enrichMetaData(data) }];

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
