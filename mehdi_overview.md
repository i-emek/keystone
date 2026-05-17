# Mehdi Overview

This document summarizes the current agreed direction for Keystone based on the
active MVP specification, plan, data model, and task plan.

Note: this overview follows the current active feature documents under
`specs/001-map-bus-factor-mvp/`. Some older product-paper drafts contain earlier
ideas that are no longer the current MVP decision.

## 1. Features Covered in the MVP

The MVP is a Tier-1 Map product focused on knowledge coverage and bus-factor risk.

Recommended implementation order for the narrowed feature set:

1. Shared-tenant hosting design with a later migration path to stronger isolation  
  Summary: This is the base architecture decision. It should be designed first so
  the MVP stays cheap to run now, but can later move to stronger tenant isolation
  without redesigning the product.

2. Pseudonymized contributor identities by default  
  Summary: This is the privacy baseline. All people-related views should start from
  pseudonymized identities so the system remains advisory and privacy-conscious by
  default.

3. Source onboarding for GitHub or GitLab, plus Jira or Confluence as the minimum
  publishable source set  
  Summary: This is the data entry point. Without connected sources, there is no map,
  no audit, and no discovery workflow.

4. Visibility of teams and sub-teams (hierarchy)  
  Summary: This should be introduced early because it affects how topics, audits,
  and search results are scoped and viewed across engineering groups.

5. Topic-map bootstrap from ingested engineering activity (initial draft)  
  Summary: The system analyzes ingested work and proposes an initial draft of
  engineering topics. These topics can be platform topics, business-system topics,
  or shared-service domains, depending on what actually represents meaningful
  ownership and knowledge coverage.

6. Topic management: topic rename, merge, split, and confirmation flows (manually
  controllable)  
  Summary: The draft map is not final. Operators need manual control to clean up,
  combine, separate, and confirm topics before the system is trusted.

7. Topic criticality: critical-topic confirmation by an approver  
  Summary: An approver such as a VPE or CTO identifies which topics matter most so
  the system can focus the audit on the knowledge risks that actually matter.

8. Bus-Factor Audit publishing (per topic/team)  
  Summary: This is the first major product outcome. It converts the curated topic
  map into an auditable bus-factor view showing single-owner and thin-coverage risk.

9. Auditable topic-map history and published audit history  
  Summary: This should ship with publishing, not much later. Users need to know what
  changed, who approved it, and which visible output came from which map state.

10. Confidence and coverage indicators on visible results  
   Summary: The system should show how reliable a result is and how much evidence
   supports it, instead of presenting answers as if they were always certain.

11. Knowledge Discovery / topic search: who is the best engineer to ask about a
   specific topic  
   Summary: After the first audit works, the next daily-use value is searchable
   topic discovery for managers and engineers.

12. Ranked experts and warm backups for a topic  
   Summary: This is the practical output of topic search. It should show not only
   the strongest expert, but also who could back them up if needed.

13. Controlled re-identification only in authorized views  
   Summary: Named identities should only appear in limited, audited views for
   authorized management roles. The exact allowed roles should be finalized in the
   RBAC policy.

14. Scenarios simulation: what would happen if resource X is hit by a bus  
   Summary: This is valuable, but it is more advanced than the core Map MVP because
   it moves from reporting current risk into modeling hypothetical changes. Under
   the current active spec, this is still better treated as a post-MVP extension.

Note: optional support for the third source remains compatible with the MVP, but it
does not need to be implemented before the minimum publishable source set works.

## 2. Features Planned After the MVP

Deferred until after the MVP:

- Pulse metrics, burnout signals, sprint realism, and broader activity analytics
- Reorg Discovery and full reorg simulation
- Retention-risk, promotion, layoff, or other people-decision support
- Slack-based collaboration signals
- Cross-customer benchmarking
- Self-host deployment packaging
- EU-region delivery
- Broader enterprise deployment motions beyond the preserved migration path

In short, the MVP is intentionally narrow: first prove the Map wedge, then expand.

## 3. What Data the UI Will Contain

The UI is not just a placeholder. It is part of the MVP and will expose the main
operator, approver, manager, and stakeholder workflows.

The UI will contain:

- Workspace and onboarding data
  Summary: This gives users the setup context for a customer workspace and shows
  whether the organization structure and source connections are ready for
  analysis.
  - Customer workspace name and setup state
  - Team and sub-team hierarchy where the tenant has that structure
  - Connected source types
  - Source authorization and sync status
  - Last sync timestamp

- Draft topic-map data
  Summary: This lets operators review how the system currently represents
  knowledge areas, including topic state, importance, confidence, and lineage
  over time.
  - Topic names
  - Topic status such as draft, active, archived, merged
  - Topic criticality
  - Topic confidence and activity counts
  - Topic lineage from rename, merge, or split actions

- Coverage and expert-discovery data
  Summary: This turns each topic into an actionable answer by showing who likely
  knows it best, who can back them up, and how strong the supporting evidence
  is.
  - Ranked experts per topic
  - Warm backups per topic
  - Coverage confidence
  - Evidence coverage summary such as activity count, time span, and source mix

- Audit and trust data
  Summary: This explains the published risk picture and preserves the history
  needed to understand what changed, when it changed, and why the current output
  can be trusted.
  - Published audit summaries
  - Bus-factor risk flags such as BF1, BF2, and mentor-loss style risk
  - Snapshot history over time
  - Topic-map change history
  - Approval and audit log trail

- Identity and access-sensitive data
  Summary: This keeps people data privacy-first by showing pseudonymized views
  by default and exposing named identities only through controlled, auditable
  access.
  - Pseudonymized contributor display by default
  - Re-identification request and justification flow for authorized management
    roles only, with final role scope decided by RBAC policy

The UI is therefore expected to support:

- Source setup
- Topic-map review
- Audit publication
- Topic search
- Audit-detail review
- Controlled named-view access

## 4. Architecture of the Whole Solution

The current architecture is a small monorepo with three main runtime surfaces plus
infrastructure and tests.

### High-Level Shape

```text
Frontend (React + TypeScript)
        |
        v
Backend API (Python + FastAPI)
        |
        +--> PostgreSQL + pgvector
        +--> Audit storage
        +--> Queue service
        |
        v
Worker Services (Python)
  - connectors
  - ingestion
  - classification
  - taxonomy/bootstrap
  - bias-related pipelines
```

### Main Parts

- Frontend
  - React + TypeScript
  - Browser UI for operators, approvers, managers, and stakeholders

- Backend API
  - Python 3.11 + FastAPI
  - Handles auth, RBAC, topic-map APIs, audit APIs, search APIs, and re-identification APIs

- Worker layer
  - Python services for source ingestion, normalization, classification, topic bootstrap, and background processing
  - Keeps heavier processing off the user request path

- Storage
  - PostgreSQL 16 with pgvector
  - Shared-tenant pooled data model for the Map MVP
  - Row-Level Security plus tenant-specific application-level encryption for sensitive Map data

- Audit and trust layer
  - Immutable audit history for published map and change events
  - Durable audit artifact storage

- Queue and async processing
  - SQS-compatible queue model in the design
  - Local emulator in development

### Deployment Approach

The agreed delivery posture is local-first:

- Build and validate the MVP locally first
- Use local Docker Compose for development and MVP validation
- Move to AWS only after the MVP feels stable enough to justify hosting cost

Planned hosted target later:

- Linux containers on AWS ECS/Fargate for hosted pilot use

### Why This Architecture

This structure is meant to stay simple enough for MVP delivery, while preserving
clear extension paths for:

- provider-hosted per-tenant deployments
- customer-hosted deployments
- broader enterprise isolation needs
- richer analytics after the Map MVP proves itself

## 5. Development Sequence

The planned development path is:

1. Set up local backend, worker, frontend, and local infrastructure
2. Build the shared foundation: auth, tenant isolation, encryption, models, queues, audit logging
3. Deliver the first shippable MVP slice:
   - connect sources
   - bootstrap the topic map
   - refine topics
   - publish the first bus-factor audit
4. Validate that slice locally
5. Add topic search and expert discovery
6. Add trust and audit-detail views
7. Harden the system for hosted pilots later

## 6. Short Conclusion

Keystone MVP is not trying to launch the full long-term product immediately.
It starts with one focused capability: turning engineering activity from GitHub or
GitLab plus Jira or Confluence into a topic map, a bus-factor audit, and a search
experience for experts and backups.

The UI is part of the MVP. The backend is Python-first. Development is local-first.
Cloud deployment is planned later, not on day one.