# Modul 6 — Risiken & Compliance

**Status:** Draft v2 (post-Critique-Synthese)
**Letzter Stand:** 2026-05-09

---

## 6.1 Juristische Grundprämisse

**Keystone IST ein "high-risk AI system"** — sowohl unter EU AI Act (Annex III: "Employment, workers management — decisions affecting essential terms of an employment relationship; allocation of tasks") als auch unter Colorado AI Act (Feb 2026 in Kraft).

Unser **"Advisory-only / Decision Support, not Decision Automation"**-Framing ist der juristische tragende Pfeiler. Die Produktarchitektur muss diesen Claim technisch verteidigen — nicht nur in AGB.

## 6.2 Regulatorische Landschaft (US-first, EU Phase 2)

| Ebene | Regelwerk | Kern-Anforderung an Keystone | Status |
|---|---|---|---|
| **US Federal** | EEOC Technical Assistance (2023) | Disparate-Impact-Schutz | Aktiv enforced |
| **US Federal** | NIST AI RMF | Voluntary best practice, de-facto B2B-Erwartung | Pflicht-de-facto |
| **US Federal** | OFCCP (bei Federal-Contractor-Customers) | Adverse Impact Analysis | Selektiv |
| **US State** | **Colorado AI Act (Feb 2026)** | High-risk: Risk Mgmt Program, Impact Assessments, Notice an Personen | **Bindend ab Feb 2026** |
| **US State** | **NYC Local Law 144 (AEDT)** | Jährliches Bias-Audit, Public Report | Bindend |
| **US State** | Illinois HB 3773 (2024) | Notice + Bias-Audits für Eng-Decisions | Bindend |
| **US State** | Texas TRAIGA, weitere ~15 States in Bewegung | Monitoring + Adaptionsbereitschaft | Watch |
| **EU** *(Phase 2)* | **EU AI Act (High-Risk, Annex III)** | Conformity Assessment, Logging, Human Oversight, EU DB Registration | **Aug 2026 verpflichtend** |
| **EU** *(Phase 2)* | GDPR Art. 22 | Schutz vor automatisierten Einzelentscheidungen | Bindend |
| **B2B Standard** | SOC 2 Type II, ISO 42001 | Trust-Asset, Pre-Sales-Pflicht | Tablestakes |

## 6.3 Risiko-Matrix

| # | Risiko | Wahrscheinlichkeit | Impact | Priorität |
|---|---|---|---|---|
| R1 | Diskriminierungsklage gegen Kunden, Keystone als Mit-Beklagte | Mittel | Existenzbedrohend | 🔴 Kritisch |
| R2 | Bias in Reorg-Sim-Output (Demographics) | Hoch wenn nicht aktiv mitigiert | Hoch | 🔴 Kritisch |
| R3 | Datenleck (HR-relevant + Engineering-IP) | Niedrig–Mittel | Existenzbedrohend | 🟠 Hoch |
| R4 | "Surveillance"-PR-Backlash | Mittel | Hoch | 🟠 Hoch |
| R5 | LLM-Halluzination im Audit-Trail | Mittel | Hoch (zerstört Trust) | 🟠 Hoch |
| R6 | EU AI Act Non-Compliance bei Markteintritt | Sicher wenn nicht vorbereitet | Hoch | 🟡 Mittel (Phase 2) |
| R7 | Goodhart Gaming | Mittel | Niedrig–Mittel | 🟡 Mittel |
| R8 | Customer-Legal blockiert Deal | Hoch ohne Pre-Sales-Asset | Mittel | 🟡 Mittel |

## 6.4 Mitigations-Architektur — 5 Säulen

### Säule 1 — Product-Level Hardening

| Mechanik | Implementierung |
|---|---|
| **Hard human-in-the-loop** | Tier-3-Outputs technisch *nicht* batch-verarbeitbar; mandatorische Confirmation-Click + Justification-Field; keine Batch-API für Personalentscheidungen |
| **Disclaimer Layer** | Jedes Tier-3-Artifact trägt "Decision Support — not a Decision" Wasserzeichen + Audit-Stamp |
| **Demographics-Blindness (production)** | Produktionsmodelle haben *keinen* Zugriff auf protected attributes (Alter, Geschlecht, Ethnie, Familienstand, Schwangerschaft, Disability-Status) — auch nicht indirekt über Proxies |
| **Geofencing** | Tier-3-Features mit jurisdictional gates (z.B. Reorg-Sim löst in CO/NYC zusätzlichen Disclosure-Flow aus) |
| **Audit-Stamping** | Jeder Output unveränderbar mit Modell-Version, Input-Snapshot, Timestamp, User, Justification gespeichert |

### Säule 2 — Bias-Testing-Pipeline (built-in, post-Critique gehärtet)

**Architektur-Prinzip:** *Production-side demographics-blocked, audit-side hermetisch isoliert + Production-Distribution Proxy-Bias-Monitor.*

**Wichtige Klarstellung (post-Critique):** Demographics-Blocking auf Produktions-Seite reicht *nicht* — Modelle absorbieren Proxies (Tenure, Time-Zone, Language-Register, parental-leave-Aktivitäts-Gaps), die disparate Impact in Real-Customer-Distributionen erzeugen. Daher dreischichtige Bias-Testing-Pipeline:

| Schicht | Cadence | Inhalt |
|---|---|---|
| **Pre-Deployment** | Per Modell-Release | Adverse-Impact-Test gegen **synthetisches Test-Set** (4/5ths-Rule, Demographic Parity, Equal Opportunity) |
| **Continuous (Production-Distribution)** | Monatlich | **Proxy-Bias-Monitor auf realer Customer-Activity-Distribution** (audit-side isoliert): erkennt Korrelationen zwischen Composites und Proxy-Demographic-Patterns (z.B. plötzliche Aktivitäts-Drops als Eltern-Leave-Proxy) |
| **Customer-Demographic-Audit** *(Opt-in, Enterprise)* | Quartalsweise | Customer liefert anonymisierte Demographic-Daten unter strict Legal-Firewall + separate KMS, ausschließlich für Audit-Pipeline; **Daten kehren niemals in Production-Modell zurück** |
| **Annual Public** | Jährlich | Öffentliches Bias-Audit (NYC AEDT-Style) für alle Customers |

### Säule 3 — Audit & Documentation

- **Decision Log:** unveränderbares Append-Log aller Tier-3-Outputs (Modell-Version, Inputs, User, Justification)
- **Model Cards:** für jedes Modell publiziert (NIST AI RMF Style)
- **Impact Assessments:** Auto-Filled-Templates für Kunden (DPIA, EU AIA Conformity, US Bias Impact Assessment)
- **Versioned Taxonomy:** Classifier-Versionen + Customer-Fine-Tunings traceable

### Säule 4 — "Keystone Trust Bundle" (Pricing-Hebel statt Cost-Center)

**Strategische Wendung:** Compliance ist Differenzierungs-Moat. Konkurrenten (Jellyfish, Swarmia) sind Productivity-Tools ohne diese Last. Wir verkaufen Compliance als Enterprise-Feature.

**Trust Bundle (Enterprise Tier):**
- AI Risk Assessment Template (auto-filled mit Customer-Setup)
- DPIA / TIA Templates (US + EU)
- Quarterly Bias Audit Report (Customer-spezifisch)
- Annual Public Bias Audit (geteilt über alle Kunden)
- Model Cards + Lineage
- 3rd-Party Auditor Letter
- Pre-Sales: Vendor Security Questionnaire (VSQ) Auto-Antwort-Bundle

**Trust Basics (alle Tiers — inkludiert):**
- Decision Log
- Disclaimer Layer
- Production-side Demographics-Blindness
- Hard HIL Enforcement

### Säule 5 — Insurance & Contractual

- **E&O Insurance + Cyber Liability:** $10M+ vor Launch
- **DPA-Templates** (US + GDPR-konform) als Standard
- **AI-spezifische Indemnification:** *limitiert* — kein "blanket hold harmless"; abgegrenzt auf Keystone-bedingte Defekte (nicht Customer-Misuse)
- **Limitation of Liability:** Keystone ist Tool, nicht Entscheider — Kontraktuell festgeschrieben
- **Customer Acceptable Use Policy:** verbietet z.B. Auto-Decisioning, Repurposing für Recruiting/Hiring (out of scope), Disclosure an non-authorized parties

## 6.5 EU AI Act — Phase-2-Readiness (Foundation-Anforderungen ab Tag 1)

Damit der EU-Markteintritt 2027/28 keinen Re-Build erfordert, bauen wir folgende Anforderungen von Anfang an:

| AI-Act-Anforderung | Foundation-Implementierung |
|---|---|
| Risk Management System (Art. 9) | Internes Risk-Register + quartalsweise Reviews |
| Data Governance (Art. 10) | Versionierte Datenkataloge, Provenance-Tracking |
| Technical Documentation (Art. 11) | Model Cards + System Cards Pflicht |
| Logging (Art. 12) | Append-only Audit Log (siehe Säule 3) |
| Transparency (Art. 13) | Disclaimer Layer + User-facing Explanations |
| Human Oversight (Art. 14) | Hard HIL (siehe Säule 1) |
| Accuracy & Robustness (Art. 15) | Pre-deployment + Continuous Bias-Pipeline |
| Quality Mgmt System (Art. 17) | ISO 42001-aligned QMS aufbauen |

## 6.6 Worst-Case-Playbook

| Szenario | Sofort (24h) | Kurzfrist (7 Tage) | Mittelfrist |
|---|---|---|---|
| Diskriminierungsklage gegen Kunde | Audit-Log freigeben, anwaltlicher Support | Bias-Audit Deep-Dive auf Modell + Customer-Setup | ggf. Modell-Recall, Public Statement |
| Datenleck | IRP Stage 1, alle Kunden binnen 24h informieren | Forensic + Regulator-Filing (varies per State) | Customer Restitution, Trust Rebuild Tour |
| PR-Storm "Surveillance" | Pre-prepared Statement, Founder-Voice | Transparency Report veröffentlichen | Externe Audit-Validierung als Trust-Marker |
| LLM-Halluzination in Audit-Output | Output recall, model rollback | Root Cause + öffentliche Disclosure | Halluzinations-Detector als ständiger Layer |

## 6.7 Strategische Implikationen für andere Module

- **Modul 5 (Tech-Architektur):** Audit-Log + Demographics-Blindness + Geofencing + HIL-Enforcement müssen Foundation sein, nicht Add-on
- **Modul 8 (GTM/Pricing):** Trust Bundle = paid Enterprise-Feature; differenziert vs. Wettbewerb
- **Modul 4 (Classifier):** Versionierung hart enforced; Re-Klassifikation bei Taxonomie-Änderung; Audit-Trail für jede Klassifikation
- **Modul 3 (Metriken):** Composite-Metriken müssen Adverse-Impact-tested sein vor Release
- **Modul 7 (Wettbewerb):** Compliance-Reife als Differenzierungs-Achse explizit positionieren

## 6.8 Pre-Launch Compliance-Checkliste

- [ ] SOC 2 Type I (vor erstem Paying Customer)
- [ ] SOC 2 Type II (innerhalb 12 Monaten nach Launch)
- [ ] E&O + Cyber Liability Insurance
- [ ] AI Acceptable Use Policy
- [ ] DPA-Templates (US + GDPR)
- [ ] First Public Bias Audit Report
- [ ] NIST AI RMF Profile dokumentiert
- [ ] Model Cards für alle Live-Modelle
- [ ] Customer Trust Bundle v1
- [ ] Internal IRP (Incident Response Plan)
- [ ] Employee AI Training Track

---

## Brainstorming-Notizen

*(in folgenden Sessions ergänzen)*
