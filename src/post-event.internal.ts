import axios from "axios";
import { resolveSticklightApiKey } from "./auth";
import { parseErrorResponse } from "./errors";
import type { AxiosErrorResponse } from "./errors";
import { store } from "./session-store";

const safeGetWindowData = (): Record<string, unknown> => {
  if (typeof window === "undefined") {
    return {};
  }
  return {
    "location.pathname": window.location?.pathname,
    "location.origin": window.location?.origin,
    "location.protocol": window.location?.protocol,
  };
};

const safeGetNavigatorData = (): Record<string, unknown> => {
  if (typeof navigator === "undefined") {
    return {};
  }
  return {
    userAgent: navigator.userAgent,
    // @ts-ignore: userAgentData sometimes does exist
    "userAgentData.mobile": navigator.userAgentData?.mobile,
    // @ts-ignore: userAgentData sometimes does exist
    "userAgentData.platform": navigator.userAgentData?.platform,
    // @ts-ignore: deviceMemory sometimes does exist
    deviceMemory: navigator.deviceMemory,
    hardwareConcurrency: navigator.hardwareConcurrency,
    language: navigator.language,
    // "languages": navigator.languages,  // TODO: uncomment when we support lists
    onLine: navigator.onLine,
    // @ts-ignore: connection sometimes does exist
    "connection.effectiveType": navigator.connection?.effectiveType,
    "userActivation.hasBeenActive": navigator.userActivation?.hasBeenActive,
    "userActivation.isActive": navigator.userActivation?.isActive,
  };
};
const safeGetBrowserData = (): Record<string, unknown> => {
  try {
    return {
      ...safeGetWindowData(),
      ...safeGetNavigatorData(),
    };
  } catch (error) {
    console.warn("Failed to get browser data", error);
    return {};
  }
};

const enrichMetaData = <T extends Record<string, unknown>>(
  data: T
): T & { meta: Record<string, unknown> } => {
  const meta = {
    browser: safeGetBrowserData(),
    sessionId: store.getSessionId(),
    user: store.getCurrentUser(),
  };

  // TODO(performance): avoid creating a new object
  const dataWithMeta: T & { meta: Record<string, unknown> } = {
    meta: {},
    ...data,
  };
  if (data.meta) {
    dataWithMeta.meta = { ...meta, ...dataWithMeta.meta };
  } else {
    dataWithMeta.meta = meta;
  }
  return dataWithMeta;
};

/**
 * Low-level function making the HTTP request to the Sticklight API.
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
