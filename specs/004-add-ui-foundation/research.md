# Research: UI Foundation

**Feature**: [spec.md](./spec.md)  
**Date**: 2026-05-19

## Decision 1: Keep the UI Foundation Inside the Existing Frontend Workspace

**Decision**: Build the UI foundation inside the existing `frontend/` Next.js
workspace rather than creating a separate design-system package or parallel app
surface.

**Rationale**: The current repository already has one frontend service boundary,
and the current home page plus `components/system/` surface provide the nearest
owning abstraction for shell work. Keeping the foundation local to that
workspace preserves momentum, avoids cross-package overhead, and stays aligned
with the constitution's simplicity rule.

**Alternatives considered**:
- A standalone design-system package was rejected because the current component
  surface is too small to justify another package boundary.
- A parallel prototype app was rejected because it would split effort between
  demonstration UI and the real product shell.

## Decision 2: Use One Token-Driven Theme System with Dark as the Default

**Decision**: Implement dark and light modes through one shared token system,
with dark mode as the default visual posture and light mode rendered from the
same semantic tokens.

**Rationale**: The design document explicitly calls for dark-mode-first work for
deep analytical use, but the spec requires full light-mode parity. A single
token system is the smallest design that preserves semantic consistency,
prevents duplicated component styling, and makes later theme expansion cheaper.

**Alternatives considered**:
- Maintaining separate dark and light component styling branches was rejected
  because it would fragment semantics and increase maintenance cost.
- Shipping dark mode only was rejected because the feature explicitly requires
  light-mode support.

## Decision 3: Keep Theme Preference Simple Now with a Later Account-Backed Seam

**Decision**: Resolve theme choice through a front-end preference layer with
browser-local persistence now, while keeping the preference model compatible with
later account-backed or tenant-aware persistence.

**Rationale**: The current frontend can operate independently, and the core UI
foundation does not need backend preference storage to deliver value. Local
preference storage is sufficient for the MVP slice, while a stable preference
model avoids repainting the UI when account-backed settings arrive later.

**Alternatives considered**:
- Requiring backend-stored theme preferences immediately was rejected because it
  would couple the UI foundation to platform settings work that is not needed to
  validate the shell.
- Using only device or browser preference with no explicit user override was
  rejected because the spec requires a predictable theme preference rule.

## Decision 4: Treat Visualizations as Reusable Patterns Before Choosing a Heavy Chart Library

**Decision**: Define chart containers, trend/radar/progress visual conventions,
and loading or empty states as shared UI patterns first, without committing to a
heavier charting dependency in this foundation phase.

**Rationale**: The current frontend has no charting library installed, and the
spec scopes this feature to the UI foundation rather than full analytical
features. Establishing layout, visual semantics, and pattern wrappers now keeps
the MVP slice small while leaving a clear seam for later feature-specific chart
selection.

**Alternatives considered**:
- Choosing a full charting stack now was rejected because there is not yet a
  concrete data-heavy screen that justifies the added dependency and API surface.
- Deferring all visualization guidance was rejected because later screens need a
  stable visual contract for analytical content.

## Decision 5: Standardize Severity and AI Markers as Shared Semantics, Not Ad Hoc Styling

**Decision**: Define severity states, neutral states, and AI-assisted markers as
shared semantic patterns that every component consumes through the same token and
style rules.

**Rationale**: The product's trust posture depends on stable interpretation of
warnings, critical states, and AI-adjacent content. Treating these cues as
shared semantics reduces the risk that later feature teams invent conflicting
visual meanings.

**Alternatives considered**:
- Allowing each feature screen to define its own severity styling was rejected
  because it would undermine consistency and auditability.
- Using only textual cues with no shared visual semantics was rejected because it
  would make dense analytical screens slower to interpret.

## Decision 6: Validate the Foundation with Component Tests and Theme Smoke Checks

**Decision**: Use Vitest and DOM-focused unit tests for theme logic and reusable
component rendering, plus Playwright smoke checks for shell navigation and
dark/light theme parity on representative screens.

**Rationale**: The existing frontend already uses Vitest and Playwright. Reusing
those tools keeps validation proportional and avoids adding Storybook, visual
snapshot infrastructure, or new workflow layers before the component surface is
proven.

**Alternatives considered**:
- Manual review alone was rejected because the spec includes measurable parity
  and consistency requirements.
- A dedicated visual regression platform was rejected because it adds overhead
  before the core component set exists.