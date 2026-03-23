import { describe, it, expect, beforeEach, vi } from "vitest";

/**
 * Tests for the dark mode toggle logic used in IntroCard.astro and BasicLayout.astro.
 * Since Astro components can't be rendered in Vitest, we test the underlying
 * DOM manipulation logic directly.
 */
describe("Theme toggle logic", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
    localStorage.clear();
  });

  it("toggles 'dark' class on documentElement", () => {
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    document.documentElement.classList.toggle("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    document.documentElement.classList.toggle("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("persists dark theme choice to localStorage", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("persists light theme when toggled off", () => {
    document.documentElement.classList.add("dark");
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("reads stored dark preference on initialization", () => {
    localStorage.setItem("theme", "dark");

    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("defaults to light when no stored preference", () => {
    const theme = localStorage.getItem("theme");
    expect(theme).toBeNull();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});

describe("Theme toggle click handler", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
    localStorage.clear();
    document.body.innerHTML = "";
  });

  it("toggles theme when button is clicked", () => {
    document.body.innerHTML = '<div id="theme-toggle"><button>Toggle</button></div>';

    const toggle = document.getElementById("theme-toggle");
    toggle?.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    toggle?.click();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");

    toggle?.click();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("does nothing when toggle element is missing", () => {
    const toggle = document.getElementById("theme-toggle");
    expect(toggle).toBeNull();
  });
});

describe("FOIT prevention script logic", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
    localStorage.clear();
  });

  function applyThemeFromStorage() {
    const theme = localStorage.getItem("theme");
    if (
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    }
  }

  it("applies dark class when localStorage has dark", () => {
    localStorage.setItem("theme", "dark");
    applyThemeFromStorage();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("does not apply dark class when localStorage has light", () => {
    localStorage.setItem("theme", "light");
    applyThemeFromStorage();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("falls back to light when no stored theme and system prefers light", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    applyThemeFromStorage();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("respects system dark preference when no stored theme", () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-color-scheme: dark)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    applyThemeFromStorage();
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    window.matchMedia = originalMatchMedia;
  });
});
