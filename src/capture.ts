import { postEvent } from "./post-event.internal";

/**
 * Capture an event with Sticklight API.
 * Requires that {@link [init](init.ts)} has already been called with the API key.
 *
 * @param {string} eventName - Name of the event to publish
 * @param {Record<string, unknown>} [data] - Optional data to publish with the event
 */
export async function capture(
  eventName: string,
  data: Record<string, unknown> = {}
): Promise<void> {
  return postEvent(eventName, data);
}
