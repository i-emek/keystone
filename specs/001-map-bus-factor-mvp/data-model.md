# Data Model: Keystone Map MVP

## Overview

The MVP revolves around a customer workspace that ingests engineering activity,
classifies it into reviewable topics, computes coverage and authority snapshots,
produces BF1/BF2/mentor-loss risk flags, and publishes auditable outputs.
Contributor identities remain pseudonymized by default, and confidence is shown
to users as `low`, `medium`, or `high` even though scoring uses internal numeric
values and thresholds.

## Entities

### Customer Workspace

| Field | Type | Rules |
|---|---|---|
| `workspace_id` | UUID | Primary identifier |
| `name` | String | Required, unique in operator UI |
| `deployment_mode` | Enum | `shared_tenant`, later `provider_per_tenant`, `customer_hosted` |
| `tier` | Enum | `map` in MVP |
| `default_region` | Enum | `us` only in MVP |
| `created_at` | Timestamp | Required |

### Team Scope

| Field | Type | Rules |
|---|---|---|
| `team_id` | UUID | Primary identifier |
| `workspace_id` | UUID | Foreign key |
| `name` | String | Required |
| `parent_team_id` | UUID | Nullable self-reference for simple sub-team hierarchy |
| `status` | Enum | `active`, `archived` |
| `created_at` | Timestamp | Required |

Validation rules:
- Team depth is intentionally shallow in MVP: team and sub-team only.
- Archived teams remain referentially available for prior published audits.

### Source Connection

| Field | Type | Rules |
|---|---|---|
| `connection_id` | UUID | Primary identifier |
| `workspace_id` | UUID | Foreign key |
| `source_type` | Enum | `github`, `gitlab`, `jira`, `confluence` |
| `status` | Enum | `pending`, `authorized`, `syncing`, `ready`, `degraded`, `disconnected` |
| `last_synced_at` | Timestamp | Nullable until first sync |
| `scope_summary` | JSON | Stored summary of granted scopes |

### Contributor Profile

| Field | Type | Rules |
|---|---|---|
| `person_id` | UUID | Primary identifier |
| `workspace_id` | UUID | Foreign key |
| `primary_team_id` | UUID | Nullable foreign key to team scope |
| `pseudonym` | String | Required, displayed by default |
| `role_label` | String | Optional organizational label |
| `tenure_start_date` | Date | Optional |
| `identity_refs` | Encrypted JSON | Provider identifiers, never exposed by default |
| `created_at` | Timestamp | Required |

Validation rules:
- Real identities are stored separately from user-facing views.
- Re-identification requires an authorized role, a justification, and an audit event.

### Topic

| Field | Type | Rules |
|---|---|---|
| `topic_id` | UUID | Primary identifier |
| `workspace_id` | UUID | Foreign key |
| `name` | String | Required |
| `status` | Enum | `draft`, `active`, `archived`, `merged` |
| `criticality` | Enum | `critical`, `standard`, `low_activity` |
| `parent_topic_id` | UUID | Nullable self-reference |
| `taxonomy_version` | String | Required for reproducibility |
| `lineage` | JSON | Tracks merge, split, rename, and carry-forward history |
| `created_at` | Timestamp | Required |

### Activity Evidence

| Field | Type | Rules |
|---|---|---|
| `activity_id` | UUID | Primary identifier |
| `workspace_id` | UUID | Foreign key |
| `person_id` | UUID | Foreign key to contributor profile |
| `source_type` | Enum | `github`, `gitlab`, `jira`, `confluence` |
| `source_ref` | String | Provider-native reference |
| `occurred_at` | Timestamp | Required |
| `raw_hash` | String | Required for deduplication and embedding cache reuse |
| `content_summary` | Encrypted Text | Minimal retained payload for topic and evidence explanations |
| `review_signal` | Boolean | True when the evidence is review-centric rather than direct authorship |

Validation rules:
- Only fields required for Map use cases are retained.
- Duplicate content hashes within a tenant collapse to one retained evidence record.

### Topic Classification

| Field | Type | Rules |
|---|---|---|
| `classification_id` | UUID | Primary identifier |
| `activity_id` | UUID | Foreign key |
| `topic_id` | UUID | Nullable foreign key when bucketed rather than assigned |
| `bucket` | Enum | `assigned`, `needs_review`, `unassigned` |
| `confidence_score` | Decimal | Range `0.0` to `1.0` |
| `classifier_version` | String | Required |
| `model_version` | String | Required |
| `signal_type` | Enum | `structural`, `semantic`, `hybrid` |
| `source_agreement_count` | Integer | Number of source families supporting the classification |

Validation rules:
- `topic_id` is nullable only when `bucket` is `needs_review` or `unassigned`.
- Low-confidence evidence stays bucketed instead of being forced into a topic.

### Coverage Snapshot

| Field | Type | Rules |
|---|---|---|
| `snapshot_id` | UUID | Primary identifier |
| `workspace_id` | UUID | Foreign key |
| `topic_id` | UUID | Foreign key |
| `period_start` | Timestamp | Required |
| `period_end` | Timestamp | Required |
| `coverage_confidence_band` | Enum | `low`, `medium`, `high` |
| `coverage_confidence_score` | Decimal | Internal numeric score used for thresholding |
| `provisional` | Boolean | True when visible from strong single-source evidence only |
| `corroborated_source_count` | Integer | Count of distinct source families supporting the topic |
| `activity_count` | Integer | Required |
| `evidence_window_days` | Integer | Required |
| `score_version` | String | Required |
| `computed_at` | Timestamp | Required |

### Topic Authority Record

| Field | Type | Rules |
|---|---|---|
| `authority_record_id` | UUID | Primary identifier |
| `snapshot_id` | UUID | Foreign key |
| `topic_id` | UUID | Foreign key |
| `person_id` | UUID | Foreign key |
| `rank` | Integer | Required, unique per topic snapshot |
| `role_in_topic` | Enum | `primary`, `warm_backup` |
| `authority_score` | Decimal | Internal blended ranking score |
| `contribution_breadth_score` | Decimal | Sustained breadth signal |
| `ownership_signal_score` | Decimal | Ownership or stewardship signal |
| `review_signal_score` | Decimal | Review or mentoring signal |
| `recency_modifier` | Decimal | Non-primary ranking modifier |
| `sustained_days` | Integer | Evidence span for this contributor on the topic |
| `corroborated_source_count` | Integer | Distinct sources supporting this contributor-topic link |

Validation rules:
- Exactly one `primary` record may exist per topic snapshot.
- `warm_backup` requires meaningful but secondary evidence across enough activity
  or time to remain credible and must rank below the primary authority holder.

### Risk Flag

| Field | Type | Rules |
|---|---|---|
| `risk_flag_id` | UUID | Primary identifier |
| `snapshot_id` | UUID | Foreign key |
| `topic_id` | UUID | Foreign key |
| `risk_type` | Enum | `bf1`, `bf2`, `mentor_loss` |
| `severity` | Enum | `low`, `medium`, `high` |
| `confidence_band` | Enum | `low`, `medium`, `high` |
| `trigger_person_ids` | Array<UUID> | Contributing people behind the risk explanation |
| `rule_version` | String | Required |
| `rationale_summary` | String | Human-readable explanation |

Validation rules:
- `bf1` means one dominant authority with no credible bench.
- `bf2` means authority concentrated in the top two contributors with weak bench behind them.
- `mentor_loss` means losing a review-heavy or mentoring bridge contributor would materially weaken readiness.
- High-confidence risk flags require corroborating evidence or stronger sustained evidence, not only a thin single-source signal.

### Impact Preview

| Field | Type | Rules |
|---|---|---|
| `preview_id` | UUID | Primary identifier |
| `workspace_id` | UUID | Foreign key |
| `scope_type` | Enum | `topic`, `team` |
| `scope_id` | UUID | Topic or team identifier |
| `unavailable_person_id` | UUID | Contributor whose absence is being previewed |
| `baseline_snapshot_id` | UUID | Snapshot used as the comparison baseline |
| `projected_confidence_band` | Enum | `low`, `medium`, `high` |
| `projected_backup_posture` | Enum | `stable`, `degraded`, `critical` |
| `generated_at` | Timestamp | Required |

Validation rules:
- Impact preview is advisory only and must never mutate the baseline snapshot.
- Preview results are derived from approved topics or teams, not hidden employee scoring.

### Published Audit

| Field | Type | Rules |
|---|---|---|
| `audit_id` | UUID | Primary identifier |
| `workspace_id` | UUID | Foreign key |
| `published_by` | UUID | Approver identifier |
| `published_at` | Timestamp | Required |
| `snapshot_ids` | Array<UUID> | Required |
| `coverage_summary` | JSON | Required summary of coverage posture |
| `integrity_hash` | String | Required |

### Map Change Record

| Field | Type | Rules |
|---|---|---|
| `change_id` | UUID | Primary identifier |
| `workspace_id` | UUID | Foreign key |
| `actor_id` | UUID | Required |
| `change_type` | Enum | `add`, `rename`, `merge`, `split`, `delete`, `criticality_update` |
| `before_state` | JSON | Required |
| `after_state` | JSON | Required |
| `justification` | Text | Required for destructive or visibility-changing changes |
| `created_at` | Timestamp | Required |

### Audit Log Entry

| Field | Type | Rules |
|---|---|---|
| `audit_log_id` | UUID | Primary identifier |
| `workspace_id` | UUID | Foreign key |
| `event_type` | String | Required |
| `actor_id` | UUID | Nullable for system events |
| `resource_type` | String | Required |
| `resource_id` | UUID/String | Required |
| `occurred_at` | Timestamp | Required |
| `previous_hash` | String | Nullable for first event |
| `current_hash` | String | Required |

### Re-identification Event

| Field | Type | Rules |
|---|---|---|
| `reidentify_event_id` | UUID | Primary identifier |
| `workspace_id` | UUID | Foreign key |
| `person_id` | UUID | Foreign key |
| `requested_by` | UUID | Required |
| `purpose` | String | Required |
| `justification` | Text | Required |
| `approved_scope_type` | Enum | `topic`, `team`, `workspace` |
| `occurred_at` | Timestamp | Required |

## Derived Read Models

### Topic Activity View

Built from `Activity Evidence` joined to `Topic Classification` and
`Contributor Profile`, ordered by `occurred_at`, and filtered by topic plus role
visibility rules.

### Topic Search Result

Built from the latest `Coverage Snapshot`, its `Topic Authority Records`, and
eligible `Risk Flags`, with pseudonymized names by default.

## Relationships

- A customer workspace owns many teams, source connections, contributors,
  topics, activity records, coverage snapshots, audits, and audit log entries.
- A team may contain one level of child teams and many contributors.
- A contributor produces many activity evidence records and may appear in many
  authority records across topics.
- Each activity record can map to a topic or to a review bucket through topic
  classifications.
- Each coverage snapshot owns many authority records and risk flags.
- Each impact preview compares one contributor absence against one approved topic
  or team scope.
- Each published audit references one or more coverage snapshots and the risk
  flags derived from them.
- Topic changes and re-identification events both emit immutable audit log entries.

## State Transitions

### Source Connection

`pending` -> `authorized` -> `syncing` -> `ready`

Failure paths:
- `authorized` -> `degraded`
- `ready` -> `degraded`
- Any state -> `disconnected`

### Topic

`draft` -> `active`

Alternate paths:
- `draft` -> `merged`
- `active` -> `merged`
- `active` -> `archived`

### Topic Classification

`unassigned` -> `needs_review` -> `assigned`

Alternate path:
- `needs_review` -> `unassigned`

### Published Audit

`draft_snapshot` -> `published` -> `superseded`

## Derived Rules

- A publishable audit requires Git plus either Jira or Confluence and must meet
  the configured minimum evidence threshold.
- Strong single-source evidence may surface provisional topic outputs, but
  high-confidence coverage and BF1/BF2/mentor-loss risk flags require
  corroborating evidence from another source family or stronger sustained evidence.
- User-facing confidence stays banded as `low`, `medium`, or `high` even though
  thresholds come from internal numeric scores.
- Historical audits remain reproducible because snapshot, taxonomy, scoring, and
  classifier versions are retained together.
- Contributor identities stay pseudonymized in shared-tenant storage and only
  become named in authorized tenant views.