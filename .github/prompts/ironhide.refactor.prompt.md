---
mode: agent
tools:
  - editFiles
  - codebase
  - terminalLastCommand
  - search
  - readFile
  - listDirectory
  - runCommand
description: Refactor a module or function — tests must pass before and after every change.
---

## Goal

Refactor the specified `<target>` (module, component, or function) to improve code quality **without changing external behaviour**. The test suite is the safety net — it must be green before you start and green when you finish.

---

## Context

You are working in an **Astro + Svelte 5** project (TypeScript, UnoCSS, PostCSS, ESLint). The package manager is **pnpm**.

Key directories:
- `src/pages/` — Astro page routes
- `src/components/` — Astro and Svelte components (Astro `.astro`, Svelte `.svelte`)
- `src/lib/` — Shared utilities and helpers
- `src/layouts/` — Layout components

Common refactoring targets in this project:
- Extracting shared logic from Astro/Svelte components into `src/lib/`
- Breaking large components into smaller, composable ones
- Replacing inline styles with UnoCSS utility classes
- Improving TypeScript type safety (removing `any`, adding interfaces)
- Simplifying complex conditionals or data transformations

---

## Instructions

1. **Identify the target.** Parse the user's `<target>`. Use `readFile` to read the module and all its direct dependents. Use `search` and `usages` to find every import/reference.

2. **Read existing tests.** Find and read all tests that cover the target. If **no tests exist**, stop and inform the user: _"No tests cover this module. Run `@ironhide test <target>` first to establish a safety net before refactoring."_

3. **🟢 Baseline — Run the test suite.**
   - Execute `pnpm test` (or scoped test command).
   - Confirm all tests pass. If any tests are already failing, **stop** and report them — do not begin refactoring on a red suite.

4. **Plan the refactoring.** List the specific changes you will make and why. Common moves:
   - Extract function / component
   - Rename for clarity
   - Remove duplication (DRY)
   - Simplify conditional logic
   - Improve type annotations
   - Reorganize imports

5. **Apply changes incrementally.** Make one refactoring move at a time. After each move:
   - Run the test suite.
   - If any test fails, **undo immediately** and investigate. The refactoring must not change behaviour.

6. **Final verification.** Run the full test suite one last time. Run `pnpm build` to confirm no build regressions.

7. **Report.** Output the structured refactoring summary.

---

## Output Format

```markdown
## ♻️ Refactored — <target>

### Changes Made
1. <change description>
2. <change description>

### Files Modified
- `<path>` — <what changed>

### Test Results (before → after)
- **Before:** Total N | Passed N | Failed 0
- **After:**  Total N | Passed N | Failed 0

### Notes
- <rationale, trade-offs, or follow-up suggestions>
```

---

## Example

**Input:**
```
@ironhide refactor src/components/IntroCard.astro
```

**Expected output:**
```markdown
## ♻️ Refactored — src/components/IntroCard.astro

### Changes Made
1. Extracted social-link rendering into new `SocialLink.astro` component
2. Replaced inline style block with UnoCSS utility classes (`flex`, `gap-2`, `text-sm`)
3. Added TypeScript interface `Props` for component props (was using `Astro.props` untyped)

### Files Modified
- `src/components/IntroCard.astro` — removed inline styles, typed props, extracted social links
- `src/components/SocialLink.astro` — new component (extracted from IntroCard)

### Test Results (before → after)
- **Before:** Total 8 | Passed 8 | Failed 0
- **After:**  Total 8 | Passed 8 | Failed 0

### Notes
- `SocialLink.astro` is now reusable across other cards (e.g. `ContactsCard.astro`).
- No new tests needed — existing tests cover the rendered output, which is unchanged.
```

---

## Anti-patterns

- **Do NOT** start refactoring if the test suite is red — report the failures and stop.
- **Do NOT** refactor code that has zero test coverage — ask the user to run `@ironhide test` first.
- **Do NOT** change external behaviour. If a test fails after a refactoring move, the move was wrong — revert it.
- **Do NOT** combine refactoring with feature work. Refactoring is behaviour-preserving only.
- **Do NOT** make large, sweeping changes in one step — small moves, tested between each.
- **Do NOT** modify files outside the refactoring target unless they are direct dependents that need a matching rename/import update.
