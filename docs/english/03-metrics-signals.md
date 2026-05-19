# Module 3 — Metrics & Signals

**Status:** Draft v2 (post-critique synthesis)
**Last Updated:** 2026-05-09

---

## 3.1 Data Sources × Signal Types (input layer)

| Source | Raw Signals | Signal Type |
|---|---|---|
| **Git** (GitHub/GitLab/Bitbucket) | Commits, PR authorship, PR reviews, CODEOWNERS, file-touch history | Code activity, ownership |
| **Jira / Linear** | Assignee, reporter, components, labels, story-point velocity, status transitions | Domain activity, delivery |
| **Confluence / Notion** | Authored docs, edits, tag memberships | Knowledge creation, topics |
| **Slack** | Channel membership, substantive threads, mentions, reaction patterns | Collaboration, reach |
| **Calendar** *(optional)* | Meeting hours, recurring series, cross-team overlap | Cross-team exposure |
| **CODEOWNERS files / architecture docs** | Explicit ownership statements | Structural ownership |

**Base unit of all metrics:** The hybrid classifier (Module 4) turns raw signals into tuples of `(Person, Topic, Activity-Type, Strength, Timestamp, Source)`.

## 3.2 Core Metrics by MVP Use Case

### 3.2.1 Knowledge Discovery — "Who knows X?"

**Topic Authority Score (TAS)** per `(Person × Topic)`:

```
TAS(P, T) = Σ over activities a in (P, T):
              w_action(a.type) × w_recency(a.timestamp) × w_source(a.source)
```

**Action-type weights (balanced — decided 2026-05-09):**

| Action Type | Weight |
|---|---|
| Doc/RFC authorship | 1.00 |
| Code authorship in topic files | 0.85 |
| Jira ticket ownership (closed) | 0.65 |
| PR review (substantive) | 0.50 |
| Slack thread (substantive) | 0.20 |

**Reasoning:** Docs and code carry equally high weight, avoiding a code-heavy bias against TLs, architects, and EMs. Reviews get medium weight as a knowledge indicator. Slack stays low to guard against visibility bias.

- **Recency decay:** six-month half-life (configurable)
- **Output:** ranked list per topic + "warm contacts" (secondary experts)

### 3.2.2 Bus-Factor Audit — make SPOFs visible

**Bus Factor (BF) per topic:**
```
BF(T) = | { P | TAS(P, T) > τ_critical(T) } |
```
`τ_critical(T)` is topic-specific (top-quartile activity within the topic cluster).

**Knowledge Centrality Score (KCS) per person:**
- `n_BF1`: number of topics with BF=1 where the person is the owner
- `n_BF2`: number of topics with BF=2 where the person is involved
- Weighted by topic criticality (see 3.2.4)

### 3.2.3 Reorg Discovery + Full RRC (phase 2 — NO longer in the MVP)

**Updated after critique:** Tier 3 moves fully into phase 2 (see Module 8 §8.5). It is split into two phases:

**Phase 2a (Month 9–12) — Reorg Discovery:**
- Surfaces which topics and initiatives are exposed when people leave
- NO composite RRC score, NO numerical output with a confidence interval
- Output: Topic exposure map ("These 7 topics will drop to BF=1 or BF=0 if X leaves")
- Massively reduces Mobley-v.-Workday-style risk

**Phase 2b (Month 12–18, post-SOC-2-Type-II + retrospective validation study) — Full Reorg Sim with RRC:**

**Resilience-on-Removal Composite (RRC)** — scenario-based:

```
Input:  P_remove (Set), Horizon (30/60/90 days)

For each topic T owned by P_remove:
  ΔBF(T)         = BF(T) − BF(T | P_remove)
  Coverage_loss  = Σ TAS(p, T) for p in P_remove

For each downstream initiative I:
  Risk_delta(I)  = f(topics_affected, criticality, coverage_loss)

Outputs:
  - Topic-level: heat map (which topics become BF=1 or BF=0?)
  - Initiative-level: roadmap risk delta per initiative
  - Mentor-loss: junior mentorship gaps
  - Total RRC Score: 0–100 with confidence interval
```

**Sub-metrics inside RRC:**

| Sub-Metric | What It Measures |
|---|---|
| Replaceability Score | The inverse of "how many others can cover these topics in 30/60/90 days" |
| Roadmap Criticality | Active + planned initiatives that depend on the person’s topics |
| Mentor Index | Substantive PR reviews + cross-team knowledge transfer by the person |
| Network Centrality | Betweenness centrality in the collaboration graph |

### 3.2.4 Topic Criticality (TC) — critical anti-false-positive layer

**Initial approach (decided):** Manual VPE flag during onboarding. The VPE marks the top 10–20 critical topics. This is transparent, auditable, and low-build.

**Evolution (phase 2 / 3):**
- Automatic from roadmap data (Jira hierarchy + initiative relations)
- From service traffic (Prometheus/DataDog integration)
- Hybrid: auto-estimate + VPE override

Without a TC layer, BF=1 on an irrelevant topic creates a false-positive alert. With a TC layer, only `BF=1 × TC=high` triggers.

## 3.3 Anti-Gaming Mechanics (compliance requirement from Module 6)

| Mechanic | Implementation |
|---|---|
| **No raw counts exposed** | Only composites in the UI; weights are versioned, not prominently public |
| **Substantive filter** | Slack thread counts as substantive only if it is >1 sentence; reactions do not count; "lgtm" reviews do not count |
| **LLM plausibility check** | Anomaly detector flags output spikes, Slack spam, and sock-puppet PRs for review |
| **Versioned weights** | Composite weights are versioned per model release; historical outputs remain recomputable |
| **Adverse-impact test** | Every composite definition is tested against a synthetic test set before release |

## 3.4 Confidence & Coverage Indicators (mandatory)

Every metric comes with:

- **Confidence level** (Low/Medium/High) based on data volume, recency, and connected sources
- **Coverage indicator** (for example: *"3 of 5 connected sources, 90 days of data, 247 activities classified"*)

**Hard block below minimum confidence (decided):** Output is technically *not retrievable* at low confidence, not merely color-coded.

| Metric | Minimum Confidence for Display | Minimum Coverage |
|---|---|---|
| TAS (Knowledge Discovery, MVP) | Medium | 30 days of data, ≥2 sources |
| BF / KCS (Bus Factor, MVP) | Medium | 60 days of data, ≥2 sources |
| Topic Exposure Map (Reorg Discovery, phase 2a) | High | 90 days of data, ≥2 sources, TC flags |
| RRC (Full Reorg Sim, phase 2b) | Very High | 180 days of data, ≥3 sources, TC flags, retrospective validation |

## 3.5 Bias Sources & Mitigations

| Pitfall | Risk | Mitigation |
|---|---|---|
| Code-heavy bias | TLs, architects, and EMs appear to have low authority | Balanced weights (decided); doc authorship = code authorship |
| Tenure bias | New joiners score low despite being senior hires | Confidence layer + 60-day tenure buffer (no display for new joiners) |
| Visibility bias | Async/remote work looks different from office work | Cross-source aggregation; low Slack weight |
| Recency-vs-depth bias | Latent experts (old builders, now mentors) get undervalued | Mentor Index as a counter-signal; "latent authority" via git blame archaeology |
| Topic bias | Backend topics outweigh design/SRE/dev tools in tickets | Per-topic normalization instead of global comparison |
| Substantive-definition bias | "Substantive" is subjective | Transparent LLM classification; quarterly calibration audit |

## 3.6 Strategic Implications for Other Modules

- **Module 4 (Classifier):** Topic granularity determines metric sharpness; customer tuning is critical
- **Module 5 (Tech Architecture):** Activity storage must be schema-stable and queryable; historical composites must remain recomputable after model updates
- **Module 8 (Pricing):** Tier 2 (Pulse) is just exposing metrics already computed under the hood, which makes it cheaper to launch

---

## Brainstorming Notes

*(add in later sessions, for example service-traffic integration, Topic Exposure Map UI mockups, calibration-audit cadence, retrospective validation study design)*

## Critique Notes (post-synthesis)

- Contrarian #3 (critical) correctly challenged the fidelity of RRC output, so §3.2.3 is split into "Reorg Discovery" (no score, phase 2a) and "Full RRC" (phase 2b after validation)
- More aggressive confidence thresholds for Reorg Discovery (High) and Full RRC (Very High, 180 days)
- TAS/BF/KCS remain unchanged as the MVP core