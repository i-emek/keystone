# Tasks: UI Foundation

**Input**: Design documents from `/specs/004-add-ui-foundation/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Validation**: This feature includes required frontend validation because the
shared shell, theme behavior, and UI semantics are the foundation for later
trust-sensitive product screens. Each user story includes the cheapest tests
that prove it works independently.

**Organization**: Tasks are grouped by user story to enable independent
implementation and testing of each story. Sequence the smallest shippable MVP
slice before any expansion work.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the frontend workspace for the shared UI foundation

- [x] T001 Create shared UI foundation entry points in `frontend/app/globals.css`, `frontend/components/system/index.ts`, `frontend/lib/theme.ts`, and `frontend/lib/theme-preference.ts`
- [x] T002 [P] Create UI foundation test scaffolding in `frontend/tests/unit/system/AppShell.test.tsx`, `frontend/tests/unit/theme/ThemeProvider.test.tsx`, `frontend/tests/unit/theme/theme-preference.test.ts`, `frontend/tests/e2e/ui-foundation-shell.spec.ts`, and `frontend/tests/e2e/ui-foundation-theme.spec.ts`
- [x] T003 [P] Update base frontend layout setup for Geist and shared stylesheet loading in `frontend/app/layout.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core UI infrastructure that MUST be complete before any user story can begin

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Define shared dark/light theme tokens and semantic CSS variables in `frontend/app/globals.css` and `frontend/lib/theme.ts`
- [x] T005 [P] Implement theme resolution and browser-local preference helpers in `frontend/lib/theme-preference.ts`
- [x] T006 [P] Add theme-aware render helpers and shared test setup in `frontend/tests/setup.ts` and `frontend/tests/unit/renderWithTheme.tsx`
- [x] T007 [P] Create shell scaffolding with navigation, header, and content slots in `frontend/components/system/AppShell.tsx`, `frontend/components/system/AppNavigation.tsx`, and `frontend/components/system/AppHeader.tsx`
- [x] T008 Implement theme provider and hydration-safe root wiring in `frontend/components/system/ThemeProvider.tsx` and `frontend/app/layout.tsx`
- [x] T009 Implement shared severity, AI-marker, and interaction semantic maps in `frontend/components/system/stateSemantics.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Use a Consistent Analytics Workspace (Priority: P1) 🎯 MVP

**Goal**: Deliver a shared analytics shell and consistent core workspace surfaces

**Independent Test**: Open the landing screen and verify that navigation, header,
content regions, cards, and status semantics read as one coherent analytics
workspace.

### Validation for User Story 1

- [x] T010 [P] [US1] Add unit coverage for shell hierarchy and semantic status rendering in `frontend/tests/unit/system/AppShell.test.tsx` and `frontend/tests/unit/system/WorkspaceStatus.test.tsx`
- [x] T011 [P] [US1] Add browser smoke coverage for shared navigation, header, and content layout in `frontend/tests/e2e/ui-foundation-shell.spec.ts`

### Implementation for User Story 1

- [x] T012 [P] [US1] Implement reusable surface and status primitives in `frontend/components/system/SurfaceCard.tsx` and `frontend/components/system/StatusBadge.tsx`
- [x] T013 [US1] Refactor runtime status presentation onto shared surface and semantic status patterns in `frontend/components/system/WorkspaceStatus.tsx`
- [x] T014 [US1] Compose the landing screen inside the shared analytics shell in `frontend/app/page.tsx`
- [x] T015 [US1] Tune shell density and analytical content layout rules in `frontend/app/globals.css` and `frontend/components/system/AppShell.tsx`

**Checkpoint**: User Story 1 should now deliver a coherent analytics workspace and be testable on its own

---

## Phase 4: User Story 2 - Switch Between Dark and Light Modes Reliably (Priority: P2)

**Goal**: Deliver predictable theme switching with dark/light parity across the shared shell and core surfaces

**Independent Test**: Switch between dark and light modes on the representative
screen and verify readable hierarchy, preserved status meaning, and stable theme
choice behavior on repeat visits.

### Validation for User Story 2

- [x] T016 [P] [US2] Add unit coverage for theme resolution and stored preference handling in `frontend/tests/unit/theme/theme-preference.test.ts` and `frontend/tests/unit/theme/ThemeProvider.test.tsx`
- [x] T017 [P] [US2] Add browser smoke coverage for dark/light theme parity and persistence in `frontend/tests/e2e/ui-foundation-theme.spec.ts`

### Implementation for User Story 2

- [x] T018 [P] [US2] Implement theme toggle controls in `frontend/components/system/ThemeToggle.tsx`
- [x] T019 [US2] Integrate theme preference controls into the shell header in `frontend/components/system/AppHeader.tsx` and `frontend/components/system/AppShell.tsx`
- [x] T020 [US2] Apply light-mode parity refinements for severity, hover, loading, and emphasis treatments in `frontend/app/globals.css` and `frontend/components/system/stateSemantics.ts`
- [x] T021 [US2] Wire persisted theme resolution and fallback behavior through `frontend/components/system/ThemeProvider.tsx`, `frontend/app/layout.tsx`, and `frontend/components/system/WorkspaceStatus.tsx`

**Checkpoint**: User Stories 1 and 2 should both be independently functional, with stable dark/light behavior on the shared shell

---

## Phase 5: User Story 3 - Build New Screens from Shared UI Patterns (Priority: P3)

**Goal**: Deliver reusable analytical UI patterns that future screens can compose without one-off styling

**Independent Test**: Build a representative dashboard-like composition screen
from shared patterns and verify that it matches the design language without
bespoke per-screen styling rules.

### Validation for User Story 3

- [x] T022 [P] [US3] Add unit coverage for reusable metric, content-state, and visualization containers in `frontend/tests/unit/system/MetricGroup.test.tsx`, `frontend/tests/unit/system/ContentState.test.tsx`, and `frontend/tests/unit/system/VisualizationPattern.test.tsx`
- [x] T023 [P] [US3] Add browser smoke coverage for representative component composition in `frontend/tests/e2e/ui-foundation-patterns.spec.ts`

### Implementation for User Story 3

- [x] T024 [P] [US3] Implement compact metric and content-state patterns in `frontend/components/system/MetricGroup.tsx` and `frontend/components/system/ContentState.tsx`
- [x] T025 [P] [US3] Implement reusable analytical visualization containers in `frontend/components/system/TrendContainer.tsx`, `frontend/components/system/RadarContainer.tsx`, and `frontend/components/system/ProgressTrajectory.tsx`
- [x] T026 [US3] Implement shared AI-marker presentation helpers and exportable component entry points in `frontend/components/system/AIInsightBadge.tsx` and `frontend/components/system/index.ts`
- [x] T027 [US3] Compose a representative dashboard-like screen from shared patterns in `frontend/app/page.tsx`

**Checkpoint**: All user stories should now be independently functional with reusable patterns ready for later feature screens

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements that affect multiple user stories

- [x] T028 [P] Document shared shell, theme, and component usage in `frontend/README.md` and `specs/004-add-ui-foundation/quickstart.md`
- [x] T029 Verify the UI foundation contract and design guidance still match the implementation in `specs/004-add-ui-foundation/contracts/ui-foundation-contract.md` and `docs/DESIGN.md`
- [x] T030 Run the frontend validation workflow from `frontend/package.json` and resolve any remaining issues across `frontend/app/`, `frontend/components/system/`, `frontend/lib/`, and `frontend/tests/`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational and delivers the MVP shell and core workspace surfaces
- **User Story 2 (P2)**: Starts after Foundational and applies predictable dark/light behavior to the shared shell and surfaces
- **User Story 3 (P3)**: Starts after Foundational and extends the shared component set for future screens

### Within Each User Story

- Validation tasks should be written first and fail before implementation when practical
- Shared primitives before composed screens
- Theme and semantic rules before parity refinements
- Reusable patterns before representative composition screens
- Story complete before moving to polish for that surface

### Parallel Opportunities

- T002 and T003 can run in parallel during Setup
- T005, T006, and T007 can run in parallel during Foundational work
- T010 and T011 can run in parallel for User Story 1 validation
- T012 can run while T010 and T011 are being prepared because it touches separate component files
- T016 and T017 can run in parallel for User Story 2 validation
- T018 can run in parallel with T016 and T017 because it is isolated to the theme toggle surface
- T022 and T023 can run in parallel for User Story 3 validation
- T024 and T025 can run in parallel because they touch separate reusable pattern files

---

## Parallel Example: User Story 3

```bash
# Launch User Story 3 validation work together:
Task: "Add unit coverage for reusable metric, content-state, and visualization containers in frontend/tests/unit/system/MetricGroup.test.tsx, frontend/tests/unit/system/ContentState.test.tsx, and frontend/tests/unit/system/VisualizationPattern.test.tsx"
Task: "Add browser smoke coverage for representative component composition in frontend/tests/e2e/ui-foundation-patterns.spec.ts"

# Launch reusable pattern implementation together:
Task: "Implement compact metric and content-state patterns in frontend/components/system/MetricGroup.tsx and frontend/components/system/ContentState.tsx"
Task: "Implement reusable analytical visualization containers in frontend/components/system/TrendContainer.tsx, frontend/components/system/RadarContainer.tsx, and frontend/components/system/ProgressTrajectory.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Confirm the shared analytics workspace is coherent on its own
5. Demo the shell before expanding theme and pattern depth

### Incremental Delivery

1. Complete Setup + Foundational → tokenized shell and semantic groundwork ready
2. Add User Story 1 → validate workspace consistency → demo MVP shell
3. Add User Story 2 → validate theme parity and persistence → demo dark/light support
4. Add User Story 3 → validate reusable composition patterns → demo extension readiness
5. Finish Polish tasks → finalize docs and validation workflow

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 shell and surface work
   - Developer B: User Story 2 theme switching and parity work
   - Developer C: User Story 3 reusable pattern work
3. Rejoin for Phase 6 polish and final validation

---

## Notes

- [P] tasks touch separate files and have no dependency on incomplete tasks
- [US1], [US2], and [US3] map directly to the prioritized user stories in `spec.md`
- Keep theme semantics unified; do not create separate component variants per theme
- Prefer extending `frontend/components/system/` and `frontend/lib/` over creating a second design-system surface