# Decisions Log

Chronological log of all decisions made in the project.
Format: Date · Topic · Decision · Rationale

---

## 2026-05-09 — Initial Strategy Setup

| Topic | Decision | Rationale |
|---|---|---|
| **ICP (target customer)** | Tech leadership (CTO/VPE) | Engineering-specific data sources, clear buyer profile, concrete pain around team health and skill gaps |
| **Product architecture** | Three-tier model: Tier 1 (Map) / Tier 2 (Pulse) / Tier 3 (Decide) | Enables land-and-expand: low-friction entry through Map, trust-building, then upsell into more sensitive tiers |
| **Layoff framing** | Position as "workforce resilience" — defensive framing | Serves the layoff use case implicitly without polarizing marketing; reduces reputational risk |
| **Geographic market** | US first | Faster adoption, larger TAM, easier compliance setup than DACH/EU with works councils and the EU AI Act |
| **Classifier approach** | Hybrid: base taxonomy + customer embedding layer + human-in-the-loop refinement | Purely generic is too shallow, fully tuned does not scale; hybrid delivers day-1 value and sharpens over time; must be versioned and auditable |
| **Goodhart / gaming protection** | Composite metrics + anti-gaming + tiered transparency by tier | Tier 1: fully transparent (motivating); Tier 2: ICs see only their own data, no peer comparisons; Tier 3: read-only for leadership, not visible to ICs; only derived composites, no raw counts |

---

## 2026-05-09 — Module 2: Use Cases & Personas

| Topic | Decision | Rationale |
|---|---|---|
| **Primary champion** | Double champion: VPE (org-wide) + EM (single-team) | Same product engine, different scope lens; avoids persona sprawl while keeping broad usability |
| **HR stance phase 1** | Bypass HR, engineering-pure | Faster sale through VPE budget; consequence: we carry the compliance burden ourselves → "AI Risk Assessment Bundle" becomes mandatory in pre-sales |
| **MVP killer use cases** | Knowledge Discovery (T1), Bus-Factor Audit (T1), Reorg Simulation (T3) | Bookend strategy: Map + Decide in the MVP, Pulse in phase 2; Tier-2 signals are computed internally but not exposed |
| **Reorg-Simulation positioning** | "Advisory-only / no decisions" with a hard disclaimer | Tier-3 compliance risk (EU AI Act, EEOC) requires clear framing boundaries before GA |
| **Tier 2 (Pulse) timing** | Phase 2, not in the MVP | Bookends create a more coherent MVP story; Pulse becomes cheaper to launch later because the under-the-hood computation already exists |

---

## 2026-05-09 — Module 1: Vision & Positioning Finalized

| Topic | Decision | Rationale |
|---|---|---|
| **Working name** | **Keystone** | Architecture metaphor, resilience connection ("keystone of the arch"), engineering-associated, clear — Lattice is burned as an HR-tool association |
| **Pitch style** | Hook (provocative) + subline (functional) | Hook C is memorable and differentiating, A explains the function; the combination beats either one alone; classic pitch-deck cover pattern |
| **Mission statement** | *"We help engineering leaders make people decisions with the same rigor they apply to architecture decisions."* | Evergreen; frames the engineering leader’s self-image as an architect |
| **Anti-positioning** | Explicit NOT list: not a surveillance tool, not an HR system, not a productivity tracker, not hire/fire automation, not a generic people suite | Clear category boundaries prevent positioning drift in GTM |
| **Manifest** | 6 principles (evidence, resilience, decisions-not-verdicts, transparency tiers, auditable, engineering-native) | Drives later feature trade-offs and brand consistency |
| **Brand voice** | Confident, technical, defensively positioned; engineering vocabulary | Avoids HR confusion, speaks directly to the champion persona |

---

## 2026-05-09 — Module 6: Risks & Compliance

| Topic | Decision | Rationale |
|---|---|---|
| **Classification** | We explicitly accept the "high-risk AI system" status (EU AI Act Annex III, Colorado AI Act) | Reorg Sim touches "essential terms of employment" — not realistically arguable away; better to build compliantly than to fight the law |
| **Human-in-the-loop** | Hard-enforced (technical, not just UX) | Defends the "Decision Support, not Decision Automation" framing; no batch APIs for Tier 3 |
| **Compliance pricing** | Trust Bundle as a paid enterprise feature | Pricing lever instead of cost center; compliance becomes a differentiation moat versus Jellyfish/Swarmia |
| **Demographics** | Production side technically blocked; audit side isolated pipeline with synthetic test sets | Cleanest compliance posture while still enabling adverse-impact testing |
| **EU AI Act** | Build phase-2-ready — foundation requirements from day 1 | Avoids an expensive phase-2 refactor; AI Act logic also becomes a trust marker for US customers |
| **Annual bias audit** | Public report yearly (NYC AEDT style) for all customers, not only NYC | Trust asset beyond the legal minimum; differentiates versus competitors |
| **Insurance** | E&O + cyber liability $10M+ before launch | Existential protection; prerequisite for enterprise sales |
| **Audit log** | Append-only, immutable, with model version + inputs + justification | EU AI Act Art. 12 requirement + internal forensic capability |

---

## 2026-05-09 — Module 3: Metrics & Signals

| Topic | Decision | Rationale |
|---|---|---|
| **Action-type weights (TAS)** | Balanced: doc 1.00, code 0.85, Jira 0.65, PR review 0.50, Slack 0.20 | Avoids code-heavy bias against TLs/architects/EMs; fair to non-code roles |
| **Topic criticality (TC) v1** | Manual VPE flag during onboarding (top 10–20 topics) | Simple, transparent, auditable; auto-detection (roadmap/traffic based) becomes a phase-2 evolution |
| **Confidence gate** | Hard block below minimum confidence (technically non-retrievable) | Protects against wrong decisions on thin data; compliance anchor |
| **Minimum confidence thresholds** | TAS: Medium · BF/KCS: Medium · RRC: High (90d data, ≥3 sources, TC flags) | Tier-3 RRC needs higher confidence because of decision impact |
| **Recency decay** | Six-month half-life (configurable) | Balance between "outdated" and "latent authority" |
| **Substantive Slack filter** | >1 sentence; no reactions; LLM-classified | Anti-gaming + anti-visibility-bias |

---

## 2026-05-09 — Module 4: Classifier & Data Model

| Topic | Decision | Rationale |
|---|---|---|
| **Embedding model** | OpenAI text-embedding-3-large as the default, OSS switch (BGE-M3) for Enterprise | Best quality time-to-market; OSS switch becomes a monetizable Trust Bundle feature for data-residency customers |
| **Embedding-provider abstraction** | Mandatory — `EmbeddingProvider` interface, no hard-coding | Enables switching without a rebuild; mitigates vendor risk |
| **Customer taxonomy editability** | Continuously editable with versioning + audit trail | Flexibility for changing teams; major changes require impact preview + justification |
| **Code classification** | Structural + semantic hybrid in the MVP | Differentiation moat; naive text embedding handles code semantics poorly; Bus-Factor precision on tech topics depends on this |
| **MVP languages for code analysis** | Python, TypeScript, Go, Java/Kotlin | Covers ~90% of tech stacks in the ICP |
| **Vector storage** | pgvector in tenant-isolated Postgres as the default | Simple ops, tenant isolation, self-host ready; Weaviate in phase 2 if volume outgrows it |
| **Base-taxonomy maintenance** | Quarterly updates, publicly versioned | Trust marker; enables external auditing |
| **Tax versioning** | Two axes: taxonomy version + classifier model version, both semver | Historical outputs remain recomputable for audit obligations |

---

## 2026-05-09 — Module 7: Competition & Differentiation

| Topic | Decision | Rationale |
|---|---|---|
| **Category strategy** | Hybrid: "Engineering Intelligence" as the discovery category + sharp sub-positioning as "Resilience" | Uses existing buyer awareness while differentiating sharply; category-king-in-a-niche pattern |
| **Marketing lead axes (top 3)** | (1) resilience lens, (2) Reorg Simulation, (3) compliance moat | Brand anchor + demo killer + closer; engineering-native remains a sub-message |
| **Primary threat** | Jellyfish | Money + customers + brand awareness; could rebrand toward resilience in 6–12 months |
| **Mitigations against Jellyfish** | Speed to category + compliance moat (12–24 month lead) + code-hybrid tech + early brand story | The strongest moats are a combination, not a single feature |
| **Secondary threat** | Faros AI (structurally closest) | They are a data layer; compliance + code hybrid + brand positioning defend against them |
| **Content strategy** | "State of Engineering Resilience" reports quarterly + webinars + education content | New categories bring longer sales cycles; education material becomes mandatory |

---

## 2026-05-09 — Module 5: Technical Architecture

| Topic | Decision | Rationale |
|---|---|---|
| **Macro architecture** | Three layers: Ingestion / Processing / Application | Clear separation of concerns; independent scalability |
| **Tenancy model** | Single-tenant data plane + multi-tenant control plane | Per-tenant DB + KMS for all customers; HR-sensitive data requires hard isolation |
| **Tenancy-tier strategy** | Per-tenant DB for ALL customers (no pooling) | Consistent compliance story; accepts higher initial ops cost |
| **Cloud strategy** | AWS-primary + cloud-agnostic abstraction | Target ICP is AWS-heavy; Terraform IaC + interfaces allow later GCP/Azure/self-host without re-architecture |
| **AWS code limit** | Max ~5% of the code AWS-specific, all behind interfaces | Keeps the self-host path inexpensive to reach |
| **LLM provider strategy** | Anthropic primary (reasoning) + OpenAI (embeddings) + multi-LLM router | Trust-story alignment + quality + vendor hedge |
| **`LLMProvider` interface** | Mandatory from day 1 | Enables switching for cost optimization, vendor changes, self-host |
| **Tiered model routing** | Haiku first pass → Sonnet on low confidence → human-review queue | Cost optimization without quality loss for the majority of activities |
| **Audit pipeline** | Postgres append-only + S3 Object-Lock mirror + hash chain | WORM compliance + tamper detection; 7-year retention; auditor RBAC |
| **Self-host topology** | Built from day 1, sold to Enterprise in phase 2 | Otherwise "enterprise OSS switch" would be a hollow promise; Helm chart + outbound-only connectivity |
| **Stack** | React/TS + NestJS + Python (ML) + Postgres+pgvector + Anthropic/OpenAI + Terraform + EKS | Pragmatic standard choices, easy to hire for, easy to audit |

---

## 2026-05-09 — Module 8: GTM, Pricing & Roadmap

| Topic | Decision | Rationale |
|---|---|---|
| **Pricing model** | Per-engineer-per-month + modular add-ons (Map $25, +Decide $15, +Enterprise $15+) | Standard for engineering leadership tooling; transparent; supports tier upsell; annual-commit discount 15–20% |
| **Customer floor** | 50-engineer minimum | Per-tenant-DB COGS are not profitable for smaller customers |
| **Sales motion** | Top-down dominant + EM enabled as co-champion | VPE outbound, EM trial, compliance bundle as closer; aligns with the persona hierarchy |
| **Free tier** | No — 30-day trial instead, sales-engineer-led onboarding | Engineering-pure stance + HR-sensitive data makes a free tier a brand risk; trial protects onboarding quality |
| **MVP build time** | 6 months (aggressive) | Speed-to-category versus Jellyfish; accepts pre-SOC-2 status for the first 5 design partners |
| **Design-partner program** | 5 design partners, 50% discount, pre-SOC-2 risk acceptance, co-design privilege | Validates the MVP, generates case studies, creates a speed advantage |
| **SOC 2 Type I** | Month 9 (3 months post-launch) | Realistic compliance cycle; gate for enterprise sales |
| **Trust Bundle v1 GA** | Month 9, alongside SOC 2 Type I | Enterprise upsell lever; differentiating moat |
| **Public bias audit** | Month 12 (1 year after build start) | NYC AEDT style; trust marker for all customers |
| **Funding plan** | Seed $3–5M (before launch) → Series A $10–15M (end of Y1) → Series B $25–40M (Y3) | Standard SaaS fundraising path |
| **North-star metric** | Engineering seats activated (Y1: 5k–10k) | Direct value indicator; ARR follows |
| **Counter-metrics** | Customer bias audit score (disparate impact 4/5 rule for 100%); customer NPS 40+ | Guards against becoming a discrimination machine; quality indicator |
| **Wedge strategy** | Reorg-Sim demo as the sales wow, with Bus-Factor Audit as the lower-friction alternative | Concrete + memorable; ROI calculator: "Wrong senior layoff ≈ $300k" |

---

## 2026-05-09 — Critique Synthesis (Adopt + Refine + Park)

After subagent critique (Contrarian + VC Investor) and consensus-finder synthesis: substantial adjustments. Prior decisions that are replaced are marked as **SUPERSEDED** rather than deleted, preserving the audit trail.

### Adopt (substantial changes)

| # | Topic | New Decision | Supersedes | Rationale |
|---|---|---|---|---|
| **A1** | MVP scope | **Tier-1-first MVP** (Map + Bus-Factor only) | "MVP killer use cases: Knowledge Discovery, Bus-Factor, Reorg Sim" (2026-05-09 Module 2) | Reorg Sim removed from the MVP because the 6-month scope is incompatible with the compliance foundation list (Contrarian #1) and because of Mobley-v.-Workday risk (VC #2 deal breaker) |
| **A2** | Reorg-Sim path | **Phase 2a: Reorg Discovery (no score)** + **Phase 2b: Full RRC (post-validation)** | "Reorg-Simulation positioning: Advisory-only" (2026-05-09 Module 2) | Split approach: topics-affected without a score dramatically reduces legal risk; full RRC only after SOC 2 Type II + a retrospective validation study |
| **A3** | Tenancy model | **Tier-aware tenancy: pooled multi-tenant for Map (RLS+PT-AE), per-tenant DB for Decide+/Enterprise** | "Tenancy-tier strategy: per-tenant DB for ALL" (2026-05-09 Module 5) | A per-tenant DB for the Map tier is a margin trap (~$1k COGS vs. $1.25k MRR at 50 engineers); the compliance story stays coherent through tier differentiation |
| **A4** | HR stance | **"Engineering-led, HR-co-signed"** + HR read-only default role + HR fast-path artifact | "HR stance phase 1: bypass HR, engineering-pure" (2026-05-09 Module 2) | HR will trigger customer-side compliance review anyway; preempting it instead of bypassing it reduces sales-cycle friction |
| **A5** | Team plan | **Module 8 §8.10 NEW: team & hiring plan** with GTM co-founder search, VPE advisor, founding-engineer hires | (previously a gap) | VC #8: not fundable at pre-seed/seed without team disclosure |
| **A6** | Category strategy | **Sell into the engineering-intelligence budget + use resilience as sub-positioning/brand** + forcing-function section | "Hybrid: engineering intelligence + sharp sub-position as resilience" (2026-05-09 Module 7 — sharpened) | "Workforce resilience" is positioning, not a standalone category; category creation would be too slow for the seed stage |
| **A6b** | Wedge | **Bus-Factor Audit as the primary wedge** (instead of Reorg Sim) | "Wedge: Reorg-Sim demo" (2026-05-09 Module 8) | Follows from A1+A2; the Bus-Factor demo is low-friction, high-wow, and has no compliance trigger |

### Refine (wording / architecture sharpening)

| # | Topic | Refinement | Rationale |
|---|---|---|---|
| **R1** | Compliance positioning | **Compliance is table-stakes bundled + a speed-to-procurement accelerator**, not a 24-month moat. **NEW primary moat: customer taxonomy + HIL refinement data flywheel** | Compliance moat was overestimated (Contrarian #4, VC #5); the real moat is the customer-specific compounding knowledge graph |
| **R2** | Code-hybrid MVP | **Reduced to 1 anchor language (TypeScript)**; multi-language expands iteratively (Python phase 1b, Go phase 2a, Java/Kotlin phase 2b) | Four-language hybrid in the MVP is too expensive (Contrarian #7); ICP density determines TypeScript as the anchor |
| **R3** | LLM provider default | **AWS Bedrock (Anthropic Claude + Cohere/Titan embeddings)** as the unified trust boundary; direct API as fallback. **OSS-switch quality gate** before enterprise sale | Anthropic+OpenAI direct conflicts with the trust story (Contrarian #6, VC #6); Bedrock keeps data inside the customer AWS region |
| **R4** | VPE onboarding time | **VPE time reduced to <10 min; Staff/Principal Engineering as the operator persona** | VPEs do not have time for 30-minute refinement calls (Contrarian #8); UX rebuilt around operator/approver split |
| **R5** | Demographics pipeline | **Production-distribution proxy-bias monitor** explicitly added to synthetic test sets; customer demographic audit becomes an opt-in enterprise feature | Synthetic test sets alone do not detect proxy bias (tenure, parental-leave gaps) (Contrarian #10) |
| **R6** | Funding plan | **Seed runway extended to 24 months** (instead of 18); Year-1 targets framed as min/max ranges; Series A no longer forced into Q4 Y1 | Year-1 ARR plan was not Series-A fundable in 2026 (VC #4); longer runway allows ARR build and NRR proof |

### Park / Reject

| # | Topic | Decision | Rationale |
|---|---|---|---|
| **X1** | Macro-timing brand reframe | **Reject** — resilience brand stays | More communicable moat; "Confidence in Engineering Decisions" would be mushy. **Tracked in open questions as Watch Item P3** (monthly Layoffs.fyi monitoring) |
| **X2** | Reorg-Sim as acquirer poison pill | **Already addressed by A2** (phase-2 deferral + "Reorg Discovery" reframe) | Mobley risk is significantly reduced |

---

## Template for Future Entries

```
## YYYY-MM-DD — <Topic>

| Topic | Decision | Rationale |
|---|---|---|
| ... | ... | ... |
```

```
## YYYY-MM-DD — <Topic>

| Topic | Decision | Rationale |
|---|---|---|
| ... | ... | ... |
```