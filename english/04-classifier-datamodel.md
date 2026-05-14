# Module 4 — Classifier & Data Model

**Status:** Draft v2 (post-critique synthesis)
**Last Updated:** 2026-05-09

---

## 4.1 Hybrid Classifier — Three Layers

| Layer | Function | Maintained By |
|---|---|---|
| **Base Taxonomy** | Universal tech skills, frameworks, domains | Keystone, quarterly + publicly versioned |
| **Customer Embedding Layer** | Company-specific clusters from repos/tickets/docs | Auto-onboarding |
| **Human-in-the-Loop Refinement** | Confirmation / renaming / merge / criticality flag | VPE / CTO |

## 4.2 Base Taxonomy — Content

Structured across five dimensions, ~500 nodes initially, hierarchical (for example `Auth → OAuth → OAuth2`):

| Dimension | Examples |
|---|---|
| **Languages** | Python, Go, Rust, TypeScript, Kotlin, … |
| **Frameworks/Libraries** | React, Spring, Django, Next.js, FastAPI, … |
| **Data/Infra** | Postgres, MongoDB, Kafka, Redis, S3, K8s, Terraform, … |
| **Concepts** | Auth, Payments, Search, Real-Time, Streaming, ML-Ops, Microservices, … |
| **Practices** | Testing, CI/CD, Observability, Security, Performance, … |

**Maintained:** quarterly updates, **publicly versioned** the way NIST manages its frameworks, creating a trust marker and enabling external auditability.

## 4.3 Customer Embedding Layer — Onboarding Flow (rebuilt post-critique)

**Before:** ~30-minute VPE refinement call. **Discarded:** VPEs at Series B+ do not have time for that.

**New — operator/approver split:**

```
Day 0 (Connect):
  └─ MCP connectors: GitHub + Jira + Slack (MVP); Confluence in phase 1b

Day 0–2 (Auto-bootstrap):
  ├─ Pull 90–180 days of historical data
  ├─ Chunk + embed (sampling for large volumes)
  ├─ Cluster (HDBSCAN) on embeddings
  ├─ LLM names clusters based on centroids + samples
  └─ LLM pre-classifies topics into Critical / Standard / Low-Activity (pre-TC flags)

Day 3–5 (Operator refinement, ~60–90 min async):
  └─ Staff/Principal Engineer (operator persona):
     ├─ Reviews LLM cluster naming
     ├─ Merges / splits / renames
     └─ Adjusts pre-TC flags

Day 5–7 (VPE approval, <10 min):
  └─ VPE/CTO confirms top-10 critical-topic flags
     (LLM pre-classified, operator pre-validated → VPE only confirms)

Day 7+ (Live):
  ├─ New activities are classified (real-time + batch)
  ├─ HIL refinement loop: misclassification reports from EM/Staff feed back in
  └─ Quarterly drift review (operator layer; VPE approval only for major taxonomy changes)
```

**Output:** Customer-specific taxonomy = `Base ∪ company-specific topics`.

**Important (post-critique):** The HIL refinement loop is not just a UX detail. It is the primary moat builder (see Module 7 §7.2.2 — customer taxonomy + HIL refinement data flywheel).

## 4.4 Embedding Strategy (updated post-critique)

**Default: AWS Bedrock embeddings (Cohere Embed v3 or Amazon Titan) — unified trust boundary.**

**Before (discarded):** OpenAI text-embedding-3-large as the default. Discarded because customer data would go to a third-party AI lab, which undermines the trust story (see Module 5 §5.5).

| Mode | Model | Use Case |
|---|---|---|
| **Default** | **Cohere Embed v3 / Amazon Titan via Bedrock** | Standard tier — data stays in the customer’s AWS region |
| Direct-API fallback | OpenAI text-embedding-3-large | Optional, only with explicit customer approval |
| Enterprise self-host | BGE-M3 | Data residency / air-gapped |

- **Architecture:** abstracted behind an `EmbeddingProvider` interface (mandatory from day 1)
- **OSS-switch quality gate:** before Enterprise is sold with BGE-M3, run a **quality-parity test** between Bedrock embeddings and BGE-M3 on real customer data. A quality drop > 15% blocks the enterprise sale.
- **Trust Bundle:** OSS switch + self-host remains an enterprise feature

## 4.5 Code-Specific Handling — Structural + Semantic Hybrid (in the MVP)

Pure text embedding for code is mediocre. We build code classification as a **structural + semantic hybrid** from day 1:

| Step | Content |
|---|---|
| **Structural** | Parser extracts imports, function names, file paths, module hierarchies, package manifests (`package.json`, `pyproject.toml`, `go.mod`) |
| **Semantic** | README, RFCs, code comments, commit messages → embeddings |
| **Mapping** | Structural signals (for example `import kafka`) + semantic embeddings → composite classification + confidence |

**Strategic reason:** This is a differentiating moat versus competitors that only use naive text embeddings. Bus Factor on tech topics (Kafka, ML pipeline, auth service) is only precise with structural code analysis.

**MVP language (updated post-critique):** **One anchor language — TypeScript** (highest customer density in the ICP, strong tooling for structural parsing). Multi-language expansion in phase 1b/2:
- Phase 1b (Month 6–9): Python
- Phase 2a (Month 9–12): Go
- Phase 2b (Month 12+): Java/Kotlin

**Reasoning:** The contrarian memo flagged 4-language coverage as a money pit for the MVP. Instead, start with TypeScript, prove customer validation, then expand iteratively. **Naive embedding + path heuristics + LLM tagging** is the fallback for non-anchor languages in the MVP, and the quality drop is acceptable for time-to-market.

## 4.6 Customer Taxonomy — Continuously Editable (decided)

**Editing model:** Continuous, with versioning.

| Action | Audit Trigger | Reclassification |
|---|---|---|
| Add topic | Tax version bumped (minor) | Only new activities |
| Rename topic | Tax version bumped (minor) | Lineage preserved; old classifications point to the new name |
| Merge topics | Tax version bumped (major) | Reclassification of all historical activities triggered |
| Split topic | Tax version bumped (major) | Reclassification, with a confidence penalty until audit |
| Delete topic | Tax version bumped (major) | Activities reclassified to the closest fit; justification required |

**UX note:** Major changes require a confirmation dialog with an impact preview ("This change affects N activities and M reports").

## 4.7 Data Model — High-Level Schema

| Entity | Key Fields | Notes |
|---|---|---|
| `Person` | `pseudo_id`, `role`, `team`, `connected_identities[git, jira, slack]`, `tenure_start_date` | Pseudonymized; re-identification only via RBAC |
| `Topic` | `id`, `name`, `version`, `type[base\|customer]`, `parent_topic_id`, `criticality_flag`, `lineage[]` | Versioned; lineage tracks renames/merges |
| `Activity` | `id`, `person_id`, `source`, `source_ref`, `timestamp`, `raw_hash`, `classifications[{topic_id, confidence, classifier_version}]` | Multi-topic possible; hash used for dedup |
| `OwnershipSnapshot` | `person_id`, `topic_id`, `period`, `TAS`, `computed_at`, `confidence`, `model_versions{}` | Recomputability requirement |
| `RiskFlag` | `topic_id`, `type[BF1\|BF0\|MentorLoss]`, `severity`, `snapshot_id` | |
| `DecisionLog` (Tier 3) | `id`, `scenario_input`, `output_snapshot`, `user_id`, `justification`, `timestamp`, `model_version`, `taxonomy_version` | **Append-only, immutable** |
| `TaxonomyChange` | `change_id`, `type[add\|rename\|merge\|split\|delete]`, `actor_id`, `before`, `after`, `timestamp`, `justification` | Audit requirement from 4.6 |

## 4.8 Versioning — Two Axes

| Axis | Trigger | Handling |
|---|---|---|
| **Taxonomy version** | Topic changes (see 4.6) | Semver bumped; old classifications remain referencable |
| **Classifier model version** | LLM/embedding model update | Bumped; every output is tagged with the model version |

**Reclassification policy:**
- New activities: current model + taxonomy
- Historical activities: reclassified quarterly or on demand
- **Audit guarantee:** historical outputs remain reproducible with model version + snapshot

## 4.9 Vector Storage — Recommendation

**pgvector in tenant-isolated Postgres** (default).

| Option | Pro | Con | Decision |
|---|---|---|---|
| **pgvector / Postgres** | Simple ops, easy tenant isolation, self-host ready, no extra vendor | Performance limit ~10M vectors/tenant | ✅ **Default** |
| Pinecone | Managed, high performance | Vendor lock-in, cost, no self-host | ❌ |
| Weaviate | OSS, multi-tenant native | More complex ops stack | Phase 2 if volume outgrows pgvector |

One Postgres DB per customer (hard tenancy from Module 6) makes pgvector a clean fit for the tenant architecture.

## 4.10 Privacy by Design

- `Person` entities are internally **pseudonymized** (UUID, no name)
- Re-identification mapping sits in a separate encrypted table, retrievable only through RBAC
- **Per-tenant encryption keys** (KMS)
- **Data retention** configurable by tier:
  - Map: 3 years default
  - Pulse: 12–18 months
  - Decide: 90 days post-last-use for decision logs

## 4.11 Pitfalls — Module-Specific

| Pitfall | Risk | Mitigation |
|---|---|---|
| **Bad classifier = bad product** | Wrong topics → wrong metrics → lost trust → churn | Mandatory HIL during onboarding; quarterly calibration; customer feedback loop for misclassifications |
| **Embedding cost explosion** | Re-embedding 1M+ items quarterly gets expensive | Delta embedding (changed content only), sampling for cluster bootstrap, caching |
| **Taxonomy drift** | Customer taxonomies diverge, making cross-customer benchmarks impossible | Base taxonomy as anchor; customer topics mapped to base wherever possible; anonymized cross-customer benchmarks in phase 2 |
| **Slack noise** | Memes, GIFs, and one-reply threads create junk classifications | Substantive filter (Module 3); confidence penalty for Slack-only signals |
| **Code embedding remains mediocre** | Naive text embedding poorly understands code semantics | Structural + semantic hybrid (see 4.5) |
| **Taxonomy editing chaos** | VPE can undermine auditability through frequent changes | Major changes require impact preview + justification; major changes limited to quarterly review windows |

## 4.12 Strategic Implications

- **Module 5 (Tech):** Embedding-provider abstraction layer + per-tenant Postgres + KMS are mandatory
- **Module 6 (Compliance):** Taxonomy versioning becomes an audit anchor; OSS switch is a Trust Bundle feature
- **Module 8 (Pricing):** OSS switch + self-host are enterprise-tier differentiators

---

## Brainstorming Notes

*(add in later sessions, for example concrete pgvector performance benchmarks, operator-vs-approver UX mockups, cross-customer benchmark modes, quality-parity test spec)*

## Critique Notes (post-synthesis)

- Contrarian #6 + VC #6 → §4.4: embedding default moved to Bedrock (Cohere/Titan) for a unified trust boundary
- Contrarian #7 → §4.5: MVP languages reduced to 1 anchor language (TypeScript), with iterative expansion
- Contrarian #8 → §4.3: onboarding flow rebuilt around the operator/approver split; VPE time <10 min
- Customer taxonomy + HIL refinement is explicitly highlighted as a moat builder (Module 7 §7.2.2)