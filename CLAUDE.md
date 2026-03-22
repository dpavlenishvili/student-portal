# CLAUDE.md

## Project Overview
Student Portal — Nx monorepo with two Angular 19 apps (`student`, `admin`) and shared libraries. Uses Tailwind CSS, SCSS, Jest, Playwright, and dark mode via `ThemeService`.

## Architecture
- `apps/student` — student-facing app (port 4200)
- `apps/admin` — admin panel (port 4201)
- `libs/shared` — models, mock data, ThemeService, MockStoreService
- `libs/shared-styles` — SCSS tokens (`_tokens.scss`), shared styles
- `libs/student/*` — student feature libs (auth, dashboard, profile, surveys, mobility, issue-report, ask-minister)
- `libs/admin/*` — admin feature libs (auth, dashboard, students, surveys, mobility, issues, minister)

## Commands
- `npx nx serve student` — dev server (student)
- `npx nx serve admin` — dev server (admin)
- `npx nx test <project>` — unit tests (Jest)
- `npx nx lint <project>` — lint
- `npx nx build <project>` — production build
- `npx nx e2e student-e2e` / `npx nx e2e admin-e2e` — Playwright e2e

## Code Style
- Latest Angular standalone components
- Strict TypeScript: no `any`, use interfaces from `libs/shared/src/lib/models.ts`
- Tailwind CSS for styling, dark mode via `class` strategy
- SCSS tokens in `libs/shared-styles/src/_tokens.scss`
- Shared exports via `libs/shared/src/index.ts` — check before creating new utilities
- Jest for unit tests, Playwright for e2e

## Anti-Hallucination Rules
- Never assume import paths — verify by reading the actual file
- Never invent services or models — check `libs/shared/src/index.ts` first
- Never hardcode patterns from memory — read the source

## Compact Instructions
When compacting, **preserve**: test failures with file paths, code diffs, error messages, architectural decisions, modified file paths.
**Discard**: full file contents already edited, verbose build/lint logs (keep only errors), successful test output, node_modules paths.

## Context Efficiency
- Search before reading: use grep/find to locate code, then read only relevant lines
- For large files (>200 lines), use offset + limit
- Prefer targeted edits (Edit tool) over full file rewrites (Write tool)
- Pipe test/build output through `| grep -A5 'ERROR\|FAIL\|error'` to capture only failures
- Don't re-read files already seen in this session unless modified
