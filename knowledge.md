---
project: Web Chatbot with Puter.ai
version: 1.0.0
source: prd
last_updated: 2026-06-28
---

## 1. Project Identity

- **Project name**: Web Chatbot with Puter.ai
- **Purpose**: Lightweight web chatbot deployed on Cloudflare Pages that authenticates users and proxies AI requests exclusively through Puter.ai
- **Primary users**: Developers
- **Core platform**: Web (Desktop-first, browser-based SPA)

## 2. Tech Stack

- **Languages & runtimes**: TypeScript 5.x, Node.js 20 LTS (build tools only)
- **Framework**: React 18 + Vite (lightweight client SPA — assumed)
- **Database**: None
- **ORM / Query builder**: None
- **Cache**: None (client-side memory only)
- **Infrastructure**: Cloudflare Pages (Free Tier)
- **Key third-party services**: Puter.ai — authentication (`puter.auth.signIn()`) & AI model inference (`puter.ai.chat()`)
- **Frontend**: HTML / CSS / TypeScript SPA

## 3. Architecture

- **Pattern**: Client-Side Single Page Application (SPA)
- **Module structure**:
  - `src/components/` — Chat UI, Model Selector, Auth Button
  - `src/services/` — Puter.ai API wrappers (Facade pattern)
  - `src/types/` — TypeScript interfaces
  - `src/App.tsx` — Main application shell
  - `src/main.tsx` — Entry point
- **Design patterns**: Facade (for wrapping Puter.ai SDK calls)
- **Data flow**: Client UI → Puter.js SDK → Puter.ai Cloud → Client UI

## 4. Code Standards

- **File naming**: kebab-case (e.g., `chat-window.tsx`)
- **Function naming**: camelCase (e.g., `sendMessage`)
- **Class / type naming**: PascalCase (e.g., `ChatMessage`)
- **Formatter**: Prettier
- **Linter**: ESLint + `@typescript-eslint`
- **Testing framework**: Vitest
- **Test coverage target**: 80% on core Puter.ai service wrappers
- **Error handling**: `try-catch` at component boundaries; display user-friendly toast notifications on Puter API failure

## 5. API & Data Contracts

- **API type**: N/A — client connects directly to Puter.ai via Puter.js SDK
- **Base URL pattern**: N/A
- **Authentication method**: Puter.ai native login — `puter.auth.signIn()`
- **Response envelope**: N/A — handled by Puter SDK
- **Error format**: N/A — handled by Puter SDK
- **Pagination**: None
- **Core entity — Message**:
  ```
  { id: string, role: 'user' | 'assistant', content: string, timestamp: number }
  ```
- **Storage strategy**: In-memory (React state); optionally `localStorage` for session persistence

## 6. UI / UX Constraints

- **Component library**: None specified (base React components)
- **Authentication screen**: Simple centered login card — "Sign in with Puter" button when unauthenticated
- **Chat layout**: User messages right-aligned, AI messages left-aligned
- **Loading state**: Show loading indicator while waiting for Puter.ai response
- **Scroll behavior**: Auto-scroll to bottom on new message
- **Model selector**: Dropdown above the chat window header
- **Empty messages**: Cannot be sent (Send button disabled when empty)
- **Accessibility**: Basic semantic HTML
- **Responsive**: Desktop-first focus
- **Bundle size**: < 500KB (gzipped)
- **TTI**: < 2 seconds on standard broadband

## 7. Business Logic & Domain Rules

- **Authentication gating**: App is entirely locked behind Puter authentication. No guest access.
- **Model availability**: Must only list models explicitly available on the Puter.ai free tier
- **Model routing**: Selecting a model updates active state; subsequent messages use the selected model
- **Input validation**: Empty messages are rejected (not sent)

## 8. Environment & Configuration

- **Environments**: `prod` only
- **Required env vars**: None (Puter SDK relies on domain whitelisting / client-side initialization)
- **Feature flags**: None
- **CI/CD**: GitHub Actions → Cloudflare Pages
- **Health check**: `GET /` → `200 OK` (static asset load)

## 9. Constraints & Anti-patterns

- **Deployment**: Must run exclusively on Cloudflare Pages Free Tier
- **No backend**: Cannot use Node.js backend features (`fs`, `net`) at runtime — static/SPA only
- **No server-side APIs**: No backend servers or server-side APIs built into this project
- **No external storage**: No storage of user chat data outside of local browser memory or Puter.ai's own managed storage
- **No hardcoded API keys**: All auth must flow through the Puter.js SDK user login
- **Rate limits**: Must gracefully handle HTTP 429 Too Many Requests from Puter.ai
- **No paid tiers**: No custom API key inputs outside of Puter.ai
- **Out of scope**: Workspaces, user management dashboards, payment gateways, custom backend databases for chat history
