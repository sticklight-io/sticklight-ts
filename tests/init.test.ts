import { beforeEach } from "node:test";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { capture, init } from "../src";
import store from "../src/session-store";
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

  it("Should set to store", () => {
    init("test-api-key");
    expect(store.getApiKey()).toBe("test-api-key");
  });

  it('Should dictate which default API key "capture" uses and make it fail', () => {
    init("BAD_API_KEY");
    expect(capture("test", { should: "fail" })).rejects.toThrow();
  });

  it("Should dictate which default API key 'capture' uses and make it succeed", () => {
    init(STICKLIGHT_API_KEY as string);
    expect(capture("test", { should: "succeed" })).resolves.toBeDefined();
  });
});

describe("init.apiBaseUrl", () => {
  const resetStore = () => {
    store.setApiKey(STICKLIGHT_API_KEY as string);
    store.setApiBaseUrl("https://api.platform.sticklight.io");
  };
  beforeEach(resetStore);
  afterAll(resetStore);

  it("Should set to store", () => {
    init("test-api-key", "test-base-url");
    expect(store.getApiBaseUrl()).toBe("test-base-url");
  });

  it("Should not error when not provided", () => {
    init("test-api-key");
  });

  it('Should dictate which default API base URL "capture" uses make it fail', () => {
    expect(capture("test", { should: "fail" })).rejects.toThrow();
  });

  it("Should dictate which default API base URL 'capture' uses and make it succeed", () => {
    expect(capture("test", { should: "succeed" })).resolves.toBeDefined();
  });
});
