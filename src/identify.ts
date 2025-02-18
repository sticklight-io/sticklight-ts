import { postEvent } from "./post-event.internal";
import store, { type User } from "./sessionStore";

/**
 * Identify a user for the current session.
 * You should call this function only once per session. Subsequent calls will be ignored.
 * The specified unique id and user data will be included with all events captured during this session.
 *
 * @param {string} uniqueId - A unique identifier for the user.
 *  A good value is a user ID from your own database.
 * @param {Record<string, unknown>} [userData] - Any additional data to associate with the user
 *  (e.g. name, email, etc.)
 * @returns {User} The identified user object.
 */
export async function identify(
  uniqueId: string,
  userData: Record<string, unknown> = {}
): Promise<User> {
  let currentUser = store.getCurrentUser();
  if (currentUser) {
    console.warn(
      `sl.identify: session already associated with user ${currentUser.id}; ignoring call to identify with uniqueId ${uniqueId}.`
    );
    return currentUser;
  }

  currentUser = store.setCurrentUser(uniqueId, userData);

  postEvent("sticklight_identify");
  return currentUser;
}
