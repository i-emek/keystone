# Modul 5 — Technische Architektur

**Status:** Draft v2 (post-Critique-Synthese)
**Letzter Stand:** 2026-05-09

---

## 5.1 Makro-Architektur — Drei Layer

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

## 5.2 Tier-aware Tenancy-Modell (geändert post-Critique)

**Vorherige Entscheidung (verworfen):** Per-Tenant-DB für ALLE Customers.

**Neue Entscheidung:** **Tier-aware Tenancy** — Pooled für Map (Tier 1), Per-Tenant für Decide+ und Enterprise.

| Komponente | Map-Tier (Tier 1) | Decide-Tier (Tier 3, Phase 2) | Enterprise / Self-Host |
|---|---|---|---|
| Postgres + pgvector | **Pooled multi-tenant** mit Row-Level Security (RLS) | **Per-Tenant DB** | Per-Tenant DB / Self-Host |
| Encryption Keys | Per-Tenant Application-Level Encryption (PT-AE) auf shared DB | Per-Tenant KMS Keys | Per-Tenant KMS / Customer-supplied Keys |
| Processing Workers | Pooled k8s Worker mit Tenant-Isolation per Job | Per-Tenant Worker Pool | Per-Tenant / Customer-managed |
| LLM-Calls | Multi-Tenant über Provider, per-Tenant Budget-Caps | Multi-Tenant über Provider, per-Tenant Budget-Caps | OSS optional |
| Audit-Log (WORM) | Per-Tenant S3-Prefix mit Object Lock | Per-Tenant Bucket mit Object Lock | Per-Tenant / Customer-Bucket |

**Begründung des Re-Architects:**

- **COGS-Realität:** Per-Tenant-DB für 50-Eng-Map-Customer = ~$1k/mo COGS bei $1.25k MRR → Margin-trap (siehe Modul 8 §8.2 update)
- **Compliance-Logik:** Map-Tier-Daten (Topic-Coverage, Bus-Factor) sind weniger sensitive als Decide-Tier (Personen-spezifische Decisions). Hard-Isolation für sensitive Tier 3, Pooled für niedrigsensitive Tier 1 ist sauber argumentierbar
- **Skalierbarkeit:** Pooled Map-Tier erlaubt 30-Eng-Customer-Floor (statt 50-Eng); öffnet Series-A-Scaleups als ICP-Erweiterung

**Pooled-Tier Compliance-Argumentation:**
- Row-Level Security mit Per-Tenant Application-Level Encryption (PT-AE) → Cryptographic Tenant Isolation auch in Shared DB
- SOC 2 Type II + Pen-Test deckt Pooled-Pattern ab (Standard-Industry)
- Customer kann jederzeit zu Decide-Tier upgraden → automatic Migration zu Per-Tenant DB

## 5.3 Cloud-Strategie

**AWS-primary + Cloud-agnostic Abstraction.**

| Komponente | AWS-Primary | Self-Host-fähig (Phase 2) |
|---|---|---|
| Compute | ECS/EKS | k8s any cloud |
| Postgres | RDS (Pooled für Map, Per-Tenant für Decide+) | k8s-Postgres-Operator |
| Object Storage (Audit) | S3 + Object Lock | MinIO + WORM |
| KMS | AWS KMS | HashiCorp Vault |
| Queue | SQS | Redis Streams / NATS |
| Secrets | AWS Secrets Manager | Vault |

**Rule:** jede AWS-spezifische API hinter einem Interface; max. ~5% Code AWS-spezifisch.

## 5.4 Ingestion / Connector-Layer

| Connector | Implementierung | Datenfluss |
|---|---|---|
| **GitHub** | GitHub App | Webhooks (real-time) + REST-Backfill |
| **GitLab / Bitbucket** | OAuth App | Webhooks + REST |
| **Jira / Linear** | REST + Webhooks | Real-time Push + scheduled Pull |
| **Confluence / Notion** | REST + Webhooks | Real-time + Pull |
| **Slack** | Bolt App | Events API (real-time) |
| **Calendar** *(optional)* | Google API / MS Graph | Pull only |

**MVP-Connectoren (rescoped post-Critique):** GitHub + Jira + Slack only. Confluence in Phase 1b (Month 6–9).

Pattern: typed Adapter → produziert `RawEvent` in Queue → Normalization Layer transformiert zu typed `Activity`. **MCP-Wrapper** wo verfügbar.

## 5.5 LLM-Provider-Strategie (geändert post-Critique)

**Default: AWS Bedrock (Anthropic Claude + Cohere/Titan Embeddings) — unified Trust Boundary.**

**Begründung des Re-Architects:**

- Bedrock hält Customer-Daten innerhalb AWS-VPC-Region → Trust-Story "your data never leaves your VPC region" wird konsistent
- AWS DPA covers Customer für beide Modelle
- Reduziert Trust-Story-Konflikt (vorher Anthropic-Direct + OpenAI-Direct)

| Use-Case | Provider | Modus |
|---|---|---|
| **Reasoning / Classification** | Anthropic Claude (Sonnet primary, Haiku tiered) | **via AWS Bedrock** (Default) |
| **Embeddings** | Cohere Embed v3 oder Amazon Titan | **via AWS Bedrock** (Default) |
| **Fallback / Cost-Optimization** | LLM-Router routet zu OpenAI / direct API | Optional, Customer-Approval |
| **Enterprise Self-Host** | OSS-Switch (BGE-M3 Embeddings; OSS-Reasoning Phase 2) | Self-hosted GPU |

**`LLMProvider`-Interface bleibt Pflicht ab Tag 1** — Bedrock ist Default, Direct-API als Fallback-Option.

**OSS-Switch-Quality-Gate:** Bevor Enterprise-Tier mit OSS-Switch verkauft wird, **Quality-Parity-Test** zwischen Bedrock-Embeddings und BGE-M3 auf realen Customer-Daten. Wenn Quality-Drop > 15%, Enterprise-Sale gating.

## 5.6 LLM-Cost-Strategie

**Drei Cost-Driver:**

| Driver | Mitigation |
|---|---|
| **Embedding-Cost** (Bulk + Re-Embed) | Content-Hash-Dedup; Delta-Embedding; Sampling für Cluster-Bootstrap |
| **Classification-Inference** (per Activity) | Tiered Models (Haiku-Erstpass, Sonnet bei Low-Confidence); Batching; Cache pro Content-Hash |
| **Decision-Support-Inference** (Tier 3, Phase 2) | Niedrige Frequenz, höhere Genauigkeit gerechtfertigt; per-Decision Budget |

**Tiered-Model-Routing:**

```
Activity → Haiku (cheap, fast)
        ├─ confidence > τ_high → keep
        ├─ confidence < τ_high → Sonnet escalation
        └─ confidence < τ_low (after Sonnet) → Human Review queue
```

**Cost-Guards (post-Critique gehärtet):**
- Per-Tenant LLM-Budget mit Alerts und Hard-Stops
- **Worst-month-COGS-Modell**: pro Customer-Größe simuliert (200-Eng + Quarterly Major Tax-Change-Spike) — eingepreist
- Monthly Cost-Reports pro Customer (Trust-Bundle-Asset)
- Embedding-Cache TTL infinite (Content-Hash unique)

## 5.7 Audit-Pipeline (Modul-6-Anker)

**WORM-Storage-Architektur (unverändert):**

| Schicht | Technik |
|---|---|
| **Append-Only Decision Log** | Postgres Append-Only Table + S3-Object-Lock-Mirror |
| **Hash-Chain** | Each entry hashes `prev_hash + entry_content` — tampering detectable |
| **Immutability** | Object Lock 7-Year retention (Compliance Mode); Keystone-Admins können *nicht* löschen |
| **Auditor-Access** | Read-only RBAC-Rolle "Auditor" |
| **Optional Enterprise** | Zero-Knowledge-Audit mit customer-side Audit-DB |

**Hinweis MVP-Scope:** Tier-3-Decision-Log wird für Phase 2 gebaut. Im Tier-1-MVP ist Audit-Log auf Tier-1-Activity-Klassifikationen + Taxonomy-Changes scoped — leichter, aber Foundation steht.

## 5.8 Security-Modell

| Layer | Implementierung |
|---|---|
| **Network** | VPC-isolated Worker Pools; mTLS between Services |
| **Auth** | OIDC (SSO via Okta/Azure AD); MFA für Admin/Tier-3 Access |
| **RBAC** | Reader / Manager / Admin / Auditor / **HR-Read-only** *(neu)* |
| **Encryption** | Per-Tenant KMS für Decide+; Per-Tenant Application-Level Encryption für Map (Pooled) |
| **Secrets** | AWS Secrets Manager (Production) / Vault (Self-Host) |
| **Vulnerability Mgmt** | SCA + SAST in CI; quarterly Pen-Tests; SOC 2 Type II controls |

## 5.9 Observability & SRE

- **Per-Tenant Metrics-Dashboards** (intern für Keystone-Ops): Ingestion-Health, Classifier-Throughput, LLM-Cost-Tracking
- **Bias-Pipeline-Metrics** continuous (Disparate Impact Scores per Composite per Tenant)
- **Customer-Facing Status-Page** für SLA-Reporting
- **Error Budgets:** 99.5% SLO Application Layer; 99.0% Ingestion

## 5.10 Self-Host-Architektur (Phase 2 Enterprise — von Tag 1 mitgebaut)

| Aspekt | Setup |
|---|---|
| Deployment | Helm Chart, customer-managed k8s |
| Connectivity | Outbound-only zu Keystone Control Plane |
| Embedding | OSS-Switch zu BGE-M3 (self-hosted GPU-Pod) |
| Updates | Signed Release Bundles, customer applies on schedule |
| Telemetry | Opt-in, anonymized; Customer kann komplett deaktivieren |

**Self-Host-Topologie wird *von Tag 1* mitgebaut**, auch wenn erst Phase 2 verkauft.

## 5.11 Geofencing & Multi-Region

| Region | Phase | Datenresidenz |
|---|---|---|
| US-East (Default) | Phase 1 | US |
| US-West (DR) | Phase 1 | US |
| EU (Frankfurt) | Phase 2 | EU (DSGVO + AI Act) |

## 5.12 Stack-Übersicht

| Layer | Empfehlung |
|---|---|
| Frontend | React + TypeScript + Tailwind |
| API | Node/TypeScript (NestJS) |
| Background Workers | Python (Classifier, ML-heavy) + Node (Glue) |
| Postgres | 16+ mit pgvector (Pooled für Map, Per-Tenant für Decide+) |
| Queue | SQS (Cloud) / NATS (Self-Host) |
| LLM-Providers | **AWS Bedrock primary** (Anthropic + Cohere/Titan); Direct-API Fallback |
| IaC | Terraform |
| Container Orchestration | EKS Production / k8s vanilla Self-Host |
| CI/CD | GitHub Actions |

## 5.13 Pitfalls — Modul-spezifisch (post-Critique gehärtet)

| Pitfall | Risiko | Mitigation |
|---|---|---|
| Pooled-Tier-DB Cross-Tenant Leak | Compliance-Disaster | RLS + PT-AE + Pen-Test-Regimen + Bug-Bounty |
| Per-Tenant-DB Ops-Overhead (Decide+ only) | Bei Skalierung manageable | Automation: Terraform + DB-Provisioning-Service |
| LLM-Cost-Runaway | Re-Embedding bei Tax-Major-Change teuer | Hard Budget-Caps; Customer-Approval bei Major Re-Classification; Caching aggressiv |
| WORM-Audit Egress-Cost | S3 Object Lock + Hash-Chain teuer | Compression, Hot/Cold-Tier; Audit-Replay-Tool |
| Self-Host-Drift | Customer-Versionen veralten | Forced Min-Version-Policy; auto-pull Updates |
| MCP-Connector-Abhängigkeit | MCP-Standard im Wandel | Adapter-Pattern, Connector-Tests |
| **Bedrock-Vendor-Lock** *(neu)* | AWS-Bindung gesteigert | LLM-Router erlaubt Direct-API-Fallback; Self-Host-Pfad bleibt offen |
| **OSS-Switch-Quality-Drop** *(neu)* | Enterprise-Customer kriegen schlechtere Outputs | Quality-Parity-Test als Pre-Sale-Gate |

## 5.14 Strategische Implikationen

- **Modul 8 (Pricing):** Pooled-Map-Tier erlaubt 30-Eng-Floor und gesündere Margins; Per-Tenant nur Decide+
- **Modul 4 (Classifier):** OSS-Switch-Quality-Test als Gate für Enterprise-Sale
- **Modul 6 (Compliance):** Pooled-Tier-Compliance-Argumentation in Trust Bundle dokumentieren

---

## Brainstorming-Notizen

*(in folgenden Sessions ergänzen — z.B. konkrete RDS-Sizing, Bedrock-Cost-Modelle, Pooled-Tier RLS-Design-Spec)*

## Critique-Notizen (post-Synthese)

- VC #3 + #7 + Contrarian #11 hatten konvergente Treffer auf Per-Tenant-DB-COGS-Trap → §5.2 re-architected zu Tier-aware Tenancy
- VC #6 + Contrarian #6 auf Anthropic+OpenAI-Trust-Konflikt → §5.5 reframed auf Bedrock primary
- Worst-Month-COGS-Modell (VC Frage 6) explizit aufgenommen in §5.6
