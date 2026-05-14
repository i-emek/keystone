# Module 2 — Use Cases & Personas

**Status:** Draft v2 (post-critique synthesis)
**Last Updated:** 2026-05-09

---

## 2.1 Persona Hierarchy

| Role | Function in the Sale | Scope | Role in the Product |
|---|---|---|---|
| **VPE (Vice President Engineering)** | **Champion + Approver (Tier 3)** | Cross-team / org-wide | Budget owner; confirms output, low-touch operator (<10 min onboarding) |
| **EM (Engineering Manager)** | **Co-champion + daily user** | Single team | Uses Tier-1 Map daily; Tier-2 Pulse (phase 2) |
| **Staff / Principal Engineer** | **Operator + power user** | Topic / cross-team | Onboarding refinement, taxonomy maintenance, Tier-1 deep analysis |
| CTO | Economic buyer / sponsor | Org-wide | Strategic sponsor, ROI validator |
| **HRBP Tech** | **Co-signer (NEW — see 2.2)** | — | Read-only default role; HR fast-path artifact for customer legal |
| Chief of Staff Eng | Power user Tier 3 (phase 2) | Org-wide | Reorg Discovery / Reorg Sim operator |
| People Ops / Legal | Compliance gatekeeper | — | Otherwise triggers the pre-sale compliance bundle block |

**Strategic implication:** The champion layer is VPE (budget) + EM (daily use). The **operator layer** is Staff/Principal Engineering (taxonomy care, refinement). This split resolves the VPE time-friction problem: the VPE is an approver in <10 minutes, not a configuration operator.

## 2.2 HR Stance — "Engineering-led, HR-co-signed" (updated)

**Previous position (discarded):** "Bypass HR, engineering-pure" — internally inconsistent with high-risk AI system classification; customer legal will trigger HR review anyway.

**New position:** **Engineering-led, HR-co-signed.**

| Aspect | Setup |
|---|---|
| Primary sale | VPE/CTO (unchanged) |
| HR role at the customer | Contract co-signer, not buyer |
| Standard RBAC | HR read-only default role in every customer tenant |
| Pre-sales asset | **HR fast-path artifact (1-pager)** — addresses HR concerns in 5 minutes of reading; part of the trust bundle |
| Tier-3 outputs | HR sees aggregated risk maps (read), but NOT person-specific Tier-3 decisions without explicit manager approval |

**Effect:** Sales-cycle friction is reduced because HR does not enter late as a blocker, while the brand remains engineering-centered. No HR workflow lives in the product.

## 2.3 Pain Map

### VPE — Pain (org-wide)
- "I have 80–500 engineers, and I no longer know all of them personally"
- "I do not know whether my Q3 plan is realistic. Who can actually deliver this?"
- "If X resigns, what breaks?"
- "My CTO asks where we can save money, and I am guessing"
- "For reorgs, I need hours in spreadsheets, not days"

### EM — Pain (single team)
- "My new joiner needs 6 weeks before they know who to ask"
- "My team has 4 SPOFs, and I only recognize 2 of them"
- "My sprint plan is optimistic because I do not truly see capacity"

### Staff/Principal Engineer — Pain (operator layer)
- "I constantly get asked 'who knows X?' and I am guessing too"
- "Onboarding buddy matching is based on gut feel"

### Shared Jobs To Be Done
- *"Help me understand my team without scaling 1:1s"*
- *"Help me validate gut feeling with data"*
- *"Help me sleep better when people move or leave"*

## 2.4 Use Cases by Tier

### Tier 1 — Map (MVP — bookend reduced to Tier 1)
1. **Bus-Factor Audit** — make SPOFs visible before people cycles — **PRIMARY WEDGE (updated)**
2. **Knowledge Discovery** — "Who knows X?" — secondary hook
3. *(later)* Skill-gap analysis for hiring plans
4. *(later)* Onboarding buddy matching

### Tier 2 — Pulse (phase 2)
5. Burnout early warning (anomalous activity patterns)
6. Sprint realism check (capacity vs. plan)
7. Cross-team collaboration health
8. Team health trend across quarters

### Tier 3 — Decide (phase 2 — NO longer in the MVP)

**Phase 2a (Month 9–12):** **Reorg Discovery**
- Surfaces which topics and initiatives are exposed when people leave
- NO composite RRC score, NO numerical output with a confidence interval
- Massively reduces Mobley-v.-Workday-style risk

**Phase 2b (Month 12–18, post-SOC-2-Type-II):** **Reorg simulation (full RRC)**
- RRC score, roadmap impact, confidence intervals
- Requires a fully validated bias framework + a 6-month retrospective study on design-partner data

**Phase 3:**
- Retention-risk scoring
- Promotion-candidate screening
- Layoff impact analysis (defensive framing)

## 2.5 MVP Scope Consequences (updated)

- **The bookend strategy is discarded.** The MVP is now **Tier-1 first**: Map + Bus-Factor Audit as the complete wedge.
- **Reorg Sim moves to phase 2** (see Module 8 roadmap update).
- **The wedge demo is the Bus-Factor Audit:** *"Here are your 12 SPOFs. Four of them were not on your radar."* Low friction, demoable in 30 seconds, no compliance trigger.
- **Pulse signals are still computed under the hood** (for phase-2 Reorg Discovery), just not exposed.
- **Compliance burden is reduced:** without Tier 3 in the MVP, the Reorg Sim demo death trap disappears. The compliance foundation is still built for phase 2 Tier 3.

## 2.6 Anti-Use-Cases (what we explicitly do NOT do)

- Real-time surveillance of individual employees
- Automatic "fire / promote / hire" recommendations without a human in the loop
- 1:1 ranking comparisons for ICs
- Tier-3 outputs visible to ICs
- HR workflows (PIPs, comp reviews, performance calibration) — engineering-led, not an HR system
- **Numerical "replaceability scores" for people before SOC 2 Type II + retrospective bias validation**

## 2.7 Pitfalls (module-specific, post-critique)

| Pitfall | Mitigation |
|---|---|
| Persona sprawl → feature bloat | The champion/operator split enforces discipline; every feature must be tested against VPE-approver / EM-daily / Staff-operator JTBD |
| EM feels watched → adoption blockade | Frame the EM as a *co-champion*, not as an observation object; keep Tier-1 outputs transparent |
| HR confusion despite the co-sign path | Clear engineering-native branding; the HR fast-path artifact is a concession, not a takeover |
| Bus-Factor Audit misunderstood as a productivity tool | Use resilience framing in the demo; show SPOFs as *structural* risk, not IC performance |
| VPE time required > 10 min | Design onboarding around <10 minutes of VPE touch; Staff/Principal handles the rest |
| Reorg Discovery is still attacked as a layoff tool | Explicit topics-not-people output format; pre-baked PR statement kit |

---

## Brainstorming Notes

*(add in later sessions)*

## Critique Notes (post-synthesis)

- Contrarian #2 + #8 and VC #2 correctly hit the HR stance, Reorg-Sim-in-MVP, and VPE-operator conflict; these changes are reflected in sections 2.1, 2.2, 2.4, and 2.5.
- Reorg Sim is not removed entirely. It returns in phase 2 as "Reorg Discovery" (without RRC score), with full RRC only in phase 2b after validation.