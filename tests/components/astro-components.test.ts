import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * Static analysis tests for Astro components.
 *
 * Since Astro components run server-side and can't be rendered in Vitest
 * without a full Astro build pipeline, we validate component structure,
 * accessibility attributes, and content through static file analysis.
 */

const COMPONENTS_DIR = resolve(__dirname, "../../src/components");

function readComponent(relativePath: string): string {
  return readFileSync(resolve(COMPONENTS_DIR, relativePath), "utf-8");
}

describe("IntroCard.astro", () => {
  const source = readComponent("IntroCard.astro");

  it("contains the greeting text", () => {
    expect(source).toContain("Hello there!");
  });

  it("contains the author name", () => {
    expect(source).toContain("Juan Diego");
  });

  it("includes a linkedin link with aria-label", () => {
    expect(source).toContain('aria-label="linkedin profile"');
  });

  it("includes a PSN link with aria-label", () => {
    expect(source).toContain('aria-label="PSN profile"');
  });

  it("includes the theme toggle button", () => {
    expect(source).toContain('id="theme-toggle"');
    expect(source).toContain('aria-label="toggle theme"');
  });

  it("uses moon and sun icons for theme toggle", () => {
    expect(source).toContain('name="ri:moon-line"');
    expect(source).toContain('name="ri:sun-line"');
  });

  it("has dark mode visibility classes for toggle icons", () => {
    expect(source).toContain("dark:hidden");
    expect(source).toContain("hidden dark:block");
  });

  it("does not reference the old dice easter egg", () => {
    expect(source).not.toContain("ri:dice-line");
    expect(source).not.toContain("easter egg");
    expect(source).not.toContain("Tooltip");
  });

  it("includes sr-only text for accessibility", () => {
    expect(source).toContain("sr-only");
  });

  it("opens external links in new tabs", () => {
    expect(source).toContain('target="_blank"');
  });
});

describe("Button.astro", () => {
  const source = readComponent("Button.astro");

  it("renders a <button> element", () => {
    expect(source).toContain("<button");
  });

  it("includes a <slot /> for child content", () => {
    expect(source).toContain("<slot />");
  });

  it("accepts a rounded prop", () => {
    expect(source).toContain("rounded");
  });

  it("applies rounded-full when rounded is true", () => {
    expect(source).toContain("rounded-full");
  });

  it("applies rounded-lg by default", () => {
    expect(source).toContain("rounded-lg");
  });

  it("has hover and active interaction styles", () => {
    expect(source).toContain("hover:text-primary-500");
    expect(source).toContain("active:shadow-none");
  });

  it("uses cursor-pointer", () => {
    expect(source).toContain("cursor-pointer");
  });
});

describe("Card/index.astro", () => {
  const source = readComponent("Card/index.astro");

  it("renders a card container div with expected classes", () => {
    expect(source).toContain("card flex flex-col");
  });

  it("supports href prop for linked cards", () => {
    expect(source).toContain("href");
  });

  it("renders an arrow icon for linked cards", () => {
    expect(source).toContain("ri:arrow-right-up-line");
  });

  it("has dark mode background classes", () => {
    expect(source).toContain("bg-white dark:bg-darkslate-400");
  });

  it("has dark mode border classes", () => {
    expect(source).toContain("dark:border-darkslate-50");
  });

  it("has hover effect on border", () => {
    expect(source).toContain("hover:border-primary-500");
  });

  it("uses default colSpan when not provided", () => {
    expect(source).toContain('colSpan || "md:col-span-2"');
  });

  it("imports Content subcomponent", () => {
    expect(source).toContain('import Content from "./Content.astro"');
  });
});

describe("Card/Content.astro", () => {
  const source = readComponent("Card/Content.astro");

  it("conditionally renders title as h2", () => {
    expect(source).toContain("{title && <h2");
  });

  it("conditionally renders body as p", () => {
    expect(source).toContain("{body && <p");
  });

  it("includes a <slot /> for additional content", () => {
    expect(source).toContain("<slot />");
  });
});

describe("AboutMe.astro", () => {
  const source = readComponent("AboutMe.astro");

  it("contains the 'About me' heading", () => {
    expect(source).toContain("About me");
  });

  it("lists technical skills", () => {
    expect(source).toContain("Python");
    expect(source).toContain("TypeScript");
    expect(source).toContain("React");
    expect(source).toContain("Astro");
    expect(source).toContain("AWS");
  });

  it("mentions employer", () => {
    expect(source).toContain("JPMorgan Chase");
  });

  it("has a resume link", () => {
    expect(source).toContain("drive.google.com");
  });

  it("has dark mode text classes", () => {
    expect(source).toContain("dark:text-white");
  });

  it("wraps content in a Card component", () => {
    expect(source).toContain("<Card");
  });
});

describe("ContactsCard.astro", () => {
  const source = readComponent("ContactsCard.astro");

  it("contains the 'Keep in touch!' heading", () => {
    expect(source).toContain("Keep in touch!");
  });

  it("has an email link", () => {
    expect(source).toContain("contact@numberjuan.dev");
    expect(source).toContain("mailto:");
  });

  it("lists social links", () => {
    expect(source).toContain("Linkedin");
    expect(source).toContain("Beli");
    expect(source).toContain("Github");
  });

  it("uses semantic <address> element", () => {
    expect(source).toContain("<address");
  });

  it("has dark mode text classes on headings", () => {
    expect(source).toContain("text-black dark:text-white");
  });

  it("includes the contact image with alt text", () => {
    expect(source).toContain("me_with_mail.png");
    expect(source).toContain('alt="An image of me holding an envelope"');
  });
});

describe("Now.astro", () => {
  const source = readComponent("Now.astro");

  it("contains the heading", () => {
    expect(source).toContain("What I'm up to");
  });

  it("mentions hobbies", () => {
    expect(source).toContain("vinyl records");
    expect(source).toContain("guitar");
    expect(source).toContain("traveling");
  });

  it("includes the Pulse component", () => {
    expect(source).toContain("<Pulse />");
  });

  it("has dark mode text classes", () => {
    expect(source).toContain("dark:text-white");
  });
});

describe("Pulse.astro", () => {
  const source = readComponent("Pulse.astro");

  it("uses animate-ping for the pulse effect", () => {
    expect(source).toContain("animate-ping");
  });

  it("uses blue-500 color", () => {
    expect(source).toContain("bg-blue-500");
  });

  it("renders rounded-full circles", () => {
    expect(source).toContain("rounded-full");
  });
});

describe("Blog/PostRow.astro", () => {
  const source = readComponent("Blog/PostRow.astro");

  it("renders as a list item", () => {
    expect(source).toContain("<li");
  });

  it("links to the blog post by id", () => {
    expect(source).toContain("href={`/blog/${id}`}");
  });

  it("displays title and formatted date", () => {
    expect(source).toContain("{title}");
    expect(source).toContain("formatDate(date)");
  });

  it("uses semantic <time> element with datetime", () => {
    expect(source).toContain("<time");
    expect(source).toContain("datetime=");
  });

  it("has dark mode text classes", () => {
    expect(source).toContain("text-black dark:text-white");
  });

  it("has hover transition", () => {
    expect(source).toContain("hover:text-neutral-400");
    expect(source).toContain("transition-colors");
  });
});
