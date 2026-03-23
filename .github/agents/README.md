# Agent Team — Quick Reference

This project uses a team of four VS Code custom agents that cover development: planning, implementation, testing/review, and agent creation.

---

## Agents

### Ultra Magnus — Master Project Planner

Transforms abstract ideas and design documents into structured specs, plans, and task breakdowns.

| Command | Description |
|---|---|
| `@ultramagnus plan <idea or doc>` | Full pipeline — intake questions, then generates `spec.md`, `plan.md`, and `tasks.md` |
| `@ultramagnus intake <idea or doc>` | Clarification interview to surface ambiguities before document generation |
| `@ultramagnus spec <idea or doc>` | Generates only `spec.md` (user stories) |
| `@ultramagnus tasks <idea or doc>` | Generates only `tasks.md` (atomic task tickets) |

**Output:** All files go to `specs/<project-name>-<project-id>/`.

---

### Ironhide — Staff Software Engineer

TDD-first implementer who implements features red-green-refactor style

| Command | Description |
|---|---|
| `@ironhide implement <id>` | Claims a beads task, implements it TDD-style, runs tests, and closes the task |
| `@ironhide debug <description>` | Investigates and fixes a bug — writes a failing test first, then fixes |
| `@ironhide refactor <target>` | Refactors a module or function — ensures tests pass before and after |
| `@ironhide test <target>` | Writes or fixes tests for a module/function without changing production code |

**TDD Cycle:** Red (failing test) → Green (minimal code to pass) → Refactor (clean up).

---

### Jazz — Test Architect & Code Reviewer

Ensures every line of production code is tested, every test maps to a requirement, and code quality meets staff-level standards.

| Command | Description |
|---|---|
| `@jazz trace <spec or folder>` | Maps tests to spec stories and task acceptance criteria — generates a traceability report |
| `@jazz review <file or folder>` | Code review for correctness, security, patterns, and conventions — generates a review report |
| `@jazz coverage <target>` | Runs coverage analysis, identifies untested code paths — generates a coverage report |

**Output:** Reports go to `specs/<project-id>/reports/`.

---

### Optimus Prime — Master Prompt Engineer

Designs and scaffolds new agents — agent files, task-specific prompts, and output templates — in one shot.

| Command | Description |
|---|---|
| `@optimus create agent <description>` | Scaffolds a complete agent: `.agent.md`, all `.prompt.md` files, and any `template.md` files |
| `@optimus design workflow <description>` | Plans a multi-agent pipeline with handoffs, then scaffolds every agent |
| `@optimus audit <agent name or path>` | Reviews an existing agent against the scaffold standard and suggests fixes |
| `@optimus list` | Lists all agents, prompts, and templates in the workspace |

---

## Common Development Workflow

The agents are designed to chain together through the full lifecycle of a feature. Here is the typical workflow:

```
     Ultra Magnus    Ironhide        Jazz
   │              │              │              │
   │ create tasks │              │              │
   ├─────────────►│ sync tasks   │              │
   │              ├─────────────►│ implement    │
   │              │              ├─────────────►│ review & trace
   │              │              │◄─────────────┤ (findings)
   │              │              │ fix issues   │
   │              │◄─────────────┤ close task   │
   │              │              │              │
```

### 1. Plan the Feature

Start with Ultra Magnus to turn an idea into actionable artifacts:

```
@ultramagnus plan <your idea or design doc>
```

Ultra Magnus will ask clarification questions if needed, then produce `spec.md`, `plan.md`, and `tasks.md` in the `specs/` folder.


### 3. Implement a Task

Hand a ready task to Ironhide for TDD implementation:

```
@ironhide implement <task-id>
```

Ironhide claims the task, writes failing tests, implements the code, verifies all tests pass, and closes the task in beads.

### 4. Review & Validate

After implementation, bring in Jazz to verify quality:

```
@jazz review src/app/
@jazz trace <spec-folder>
@jazz coverage src/app/
```

Jazz produces reports highlighting code issues, uncovered requirements, and coverage gaps.

### 5. Fix Any Issues

If Jazz surfaces problems, send them back to Ironhide:

```
@ironhide debug <issue description>
```

### 6. Repeat

Continue the loop of `@ironhide implement` → `@jazz review` — until all tasks are closed.

---

## Ad-Hoc Commands

Not every interaction needs the full workflow. Common standalone uses:

- **Quick bug fix:** `@ironhide debug <description>` — no beads task needed
- **Refactor:** `@ironhide refactor <target>` — works independently of task tracking
- **Code review:** `@jazz review <file>` — review any code at any time
- **New agent:** `@optimus create agent <description>` — spin up a new agent on demand

---

## Agent Handoffs

Agents can hand off to each other directly. Key handoff paths:

| From         | To           | Trigger |
|--------------|--------------|---------|
| Ultra Magnus | Ironhide     | After generating tasks, hand them to ironhide for implementation |
| Ironhide     | Jazz         | After implementation — close the completed task |
| Jazz         | Ironhide     | Issues found that need fixing or tests that need writing |
| Optimus Prime| Any          | After creating a new agent — test it with a representative task |