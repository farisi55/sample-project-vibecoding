---
doc_id: VCF-BUNDLE-001
version: 1.0.0
status: stable
created: 2025-06-28
compatibility: Cursor · Windsurf · Cline · Claude.ai · ChatGPT · Any AI Coding Agent
language: English
---

# Vibe Coding Flow — Complete Prompt Collection

A structured, reusable prompt system for AI-assisted software development.
Five prompts that take a raw idea to a fully implemented, security-reviewed codebase
through a consistent, auditable loop.

---

## Table of Contents

1. [Flow Architecture](#1-flow-architecture)
2. [Quick Start](#2-quick-start)
3. [Tool Compatibility & File References](#3-tool-compatibility--file-references)
4. [Traceability Chain](#4-traceability-chain)
5. [PROMPT 00 — PRD Generator](#5-prompt-00--prd-generator)
6. [PROMPT 01 — PRD → Knowledge](#6-prompt-01--prd--knowledge)
7. [PROMPT 02 — Knowledge → Changelog](#7-prompt-02--knowledge--changelog)
8. [PROMPT 03 — Execute Current Task](#8-prompt-03--execute-current-task-single-shot)
9. [PROMPT 04 — Looping Task Executor](#9-prompt-04--progressive-looping-task-executor)
10. [Appendix A — Prompt Selection Guide](#appendix-a--prompt-selection-guide)
11. [Appendix B — PRD Update Mid-Flow](#appendix-b--handling-prd-updates-mid-flow)
12. [Appendix C — Recovery Playbook](#appendix-c--recovery-playbook)

---

## 1. Flow Architecture

```
                    ┌─────────────────────────────────────────────┐
                    │           VIBE CODING FLOW v1.0             │
                    └─────────────────────────────────────────────┘

  [Developer's Idea]
        │
        ▼  Claude.ai / ChatGPT
  ┌─────────────┐
  │  PROMPT 00  │  PRD Generator
  │  (human-    │  → Elicits tech stack, features, constraints
  │   facing)   │  → Outputs structured prd.md
  └──────┬──────┘
         │  Review & approve prd.md
         ▼  Cursor / Windsurf / Cline
  ┌─────────────┐
  │  PROMPT 01  │  PRD → Knowledge
  │             │  → Extracts 9 technical sections
  │             │  → Outputs knowledge.md (AI-agent rulebook)
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │  PROMPT 02  │  Knowledge → Changelog
  │             │  → Derives phases from architecture
  │             │  → Breaks features into atomic tasks
  │             │  → Outputs changelog.md (master task tracker)
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │  PROMPT 03  │  Execute Current Task (single-shot)
  │             │  → Runs Task #001 with full verbosity
  │             │  → 5-step protocol: read → check → execute → verify → update
  │             │  → Developer reviews output before continuing
  └──────┬──────┘
         │  Task #001 passed ✅
         ▼
  ┌─────────────┐
  │  PROMPT 04  │  Progressive Looping Task Executor
  │             │  → Runs Task #002 → #NNN in automated loop
  │             │  → Phase-aware quality gates (Basic/Standard/Full)
  │             │  → Security + scalability checks escalate per phase
  │             │  → Outputs Final Project Health Report
  └──────┬──────┘
         │
         ▼
  [Codebase complete — ready for manual QA & deployment]
```

---

## 2. Quick Start

**First time using this flow? Follow these steps in order.**

**Step 1 — Generate your PRD** *(~15–30 min)*

Open Claude.ai or ChatGPT. Copy Prompt 00 from section 5.
Fill in the Brief Template at the top, paste it into the prompt, and run.
Iterate until the PRD self-check is fully ✅.
Save the output as `prd.md` in your project root.

**Step 2 — Extract the Knowledge Base** *(~2 min)*

Open your AI coding agent (Cursor, Windsurf, Cline).
Copy Prompt 01 from section 6. Run it with `@prd` referenced.
A `knowledge.md` file is created. Review it briefly — this is your agent's rulebook.

**Step 3 — Generate the Task Changelog** *(~3 min)*

Copy Prompt 02 from section 7. Run it with `@knowledge` referenced.
A `changelog.md` is created with all tasks organized by phase.
Review the task list — add, remove, or reorder tasks if needed before proceeding.

**Step 4 — Execute Task #001** *(~10–30 min)*

Copy Prompt 03 from section 8. Run it with `@knowledge` and `@changelog` referenced.
The agent executes Task #001 (project scaffolding) and updates `changelog.md`.
Review the output. If OK, proceed. If FAILED, follow Appendix C.

**Step 5 — Run the Automation Loop** *(time varies by task count)*

Copy Prompt 04 from section 9. Run it with `@knowledge` and `@changelog` referenced.
The agent loops through all remaining tasks, applying escalating quality gates.
When the queue is empty, a Final Project Health Report is generated.

---

## 3. Tool Compatibility & File References

This flow uses `@prd`, `@knowledge`, and `@changelog` as placeholders.
Replace them with the correct syntax for your tool:

| Tool | File reference syntax | Notes |
|---|---|---|
| Cursor | `@prd.md`, `@knowledge.md`, `@changelog.md` | Use @ mention in chat |
| Windsurf | `@prd.md`, `@knowledge.md`, `@changelog.md` | Use @ mention in chat |
| Cline | `@/path/to/prd.md` | Supports relative paths from workspace root |
| Claude.ai | Attach file or paste content directly | Use for Prompt 00 only |
| ChatGPT | Attach file or paste content directly | Use for Prompt 00 only |

**Recommended file locations in your project:**
```
project-root/
├── prd.md           ← generated by Prompt 00, input for Prompt 01
├── knowledge.md     ← generated by Prompt 01, input for Prompts 02–04
├── changelog.md     ← generated by Prompt 02, updated by Prompts 03–04
└── src/             ← code generated by Prompts 03–04
```

---

## 4. Traceability Chain

Every document in this flow carries a version that links it to its source:

```
prd.md
  doc_id: PRD-[SLUG]-001
  version: 1.0.0
      │
      ▼
knowledge.md
  source: prd
  version: 1.0.0        ← must match prd.md version
      │
      ▼
changelog.md
  knowledge_version: 1.0.0   ← must match knowledge.md version
  changelog_version: 1.0.0   ← increments with each completed task
  status: in_progress
      │
      ├─ Task #001 done → changelog_version: 1.0.1
      ├─ Task #002 done → changelog_version: 1.0.2
      └─ Task #NNN done → changelog_version: 1.0.N, status: complete
```

**Version mismatch = stale document.** If `knowledge_version` in `changelog.md`
does not match the version in `knowledge.md`, re-run Prompt 02 before continuing.

---

## 5. PROMPT 00 — PRD Generator

> **Run in:** Claude.ai or ChatGPT (requires back-and-forth with developer)
> **Input:** Developer's brief or filled Brief Template below
> **Output:** `prd.md` — structured PRD ready for Prompt 01
> **Time:** 15–30 minutes including review

### Brief Template

Fill this before running the prompt. The more you fill in, the less back-and-forth:

```
PROJECT NAME: [e.g., "HazanaShop" / "CashTrackr API"]

ONE-LINE PURPOSE: [What does it do and for whom?]

PRIMARY USERS: [Who uses this?]

CORE FEATURES (list 3–7):
  1.
  2.
  3.

TECH STACK PREFERENCES:
  - Language/Runtime:
  - Framework:
  - Database:
  - Hosting/Infra:
  - Key third-party services:

DEPLOYMENT TARGET: [e.g., Cloudflare Workers, Railway, VPS, Vercel]

HARD CONSTRAINTS (non-negotiable):
  - [e.g., "free tier only", "no Docker", "must be in TypeScript"]

OUT OF SCOPE:
  - [e.g., "no mobile app", "no payment in v1"]
```

### Prompt 00 (copy-paste ready)

```
# Role
You are a senior product architect and technical documentation specialist.
Your task is to produce a structured, AI-agent-ready Product Requirements Document (PRD)
from the developer's brief below.

This PRD will be the foundation of an automated vibe coding flow:
  PRD → Knowledge → Changelog → Task Execution → Loop

A poorly structured PRD cascades into broken knowledge, wrong tasks, and
incorrect code generation. Precision and completeness are the top priority.

# Developer's Brief
[PASTE YOUR BRIEF OR FILLED TEMPLATE HERE]

---

# Mode Detection — Run This Assessment First
Before generating anything, evaluate the brief against these 5 axes:

| Axis | Sufficient if... | Status |
|---|---|---|
| Project identity | Name + purpose + users clearly stated | [✓ / MISSING] |
| Tech stack | Language, framework, database all specified | [✓ / MISSING] |
| Feature list | At least 3 features described with some detail | [✓ / MISSING] |
| Deployment target | Where code will run is stated | [✓ / MISSING] |
| Constraints | At least one hard constraint or out-of-scope stated | [✓ / MISSING] |

If 3 or more axes are MISSING → enter Discovery Mode.
If 2 or fewer axes are MISSING → enter Enrichment Mode.

State your mode selection before generating output.

---

# Discovery Mode — If Selected
Output these 5 targeted questions. Wait for answers before generating the PRD.

  1. TECH STACK: What language, framework, and database will this project use?
  2. FEATURES: List the 3–5 most important features in priority order.
     For each: what it does, who uses it, what "done" looks like.
  3. USERS: Who are the primary users and what is their main goal?
  4. DEPLOYMENT: Where will this run? Any infrastructure constraints?
  5. CONSTRAINTS: What must NOT be in this project?

After receiving answers, proceed to generate the full PRD.

---

# Enrichment Mode — If Selected
Generate the full PRD immediately.
For any undecided item, do NOT fabricate a choice. Instead mark it as:
  [ASSUMED: {recommendation}] — for inferred decisions you are confident about
  [DECISION NEEDED: Option A / Option B] — for genuine open questions

---

# PRD Output Template

Generate the PRD file using this exact structure:

---
doc_id: PRD-[PROJECT_SLUG]-001
version: 1.0.0
status: draft
created: [today's date]
last_updated: [today's date]
flow_compatibility: vibe-coding-v1
---

# [PROJECT NAME] — Product Requirements Document

## 1. Executive Summary
- **Problem:** [one sentence]
- **Solution:** [one sentence]
- **Success metric:** [one measurable KPI]
- **MVP deadline:** [if known / "not specified"]

## 2. Users & Context
- **Primary users:** [who they are]
- **User goal:** [what they want to achieve]
- **Current pain:** [what is broken without this product]
- **Environment:** [web browser / mobile / CLI / API consumer]

## 3. Scope
### 3.1 In-Scope Features
| Feature | Priority | Description |
|---|---|---|
| [Feature A] | P0 — MVP | [what it does] |
| [Feature B] | P1 | [what it does] |

Priority: P0 = must-have / P1 = important / P2 = nice-to-have

### 3.2 Out of Scope (explicit)
- [what is intentionally NOT being built]

### 3.3 Future Considerations
- [valid ideas deferred to later]

## 4. Technical Specification

### 4.1 Tech Stack
- **Language & Runtime:** [e.g., TypeScript 5.3 / Node.js 20 LTS]
- **Framework:** [e.g., Hono 4.x / Express 5 / NestJS 10]
- **Database:** [e.g., PostgreSQL 16 / SQLite]
- **ORM / Query builder:** [e.g., Drizzle / Prisma / Raw SQL]
- **Cache:** [e.g., Redis 7 / Upstash / none]
- **Infrastructure:** [e.g., Cloudflare Workers / Railway / VPS]
- **Key third-party services:** [e.g., Stripe, Midtrans, SendGrid]
- **Frontend (if applicable):** [e.g., React 18 + Vite 5 / none]

### 4.2 Architecture
- **Pattern:** [e.g., Layered MVC / Hexagonal / Serverless functions]
- **Module structure:**
  ```
  [describe intended folder tree]
  ```
- **Key design patterns:** [e.g., Repository, Factory, CQRS]
- **Data flow:** [e.g., client → API → service layer → repository → DB]

### 4.3 Code Standards
- **Naming — files:** [e.g., kebab-case]
- **Naming — functions:** [e.g., camelCase]
- **Naming — classes/types:** [e.g., PascalCase]
- **Formatter:** [e.g., Prettier / Black]
- **Linter:** [e.g., ESLint + @typescript-eslint / Pylint]
- **Testing framework:** [e.g., Vitest / Jest / Pytest]
- **Test coverage target:** [e.g., 80% on domain layer]
- **Error handling:** [e.g., try-catch at controller boundary / Result type]

### 4.4 API Design
- **API type:** [REST / GraphQL / tRPC / none]
- **Base URL pattern:** [e.g., /api/v1/]
- **Authentication method:** [e.g., JWT Bearer HS256 / API Key / OAuth2]
- **Response envelope:** [e.g., { data, error, meta }]
- **Error format:** [e.g., { code, message, details }]
- **Pagination:** [e.g., cursor-based / offset / none]

### 4.5 Data Model
- **Core entities:** [list each with key fields]
- **Key relationships:** [e.g., User 1:N Transaction]
- **Storage strategy:** [relational / document / hybrid]

## 5. Feature Specifications

### Feature: [Feature Name]
- **User story:** As a [role], I want to [action], so that [outcome]
- **Acceptance criteria:**
  - [ ] [specific, testable criterion]
  - [ ] [specific, testable criterion]
- **Business rules:** [domain constraints, formulas, validations]
- **UI notes:** [key screens or interactions — omit if no UI]
- **Priority:** P0 | P1 | P2

[Repeat per feature — minimum 3]

## 6. Non-Functional Requirements

### 6.1 Performance
- API response time: [e.g., P95 < 300ms]
- Concurrent users (initial): [e.g., 50]
- Concurrent users (6-month target): [e.g., 5,000]

### 6.2 Security
- Auth standard: [e.g., JWT HS256, 1h expiry]
- Password hashing: [e.g., bcrypt cost 12]
- PII handling: [e.g., no PII in logs, GDPR delete right]
- Session: [e.g., 24h access token, 7d refresh with rotation]

### 6.3 Scalability
- Growth expectation: [e.g., 10x in 12 months]
- Scaling strategy: [e.g., serverless auto-scale / horizontal]
- Caching: [e.g., Redis TTL for hot data]
- DB scaling: [e.g., read replicas at 50K DAU]

### 6.4 Compliance
- Standards: [e.g., WCAG 2.1 AA / not applicable]
- Regulations: [e.g., UU PDP Indonesia / GDPR / none]

## 7. Environment & Configuration
- **Environments:** [dev / staging / prod]
- **Required env vars (names only):**
  - [e.g., DATABASE_URL, JWT_SECRET, STRIPE_KEY]
- **Feature flags:** [e.g., ENABLE_PAYMENTS / none]
- **CI/CD:** [e.g., GitHub Actions → Railway]
- **Health check:** [e.g., GET /health → 200 OK]

## 8. Constraints & Anti-patterns

### Technical Constraints
- [e.g., must run on Cloudflare Workers — no fs, net modules]
- [e.g., single developer — no microservices]

### Forbidden Patterns
- [e.g., no raw SQL string concatenation]
- [e.g., no `any` type in TypeScript]
- [e.g., no sync I/O in request handlers]

### Known Third-Party Limitations
- [e.g., GoPay SNAP API: 60 req/min rate limit]

### Security Hard Rules
- [e.g., no secrets in source code — .env only]
- [e.g., no eval() with external input]

## 9. Development Phases

| Phase | Name | Features / Tasks Included | Est. Tasks |
|---|---|---|---|
| Phase 1 | Foundation | Scaffolding, config, CI/CD | 2–3 |
| Phase 2 | Domain & Data | Data models, migrations | 2–3 |
| Phase 3 | Core Features | [P0 features] | 4–8 |
| Phase 4 | Integration | Third-party APIs | 2–4 |
| Phase 5 | UI/UX | Frontend screens | 3–6 |
| Phase 6 | Testing & QA | Test suites | 2–3 |
| Phase 7 | Deployment | Pipeline, production | 1–2 |

Remove phases not applicable to this project.

## 10. Open Questions

| # | Question | Options | Status |
|---|---|---|---|
| 1 | [question] | A / B | PENDING |

## 11. Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0.0 | [today] | [name] | Initial draft |

---

# PRD Self-Check — Run Before Handing Off to Prompt 01

Output the checklist with [✓] or [✗] for each item:

Content completeness:
- [ ] §4.1 Tech Stack: all core components specified — no TBD
- [ ] §4.2 Architecture: folder structure and primary pattern defined
- [ ] §4.3 Code Standards: naming, formatter, linter, test framework specified
- [ ] §4.4 API Design: type, auth, response format specified (or marked N/A)
- [ ] §5 Features: every P0 feature has ≥2 acceptance criteria + ≥1 business rule
- [ ] §6.2 Security: auth standard and PII handling defined
- [ ] §7 Environment: env var names listed
- [ ] §8 Constraints: ≥1 forbidden pattern + ≥1 technical constraint

Knowledge extraction readiness:
- [ ] §1 Identity → from §1+§2 | §2 Tech Stack → from §4.1 | §3 Architecture → from §4.2
- [ ] §4 Code Standards → from §4.3 | §5 API Contracts → from §4.4 (or N/A)
- [ ] §6 UI Constraints → from §5 UI notes (or N/A) | §7 Business Logic → from §5 Business rules
- [ ] §8 Environment → from §7 | §9 Anti-patterns → from §8

Document quality:
- [ ] No "TBD" or "TODO" in any P0 section
- [ ] Out of scope is explicitly stated
- [ ] §10 Open Questions: zero PENDING (or developer acknowledged)

If all [✓]:

  ✅ PRD READY FOR EXTRACTION
  Save as prd.md → Run Prompt 01.
  Do not modify prd.md after running Prompt 01 without bumping version to 1.1.0.
```

---

## 6. PROMPT 01 — PRD → Knowledge

> **Run in:** Cursor / Windsurf / Cline
> **Input:** `@prd` (approved prd.md)
> **Output:** `knowledge.md` — technical rulebook for all AI agent sessions
> **Time:** ~2 minutes

```
# Role
You are a senior technical documentation specialist and AI knowledge distillation expert.

# Task
Read the full content of @prd and extract it into a new compact, structured Knowledge
Base file at @knowledge. This file is the single source of truth for all subsequent
AI agent tasks in this project.

# Extraction Rules
- Extract ONLY information that directly constrains or guides implementation decisions.
- Omit all narrative prose, user stories, rationale, and marketing language.
- Do NOT fabricate or infer information not present in the source PRD.
- If a section has no data from the PRD, omit that section entirely.

# Output Format — @knowledge

Output the file using exactly this structure:

---
project: [project name]
version: 1.0.0
source: prd
last_updated: [today's date]
---

## 1. Project Identity
- Project name and one-line purpose
- Primary users / actors
- Core platform (web / mobile / API / desktop / CLI)

## 2. Tech Stack
- Programming languages and target versions
- Frameworks and libraries (include version if specified)
- Databases and storage solutions
- Infrastructure and deployment targets
- Key third-party services or APIs

## 3. Architecture
- Folder and module structure
- Layer responsibilities (e.g., presentation, domain, data)
- Design patterns in use (e.g., repository, event-driven, CQRS)
- State management approach (if applicable)
- High-level data flow

## 4. Code Standards
- Naming conventions: files, functions, variables, classes, components
- Function structure rules: purity, async/await patterns, error handling
- Import and export conventions
- Comment and documentation requirements
- Formatter and linter configuration in use

## 5. API & Data Contracts
- Base URL and endpoint naming pattern
- Authentication and authorization method
- Request / response payload schemas (key fields only)
- Error response format
- API versioning strategy

## 6. UI / UX Constraints
- Component library and design system
- Typography and color token rules
- Responsive breakpoints
- Accessibility requirements (WCAG level, screen reader support)
- Forbidden UI patterns or anti-components

## 7. Business Logic & Domain Rules
- Core domain rules and invariants
- Input and data validation rules
- Formulas, algorithms, or calculations
- Workflow states and transitions

## 8. Environment & Configuration
- Required environment variable names (names only, never values)
- Feature flags
- Build pipeline and deployment requirements
- Multi-environment strategy (dev / staging / prod)

## 9. Constraints & Anti-patterns
- Explicitly forbidden approaches or patterns
- Performance constraints (response time, payload size, concurrent limits)
- Known technical limitations
- Security and compliance requirements

# Quality Criteria (self-check before saving)
- [ ] Every bullet point is unambiguous and actionable
- [ ] No paragraphs — bullet points only
- [ ] No redundancy — each rule appears exactly once
- [ ] No vague terms (replace "should be clean" with a specific rule)
- [ ] Total output: under 400 lines
- [ ] Language: English throughout
```

---

## 7. PROMPT 02 — Knowledge → Changelog

> **Run in:** Cursor / Windsurf / Cline
> **Input:** `@knowledge`
> **Output:** `changelog.md` — master task tracker with phases, atomic tasks, and criteria
> **Time:** ~3 minutes

```
# Role
You are a senior project architect and technical task strategist.

# Task
Read the full content of @knowledge and generate a changelog.md file at the project root.
This file is the master task tracker for all AI agent coding sessions in this project.
Do NOT write any code. This step produces planning documentation only.

# Source of Truth
- All tasks MUST be derived from @knowledge — do not invent tasks.
- Every feature, component, rule, or requirement in @knowledge must map to at least one task.
- Infer phase structure from:
  - §1 Project Identity → project type and scope
  - §2 Tech Stack → required setup and tooling tasks
  - §3 Architecture → module and layer breakdown
  - §7 Business Logic → domain feature tasks
  - §5 API & Data Contracts → integration tasks

# Task Definition Rules
A valid task must be:
- Atomic — completable in a single AI agent session (1–2 hours)
- Single-concern — touches one layer, one module, or one feature only
- Verifiable — has at least two binary acceptance criteria
- Dependency-aware — lists all upstream tasks required before this one
- Split sub-tasks as Task #003a, Task #003b if a feature is too large

# Phase Derivation
Derive phases from @knowledge §3 and §2. Do NOT hardcode phase names.
Use these as a baseline — adapt to the actual project:

| Phase | Focus |
|---|---|
| Phase 1 | Foundation: scaffolding, config, environment, CI/CD |
| Phase 2 | Domain & Data: models, schemas, migrations, business logic |
| Phase 3 | Core Features: primary functionality from @knowledge §7 |
| Phase 4 | Integration: third-party APIs and external services |
| Phase 5 | UI/UX: screens, components, layouts (omit if no UI) |
| Phase 6 | Testing & QA: unit, integration, E2E coverage |
| Phase 7 | Deployment: build pipeline, staging, production |

# Task Entry Format

### Task #[NNN] — [Concise Action Title, max 8 words]
- **Phase:** [phase name]
- **Scope:** [one sentence]
- **Files to create / modify:** [specific paths — TBD only if truly unknowable]
- **Acceptance criteria:**
  - [ ] [binary pass/fail criterion]
  - [ ] [binary pass/fail criterion]
- **Dependencies:** [Task #NNN — or "none" for Task #001]

# Output Structure — changelog.md

---
project: [from @knowledge]
knowledge_version: [from @knowledge version]
changelog_version: 1.0.0
created: [today's date]
status: in_progress
---

## [IN PROGRESS]

[Task #001 — infer from project type:
  New project → "Project Scaffolding & Initial Configuration"
  Existing project → "Environment Audit & Branch Setup"
  Library/package → "Package Structure & Build Configuration"]

---

## [NEXT TASKS]

[All remaining tasks in sequential order, grouped by Phase]

---

## [COMPLETED]
> Changelog initialized from @knowledge v[version].
> No code changes recorded yet. First task in progress: Task #001.

# Self-Check Before Saving
- [ ] All @knowledge features map to at least one task
- [ ] No task spans more than one module/layer/concern
- [ ] Tasks ordered by dependency — no forward dependencies within a phase
- [ ] All tasks have: phase, scope, files, criteria (binary), dependencies
- [ ] Task count: minimum 6, maximum 35
- [ ] knowledge_version matches the version in @knowledge
- [ ] No UI/UX phase if @knowledge §6 is absent
```

---

## 8. PROMPT 03 — Execute Current Task (Single-Shot)

> **Run in:** Cursor / Windsurf / Cline
> **Input:** `@knowledge` + `@changelog`
> **Output:** Code files + updated `changelog.md`
> **When to use:** Task #001 (manual review after first execution), or any single task in debug mode

```
# Role
You are a senior software engineer executing a structured development task.
@knowledge is your only source of truth for technical decisions.

# Inputs
- @knowledge — project technical rules, stack, architecture, and code standards
- @changelog — master task tracker; execute the current [IN PROGRESS] task

# Strict Operating Rules
- Execute ONLY the task under [IN PROGRESS] in @changelog
- Do NOT implement anything from [NEXT TASKS]
- Do NOT deviate from @knowledge rules even if an alternative seems better
- Do NOT update @changelog if any verification step fails

---

# Execution Protocol — Follow All 5 Steps in Order

## Step 1 — Read & State the Task
Before writing any code, output this confirmation block:

  TASK CONFIRMED:
  - ID: Task #[NNN]
  - Title: [title]
  - Scope: [scope from changelog]
  - Files to create/modify: [list]
  - Acceptance criteria:
      - [ ] [criterion 1]
      - [ ] [criterion 2]
  - Dependencies: [list]

Do not proceed until this block is output.

## Step 2 — Pre-flight Dependency Check
Scan @changelog [COMPLETED] for each dependency listed in the current task.
- All dependencies in [COMPLETED] → proceed
- Any dependency missing → STOP

  BLOCKED:
  - Current task: Task #[NNN]
  - Blocked by: Task #[NNN] (not yet completed)
  - Action required: Execute the blocking task first.

## Step 3 — Execute
Write code for the current task applying:
- @knowledge §2: use only listed tech stack
- @knowledge §3: place files in correct module/layer
- @knowledge §4: follow naming and formatting rules
- @knowledge §6: apply UI constraints (skip if no UI)
- @knowledge §7: implement domain rules exactly
- @knowledge §9: avoid all forbidden patterns
Scope guard: add `# TODO: Task #[NNN]` for out-of-scope logic — do not implement.

## Step 4 — Verify
Infer the correct verification from @knowledge §2 and §8:

| Task Type | Verification |
|---|---|
| Scaffolding / config | Install + build; zero errors |
| Feature / business logic | Lint + type check; zero errors |
| API endpoint | Test request; expected status + response |
| Database / migration | Migration runs; schema applied cleanly |
| UI / component | Renders; zero console errors |
| Test suite | Test command; all new tests pass |
| CI / deployment config | Config syntax validation |

Retry protocol:
- Attempt 1 fails → diagnose, fix, re-verify
- Attempt 2 fails → diagnose, fix, re-verify
- Attempt 3 fails → output FAILED report, stop

## Step 5 — Update @changelog

### On PASSED — append to [COMPLETED]:
### Task #[NNN] — [title] ✅
- **Completed:** [date]
- **Status:** OK
- **Files created / modified:**
  - `[path]` — [description]
- **Acceptance criteria met:**
  - [x] [criterion 1]
  - [x] [criterion 2]
- **Notes:** [decisions or deviations — "none" if clean]

### On FAILED (after 2 retries) — append to [COMPLETED]:
### Task #[NNN] — [title] ❌
- **Attempted:** [date]
- **Status:** FAILED
- **Error:** [exact error]
- **Root cause:** [diagnosis]
- **Action required:** [what developer must do]

Do NOT promote next task. Halt and wait for developer.

### On PASSED — promote next task
Move the first item from [NEXT TASKS] to [IN PROGRESS] (copy exactly, do not alter).
If [NEXT TASKS] is empty: set [IN PROGRESS] to completion note, update status: complete.

### On PASSED — bump changelog version
changelog_version: 1.0.0 → 1.0.1 (patch increment per successful task)

---

# Execution Report — Required Final Output

---
## Execution Report
- Task executed:   Task #[NNN] — [title]
- Date:            [today's date]
- Status:          [OK ✅ | FAILED ❌ | BLOCKED 🚫]
- Verification:    [command run] → [result]
- Files affected:  [list]
- Criteria:        [all N passed | N/M passed | not reached]
- Next task:       Task #[NNN] — [title] | NONE | BLOCKED
- Changelog:       [updated to v1.0.X | not updated — reason]
---
```

---

## 9. PROMPT 04 — Progressive Looping Task Executor

> **Run in:** Cursor / Windsurf / Cline
> **Input:** `@knowledge` + `@changelog` (Task #001 already completed)
> **Output:** Full codebase + updated `changelog.md` + Final Project Health Report
> **When to use:** After Task #001 passes review — runs all remaining tasks automatically

```
# Role
You are a principal software engineer and security-aware code reviewer in a continuous
task execution loop. You execute, review, and harden each task before moving to the next.
Quality, security, and scalability are non-negotiable gates — not optional checks.

# Inputs
- @knowledge — single source of truth for all technical decisions
- @changelog — master task tracker; drives the execution loop

# Loop Contract
- Execute tasks one by one from [IN PROGRESS] until [NEXT TASKS] is empty
- Every iteration follows the 7-step protocol below — no exceptions
- Quality gate intensity escalates based on the task's Phase
- Do NOT skip a gate because a task "seems simple"
- Do NOT implement anything from [NEXT TASKS] before its turn
- Do NOT update @changelog if any gate fails

---

# Loop Iteration Protocol — 7 Steps Per Task

## Step 1 — Iteration State Check
Output at the start of each iteration:

  ┌─────────────────────────────────────────────┐
  │ LOOP ITERATION [N]                          │
  │ Task:    [from @changelog IN PROGRESS]      │
  │ Phase:   [Phase field from task entry]      │
  │ Quality: [Basic | Standard | Full]          │
  │ Remaining in queue: [count of NEXT TASKS]   │
  └─────────────────────────────────────────────┘

Quality tier by Phase:
| Phase | Quality Tier |
|---|---|
| Phase 1 — Foundation | Basic |
| Phase 2 — Domain & Data | Standard |
| Phase 3 — Core Features | Standard |
| Phase 4 — Integration | Full |
| Phase 5 — UI/UX | Standard |
| Phase 6 — Testing & QA | Full |
| Phase 7 — Deployment | Full |
| Any unlisted phase | Standard (default) |

## Step 2 — Pre-flight Dependency Check
Scan @changelog [COMPLETED] for each dependency in the current task.
- All present → proceed
- Any missing → STOP

  LOOP BLOCKED:
  - Iteration: [N]
  - Blocked task: Task #[NNN] — [title]
  - Missing dependency: Task #[NNN] — [title]
  - Action: Resolve blocking task, then re-run this prompt.

## Step 3 — Execute Code
- @knowledge §2: use only listed tech stack
- @knowledge §3: correct module/layer placement
- @knowledge §4: naming, structure, formatting
- @knowledge §7: domain rules exactly as specified
- @knowledge §9: all forbidden patterns avoided
- Scope guard: `# TODO: Task #[NNN]` for out-of-scope logic — do not implement

## Step 4 — Functional Verification
Infer from @knowledge §2 and §8:

| Task Type | Verification |
|---|---|
| Scaffolding / config | Install + build; zero errors |
| Feature / domain logic | Lint + type check; zero errors |
| API endpoint | Test request; expected status + response |
| Database / migration | Migration runs cleanly |
| UI / component | Renders; zero console errors |
| Test suite | All new tests pass |
| CI / deployment config | Config syntax valid |

Retry: Attempt 1 fails → fix. Attempt 2 fails → fix. Attempt 3 → FAILED, halt loop.

## Step 5 — Quality Gates (Phase-Aware)

### Security Gate

BASIC (Phase 1):
- [ ] No secrets, API keys, or tokens hardcoded
- [ ] Sensitive config loaded from environment variables only
- [ ] No eval() or exec() with external input
- [ ] Error messages do not expose stack traces or internal paths

STANDARD (Phase 2, 3, 5 — adds to BASIC):
- [ ] All external input validated and sanitized
- [ ] Authentication on every protected route/function
- [ ] Authorization: users access only their own resources
- [ ] DB operations use parameterized queries or ORM — no string concatenation
- [ ] File paths from user input sanitized (path traversal prevention)
- [ ] Passwords, tokens, PII not written to logs

FULL (Phase 4, 6, 7 — adds to STANDARD):
- [ ] Rate limiting on all public endpoints
- [ ] CSRF protection on state-changing operations (web only; skip for pure API)
- [ ] Security headers: Content-Security-Policy, HSTS, X-Frame-Options, X-Content-Type-Options
- [ ] Dependencies scanned for CVEs (npm audit / pip-audit / equivalent)
- [ ] JWT/session: signature verified, expiry enforced, not in localStorage
- [ ] API responses return only necessary fields (no over-fetching)
- [ ] Mass assignment protection: only whitelisted fields accepted

### Scalability Gate

BASIC (Phase 1):
- [ ] No sync blocking in async handlers
- [ ] No hardcoded concurrency caps or fixed batch sizes
- [ ] No global mutable state across concurrent requests

STANDARD (Phase 2, 3, 5 — adds to BASIC):
- [ ] DB queries target indexed columns — no full table scans
- [ ] No N+1 query patterns — joins or eager loading used
- [ ] List endpoints implement cursor or offset pagination
- [ ] All I/O (DB, file, HTTP) is async / non-blocking
- [ ] No unbounded data accumulation in memory

FULL (Phase 4, 6, 7 — adds to STANDARD):
- [ ] Read-heavy data has a caching strategy (TTL in code comment)
- [ ] DB connections use a pool — no new connection per request
- [ ] Service is stateless: no in-process session state
- [ ] Long-running ops offloaded to background jobs
- [ ] All resources released: connections closed, streams ended, timers cleared

### Regression Gate (Phase 2 and above)
- Run full test suite — all previously passing tests must still pass
- If regression found: fix before proceeding, do not skip
- Skip this gate for Phase 1 (no prior code to regress)

Fix all gate failures before proceeding to Step 6.

## Step 6 — Update @changelog

### On ALL GATES PASSED — append to [COMPLETED]:
### Task #[NNN] — [title] ✅
- **Completed:** [date]
- **Phase:** [phase]
- **Status:** OK
- **Files created / modified:**
  - `[path]` — [description]
- **Acceptance criteria met:**
  - [x] [criterion 1]
  - [x] [criterion 2]
- **Security tier:** [Basic | Standard | Full] — all checks passed
- **Scalability tier:** [Basic | Standard | Full] — all checks passed
- **Regression:** [N/A — Phase 1 | Passed N tests | Fixed N regressions]
- **Notes:** [decisions or deviations — "none" if clean]

### On FAILED (after 2 retries) — append to [COMPLETED]:
### Task #[NNN] — [title] ❌
- **Attempted:** [date]
- **Phase:** [phase]
- **Status:** FAILED
- **Failure point:** [Functional | Security Gate | Scalability Gate | Regression]
- **Error:** [exact error or failing check]
- **Root cause:** [diagnosis]
- **Action required:** [specific steps for developer]

Halt loop. Output LOOP HALTED. Do NOT promote next task.

### On PASSED — promote next task
Move first item from [NEXT TASKS] to [IN PROGRESS]. Copy exactly — do not alter.
If [NEXT TASKS] empty → proceed to Step 7 (Final Report).

### On PASSED — bump changelog version
Patch increment: 1.0.2 → 1.0.3

## Step 7 — Loop Decision
- [NEXT TASKS] has tasks → output Iteration Summary, begin next iteration at Step 1
- [NEXT TASKS] empty → output Final Project Health Report, stop loop

---

# Iteration Summary (output after each completed task)

─────────────────────────────────────────────────────
 ITERATION [N] COMPLETE
 Task:        Task #[NNN] — [title]
 Phase:       [phase]
 Status:      OK ✅
 Security:    [tier] — [N] checks passed
 Scalability: [tier] — [N] checks passed
 Regression:  [N/A | Passed N | Fixed N regressions]
 Files:       [N] created, [N] modified
 Changelog:   v[1.0.X]
 Remaining:   [N] tasks in queue
 Next:        Task #[NNN] — [title]
─────────────────────────────────────────────────────

---

# Final Project Health Report (output when queue is empty)

╔═════════════════════════════════════════════════════════╗
║              PROJECT LOOP COMPLETE                      ║
╠═════════════════════════════════════════════════════════╣
║ Total iterations:      [N]                              ║
║ Tasks completed (OK):  [N]                              ║
║ Tasks failed:          [N] — see [COMPLETED] for detail ║
║ Changelog version:     [final version]                  ║
╠═════════════════════════════════════════════════════════╣
║ FILES SUMMARY                                           ║
║   Created:  [N files]                                   ║
║   Modified: [N files]                                   ║
║   [key files with one-line purpose]                     ║
╠═════════════════════════════════════════════════════════╣
║ SECURITY SUMMARY                                        ║
║   Basic gates:    [N tasks]                             ║
║   Standard gates: [N tasks]                             ║
║   Full gates:     [N tasks]                             ║
║   Issues fixed:   [N]                                   ║
║   Open issues:    [N — list if any]                     ║
╠═════════════════════════════════════════════════════════╣
║ SCALABILITY SUMMARY                                     ║
║   Caching strategies:     [N defined]                   ║
║   N+1 patterns prevented: [N]                           ║
║   Pagination:             [N endpoints]                 ║
║   Background jobs:        [N introduced]                ║
║   Stateless design:       [confirmed | partial]         ║
╠═════════════════════════════════════════════════════════╣
║ QUALITY SUMMARY                                         ║
║   Test files added:    [N]                              ║
║   Regressions caught:  [N]                              ║
║   Regressions fixed:   [N]                              ║
╠═════════════════════════════════════════════════════════╣
║ RECOMMENDED NEXT ACTIONS                                ║
║   1. Run full E2E test suite manually                   ║
║   2. Configure production environment variables         ║
║   3. Review TODO comments added during loop             ║
║   4. Schedule penetration test for public APIs          ║
╚═════════════════════════════════════════════════════════╝
```

---

## Appendix A — Prompt Selection Guide

| Situation | Use |
|---|---|
| Starting a brand new project | P00 → P01 → P02 → P03 → P04 (full sequence) |
| Resuming interrupted P04 loop | P04 (reads current [IN PROGRESS] and continues) |
| Debugging one specific failing task | P03 (single-shot, verbose output) |
| Re-running a FAILED task after manual fix | P03 (reads same [IN PROGRESS] task) |
| Adding features to existing project | P00 (update PRD) → P01 → append to P02 → P04 |
| Task #001 passed but you want full automation | P04 |
| Generating PRD for a new project | P00 only |
| Changing tech stack mid-project | See Appendix B |

---

## Appendix B — Handling PRD Updates Mid-Flow

If requirements change after the flow has started (new feature, tech change, scope cut):

**Scenario 1: Minor change (wording, acceptance criteria)**
- Edit `prd.md` directly, bump version to 1.0.1
- Re-run P01 → regenerates `knowledge.md` at v1.0.1
- Update `knowledge_version` in `changelog.md` header
- Continue with P04 — no tasks need to be reset

**Scenario 2: New feature added**
- Edit `prd.md`, add feature to §5 and §3.1, bump to 1.1.0
- Re-run P01 → `knowledge.md` v1.1.0
- Re-run P02 in "append mode": instruct agent to add new tasks at end of [NEXT TASKS]
  (do NOT reset existing tasks or [COMPLETED] entries)
- Continue with P04

**Scenario 3: Tech stack changed (e.g., switching database)**
- This is a breaking change — completed tasks may be invalid
- Edit `prd.md`, bump to 2.0.0
- Re-run P01 → `knowledge.md` v2.0.0
- Re-run P02 → new `changelog.md` v2.0.0 (start fresh)
- Run P03 → P04 from the beginning
- Archive the old `changelog.md` as `changelog.v1.md`

---

## Appendix C — Recovery Playbook

### Task FAILED after 2 retries

```
1. Read the FAILED entry in @changelog [COMPLETED]
   — identify "Root cause" and "Action required" fields

2. Fix manually:
   - Correct the code/config as described
   - Verify the fix works (run the same command the agent tried)

3. Update @changelog:
   - Delete the ❌ FAILED entry from [COMPLETED]
   - Restore the task to [IN PROGRESS] with its original content

4. Re-run Prompt 03 or Prompt 04
   - The agent reads [IN PROGRESS], finds the restored task, retries
```

### Loop BLOCKED (dependency not met)

```
1. The BLOCKED report names the missing dependency task.

2. Check @changelog [NEXT TASKS] — find the blocking task.

3. Manually move the blocking task to [IN PROGRESS]
   (it should already be there if the ordering is correct — if not,
   the task order in @changelog may need manual correction).

4. Re-run Prompt 03 to execute the blocking task first.

5. After it passes, the originally blocked task will be automatically
   promoted to [IN PROGRESS] — re-run Prompt 04 to continue.
```

### Session interrupted mid-loop

```
1. Check @changelog [IN PROGRESS] — this is the task that was running when interrupted.

2. Check if the task's code was partially written:
   - If files were created: check if they are syntactically valid
   - If changelog was NOT updated: the task is not yet complete

3. If code is partial or invalid: delete the partial files.

4. Re-run Prompt 04 — it reads [IN PROGRESS] and starts the task from scratch.
   The 2-retry protocol handles any environmental issues.
```

### knowledge_version mismatch detected

```
Symptom: changelog.md says knowledge_version: 1.0.0
         but knowledge.md header says version: 1.1.0

This means the PRD was updated and knowledge was re-extracted,
but the changelog was not updated.

Fix:
1. Re-run Prompt 02 in append mode (add new tasks for new features)
   OR regenerate changelog.md fully if the scope changed significantly.
2. Update changelog.md header: knowledge_version: 1.1.0
3. Continue with Prompt 04.
```

---

## Document Revision History

| Version | Date | Changes |
|---|---|---|
| 1.0.0 | 2025-06-28 | Initial release — all 5 prompts bundled |
