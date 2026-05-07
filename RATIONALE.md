# Astrul — Design Rationale
**Team Astrul · S³C Design Competition 2026 · Track 2: App UI/UX Design**

---

## 0. The product in one sentence
Astrul reimagines the NUST Student Support Services Centre as a single calm surface where any student can submit, track, and resolve a campus issue — and where staff can triage, monitor SLAs and surface insights — without ever leaving the screen.

## 1. Research
We ran an informal survey across **41 NUST students** from SEECS, NBS, SMME and S3H. Three pain points dominated:
1. **Opacity** — once a complaint is filed, no one knows what is happening.
2. **Fragmentation** — Qalam, LMS and S³C live in disconnected silos.
3. **Friction fear** — students avoid official channels because past attempts stalled.

Astrul targets all three head-on through transparency primitives (lifecycle, SLA ring, AI-routed receipts), surface consolidation (Qalam + LMS folded into Home), and a 4-tap submission ceiling.

## 2. Key design decisions
- **Mobile-first phone canvas (390 × 844).** 76% of respondents said they'd use the portal exclusively on phone. Web is responsive scaling, not the primary surface.
- **Navy + white only.** A restrained palette respects NUST's institutional identity while feeling modern. Status colours are reserved exclusively for functional pills — never decoration — so "red" always means "attention needed".
- **≤ 4-tap submission.** Home → category → describe → review → done. The progress bar at the top reassures the user that the journey is finite.
- **SLA ring.** A single visual primitive (the colour-coded ring) communicates urgency on the home, list, detail and dashboard screens. One mental model, used everywhere.
- **One surface for academic life.** Qalam grades, LMS deadlines and class schedule appear inline on Home — not behind a tab — to discourage app-hopping.
- **Edge cases visible.** Resolved → 5★ feedback prompt. ≥ 80% SLA → escalation banner with callback promise. < 85% AI confidence → manual triage flag for staff.

## 3. Innovation hooks (the 15% Innovation criterion)
1. **AI Triage** — each request is auto-classified with a confidence score; ≥ 85% routes instantly, lower confidence is surfaced to a Navigator.
2. **Smart KB Suggestions** — contextual help articles appear while the student types, letting them self-serve without ever submitting.
3. **Predictive breach forecasting** — the Navigator's SLA monitor surfaces requests statistically likely to breach overnight.
4. **Smart notification grouping** — push events are bundled per request to prevent notification fatigue.
5. **Walk-in digitisation** — staff can ingest in-person interactions in < 30 seconds, so no student is left out of the digital record.

## 4. Accessibility & inclusion
Body type stays at **14 px or larger**; touch targets ≥ **44 px**. Colour is never the only signal — every status pill carries an icon and a label. Navy-800 on white = **13.4:1** contrast (WCAG AAA).

## 5. Offline & low-connectivity
The submit form is cached locally so a student in a hostel with patchy WiFi can compose offline and queue for sync. Loaders use shimmer skeletons instead of empty states, so the app never feels frozen.

## 6. Technical feasibility
Built on widely supported primitives — Next.js + React + Tailwind on the frontend, with mock data shaped to mirror the realistic backend contract (`ServiceRequest`, status enum, SLA timer, AI confidence). A development team can implement this verbatim against any REST or GraphQL backend.

## 7. AI disclosure
Per the rules: ChatGPT and Claude were used for ideation, copy polish, and to scaffold the Next.js prototype. All visual decisions, components and interaction logic are original work by Team Astrul.

---
**Live prototype:** see `LINK.txt` in the submission ZIP.
**Repository:** included in `astrul-s3c/` source folder.
