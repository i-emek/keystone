# Module 5 — Technical Architecture

**Status:** Draft v2 (post-critique synthesis)
**Last Updated:** 2026-05-09

---

## 5.1 Macro Architecture — Three Layers

```
┌─────────────────────────────────────────────────────────────┐
│  APPLICATION LAYER (Stateless, multi-tenant control)        │
│  ├─ Web UI (React)        ├─ Public API (REST + GraphQL)    │
│  ├─ Auth & RBAC           └─ Trust Bundle Generator         │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │
┌─────────────────────────────────────────────────────────────┐
│  PROCESSING LAYER (Tier-aware Tenancy)                      │
│  ├─ Classifier Service    ├─ Metric Engine                  │
│  ├─ Bias Audit Pipeline   ├─ Reorg Discovery (Phase 2)      │
│  ├─ Audit Logger (WORM)   └─ Decision Log Service           │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │
┌─────────────────────────────────────────────────────────────┐
│  INGESTION LAYER                                            │
│  MCP / Connector Adapters → Normalization → Activity Queue  │
│  ├─ Git    ├─ Jira    ├─ Confluence    ├─ Slack             │
└─────────────────────────────────────────────────────────────┘
```

## 5.2 Tier-Aware Tenancy Model (updated post-critique)

**Previous decision (discarded):** Per-tenant DB for ALL customers.

**New decision:** **Tier-aware tenancy** — pooled for Map (Tier 1), per-tenant for Decide+ and Enterprise.

| Component | Map Tier (Tier 1) | Decide Tier (Tier 3, phase 2) | Enterprise / Self-Host |
|---|---|---|---|
| Postgres + pgvector | **Pooled multi-tenant** with Row-Level Security (RLS) | **Per-tenant DB** | Per-tenant DB / self-host |
| Encryption Keys | Per-tenant application-level encryption (PT-AE) on shared DB | Per-tenant KMS keys | Per-tenant KMS / customer-supplied keys |
| Processing Workers | Pooled k8s workers with tenant isolation per job | Per-tenant worker pool | Per-tenant / customer-managed |
| LLM Calls | Multi-tenant through provider, per-tenant budget caps | Multi-tenant through provider, per-tenant budget caps | OSS optional |
| Audit Log (WORM) | Per-tenant S3 prefix with Object Lock | Per-tenant bucket with Object Lock | Per-tenant / customer bucket |

**Re-architect’s rationale:**

- **COGS reality:** a per-tenant DB for a 50-engineer Map customer means ~$1k/mo COGS at $1.25k MRR, which is a margin trap (see Module 8 §8.2 update)
- **Compliance logic:** Map-tier data (topic coverage, bus factor) is less sensitive than Decide-tier data (person-specific decisions). Hard isolation for sensitive Tier 3, pooled for lower-sensitivity Tier 1, is a clean argument
- **Scalability:** pooled Map tier lowers the customer floor to 30 engineers (from 50), opening up Series-A scaleups as an ICP extension

**Pooled-tier compliance argument:**
- Row-Level Security with per-tenant application-level encryption (PT-AE) → cryptographic tenant isolation even inside a shared DB
- SOC 2 Type II + penetration testing cover the pooled pattern (industry standard)
- A customer can upgrade to the Decide tier at any time → automatic migration to a per-tenant DB

## 5.3 Cloud Strategy

**AWS-primary + cloud-agnostic abstraction.**

| Component | AWS Primary | Self-Host Capable (phase 2) |
|---|---|---|
| Compute | ECS/EKS | k8s on any cloud |
| Postgres | RDS (pooled for Map, per-tenant for Decide+) | k8s Postgres operator |
| Object Storage (Audit) | S3 + Object Lock | MinIO + WORM |
| KMS | AWS KMS | HashiCorp Vault |
| Queue | SQS | Redis Streams / NATS |
| Secrets | AWS Secrets Manager | Vault |

**Rule:** every AWS-specific API sits behind an interface; at most ~5% of the codebase is AWS-specific.

## 5.4 Ingestion / Connector Layer

| Connector | Implementation | Data Flow |
|---|---|---|
| **GitHub** | GitHub App | Webhooks (real-time) + REST backfill |
| **GitLab / Bitbucket** | OAuth App | Webhooks + REST |
| **Jira / Linear** | REST + webhooks | Real-time push + scheduled pull |
| **Confluence / Notion** | REST + webhooks | Real-time + pull |
| **Slack** | Bolt App | Events API (real-time) |
| **Calendar** *(optional)* | Google API / MS Graph | Pull only |

**MVP connectors (rescoped post-critique):** GitHub + Jira + Slack only. Confluence moves to phase 1b (Month 6–9).

Pattern: typed adapter → produces `RawEvent` into the queue → normalization layer turns it into typed `Activity`. Use **MCP wrappers** where available.

## 5.5 LLM Provider Strategy (updated post-critique)

**Default: AWS Bedrock (Anthropic Claude + Cohere/Titan embeddings) — unified trust boundary.**

**Re-architect’s rationale:**

- Bedrock keeps customer data inside the AWS VPC region → the trust story "your data never leaves your VPC region" stays consistent
- AWS DPA covers the customer for both model families
- Reduces the trust-story conflict from the previous Anthropic-direct + OpenAI-direct setup

| Use Case | Provider | Mode |
|---|---|---|
| **Reasoning / Classification** | Anthropic Claude (Sonnet primary, Haiku tiered) | **via AWS Bedrock** (default) |
| **Embeddings** | Cohere Embed v3 or Amazon Titan | **via AWS Bedrock** (default) |
| **Fallback / Cost Optimization** | LLM router routes to OpenAI / direct API | Optional, customer approval required |
| **Enterprise Self-Host** | OSS switch (BGE-M3 embeddings; OSS reasoning in phase 2) | Self-hosted GPU |

**`LLMProvider` interface remains mandatory from day 1** — Bedrock is the default, direct API remains the fallback option.

**OSS-switch quality gate:** before the enterprise tier is sold with an OSS switch, run a **quality-parity test** between Bedrock embeddings and BGE-M3 on real customer data. If quality drops by more than 15%, the enterprise sale is gated.

## 5.6 LLM Cost Strategy

**Three cost drivers:**

| Driver | Mitigation |
|---|---|
| **Embedding cost** (bulk + re-embed) | Content-hash deduplication; delta embedding; sampling for cluster bootstrap |
| **Classification inference** (per activity) | Tiered models (Haiku first pass, Sonnet on low confidence); batching; cache by content hash |
| **Decision-support inference** (Tier 3, phase 2) | Lower frequency, higher accuracy justified; per-decision budget |

**Tiered model routing:**

```
Activity → Haiku (cheap, fast)
        ├─ confidence > τ_high → keep
        ├─ confidence < τ_high → Sonnet escalation
        └─ confidence < τ_low (after Sonnet) → Human review queue
```

**Cost guards (hardened post-critique):**
- Per-tenant LLM budget with alerts and hard stops
- **Worst-month COGS model:** simulated per customer size (200-engineer customer + quarterly major taxonomy-change spike) and priced in
- Monthly cost reports per customer (Trust Bundle asset)
- Infinite embedding-cache TTL (content hash unique)

## 5.7 Audit Pipeline (Module-6 anchor)

**WORM storage architecture (unchanged):**

| Layer | Technology |
|---|---|
| **Append-only decision log** | Postgres append-only table + S3 Object Lock mirror |
| **Hash chain** | Each entry hashes `prev_hash + entry_content` — tampering becomes detectable |
| **Immutability** | Object Lock with 7-year retention (compliance mode); Keystone admins *cannot* delete |
| **Auditor access** | Read-only RBAC role "Auditor" |
| **Optional Enterprise** | Zero-knowledge audit with a customer-side audit DB |

**MVP scope note:** the Tier-3 decision log is built for phase 2. In the Tier-1 MVP, the audit log is scoped to Tier-1 activity classifications + taxonomy changes, which is lighter while still laying the foundation.

## 5.8 Security Model

| Layer | Implementation |
|---|---|
| **Network** | VPC-isolated worker pools; mTLS between services |
| **Auth** | OIDC (SSO via Okta/Azure AD); MFA for admin/Tier-3 access |
| **RBAC** | Reader / Manager / Admin / Auditor / **HR read-only** *(new)* |
| **Encryption** | Per-tenant KMS for Decide+; per-tenant application-level encryption for Map (pooled) |
| **Secrets** | AWS Secrets Manager (production) / Vault (self-host) |
| **Vulnerability Mgmt** | SCA + SAST in CI; quarterly pen tests; SOC 2 Type II controls |

## 5.9 Observability & SRE

- **Per-tenant metrics dashboards** (internal to Keystone Ops): ingestion health, classifier throughput, LLM cost tracking
- **Bias-pipeline metrics** continuous (disparate-impact scores per composite per tenant)
- **Customer-facing status page** for SLA reporting
- **Error budgets:** 99.5% SLO application layer; 99.0% ingestion

## 5.10 Self-Host Architecture (phase 2 Enterprise — built from day 1)

| Aspect | Setup |
|---|---|
| Deployment | Helm chart, customer-managed k8s |
| Connectivity | Outbound-only to Keystone control plane |
| Embedding | OSS switch to BGE-M3 (self-hosted GPU pod) |
| Updates | Signed release bundles, applied on the customer’s schedule |
| Telemetry | Opt-in, anonymized; customer can disable it entirely |

**The self-host topology is built from day 1**, even if it is not sold until phase 2.

## 5.11 Geofencing & Multi-Region

| Region | Phase | Data Residency |
|---|---|---|
| US-East (default) | Phase 1 | US |
| US-West (DR) | Phase 1 | US |
| EU (Frankfurt) | Phase 2 | EU (GDPR + AI Act) |

## 5.12 Stack Overview

| Layer | Recommendation |
|---|---|
| Frontend | React + TypeScript + Tailwind |
| API | Node/TypeScript (NestJS) |
| Background Workers | Python (classifier, ML-heavy) + Node (glue) |
| Postgres | 16+ with pgvector (pooled for Map, per-tenant for Decide+) |
| Queue | SQS (cloud) / NATS (self-host) |
| LLM Providers | **AWS Bedrock primary** (Anthropic + Cohere/Titan); direct-API fallback |
| IaC | Terraform |
| Container Orchestration | EKS production / vanilla k8s self-host |
| CI/CD | GitHub Actions |

## 5.13 Pitfalls — Module-Specific (hardened post-critique)

| Pitfall | Risk | Mitigation |
|---|---|---|
| Pooled-tier DB cross-tenant leak | Compliance disaster | RLS + PT-AE + pen-test regimen + bug bounty |
| Per-tenant DB ops overhead (Decide+ only) | Manageable at scale | Automation: Terraform + DB provisioning service |
| LLM cost runaway | Major taxonomy changes make re-embedding expensive | Hard budget caps; customer approval for major reclassification; aggressive caching |
| WORM audit egress cost | S3 Object Lock + hash chain gets expensive | Compression, hot/cold tiering, audit replay tool |
| Self-host drift | Customer versions get stale | Forced minimum-version policy; auto-pull updates |
| MCP connector dependency | MCP standard is still evolving | Adapter pattern, connector tests |
| **Bedrock vendor lock-in** *(new)* | Stronger AWS coupling | LLM router supports direct-API fallback; self-host path stays open |
| **OSS-switch quality drop** *(new)* | Enterprise customers get worse outputs | Quality-parity test as pre-sale gate |

## 5.14 Strategic Implications

- **Module 8 (Pricing):** pooled Map tier enables a 30-engineer floor and healthier margins; per-tenant is reserved for Decide+
- **Module 4 (Classifier):** OSS-switch quality test becomes a gate for the enterprise sale
- **Module 6 (Compliance):** the pooled-tier compliance argument must be documented inside the Trust Bundle

---

## Brainstorming Notes

*(add in later sessions, for example concrete RDS sizing, Bedrock cost models, pooled-tier RLS design specs)*

## Critique Notes (post-synthesis)

- VC #3 + #7 + Contrarian #11 converged on the per-tenant-DB COGS trap → §5.2 re-architected to tier-aware tenancy
- VC #6 + Contrarian #6 on the Anthropic+OpenAI trust conflict → §5.5 reframed around Bedrock as primary
- Worst-month COGS modeling (VC question 6) is now explicitly included in §5.6