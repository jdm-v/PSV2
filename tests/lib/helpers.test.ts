import { describe, it, expect } from "vitest";
import {
  trimText,
  getCurrentTimeInItaly,
  formatTimeForItaly,
  formatDate,
} from "../../src/lib/helpers";

describe("trimText", () => {
  it("returns the original string when shorter than maxLength", () => {
    expect(trimText("hello", 100)).toBe("hello");
  });

  it("returns the original string when exactly maxLength", () => {
    const str = "a".repeat(100);
    expect(trimText(str, 100)).toBe(str);
  });

  it("trims and appends ellipsis when exceeding maxLength", () => {
    const str = "a".repeat(120);
    const result = trimText(str, 100);
    expect(result).toHaveLength(100);
    expect(result.endsWith("...")).toBe(true);
  });

  it("uses default maxLength of 100", () => {
    const str = "a".repeat(120);
    const result = trimText(str);
    expect(result).toHaveLength(100);
    expect(result.endsWith("...")).toBe(true);
  });

  it("preserves content before the trim point", () => {
    const result = trimText("Hello World! This is a long string", 10);
    expect(result).toBe("Hello W...");
  });

  it("handles empty string", () => {
    expect(trimText("")).toBe("");
  });

  it("handles single character", () => {
    expect(trimText("a", 1)).toBe("a");
  });
});

describe("getCurrentTimeInItaly", () => {
  it("returns a Date object", () => {
    const result = getCurrentTimeInItaly();
    expect(result).toBeInstanceOf(Date);
  });

  it("returns a valid date (not NaN)", () => {
    const result = getCurrentTimeInItaly();
    expect(result.getTime()).not.toBeNaN();
  });
});

describe("formatTimeForItaly", () => {
  it("returns a string ending with CET", () => {
    const date = new Date("2024-06-15T12:00:00Z");
    const result = formatTimeForItaly(date);
    expect(result).toMatch(/CET$/);
  });

  it("formats time in 12-hour format with AM/PM", () => {
    const date = new Date("2024-06-15T12:00:00Z");
    const result = formatTimeForItaly(date);
    expect(result).toMatch(/\d{1,2}:\d{2}:\d{2}\s(AM|PM)\sCET/);
  });

  it("returns a non-empty string for any valid date", () => {
    const date = new Date("2024-01-01T00:00:00Z");
    const result = formatTimeForItaly(date);
    expect(result.length).toBeGreaterThan(0);
  });
});

describe("formatDate", () => {
  it("formats a date in US long format", () => {
    const date = new Date("2024-03-15T12:00:00Z");
    const result = formatDate(date);
    expect(result).toBe("March 15, 2024");
  });

  it("handles January correctly", () => {
    const date = new Date("2024-01-15T12:00:00Z");
    const result = formatDate(date);
    expect(result).toContain("January");
    expect(result).toContain("2024");
  });

  it("handles December correctly", () => {
    const date = new Date("2024-12-15T12:00:00Z");
    const result = formatDate(date);
    expect(result).toContain("December");
    expect(result).toContain("2024");
  });

  it("includes the full month name", () => {
    const date = new Date("2024-06-15T12:00:00Z");
    const result = formatDate(date);
    expect(result).toContain("June");
  });
});
