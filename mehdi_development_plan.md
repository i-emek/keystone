# Mehdi Development Plan

## Purpose

This file turns the detailed spec plan into a simple block-by-block MVP build plan that can be copied into the Development plan sheet.

## Planning Assumptions

- Focus only on the Tier-1 MVP.
- Build locally first, then prepare for cloud deployment later.
- Priority order stays the same as in the spec: publishable audit first, then expert search, then trust and audit views.
- Timeline below is a practical draft for a lean founding team and should be treated as an estimate, not a commitment.

## Recommended MVP Build Order

| Block | Section | Main Objective | Main Deliverables | Estimated Time |
| --- | --- | --- | --- | --- |
| 0 | Project setup | Create the base repo and local dev environment | Monorepo setup, frontend and backend scaffolding, worker setup, Docker Compose, env files, linting, testing base | 1 week |
| 1 | Core foundations | Build the platform pieces everything depends on | Database schema, FastAPI app, Next.js app shell, auth and RBAC, encryption and pseudonymization, storage and queue adapters, worker skeleton, telemetry and audit logging | 2 weeks |
| 2 | Workspace setup | Let a company create its workspace, define scope, and import its teams before deeper analysis starts | Workspace creation flow, tenant and team hierarchy setup, team import pipeline, manual fallback import, custom org-source connector seam, workspace settings | 1 week |
| 3 | Data ingestion | Connect the first supported sources and ingest data reliably | GitHub and GitLab connectors, Jira and Confluence connectors, source connection APIs, source sync pipeline | 2 weeks |
| 4 | Topic-map engine | Turn ingested data into a draft topic map that can be reviewed | Topic classification, topic bootstrap pipeline, low-confidence review bucket, draft topic APIs, topic rename/merge/split flow, critical topic confirmation | 2 weeks |
| 5 | Bus-factor audit MVP | Produce the first publishable output and make it demo-ready | Coverage scoring, BF1/BF2/mentor-loss logic, publish gating, immutable audit artifact generation, onboarding UI, topic review UI, publish readiness UI | 2 weeks |
| 6 | Knowledge discovery | Add the daily-use workflow beyond the first audit | Topic search, expert ranking, warm backup logic, activity timeline, impact preview, search and topic detail UI | 1.5 weeks |
| 7 | Trust and control layer | Make the system explainable and safe for stakeholder review | Audit detail view, change history, re-identification flow, named-view permission checks, trust UI, audit UI | 1.5 weeks |
| 8 | Polish and release prep | Harden the MVP for demos and pilot conversations | Quickstart and docs, tenant isolation checks, encryption regression checks, performance tuning, deployment hardening, fixture refresh | 1 week |

**Total draft estimate:** 14 weeks

## Simplified Section View For The Spreadsheet

### 1. Setup and development environment

- Create the monorepo structure.
- Set up frontend, backend, and worker services.
- Add Docker Compose and local infrastructure.
- Add environment configuration, linting, formatting, and test tooling.

### 2. Shared architecture foundations

- Create the core database schema and migrations.
- Add authentication, tenant context, and role permissions.
- Add encryption, pseudonymization, and identity vault basics.
- Add storage, queue, and model-provider adapter layers.
- Add worker runtime skeleton and telemetry.

### 3. Workspace creation and team import

- Create the workspace creation flow for a new company.
- Set up tenant scope, team structure, and sub-team hierarchy.
- Add a team-import pipeline with manual fallback.
- Keep the import layer generic so it can support HRIS or custom org connectors later.

### 4. Source integrations and ingestion

- Build GitHub and GitLab integrations.
- Build Jira and Confluence integrations.
- Create source connection APIs and orchestration.
- Run source sync and prepare normalized evidence.

### 5. Topic-map generation and review

- Build the topic classification and bootstrap pipeline.
- Create the draft topic map endpoints.
- Support review actions such as rename, merge, split, and confirm.
- Handle ambiguous data through a needs-review bucket.

### 6. Publishable audit MVP

- Compute topic coverage and authority scores.
- Generate BF1, BF2, and mentor-loss risk flags.
- Add confidence and evidence gating before publish.
- Generate immutable published audit artifacts.
- Build onboarding, topic review, and publish readiness screens.

### 7. Search and expert discovery

- Add topic search.
- Show experts and warm backups.
- Add activity history per topic.
- Add simple person-loss impact preview.
- Build the related UI screens.

### 8. Trust, auditability, and controlled identity access

- Show why a topic result can be trusted.
- Add published audit detail and topic change history.
- Add controlled re-identification with logging and justification.
- Build the trust and audit review screens.

### 9. Final polish before MVP demos

- Improve documentation and onboarding.
- Run tenant isolation and encryption regression tests.
- Tune performance and observability.
- Harden deployment assets for later hosted rollout.

## What Must Be Built First

If the goal is to build the MVP bloc by bloc with minimal complexity, the recommended order is:

1. Setup and development environment
2. Shared architecture foundations
3. Workspace creation and team import
4. Source integrations and ingestion
5. Topic-map generation and review
6. Publishable audit MVP

This is the smallest complete investor-ready MVP path.

## What Can Come Right After The MVP

After the first publishable audit workflow is working end to end, the next blocks should be:

1. Search and expert discovery
2. Trust, auditability, and controlled identity access
3. Final polish and deployment hardening

## Recommendation On Team Imports

Yes, this should be its own block after core foundations.

The reason is simple: the workspace is not just a UI step. It defines tenant scope, teams, permissions, topic boundaries, filtering, and later audit visibility. If you skip that as a dedicated block, the later ingestion and topic logic become harder to structure cleanly.

For the MVP, the safest approach is:

1. Support manual team creation and CSV import first.
2. Build a generic org-import connector interface.
3. Add Personio or another HRIS connector only if a design partner really needs it.

This keeps the architecture right without forcing HR-system complexity too early. It also avoids bringing sensitive employee-system dependencies into the first implementation unless they are clearly necessary.

## Suggested Sheet Labels

If you want shorter labels for Excel, you can use:

- Setup
- Foundations
- Workspace Setup
- Integrations
- Topic Engine
- Audit MVP
- Discovery
- Trust Layer
- Polish