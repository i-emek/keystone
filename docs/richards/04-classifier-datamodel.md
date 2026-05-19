# Modul 4 — Classifier & Datenmodell

**Status:** Draft v2 (post-Critique-Synthese)
**Letzter Stand:** 2026-05-09

---

## 4.1 Hybrid-Classifier — Drei Schichten

| Schicht | Funktion | Maintained von |
|---|---|---|
| **Base Taxonomy** | Universelle Tech-Skills, Frameworks, Domains | Keystone, quarterly + public versioned |
| **Customer Embedding Layer** | Firmenspezifische Cluster aus Repos/Tickets/Docs | Auto-Onboarding |
| **Human-in-the-Loop Refinement** | Bestätigung / Renaming / Merge / Criticality-Flag | VPE / CTO |

## 4.2 Base Taxonomy — Inhalt

Strukturiert in fünf Dimensionen, ~500 Knoten initial, hierarchisch (z.B. `Auth → OAuth → OAuth2`):

| Dimension | Beispiele |
|---|---|
| **Languages** | Python, Go, Rust, TypeScript, Kotlin, … |
| **Frameworks/Libraries** | React, Spring, Django, Next.js, FastAPI, … |
| **Data/Infra** | Postgres, MongoDB, Kafka, Redis, S3, K8s, Terraform, … |
| **Concepts** | Auth, Payments, Search, Real-Time, Streaming, ML-Ops, Microservices, … |
| **Practices** | Testing, CI/CD, Observability, Security, Performance, … |

**Maintained:** quarterly Updates, **public versioned** wie NIST seine Frameworks führt — Trust-Marker und ermöglicht externe Auditierung.

## 4.3 Customer Embedding Layer — Onboarding-Flow (post-Critique umgebaut)

**Vorher:** ~30 Min VPE-Refinement-Call. **Verworfen:** VPEs at Series B+ haben das nicht.

**Neu — Operator/Approver-Trennung:**

```
Tag 0 (Connect):
  └─ MCP-Connectoren: GitHub + Jira + Slack (MVP); Confluence Phase 1b

Tag 0–2 (Auto-Bootstrap):
  ├─ Pull 90–180 Tage historischer Daten
  ├─ Chunk + Embed (sampling bei großen Volumes)
  ├─ Cluster (HDBSCAN) auf Embeddings
  ├─ LLM benennt Cluster anhand Centroids + Samples
  └─ LLM-Pre-Klassifiziert Topics in Critical / Standard / Low-Activity (Pre-TC-Flags)

Tag 3–5 (Operator-Refinement, ~60–90 Min Async):
  └─ Staff/Principal Engineer (Operator-Persona):
     ├─ Reviewt LLM-Cluster-Naming
     ├─ Merge / Split / Rename
     └─ Adjustiert Pre-TC-Flags

Tag 5–7 (VPE-Approval, <10 Min):
  └─ VPE/CTO: bestätigt Top-10 Critical-Topic-Flags
     (LLM-pre-classified, Operator-pre-validated → VPE bestätigt nur)

Tag 7+ (Live):
  ├─ Neue Activities werden klassifiziert (real-time + batch)
  ├─ HIL-Refinement-Loop: Mis-Classification-Reports von EM/Staff fließen ein
  └─ Quarterly Drift-Review (Operator-Layer; VPE-Approval nur bei Major-Tax-Changes)
```

**Output:** Customer-Specific Taxonomy = `Base ∪ Firm-Specific Topics`.

**Wichtig (post-Critique):** Der HIL-Refinement-Loop ist nicht nur UX-Detail, sondern primärer Moat-Builder (siehe Modul 7 §7.2.2 — Customer-Taxonomy + HIL-Refinement Data Flywheel).

## 4.4 Embedding-Strategie (geändert post-Critique)

**Default: AWS Bedrock Embeddings (Cohere Embed v3 oder Amazon Titan) — unified Trust Boundary.**

**Vorher (verworfen):** OpenAI text-embedding-3-large als Default. Verworfen weil Customer-Daten an dritte AI-Lab gehen, was Trust-Story untergräbt (siehe Modul 5 §5.5).

| Modus | Modell | Use-Case |
|---|---|---|
| **Default** | **Cohere Embed v3 / Amazon Titan via Bedrock** | Standard-Tier — Daten bleiben in Customer-AWS-Region |
| Direct-API Fallback | OpenAI text-embedding-3-large | Optional, nur mit explicit Customer-Approval |
| Enterprise Self-Host | BGE-M3 | Data-Residency / Air-Gapped |

- **Architektur:** abstrahiert per `EmbeddingProvider` Interface (Pflicht ab Tag 1)
- **OSS-Switch-Quality-Gate:** Bevor Enterprise mit BGE-M3 verkauft wird, **Quality-Parity-Test** zwischen Bedrock-Embeddings und BGE-M3 auf realen Customer-Daten. Quality-Drop > 15% blockt Enterprise-Sale
- **Trust Bundle:** OSS-Switch + Self-Host bleibt Enterprise-Feature

## 4.5 Code-Spezial-Behandlung — Structural + Semantic Hybrid (im MVP)

Reines Text-Embedding für Code ist mediocre. Wir bauen Code-Klassifikation **strukturell + semantisch hybrid** ab Tag 1:

| Schritt | Inhalt |
|---|---|
| **Strukturell** | Parser extrahiert Imports, Function-Names, File-Paths, Module-Hierarchien, Package-Manifeste (`package.json`, `pyproject.toml`, `go.mod`) |
| **Semantisch** | README, RFCs, Code-Comments, Commit-Messages → Embedding |
| **Mapping** | Strukturelle Signale (z.B. `import kafka`) + semantische Embeddings → Composite Classification + Confidence |

**Strategischer Grund:** Differenzierungs-Moat gegen Konkurrenz, die nur naives Text-Embedding nutzt. Bus-Factor auf Tech-Topics (Kafka, ML-Pipeline, Auth-Service) ist nur mit struktureller Code-Analyse präzise.

**MVP-Sprache (geändert post-Critique):** **Eine Anchor-Sprache — TypeScript** (höchste Customer-Density im ICP, gute Toolchain für strukturelle Parsing). Multi-Language-Expansion in Phase 1b/2:
- Phase 1b (Month 6–9): Python
- Phase 2a (Month 9–12): Go
- Phase 2b (Month 12+): Java/Kotlin

**Begründung:** Contrarian-Memo flaggte 4-Sprachen-Coverage als Money-Pit für MVP. Stattdessen mit TypeScript starten, Customer-Validierung zeigen, dann iterativ erweitern. **Naive Embedding + Path-Heuristics + LLM-Tagging** ist Fallback für non-Anchor-Sprachen im MVP — Quality-Drop akzeptiert für Time-to-Market.

## 4.6 Customer Taxonomy — Kontinuierlich editierbar (entschieden)

**Editier-Modell:** Continuous mit Versioning.

| Aktion | Audit-Trigger | Re-Klassifikation |
|---|---|---|
| Add Topic | Tax-Version bumped (minor) | Nur neue Activities |
| Rename Topic | Tax-Version bumped (minor) | Lineage-Erhalt; alte Klassifikationen referenzieren neuen Namen |
| Merge Topics | Tax-Version bumped (major) | Re-Klassifikation aller historischen Activities ausgelöst |
| Split Topic | Tax-Version bumped (major) | Re-Klassifikation, mit Confidence-Penalty bis Audit |
| Delete Topic | Tax-Version bumped (major) | Activities re-klassifiziert auf nächst-passende; Justification Pflicht |

**UX-Hinweis:** Major-Changes erfordern Confirmation-Dialog mit Impact-Preview ("Diese Änderung beeinflusst N Activities und M Reports").

## 4.7 Datenmodell — High-Level Schema

| Entität | Schlüsselfelder | Notes |
|---|---|---|
| `Person` | `pseudo_id`, `role`, `team`, `connected_identities[git, jira, slack]`, `tenure_start_date` | Pseudonymisiert; Re-ID nur via RBAC |
| `Topic` | `id`, `name`, `version`, `type[base\|customer]`, `parent_topic_id`, `criticality_flag`, `lineage[]` | Versioniert; Lineage trackt Renames/Merges |
| `Activity` | `id`, `person_id`, `source`, `source_ref`, `timestamp`, `raw_hash`, `classifications[{topic_id, confidence, classifier_version}]` | Multi-Topic möglich; Hash für Dedup |
| `OwnershipSnapshot` | `person_id`, `topic_id`, `period`, `TAS`, `computed_at`, `confidence`, `model_versions{}` | Re-Computability-Pflicht |
| `RiskFlag` | `topic_id`, `type[BF1\|BF0\|MentorLoss]`, `severity`, `snapshot_id` | |
| `DecisionLog` (Tier 3) | `id`, `scenario_input`, `output_snapshot`, `user_id`, `justification`, `timestamp`, `model_version`, `taxonomy_version` | **Append-only, unveränderbar** |
| `TaxonomyChange` | `change_id`, `type[add\|rename\|merge\|split\|delete]`, `actor_id`, `before`, `after`, `timestamp`, `justification` | Audit-Pflicht aus 4.6 |

## 4.8 Versionierung — Zwei Achsen

| Achse | Trigger | Behandlung |
|---|---|---|
| **Taxonomy-Version** | Topic-Änderungen (siehe 4.6) | Bumped semver; alte Klassifikationen bleiben referenzierbar |
| **Classifier-Model-Version** | LLM/Embedding-Modell-Update | Bumped; alle Outputs taggen sich mit Modell-Version |

**Re-Klassifikations-Policy:**
- Neue Activities: aktuell Modell + Tax
- Historische: re-klassifiziert quartalsweise oder on-demand
- **Audit-Garantie:** historische Outputs bleiben reproduzierbar mit Modell-Version + Snapshot

## 4.9 Vector-Storage — Empfehlung

**pgvector in tenant-isolated Postgres** (Default).

| Option | Pro | Con | Decision |
|---|---|---|---|
| **pgvector / Postgres** | Simple Ops, Tenant-Isolation einfach, Self-Host-ready, kein extra Vendor | Performance-Limit ~10M Vektoren/Tenant | ✅ **Default** |
| Pinecone | Managed, performant | Vendor-Lock, Kosten, kein Self-Host | ❌ |
| Weaviate | OSS, Multi-Tenant native | Komplexer Ops-Stack | Phase 2 wenn Volume sprengt |

Pro Kunde eigene Postgres-DB (Hard-Tenancy aus Modul 6) — pgvector passt perfekt zur Tenant-Architektur.

## 4.10 Privacy by Design

- `Person`-Entities **pseudonymisiert** intern (UUID, kein Name)
- Re-Identifikations-Mapping in separater verschlüsselter Tabelle, nur via RBAC abrufbar
- **Per-Tenant Encryption Keys** (KMS)
- **Data Retention** konfigurierbar pro Tier:
  - Map: 3 Jahre Default
  - Pulse: 12–18 Monate
  - Decide: 90 Tage post-last-use für Decision-Logs

## 4.11 Pitfalls — Modul-spezifisch

| Pitfall | Risiko | Mitigation |
|---|---|---|
| **Bad classifier = bad product** | Topics falsch → Metriken falsch → Trust-Verlust → Churn | HIL-Pflicht im Onboarding; Quarterly Calibration; Customer-Feedback-Loop für Mis-Classifications |
| **Embedding-Cost-Explosion** | Re-embedding bei 1M+ Items quarterly = teuer | Delta-Embedding (nur Changed Content), Sampling für Cluster-Bootstrap, Caching |
| **Taxonomy-Drift** | Customer-Taxonomien divergieren, keine Cross-Customer-Benchmarks | Base-Taxonomie als Anker; Customer-Topics gemappt auf Base wo möglich; anonymisierte Cross-Customer-Benchmarks Phase 2 |
| **Slack-Noise** | Memes, GIFs, threads-of-1 → Müll-Classifications | Substantive-Filter (Modul 3); Confidence-Penalty für Slack-only Signals |
| **Code-Embedding-Mediocre** | Naive Text-Embedding versteht Code-Semantik schwach | Structural+Semantic-Hybrid (siehe 4.5) |
| **Tax-Editing-Chaos** | VPE kann durch häufige Changes Auditability gefährden | Major-Changes mit Impact-Preview + Justification-Pflicht; Quarterly Review-Window für Major-Changes |

## 4.12 Strategische Implikationen

- **Modul 5 (Tech):** Embedding-Provider-Abstraction Layer + per-Tenant Postgres + KMS verpflichtend
- **Modul 6 (Compliance):** Taxonomie-Version als Audit-Anchor; OSS-Switch ist Trust-Bundle-Feature
- **Modul 8 (Pricing):** OSS-Switch + Self-Host als Enterprise-Tier-Differentiator

---

## Brainstorming-Notizen

*(in folgenden Sessions ergänzen — z.B. konkrete pgvector-Performance-Benchmarks, Operator-vs-Approver-UX-Mockups, Cross-Customer-Benchmark-Modus, Quality-Parity-Test-Spec)*

## Critique-Notizen (post-Synthese)

- Contrarian #6 + VC #6 → §4.4: Embedding-Default auf Bedrock (Cohere/Titan) für unified Trust Boundary
- Contrarian #7 → §4.5: MVP-Sprachen reduziert auf 1 Anchor (TypeScript), iterativ erweitern
- Contrarian #8 → §4.3: Onboarding-Flow umgebaut auf Operator/Approver-Trennung; VPE-Time <10 Min
- Customer-Taxonomy + HIL-Refinement explizit als Moat-Builder (Modul 7 §7.2.2 ref.) gehighlighted
