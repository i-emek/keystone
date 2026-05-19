# Implementation Plan: UI Foundation

**Branch**: `004-add-ui-foundation` | **Date**: 2026-05-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-add-ui-foundation/spec.md`

## Summary

Establish Keystone's shared UI foundation inside the existing Next.js frontend
by introducing a design-token-driven shell, reusable high-density component
patterns, stable severity and AI-assistance semantics, and dark/light theme
parity based on [docs/DESIGN.md](../../docs/DESIGN.md). Keep the implementation
front-end scoped, avoid a separate design-system package for now, and preserve a
clear seam for later account-backed theme preference persistence and future
feature-specific screens.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 15 and React 19 on Node.js 20 LTS  
**Primary Dependencies**: Next.js App Router, React 19, built-in Next font support, ESLint, Vitest, Playwright  
**Storage**: No new business-data store; theme preference uses a front-end persistence seam with browser-local fallback and a later account-backed path  
**Testing**: Vitest with jsdom for component and theme logic, Testing Library-style DOM assertions through existing setup, Playwright for end-to-end theme and shell smoke checks, ESLint and TypeScript typecheck  
**Target Platform**: Browser-based web UI in the existing monorepo frontend, optimized for desktop and laptop analytical workflows
**Tier / Sensitivity**: Tier-1 Map MVP / low direct people-impacting sensitivity but medium trust-presentation sensitivity because UI semantics shape interpretation of later advisory outputs  
**Compliance / Trust Posture**: Advisory-only presentation layer, stable severity and AI-marker semantics, tenant-safe preference handling, auditable visual cues for later trust-sensitive workflows  
**Project Type**: Frontend web application inside a service-aligned monorepo  
**Performance Goals**: Theme changes feel immediate, shell and core components render without disruptive layout shift, and analytical pages remain readable at common desktop widths  
**Constraints**: Dark-mode-first but full light-mode parity, no forked component families by theme, no heavy charting platform required before feature-specific data views justify it, preserve compatibility with the existing backend status input  
**Scale/Scope**: One shared shell, one token system, two supported themes, one reusable component layer for the current frontend, and enough patterns to support the first product screens without one-off styling

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- PASS: The smallest viable slice is explicit: shared shell, tokens, reusable
  components, and dark/light parity. Full feature screens, marketing patterns,
  and broader expansion concerns remain deferred.
- PASS: The expansion path is a seam, not speculative infrastructure. Theme
  persistence, visualization depth, and future screens extend one shared UI
  foundation instead of creating a second design system.
- PASS: The feature remains advisory-only. It does not add people-decisioning
  logic, but it preserves stable trust cues, AI markers, and severity semantics
  for later advisory surfaces.
- PASS: Data handling stays bounded to tenant-safe interface preference handling
  and presentation rules. No protected attributes, new customer-domain data, or
  broader residency obligations are introduced.
- PASS: Validation is proportional to the risk: component tests, theme smoke
  checks, linting, typechecking, and explicit fallback behavior for unreadable or
  ambiguous state presentation.
- PASS: No enterprise-only complexity is introduced. The plan avoids a separate
  design-system package, heavy charting stack, or account-backed preference store
  before a current MVP need exists.

**Post-Design Re-Check: PASS**

- Research keeps the MVP slice front-end scoped and aligned with the existing
  Next.js workspace rather than creating a new UI platform.
- The design artifacts define stable semantics for severity, AI markers, loading,
  and theme behavior so later trust-sensitive views can inherit them.
- Data modeling limits itself to UI-domain entities such as theme preference,
  shell regions, token groups, and reusable component patterns.
- The UI contract formalizes shell, token, theme, and state expectations without
  committing to speculative future screens or enterprise-only theming features.
- Complexity remains justified only where it protects clarity and extension
  safety: tokenized themes, reusable shell patterns, and a simple preference seam
  for future account-backed persistence.

## Project Structure

### Documentation (this feature)

```text
specs/004-add-ui-foundation/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui-foundation-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
frontend/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── system/
├── lib/
│   ├── api-client.ts
│   └── env.ts
├── tests/
│   ├── e2e/
│   ├── setup.ts
│   └── unit/
├── eslint.config.mjs
├── vitest.config.ts
└── package.json

shared/
└── contracts/
```

**Structure Decision**: Keep the UI foundation inside the existing `frontend/`
workspace, centered on `app/` for the product shell, `components/system/` for
reusable interface primitives, `lib/` for theme and runtime helpers, and
`tests/` for unit plus end-to-end validation. This preserves the service-aligned
monorepo, avoids a premature standalone design-system package, and still leaves
room to extract shared packages later if the component surface outgrows the MVP.

## Complexity Tracking

No constitution violations require additional justification.
