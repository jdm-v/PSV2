import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * Static analysis tests for src/pages/index.astro.
 *
 * Validates the Dev Diary card wiggle feature:
 *   1. The card is uniquely identifiable via id="dev-diary-card"
 *   2. A CSS @keyframes wiggle is defined with subtle translateX displacements
 *   3. A .wiggle rule scoped with :global() applies the animation
 *   4. The client script triggers wiggle after the entrance animation (.finished)
 *   5. The script re-triggers wiggle on every mouseenter hover
 *   6. Existing entrance animation is left intact
 */

const INDEX_PAGE = resolve(__dirname, "../src/pages/index.astro");

function readPage(): string {
  return readFileSync(INDEX_PAGE, "utf-8");
}

// ─── Markup ──────────────────────────────────────────────────────────────────

describe("index.astro — Dev Diary Card markup", () => {
  it('Dev Diary Card has id="dev-diary-card"', () => {
    expect(readPage()).toContain('id="dev-diary-card"');
  });

  it("Dev Diary Card still links to /blog", () => {
    expect(readPage()).toContain('href="/blog"');
  });

  it("Dev Diary heading text is preserved", () => {
    expect(readPage()).toContain("Dev Diary");
  });
});

// ─── CSS ─────────────────────────────────────────────────────────────────────

describe("index.astro — wiggle CSS", () => {
  it("defines a @keyframes wiggle block", () => {
    expect(readPage()).toContain("@keyframes wiggle");
  });

  it("wiggle keyframes use translateX for horizontal movement", () => {
    expect(readPage()).toContain("translateX");
  });

  it("wiggle keyframes use subtle displacements (≤ 6 px)", () => {
    const src = readPage();
    const keyframesMatch = src.match(/@keyframes wiggle\s*\{([\s\S]*?)\n\s*\}/);
    expect(keyframesMatch).not.toBeNull();
    const body = keyframesMatch![1];
    const pxValues = [...body.matchAll(/-?(\d+(?:\.\d+)?)px/g)].map((m) =>
      Math.abs(parseFloat(m[1]))
    );
    expect(pxValues.length).toBeGreaterThan(0);
    pxValues.forEach((v) => expect(v).toBeLessThanOrEqual(6));
  });

  it("animation property references the wiggle keyframe by name", () => {
    expect(readPage()).toMatch(/animation:\s*wiggle/);
  });

  it("uses :global() so the scoped style penetrates the child Card component", () => {
    expect(readPage()).toContain(":global(");
  });

  it("wiggle rule targets the dev-diary-card id", () => {
    expect(readPage()).toContain("dev-diary-card");
  });
});

// ─── Client-side script ───────────────────────────────────────────────────────

describe("index.astro — wiggle script logic", () => {
  it("looks up the dev-diary-card element by id", () => {
    expect(readPage()).toContain("dev-diary-card");
  });

  it("attaches a mouseenter listener for hover-triggered wiggle", () => {
    expect(readPage()).toContain("mouseenter");
  });

  it('adds the "wiggle" CSS class to start the animation', () => {
    expect(readPage()).toContain('"wiggle"');
  });

  it("removes the wiggle class on animationend so it can retrigger", () => {
    expect(readPage()).toContain("animationend");
  });

  it("chains the on-load wiggle after the entrance animation via .finished", () => {
    expect(readPage()).toContain(".finished");
  });

  it("still imports stagger and animate from motion", () => {
    const src = readPage();
    expect(src).toContain('from "motion"');
    expect(src).toContain("stagger");
    expect(src).toContain("animate");
  });

  it("entrance animation sequence is unchanged — y from 40% to 0%", () => {
    expect(readPage()).toContain('y: ["40%", "0%"]');
  });

  it("entrance animation still uses spring type", () => {
    expect(readPage()).toContain('"spring"');
  });
});
