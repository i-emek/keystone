# Decisions Log

Chronologisches Log aller im Projekt getroffenen Entscheidungen.
Format: Datum · Thema · Entscheidung · Begründung

---

## 2026-05-09 — Initiale Strategie-Setzung

| Thema | Entscheidung | Begründung |
|---|---|---|
| **ICP (Zielkunde)** | Tech-Leadership (CTO/VPE) | Engineering-spezifische Datenquellen, klares Buyer-Profil, konkretes Pain um Team-Health/Skill-Gaps |
| **Produktarchitektur** | Drei-Tier-Modell: Tier 1 (Map) / Tier 2 (Pulse) / Tier 3 (Decide) | Erlaubt Land-and-Expand: niedrige Einstiegshürde via Map, Vertrauensaufbau, Up-Sell zu sensiblen Tiers |
| **Layoff-Framing** | Positionierung als "Workforce Resilience" — defensives Framing | Bedient Layoff-Use-Case implizit, ohne polarisierendes Marketing; reduziert Reputational Risk |
| **Geo-Markt** | US-first | Schnellere Adoption, größerer TAM, Compliance-Setup einfacher als DACH/EU mit Betriebsrat & EU AI Act |
| **Classifier-Ansatz** | Hybrid: Base-Taxonomie + Customer Embedding-Layer + Human-in-the-Loop Refinement | Generisch zu oberflächlich, voll-tuned skaliert nicht; Hybrid liefert Tag-1-Wert + schärft sich über Zeit; muss versioniert & auditierbar sein |
| **Goodhart / Gaming-Schutz** | Composite Metrics + Anti-Gaming + gestaffelte Transparenz nach Tier | Tier 1: voll transparent (motivierend); Tier 2: ICs sehen eigenes, keine Peer-Vergleiche; Tier 3: read-only für Leadership, nicht für ICs sichtbar; nur abgeleitete Composites, keine Roh-Counts |

---

## 2026-05-09 — Modul 2: Use Cases & Personas

| Thema | Entscheidung | Begründung |
|---|---|---|
| **Primärer Champion** | Doppel-Champion: VPE (org-weit) + EM (single-team) | Gleiche Produkt-Engine, unterschiedliche Scope-Brille; vermeidet Persona-Sprawl bei breiter Nutzbarkeit |
| **HR-Stance Phase 1** | HR umgehen, Engineering-pure | Schnellerer Sale via VPE-Budget; Konsequenz: Compliance-Last tragen wir allein → "AI Risk Assessment Bundle" als Pre-Sales-Pflicht |
| **MVP Killer-Use-Cases** | Knowledge Discovery (T1), Bus-Factor-Audit (T1), Reorg-Simulation (T3) | Bookend-Strategie: Map + Decide in MVP, Pulse als Phase 2; Tier-2-Signale werden intern berechnet, aber nicht exposed |
| **Reorg-Simulation Positionierung** | "Advisory-only / no decisions" mit hartem Disclaimer | Tier-3-Compliance-Risiko (EU AI Act, EEOC) erfordert klare Framing-Grenzen vor GA |
| **Tier 2 (Pulse) Timing** | Phase 2, nicht im MVP | Bookends sind kohärentere MVP-Story; Pulse-Launch wird durch unter-der-Haube-Berechnung später günstig |

---

## 2026-05-09 — Modul 1: Vision & Positioning finalisiert

| Thema | Entscheidung | Begründung |
|---|---|---|
| **Working Name** | **Keystone** | Architektur-Metapher, Resilience-Bezug ("Schlussstein des Bogens"), eng-konnotiert, klar — Lattice ist verbrannt (HR-Tool) |
| **Pitch-Stil** | Hook (provokativ) + Subline (funktional) | C ist memorable+differenzierend, A erklärt Funktion; Kombi schlägt beide einzeln; klassisches Pitch-Deck-Cover-Pattern |
| **Mission Statement** | *"We help engineering leaders make people decisions with the same rigor they apply to architecture decisions."* | Evergreen, framt Eng-Leader-Selbstbild als Architekt |
| **Anti-Positioning** | Explizite NOT-Liste: kein Surveillance-Tool, kein HR-System, kein Productivity-Tracker, keine Hire/Fire-Automation, keine generische People-Suite | Klare Kategorie-Abgrenzung verhindert Positionierungs-Drift im GTM |
| **Manifest** | 6 Principles (Evidence, Resilience, Decisions-not-Verdicts, Transparency-Tiers, Auditable, Eng-native) | Treiben spätere Feature-Trade-offs und Brand-Konsistenz |
| **Brand Voice** | Confident, technical, defensiv positioniert; Eng-Vocabular | Vermeidet HR-Verwechslung, spricht Champion-Persona an |

---

## 2026-05-09 — Modul 6: Risiken & Compliance

| Thema | Entscheidung | Begründung |
|---|---|---|
| **Klassifizierung** | Wir akzeptieren explizit "high-risk AI system" Status (EU AI Act Annex III, CO AI Act) | Reorg-Sim trifft "essential terms of employment" — nicht wegdiskutierbar; lieber compliant bauen als rechtlich fechten |
| **Human-in-the-Loop** | Hart erzwungen (technisch, nicht nur UX) | Verteidigt "Decision Support, not Decision Automation"-Framing; keine Batch-APIs für Tier 3 |
| **Compliance-Pricing** | Trust Bundle als paid Enterprise-Feature | Pricing-Hebel statt Cost-Center; Compliance wird Differenzierungs-Moat vs. Jellyfish/Swarmia |
| **Demographics** | Production-side technisch geblockt; Audit-side isolierte Pipeline mit synth. Test-Sets | Sauberster Compliance-Stand + ermöglicht trotzdem Adverse-Impact-Tests |
| **EU AI Act** | Phase-2-ready bauen — Foundation-Anforderungen ab Tag 1 | Vermeidet teuren Phase-2-Refactor; AI-Act-Logik wird gleichzeitig Trust-Marker für US-Kunden |
| **Annual Bias Audit** | Public Report jährlich (NYC AEDT-Style) für alle Kunden, nicht nur NYC | Trust-Asset über Pflicht hinaus; differenziert vs. Wettbewerb |
| **Insurance** | E&O + Cyber Liability $10M+ vor Launch | Existenz-Schutz; Voraussetzung für Enterprise-Sales |
| **Audit-Log** | Append-only, unveränderbar, mit Modell-Version + Inputs + Justification | EU AI Act Art. 12 Pflicht + interne Forensik-Fähigkeit |

---

## 2026-05-09 — Modul 3: Metriken & Signale

| Thema | Entscheidung | Begründung |
|---|---|---|
| **Action-Type-Gewichte (TAS)** | Balanced: Doc 1.00, Code 0.85, Jira 0.65, PR-Review 0.50, Slack 0.20 | Vermeidet Code-Heavy-Bias gegen TLs/Architekten/EMs; fair für non-Code-Roles |
| **Topic Criticality (TC) v1** | Manual VPE-Flag im Onboarding (Top-10–20 Topics) | Simpel, transparent, auditierbar; Auto-Detection (Roadmap-/Traffic-basiert) als Phase-2-Evolution |
| **Confidence-Gate** | Hard Block unter Min-Confidence (technisch nicht abrufbar) | Schützt vor Fehlentscheidungen auf dünnem Datenboden; Compliance-Anker |
| **Min-Confidence-Schwellen** | TAS: Medium · BF/KCS: Medium · RRC: High (90d Daten, ≥3 Quellen, TC-Flags) | Tier-3-RRC braucht höhere Konfidenz wegen Decision-Impact |
| **Recency Decay** | Halbjährliche Halbwertszeit (configurable) | Balance zwischen "veraltet" und "Latent Authority" |
| **Substantive-Filter Slack** | >1 Satz; keine Reactions; LLM-klassifiziert | Anti-Gaming + Anti-Visibility-Bias |

---

## 2026-05-09 — Modul 4: Classifier & Datenmodell

| Thema | Entscheidung | Begründung |
|---|---|---|
| **Embedding-Modell** | OpenAI text-embedding-3-large als Default, OSS-Switch (BGE-M3) für Enterprise | Best quality time-to-market; OSS-Switch wird monetarisierbares Trust-Bundle-Feature für Data-Residency-Customers |
| **Embedding-Provider-Abstraction** | Pflicht — `EmbeddingProvider` Interface, kein Hard-Code | Ermöglicht Switch ohne Re-Build, Vendor-Risk-Mitigation |
| **Customer-Taxonomy-Editierbarkeit** | Continuous editierbar mit Versioning + Audit-Trail | Flexibilität für sich-ändernde Teams; Major-Changes erfordern Impact-Preview + Justification |
| **Code-Klassifikation** | Structural + Semantic Hybrid im MVP | Differenzierungs-Moat; naive Text-Embedding versteht Code-Semantik schwach; Bus-Factor-Präzision auf Tech-Topics nicht ohne |
| **MVP-Sprachen für Code-Analyse** | Python, TypeScript, Go, Java/Kotlin | Deckt ~90% Tech-Stacks im ICP ab |
| **Vector-Storage** | pgvector in tenant-isolated Postgres als Default | Simple Ops, Tenant-Isolation, Self-Host-ready; Weaviate Phase 2 wenn Volume sprengt |
| **Base-Taxonomy-Pflege** | Quarterly Updates, public versioned | Trust-Marker, ermöglicht externe Auditierung |
| **Tax-Versionierung** | Zwei Achsen: Taxonomy-Version + Classifier-Model-Version, beide semver | Re-Computability historischer Outputs für Audit-Pflicht |

---

## 2026-05-09 — Modul 7: Wettbewerb & Differenzierung

| Thema | Entscheidung | Begründung |
|---|---|---|
| **Kategorie-Strategie** | Hybrid: "Eng-Intelligence" als Discovery-Kategorie + scharfe Sub-Position als "Resilience" | Existierende Buyer-Awareness nutzen, scharf differenziert positionieren; Category-King-in-Niche-Pattern |
| **Marketing-Lead-Achsen (Top 3)** | (1) Resilience-Linse, (2) Reorg-Simulation, (3) Compliance-Moat | Brand-Anker + Demo-Killer + Closer; Engineering-native bleibt Sub-Message |
| **Primärer Threat** | Jellyfish | Geld+Kunden+Brand-Awareness; könnten 6–12 Mo Re-Brand zu Resilience |
| **Mitigations gegen Jellyfish** | Speed-to-Category + Compliance-Moat (12–24 Mo Lead) + Code-Hybrid-Tech + frühe Brand-Story | Hardest moats sind nicht single-feature, sondern Kombination |
| **Sekundärer Threat** | Faros AI (strukturell ähnlichste) | Sie sind Datenlayer; Compliance + Code-Hybrid + Brand-Position als Verteidigung |
| **Content-Strategie** | "State of Eng-Resilience"-Reports quartalsweise + Webinars + Education-Content | Sales-Cycle bei neuer Kategorie länger; Education-Material verpflichtend |

---

## 2026-05-09 — Modul 5: Technische Architektur

| Thema | Entscheidung | Begründung |
|---|---|---|
| **Makro-Architektur** | Drei Layer: Ingestion / Processing / Application | Klare Separation of Concerns; Independent scalability |
| **Tenancy-Modell** | Single-Tenant Data Plane + Multi-Tenant Control Plane | Per-Tenant-DB + KMS für alle Customers; HR-sensitive Daten erfordern Hard-Isolation |
| **Tenancy-Tier-Strategie** | Per-Tenant-DB für ALLE (kein Pooling) | Konsistente Compliance-Story; akzeptierte höhere initial Ops-Kosten |
| **Cloud-Strategie** | AWS-primary + Cloud-agnostic Abstraction | Target-ICP ist AWS; Terraform-IaC + Interfaces erlauben sp. GCP/Azure-Self-Host ohne Re-Architektur |
| **AWS-Code-Limit** | Max. ~5% Code AWS-spezifisch, hinter Interfaces | Self-Host-Pfad bleibt günstig erreichbar |
| **LLM-Provider-Strategie** | Anthropic primary (Reasoning) + OpenAI (Embeddings) + Multi-LLM-Router | Trust-Story-Alignment + Quality + Vendor-Hedge |
| **`LLMProvider`-Interface** | Pflicht ab Tag 1 | Switch-Fähigkeit für Cost-Optimization, Vendor-Wechsel, Self-Host |
| **Tiered-Model-Routing** | Haiku-Erstpass → Sonnet bei Low-Confidence → Human-Review-Queue | Cost-Optimierung ohne Quality-Loss bei Mehrheit der Activities |
| **Audit-Pipeline** | Postgres Append-Only + S3-Object-Lock-Mirror + Hash-Chain | WORM-Compliance + Tamper-Detection; 7-Jahre Retention; Auditor-RBAC |
| **Self-Host-Topologie** | Von Tag 1 mitgebaut, ab Phase 2 Enterprise verkauft | "Enterprise OSS-Switch" sonst hollow promise; Helm Chart + outbound-only |
| **Stack** | React/TS + NestJS + Python (ML) + Postgres+pgvector + Anthropic/OpenAI + Terraform + EKS | Pragmatische Standardwahl, gut hireable, gut auditierbar |

---

## 2026-05-09 — Modul 8: GTM, Pricing & Roadmap

| Thema | Entscheidung | Begründung |
|---|---|---|
| **Pricing-Modell** | Per-Engineer-per-Month + Modular Add-Ons (Map $25, +Decide $15, +Enterprise $15+) | Eng-Leadership-Standard; transparent; Tier-Up-Sell; Annual-Commit-Discount 15–20% |
| **Customer-Floor** | 50-Eng-Minimum | Per-Tenant-DB-COGS bei kleineren Customers nicht profitabel |
| **Sales Motion** | Top-Down dominiert + EM als Co-Champion enabled | VPE-Outbound, EM-Trial, Compliance-Bundle als Closer; Hybrid wirkt zur Persona-Hierarchie |
| **Free-Tier** | Nein — 30-Day Trial stattdessen, Sales-Engineer-led Onboarding | Eng-Pure-Stance + HR-sensitive Daten = Brand-Risk; Trial sichert Onboarding-Quality |
| **MVP-Build-Zeit** | 6 Monate (aggressiv) | Speed-to-Category gegen Jellyfish; akzeptiert Pre-SOC-2 für erste 5 Design Partners |
| **Design-Partner-Programm** | 5 Design Partners, 50% Discount, Pre-SOC-2-Risk-Acceptance, Co-Design-Privileg | Validiert MVP, generiert Case Studies, gibt Speed-Vorsprung |
| **SOC 2 Type I** | Month 9 (3 Mo post-Launch) | Realistisch für Compliance-Cycle; gating für Enterprise-Sales |
| **Trust Bundle v1 GA** | Month 9, parallel SOC 2 Type I | Up-Sell-Hebel für Enterprise; differenzierender Moat |
| **Public Bias Audit** | Month 12 (1 Jahr post-Build-Start) | NYC AEDT-Style; Trust-Marker für alle Customers |
| **Funding-Plan** | Seed $3–5M (vor Launch) → Series A $10–15M (end Y1) → Series B $25–40M (Y3) | Standard SaaS Fundraising-Pfad |
| **North-Star-Metrik** | Eng Seats Activated (Y1: 5k–10k) | Direkter Wert-Indikator; ARR folgt |
| **Counter-Metriken** | Customer Bias Audit Score (Disparate Impact 4/5 Rule für 100%); Customer NPS 40+ | Schutz vor Diskriminierungsmaschine; Quality-Indikator |
| **Wedge-Strategie** | Reorg-Sim Demo als Verkaufs-Wow + Bus-Factor-Audit als Lower-Friction-Alternative | Konkret + memorable; ROI-Calculator: "Wrong Senior-Layoff ≈ $300k" |

---

## 2026-05-09 — Critique-Synthese (Adopt + Refine + Park)

Nach Subagent-Critique (Contrarian + VC-Investor) und Consensus-Finder-Synthese: substantielle Adjustments. Vorherige Decisions, die ersetzt werden, sind als **SUPERSEDED** markiert (nicht gelöscht — Audit-Trail).

### Adopt (substantielle Änderungen)

| # | Thema | Neue Entscheidung | Supersedes | Begründung |
|---|---|---|---|---|
| **A1** | MVP-Scope | **Tier-1-First MVP** (Map + Bus-Factor only) | "MVP Killer-Use-Cases: Knowledge Discovery, Bus-Factor, Reorg-Sim" (2026-05-09 Modul 2) | Reorg-Sim aus MVP, weil 6-Mo-Scope inkompatibel mit Foundation-Liste (Contrarian #1) und Mobley-v.-Workday-Risiko (VC #2 Deal-Breaker) |
| **A2** | Reorg-Sim-Pfad | **Phase 2a: Reorg Discovery (no Score)** + **Phase 2b: Full RRC (post-Validierung)** | "Reorg-Simulation Positionierung: Advisory-only" (2026-05-09 Modul 2) | Aufgespalten: Topics-affected ohne Score reduziert Legal-Risiko massiv; Full RRC erst nach SOC 2 Type II + retrospektive Validierungsstudie |
| **A3** | Tenancy-Modell | **Tier-aware Tenancy: Pooled multi-tenant für Map (RLS+PT-AE), Per-Tenant DB für Decide+/Enterprise** | "Tenancy-Tier-Strategie: Per-Tenant-DB für ALLE" (2026-05-09 Modul 5) | Per-Tenant-DB für Map-Tier ist Margin-Trap (~$1k COGS vs. $1.25k MRR bei 50-Eng); konsistente Compliance-Story bleibt durch Tier-Differenzierung |
| **A4** | HR-Stance | **"Engineering-led, HR-co-signed"** + HR Read-only Default-Role + HR-Fast-Path-Artifact | "HR-Stance Phase 1: HR umgehen, Engineering-pure" (2026-05-09 Modul 2) | HR triggert Customer-Side Compliance-Review ohnehin; pre-empten statt umgehen reduziert Sales-Cycle-Friktion |
| **A5** | Team-Plan | **Modul 8 §8.10 NEU: Team & Hiring Plan** mit GTM-Co-Founder-Search, VPE-Advisor, Founding-Eng-Hires | (war Lücke) | VC #8: Pre-Seed/Seed nicht fundable ohne Team-Disclosure |
| **A6** | Kategorie-Strategie | **In Eng-Intelligence-Budget verkaufen + Resilience als Sub-Position/Brand** + Forcing-Function-Sektion | "Hybrid: Eng-Intelligence + scharfe Sub-Position als Resilience" (2026-05-09 Modul 7 — geschärft) | "Workforce Resilience" ist Positionierung, nicht Kategorie; Kategorie-Creation zu langsam für Seed-Stage |
| **A6b** | Wedge | **Bus-Factor-Audit als primärer Wedge** (statt Reorg-Sim) | "Wedge: Reorg-Sim Demo" (2026-05-09 Modul 8) | Folgt aus A1+A2; Bus-Factor-Demo ist niedrige Friktion, hoher Wow, kein Compliance-Trigger |

### Refine (Wording / Architektur-Sharpen)

| # | Thema | Refinement | Begründung |
|---|---|---|---|
| **R1** | Compliance-Positionierung | **Compliance ist Table-Stakes-Bundled + Speed-to-Procurement-Accelerator**, kein 24-Mo-Moat. **NEU primärer Moat: Customer-Taxonomy + HIL-Refinement Data Flywheel** | Compliance-Moat 12-24 Mo überschätzt (Contrarian #4, VC #5); echter Moat ist customer-spezifischer kompoundierter Wissensgraph |
| **R2** | Code-Hybrid MVP | **Reduziert auf 1 Anchor-Sprache (TypeScript)**; Multi-Language iterativ (Python Phase 1b, Go Phase 2a, Java/Kotlin Phase 2b) | 4-Sprachen-Hybrid für MVP zu teuer (Contrarian #7); ICP-Density bestimmt TypeScript-Anchor |
| **R3** | LLM-Provider-Default | **AWS Bedrock (Anthropic Claude + Cohere/Titan Embeddings)** als unified Trust Boundary; Direct-API als Fallback. **OSS-Switch-Quality-Gate** vor Enterprise-Sale | Anthropic+OpenAI-Direct widerspricht Trust-Story (Contrarian #6, VC #6); Bedrock = Daten bleiben in Customer-AWS-Region |
| **R4** | VPE-Onboarding-Time | **VPE-Time auf <10 Min reduziert; Staff/Principal Eng als Operator-Persona** | VPE hat keine Zeit für 30-Min-Refinement-Calls (Contrarian #8); UX umgebaut auf Operator/Approver-Trennung |
| **R5** | Demographics-Pipeline | **Production-Distribution Proxy-Bias-Monitor** explizit ergänzt zu synth. Test-Sets; Customer-Demographic-Audit als Opt-in Enterprise-Feature | Synth Test-Sets allein erkennen Proxy-Bias (Tenure, parental-leave-Gaps) nicht (Contrarian #10) |
| **R6** | Funding-Plan | **Seed-Runway 24 Monate** (statt 18); Y1-Targets als Min/Max-Range; Series A nicht zwingend Q4 Y1 | Y1 ARR-Plan nicht Series-A-fundable in 2026 (VC #4); längerer Runway erlaubt ARR-Build + NRR-Track-Record |

### Park / Reject

| # | Thema | Entscheidung | Begründung |
|---|---|---|---|
| **X1** | Macro-Timing-Brand-Reframe | **Reject** — Resilience-Brand bleibt | Kommunizierbarer Moat; "Confidence in Engineering Decisions" wäre Mush. **In open-questions als Watch-Item P3** (monatliches Layoffs.fyi-Tracking) |
| **X2** | Reorg-Sim als Acquirer-Poison-Pill | **Already addressed by A2** (Phase-2-Defer + "Reorg Discovery"-Reframe) | Mobley-Risiko massiv entschärft |

---

## Template für künftige Einträge

```
## YYYY-MM-DD — <Topic>

| Thema | Entscheidung | Begründung |
|---|---|---|
| ... | ... | ... |
```

```
## YYYY-MM-DD — <Topic>

| Thema | Entscheidung | Begründung |
|---|---|---|
| ... | ... | ... |
```
