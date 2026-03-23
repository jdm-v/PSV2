---
mode: agent
tools:
  - createFile
  - editFiles
  - codebase
  - terminalLastCommand
  - search
  - readFile
  - listDirectory
  - runCommand
description: Investigate and fix a bug — reproduce with a failing test first, then fix.
---

## Goal

Diagnose and fix the described bug by **first writing a failing test that reproduces it**, then applying the minimal fix to make the test pass, and finally cleaning up.

---

## Context

You are working in an **Astro + Svelte 5** project (TypeScript, UnoCSS, PostCSS, ESLint). The package manager is **pnpm**.

Key directories:
- `src/pages/` — Astro page routes
- `src/components/` — Astro and Svelte components
- `src/lib/` — Shared utilities and helpers
- `src/layouts/` — Layout components

Bugs may manifest as:
- Runtime errors in components or pages
- Incorrect rendered output
- Build failures
- Broken styles or layout regressions
- Incorrect data transformations in `src/lib/` or `src/data/`

---

## Instructions

1. **Understand the bug report.** Parse the user's `<description>`. Identify:
   - What is the expected behaviour?
   - What is the actual (broken) behaviour?
   - Are there steps to reproduce?

2. **Locate the fault.** Use `search`, `codebase`, and `readFile` to trace the code path involved. Narrow down to the file(s) and function(s) responsible.

3. **Check existing tests.** Read any existing tests for the affected module. Understand what *is* covered and what gap allowed this bug to slip through.

4. **🔴 RED — Write a failing test that reproduces the bug.**
   - The test must **fail** in a way that captures the bug's actual broken behaviour.
   - Run tests to confirm the new test fails (and existing tests still have their prior status).

5. **🟢 GREEN — Apply the minimal fix.**
   - Change only what is necessary to make the failing test pass.
   - Do not refactor, do not fix "nearby" issues — just fix the bug.
   - Run tests to confirm the new test passes and no regressions appeared.

6. **🔵 REFACTOR — Clean up if needed.**
   - If the fix introduced duplication or awkwardness, clean it up now.
   - Run tests again to confirm everything is still green.

7. **Regression sweep.** Run the full test suite to ensure nothing else broke.

8. **Report.** Output the structured bug-fix summary.

---

## Output Format

```markdown
## 🐛 Bug Fixed — <short title>

### Root Cause
<1–3 sentence explanation of why the bug happened>

### Reproduction Test
- `<path>` — <test name and what it asserts>

### Fix Applied
- `<path>` — <what changed and why>

### Test Results
- **Total:** N  |  **Passed:** N  |  **Failed:** 0

### Notes
- <anything Jazz should pay attention to during review>
```

---

## Example

**Input:**
```
@ironhide debug BlogPost component crashes when post has no tags
```

**Expected output:**
```markdown
## 🐛 Bug Fixed — BlogPost crashes on tagless posts

### Root Cause
`BlogPost.astro` called `.map()` on `post.tags` without a null check. Posts with no tags have `tags: undefined`, causing a TypeError at render time.

### Reproduction Test
- `src/components/__tests__/BlogPost.test.ts` — "renders without crashing when post has no tags" — passes a post fixture with `tags: undefined` and asserts the component renders without throwing.

### Fix Applied
- `src/components/BlogPost.astro` — added `(post.tags ?? [])` guard before the `.map()` call on line 42.

### Test Results
- **Total:** 14  |  **Passed:** 14  |  **Failed:** 0

### Notes
- Also verified that posts with an empty array `tags: []` render correctly (existing test already covered this).
- Ready for Jazz to review.
```

---

## Anti-patterns

- **Do NOT** fix the bug before writing a test that reproduces it.
- **Do NOT** apply speculative fixes to code that isn't on the bug's code path.
- **Do NOT** delete or weaken existing tests to accommodate the fix.
- **Do NOT** refactor while the reproduction test is still red — fix first, then clean up.
- **Do NOT** close the bug if the test suite has any failures.
- **Do NOT** change configuration files unless the bug is specifically a config issue.
