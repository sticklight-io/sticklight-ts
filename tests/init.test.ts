import { beforeEach } from "node:test";
import { beforeAll, describe, expect, it } from "vitest";
import { capture, init } from "../src";
import store from "../src/sessionStore";
const STICKLIGHT_API_KEY = process.env.STICKLIGHT_API_KEY!;

describe("init.sticklightApiKey", () => {
  beforeAll(() => {
    expect(STICKLIGHT_API_KEY).length.above(0);
  });

  it("Should set to store", () => {
    init("test-api-key");
    expect(store.getApiKey()).toBe("test-api-key");
  });

  it('Should dictate which default API key "capture" uses and make it fail', () => {
    init("BAD_API_KEY");
    expect(capture("test", { should: "fail" })).rejects.toThrow();
  });

  it("Should dictate which default API key 'capture' uses and make it succeed", () => {
    init(STICKLIGHT_API_KEY);
    expect(capture("test", { should: "succeed" })).resolves.toBeDefined();
  });
});

describe("init.sticklightApiBaseUrl", () => {
  const resetStore = () => {
    store.setApiKey("");
    store.setApiBaseUrl("https://api.platform.sticklight.io");
  };
  beforeEach(resetStore);

  it("Should set to store", () => {
    init("test-api-key", "test-base-url");
    expect(store.getApiBaseUrl()).toBe("test-base-url");
  });

  it("Should not error when not provided", () => {
    init("test-api-key");
  });

  it('Should dictate which default API base URL "capture" uses', () => {
    init(STICKLIGHT_API_KEY, "BAD_BASE_URL");
    expect(capture("test", { should: "fail" })).rejects.toThrow();

    init(STICKLIGHT_API_KEY);
    expect(capture("test", { should: "succeed" })).resolves.toBeDefined();
  });
});
