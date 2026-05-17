# Mehdi Trap Ideas

## Purpose

This file collects the main caveats, risks, and watch-outs that should stay visible while building Keystone. It is meant for the Trap points sheet: not implementation tasks, but issues that can change scope, delay sales, create legal exposure, or weaken trust.

## How To Use This Sheet

- Use it as a founder checklist during product and roadmap decisions.
- Treat each item as a recurring review point, not a one-time note.
- Revisit the highest-risk items before adding new scope or entering new markets.

## Suggested Sheet Structure

Recommended columns for Excel:

| Trap point | Why it matters | MVP impact | Recommended stance | Priority |
| --- | --- | --- | --- | --- |

## Core Trap Points

| Trap point | Why it matters | MVP impact | Recommended stance | Priority |
| --- | --- | --- | --- | --- |
| US-first vs EU-first market entry | The team is Europe-based, but the product is currently framed as US-first. EU-first adds GDPR, works-council friction, and EU AI Act burden earlier. | A wrong market order can slow GTM, legal prep, and product scope. | Keep MVP US-first. Build EU-readiness foundations now, but defer EU launch until the product is stable. | High |
| Workforce-AI legal classification risk | Earlier Richard notes assume the broader product can be seen as high-risk AI under the EU AI Act and similar US laws. Even the lighter MVP still touches identity-linked org data and people-related outputs. | Product framing, logging, human review, and auditability must be built carefully from day one. | Keep the MVP strictly advisory-only. Avoid automated personnel decisions, rankings, or HR decision support language. | High |
| State-level US AI and employment-law drift | Colorado AI Act, NYC Local Law 144, Illinois-style audit and notice rules, EEOC expectations, and future state laws create moving compliance targets. | A feature that looks harmless today can trigger extra obligations later. | Track US state changes quarterly. Keep publish, explanation, and audit surfaces extensible. | High |
| GDPR and cross-border data handling | A Europe-based team serving US customers may still touch EU operational processes, subprocessors, and personal-data handling obligations. | Vendor setup, contracts, and data flows can block enterprise sales if not prepared. | Prepare DPA, subprocessor list, retention rules, and cross-border transfer posture early, even if launch is US-first. | High |
| Pseudonymization is not optional | The product deals with identifiable engineering activity and org-sensitive signals. Named views increase legal and trust risk. | If identity protections are weak, the trust story breaks immediately. | Keep contributor views pseudonymized by default. Allow re-identification only for scoped roles, with justification and audit logging. | High |
| Product can drift into surveillance perception | Even if the product is useful, employees or buyers may interpret it as a monitoring or ranking system. | This can hurt adoption, PR, and internal champion support. | Keep framing around resilience, coverage, and explainability. Do not expose raw productivity scoring, peer comparisons, or hidden people scores. | High |
| Thin or biased source coverage | Git may overrepresent coders, while docs, reviews, and ticket work may be undercounted or uneven across teams. | Results can become unfair or misleading, especially for tech leads, EMs, or architecture-heavy contributors. | Show evidence coverage clearly, block weak outputs, and treat single-source signals as provisional. | High |
| Topic-map quality can fail on ambiguous org language | Teams often use inconsistent names for the same domain, and the same topic may span multiple teams. | Poor topic quality weakens every downstream feature. | Keep manual review, merge, split, rename, and needs-review workflows in the MVP. | High |
| Confidence without explanation will not be trusted | Users will not trust expert ranking or risk flags if they cannot see why the system reached them. | Low trust reduces adoption and increases challenge from buyers and legal reviewers. | Always pair outputs with confidence, evidence coverage, and change history. | High |
| Wrong publish on weak evidence | If the system publishes a bus-factor result from sparse, stale, or conflicting data, the core demo becomes a liability. | This is both a product trust risk and a customer relationship risk. | Preserve hard publish gates and explain exactly what evidence is missing. | High |
| Shared-tenant architecture can become a trust blocker | The current MVP plan uses a pooled Tier-1 model with tenant isolation, but some buyers may still expect stronger isolation. | Security review friction can slow deals even if architecture is technically sound. | Keep strong tenant isolation, encryption, and audit controls. Preserve a clean path to per-tenant hosting and later self-hosting. | High |
| Multi-source onboarding can become too heavy | Connecting Git, Jira, and Confluence plus setting teams and permissions can create setup fatigue. | Time-to-first-value suffers and trials stall. | Keep onboarding light. Start with the minimum publishable source set and a fast operator workflow. | High |
| HRIS integration can pull in extra sensitivity too early | Team import sounds simple, but HRIS systems can introduce more personal data and governance obligations than the MVP needs. | It can expand the legal and data-handling scope of the product too early. | Start with manual team setup and CSV import. Keep HRIS connectors behind a generic interface and add them only when customer pull is real. | High |
| Buyer and user are not the same person | The VPE/CTO may buy, but Staff or Principal engineers may operate the workflow. HR or Legal may still review. | If the product assumes one persona owns everything, onboarding and sales will break. | Keep operator and approver roles separate. Design for engineering-led buying with HR/legal review paths. | High |
| Trust bundle expectations arrive early | Even if the MVP is small, enterprise buyers may expect security, audit, model, and compliance documentation before purchase. | Deals can stall before product value is even evaluated. | Prepare a lightweight trust package early: security answers, DPA, audit explanation, model/provider notes, and access-control posture. | High |
| SOC 2 timing can become a sales blocker | Pre-SOC-2 pilots may be fine, but repeatable enterprise sales usually need a clearer assurance story. | Revenue timelines may slip if this is ignored. | Use design partners first, then schedule trust assets and SOC milestones explicitly. | Medium |
| LLM/provider dependency can create trust and cost risk | Model providers affect cost, data posture, latency, and customer trust. | A provider decision can become both a margin issue and a procurement issue. | Keep provider abstraction from day one. Limit raw-data exposure and preserve the ability to switch or self-host later. | Medium |
| LLM hallucinations can damage audit credibility | If generated labels or explanations are wrong but appear authoritative, confidence in the whole product collapses. | This is especially dangerous in anything audit-like or publishable. | Use LLMs narrowly for ambiguous refinement, not broad end-to-end decision making. Keep lineage and human correction paths. | High |
| Language and market scope can quietly expand complexity | US-first and English-first keep the MVP manageable. Multi-language or EU-region support adds more than translation. | Scope can balloon through data, compliance, and model-quality requirements. | Stay English-first for the MVP. Do not promise EU hosting or multilingual support before the core workflow is stable. | Medium |
| Self-host requests may appear before the product is ready | Sensitive customers may ask for self-hosted deployment early, even if the MVP is not ready for it operationally. | This can derail roadmap focus and increase engineering burden. | Keep self-host as a planned path, not an MVP commitment. Only expand when sales pull justifies it. | Medium |
| Margin trap from infrastructure choices | Per-tenant isolation, audit storage, worker jobs, and model costs can erode margins fast if applied too early to small customers. | A technically elegant setup can become a bad business model. | Keep the MVP cost-aware. Use pooled Tier-1 where justified, with upgrade paths for more sensitive tiers later. | High |
| Customer size and ICP can be chosen wrong | Customers that are too small may not have enough data; customers that are too large may require heavier security and procurement too soon. | Wrong ICP slows validation and creates misleading feedback. | Focus on US engineering orgs with enough activity and enough pain, but not excessive enterprise overhead for the first pilots. | High |
| Bus-factor alone may not prove long-term retention | The MVP wedge is strong, but some customers may see it as a one-off audit rather than a repeated workflow. | Expansion can stall after initial interest. | Use the MVP wedge to land, but ensure search, activity, and trust views create repeated usage. | Medium |
| Reorg-simulation or employment-decision features create a legal cliff | Earlier notes show this clearly: once the product crosses into decision-heavy workforce tooling, legal and reputational exposure rises sharply. | Adding those features too early can derail the company. | Keep full reorg simulation and broader people-decision features out of the MVP. | High |
| Founder and GTM gaps are product risks too | Missing GTM ownership, limited VPE access, or weak design-partner input can hurt the product as much as technical mistakes. | Build quality alone will not create traction. | Treat design-partner interviews, advisor access, and GTM ownership as core risk items, not side tasks. | High |

## Trap Points Already Reflected In The Current MVP Plan

These are already covered at least partially in the current spec and development plan:

- Advisory-only framing
- Pseudonymization by default
- Re-identification with RBAC and audit logging
- Confidence and evidence gating
- Team and sub-team hierarchy
- Local-first delivery before hosted rollout
- Shared-tenant MVP with future migration path
- Topic-map review and manual refinement

## Important Trap Points Not Fully Captured By The Development Plan Alone

These deserve explicit visibility in the Trap points sheet because they are broader than engineering sequencing:

- US-first versus EU-first market order
- State and regional AI-employment law drift
- GDPR, DPA, and cross-border transfer readiness
- Surveillance or employee-ranking perception risk
- Procurement blockers such as SOC 2 and trust documentation
- Margin risk from hosting and model costs
- Wrong ICP or wrong customer-size focus
- GTM and founder-coverage gaps

## Recommended Spreadsheet Grouping

If you want the sheet to be easy to scan, group the trap points into these buckets:

### 1. Market and positioning traps

- US-first vs EU-first
- Resilience is positioning, not a standalone budget category
- Wrong ICP or wrong customer size
- Bus-factor wedge may not guarantee expansion

### 2. Legal, compliance, and privacy traps

- Workforce-AI legal classification risk
- State-level law drift
- GDPR and cross-border data handling
- Pseudonymization and re-identification controls
- Reorg-simulation legal cliff

### 3. Product trust and model-quality traps

- Thin or biased source coverage
- Ambiguous topic mapping
- Confidence without explanation
- Wrong publish on weak evidence
- LLM hallucination risk

### 4. Architecture and security traps

- Shared-tenant trust blocker
- HRIS integration scope creep
- Provider lock-in and LLM cost risk
- Self-host pressure too early
- Margin trap from infrastructure decisions

### 5. GTM and operational traps

- Heavy onboarding
- Buyer-user mismatch
- Trust bundle expectations
- SOC 2 timing
- Founder and GTM gaps

## Practical Shortlist For The Sheet

If you want a shorter first version of the sheet, keep these 12 first:

1. US-first vs EU-first
2. Workforce-AI legal classification risk
3. State-level AI and employment-law drift
4. GDPR and cross-border data handling
5. Pseudonymization and re-identification controls
6. Surveillance perception risk
7. Thin or biased source coverage
8. Wrong publish on weak evidence
9. Shared-tenant trust blocker
10. Heavy onboarding and time-to-first-value risk
11. Margin trap from infrastructure and model costs
12. Founder and GTM gaps

## Excel-Ready Short Version

| Trap point | Why it matters | Recommended stance | Priority |
| --- | --- | --- | --- |
| US-first vs EU-first | EU-first adds AI Act, GDPR, and works-council complexity too early. | Launch US-first, but keep EU-readiness foundations in the architecture. | High |
| Workforce-AI legal classification risk | The product touches people-related organizational decisions and can attract stricter legal scrutiny. | Keep the MVP advisory-only with hard human review and no automated personnel decisions. | High |
| US state law drift | Colorado, NYC, Illinois, and future state rules can change notice, audit, and governance expectations. | Review legal exposure quarterly and keep audit and explanation layers extensible. | High |
| GDPR and cross-border data handling | Even a US-first launch can still trigger European data-handling and contract requirements. | Prepare DPA, retention, subprocessors, and transfer posture early. | High |
| Pseudonymization and re-identification controls | Named identity access is one of the highest trust and privacy risks in the product. | Default to pseudonymized views and gate named access through RBAC, justification, and audit logs. | High |
| Surveillance perception risk | Buyers or employees may see the product as a monitoring or ranking system. | Position it around resilience and knowledge coverage, not productivity scoring or employee ranking. | High |
| Thin or biased source coverage | Git-heavy evidence can underrepresent reviews, documentation, or leadership work. | Show evidence coverage clearly and block weak outputs instead of overstating certainty. | High |
| Wrong publish on weak evidence | A bad publish can destroy trust in the product quickly. | Keep hard publish gates and clearly explain what evidence is missing. | High |
| Shared-tenant trust blocker | Some customers may reject pooled infrastructure even if it is technically secure. | Keep strong tenant isolation now and preserve a clean path to per-tenant or self-hosted later. | High |
| Heavy onboarding and time-to-first-value risk | Too many integrations and setup steps can stall the first successful workspace. | Start with the minimum viable source set and a very fast operator setup flow. | High |
| Margin trap from infra and model costs | Isolation, worker jobs, audit storage, and LLM usage can erode margins fast. | Keep the MVP cost-aware and avoid enterprise-grade cost structures too early. | High |
| Founder and GTM gaps | Product quality alone will not create traction without access to buyers and design partners. | Treat GTM ownership, advisor access, and customer discovery as top-level risks. | High |

## Source Notes

This sheet was derived mainly from:

- `specs/001-map-bus-factor-mvp/spec.md`
- `specs/001-map-bus-factor-mvp/plan.md`
- `richards/06-risks-compliance.md`
- `richards/05-technical-architecture.md`
- `richards/08-gtm-pricing-roadmap.md`
- `richards/decisions-log.md`
- `richards/open-questions.md`