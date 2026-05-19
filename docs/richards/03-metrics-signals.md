# Modul 3 — Metriken & Signale

**Status:** Draft v2 (post-Critique-Synthese)
**Letzter Stand:** 2026-05-09

---

## 3.1 Datenquellen × Signal-Typen (Input-Layer)

| Quelle | Roh-Signale | Signal-Typ |
|---|---|---|
| **Git** (GitHub/GitLab/Bitbucket) | Commits, PR-Authorship, PR-Reviews, Code-Owners, File-Touch-History | Code-Aktivität, Ownership |
| **Jira / Linear** | Assignee, Reporter, Components, Labels, Story-Point-Velocity, Status-Transitions | Domänen-Aktivität, Delivery |
| **Confluence / Notion** | Authored Docs, Edits, Tag-Memberships | Wissens-Erstellung, Topics |
| **Slack** | Channel-Membership, Thread-Substantive, Mentions, Reaction-Patterns | Kollaboration, Reach |
| **Calendar** *(optional)* | Meeting-Hours, Recurring Series, Cross-Team-Overlap | Cross-Team-Exposure |
| **Code-Owners-Files / Architecture Docs** | Explizite Ownership-Statements | Strukturelle Ownership |

**Grund-Einheit aller Metriken:** Aus Roh-Signalen erzeugt der Hybrid-Classifier (Modul 4) `(Person, Topic, Activity-Type, Strength, Timestamp, Source)`-Tupel.

## 3.2 Kern-Metriken pro MVP-Use-Case

### 3.2.1 Knowledge Discovery — "Wer kennt sich mit X aus?"

**Topic Authority Score (TAS)** pro `(Person × Topic)`:

```
TAS(P, T) = Σ over activities a in (P, T):
              w_action(a.type) × w_recency(a.timestamp) × w_source(a.source)
```

**Action-Type-Gewichte (Balanced — entschieden 2026-05-09):**

| Action-Type | Gewicht |
|---|---|
| Doc/RFC Authorship | 1.00 |
| Code Authorship in Topic-Files | 0.85 |
| Jira-Ticket Ownership (Closed) | 0.65 |
| PR-Review (substantive) | 0.50 |
| Slack-Thread (substantive) | 0.20 |

**Begründung:** Doc und Code gleichwertig hoch — vermeidet Code-Heavy-Bias gegen TLs, Architekten, EMs. Reviews mittelgewichtet (Wissens-Indikator). Slack niedrig (Visibility-Bias-Schutz).

- **Recency Decay:** halbjährliche Halbwertszeit (configurable)
- **Output:** ranked list pro Topic + "Warm Contacts" (Sekundär-Experten)

### 3.2.2 Bus-Factor-Audit — SPOFs sichtbar machen

**Bus Factor (BF) per Topic:**
```
BF(T) = | { P | TAS(P, T) > τ_critical(T) } |
```
`τ_critical(T)` topic-spezifisch (Top-Quartil-Aktivität im Topic-Cluster).

**Knowledge Centrality Score (KCS) per Person:**
- `n_BF1`: Anzahl Topics mit BF=1, wo Person Owner
- `n_BF2`: Anzahl Topics mit BF=2, wo Person mitbeteiligt
- Gewichtet mit Topic Criticality (siehe 3.2.4)

### 3.2.3 Reorg Discovery + Full RRC (Phase 2 — NICHT mehr im MVP)

**Geändert post-Critique:** Tier 3 wandert komplett in Phase 2 (siehe Modul 8 §8.5). Aufgespalten in zwei Phasen:

**Phase 2a (Month 9–12) — Reorg Discovery:**
- Surfaces *welche Topics & Initiativen exposed sind* bei Personal-Wegfall
- KEIN composite RRC-Score, KEIN numerisches Output mit Confidence-Interval
- Output: Topic-Exposure-Map ("Diese 7 Topics werden bei Wegfall von X auf BF=1 oder BF=0 fallen")
- Reduziert Mobley-v.-Workday-style Risiko massiv

**Phase 2b (Month 12–18, post-SOC-2-Type-II + retrospektive Validierungsstudie) — Full Reorg-Sim mit RRC:**

**Resilience-on-Removal Composite (RRC)** — scenario-basiert:

```
Input:  P_remove (Set), Horizon (30/60/90 Tage)

For each topic T owned by P_remove:
  ΔBF(T)         = BF(T) − BF(T | P_remove)
  Coverage_loss  = Σ TAS(p, T) for p in P_remove

For each downstream initiative I:
  Risk_delta(I)  = f(topics_affected, criticality, coverage_loss)

Outputs:
  - Topic-level: heat map (welche Topics werden BF=1 oder BF=0?)
  - Initiative-level: roadmap risk delta per Initiative
  - Mentor-loss: Junior-Mentorship-Gaps
  - Total RRC Score: 0–100 mit Confidence-Interval
```

**Sub-Metriken im RRC:**

| Sub-Metrik | Was sie misst |
|---|---|
| Replaceability Score | Inverse von "wie viele andere können Topics in 30/60/90d abdecken" |
| Roadmap Criticality | Active+Planned Initiatives, die von Person's Topics abhängen |
| Mentor Index | Substantive PR-Reviews + Cross-Team-Knowledge-Transfer von Person |
| Network Centrality | Betweenness-Centrality im Collaboration-Graph |

### 3.2.4 Topic Criticality (TC) — kritisches Anti-False-Positive

**Initial-Approach (entschieden):** Manual VPE-Flag im Onboarding — VPE markiert Top-10–20 kritische Topics. Transparent, auditierbar, geringer Build-Aufwand.

**Evolution (Phase 2 / 3):**
- Auto aus Roadmap-Daten (Jira-Hierarchie + Initiative-Bezüge)
- Aus Service-Traffic (Prometheus/DataDog-Integration)
- Hybrid: Auto-Estimate + VPE-Override

Ohne TC-Layer: BF=1 auf irrelevantem Topic = falsch-positiver Alarm. Mit TC-Layer: nur `BF=1 × TC=high` triggert.

## 3.3 Anti-Gaming-Mechaniken (Compliance-Pflicht aus Modul 6)

| Mechanik | Implementierung |
|---|---|
| **Keine Roh-Counts exposed** | Nur Composites in UI; Gewichte versioniert, nicht prominent öffentlich |
| **Substantive-Filter** | Slack-Thread "substantive" = >1 Satz; Reactions zählen nicht; "lgtm"-Reviews nicht |
| **LLM-Plausibilitäts-Check** | Anomalie-Detector flagt Output-Spikes, Slack-Spam, Sock-Puppet-PRs für Review |
| **Versionierte Gewichte** | Composite-Gewichte pro Modell-Release versioniert; Re-Computability historischer Outputs |
| **Adverse-Impact-Test** | Jede Composite-Definition gegen synth. Test-Set vor Release |

## 3.4 Confidence & Coverage Indicators (verpflichtend)

Jede Metrik kommt mit:

- **Confidence Level** (Low/Medium/High) basierend auf Datenmenge, Recency, connected Sources
- **Coverage Indicator** (z.B. *"3 of 5 connected sources, 90 days of data, 247 activities classified"*)

**Hard Block unter Min-Confidence (entschieden):** Output technisch *nicht abrufbar* bei niedriger Confidence — nicht nur farblich markiert.

| Metrik | Min-Confidence für Display | Min-Coverage |
|---|---|---|
| TAS (Knowledge Discovery, MVP) | Medium | 30 Tage Daten, ≥2 Quellen |
| BF / KCS (Bus Factor, MVP) | Medium | 60 Tage Daten, ≥2 Quellen |
| Topic-Exposure-Map (Reorg Discovery, Phase 2a) | High | 90 Tage Daten, ≥2 Quellen, TC-Flags |
| RRC (Full Reorg-Sim, Phase 2b) | Very High | 180 Tage Daten, ≥3 Quellen, TC-Flags, retrospektive Validierung |

## 3.5 Bias-Quellen & Mitigationen

| Pitfall | Risiko | Mitigation |
|---|---|---|
| Code-Heavy-Bias | TLs, Architekten, EMs erscheinen "low authority" | Balanced-Gewichte (entschieden); Doc-Authorship = Code-Authorship |
| Tenure-Bias | Neue Joiner mit niedrigem Score trotz Senior-Hire | Confidence-Layer + 60-Tage-Tenure-Buffer (kein Display für neue Joiner) |
| Visibility-Bias | Async/Remote anders als Office | Cross-Source-Aggregation; Slack-Gewicht niedrig |
| Recency-vs-Depth-Bias | Latente Experten (alt-builder, jetzt mentor) | Mentor-Index als Counter-Signal; "Latent Authority" via git-blame archaeology |
| Topic-Bias | Backend > Designer/SRE/DevTools an Tickets | Per-Topic-Normalisierung statt globaler Vergleich |
| Substantive-Definition-Bias | "Substantive" subjektiv | LLM-Klassifikation transparent; quartalsweise Calibration-Audit |

## 3.6 Strategische Implikationen für andere Module

- **Modul 4 (Classifier):** Topic-Granularität bestimmt Metrik-Schärfe; Customer-Tuning kritisch
- **Modul 5 (Tech-Architektur):** Activity-Storage muss schema-stabil + queryable; Re-Computability historischer Composites bei Modell-Update
- **Modul 8 (Pricing):** Tier-2 (Pulse) = unter-der-Haube-Metriken exposen — günstig zu launchen, da Berechnung schon läuft

---

## Brainstorming-Notizen

*(in folgenden Sessions ergänzen — z.B. Service-Traffic-Integration, Topic-Exposure-Map-UI-Mockups, Calibration-Audit-Cadence, retrospektive Validierungsstudie-Design)*

## Critique-Notizen (post-Synthese)

- Contrarian #3 (Critical) hat RRC-Output-Fidelität korrekt herausgefordert → §3.2.3 aufgespalten in "Reorg Discovery" (no Score, Phase 2a) und "Full RRC" (Phase 2b post-Validierung)
- Aggressivere Confidence-Schwellen für Reorg Discovery (High) und Full RRC (Very High, 180-Tage)
- TAS/BF/KCS bleiben unverändert (MVP-Kern)
