# Modul 2 — Use Cases & Personas

**Status:** Draft v2 (post-Critique-Synthese)
**Letzter Stand:** 2026-05-09

---

## 2.1 Persona-Hierarchie

| Rolle | Funktion im Sale | Scope | Rolle im Produkt |
|---|---|---|---|
| **VPE (Vice President Engineering)** | **Champion + Approver (Tier 3)** | Cross-Team / Org-weit | Budget; bestätigt Output, low-touch Operator (<10 Min Onboarding) |
| **EM (Engineering Manager)** | **Co-Champion + Daily User** | Single-Team | Tier-1-Map täglich; Tier-2 Pulse (Phase 2) |
| **Staff / Principal Engineer** | **Operator + Power User** | Topic / Cross-Team | Onboarding-Refinement, Taxonomy-Pflege, Tier-1-Tiefenanalyse |
| CTO | Economic Buyer / Sponsor | Org-weit | Strategischer Sponsor, ROI-Validator |
| **HRBP Tech** | **Co-Signer (NEU — siehe 2.2)** | — | Read-only-Default-Role; HR-Fast-Path-Artifact ans Customer-Legal |
| Chief of Staff Eng | Power User Tier 3 (Phase 2) | Org-weit | Reorg Discovery / Reorg-Sim Operator |
| People Ops / Legal | Compliance-Gatekeeper | — | Pre-Sale Compliance-Bundle löst Block sonst aus |

**Strategische Implikation:** Champion-Layer ist VPE (Budget) + EM (Daily Use). **Operator-Layer** ist Staff/Principal Eng (taxonomic Pflege, Refinement). Diese Trennung löst die VPE-Time-Required-Friktion: VPE ist Approver in <10 Min, nicht Konfigurations-Operator.

## 2.2 HR-Stance — "Engineering-led, HR-co-signed" (geändert)

**Vorherige Position (verworfen):** "HR umgehen, Engineering-pure" — internally inconsistent mit High-Risk-AI-System-Klassifikation; Customer-Legal triggert HR-Review ohnehin.

**Neue Position:** **Engineering-led, HR-co-signed.**

| Aspekt | Setup |
|---|---|
| Primärer Sale | VPE/CTO (unverändert) |
| HR-Rolle im Customer | Co-Signer am Vertrag, nicht Buyer |
| Standard-RBAC | HR Read-only-Default-Rolle in jedem Customer-Tenant |
| Pre-Sales-Asset | **HR-Fast-Path-Artifact (1-Pager)** — adressiert HR-Bedenken in 5 Min Lesezeit; Teil von Trust Bundle |
| Tier-3-Outputs | HR sieht aggregierte Risk-Maps (Read), aber NICHT Personen-spezifische Tier-3-Decisions ohne explizite Manager-Freigabe |

**Effekt:** Sales-Cycle-Friktion reduziert (HR triggert nicht spät), aber Brand bleibt Engineering-zentriert. Kein HR-Workflow im Produkt.

## 2.3 Pain-Map

### VPE — Pain (org-weit)
- "Ich habe 80–500 Engineers, ich kenne nicht mehr alle persönlich"
- "Ich weiß nicht, ob mein Q3-Plan realistisch ist — wer kann das überhaupt liefern?"
- "Wenn X kündigt, was bricht weg?"
- "Mein CTO fragt, wo wir sparen können — ich rate"
- "Bei Reorgs brauche ich Stunden in Spreadsheets, nicht Tage"

### EM — Pain (single-team)
- "Mein neuer Joiner braucht 6 Wochen, bis er weiß, wen er fragen kann"
- "Mein Team hat 4 SPOFs, ich erkenne nur 2 davon"
- "Mein Sprint-Plan ist optimistisch, weil ich Capacity nicht echt sehe"

### Staff/Principal Eng — Pain (Operator-Layer)
- "Ich werde ständig gefragt 'wer kennt sich mit X aus?' — ich rate auch nur"
- "Onboarding-Buddy-Matching ist Bauchgefühl"

### Gemeinsame Jobs to be Done
- *"Hilf mir, mein Team zu verstehen, ohne 1:1s zu skalieren"*
- *"Hilf mir, Bauchgefühl durch Daten zu validieren"*
- *"Hilf mir, ruhig schlafen zu können bei Personalbewegungen"*

## 2.4 Use Cases pro Tier

### Tier 1 — Map (MVP — Bookend reduziert auf Tier 1)
1. **Bus-Factor-Audit** — SPOFs sichtbar machen vor Personal-Cycles — **PRIMÄRER WEDGE (geändert)**
2. **Knowledge Discovery** — "Wer kennt sich mit X aus?" — sekundärer Hook
3. *(später)* Skill-Gap für Hiring-Plan
4. *(später)* Onboarding-Buddy-Matching

### Tier 2 — Pulse (Phase 2)
5. Burnout-Frühwarnung (anomale Aktivitätsmuster)
6. Sprint-Realismus-Check (Capacity vs. Plan)
7. Cross-Team-Collaboration-Health
8. Team-Health-Trend über Quartale

### Tier 3 — Decide (Phase 2 — NICHT mehr im MVP)

**Phase 2a (Month 9–12):** **Reorg Discovery**
- Surfaces *welche Topics & Initiativen exposed sind* bei Personal-Wegfall
- KEIN composite RRC-Score, KEIN numerisches Output mit Confidence-Interval
- Reduziert Mobley-v.-Workday-style Risiko massiv

**Phase 2b (Month 12–18, post-SOC-2-Type-II):** **Reorg-Simulation (full RRC)**
- RRC-Score, Roadmap-Impact, Confidence-Intervals
- Erfordert vollständig validiertes Bias-Framework + 6-Mo-retrospektive Studie auf Design-Partner-Daten

**Phase 3:**
- Retention-Risk-Scoring
- Promotion-Kandidaten-Screening
- Layoff-Impact-Analyse (defensiv)

## 2.5 MVP-Scope-Konsequenzen (geändert)

- **Bookend-Strategie verworfen.** MVP ist jetzt **Tier-1-First**: Map + Bus-Factor-Audit als kompletter Wedge.
- **Reorg-Sim wandert in Phase 2** (siehe Modul 8 Roadmap-Update).
- **Wedge-Demo ist Bus-Factor-Audit:** *"Hier sind deine 12 SPOFs. Davon waren 4 dir nicht bewusst."* — niedrige Friktion, Demo-fähig in 30 Sekunden, kein Compliance-Trigger.
- **Pulse-Signale werden weiterhin unter-der-Haube berechnet** (für Phase-2-Reorg-Discovery), nur nicht exposed.
- **Compliance-Last reduziert:** ohne Tier-3 im MVP entfällt der Reorg-Sim-Demo-Killer-Trap. Compliance-Foundation bleibt aber aufgebaut (für Phase 2 Tier 3).

## 2.6 Anti-Use-Cases (was wir bewusst NICHT machen)

- Echtzeit-Surveillance einzelner Mitarbeiter
- Automatische "Fire / Promote / Hire"-Empfehlungen ohne Human-in-the-Loop
- 1:1-Vergleichs-Rankings für ICs
- IC-sichtbare Tier-3-Outputs
- HR-Workflows (PIPs, Comp-Reviews, Performance-Calibration) — Engineering-led, nicht HR-System
- **Numerische "Replaceability Scores" für Personen vor SOC 2 Type II + retrospektive Bias-Validierung**

## 2.7 Pitfalls (Modul-spezifisch, post-Critique)

| Pitfall | Mitigation |
|---|---|
| Persona-Sprawl → Feature-Bloat | Champion+Operator-Trennung diszipliniert; jedes Feature gegen VPE-Approver / EM-Daily / Staff-Operator JTBD prüfen |
| EM fühlt sich überwacht → Adoption-Blockade | EM als *Co-Champion* framen, nicht als Beobachtungsobjekt; transparente Tier-1-Outputs |
| HR-Verwechslung trotz Co-Sign-Path | Klares "Engineering-native"-Branding; HR-Fast-Path-Artifact ist Zugeständnis, nicht Übernahme |
| Bus-Factor-Audit als "Productivity-Tool" missverstanden | Resilience-Framing in Demo; SPOFs als *strukturelles* Risiko zeigen, nicht als IC-Performance |
| VPE-Time-Required > 10 Min | Onboarding strikt auf <10 Min VPE-Touch designt; Staff/Principal automatisiert Rest |
| Reorg-Discovery wird trotzdem als "Layoff-Tool" angegriffen | Explizites "Topics-not-Persons"-Output-Format; PR-Statement-Kit pre-baked |

---

## Brainstorming-Notizen

*(in folgenden Sessions ergänzen)*

## Critique-Notizen (post-Synthese)

- Contrarian #2 + #8 sowie VC #2 hatten klare Treffer auf HR-Stance, Reorg-Sim-MVP, VPE-Operator-Konflikt → in Sektionen 2.1, 2.2, 2.4, 2.5 verarbeitet.
- Reorg-Sim wandert nicht ersatzlos raus — wird in Phase 2 als "Reorg Discovery" (ohne RRC-Score) wieder aufgenommen, full RRC erst Phase 2b post-Validierung.
