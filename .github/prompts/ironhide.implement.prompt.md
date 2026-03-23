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
description: Implement a feature or task using strict TDD — red, green, refactor.
---

## Goal

Implement the requested feature or task by following the **Red → Green → Refactor** TDD cycle. Every line of production code must be justified by a failing test first.

---

## Context

You are working in an **Astro + Svelte 5** project (TypeScript, UnoCSS, PostCSS, ESLint). The package manager is **pnpm**.

Key directories:
- `src/pages/` — Astro page routes
- `src/components/` — Astro and Svelte components
- `src/lib/` — Shared utilities and helpers
- `src/data/` — Data files and content
- `src/layouts/` — Layout components

Before writing any code, scan the codebase to understand:
- Where the feature belongs architecturally
- Which existing modules it touches or depends on
- What test infrastructure already exists (test runner, helpers, fixtures)
- Existing naming conventions and file organization

---

## Instructions

1. **Read & understand the task.** Parse the user's `<task>` description. Identify acceptance criteria — what must be true when the task is done.

2. **Discover context.** Use `codebase`, `search`, and `readFile` to explore the relevant source files, existing tests, and related modules. Map out dependencies.

3. **Plan the implementation.** Break the task into small, testable increments. Each increment follows one red-green-refactor cycle. List the increments before coding.

4. **🔴 RED — Write a failing test.**
   - Create or open the appropriate test file (co-located with the source or in `__tests__/`).
   - Write a single, focused test that captures the *next* increment of expected behaviour.
   - Run tests with `pnpm test` (or the project's test command) to confirm the new test **fails**.

5. **🟢 GREEN — Write minimal production code.**
   - Write the smallest amount of code that makes the failing test pass.
   - Do not add logic beyond what the test requires.
   - Run tests to confirm the new test **passes** and no existing tests broke.

6. **🔵 REFACTOR — Clean up.**
   - Improve code quality: extract helpers, rename variables, remove duplication.
   - Run tests again to confirm everything still passes.

7. **Repeat steps 4–6** for each planned increment until all acceptance criteria are met.

8. **Final verification.** Run the full test suite. Confirm zero failures. Run `pnpm build` if the task involves build-affecting changes.

9. **Report.** Output the structured task-complete summary (see Output Format below).

---

## Output Format

```markdown
## ✅ Task Complete — <task title>

**Cycle:** Red → Green → Refactor

### Tests Written / Modified
- `<path>` — <what was added/changed>

### Production Code Changed
- `<path>` — <what was added/changed>

### Test Results
- **Total:** N  |  **Passed:** N  |  **Failed:** 0

### Notes
- <caveats, follow-ups, or handoff context>
```

---

## Example

**Input:**
```
@ironhide implement Add a "reading time" badge to BlogPost component
```

**Expected output:**
```markdown
## ✅ Task Complete — Add "reading time" badge to BlogPost

**Cycle:** Red → Green → Refactor

### Tests Written / Modified
- `src/components/__tests__/BlogPost.test.ts` — added 3 cases: renders reading time, handles short posts, handles empty content

### Production Code Changed
- `src/components/BlogPost.astro` — added `<span class="reading-time">` badge using `readingTime()` util
- `src/lib/readingTime.ts` — new pure function `readingTime(text: string): string`

### Test Results
- **Total:** 12  |  **Passed:** 12  |  **Failed:** 0

### Notes
- `readingTime()` rounds up to nearest minute. Minimum shown is "1 min read".
- Ready for Jazz to review.
```

---

## Anti-patterns

- **Do NOT** write production code before a failing test exists for it.
- **Do NOT** write multiple features in a single red-green cycle — one increment at a time.
- **Do NOT** skip running tests between phases. Every phase boundary requires a test run.
- **Do NOT** modify files unrelated to the task.
- **Do NOT** delete or skip failing tests to make the suite green.
- **Do NOT** add dependencies to `package.json` without explicit user approval.
- **Do NOT** refactor while tests are red — get to green first, then refactor.
