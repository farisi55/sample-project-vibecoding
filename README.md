# Vibe Coding Flow

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-stable-brightgreen)
![Compatibility](https://img.shields.io/badge/tools-Cursor%20%7C%20Windsurf%20%7C%20Cline-orange)
![Language](https://img.shields.io/badge/prompts-English-lightgrey)

A structured, repeatable prompt system for AI-assisted software development.
Five prompts — one idea in, one production-ready codebase out.

> **No more vague "write me an app" prompts.**
> Each step produces a versioned, auditable document that feeds the next.
> Every task carries security and scalability gates that escalate as your project grows.

---

## How It Works

```
Your Idea
    │
    ▼  Claude.ai / ChatGPT
  P00  PRD Generator          → prd.md          (approved by you)
    │
    ▼  Cursor / Windsurf / Cline
  P01  PRD → Knowledge        → knowledge.md     (AI agent rulebook)
    │
    ▼
  P02  Knowledge → Changelog  → changelog.md     (atomic task queue)
    │
    ▼
  P03  Execute Task #001       → first code       (manual review gate)
    │
    ▼
  P04  Looping Executor        → full codebase    (security + scalability loop)
    │
    ▼
  Final Project Health Report
```

---

## Prompt Overview

| #   | Prompt                     | Input                       | Output                        | Run In                    | Est. Time |
| --- | -------------------------- | --------------------------- | ----------------------------- | ------------------------- | --------- |
| P00 | PRD Generator              | Your brief                  | `prd.md`                      | Claude.ai / ChatGPT       | 15–30 min |
| P01 | PRD → Knowledge            | `@prd`                      | `knowledge.md`                | Cursor / Windsurf / Cline | ~2 min    |
| P02 | Knowledge → Changelog      | `@knowledge`                | `changelog.md`                | Cursor / Windsurf / Cline | ~3 min    |
| P03 | Execute Task (single-shot) | `@knowledge` + `@changelog` | Code + changelog update       | Cursor / Windsurf / Cline | 10–30 min |
| P04 | Looping Executor           | `@knowledge` + `@changelog` | Full codebase + Health Report | Cursor / Windsurf / Cline | Varies    |

---

## Quick Start

**1. Generate your PRD**

Open Claude.ai or ChatGPT. Copy **Prompt 00** from `vibe-coding-flow-complete.md`.
Fill in the Brief Template (project name, features, tech stack, constraints).
Iterate until the PRD self-check shows all ✅. Save output as `prd.md`.

**2. Extract the Knowledge Base**

In your AI coding agent, run **Prompt 01** with `@prd.md` referenced.
`knowledge.md` is created — the agent's single source of truth for all subsequent steps.

**3. Generate the Task Changelog**

Run **Prompt 02** with `@knowledge.md` referenced.
`changelog.md` is created with all tasks broken into atomic, phase-ordered entries.
Review and adjust the task list before proceeding.

**4. Execute Task #001**

Run **Prompt 03** with `@knowledge.md` and `@changelog.md` referenced.
The agent scaffolds the project and updates `changelog.md`.
Review the output before triggering the loop.

**5. Run the Automation Loop**

Run **Prompt 04** with `@knowledge.md` and `@changelog.md` referenced.
The agent executes all remaining tasks, applying quality gates per phase.
A Final Project Health Report is generated when the queue is empty.

---

## Repository Structure

```
.
├── README.md                        ← you are here
└── vibe-coding-flow-complete.md     ← all 5 prompts + appendices (start here)
```

**Project files generated during the flow:**

```
your-project/
├── prd.md           ← created by you via P00
├── knowledge.md     ← created by P01
├── changelog.md     ← created by P02, updated by P03 and P04
└── src/             ← code written by P03 and P04
```

---

## File Reference Syntax by Tool

| Tool      | Syntax      | Notes                      |
| --------- | ----------- | -------------------------- |
| Cursor    | `@prd.md`   | @ mention in composer      |
| Windsurf  | `@prd.md`   | @ mention in cascade       |
| Cline     | `@/prd.md`  | relative to workspace root |
| Claude.ai | Attach file | P00 only — human-facing    |
| ChatGPT   | Attach file | P00 only — human-facing    |

---

## What Makes This Different

**Versioned traceability**
Every document carries a version number linked to its source.
`changelog.md` knows which `knowledge.md` version it was built from.
PRD updates mid-project don't silently break your task list.

**Phase-aware quality gates**
Prompt 04 applies escalating checks per development phase:

| Phase         | Security | Scalability | Regression |
| ------------- | -------- | ----------- | ---------- |
| Foundation    | Basic    | Basic       | —          |
| Domain & Data | Standard | Standard    | ✅         |
| Core Features | Standard | Standard    | ✅         |
| Integration   | **Full** | **Full**    | ✅         |
| UI/UX         | Standard | Basic       | ✅         |
| Testing & QA  | **Full** | Standard    | ✅         |
| Deployment    | **Full** | **Full**    | ✅         |

**Failure-safe execution**
Tasks that fail after 2 retries produce a structured FAILED report with root cause and
required developer action — the loop halts cleanly instead of writing broken code forward.

**Dependency enforcement**
No task executes if its upstream dependencies are not in `[COMPLETED]`.
A `BLOCKED` state surfaces the issue immediately.

---

## When to Use Which Prompt

| Situation                                  | Prompt                                          |
| ------------------------------------------ | ----------------------------------------------- |
| Starting from a new idea                   | P00 → P01 → P02 → P03 → P04                     |
| Resuming an interrupted loop               | P04 (resumes from current `[IN PROGRESS]`)      |
| Debugging one specific failing task        | P03                                             |
| Re-running a FAILED task after manual fix  | P03                                             |
| Adding new features to an existing project | Update `prd.md` → re-run P01 → append P02 → P04 |
| Only need a structured PRD (no coding yet) | P00 only                                        |

---

## Handling Problems

| Problem                      | Resolution                                                                              |
| ---------------------------- | --------------------------------------------------------------------------------------- |
| Task FAILED after 2 retries  | Read `[COMPLETED]` error entry → fix manually → restore to `[IN PROGRESS]` → re-run P03 |
| Loop BLOCKED                 | Execute missing dependency task with P03, then re-run P04                               |
| Session interrupted          | Re-run P04 — it reads current `[IN PROGRESS]` and resumes                               |
| PRD changed mid-project      | See **Appendix B** in `vibe-coding-flow-complete.md`                                    |
| `knowledge_version` mismatch | Re-run P01 → update `knowledge_version` in `changelog.md` → continue                    |

---

## Compatibility

Tested prompt patterns with:

- **Cursor** (composer mode)
- **Windsurf** (cascade mode)
- **Cline** (VS Code extension)
- **Claude.ai** (web — P00 only)
- **ChatGPT** (web — P00 only)

Prompts are model-agnostic. Works with Claude Sonnet, GPT-4o, Gemini, and other
instruction-following models used inside coding agents.

---

## Document Reference

| Document                       | Purpose                                           |
| ------------------------------ | ------------------------------------------------- |
| `README.md`                    | Overview and quick reference (this file)          |
| `vibe-coding-flow-complete.md` | All 5 prompts, full appendices, recovery playbook |

---

## Revision History

| Version | Date       | Notes           |
| ------- | ---------- | --------------- |
| 1.0.0   | 2025-06-28 | Initial release |
