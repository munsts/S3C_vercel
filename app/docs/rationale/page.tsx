export default function Rationale() {
  return (
    <article className="max-w-3xl mx-auto px-6 lg:px-10 py-14">
      <header className="mb-10">
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted">Design rationale</div>
        <h1 className="font-display text-[34px] font-semibold tracking-tight text-navy-900 mt-1">Why the portal looks and behaves this way</h1>
      </header>

      <div className="space-y-7 text-[14.5px] leading-[1.75] text-navy-900">
        <p>The portal collapses what is currently a fragmented complaint process — office visits, email chains, phone calls across eight directorates — into one screen. The first design constraint was therefore restraint: nothing on the surface that does not earn its place.</p>

        <h2 className="font-display text-[20px] font-semibold text-navy-900 mt-10 mb-3">1. Research</h2>
        <p>An informal survey of 41 students across SEECS, NBS, SMME and S3H surfaced three recurring frustrations: opacity (no visibility into a request after it is filed), fragmentation (Qalam, LMS and S³C all live in disconnected silos), and friction fear (past attempts at official channels stalled, so students stop trying). Every screen in the portal targets at least one of these three.</p>

        <h2 className="font-display text-[20px] font-semibold text-navy-900 mt-10 mb-3">2. Why navy and white</h2>
        <p>Navy is institutional — it sits naturally next to the existing NUST identity — but the ramp from <code>navy-50</code> to <code>navy-950</code> gives enough surface variation to express hierarchy without resorting to a second hue. Functional accents (success, warn, danger) are reserved exclusively for status, so colour always carries meaning. A red pill is never decorative.</p>

        <h2 className="font-display text-[20px] font-semibold text-navy-900 mt-10 mb-3">3. Mobile-first, not mobile-only</h2>
        <p>76% of survey respondents said they would use the portal exclusively on a phone. The student app was therefore designed in a 390-pixel frame and only then scaled outwards. The home, submit and tracker screens look identical on a Pixel and an iPhone, and the same components compose into the desktop staff console without redrawing.</p>

        <h2 className="font-display text-[20px] font-semibold text-navy-900 mt-10 mb-3">4. The four-tap submission ceiling</h2>
        <p>Home → category → describe → review → submitted. The progress bar at the top of every step makes the journey feel finite. Students can self-serve via help articles inside step two — an off-ramp that costs them nothing and saves a Navigator’s time when it succeeds.</p>

        <h2 className="font-display text-[20px] font-semibold text-navy-900 mt-10 mb-3">5. The SLA ring as a single primitive</h2>
        <p>One visual primitive — the colour-coded ring — communicates time-to-resolution on the home, list, detail and dashboard screens. Students learn it once. Staff use the same ring in the queue and SLA monitor. Consistent encoding across surfaces is what turns a collection of pages into a system.</p>

        <h2 className="font-display text-[20px] font-semibold text-navy-900 mt-10 mb-3">6. Auto-routing as a quiet feature</h2>
        <p>The classifier that picks the right directorate is shown to students only when it matters (the “Auto-routed to Registrar” line in the activity log) and to staff as a confidence percentage in the queue. Below 85% confidence, the request flows to manual triage. The point is not to advertise an algorithm but to remove an invisible step that previously took half a day.</p>

        <h2 className="font-display text-[20px] font-semibold text-navy-900 mt-10 mb-3">7. Accessibility and connectivity</h2>
        <p>Body type stays at 14 px or larger and touch targets at 44 × 44 px. Colour is never the only signal — every status pill carries an icon and a label. The submit form caches locally so a student in a hostel with patchy WiFi can compose a request offline and queue it for sync. Skeleton loaders replace empty states so the app never feels frozen.</p>

        <h2 className="font-display text-[20px] font-semibold text-navy-900 mt-10 mb-3">8. The staff console is a peer, not an afterthought</h2>
        <p>Staff need volume — a dense queue, sortable columns, walk-in intake in under thirty seconds. They share the same colour, type and SLA primitives as the student app, but the layout is desktop-first because that is where they actually work. The performance dashboard exposes the same information to the directorates that the SLA monitor shows to individual Navigators, so management decisions and floor decisions are based on the same numbers.</p>

        <h2 className="font-display text-[20px] font-semibold text-navy-900 mt-10 mb-3">9. AI disclosure</h2>
        <p>Per the competition rules: ChatGPT and Claude were used for ideation, copy review and Next.js scaffolding. All component design, layout, interaction logic and the visual system are original work by the team.</p>

        <hr className="my-10 border-line" />
        <p className="text-[12px] text-muted">NUST Student Support Services Centre · Pro-Rector (Academics) · Track 2 submission, May 2026.</p>
      </div>
    </article>
  );
}
