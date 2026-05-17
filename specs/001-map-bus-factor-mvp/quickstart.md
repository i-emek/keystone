# Quickstart: Keystone Map MVP

## Goal

Run the planned MVP locally, load or connect eligible source data, bootstrap a
reviewable topic map, publish a first bus-factor audit, and validate search,
activity, confidence-gating, impact-preview, and audit-history flows before any
AWS deployment work begins.

## Prerequisites

- Node.js 20 LTS and pnpm
- Python 3.11
- Docker and Docker Compose
- AWS credentials with Bedrock access, or a local mock provider mode for pure fixture-based development

## 1. Install Dependencies

```bash
pnpm install
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt -r worker/requirements.txt
```

## 2. Start Local Infrastructure

```bash
docker compose up -d postgres localstack
```

Expected local services:
- PostgreSQL 16 with pgvector enabled
- Local S3/SQS-compatible emulator for audit artifacts, raw ingest staging, and queue flows

## 3. Configure Environment

Create a `.env` file with at least:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
DATABASE_URL=postgresql://keystone:keystone@localhost:5432/keystone
AWS_REGION=us-east-1
BEDROCK_EMBEDDING_MODEL=cohere.embed-v3
BEDROCK_REASONING_MODEL=anthropic.claude-3-haiku
AUDIT_BUCKET=keystone-audit-local
INGEST_BUCKET=keystone-ingest-local
QUEUE_URL=http://localhost:4566/000000000000/keystone-events
AWS_ENDPOINT_URL=http://localhost:4566
TENANT_ENCRYPTION_MASTER_KEY=local-dev-master-key
```

## 4. Apply Migrations and Seed a Sample Tenant

```bash
python -m backend.scripts.migrate
python -m backend.scripts.seed_design_partner
```

The seed should create:
- one shared-tenant customer workspace
- a simple team and sub-team hierarchy
- pseudonymized contributors
- sample Git plus Jira or Confluence activity evidence
- cached fixture outputs for topic bootstrap and scoring regression tests

## 5. Start the Application Surfaces

```bash
uvicorn backend.src.main:app --reload --port 8000
pnpm --filter frontend dev -- --port 3000
python -m worker.src.main
```

## 6. Connect Sources or Load Fixtures

Choose one path:

1. Connect GitHub or GitLab plus Jira or Confluence through the onboarding UI.
2. Load fixture payloads through the seed tooling for local development and demos.

Minimum publishable source set:
- GitHub or GitLab
- Jira or Confluence

## 7. Bootstrap and Refine the Topic Map

1. Trigger topic-map bootstrap from the onboarding flow.
2. Review suggested topics as the operator persona.
3. Rename, merge, split, or confirm topics.
4. Review any `needs-review` or `unassigned` activity buckets.
5. Mark critical topics as the approver persona.

## 8. Publish the First Audit

1. Publish the bus-factor audit.
2. Verify that each visible topic result shows confidence and evidence coverage.
3. Confirm that low-confidence results are suppressed and that strong
	single-source results remain clearly provisional.
4. Confirm BF1, BF2, and mentor-loss risk flags only appear when the evidence gate is met.

## 9. Validate Search, Activity, and Impact Preview

1. Search for a known topic and confirm ranked experts and warm backups appear.
2. Open the per-topic activity view and confirm recent contributor activity is visible.
3. Run a person-loss impact preview for a selected contributor on one topic or team.
4. Confirm that projected confidence and backup posture degrade without mutating the baseline snapshot.

## 10. Validate Audit History and Re-Identification Controls

1. Open the published audit and confirm the risk flags are visible.
2. Review the audit trail and topic change history.
3. Trigger a named-view lookup and confirm re-identification requires a justification and is logged.

## 11. Clean Up

```bash
docker compose down
deactivate
```

## Expected Outcome

At the end of this quickstart, a local shared-tenant MVP environment should be
able to ingest eligible source data, publish a first audit, expose topic search,
activity context, and simple person-loss previews, enforce provisional versus
high-confidence gating, and preserve an auditable path for topic changes and
re-identification events.