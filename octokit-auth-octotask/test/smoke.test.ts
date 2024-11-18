import { createOctotaskAuth } from "../src/index.js";
import { describe, expect, it } from "vitest";

describe("Smoke test", () => {
  it("is a function", () => {
    expect(createOctotaskAuth).toBeInstanceOf(Function);
  });

  it("createOctotaskAuth.VERSION is set", () => {
    expect(createOctotaskAuth.VERSION).toEqual("0.0.0-development");
  });
});
