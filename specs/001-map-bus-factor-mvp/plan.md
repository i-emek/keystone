# Implementation Plan: Keystone Map MVP

**Branch**: `001-map-bus-factor-mvp` | **Date**: 2026-05-17 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-map-bus-factor-mvp/spec.md`

## Summary

Deliver the Tier-1 Keystone Map MVP as a small monorepo with a Next.js +
TypeScript frontend, a Python 3.11 FastAPI backend, and Python worker runtimes
for ingestion, topic bootstrap, coverage scoring, and risk generation. The MVP
stays local-first with Docker Compose plus S3/SQS emulation, uses PostgreSQL 16
+ pgvector for tenant-scoped operational data, stores immutable audit artifacts
and derived assets in object storage, and preserves a direct migration path to
AWS ECS/Fargate, RDS, S3, SQS, and Bedrock without adding enterprise-only
complexity ahead of need.

## Technical Context

**Language/Version**: Next.js 15 + TypeScript 5.x on Node.js 20 LTS; Python 3.11 for API and worker runtimes  
**Primary Dependencies**: Next.js App Router, React 19, TanStack Query, Zod, FastAPI, Pydantic v2, SQLAlchemy 2.0, Alembic, pgvector, boto3, httpx  
**Storage**: PostgreSQL 16 + pgvector for tenant, topic, evidence, and scoring data; S3-compatible object storage for audit artifacts, raw import staging, and cached embeddings; SQS-compatible queue for async jobs  
**Testing**: Vitest + Testing Library for frontend unit/component tests; pytest + pytest-asyncio for backend and worker logic; OpenAPI contract tests; fixture-driven integration tests; Playwright smoke flows for onboarding, publish, search, and audit trust paths  
**Target Platform**: Linux containers for local Docker Compose and later AWS ECS/Fargate; browser-based web UI; US-first and English-first MVP
**Tier / Sensitivity**: Tier-1 Map MVP; medium people-impacting sensitivity because outputs are advisory-only but identity-linked and org-sensitive  
**Compliance / Trust Posture**: Advisory-only, human approval for publish and re-identification, pseudonymization by default, append-only audit trail, tenant-scoped RBAC, RLS plus tenant-specific application-layer encryption for sensitive Map data, no protected-attribute or HR-data logic  
**Project Type**: Web application with a separate frontend, backend API, and worker runtime inside one monorepo  
**Performance Goals**: Topic search and coverage reads p95 < 2s; named re-identification check < 500ms plus audit write; publish/bootstrap for a 50-100 engineer tenant < 5 minutes; queue backlog drains < 15 minutes under normal ingest load  
**Constraints**: Local-first delivery before AWS; strong single-source evidence may only surface provisional outputs; high-confidence coverage and BF1/BF2/mentor-loss flags require corroboration or stronger sustained evidence; queue, storage, and model providers stay behind replaceable interfaces; shared-tenant MVP must remain low-cost and demo-ready  
**Scale/Scope**: 30-100 engineers per tenant in MVP; 10-50 repositories or equivalent source scopes; 5k-20k retained activity events per month per design partner; 5-15 concurrent users per workspace; 3-5 pooled tenants before per-tenant hosting is reconsidered

## Constitution Check

**Initial Gate: PASS**

- MVP boundary is explicit: GitHub/GitLab plus Jira or Confluence, reviewable
  topic map, bus-factor audit, expert search, activity view, auditable history,
  and simple person-loss preview; Slack, full reorg simulation, EU hosting, and
  self-hosting remain deferred.
- Expansion seams are explicit: queue, object-storage, model-provider, and
  tenant-boundary interfaces allow later AWS hardening, per-tenant hosting, and
  customer-hosted variants without building them now.
- Human oversight is preserved through operator review, approver publish,
  re-identification justification, and advisory-only outputs.
- Data handling is bounded: pooled MVP with RLS, tenant-specific
  application-layer encryption, US-first and English-first assumptions,
  pseudonymization by default, and exclusion of protected attributes and HR data.
- Operational readiness is proportional: logging, audit history, contract tests,
  integration fixtures, and failure visibility are planned from the first slice.
- No enterprise-only infrastructure is introduced ahead of need; AWS-specific
  choices remain implementation seams, not a separate prebuilt platform.

**Post-Design Re-Check: PASS**

- Research and design keep the smallest viable slice intact while resolving the
  frontend stack to Next.js and the backend and worker stack to Python.
- The design keeps all people-impacting outputs behind evidence thresholds,
  confidence bands, and auditable actions.
- The data model captures topic lineage, coverage snapshots, authority records,
  risk flags, and re-identification events in ways that preserve explainability
  and replayability.
- External contracts expose only the MVP flows: onboarding, bootstrap, draft
  review, publish, search, activity view, impact preview, audit retrieval, and
  controlled re-identification.
- Complexity remains justified only where it protects trust or future
  portability: queue/storage/model abstractions, shared contracts, and
  append-only audit artifacts.

## Project Structure

### Documentation (this feature)

```text
specs/001-map-bus-factor-mvp/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── map-api.openapi.yaml
└── tasks.md
```

### Source Code (repository root)

```text
frontend/
├── app/
├── components/
├── lib/
├── services/
└── tests/

backend/
├── src/
│   ├── api/
│   ├── auth/
│   ├── connectors/
│   ├── encryption/
│   ├── llm/
│   ├── models/
│   └── services/
├── alembic/
├── scripts/
└── tests/

worker/
├── src/
│   ├── pipelines/
│   ├── queue/
│   ├── scoring/
│   ├── tasks/
│   └── topic_mapping/
└── tests/

shared/
├── contracts/
└── fixtures/

deploy/
├── docker/
└── terraform/
```

**Structure Decision**: Use a small monorepo with one Next.js frontend, one
FastAPI API service, and one Python worker runtime. This keeps the online
product shell and the offline intelligence pipeline separable for co-founder or
team ownership, while shared contracts and fixtures prevent drift. AWS
deployment details live under `deploy/` and runtime-specific adapter modules so
the MVP remains locally runnable and easy to extend post-MVP.

## Complexity Tracking

No constitution violations require special justification in this plan.
