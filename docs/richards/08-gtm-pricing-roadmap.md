# Modul 8 — GTM, Pricing & Roadmap

**Status:** Draft v2 (post-Critique-Synthese)
**Letzter Stand:** 2026-05-09

---

## 8.1 MVP-Scope (geändert post-Critique — Tier-1-First)

| In MVP (Month 6) | Phase 1b (Month 6–9) | Phase 2a (Month 9–12) | Phase 2b (Month 12–18) |
|---|---|---|---|
| **Tier 1 (Map)** komplett: Knowledge Discovery + Bus-Factor-Audit | Confluence-Connector | **Reorg Discovery** (no RRC-Score, only Topics-affected) | **Full Reorg-Sim** (RRC-Score, Roadmap-Impact) |
| **3 Connectoren:** GitHub + Jira + Slack | Tier 2 Pulse Beta | Trust Bundle v1 GA | Tier 3 Retention/Promotion (Phase 3) |
| **EN only** | SOC 2 Type I (Month 9) | First Public Bias Audit | Self-Host Enterprise GA |
| **US Region** (East + West-DR) | NIST AI RMF Profile | EU Region Beta | EU Region GA |
| **Compliance Foundation** (Hard HIL, Audit Log, Disclaimer Layer, Demographics-Block, AI AUP) | | SOC 2 Type II prep | SOC 2 Type II |
| **Tier-aware Tenancy** (Pooled für Map; Per-Tenant für Decide+ später) | | | |

**Vorherige Entscheidung (verworfen):** "Bookend-MVP Tier 1 + Reorg-Sim". 

**Neue Position:** **Tier-1-First MVP.** Reorg-Sim wandert in Phase 2a (Reorg Discovery, no Score) und Phase 2b (Full RRC). Begründung: VC-Memo bewertete Tier-3-im-MVP als **Deal-Breaker** wegen Mobley-v.-Workday-Präzedenz; Contrarian-Memo flaggte 6-Mo-Compliance-Last als unmöglich.

## 8.2 Pricing-Modell (post-Critique adjustiert)

**Per-Engineer-per-Month + Modular Add-Ons + Tier-aware Tenancy-Floors.**

| Tier | Inhalt | Tenancy | Eng-Floor | Preis (Hypothesen, validieren mit Design Partners) |
|---|---|---|---|---|
| **Map** | Tier 1: Knowledge Discovery, Bus-Factor, Topic-Coverage | **Pooled multi-tenant** | **30 Engineers** *(geändert von 50)* | **$25/eng/mo** |
| **Map + Decide** *(Phase 2)* | + Reorg Discovery (Phase 2a), + Full RRC (Phase 2b) | **Per-Tenant DB** | **50 Engineers** | **$45/eng/mo** *(angehoben für Tier-3-COGS-Realität)* |
| **Enterprise** | + Trust Bundle, Self-Host-Option, Custom SLA, Quarterly Bias-Audit, Pre-filled VSQ/DPIA | Per-Tenant + optional Self-Host | 100 Engineers | **$60+/eng/mo** (or Custom) |

**Annual-Commit-Discount:** 15–20% bei Annual-Pre-Pay.

### ARR-Modellierung (post-Critique realistisch)

**100-Eng Series-A-Scaleup (Pooled Map):**
| Tier | Monatlich | ARR |
|---|---|---|
| Map | $2.500 | $30.000 |

**200-Eng Series-B (Per-Tenant Decide+):**
| Tier | Monatlich | ARR |
|---|---|---|
| Map | $5.000 | $60.000 |
| Map + Decide | $9.000 | $108.000 |
| Enterprise | $12.000 | $144.000 |

### COGS pro Customer (post-Critique realistisch)

| Komponente | Map (Pooled) | Decide (Per-Tenant) | Enterprise |
|---|---|---|---|
| Postgres + Storage | ~$50 (shared) | ~$200 | ~$200 |
| LLM Inference (Tiered Routing) | $300–600 | $600–1.200 | $800–1.500 |
| S3 Audit + Storage | ~$30 | ~$50 | ~$50 |
| Compute (Workers) | ~$60 (pooled) | ~$200 | ~$300 |
| **Customer Success** *(neu)* | ~$100 | ~$300 | ~$500 |
| **SOC 2 + Bias-Audit amortized** *(neu)* | ~$100 | ~$150 | ~$200 |
| **Sales-Engineer-Time amortized** *(neu)* | ~$100 | ~$200 | ~$300 |
| **Total COGS** | **~$740–1.040** | **~$1.700–2.300** | **~$2.350–3.050** |

**Realistische Gross Margins (nicht die optimistischen 80% claimed):**

| Tier | 100-Eng MRR | 200-Eng MRR | GM @ 100 Eng | GM @ 200 Eng |
|---|---|---|---|---|
| Map | $2.500 | $5.000 | 58–70% | 79–85% |
| Map + Decide | $4.500 | $9.000 | 49–62% | 74–81% |
| Enterprise | $6.000 | $12.000 | 49–61% | 75–80% |

**Blended GM bei realistic Mix: ~65–72%** — *unter* SaaS-Benchmark (75–80%) wie VC-Memo flagged. Realistic. Verbessert sich bei Skalierung durch CSM-Hebel und Per-Customer-Cost-Effizienzen.

## 8.3 Sales Motion (post-Critique adjustiert)

**Top-Down dominiert + EM als Co-Champion + HR-Co-Sign-Path.**

| Phase | Aktion | Persona |
|---|---|---|
| **Awareness** | Outbound + Eng-Resilience-Content + Conferences (LeadDev, KubeCon-adjacent) | VPE / CTO |
| **Discovery** | Discovery-Call mit VPE; **Bus-Factor-Audit Demo** als "Wow" *(nicht mehr Reorg-Sim — geändert)* | VPE |
| **Evaluation** | 30-Day Map-Tier Trial mit EM/Staff als hands-on User; SE-led Onboarding | EM + Staff Eng |
| **Compliance Review** | **Pre-baked Trust Bundle** (Pre-filled VSQ + HR-Fast-Path-Artifact) → Customer-Legal + HR | People Ops / Legal + HRBP |
| **Close** | Annual Contract, ARR-Commit | VPE Budget, CTO Sign-off |
| **Expansion (Phase 2)** | Reorg Discovery → Full RRC → Enterprise Up-Sell | VPE → CTO |

**Sales-Cycle-Realität:** 3–6 Monate für Series B+ Tech. Series-A-Scaleups bei Pooled-Map-Tier potenziell schneller (2–4 Monate, weniger Compliance-Burden).

**Free-Tier:** Nein — 30-Day Trial mit Sales-Engineer-led Onboarding.

## 8.4 Wedge-Strategie (geändert post-Critique)

**Primärer Wedge: Bus-Factor-Audit Demo.** *(geändert von Reorg-Sim wegen Mobley-Risiko + Tier-3-Defer)*

Discovery-Call-Flow:
1. *"Wie viele Engineers? Wie viele kennst du persönlich gut?"* → Pain-Setup
2. *"Lass mich dir in 60 Sekunden zeigen, wie viele Single Points of Failure dein Team hat — und wie viele davon dir nicht bewusst sind."* → Hook
3. **Bus-Factor-Audit Demo mit Customer-Data-Sample** im Onboarding → Wow ("4 von 12 SPOFs waren mir nicht klar")
4. Compliance-Bundle (Speed-to-Procurement) erklären → Closer

**Phase-2-Wedge (zusätzlich):** *"See which initiatives are exposed when X moves teams"* — Reorg Discovery (no Score, only Topics).

**Phase-2b-Wedge:** Full Reorg-Sim mit RRC, gating auf SOC 2 Type II + retrospektive Validierungsstudie auf 3+ Design-Partner-Daten.

## 8.5 12-Monats-Roadmap (post-Critique re-scoped)

| Quartal | Engineering | GTM | Compliance |
|---|---|---|---|
| **Q1 (Build, Tier 1 only)** | MVP Tier 1: Map + Bus-Factor; 3 Connectoren; Hybrid Classifier (1 Anchor-Sprache); Audit-Log v1; Tier-aware Tenancy (Pooled Map) | 5 Design Partners (US) — pre-SOC-2 / 50% Discount | AI Risk Mgmt System; First Internal Bias Audit; AI AUP Draft |
| **Q2 (Launch Tier 1)** | MVP-Härtung; Public-API; Confluence-Connector | Public Launch (Month 6) — **Tier 1 only**; 5–15 paying customers; Outbound-Engine | SOC 2 Type I prep; AI AUP live |
| **Q3 (Tier 1 Scale + Tier 2 Beta)** | Tier 2 Pulse Closed Beta; LLM-Cost-Optimierung; Quality-Iteration; **Reorg Discovery Beta (no RRC)** | 15–35 paying customers; First Public Bias Audit Report; Trust Bundle v1 | **SOC 2 Type I** (Month 9); NIST AI RMF Profile |
| **Q4 (Reorg Discovery GA + Series A)** | Tier 2 Pulse GA; **Reorg Discovery GA**; Self-Host Enterprise Beta | 35–60 paying customers; Series A close | Public Bias Audit veröffentlicht; SOC 2 Type II prep |

**Year 2 Vorausschau:**
- Q1: **Full Reorg-Sim (RRC) Closed Beta** post-retrospektive Validierungsstudie; SOC 2 Type II; EU AI Act Conformity Assessment
- Q2: Full Reorg-Sim GA; EU-Markteintritt (Frankfurt); Tier 3 Retention-Risk Beta
- Q3-Q4: Cross-Customer-Anonymized-Benchmarks; ISO 42001 Cert

**6-Mo-MVP-Pragmatik (geändert):** Compliance-Foundation im MVP (Hard HIL, Audit-Log, Disclaimer, Demographics-Block, AI AUP), aber **Tier-3-Compliance-Last entfällt** weil Tier 3 nicht im MVP. SOC 2 Type I im Month 9 ist machbar weil Tier-3-Surface-Area später kommt.

## 8.6 Funding-Strategie (post-Critique adjustiert)

| Phase | Round | Use of Funds | Runway-Ziel |
|---|---|---|---|
| **Pre-Seed / Seed** | **$3–5M** | 5–6 Eng, 1 Design, 1 Founder Sales, 1 Founder Build, AWS+LLM, SOC 2-Audit | **24 Monate** *(angehoben von 18)* |
| **Series A** | **$10–15M** (Q4 Y1 oder Q1–Q2 Y2) | Scale Sales-Team, EU-Prep, Pulse-GA, Reorg Discovery → Full RRC | 18–24 Monate |
| **Series B** | $25–40M (Y3) | Cross-Customer-Benchmarks, Tier 3 Expansion, EU-Marktanteil, ISO-Certs | 24+ Monate |

**Strategische Anpassung post-Critique:** VC-Memo zeigte Y1-Plan ($0,5–1,5M ARR, 25–75 Customers) als nicht-Series-A-fundable in 2026 (Bar ist $1,5–3M ARR + 100% NRR). Reaktion:

- **Seed-Runway auf 24 Monate** ausgeweitet → Series A nicht zwingend Q4 Y1, kann Q1–Q2 Y2 sein (mehr Zeit für ARR-Build, NRR-Track-Record)
- **Y1-Targets als Min/Max-Range** statt Punkt-Schätzung (siehe 8.7)
- **Seed-Runde ggf. höher** ($4–5M am oberen Rand) für 24-Mo-Runway

## 8.7 KPIs (post-Critique mit Min/Max-Range)

| Metrik | Year 1 Min | Year 1 Stretch |
|---|---|---|
| **North Star — Eng Seats Activated** | 3.000 | 8.000 |
| **ARR** | $0,3M | $1,2M |
| **Customer Count** | 15 | 50 |
| **Time-to-First-Value** (Contract → erstes Insight) | <14 Tage | <14 Tage |
| **Net Revenue Retention** | (Y2 Ziel: >100%) | |
| **Customer Bias Audit Score** | Disparate Impact 4/5 Rule für 100% Customer | |
| **Customer NPS** | 30+ | 50+ |
| **Map → Decide Up-Sell-Rate** *(neu)* | 20% innerhalb 9 Mo | 40% |
| **Series-A-Readiness-Indicators** *(neu)* | $1M ARR + 2Q 15% MoM Growth | $2M ARR + 3 Reps Closing |

## 8.8 Sales Material — Must-Haves

- **Pitch Deck** (Hook + Subline aus Modul 1)
- **ROI-Calculator:** *"What does an undetected Bus Factor cost you?"* — *(geändert von "Wrong Layoff")* — 1 unerkanntes SPOF + Wegfall = Roadmap-Verzug + Re-Hiring ≈ $300k+; framing weniger Mobley-anfällig
- **Case Studies** (post-Design-Partner)
- **"State of Engineering Resilience"-Report** quartalsweise — *als Brand-Halo, nicht Category-Creation-Voraussetzung*
- **Trust Bundle Sample** mit Pre-filled VSQ + DPIA als **Procurement-Speed-Demo**
- **HR-Fast-Path-Artifact** (1-Pager für Customer-HR-Review)
- **Demo-Environment** mit synthetic Data für blitzschnelle Bus-Factor-Audit-Demos

## 8.9 Pitfalls — Modul-spezifisch (post-Critique)

| Pitfall | Risiko | Mitigation |
|---|---|---|
| Sales-Cycle länger als 6 Monate | Burn-Rate hoch | Pre-baked Trust Bundle als Pre-Sales-Asset; Founder-led Selling für ersten 25 Deals |
| Pooled-Map-Tier-COGS-Realität | Map-Margin niedriger als gehofft | Realistic GM-Modell (siehe §8.2); akzeptiert für Wedge-Strategie |
| Wrong ICP (zu klein / zu groß) | Wasted GTM | Bookings-Velocity-Tracking; bei Series A ICP-Pivot ok |
| Education-Content-Müdigkeit | Slow Pipeline | Founder-Voice in Content; Authentizität schlägt Corporate-Polish |
| Map-only Customers upgraden nicht zu Decide | Lower expansion | Map → Decide Up-Sell-Rate als Series-A-Gate; Trial-Reorg-Discovery als Pull |
| LLM-Cost-Spike im MVP | Margin-Burn | Tiered Routing + Hard Caps + Per-Customer-Monitoring |
| 6-Mo-MVP-Compliance-Gap | Pre-SOC-2-Customers churnen | Design-Partner-Programm + glasklare Erwartungssetzung; Trust Bundle Roadmap kommuniziert |
| **Series-A-Bar-Miss** *(neu)* | Seed läuft aus, no A possible | 24-Mo-Runway + Bridge-Option vorbereitet; A-Targets sandbagged |
| **Founder/Team-Gap** *(neu)* | Kein Co-Founder = nicht-fundable | Aktive GTM-Co-Founder-Suche parallel zu Build |

## 8.10 Team & Hiring Plan (NEU — post-Critique)

VC-Memo flaggte: "no founder/team disclosure = deal-breaker für Funding-Decision today". Diese Sektion adressiert das.

### Gründungs-Setup (TBD — Open Question)

| Rolle | Profil-Anforderung | Status |
|---|---|---|
| **Founder/CEO (Build)** | Ex-VPE oder Senior Eng-Leader mit B2B-SaaS-Exposure; ICP-Empathie | TBD — primärer Founder |
| **Founder/CEO (GTM)** *(empfohlen Co-Founder)* | Ex-Sales-Leader im Eng-Tooling oder People-Analytics-Space | **Open Search** |
| **Senior Founding Engineer** | LLM-systems + Data-Pipeline-Erfahrung | Hire vor Seed-Close |
| **Senior Founding Engineer** | Postgres + Multi-Tenant Architecture + Compliance-Eng | Hire vor Seed-Close |
| **Advisor: Former VPE / CTO** | Series B+ Tech-Org, ICP-validation, Design-Partner-Intros | Recruit pre-Seed |
| **Advisor: AI-Governance-Counsel** | EU AI Act + EEOC + Workforce-AI-Recht | Recruit pre-Seed |

### Hiring-Plan Year 1 (Post-Seed)

- 2 ML/Backend Eng (Q1 Y1)
- 1 Frontend Eng (Q1 Y1)
- 1 Designer (Q2 Y1)
- 1 Customer Success Lead (Q2 Y1)
- 1 Sales Engineer (Q3 Y1)
- 1 First AE / SDR (Q3 Y1)
- Total Y1 headcount: 8–10 incl. Founders

### Open-Items (in open-questions.md aufgenommen)

- Q-T1: GTM-Co-Founder-Identifikation
- Q-T2: VPE-Advisor-Rekrutierung pre-Seed
- Q-T3: Equity-Pool-Plan + Founder-Splits

---

## Brainstorming-Notizen

*(in folgenden Sessions ergänzen — z.B. konkrete Sales-Pipeline-Modelling, Outbound-Channel-Test-Pläne, Founder-Content-Calendar, Pricing-Validation-Plan mit Design Partners, retrospektive Reorg-Sim-Validierungsstudie-Design)*

## Critique-Notizen (post-Synthese)

- VC #2 (Deal-Breaker) + Contrarian #3 → Reorg-Sim aus MVP, Phase-2-Pfad mit "Reorg Discovery" → "Full RRC"-Validierung; Wedge auf Bus-Factor-Audit (§8.4)
- VC #3, #7 + Contrarian #11 → Tier-aware Pricing-Floor (§8.2): 30-Eng Map / 50-Eng Decide
- VC #4 → Funding-Plan §8.6: 24-Mo-Seed-Runway, Y1-Targets als Min/Max
- VC #8 → §8.10 NEU: Team & Hiring Plan
- Contrarian #1 → §8.5: 6-Mo-MVP rescope auf Tier-1-only macht Build-Plan realistisch
- Contrarian #4 + VC #5 → Trust Bundle als Procurement-Accelerator (§8.8 Sales Material), nicht Compliance-Premium-Tier
