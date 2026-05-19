# Tasks: Project Setup Foundation

**Input**: Design documents from `/specs/002-project-setup-foundation/`
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/developer-workspace-contract.md](./contracts/developer-workspace-contract.md), [quickstart.md](./quickstart.md)

**Validation**: Automated validation is required for this feature because the local infrastructure contract, service bootstraps, and shared developer workflow all change together.

**Organization**: Tasks are grouped by user story so the team can first restore a healthy full local workspace on MiniStack plus ElasticMQ, then recover focused service workflows, and finally re-stabilize the shared validation standard.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Update the shared local dependency contract and root infrastructure assets that every story relies on.

- [x] T001 Update shared local environment defaults in `.env.example` and `shared/config/env.md`
- [x] T002 [P] Replace the LocalStack compose service with MiniStack and ElasticMQ assets in `deploy/docker/docker-compose.yml`, `deploy/docker/ministack-init.sh`, and `deploy/docker/elasticmq.conf`
- [x] T003 [P] Refresh root infrastructure entry points for the split dependency stack in `Makefile`, `package.json`, and `scripts/provision-local.sh`
- [x] T004 [P] Refresh contributor-facing infrastructure contracts in `specs/002-project-setup-foundation/quickstart.md` and `specs/002-project-setup-foundation/contracts/developer-workspace-contract.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Deliver the shared runtime seams and dependency checks that block every user story.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [x] T005 Split backend and worker local dependency settings in `backend/src/core/settings.py` and `worker/src/services/settings.py`
- [x] T006 [P] Refactor backend dependency health aggregation for separate storage and queue checks in `backend/src/services/health_service.py` and `backend/src/api/routes/health.py`
- [x] T007 [P] Refactor root dependency wait and health probes for MiniStack and ElasticMQ in `scripts/wait-for-dependencies.sh` and `scripts/healthcheck.sh`
- [x] T008 [P] Align shared service metadata with the split local stack in `shared/contracts/service-manifest.json` and `shared/config/service-matrix.md`
- [x] T009 Implement service-level dependency summaries for the new stack in `backend/src/cli.py`, `worker/src/cli.py`, and `worker/src/main.py`

**Checkpoint**: Foundation ready. User story work can now proceed.

---

## Phase 3: User Story 1 - Start the Full Local Workspace (Priority: P1) 🎯 MVP

**Goal**: Let a contributor bootstrap the repository, start PostgreSQL plus MiniStack plus ElasticMQ, run the frontend, backend, and worker together, and confirm the full stack is healthy from one documented workflow.

**Independent Test**: On a clean machine, a contributor can follow the quickstart, start the split local dependency stack, run all three services, and confirm the frontend, backend health endpoint, and worker queue bootstrap all report healthy together.

### Validation for User Story 1

- [x] T010 [P] [US1] Update backend and worker runtime integration coverage for MiniStack and ElasticMQ in `backend/tests/integration/test_local_runtime_health.py` and `worker/tests/integration/test_local_dependencies.py`
- [x] T011 [P] [US1] Update frontend full-workspace smoke coverage for the split dependency status surface in `frontend/tests/e2e/local-workspace.spec.ts`

### Implementation for User Story 1

- [x] T012 [US1] Implement MiniStack bucket seeding and ElasticMQ queue provisioning in `deploy/docker/ministack-init.sh`, `deploy/docker/elasticmq.conf`, and `scripts/provision-local.sh`
- [x] T013 [US1] Implement full-workspace startup and cleanup against the new dependency stack in `scripts/dev.sh` and `deploy/docker/docker-compose.yml`
- [x] T014 [US1] Implement runtime status reporting for separate object storage and queue dependencies in `backend/src/services/health_service.py` and `frontend/components/system/WorkspaceStatus.tsx`
- [x] T015 [US1] Update worker queue bootstrap for ElasticMQ-backed local development in `worker/src/main.py` and `worker/src/queue/sqs_adapter.py`
- [x] T016 [US1] Document the MiniStack plus ElasticMQ startup flow and recovery steps in `README.md` and `specs/002-project-setup-foundation/quickstart.md`

**Checkpoint**: User Story 1 is independently demoable as the MVP local-workspace slice.

---

## Phase 4: User Story 2 - Work on Services Without Cross-Team Friction (Priority: P2)

**Goal**: Restore clear service boundaries, shared contracts, and focused service workflows after the local dependency stack is split between MiniStack and ElasticMQ.

**Independent Test**: A contributor can run the backend or worker in isolation, rely on the documented shared configuration surfaces, and understand each service's dependency contract without reading unrelated directories.

### Validation for User Story 2

- [x] T017 [P] [US2] Add backend and worker configuration regression checks for split storage and queue endpoints in `backend/tests/unit/test_settings.py` and `worker/tests/integration/test_local_dependencies.py`
- [x] T018 [P] [US2] Add focused-service entrypoint smoke checks in `scripts/tests/test_backend_entrypoint.sh` and `scripts/tests/test_worker_entrypoint.sh`

### Implementation for User Story 2

- [x] T019 [P] [US2] Update backend-focused workflow guidance for MiniStack and ElasticMQ in `backend/README.md` and `backend/src/cli.py`
- [x] T020 [P] [US2] Update worker-focused workflow guidance for MiniStack and ElasticMQ in `worker/README.md` and `worker/src/cli.py`
- [x] T021 [P] [US2] Update shared dependency ownership docs in `shared/config/service-matrix.md` and `specs/002-project-setup-foundation/contracts/developer-workspace-contract.md`
- [x] T022 [US2] Align shared environment and service-manifest contracts with the new stack in `shared/config/env.md` and `shared/contracts/service-manifest.json`
- [x] T023 [US2] Update root and frontend navigation guidance for service-isolated workflows in `README.md` and `frontend/README.md`

**Checkpoint**: User Story 2 is independently usable for focused backend or worker development with predictable shared configuration and repository navigation.

---

## Phase 5: User Story 3 - Enforce Shared Development Standards (Priority: P3)

**Goal**: Keep one predictable formatting, linting, provisioning, and health-validation workflow after the MiniStack plus ElasticMQ migration.

**Independent Test**: A maintainer can ask any contributor to run the root provisioning, health, formatting, linting, and test commands and receive consistent results against the updated local dependency stack.

### Validation for User Story 3

- [x] T024 [P] [US3] Add root provisioning and health smoke checks in `scripts/tests/test_health_entrypoint.sh` and `scripts/tests/test_provision_entrypoint.sh`
- [x] T025 [P] [US3] Extend shared validation smoke coverage in `scripts/tests/test_format_entrypoint.sh` and `scripts/tests/test_lint_entrypoint.sh`

### Implementation for User Story 3

- [x] T026 [US3] Update root validation orchestration for MiniStack and ElasticMQ regressions in `package.json`, `Makefile`, and `scripts/test.sh`
- [x] T027 [US3] Update shared troubleshooting and environment guidance in `README.md` and `shared/config/env.md`
- [x] T028 [US3] Reconcile service-specific validation notes in `backend/README.md`, `worker/README.md`, and `frontend/README.md`

**Checkpoint**: User Story 3 is independently ready for repeatable pre-review validation on the new local stack.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Preserve the AWS migration seam and confirm the regenerated tasks leave the repository docs and deployment placeholders aligned.

- [x] T029 [P] Update local container scaffolds and override comments for the new dependency stack in `deploy/docker/docker-compose.override.yml`, `deploy/docker/Dockerfile.backend`, and `deploy/docker/Dockerfile.worker`
- [x] T030 [P] Update AWS landing-zone placeholders to reference the preserved S3 and SQS seams in `deploy/terraform/main.tf`, `deploy/terraform/variables.tf`, and `deploy/terraform/outputs.tf`
- [x] T031 Verify contract, quickstart, and README alignment after the MiniStack migration in `specs/002-project-setup-foundation/contracts/developer-workspace-contract.md`, `specs/002-project-setup-foundation/quickstart.md`, and `README.md`
- [x] T032 Run the MiniStack plus ElasticMQ quickstart validation pass and record final expected outputs in `specs/002-project-setup-foundation/quickstart.md` and `README.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1: Setup** has no dependencies and can start immediately.
- **Phase 2: Foundational** depends on Phase 1 and blocks all user stories.
- **Phase 3: User Story 1** depends on Phase 2 and defines the smallest shippable MiniStack migration slice.
- **Phase 4: User Story 2** depends on Phase 2 and can proceed after the shared runtime seams are stable.
- **Phase 5: User Story 3** depends on Phase 2 and benefits from the service and root entry points stabilized in earlier phases.
- **Phase 6: Polish** depends on the user stories selected for the release.

### User Story Dependencies

- **US1 (P1)**: No dependency on other user stories after Phase 2.
- **US2 (P2)**: No dependency on US1 after Phase 2, but it reuses the shared dependency contracts and runtime seams established in Foundational work.
- **US3 (P3)**: No dependency on US1 or US2 after Phase 2, but it relies on the root and service entry points remaining stable.

### Within Each User Story

- Validation tasks should be authored before implementation tasks and should fail until the story is complete.
- Shared configuration and dependency contracts should be stabilized before service-specific documentation is expanded.
- Root provisioning and health entry points should be correct before final quickstart validation is recorded.

### Parallel Opportunities

- Setup tasks marked `[P]` can run in parallel once the local dependency contract is agreed.
- Foundational tasks marked `[P]` can run in parallel after the environment defaults are updated.
- User Story 1 validation tasks can run in parallel, followed by backend, worker, and documentation updates once provisioning assets exist.
- User Story 2 service-specific tasks marked `[P]` can run in parallel because they target different service areas.
- User Story 3 validation tasks can run in parallel because they cover separate root smoke scripts.

---

## Parallel Example: User Story 1

```text
T010 [US1] Update backend and worker runtime integration coverage for MiniStack and ElasticMQ in backend/tests/integration/test_local_runtime_health.py and worker/tests/integration/test_local_dependencies.py
T011 [US1] Update frontend full-workspace smoke coverage for the split dependency status surface in frontend/tests/e2e/local-workspace.spec.ts

T014 [US1] Implement runtime status reporting for separate object storage and queue dependencies in backend/src/services/health_service.py and frontend/components/system/WorkspaceStatus.tsx
T015 [US1] Update worker queue bootstrap for ElasticMQ-backed local development in worker/src/main.py and worker/src/queue/sqs_adapter.py
T016 [US1] Document the MiniStack plus ElasticMQ startup flow and recovery steps in README.md and specs/002-project-setup-foundation/quickstart.md
```

## Parallel Example: User Story 2

```text
T017 [US2] Add backend and worker configuration regression checks for split storage and queue endpoints in backend/tests/unit/test_settings.py and worker/tests/integration/test_local_dependencies.py
T018 [US2] Add focused-service entrypoint smoke checks in scripts/tests/test_backend_entrypoint.sh and scripts/tests/test_worker_entrypoint.sh

T019 [US2] Update backend-focused workflow guidance for MiniStack and ElasticMQ in backend/README.md and backend/src/cli.py
T020 [US2] Update worker-focused workflow guidance for MiniStack and ElasticMQ in worker/README.md and worker/src/cli.py
T021 [US2] Update shared dependency ownership docs in shared/config/service-matrix.md and specs/002-project-setup-foundation/contracts/developer-workspace-contract.md
```

## Parallel Example: User Story 3

```text
T024 [US3] Add root provisioning and health smoke checks in scripts/tests/test_health_entrypoint.sh and scripts/tests/test_provision_entrypoint.sh
T025 [US3] Extend shared validation smoke coverage in scripts/tests/test_format_entrypoint.sh and scripts/tests/test_lint_entrypoint.sh

T027 [US3] Update shared troubleshooting and environment guidance in README.md and shared/config/env.md
T028 [US3] Reconcile service-specific validation notes in backend/README.md, worker/README.md, and frontend/README.md
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: User Story 1.
4. Validate the full-workspace startup flow and health surfaces for User Story 1.
5. Stop after the MiniStack plus ElasticMQ local workspace is stable before widening scope.

### Incremental Delivery

1. Setup plus Foundational work establishes the split local dependency contract and core runtime seams.
2. User Story 1 restores the first usable full-stack local environment.
3. User Story 2 makes focused backend and worker work practical again without repository confusion.
4. User Story 3 re-stabilizes the shared validation and troubleshooting workflow.
5. Polish preserves the AWS migration seam and final documentation alignment.

### Parallel Team Strategy

1. One contributor can own Docker and provisioning assets while others update service settings and health checks.
2. After Phase 2, backend, worker, and documentation owners can split User Story 1 runtime tasks.
3. User Story 2 backend, worker, and shared-doc updates can be distributed by service.
4. User Story 3 root smoke checks and documentation updates can proceed in parallel before final validation.