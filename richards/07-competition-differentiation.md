# Modul 7 — Wettbewerb & Differenzierung

**Status:** Draft v2 (post-Critique-Synthese)
**Letzter Stand:** 2026-05-09

---

## 7.1 Wettbewerbsfeld in vier Ringen

### Ring 1 — Direkte Konkurrenten (Engineering Intelligence)

| Player | Fokus | Stärken | Schwächen | Bedrohung |
|---|---|---|---|---|
| **Jellyfish** (Series C, ~$50M ARR, $130M+ raised) | Eng-Mgmt Platform, Allocation, Delivery | Enterprise-ready, Roadmap-Linkage, Board-Dashboards, CFO-friendly | Productivity-Linse, HR-Feeling, nicht LLM-native | 🟠 Hoch — könnten 9-Mo-Re-Brand zu Resilience machen |
| **Swarmia** (Series A, FI) | Eng-Effectiveness, DORA + DX | Modernes UI, Dev-Loved | Tight DORA-Fokus, kein People-Layer | 🟡 Mittel |
| **LinearB** (Series B, IL) | Dev-Productivity / Workflow | Workflow-Integration, Velocity | Kein Skill-Mapping | 🟡 Mittel |
| **Code Climate Velocity** | Eng-Insights | Etabliert | Wirkt 2018, schwach im LLM-Zeitalter | 🟢 Niedrig |
| **Pluralsight Flow** (ex GitPrime) | Dev-Productivity / Skills | Skills-Bibliothek | Markt-Position schwach | 🟢 Niedrig |
| **Faros AI** | Unified Eng-Data-Layer | Modernes Datenmodell | Plattform-y, weniger opinionated | 🟠 Strukturell ähnlichste |

### Ring 2 — Adjazent (HR-Side / People Analytics)

| Player | Fokus | Warum nicht direkt |
|---|---|---|
| Lattice | Performance Mgmt, OKRs | HR-Workflows, kein Eng-Datenfeed |
| Culture Amp / 15Five | Survey-basiert | Kein digitaler Footprint |
| Visier / OneModel | People Analytics | Nicht Eng-spezifisch; Visier 14yr-Burn-Reference |
| Workday Skills Cloud | HR-Skill-Graph | HR-derivat; **Mobley v. Workday legal precedent risk** |
| Eightfold AI / Gloat | Talent Intelligence, Mobility | Talent-Marketplace, nicht Resilience |

### Ring 3 — Adjazent (Skill / Knowledge Mapping)

- **Stack Overflow for Teams** — Internal Q&A
- **Sourcegraph** — Code Intelligence, Search-Angle
- **CodeSee** — Code Maps visuell, architektur-fokussiert
- **GitHub Copilot Workspaces** — emergent Code Intelligence

### Ring 4 — Indirekt (Survey / Manual)

- **DX (Abi Noda)** — DX Research + Surveys
- **Gallup Q12** — klassisches Engagement

---

## 7.2 Defensible Differenzierungs-Achsen (post-Critique reframed)

| # | Achse | Defensiblity | Easy-to-Copy | Kommunizierbar | Use |
|---|---|---|---|---|---|
| 1 | **Resilience-Linse** (vs. Productivity) | ⭐⭐⭐⭐ | Mittel | ⭐⭐⭐⭐⭐ | **Lead-Achse (Brand)** |
| 2 | **Customer-Taxonomy + HIL-Refinement Data Flywheel** *(NEU)* | ⭐⭐⭐⭐⭐ | Sehr hoch (compounds über Customer-Lifetime) | ⭐⭐⭐ | **Echter Long-Term-Moat** |
| 3 | Engineering-native Datenmodell (vs. HR) | ⭐⭐⭐ | Niedrig | ⭐⭐⭐⭐ | Sub-Message |
| 4 | Topic-Map Tiefe via Hybrid Classifier | ⭐⭐⭐⭐ | Hoch initial | ⭐⭐⭐ | Tech-Moat |
| 5 | Code Structural+Semantic Hybrid (1 Anchor-Sprache MVP) | ⭐⭐⭐⭐ | Hoch | ⭐⭐ (zu technisch) | Tech-Moat |
| 6 | **Compliance — Speed-to-Procurement** *(reframed)* | ⭐⭐ als "Moat" / ⭐⭐⭐⭐ als "Deal-Accelerator" | Mittel | ⭐⭐⭐⭐ | **Procurement-Hebel, nicht Premium-Tier** |
| 7 | LLM-native, 2026-Stack | ⭐⭐ (verflüchtigt) | Hoch initial, niedrig in 2J | ⭐⭐⭐ | Time-window |

### 7.2.1 Compliance-Reframe (post-Critique)

**Vorherige Position (verworfen):** Compliance als 12–24-Mo-Moat, monetisiert als paid Trust Bundle Enterprise-Tier.

**Neue Position:** Compliance ist **Table-Stakes-Bundled + Speed-to-Procurement-Accelerator.**

- **Was bleibt enthalten in alle Tiers:** Hard HIL, Audit Log, Disclaimer Layer, Demographics-Production-Block, Bias-Audit-Continuous, AI AUP.
- **Wofür Customer extra zahlt im Trust Bundle Enterprise:**
  - Pre-filled Vendor Security Questionnaires (VSQ) — *bezahlt für Speed*
  - Pre-filled DPIA / TIA Templates — *bezahlt für Procurement-Time-Savings*
  - 3rd-Party Auditor Letter
  - Self-Host-Option / OSS-Switch
  - Quarterly Customer-spezifischer Bias-Report
- **Effekt:** Compliance ist nicht der Moat — sie ist die Eintrittskarte. **Echter Moat = Data Flywheel** (siehe 7.2.2).

### 7.2.2 Customer-Taxonomy + HIL-Refinement Data Flywheel (NEU — primärer Moat)

Die *eigentliche* Defensibility kommt nicht aus Compliance, sondern aus dem **kompoundierten Customer-spezifischen Wissensgraphen**:

```
Customer onboardet (Tag 0):     Base + Cluster-Naming → 60% Genauigkeit
Customer-VPE refines (Tag 7):   + Manual TC-Flags    → 75% Genauigkeit
Continuous HIL-Feedback:        + Mis-Class-Reports  → 85% nach 90 Tagen
+ 18 Monate HIL-Refinement:                          → 92% Genauigkeit + reichste Topic-Hierarchie
```

**Konsequenzen:**
- Switching-Cost steigt mit Customer-Lifetime (Customer verliert ihren refined Wissensgraphen bei Wechsel)
- **NRR-Treiber:** je länger Customer, desto wertvoller das Tool für sie
- Konkurrent (auch Jellyfish) müsste 12–24 Monate HIL-Refinement-Daten *pro Customer* aufbauen, nicht ein zentrales Modell
- Cross-Customer-Anonymized-Benchmarks (Phase 2) sind echter Datenmoat

Das ist ein klassischer SaaS-Moat (analog Salesforce-Customizations, HubSpot-Lists), nur stärker weil tieferes Customer-Asset.

## 7.3 Marketing-Lead-Achsen (post-Critique adjustiert)

| Rang | Achse | Rolle | Beispiel-Hook |
|---|---|---|---|
| 1 | **Resilience-Linse** | Brand-Anker — wiederkehrend in jedem Asset | *"Productivity is dead. Resilience is the new metric."* |
| 2 | **Bus-Factor-Audit (Killer-Feature MVP)** *(geändert von Reorg-Sim)* | Demo-Moment — niedrige Friktion, hoher Wow | *"Here are your 12 SPOFs. 4 of them you didn't know about."* |
| 3 | **Procurement-Speed (statt "Compliance-Moat")** | Closer — *"From handshake to SaaS in 30 days, not 90"* | Pre-filled VSQ-Bundle-Demo |
| 4 *(Phase 2)* | Reorg Discovery | Up-Sell-Hook | *"See which initiatives are exposed when X moves teams"* |

*Engineering-native* + *Data Flywheel* sind Sub-Messages und Vocabulary-Schicht, kein eigenständiger Lead-Hook.

## 7.4 Kategorie-Strategie (post-Critique geschärft)

**Position:** Wir verkaufen *in der Engineering-Intelligence-Budget-Kategorie* (existierende Buyer-Awareness, vorhandene Budget-Codes), und nutzen "Resilience" als **Brand-Differenzierung + Sub-Position** *innerhalb* der Kategorie.

| Aspekt | Approach |
|---|---|
| SEO / Outbound-Suche | **Eng-Intelligence-Begriffe** (CTOs suchen so, Procurement hat Budget-Code) |
| Brand / Differenzierung | "We're not Productivity. We're Resilience." |
| Sales-Pitch | *"We're in the engineering-intelligence category, but we solve a different problem within it."* |
| Content | Eng-Resilience-Reports — als **Brand-Halo, nicht Category-Creation-Bet** |

**Strategischer Effekt:** Existierende Buyer-Awareness, scharf differenziert positioniert — Category-King-in-Niche-Pattern. Kein Versuch, neue Kategorie zu erfinden (zu langsam für Seed-Stage).

## 7.5 Forcing Functions — was treibt Buying-Action? (NEU)

Konkrete Trigger, die "Workforce Resilience" aus thought-leadership in Procurement-Action verwandeln:

| Forcing Function | Mechanik | Status |
|---|---|---|
| **Colorado AI Act Reporting (Feb 2026)** | "Consequential decisions" reporting requires audit trails — Customer braucht Tool das genau dokumentiert | 🔴 Aktiv |
| **NYC Local Law 144 (AEDT)** | Annual public bias audit Pflicht für AI in employment decisions | 🔴 Aktiv |
| **Layoff-Wave-Trigger** | Real-time Customer-Pain bei Reorg/Layoff-Event | 🟠 Wellenartig |
| **Post-M&A-Integration** | Acquirer braucht klare Org-Map des Acquired Eng-Team | 🟠 Event-driven |
| **Hyper-Growth-Onboarding-Wall** | Wenn 50→200 Eng in 12 Mo = Knowledge fragmentiert | 🟠 Event-driven |
| **Anschluss-State-Laws (TX TRAIGA, IL HB 3773, CA SB-7)** | Compliance-Druck-Welle 2026–2027 | 🟡 Wachsend |
| **Quarterly Board-Reporting** | CTO/VPE muss "Eng-Resilience" als Metrik berichten — Tool liefert die Zahl | 🟡 Wachsend |

**GTM-Implikation:** Outbound-Targeting nutzt diese Trigger als Signale (Layoff-News, M&A-Announcements, Hyper-Growth-Funding-Rounds, AI-Compliance-Job-Postings als Buying-Indicator).

## 7.6 Primäre Bedrohung & Mitigation (post-Critique adjustiert)

**Top-Bedrohung: Jellyfish.**

| Mitigation | Begründung |
|---|---|
| **Speed-to-Category** | "Resilience" claimen bevor Jellyfish 6–12 Mo Re-Brand machen kann |
| **Data Flywheel aufbauen** *(neuer primärer Moat)* | Customer-Taxonomy + HIL-Refinement compounds über Customer-Lifetime |
| **Procurement-Speed als Deal-Accelerator** | Pre-filled VSQ + DPIA als Differenzierungs-Wedge |
| **Code-Hybrid-Tech (1 Anchor-Sprache MVP)** | Jellyfish hat naive Embedding/keine strukturelle Code-Klassifikation |
| **Brand-Story früh & scharf** | Founder-Voice, Eng-Resilience-Manifest, public-facing Bias-Audits |

**Sekundäre Bedrohungen:**

| Bedrohung | Wahrscheinlichkeit | Reaktion |
|---|---|---|
| **Faros AI** baut opinionated Product | Mittel | Data Flywheel + Code-Hybrid + Brand vorne |
| **Microsoft/GitHub** baut nativ | Niedrig (politisch riskant) | Multi-Source-Story; EU-AI-Act-Compliance; Eng-Centric Brand |
| **Eightfold/Gloat** expandiert | Niedrig–Mittel | HR-DNA-Mismatch, hart zu Eng-native zu pivoten |
| **OpenAI/Anthropic** First-Party | Sehr niedrig | Sie verkaufen Plattformen, nicht Vertikal-Apps |

## 7.7 Honest Risk: Markt-Existenz (post-Critique)

| Pro Kategorie | Contra Kategorie |
|---|---|
| Macro-Klima: viele Layoffs, "false-fire"-Stories | Markt kennt Pain noch nicht als Resilience-Problem |
| Roadmap-Risk im Tech stark gefühlt | Buyer kennt Solution-Kategorie nicht, sucht nicht aktiv |
| Compliance-Wave (CO AI Act, NYC AEDT) erzwingt Audit-Tools | Buyer denkt nicht "ich brauche AI-Audit" |
| **Wir verkaufen in Eng-Intelligence-Budget, nicht in neuer Kategorie** *(geändert)* | Resilience-Brand muss in Sales-Pitch sofort verständlich sein, sonst Category-Erklärung-Burden |

**Konsequenz:** Sales-Cycle ähnlich Standard-Eng-Tools (3–6 Mo), *nicht* Category-Creation-Cycle. Education-Content als Brand-Halo, nicht GTM-Voraussetzung. Macro-Timing-Watch (siehe open-questions).

## 7.8 Strategische Implikationen für andere Module

- **Modul 8 (GTM/Pricing):** Bus-Factor-Audit als primärer Demo-Wedge (geändert); Trust Bundle als Procurement-Accelerator (statt Compliance-Moat); Pricing schärfen
- **Modul 1 (Vision):** Manifest + Brand-Voice tragen Resilience-Position (bereits konsistent)
- **Modul 2 (Personas):** Sales-Cycle-Länge (3–6 Mo) → Education-Content für VPE-Champions; CTO-Sponsor-Tier-Material
- **Modul 4 (Classifier):** Data-Flywheel als Moat → HIL-Refinement-UX und Mis-Classification-Loop kritisch

---

## Brainstorming-Notizen

*(in folgenden Sessions ergänzen — z.B. Wettbewerbs-Feature-Matrix vs. Jellyfish/Swarmia, "State of Eng-Resilience"-Report-Konzept)*

## Critique-Notizen (post-Synthese)

- Contrarian #4 + #9 + VC #1 + #5 hatten konvergente Treffer auf "Compliance ist nicht echter Moat" + "Resilience ist Positionierung, nicht Kategorie"
- Reframes: §7.2 (Compliance reframed; Data Flywheel als neuer primärer Moat); §7.4 (Kategorie-Strategie geschärft auf "in Eng-Intelligence-Budget verkaufen"); §7.5 NEU (Forcing Functions)
- Resilience-Brand bleibt (X1 Reject — siehe decisions-log)
