<!-- 
  ultramagnus-task-plan.template.md
  ─────────────────────────────────
  Output template for UltraMagnus full task plans.
  Used by: ultramagnus-sequence-tasks.prompt.md
  Produced by: @ultramagnus plan <feature>
  
  Fill every section. Delete placeholder comments before handoff.
  Do not add sections. Do not remove sections.
-->

# Task Plan: <!-- Feature Name -->

> **Project:** PSV2 — Astro + Svelte + UnoCSS + TypeScript  
> **Planned by:** UltraMagnus  
> **Date:** <!-- YYYY-MM-DD -->  
> **Status:** `Draft` | `Ready for Handoff` | `In Progress` | `Complete`

---

## Feature Restatement

<!-- One sentence. What this feature does and for whom. -->

---

## Planning Assumptions

<!-- List every assumption made during analysis. If none, write "None." -->
<!-- An engineering agent reading this must know what was assumed so they can flag wrong assumptions early. -->

- 

---

## Risks & Constraints

<!-- Risks surfaced during codebase analysis. Engineering agent must be aware of these before starting. -->

- 

---

## Phase Overview

| Phase | Name | Tasks | Notes |
|---|---|---|---|
| 1 | <!-- e.g. Foundation --> | <!-- UM-001, UM-002 --> | <!-- e.g. No dependencies; can start immediately --> |
| 2 | <!-- e.g. Components --> | <!-- UM-003, UM-004 --> | <!-- --> |
<!-- Add rows as needed. Maximum 6 phases. -->

---

## Tasks

<!-- ═══════════════════════════════════════════════════════════════════ -->
<!-- PHASE 1                                                             -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

### 🏗️ Phase 1 — <!-- Phase Name -->

---

#### UM-001: <!-- Short Title -->

| Field | Value |
|---|---|
| **Type** | <!-- feat \| refactor \| style \| config \| test \| content --> |
| **Target files** | <!-- src/... (comma-separated, relative to project root) --> |
| **Depends on** | <!-- UM-XXX, UM-YYY or `none` --> |
| **Parallelizable with** | <!-- UM-XXX or `none` --> |

**Description**  
<!-- 2–5 sentences. What to build, what problem it solves, what codebase findings make this necessary. -->

**Implementation hints**
- <!-- Concrete, codebase-grounded hint. Reference specific files, APIs, token names, import paths. -->
- <!-- e.g. "Extend the `blog` collection schema in `src/content.config.ts` using `rssSchema` as the base." -->
- <!-- e.g. "Use `primary-500` (#3939e6) for the active state — do not add a new token." -->

**Acceptance criteria**
1. <!-- Observable/testable condition in browser or type-checker. -->
2. 
3. 
<!-- 3–6 items -->

**Do NOT**
- <!-- Explicit prohibition. e.g. "Do not create a new CSS file — use UnoCSS utilities only." -->

---

<!-- ═══════════════════════════════════════════════════════════════════ -->
<!-- PHASE 2                                                             -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

### 🧩 Phase 2 — <!-- Phase Name -->

---

#### UM-002: <!-- Short Title -->

| Field | Value |
|---|---|
| **Type** | <!-- feat \| refactor \| style \| config \| test \| content --> |
| **Target files** | <!-- src/... --> |
| **Depends on** | <!-- UM-XXX or `none` --> |
| **Parallelizable with** | <!-- UM-XXX or `none` --> |

**Description**  
<!-- 2–5 sentences. -->

**Implementation hints**
- 
- 

**Acceptance criteria**
1. 
2. 
3. 

**Do NOT**
- 

---

<!-- 
  REPEAT THE TASK BLOCK ABOVE FOR EACH ADDITIONAL TASK.
  Phase header (### 🔷 Phase N — Name) appears once per phase.
  Task block (#### UM-NNN) appears once per task.
  Maximum 12 task blocks total across all phases.
-->

---

## Handoff Checklist

Before passing this plan to an engineering agent, confirm:

- [ ] All planning assumptions have been reviewed and are correct
- [ ] All target files exist in the codebase (or their creation is covered by a `feat`-type task)
- [ ] Every `Depends on` chain has been validated (no cycles)
- [ ] Parallelizable tasks have been confirmed to share no target files
- [ ] A UnoCSS scan will pick up all new class names (files are within `uno.config.ts` content globs)
- [ ] Dark-mode variants are specified for every color-bearing element
- [ ] `client:*` directives are specified for every Svelte / SolidJS component task
- [ ] The plan has been validated with `@ultramagnus validate` (attach validation report below)

---

## Validation Report

<!-- Paste the output of `@ultramagnus validate` here once run. -->

Pending — run `@ultramagnus validate` before handoff.

---

## Change Log

| Date | Author | Change |
|---|---|---|
| <!-- YYYY-MM-DD --> | UltraMagnus | Initial plan generated |
