import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { capture, init } from "../src";
import { SticklightApiKeyNotFoundError } from "../src/errors";
import { store } from "../src/session-store";

const STICKLIGHT_API_KEY = process.env.STICKLIGHT_API_KEY;

describe("capture", () => {
  beforeAll(() => {
    expect(STICKLIGHT_API_KEY).length.above(0);
  });

  const resetStore = () => {
    store.setApiKey(STICKLIGHT_API_KEY as string);
    store.setApiBaseUrl("https://api.platform.sticklight.io");
  };
  beforeEach(resetStore);
  afterAll(resetStore);

  it("Should raise error when API key not found", async () => {
    store.setApiKey("");
    await expect(capture("test", { foo: "bar" })).rejects.toBeInstanceOf(
      SticklightApiKeyNotFoundError
    );
  });

  it("Should not error when API key provided via init", async () => {
    init(STICKLIGHT_API_KEY as string);
    const response = await capture("test", { foo: "bar" });
    expect(response).toBeDefined();
    // biome-ignore lint/style/noNonNullAssertion: asserted to be defined above.
    expect(response!.status).toBe(200);
  });
});
