# Research: Keystone Map MVP

**Feature**: [spec.md](./spec.md)  
**Date**: 2026-05-17

## Decision 1: Build the Product Shell with Next.js

**Decision**: Use Next.js 15 with TypeScript 5.x for the operator and stakeholder
frontend.

**Rationale**: The product needs a web-first shell that supports onboarding,
topic review, search, audit views, and future stakeholder-facing flows without
building a separate front-end platform. Next.js keeps routing, server-side data
fetching options, and deployment packaging simple while remaining easy to run
locally.

**Alternatives considered**:
- A plain React SPA was rejected because it would recreate routing, loading, and
  deployment conventions that Next.js already gives the team.
- A Python-rendered UI was rejected because it slows down the product shell
  without improving the worker-heavy parts of the MVP.

## Decision 2: Keep API and Workers in Python

**Decision**: Use Python 3.11 with FastAPI for the backend API and keep
ingestion, topic mapping, coverage scoring, and risk generation in Python worker
runtimes.

**Rationale**: The intelligence pipeline is the core moat of the MVP, and it is
easier to keep connector normalization, model integration, scoring logic, and
audit-oriented processing in one server-side language. FastAPI also keeps REST
contracts, validation, and async I/O straightforward.

**Alternatives considered**:
- A TypeScript backend plus Python workers was rejected because it would split
  domain models and validation logic across two server-side stacks too early.
- A single in-process web app with no worker runtime was rejected because
  ingestion, bootstrap, and scoring are async workloads that should stay off the
  request path.

## Decision 3: Combine PostgreSQL, Object Storage, and a Queue

**Decision**: Use PostgreSQL 16 + pgvector for tenant, topic, evidence, and
scoring state; S3-compatible object storage for audit artifacts, cached
embeddings, and raw ingest staging; and an SQS-compatible queue for async jobs.

**Rationale**: The MVP needs ACID storage for tenant-scoped state and auditable
changes, cheap durable storage for immutable artifacts, and an async buffer for
connector and scoring workloads. This keeps the core design extensible without
turning the MVP into a distributed systems project.

**Alternatives considered**:
- PostgreSQL alone was rejected because immutable audit artifacts and cached
  derived assets fit object storage better than relational blobs.
- Celery plus Redis as the primary queue system was rejected because SQS is the
  target hosted queue and LocalStack gives a lower-friction local mirror.

## Decision 4: Stay Local-First but Preserve a Clean AWS Landing Zone

**Decision**: Develop and validate the MVP locally with Docker Compose,
PostgreSQL, and S3/SQS emulation first, then deploy the same services to AWS
ECS/Fargate, RDS, S3, SQS, and Bedrock when the product is ready.

**Rationale**: The constitution favors the smallest operationally credible slice.
Local-first development keeps cost and iteration time low, while queue,
storage, and model-provider interfaces keep the AWS move incremental rather than
a rewrite.

**Alternatives considered**:
- Building directly in AWS from day one was rejected because it increases cost,
  friction, and debugging overhead before the product is stable.
- Designing for Kubernetes or multi-cloud from day one was rejected because it
  adds operational complexity without current MVP value.

## Decision 5: Use a Shared-Tenant MVP with Tenant-Specific Encryption

**Decision**: Run the Map MVP in a shared-tenant environment with PostgreSQL
Row-Level Security and tenant-specific application-layer encryption for
sensitive Map data.

**Rationale**: The first release needs low hosting cost and a credible trust
story. A pooled environment keeps the economics realistic while still leaving a
clear seam for provider-hosted per-tenant or customer-hosted deployments later.

**Alternatives considered**:
- Per-tenant databases from day one were rejected because they inflate MVP COGS
  and ops burden too early.
- A purely pooled model without tenant-specific encryption was rejected because
  it weakens privacy and procurement readiness.

## Decision 6: Default Model Workloads to AWS Bedrock Behind an Interface

**Decision**: Use AWS Bedrock as the default embeddings and reasoning provider,
and keep model access behind a replaceable provider interface.

**Rationale**: Bedrock aligns with the later AWS hosting target and fits the
desired trust posture. A provider interface also keeps the system open to later
fallbacks or enterprise alternatives without contaminating the domain logic.

**Alternatives considered**:
- Direct multi-provider routing from day one was rejected because it adds cost,
  testing burden, and product ambiguity before the MVP proves demand.
- End-to-end local models were rejected because they increase operational burden
  and reduce quality before the core workflow is proven.

## Decision 7: Use a Hybrid Topic-Bootstrap Pipeline

**Decision**: Bootstrap topics with a hybrid pipeline that combines deterministic
source preprocessing, semantic clustering, structural signals where available,
and targeted LLM labeling or refinement only for ambiguous clusters.

**Rationale**: The spec now defines a clear middle path: use model assistance
where it adds value, but keep privacy exposure and cost low by avoiding broad
raw-activity dumps to an LLM.

**Alternatives considered**:
- Purely deterministic grouping was rejected because it would miss cross-source
  and alias-heavy topic patterns.
- End-to-end LLM topic generation was rejected because it is too costly, too
  opaque, and too broad in data exposure for the MVP trust posture.

## Decision 8: Make Coverage and Risk Outputs Confidence-Banded and Evidence-Gated

**Decision**: Represent user-facing confidence as `low`, `medium`, or `high`,
backed by internal numeric scoring; allow strong single-source evidence to show
provisional outputs; and require corroborating evidence or stronger sustained
evidence before surfacing high-confidence coverage and BF1, BF2, or mentor-loss
risk flags.

**Rationale**: This resolves the core tension in the scoring engine: the MVP must
stay useful on imperfect data, but it cannot overstate certainty for
organizationally sensitive outputs.

**Alternatives considered**:
- Suppressing all single-source outputs was rejected because many MVP customers
  will start with Git plus only partial secondary coverage.
- Showing risk flags whenever any evidence exists was rejected because it would
  overstate certainty and erode trust.

## Decision 9: Preserve Trust Through REST Contracts and Fixture-First Validation

**Decision**: Use a REST/OpenAPI contract between the Next.js frontend and the
FastAPI backend, and validate the pipeline with contract tests, fixture-driven
integration tests, and smoke end-to-end flows.

**Rationale**: The MVP needs explicit contracts for co-founder parallelism,
local-first demos, and later cloud deployment. Fixture-first validation also
lets the team iterate on ingestion, topic mapping, and scoring without waiting
for live customer integrations.

**Alternatives considered**:
- GraphQL was rejected because it adds client/server complexity without solving a
  current MVP bottleneck.
- Heavy end-to-end-only validation was rejected because the core risk lies in the
  worker pipeline and confidence gating, which are better tested with fixtures
  and contracts.