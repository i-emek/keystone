# Implementation Plan: Project Setup Foundation

**Branch**: `002-project-setup-foundation` | **Date**: 2026-05-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-project-setup-foundation/spec.md`

## Summary

Refresh the Keystone setup foundation so the local-first monorepo keeps its
existing frontend, backend, worker, shared, and deployment boundaries while
switching the local infrastructure design from a single LocalStack dependency to
PostgreSQL plus MiniStack for S3-compatible storage and ElasticMQ for
SQS-compatible queue emulation. The plan preserves AWS-aligned service
contracts, keeps scheduling lightweight during MVP development, and retains one
shared contributor workflow for bootstrap, health checks, and validation.

## Technical Context

**Language/Version**: Node.js 20 LTS with TypeScript 5 for the frontend; Python 3.11 for backend and worker  
**Primary Dependencies**: Next.js 15, React 19, FastAPI, uv, pnpm workspaces, Docker Compose, PostgreSQL 16, MiniStack, ElasticMQ, Ruff, pytest, Vitest, Playwright  
**Storage**: PostgreSQL 16 for operational state; MiniStack for local S3-compatible object storage  
**Testing**: Vitest plus Testing Library and Playwright for frontend; pytest plus pytest-asyncio for backend and worker; Ruff, ESLint, Prettier, and shell smoke checks through root commands  
**Target Platform**: Linux or macOS developer machines with Docker Compose for local MVP work; AWS is the later hosting target  
**Tier / Sensitivity**: Tier-1 Map MVP; low direct people-impacting sensitivity and medium operational integrity sensitivity  
**Compliance / Trust Posture**: Advisory-only development foundation, no live customer data required, versioned setup contracts, explicit separation between local and hosted configuration  
**Project Type**: Monorepo web application plus API, worker, shared assets, and deployment support  
**Performance Goals**: First-time bootstrap to healthy full workspace in under 45 minutes; focused single-service startup in under 10 minutes; health and provisioning checks return actionable status within a few seconds  
**Constraints**: Local-first development, no mandatory production credentials, Docker-based supporting dependencies, MiniStack for the S3-compatible seam, separate SQS-compatible queue emulation, preserve AWS-aligned service contracts, keep operational complexity minimal  
**Scale/Scope**: One frontend, one backend, one worker, one shared asset area, one deployment surface, and three required local dependencies for MVP development

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- PASS: The MVP slice is explicit: bootstrap the monorepo, run the local
  runtime, validate service boundaries, and document the dependency seams for
  one frontend, one backend, and one worker. AWS hosting automation remains
  deferred.
- PASS: The expansion path is defined as a seam, not speculative infrastructure.
  MiniStack preserves the local S3 contract, ElasticMQ preserves the local SQS
  contract, and AWS remains a later deployment target rather than a second
  architecture.
- PASS: This feature does not add people-impacting product behavior. Human
  oversight and advisory-only boundaries remain unchanged, and setup expectations
  stay versioned and auditable.
- PASS: Data handling remains bounded to local configuration examples, sample
  data, and developer-operated services. No production credentials, live
  customer data, or broader tenant-isolation obligations are introduced.
- PASS: Validation, failure visibility, and operational readiness are
  proportional to the risk of the feature through documented health checks,
  dependency probes, and shared root validation commands.
- PASS: The only added complexity is the split between object-storage and queue
  emulation. That tradeoff is justified because the user explicitly rejected the
  bundled LocalStack surface and the simpler free alternative still preserves
  the AWS migration seam.

## Project Structure

### Documentation (this feature)

```text
specs/002-project-setup-foundation/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── developer-workspace-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
frontend/
├── app/
├── components/
├── lib/
├── tests/
└── package.json

backend/
├── src/
│   ├── api/
│   ├── core/
│   ├── models/
│   └── services/
├── tests/
└── pyproject.toml

worker/
├── src/
│   ├── jobs/
│   ├── queue/
│   ├── schedules/
│   └── services/
├── tests/
└── pyproject.toml

shared/
├── config/
├── contracts/
└── fixtures/

deploy/
├── docker/
│   ├── docker-compose.yml
│   └── *.sh
└── terraform/

scripts/
├── bootstrap.sh
├── dev.sh
├── format.sh
├── lint.sh
├── test.sh
├── healthcheck.sh
├── provision-local.sh
└── wait-for-dependencies.sh
```

**Structure Decision**: Keep the existing service-aligned monorepo layout with
top-level `frontend/`, `backend/`, `worker/`, `shared/`, `deploy/`, and
`scripts/` directories. This matches the current Map MVP service split, keeps
contributor navigation obvious, and lets local infrastructure, shared assets,
and later AWS deployment assets evolve without introducing a heavier
`apps/`/`packages/` abstraction before it is needed.

## Complexity Tracking

No constitution violations require additional justification.
