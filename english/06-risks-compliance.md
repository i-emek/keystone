# Module 6 — Risks & Compliance

**Status:** Draft v2 (post-critique synthesis)
**Last Updated:** 2026-05-09

---

## 6.1 Legal Foundational Premise

**Keystone IS a "high-risk AI system"** under both the EU AI Act (Annex III: "Employment, workers management — decisions affecting essential terms of an employment relationship; allocation of tasks") and the Colorado AI Act (effective Feb 2026).

Our **"Advisory-only / Decision Support, not Decision Automation"** framing is the legal pillar that carries the product. The product architecture has to defend that claim technically, not just in the terms of service.

## 6.2 Regulatory Landscape (US first, EU phase 2)

| Level | Framework | Core Requirement for Keystone | Status |
|---|---|---|---|
| **US Federal** | EEOC Technical Assistance (2023) | Disparate-impact protection | Actively enforced |
| **US Federal** | NIST AI RMF | Voluntary best practice, de facto B2B expectation | De facto mandatory |
| **US Federal** | OFCCP (for federal-contractor customers) | Adverse impact analysis | Selective |
| **US State** | **Colorado AI Act (Feb 2026)** | High risk: risk management program, impact assessments, notice to individuals | **Binding from Feb 2026** |
| **US State** | **NYC Local Law 144 (AEDT)** | Annual bias audit, public report | Binding |
| **US State** | Illinois HB 3773 (2024) | Notice + bias audits for engineering decisions | Binding |
| **US State** | Texas TRAIGA, plus ~15 other states moving | Monitoring + readiness to adapt | Watch |
| **EU** *(phase 2)* | **EU AI Act (High Risk, Annex III)** | Conformity assessment, logging, human oversight, EU DB registration | **Mandatory from Aug 2026** |
| **EU** *(phase 2)* | GDPR Art. 22 | Protection against automated individual decisions | Binding |
| **B2B Standard** | SOC 2 Type II, ISO 42001 | Trust asset, mandatory in pre-sales | Table stakes |

## 6.3 Risk Matrix

| # | Risk | Probability | Impact | Priority |
|---|---|---|---|---|
| R1 | Discrimination lawsuit against the customer, with Keystone as co-defendant | Medium | Existential | 🔴 Critical |
| R2 | Bias in Reorg Sim output (demographics) | High if not actively mitigated | High | 🔴 Critical |
| R3 | Data leak (HR-relevant + engineering IP) | Low–Medium | Existential | 🟠 High |
| R4 | "Surveillance" PR backlash | Medium | High | 🟠 High |
| R5 | LLM hallucination in the audit trail | Medium | High (destroys trust) | 🟠 High |
| R6 | EU AI Act non-compliance at market entry | Certain if unprepared | High | 🟡 Medium (phase 2) |
| R7 | Goodhart gaming | Medium | Low–Medium | 🟡 Medium |
| R8 | Customer legal blocks the deal | High without a pre-sales asset | Medium | 🟡 Medium |

## 6.4 Mitigation Architecture — 5 Pillars

### Pillar 1 — Product-Level Hardening

| Mechanic | Implementation |
|---|---|
| **Hard human in the loop** | Tier-3 outputs are technically *not* batch-processable; mandatory confirmation click + justification field; no batch API for personnel decisions |
| **Disclaimer layer** | Every Tier-3 artifact carries a "Decision Support — not a Decision" watermark + audit stamp |
| **Demographics blindness (production)** | Production models have *no* access to protected attributes (age, gender, ethnicity, marital status, pregnancy, disability status), including indirect proxy access |
| **Geofencing** | Tier-3 features gated by jurisdiction (for example, Reorg Sim triggers an additional disclosure flow in CO/NYC) |
| **Audit stamping** | Every output is stored immutably with model version, input snapshot, timestamp, user, and justification |

### Pillar 2 — Bias-Testing Pipeline (built-in, hardened post-critique)

**Architecture principle:** *Production-side demographics blocked, audit side hermetically isolated + production-distribution proxy-bias monitor.*

**Important clarification (post-critique):** Blocking demographics in production is *not* enough. Models absorb proxies (tenure, time zone, language register, parental-leave activity gaps) that can create disparate impact in real customer distributions. That is why the bias-testing pipeline has three layers:

| Layer | Cadence | Content |
|---|---|---|
| **Pre-deployment** | Per model release | Adverse-impact test against a **synthetic test set** (4/5ths rule, demographic parity, equal opportunity) |
| **Continuous (production distribution)** | Monthly | **Proxy-bias monitor on real customer activity distributions** (isolated on the audit side): detects correlations between composites and proxy demographic patterns (for example sudden activity drops as a parental-leave proxy) |
| **Customer demographic audit** *(opt-in, Enterprise)* | Quarterly | Customer provides anonymized demographic data under a strict legal firewall + separate KMS, exclusively for the audit pipeline; **the data never returns to the production model** |
| **Annual public** | Yearly | Public bias audit (NYC AEDT style) for all customers |

### Pillar 3 — Audit & Documentation

- **Decision log:** immutable append-only log of all Tier-3 outputs (model version, inputs, user, justification)
- **Model cards:** published for every model (NIST AI RMF style)
- **Impact assessments:** auto-filled templates for customers (DPIA, EU AIA conformity, US bias impact assessment)
- **Versioned taxonomy:** classifier versions + customer fine-tunings remain traceable

### Pillar 4 — "Keystone Trust Bundle" (pricing lever instead of cost center)

**Strategic shift:** Compliance is a differentiating moat. Competitors (Jellyfish, Swarmia) are productivity tools without this burden. We sell compliance as an enterprise feature.

**Trust Bundle (Enterprise tier):**
- AI risk assessment template (auto-filled with customer setup)
- DPIA / TIA templates (US + EU)
- Quarterly bias audit report (customer-specific)
- Annual public bias audit (shared across all customers)
- Model cards + lineage
- Third-party auditor letter
- Pre-sales: vendor security questionnaire (VSQ) auto-answer bundle

**Trust basics (all tiers — included):**
- Decision log
- Disclaimer layer
- Production-side demographics blindness
- Hard HIL enforcement

### Pillar 5 — Insurance & Contractual Controls

- **E&O insurance + cyber liability:** $10M+ before launch
- **DPA templates** (US + GDPR compliant) as the standard
- **AI-specific indemnification:** *limited* — no blanket hold harmless; scoped to Keystone-caused defects, not customer misuse
- **Limitation of liability:** Keystone is a tool, not the decision-maker — contractually codified
- **Customer acceptable use policy:** forbids automatic decisioning, repurposing for recruiting/hiring (out of scope), and disclosure to unauthorized parties

## 6.5 EU AI Act — Phase-2 Readiness (foundation requirements from day 1)

To avoid a rebuild when entering the EU market in 2027/28, we build the following requirements from the start:

| AI Act Requirement | Foundation Implementation |
|---|---|
| Risk management system (Art. 9) | Internal risk register + quarterly reviews |
| Data governance (Art. 10) | Versioned data catalogs, provenance tracking |
| Technical documentation (Art. 11) | Model cards + system cards mandatory |
| Logging (Art. 12) | Append-only audit log (see Pillar 3) |
| Transparency (Art. 13) | Disclaimer layer + user-facing explanations |
| Human oversight (Art. 14) | Hard HIL (see Pillar 1) |
| Accuracy & robustness (Art. 15) | Pre-deployment + continuous bias pipeline |
| Quality management system (Art. 17) | Build an ISO 42001-aligned QMS |

## 6.6 Worst-Case Playbook

| Scenario | Immediate (24h) | Short-Term (7 days) | Medium-Term |
|---|---|---|---|
| Discrimination lawsuit against a customer | Release audit logs, provide legal support | Bias-audit deep dive on model + customer setup | If required, model recall and public statement |
| Data leak | IRP stage 1, inform all customers within 24h | Forensics + regulator filing (varies by state) | Customer restitution, trust rebuild tour |
| PR storm around "surveillance" | Pre-prepared statement, founder voice | Publish transparency report | External audit validation as trust marker |
| LLM hallucination in audit output | Output recall, model rollback | Root cause + public disclosure | Hallucination detector as permanent layer |

## 6.7 Strategic Implications for Other Modules

- **Module 5 (Tech Architecture):** audit log + demographics blindness + geofencing + HIL enforcement must be foundational, not add-ons
- **Module 8 (GTM/Pricing):** Trust Bundle = paid enterprise feature; differentiates versus competitors
- **Module 4 (Classifier):** versioning must be hard-enforced; reclassification on taxonomy changes; audit trail for every classification
- **Module 3 (Metrics):** composite metrics must be adverse-impact tested before release
- **Module 7 (Competition):** compliance maturity must be positioned explicitly as a differentiation axis

## 6.8 Pre-Launch Compliance Checklist

- [ ] SOC 2 Type I (before the first paying customer)
- [ ] SOC 2 Type II (within 12 months of launch)
- [ ] E&O + cyber liability insurance
- [ ] AI acceptable use policy
- [ ] DPA templates (US + GDPR)
- [ ] First public bias audit report
- [ ] NIST AI RMF profile documented
- [ ] Model cards for all live models
- [ ] Customer Trust Bundle v1
- [ ] Internal IRP (incident response plan)
- [ ] Employee AI training track

---

## Brainstorming Notes

*(add in later sessions)*