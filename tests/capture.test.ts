import { beforeAll, describe, expect, it } from "vitest";
import { capture } from "../src";
import store from "../src/sessionStore";

const STICKLIGHT_API_KEY = process.env.STICKLIGHT_API_KEY;

describe("capture", () => {
  beforeAll(() => {
    expect(STICKLIGHT_API_KEY).length.above(0);
  });

  it("Should raise error when API key not found", () => {
    const originalApiKey = store.getApiKey();
    store.setApiKey("");
    expect(() => capture("test", { foo: "bar" })).rejects.toThrow();
    store.setApiKey(originalApiKey as string);
  });

  it("Should not error when API key provided in data", async () => {
    const originalApiKey = store.getApiKey();
    store.setApiKey("");
    await capture(
      "test",
      { foo: "bar" },
      { sticklightApiKey: STICKLIGHT_API_KEY }
    );
    store.setApiKey(originalApiKey as string);
  });

  it("Should return the response from the API", async () => {
    const response = await capture(
      "test",
      { foo: "bar" },
      { sticklightApiKey: STICKLIGHT_API_KEY }
    );
    expect(response).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    console.log(response.data);
  });
});
