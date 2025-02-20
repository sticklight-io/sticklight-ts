import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { capture, init } from "../src";
import { store } from "../src/session-store";
const STICKLIGHT_API_KEY = process.env.STICKLIGHT_API_KEY;

describe("init.apiKey", () => {
  beforeAll(() => {
    expect(STICKLIGHT_API_KEY).length.above(0);
  });
  const resetStore = () => {
    store.setApiKey(STICKLIGHT_API_KEY as string);
    store.setApiBaseUrl("https://api.platform.sticklight.io");
  };
  beforeEach(resetStore);
  afterAll(resetStore);

  it("Should set to store", async () => {
    await init("test-api-key");
    expect(store.getApiKey()).toBe("test-api-key");
  });

  it('Should dictate which default API key "capture" uses and make it fail', async () => {
    await init("BAD_API_KEY");
    expect(() => capture("test", { should: "fail" })).rejects;
  });

  it("Should dictate which default API key 'capture' uses and make it succeed", async () => {
    await init(STICKLIGHT_API_KEY as string);
    await expect(capture("test", { should: "succeed" })).resolves.toBeDefined();
  });
});

describe("init.apiBaseUrl", () => {
  const resetStore = () => {
    store.setApiKey(STICKLIGHT_API_KEY as string);
    store.setApiBaseUrl("https://api.platform.sticklight.io");
  };
  beforeEach(resetStore);
  afterAll(resetStore);

  it("Should set to store", async () => {
    await init("test-api-key", "test-base-url");
    expect(store.getApiBaseUrl()).toBe("test-base-url");
  });

  it("Should not error when not provided", async () => {
    await init("test-api-key");
  });

  it('Should dictate which default API base URL "capture" uses and make it fail', async () => {
    await init(STICKLIGHT_API_KEY as string, "BAD_BASE_URL");
    await expect(capture("test", { should: "fail" })).resolves.toBeNull();
  });

  it("Should dictate which default API base URL 'capture' uses and make it succeed", async () => {
    await expect(capture("test", { should: "succeed" })).resolves.toBeDefined();
  });
});
