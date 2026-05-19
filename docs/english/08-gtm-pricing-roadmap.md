# Module 8 — GTM, Pricing & Roadmap

**Status:** Draft v2 (post-critique synthesis)
**Last Updated:** 2026-05-09

---

## 8.1 MVP Scope (updated post-critique — Tier-1 first)

| In MVP (Month 6) | Phase 1b (Month 6–9) | Phase 2a (Month 9–12) | Phase 2b (Month 12–18) |
|---|---|---|---|
| **Tier 1 (Map)** complete: Knowledge Discovery + Bus-Factor Audit | Confluence connector | **Reorg Discovery** (no RRC score, only topics affected) | **Full Reorg Sim** (RRC score, roadmap impact) |
| **3 connectors:** GitHub + Jira + Slack | Tier 2 Pulse beta | Trust Bundle v1 GA | Tier 3 retention/promotion (phase 3) |
| **EN only** | SOC 2 Type I (Month 9) | First public bias audit | Self-host Enterprise GA |
| **US region** (East + West DR) | NIST AI RMF profile | EU region beta | EU region GA |
| **Compliance foundation** (hard HIL, audit log, disclaimer layer, demographics block, AI AUP) | | SOC 2 Type II prep | SOC 2 Type II |
| **Tier-aware tenancy** (pooled for Map; per-tenant for Decide+ later) | | | |

**Previous decision (discarded):** "Bookend MVP Tier 1 + Reorg Sim."

**New position:** **Tier-1-first MVP.** Reorg Sim moves into phase 2a (Reorg Discovery, no score) and phase 2b (full RRC). Reasoning: the VC memo rated Tier-3-in-MVP as a **deal breaker** due to the Mobley-v.-Workday precedent; the contrarian memo flagged a 6-month compliance load as impossible.

## 8.2 Pricing Model (adjusted post-critique)

**Per-engineer-per-month + modular add-ons + tier-aware tenancy floors.**

| Tier | Contents | Tenancy | Engineer Floor | Price (hypotheses, validate with design partners) |
|---|---|---|---|---|
| **Map** | Tier 1: Knowledge Discovery, Bus Factor, Topic Coverage | **Pooled multi-tenant** | **30 engineers** *(updated from 50)* | **$25/eng/mo** |
| **Map + Decide** *(phase 2)* | + Reorg Discovery (phase 2a), + Full RRC (phase 2b) | **Per-tenant DB** | **50 engineers** | **$45/eng/mo** *(raised to reflect Tier-3 COGS reality)* |
| **Enterprise** | + Trust Bundle, self-host option, custom SLA, quarterly bias audit, pre-filled VSQ/DPIA | Per-tenant + optional self-host | 100 engineers | **$60+/eng/mo** (or custom) |

**Annual commitment discount:** 15–20% for annual pre-pay.

### ARR Modeling (realistic post-critique)

**100-engineer Series-A scaleup (pooled Map):**
| Tier | Monthly | ARR |
|---|---|---|
| Map | $2,500 | $30,000 |

**200-engineer Series B (per-tenant Decide+):**
| Tier | Monthly | ARR |
|---|---|---|
| Map | $5,000 | $60,000 |
| Map + Decide | $9,000 | $108,000 |
| Enterprise | $12,000 | $144,000 |

### COGS per Customer (realistic post-critique)

| Component | Map (Pooled) | Decide (Per-Tenant) | Enterprise |
|---|---|---|---|
| Postgres + storage | ~$50 (shared) | ~$200 | ~$200 |
| LLM inference (tiered routing) | $300–600 | $600–1,200 | $800–1,500 |
| S3 audit + storage | ~$30 | ~$50 | ~$50 |
| Compute (workers) | ~$60 (pooled) | ~$200 | ~$300 |
| **Customer Success** *(new)* | ~$100 | ~$300 | ~$500 |
| **SOC 2 + bias-audit amortized** *(new)* | ~$100 | ~$150 | ~$200 |
| **Sales engineer time amortized** *(new)* | ~$100 | ~$200 | ~$300 |
| **Total COGS** | **~$740–1,040** | **~$1,700–2,300** | **~$2,350–3,050** |

**Realistic gross margins (not the overly optimistic 80% previously claimed):**

| Tier | 100-Eng MRR | 200-Eng MRR | GM @ 100 Eng | GM @ 200 Eng |
|---|---|---|---|---|
| Map | $2,500 | $5,000 | 58–70% | 79–85% |
| Map + Decide | $4,500 | $9,000 | 49–62% | 74–81% |
| Enterprise | $6,000 | $12,000 | 49–61% | 75–80% |

**Blended GM with a realistic mix: ~65–72%** — *below* the SaaS benchmark (75–80%), exactly as the VC memo flagged. Realistic. Improves with scale through CSM leverage and per-customer efficiency gains.

## 8.3 Sales Motion (adjusted post-critique)

**Top-down dominant + EM as co-champion + HR co-sign path.**

| Phase | Action | Persona |
|---|---|---|
| **Awareness** | Outbound + engineering-resilience content + conferences (LeadDev, KubeCon-adjacent) | VPE / CTO |
| **Discovery** | Discovery call with VPE; **Bus-Factor Audit demo** as the wow moment *(no longer Reorg Sim — updated)* | VPE |
| **Evaluation** | 30-day Map-tier trial with EM/Staff as hands-on users; sales-engineer-led onboarding | EM + Staff Engineering |
| **Compliance Review** | **Pre-baked Trust Bundle** (pre-filled VSQ + HR fast-path artifact) → customer legal + HR | People Ops / Legal + HRBP |
| **Close** | Annual contract, ARR commitment | VPE budget, CTO sign-off |
| **Expansion (phase 2)** | Reorg Discovery → Full RRC → enterprise upsell | VPE → CTO |

**Sales-cycle reality:** 3–6 months for Series B+ tech. Series-A scaleups on the pooled Map tier may move faster (2–4 months, lower compliance burden).

**Free tier:** No — a 30-day trial instead, with sales-engineer-led onboarding.

## 8.4 Wedge Strategy (updated post-critique)

**Primary wedge: Bus-Factor Audit demo.** *(changed from Reorg Sim due to Mobley risk + Tier-3 deferral)*

Discovery-call flow:
1. *"How many engineers do you have? How many of them do you know well personally?"* → pain setup
2. *"Let me show you in 60 seconds how many single points of failure your team has, and how many of them are not on your radar."* → hook
3. **Bus-Factor Audit demo using a customer data sample** during onboarding → wow ("4 of your 12 SPOFs were not obvious to me")
4. Explain the compliance bundle (speed to procurement) → closer

**Phase-2 wedge (additional):** *"See which initiatives are exposed when X moves teams"* — Reorg Discovery (no score, only topics).

**Phase-2b wedge:** full Reorg Sim with RRC, gated on SOC 2 Type II + a retrospective validation study on data from 3+ design partners.

## 8.5 12-Month Roadmap (rescoped post-critique)

| Quarter | Engineering | GTM | Compliance |
|---|---|---|---|
| **Q1 (Build, Tier 1 only)** | MVP Tier 1: Map + Bus Factor; 3 connectors; hybrid classifier (1 anchor language); audit log v1; tier-aware tenancy (pooled Map) | 5 design partners (US) — pre-SOC-2 / 50% discount | AI risk management system; first internal bias audit; AI AUP draft |
| **Q2 (Launch Tier 1)** | MVP hardening; public API; Confluence connector | Public launch (Month 6) — **Tier 1 only**; 5–15 paying customers; outbound engine | SOC 2 Type I prep; AI AUP live |
| **Q3 (Tier 1 scale + Tier 2 beta)** | Tier 2 Pulse closed beta; LLM cost optimization; quality iteration; **Reorg Discovery beta (no RRC)** | 15–35 paying customers; first public bias audit report; Trust Bundle v1 | **SOC 2 Type I** (Month 9); NIST AI RMF profile |
| **Q4 (Reorg Discovery GA + Series A)** | Tier 2 Pulse GA; **Reorg Discovery GA**; self-host Enterprise beta | 35–60 paying customers; Series A close | Public bias audit published; SOC 2 Type II prep |

**Year 2 lookahead:**
- Q1: **Full Reorg Sim (RRC) closed beta** after a retrospective validation study; SOC 2 Type II; EU AI Act conformity assessment
- Q2: Full Reorg Sim GA; EU market entry (Frankfurt); Tier 3 retention-risk beta
- Q3–Q4: Cross-customer anonymized benchmarks; ISO 42001 certification

**6-month MVP pragmatism (updated):** the compliance foundation stays in the MVP (hard HIL, audit log, disclaimer, demographics block, AI AUP), but the **Tier-3 compliance burden disappears** because Tier 3 is not in the MVP. SOC 2 Type I in Month 9 becomes feasible because the Tier-3 surface area comes later.

## 8.6 Funding Strategy (adjusted post-critique)

| Phase | Round | Use of Funds | Runway Target |
|---|---|---|---|
| **Pre-seed / seed** | **$3–5M** | 5–6 engineers, 1 design, 1 founder sales, 1 founder build, AWS+LLM, SOC 2 audit | **24 months** *(raised from 18)* |
| **Series A** | **$10–15M** (Q4 Y1 or Q1–Q2 Y2) | Scale sales team, EU prep, Pulse GA, Reorg Discovery → Full RRC | 18–24 months |
| **Series B** | $25–40M (Y3) | Cross-customer benchmarks, Tier 3 expansion, EU market share, ISO certifications | 24+ months |

**Strategic adjustment post-critique:** the VC memo showed the Year-1 plan ($0.5–1.5M ARR, 25–75 customers) as not Series-A fundable in 2026 (the bar is $1.5–3M ARR + 100% NRR). Response:

- **Seed runway extended to 24 months** → Series A is no longer forced into Q4 Y1 and can move to Q1–Q2 Y2 (more time to build ARR and an NRR record)
- **Year-1 targets framed as min/max ranges** instead of point estimates (see 8.7)
- **Seed round potentially larger** ($4–5M at the upper end) to support the 24-month runway

## 8.7 KPIs (with min/max range post-critique)

| Metric | Year 1 Min | Year 1 Stretch |
|---|---|---|
| **North Star — Eng seats activated** | 3,000 | 8,000 |
| **ARR** | $0.3M | $1.2M |
| **Customer count** | 15 | 50 |
| **Time to first value** (contract → first insight) | <14 days | <14 days |
| **Net revenue retention** | (Y2 target: >100%) | |
| **Customer bias audit score** | Disparate impact 4/5 rule for 100% of customers | |
| **Customer NPS** | 30+ | 50+ |
| **Map → Decide upsell rate** *(new)* | 20% within 9 months | 40% |
| **Series-A readiness indicators** *(new)* | $1M ARR + 2 quarters of 15% MoM growth | $2M ARR + 3 reps closing |

## 8.8 Sales Material — Must-Haves

- **Pitch deck** (hook + subline from Module 1)
- **ROI calculator:** *"What does an undetected Bus Factor cost you?"* — *(changed from "Wrong Layoff")* — 1 undetected SPOF + departure = roadmap delay + rehiring ≈ $300k+; framing is less vulnerable to Mobley-style critiques
- **Case studies** (after design partners)
- **"State of Engineering Resilience" report** quarterly — *as a brand halo, not a category-creation prerequisite*
- **Trust Bundle sample** with pre-filled VSQ + DPIA as a **procurement-speed demo**
- **HR fast-path artifact** (1-pager for customer HR review)
- **Demo environment** with synthetic data for ultra-fast Bus-Factor Audit demos

## 8.9 Pitfalls — Module-Specific (post-critique)

| Pitfall | Risk | Mitigation |
|---|---|---|
| Sales cycle exceeds 6 months | Burn rate rises | Pre-baked Trust Bundle as pre-sales asset; founder-led selling for the first 25 deals |
| Pooled Map-tier COGS reality | Map margin lower than hoped | Realistic GM model (see §8.2); accepted as the wedge strategy cost |
| Wrong ICP (too small / too large) | Wasted GTM effort | Track booking velocity; an ICP pivot is acceptable at the Series A stage |
| Education-content fatigue | Slow pipeline | Founder voice in content; authenticity beats corporate polish |
| Map-only customers do not upgrade to Decide | Lower expansion | Map → Decide upsell rate as a Series-A gate; trial Reorg Discovery as pull |
| LLM cost spike in the MVP | Margin burn | Tiered routing + hard caps + per-customer monitoring |
| 6-month MVP compliance gap | Pre-SOC-2 customers churn | Design-partner program + explicit expectation-setting; communicate the Trust Bundle roadmap |
| **Missing the Series-A bar** *(new)* | Seed runs out, no Series A possible | 24-month runway + bridge option prepared; Series-A targets sandbagged |
| **Founder / team gap** *(new)* | No co-founder = not fundable | Active GTM co-founder search in parallel with the build |

## 8.10 Team & Hiring Plan (NEW — post-critique)

The VC memo flagged: "no founder/team disclosure = deal-breaker for a funding decision today." This section addresses that.

### Founding Setup (TBD — open question)

| Role | Profile Requirement | Status |
|---|---|---|
| **Founder/CEO (Build)** | Ex-VPE or senior engineering leader with B2B SaaS exposure; strong ICP empathy | TBD — primary founder |
| **Founder/CEO (GTM)** *(recommended co-founder)* | Ex-sales leader in engineering tooling or people analytics | **Open search** |
| **Senior Founding Engineer** | LLM systems + data-pipeline experience | Hire before seed close |
| **Senior Founding Engineer** | Postgres + multi-tenant architecture + compliance engineering | Hire before seed close |
| **Advisor: former VPE / CTO** | Series B+ tech org, ICP validation, design-partner intros | Recruit pre-seed |
| **Advisor: AI-governance counsel** | EU AI Act + EEOC + workforce-AI legal expertise | Recruit pre-seed |

### Hiring Plan Year 1 (post-seed)

- 2 ML/Backend engineers (Q1 Y1)
- 1 frontend engineer (Q1 Y1)
- 1 designer (Q2 Y1)
- 1 customer success lead (Q2 Y1)
- 1 sales engineer (Q3 Y1)
- 1 first AE / SDR (Q3 Y1)
- Total Year-1 headcount: 8–10 including founders

### Open Items (already added to open-questions.md)

- Q-T1: GTM co-founder identification
- Q-T2: VPE advisor recruitment pre-seed
- Q-T3: Equity-pool plan + founder splits

---

## Brainstorming Notes

*(add in later sessions, for example concrete sales-pipeline modeling, outbound channel test plans, founder content calendar, pricing-validation plan with design partners, retrospective Reorg-Sim validation study design)*

## Critique Notes (post-synthesis)

- VC #2 (deal breaker) + Contrarian #3 → Reorg Sim removed from MVP, phase-2 path split into "Reorg Discovery" → "Full RRC" validation; wedge shifted to Bus-Factor Audit (§8.4)
- VC #3, #7 + Contrarian #11 → tier-aware pricing floors (§8.2): 30-engineer Map / 50-engineer Decide
- VC #4 → funding plan in §8.6: 24-month seed runway, Year-1 targets as min/max
- VC #8 → §8.10 NEW: team & hiring plan
- Contrarian #1 → §8.5: 6-month MVP rescope to Tier-1 only makes the build plan realistic
- Contrarian #4 + VC #5 → Trust Bundle as a procurement accelerator (§8.8 sales material), not a compliance premium tier