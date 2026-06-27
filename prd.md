doc_id: PRD-web-chatbot-puter-001
version: 1.0.0
status: draft
created: 2026-06-28
last_updated: 2026-06-28
flow_compatibility: vibe-coding-v1

Web Chatbot with Puter.ai — Product Requirements Document

1. Executive Summary

Problem: Developers need a fast, zero-configuration, and free lightweight chat interface to interact with various AI models without managing complex backends or paying for infrastructure.

Solution: A lightweight web chatbot deployed on Cloudflare Pages that authenticates users and proxies AI requests exclusively through Puter.ai.

Success metric: 100% of chat interactions successfully execute through the Puter.ai free tier with zero associated infrastructure costs.

MVP deadline: [ASSUMED: 1 week]

2. Users & Context

Primary users: Developers

User goal: To quickly test prompts, interact with different AI models, and utilize Puter.ai's ecosystem seamlessly.

Current pain: Setting up local LLMs or paying for commercial API keys requires overhead and infrastructure setup.

Environment: Web browser (Desktop-first focus for developers)

3. Scope

3.1 In-Scope Features

Feature

Priority

Description

User Authentication

P0 — MVP

Users must log in via Puter.js/Puter.ai authentication to use the service.

AI Chat Interface

P0 — MVP

A conversational UI to send text prompts and receive AI responses in real-time.

AI Model Selection

P1

A dropdown/selector allowing users to switch between different AI models supported by Puter.ai.

3.2 Out of Scope (explicit)

Heavy "web app" features (e.g., workspaces, user management dashboards, payment gateways).

Custom backend databases for chat history (relying on client-side or Puter.ai default state).

Paid tier integrations or custom API key inputs outside of Puter.ai.

3.3 Future Considerations

Exporting chat history to local markdown files.

Code syntax highlighting in AI responses.

4. Technical Specification

4.1 Tech Stack

Language & Runtime: TypeScript 5.x / Node.js 20 LTS (for build tools)

Framework: [ASSUMED: React 18 + Vite for lightweight client SPA]

Database: None

ORM / Query builder: None

Cache: None (Client-side memory only)

Infrastructure: Cloudflare Pages

Key third-party services: Puter.ai (Authentication & AI Model inference)

Frontend: HTML/CSS/TypeScript SPA

4.2 Architecture

Pattern: Client-Side Single Page Application (SPA)

Module structure:

src/
├── components/ # Chat UI, Model Selector, Auth Button
├── services/ # Puter.ai API wrappers
├── types/ # TypeScript interfaces
├── App.tsx # Main application shell
└── main.tsx # Entry point

Key design patterns: Facade (for wrapping Puter.ai SDK calls).

Data flow: Client UI → Puter.js SDK → Puter.ai Cloud → Client UI

4.3 Code Standards

Naming — files: kebab-case (e.g., chat-window.tsx)

Naming — functions: camelCase (e.g., sendMessage)

Naming — classes/types: PascalCase (e.g., ChatMessage)

Formatter: Prettier

Linter: ESLint + @typescript-eslint

Testing framework: Vitest

Test coverage target: 80% on core Puter.ai service wrappers

Error handling: try-catch at component boundaries, displaying user-friendly toast notifications on Puter API failure.

4.4 API Design

API type: N/A (Client connects directly to Puter.ai via Puter.js SDK)

Base URL pattern: N/A

Authentication method: Puter.ai native login (puter.auth.signIn())

Response envelope: N/A (Handled by Puter SDK)

Error format: N/A

Pagination: None

4.5 Data Model

Core entities: - Message: { id: string, role: 'user' | 'assistant', content: string, timestamp: number }

Key relationships: N/A

Storage strategy: In-memory (React state) / optionally localStorage for session persistence.

5. Feature Specifications

Feature: User Authentication

User story: As a developer, I want to log in using my Puter.ai account, so that I can access free AI inference.

Acceptance criteria:

[ ] App displays a "Sign in with Puter" button on load if unauthenticated.

[ ] Clicking the button triggers the Puter.js auth flow.

[ ] Upon success, the chat interface is revealed.

Business rules: App is entirely locked behind Puter authentication. No guest access.

UI notes: Simple centered login card on initial load.

Priority: P0

Feature: AI Chat Interface

User story: As a developer, I want to send text and see responses, so that I can evaluate AI outputs.

Acceptance criteria:

[ ] User can type in a text area and submit via Enter or a Send button.

[ ] Chat history displays user messages on the right and AI messages on the left.

[ ] UI shows a loading state while waiting for Puter.ai's response.

Business rules: Empty messages cannot be sent.

UI notes: Standard chat layout; scroll-to-bottom on new message.

Priority: P0

Feature: AI Model Selection

User story: As a developer, I want to choose which AI model handles my prompt, so that I can test different model capabilities.

Acceptance criteria:

[ ] A dropdown menu lists available models (e.g., GPT-4o, Claude 3.5 Sonnet, etc. as supported by Puter.ai).

[ ] Selecting a model updates the active model state.

[ ] Subsequent chat messages are routed to the newly selected model.

Business rules: Must only list models explicitly available on the Puter.ai free tier.

UI notes: Header dropdown above the chat window.

Priority: P1

6. Non-Functional Requirements

6.1 Performance

Application bundle size: < 500KB (gzipped).

Time to Interactive (TTI): < 2 seconds on standard broadband.

6.2 Security

Auth standard: Puter.ai managed OAuth/session.

Password hashing: N/A (Handled by Puter).

PII handling: No PII stored on Cloudflare Pages; strictly client-side proxy to Puter.

Session: Handled entirely by Puter.js SDK.

6.3 Scalability

Growth expectation: N/A (Personal/Developer tool).

Scaling strategy: Cloudflare Pages handles static asset scaling automatically.

Caching: Cloudflare CDN for static assets.

DB scaling: N/A.

6.4 Compliance

Standards: Basic semantic HTML for accessibility.

Regulations: N/A (No user data stored by the application).

7. Environment & Configuration

Environments: prod

Required env vars (names only): None (Puter SDK relies on domain whitelisting or client-side initialization, no backend secrets).

Feature flags: none

CI/CD: GitHub Actions → Cloudflare Pages

Health check: GET / → 200 OK (Static asset load)

8. Constraints & Anti-patterns

Technical Constraints

Must run exclusively on Cloudflare Pages (Free Tier).

Cannot use Node.js backend features (fs, net) at runtime, as this is a static/SPA deployment.

Forbidden Patterns

No backend servers or server-side APIs built into this project.

No storage of user chat data outside of local browser memory or Puter.ai's own managed storage.

Known Third-Party Limitations

Puter.ai rate limits and free-tier usage caps apply. The app must gracefully handle HTTP 429 Too Many Requests errors.

Security Hard Rules

No hardcoded API keys; all auth must flow through the Puter.js SDK user login.

9. Development Phases

Phase

Name

Features / Tasks Included

Est. Tasks

Phase 1

Foundation

Vite setup, Cloudflare Pages config, Puter.js integration

3

Phase 2

Authentication

Login UI, Puter Auth flow

2

Phase 3

Core Features

Chat UI, message state, Puter Chat API integration

4

Phase 4

Model Selection

Model dropdown, dynamic routing to chosen model

2

Phase 5

Deployment

Push to GitHub, map Cloudflare Pages branch

1

10. Open Questions

#

Question

Options

Status

1

Which specific AI models should be listed in the dropdown initially?

Hardcoded list / Fetch dynamically if Puter API allows

[ASSUMED: Hardcoded list based on current Puter docs]

11. Revision History

Version

Date

Author

Changes

1.0.0

2026-06-28

Senior Product Architect

Initial draft
