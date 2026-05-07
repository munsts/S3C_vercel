const flows = [
    {
    title: "Submit a new request",
    desc: "From home to confirmation in four taps or fewer.",
    nodes: ["Home", "New", "Pick category", "Describe + priority", "Review", "Submitted", "Routed"],
    branches: [
      "Inline help articles surface during step 2 → may resolve without submitting",
      "Manual routing required if department not specified or case is complex",
    ],
  },
  {
    title: "Track an existing request",
    desc: "Live SLA, lifecycle and complete activity log.",
    nodes: ["Home", "Active card", "Request detail", "Lifecycle steps", "Activity", "Reply or callback"],
    branches: [
      "Status reaches 80% of SLA → amber escalation banner with 1-hour callback promise",
      "Status reaches resolved → 5-star feedback prompt at the bottom of the page",
      "Status reaches rejected → reason card replaces lifecycle, with resubmit option",
    ],
  },
  {
    title: "Access Qalam and LMS context",
    desc: "Academic data folded into the home surface.",
    nodes: ["Home", "Qalam tile", "LMS tile", "Today on campus", "Class schedule"],
    branches: [
      "LMS deadline within 24 hours → highlighted in amber",
      "Profile screen mirrors current semester grades for offline reference",
    ],
  },
];

function Flow({ title, desc, nodes, branches }: typeof flows[number]) {
  return (
    <div className="bg-white rounded-md border border-line p-5 sm:p-8">
      <h3 className="font-display text-[17px] sm:text-[20px] font-semibold text-navy-900">{title}</h3>
      <p className="text-[12px] sm:text-[13px] text-muted mt-1 mb-5 sm:mb-6">{desc}</p>

      {/* Mobile: vertical stepper */}
      <ol className="sm:hidden space-y-1.5">
        {nodes.map((n, i) => {
          const tone = i === 0
            ? "bg-navy-900 text-white border-navy-900"
            : i === nodes.length - 1
            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
            : "bg-mist text-navy-800 border-line";
          return (
            <li key={i} className="flex items-center gap-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy-50 text-navy-800 text-[10.5px] font-mono font-semibold">{i + 1}</span>
              <div className={`flex-1 min-w-0 px-3 h-9 rounded-md border flex items-center text-[12.5px] font-medium ${tone}`}>{n}</div>
            </li>
          );
        })}
      </ol>

      {/* Desktop: horizontal */}
      <div className="hidden sm:flex flex-wrap items-center gap-2">
        {nodes.map((n, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`px-3.5 h-9 rounded-md flex items-center text-[12.5px] font-medium ${
              i === 0 ? "bg-navy-900 text-white" :
              i === nodes.length - 1 ? "bg-emerald-50 text-emerald-800 border border-emerald-200" :
              "bg-mist text-navy-800 border border-line"
            }`}>{n}</div>
            {i < nodes.length - 1 && <span className="text-navy-300">→</span>}
          </div>
        ))}
      </div>

      {branches.length > 0 && (
        <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-line">
          <div className="text-[10.5px] uppercase tracking-[0.18em] text-muted font-semibold mb-2.5">Edge cases</div>
          <ul className="space-y-1.5 text-[12px] sm:text-[13px] text-navy-900 leading-relaxed">
            {branches.map((b, i) => <li key={i}>· {b}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Flows() {
  return (
    <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
      <header className="mb-7 sm:mb-10">
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted">User flows</div>
        <h1 className="font-display text-[26px] sm:text-[34px] font-semibold tracking-tight text-navy-900 mt-1">Three core student journeys</h1>
        <p className="text-[13px] sm:text-[14px] text-muted max-w-2xl mt-3 leading-relaxed">Each diagram captures the happy path and the most likely deviations. Staff-side flows live in the operations console.</p>
      </header>
      <div className="space-y-4 sm:space-y-5">
        {flows.map(f => <Flow key={f.title} {...f} />)}
      </div>
    </article>
  );
}
