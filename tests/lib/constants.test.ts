import { describe, it, expect } from "vitest";
import { LINKS, loaderAnimation } from "../../src/lib/constants";

describe("LINKS", () => {
  it("contains a linkedin URL", () => {
    expect(LINKS.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\//);
  });

  it("contains a psn URL", () => {
    expect(LINKS.psn).toMatch(/^https:\/\/psnprofiles\.com\//);
  });

  it("contains a beli URL", () => {
    expect(LINKS.beli).toMatch(/^https:\/\/beliapp\.co\//);
  });

  it("contains a github URL", () => {
    expect(LINKS.github).toMatch(/^https:\/\/github\.com\//);
  });

  it("has all expected keys", () => {
    expect(Object.keys(LINKS)).toEqual(
      expect.arrayContaining(["linkedin", "psn", "beli", "github", "email"])
    );
  });
});

describe("loaderAnimation", () => {
  it("is an array with 3 elements", () => {
    expect(loaderAnimation).toHaveLength(3);
  });

  it("has a CSS selector as the first element", () => {
    expect(loaderAnimation[0]).toBe(".loader");
  });

  it("has animation properties as the second element", () => {
    const props = loaderAnimation[1] as Record<string, unknown>;
    expect(props).toHaveProperty("opacity");
    expect(props).toHaveProperty("pointerEvents", "none");
  });

  it("has easing options as the third element", () => {
    const options = loaderAnimation[2] as Record<string, unknown>;
    expect(options).toHaveProperty("easing", "ease-out");
  });
});
