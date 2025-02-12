import axios from "axios";
import { STICKLIGHT_API_BASE_URL } from "./consts";
import { resolveSticklightApiKey } from "./auth";

export interface CaptureOptions {
  sticklightApiKey?: string;
}

export async function capture(data: Record<string, unknown>, options: CaptureOptions = {}) {
  const apiKey = resolveSticklightApiKey(options.sticklightApiKey);
  
  const response = await axios.post(
    `${STICKLIGHT_API_BASE_URL}/events-collect/v1/events`,
    [data],
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