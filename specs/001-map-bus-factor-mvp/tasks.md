# Tasks: Keystone Map MVP

**Input**: Design documents from `/specs/001-map-bus-factor-mvp/`
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/map-api.openapi.yaml](./contracts/map-api.openapi.yaml), [quickstart.md](./quickstart.md)

**Validation**: Automated tests are required because this feature changes API contracts, decision-support behavior, tenant boundaries, and sensitive customer data handling.

**Organization**: Tasks are grouped by user story so each story can be implemented, validated, and demonstrated independently. The sequence preserves the smallest shippable Map MVP before broader knowledge-discovery and trust-surface work.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the monorepo surfaces and local runtime required for the MVP.

- [ ] T001 Create the root workspace manifests in `package.json`, `pnpm-workspace.yaml`, and `.nvmrc`
- [ ] T002 Create the Next.js frontend workspace in `frontend/package.json`, `frontend/tsconfig.json`, and `frontend/next.config.ts`
- [ ] T003 Create the Python backend and worker package manifests in `backend/pyproject.toml` and `worker/pyproject.toml`
- [ ] T004 [P] Define local Docker and LocalStack services in `deploy/docker/docker-compose.yml` and `deploy/docker/localstack-init.sh`
- [ ] T005 [P] Create shared contract and fixture scaffolding in `shared/contracts/openapi-types.config.ts` and `shared/fixtures/README.md`
- [ ] T006 [P] Add environment, lint, format, and test tooling config in `.env.example`, `frontend/eslint.config.js`, `frontend/vitest.config.ts`, and `package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Deliver the shared platform pieces that block every user story.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [ ] T007 Create the migration framework and base metadata in `backend/alembic.ini`, `backend/alembic/env.py`, `backend/src/models/base.py`, and `backend/alembic/versions/0001_core_schema.py`
- [ ] T008 [P] Implement FastAPI app bootstrap and shared routing in `backend/src/main.py`, `backend/src/api/router.py`, and `backend/src/settings.py`
- [ ] T009 [P] Implement the Next.js app shell and tenant-aware providers in `frontend/app/layout.tsx`, `frontend/app/providers.tsx`, and `frontend/lib/session.ts`
- [ ] T010 [P] Implement tenant context, JWT auth, and RBAC policies in `backend/src/auth/dependencies.py`, `backend/src/auth/policy.py`, and `backend/src/auth/tokens.py`
- [ ] T011 [P] Implement encryption, pseudonymization, and identity vault foundations in `backend/src/services/encryption_service.py`, `backend/src/services/pseudonym_service.py`, and `backend/src/services/identity_vault_service.py`
- [ ] T012 [P] Implement queue, object-storage, and Bedrock provider adapters in `backend/src/services/queue_service.py`, `backend/src/services/storage_service.py`, `backend/src/llm/bedrock_provider.py`, and `worker/src/queue/sqs_adapter.py`
- [ ] T013 [P] Implement the worker runtime bootstrap and pipeline skeletons in `worker/src/main.py`, `worker/src/pipelines/source_sync_pipeline.py`, `worker/src/topic_mapping/topic_bootstrap_pipeline.py`, and `worker/src/scoring/coverage_scoring_pipeline.py`
- [ ] T014 [P] Create workspace, team, source, contributor, and topic models in `backend/src/models/workspace.py`, `backend/src/models/team_scope.py`, `backend/src/models/source_connection.py`, `backend/src/models/contributor_profile.py`, and `backend/src/models/topic.py`
- [ ] T015 [P] Create evidence, classification, coverage, impact, and audit models in `backend/src/models/activity_evidence.py`, `backend/src/models/topic_classification.py`, `backend/src/models/coverage_snapshot.py`, `backend/src/models/topic_authority_record.py`, `backend/src/models/risk_flag.py`, `backend/src/models/impact_preview.py`, `backend/src/models/published_audit.py`, `backend/src/models/map_change_record.py`, `backend/src/models/audit_log_entry.py`, and `backend/src/models/reidentification_event.py`
- [ ] T016 Implement audit logging, metrics, and API error handling in `backend/src/audit/audit_log_service.py`, `backend/src/services/metrics_service.py`, `backend/src/api/error_handlers.py`, and `worker/src/services/telemetry_service.py`

**Checkpoint**: Foundation ready. User story work can begin.

---

## Phase 3: User Story 1 - Publish First Bus-Factor Audit (Priority: P1) 🎯 MVP

**Goal**: Connect supported sources, bootstrap the topic map, let operator and approver refine it, and publish the first bus-factor audit with evidence gating.

**Independent Test**: A design-partner tenant can connect GitHub or GitLab plus Jira or Confluence, refine the draft topic map, approve critical topics, and publish a bus-factor audit that blocks on missing evidence and records an immutable publish trail.

### Validation for User Story 1

- [ ] T017 [P] [US1] Add contract tests for source connection, bootstrap, draft, and publish endpoints in `backend/tests/contract/test_source_connections.py` and `backend/tests/contract/test_topic_map_publish.py`
- [ ] T018 [P] [US1] Add fixture-driven integration coverage for bootstrap-to-publish in `backend/tests/integration/test_publish_first_audit.py` and `worker/tests/integration/test_bootstrap_publish_pipeline.py`
- [ ] T019 [P] [US1] Add a Next.js smoke flow for onboarding and publish in `frontend/tests/e2e/publish-first-audit.spec.ts`

### Implementation for User Story 1

- [ ] T020 [P] [US1] Implement GitHub, GitLab, Jira, and Confluence connector adapters in `backend/src/connectors/github_connector.py`, `backend/src/connectors/gitlab_connector.py`, `backend/src/connectors/jira_connector.py`, and `backend/src/connectors/confluence_connector.py`
- [ ] T021 [US1] Implement source connection orchestration and `/v1/source-connections` handlers in `backend/src/services/source_connection_service.py` and `backend/src/api/routes/source_connections.py`
- [ ] T022 [US1] Implement source sync, classification, and topic bootstrap jobs with needs-review handling in `worker/src/pipelines/source_sync_pipeline.py`, `worker/src/topic_mapping/topic_classifier.py`, and `worker/src/topic_mapping/topic_bootstrap_pipeline.py`
- [ ] T023 [US1] Implement draft topic reads and `/v1/topic-map/bootstrap` plus `/v1/topic-map/draft` in `backend/src/services/topic_map_service.py` and `backend/src/api/routes/topic_map.py`
- [ ] T024 [US1] Implement lineage-aware topic patching and critical-topic confirmation in `backend/src/services/topic_map_mutation_service.py` and `backend/src/services/topic_approval_service.py`
- [ ] T025 [US1] Implement coverage scoring, BF1/BF2/mentor-loss generation, and publish gating in `worker/src/scoring/authority_scoring_service.py`, `worker/src/scoring/risk_flag_service.py`, and `backend/src/services/confidence_gate_service.py`
- [ ] T026 [US1] Implement publish orchestration and immutable audit artifact generation in `backend/src/services/publish_audit_service.py`, `backend/src/services/audit_artifact_service.py`, and `backend/src/api/routes/topic_map.py`
- [ ] T027 [US1] Build onboarding and topic review routes in `frontend/app/onboarding/page.tsx`, `frontend/app/topic-map/review/page.tsx`, `frontend/components/onboarding/SourceConnectionForm.tsx`, and `frontend/components/topic-map/TopicReviewTable.tsx`
- [ ] T028 [US1] Build publish readiness and approval UI in `frontend/components/topic-map/CriticalTopicApprovalPanel.tsx`, `frontend/components/topic-map/PublishReadinessBanner.tsx`, and `frontend/services/topic-map-client.ts`

**Checkpoint**: User Story 1 is independently demoable as the MVP slice.

---

## Phase 4: User Story 2 - Find Topic Experts and Warm Backups (Priority: P2)

**Goal**: Let authorized team users search for a topic and see ranked experts, warm backups, activity context, and a simple person-loss impact preview.

**Independent Test**: A user can search for a known topic, get ranked experts and warm backups with confidence and evidence context, inspect recent topic activity, and run an impact preview that degrades coverage without mutating the baseline snapshot.

### Validation for User Story 2

- [ ] T029 [P] [US2] Add contract tests for search, coverage, activity, and impact-preview endpoints in `backend/tests/contract/test_topic_search.py` and `backend/tests/contract/test_impact_preview.py`
- [ ] T030 [P] [US2] Add integration coverage for expert ranking, warm backups, and person-loss preview in `backend/tests/integration/test_topic_discovery.py` and `worker/tests/integration/test_authority_scoring.py`
- [ ] T031 [P] [US2] Add a Next.js smoke flow for topic discovery in `frontend/tests/e2e/topic-discovery.spec.ts`

### Implementation for User Story 2

- [ ] T032 [P] [US2] Implement topic search and coverage read services in `backend/src/services/topic_search_service.py` and `backend/src/services/coverage_read_service.py`
- [ ] T033 [P] [US2] Implement topic activity and impact preview services in `backend/src/services/topic_activity_service.py` and `backend/src/services/impact_preview_service.py`
- [ ] T034 [P] [US2] Add search, coverage, and activity indexes in `backend/alembic/versions/0002_topic_query_indexes.py` and `backend/src/models/coverage_snapshot.py`
- [ ] T035 [US2] Implement `/v1/topics/search` and `/v1/topics/{topicId}/coverage` handlers in `backend/src/api/routes/topics.py`
- [ ] T036 [US2] Implement `/v1/topics/{topicId}/activity` and `/v1/impact-preview` handlers in `backend/src/api/routes/topics.py` and `backend/src/api/routes/impact_preview.py`
- [ ] T037 [US2] Implement provisional versus high-confidence response shaping and warm-backup eligibility in `backend/src/services/confidence_gate_service.py` and `backend/src/services/topic_search_service.py`
- [ ] T038 [US2] Build topic discovery and coverage UI in `frontend/app/search/page.tsx`, `frontend/app/topics/[topicId]/page.tsx`, `frontend/components/search/TopicSearchResults.tsx`, `frontend/components/topics/TopicCoveragePanel.tsx`, and `frontend/services/topic-search-client.ts`
- [ ] T039 [US2] Build topic activity and person-loss preview UI in `frontend/components/topics/TopicActivityTimeline.tsx` and `frontend/components/topics/ImpactPreviewPanel.tsx`

**Checkpoint**: User Story 2 is independently usable without the publish workflow UI being open.

---

## Phase 5: User Story 3 - Review Why the Map Can Be Trusted (Priority: P3)

**Goal**: Let stakeholders inspect audit details, change history, evidence coverage, and controlled re-identification events for trust and explainability.

**Independent Test**: A stakeholder can open a published audit, inspect change history and evidence context, request a named view through RBAC-gated re-identification, and see the request logged immutably.

### Validation for User Story 3

- [ ] T040 [P] [US3] Add contract tests for audit detail, change history, and re-identification endpoints in `backend/tests/contract/test_audits.py` and `backend/tests/contract/test_identities.py`
- [ ] T041 [P] [US3] Add integration coverage for audit integrity and scoped re-identification in `backend/tests/integration/test_audit_trust_views.py` and `backend/tests/integration/test_reidentification.py`
- [ ] T042 [P] [US3] Add a Next.js smoke flow for stakeholder trust views in `frontend/tests/e2e/audit-trust-views.spec.ts`

### Implementation for User Story 3

- [ ] T043 [P] [US3] Implement audit detail and change-history read services in `backend/src/services/audit_read_service.py` and `backend/src/services/topic_lineage_service.py`
- [ ] T044 [P] [US3] Implement scoped re-identification service and approval logging in `backend/src/services/reidentification_service.py` and `backend/src/audit/audit_log_service.py`
- [ ] T045 [US3] Implement `/v1/audits/{auditId}`, `/v1/audits/{auditId}/changes`, and `/v1/identities/re-identify` handlers in `backend/src/api/routes/audits.py` and `backend/src/api/routes/identities.py`
- [ ] T046 [US3] Implement named-view access checks and pseudonymized response shaping in `backend/src/auth/policy.py` and `backend/src/services/identity_view_service.py`
- [ ] T047 [US3] Build audit detail and change timeline UI in `frontend/app/audits/[auditId]/page.tsx`, `frontend/components/audit/AuditChangeTimeline.tsx`, `frontend/components/audit/AuditEvidencePanel.tsx`, and `frontend/services/audit-client.ts`
- [ ] T048 [US3] Build controlled re-identification UI in `frontend/components/identity/ReidentifyDialog.tsx` and `frontend/components/identity/ReidentifyAuditNotice.tsx`

**Checkpoint**: User Story 3 is independently reviewable for trust, explainability, and controlled identity access.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Strengthen the shared MVP before broader rollout or investor demos.

- [ ] T049 [P] Update local runbooks and developer onboarding in `specs/001-map-bus-factor-mvp/quickstart.md` and `README.md`
- [ ] T050 [P] Add tenant-isolation and encryption regression suites in `backend/tests/integration/test_tenant_isolation.py` and `backend/tests/integration/test_encryption_controls.py`
- [ ] T051 Harden Docker and Terraform deployment assets in `deploy/docker/Dockerfile.frontend`, `deploy/docker/Dockerfile.backend`, `deploy/docker/Dockerfile.worker`, `deploy/terraform/shared_tenant_app.tf`, and `deploy/terraform/monitoring.tf`
- [ ] T052 [P] Tune publish latency, queue observability, and scoring metrics in `backend/src/services/metrics_service.py`, `worker/src/services/telemetry_service.py`, and `worker/src/scoring/authority_scoring_service.py`
- [ ] T053 Run the quickstart validation flow and refresh shared fixtures in `specs/001-map-bus-factor-mvp/quickstart.md`, `shared/fixtures/map_mvp_fixture.json`, and `backend/scripts/seed_design_partner.py`
- [ ] T054 [P] Finalize API and operational documentation in `specs/001-map-bus-factor-mvp/contracts/map-api.openapi.yaml` and `docs/map-mvp-operations.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1: Setup** has no dependencies and can start immediately.
- **Phase 2: Foundational** depends on Phase 1 and blocks every user story.
- **Phase 3: User Story 1** depends on Phase 2 and defines the first shippable MVP slice.
- **Phase 4: User Story 2** depends on Phase 2 and should follow the MVP slice, even though much of its implementation can proceed once the shared models and pipeline foundations exist.
- **Phase 5: User Story 3** depends on Phase 2 and is most useful after User Story 1 publishes audit artifacts, but its APIs and UI can be developed in parallel once the shared audit models exist.
- **Phase 6: Polish** depends on the user stories selected for the current release.

### User Story Dependencies

- **US1 (P1)**: No dependency on other user stories after Phase 2.
- **US2 (P2)**: Reuses topic, coverage, and scoring data introduced for US1, but remains independently testable through its own API, integration, and UI flows.
- **US3 (P3)**: Reuses published audit and lineage data introduced for US1, but remains independently testable through its own API, integration, and UI flows.

### Within Each User Story

- Validation tasks execute before implementation tasks.
- Backend services precede route handlers.
- Frontend flows depend on stable route contracts and error states.
- Audit, RBAC, and tenant-boundary handling ship with the story behavior that exposes sensitive outputs.

### Parallel Opportunities

- Setup tasks marked `[P]` can run in parallel after the root manifests exist.
- Foundational tasks marked `[P]` can run in parallel once the migration framework is created.
- Each story's contract, integration, and Playwright validation tasks marked `[P]` can be authored in parallel.
- Backend and frontend implementation tasks within a story can proceed in parallel once the payload contracts are stable.

---

## Parallel Example: User Story 1

```text
T017 [US1] Contract tests in backend/tests/contract/test_source_connections.py and backend/tests/contract/test_topic_map_publish.py
T018 [US1] Integration coverage in backend/tests/integration/test_publish_first_audit.py and worker/tests/integration/test_bootstrap_publish_pipeline.py
T019 [US1] Next.js smoke flow in frontend/tests/e2e/publish-first-audit.spec.ts

T020 [US1] Connector adapters in backend/src/connectors/github_connector.py, backend/src/connectors/gitlab_connector.py, backend/src/connectors/jira_connector.py, and backend/src/connectors/confluence_connector.py
T022 [US1] Bootstrap jobs in worker/src/pipelines/source_sync_pipeline.py and worker/src/topic_mapping/topic_bootstrap_pipeline.py
T027 [US1] Onboarding and topic review UI in frontend/app/onboarding/page.tsx and frontend/app/topic-map/review/page.tsx
```

## Parallel Example: User Story 2

```text
T029 [US2] Contract tests in backend/tests/contract/test_topic_search.py and backend/tests/contract/test_impact_preview.py
T030 [US2] Integration coverage in backend/tests/integration/test_topic_discovery.py and worker/tests/integration/test_authority_scoring.py
T031 [US2] Next.js smoke flow in frontend/tests/e2e/topic-discovery.spec.ts

T032 [US2] Search and coverage services in backend/src/services/topic_search_service.py and backend/src/services/coverage_read_service.py
T033 [US2] Activity and impact-preview services in backend/src/services/topic_activity_service.py and backend/src/services/impact_preview_service.py
T038 [US2] Topic discovery UI in frontend/app/search/page.tsx and frontend/app/topics/[topicId]/page.tsx
```

## Parallel Example: User Story 3

```text
T040 [US3] Contract tests in backend/tests/contract/test_audits.py and backend/tests/contract/test_identities.py
T041 [US3] Integration coverage in backend/tests/integration/test_audit_trust_views.py and backend/tests/integration/test_reidentification.py
T042 [US3] Next.js smoke flow in frontend/tests/e2e/audit-trust-views.spec.ts

T043 [US3] Audit read services in backend/src/services/audit_read_service.py and backend/src/services/topic_lineage_service.py
T044 [US3] Re-identification service in backend/src/services/reidentification_service.py
T047 [US3] Audit detail UI in frontend/app/audits/[auditId]/page.tsx and frontend/components/audit/AuditChangeTimeline.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: User Story 1.
4. Validate contract, integration, and Playwright coverage for User Story 1.
5. Demo the publishable audit workflow locally before any hosted rollout.

### Incremental Delivery

1. Setup and foundational work establish the shared MVP skeleton.
2. User Story 1 delivers the publishable audit wedge and is validated locally first.
3. User Story 2 adds daily-use knowledge discovery, activity context, and impact preview without changing the publish workflow.
4. User Story 3 adds trust and explainability surfaces for broader stakeholder adoption.
5. Polish tasks harden the selected scope for hosted pilots only when cloud cost is justified.

### Parallel Team Strategy

1. One track completes Setup and Foundational tasks.
2. Once Phase 2 is stable, backend and worker contributors can split across service and route tasks while frontend contributors build the story UI in parallel.
3. Validation tasks remain story-scoped so each story can be merged and demonstrated independently.

---

## Notes

- `[P]` marks tasks designed for parallel execution after dependencies are satisfied.
- `[US1]`, `[US2]`, and `[US3]` preserve traceability back to the feature spec.
- Each story includes validation, implementation, auditability, and sensitive-data controls where needed.
- The recommended MVP scope for the first implementation pass is Phase 1, Phase 2, and Phase 3 only, with local-first validation before any hosted deployment.