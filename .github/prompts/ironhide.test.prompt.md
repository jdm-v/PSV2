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
description: Write or improve tests for a module or function — no production code changes.
---

## Goal

Analyse the specified `<target>` and write comprehensive tests that cover its behaviour — **without modifying any production code**. This task increases coverage and establishes a safety net for future changes.

---

## Context

You are working in an **Astro + Svelte 5** project (TypeScript, UnoCSS, PostCSS, ESLint). The package manager is **pnpm**.

Key directories:
- `src/pages/` — Astro page routes
- `src/components/` — Astro and Svelte components
- `src/lib/` — Shared utilities and helpers
- `src/layouts/` — Layout components

When writing tests, follow the project's existing test conventions. If no test infrastructure exists yet, set it up using **Vitest** (the standard for Vite-based projects like Astro) and configure it appropriately.

---

## Instructions

1. **Read the target.** Use `readFile` to load the module, component, or function the user specified. Understand every code path, branch, edge case, and export.

2. **Find existing tests.** Use `search` to locate any tests already written for this target. Read them to understand what is already covered and identify gaps.

3. **Analyse coverage gaps.** Map out:
   - **Happy paths** — normal expected usage
   - **Edge cases** — empty inputs, null/undefined, boundary values
   - **Error paths** — what should throw, reject, or return error states
   - **Integration points** — how this module interacts with its dependencies

4. **Plan the test cases.** List every test case you intend to write before writing any code. Group them logically (e.g., by function, by scenario).

5. **Write the tests.**
   - Create the test file in the appropriate location (co-located `__tests__/` directory or adjacent `.test.ts` file — match existing convention).
   - Use descriptive `describe` / `it` blocks.
   - Each test should be independent — no shared mutable state.
   - Mock external dependencies (fetch calls, file system, etc.) where necessary.
   - Use TypeScript for type safety in test code.

6. **Run the tests.** Execute `pnpm test` to confirm all new tests pass against the *current* production code. If any test fails, it means your test expectation is wrong (since you are not allowed to change production code) — fix the test.

7. **Report.** Output the structured test-writing summary.

---

## Output Format

```markdown
## 🧪 Tests Written — <target>

### Test File
- `<path>` — <new or modified>

### Cases Added
| # | Test name | What it covers |
|---|---|---|
| 1 | `<describe> > <it>` | <short description> |
| 2 | `<describe> > <it>` | <short description> |

### Coverage Improvement
- **Paths covered:** <list of code paths now tested>
- **Known gaps remaining:** <any paths intentionally left uncovered and why>

### Test Results
- **Total:** N  |  **Passed:** N  |  **Failed:** 0

### Notes
- <anything noteworthy about the tests or test setup>
```

---

## Example

**Input:**
```
@ironhide test src/lib/readingTime.ts
```

**Expected output:**
```markdown
## 🧪 Tests Written — src/lib/readingTime.ts

### Test File
- `src/lib/__tests__/readingTime.test.ts` — new file

### Cases Added
| # | Test name | What it covers |
|---|---|---|
| 1 | `readingTime > returns "1 min read" for short text` | Texts under 200 words round up to 1 min |
| 2 | `readingTime > returns "5 min read" for ~1000 word text` | Standard-length article calculation |
| 3 | `readingTime > returns "1 min read" for empty string` | Edge case: empty input |
| 4 | `readingTime > handles text with only whitespace` | Edge case: whitespace-only input |
| 5 | `readingTime > handles text with markdown syntax` | Markdown characters don't inflate word count |

### Coverage Improvement
- **Paths covered:** short text, medium text, empty string, whitespace-only, markdown content
- **Known gaps remaining:** None — all branches covered.

### Test Results
- **Total:** 5  |  **Passed:** 5  |  **Failed:** 0

### Notes
- Used Vitest with `describe` / `it` blocks.
- No mocks needed — `readingTime()` is a pure function.
```

---

## Anti-patterns

- **Do NOT** modify production code. This task is tests-only. If you find a bug while writing tests, document it in the Notes section and suggest `@ironhide debug` as a follow-up.
- **Do NOT** write tests that depend on execution order or shared mutable state.
- **Do NOT** write trivial tests that only assert `true === true` — every test must exercise real code.
- **Do NOT** test implementation details (private functions, internal state) — test the public API and observable behaviour.
- **Do NOT** skip edge cases. Empty inputs, null values, and boundary conditions are mandatory.
- **Do NOT** leave failing tests. If a test fails, your expectation is wrong — the production code is the source of truth in this task.
