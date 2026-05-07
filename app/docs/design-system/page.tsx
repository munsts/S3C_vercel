"use client";
import { Card, Button, StatusPill, PriorityPill, SlaRing } from "@/components/ui";
import { Search, Bell, Info } from "lucide-react";

const navy = [
  { s: 50, c: "bg-navy-50" }, { s: 100, c: "bg-navy-100" }, { s: 200, c: "bg-navy-200" },
  { s: 300, c: "bg-navy-300" }, { s: 400, c: "bg-navy-400" }, { s: 500, c: "bg-navy-500" },
  { s: 600, c: "bg-navy-600" }, { s: 700, c: "bg-navy-700" }, { s: 800, c: "bg-navy-800" },
  { s: 900, c: "bg-navy-900" }, { s: 950, c: "bg-navy-950" },
];

export default function DS() {
  return (
    <article className="max-w-6xl mx-auto px-6 lg:px-10 py-12 space-y-14">
      <header>
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted">Design System</div>
        <h1 className="font-display text-[34px] font-semibold tracking-tight text-navy-900 mt-1">Foundations and components</h1>
        <p className="text-[14px] text-muted max-w-2xl mt-3 leading-relaxed">Our visual identity is built for clarity and speed. We use a professional palette of navy and white, with purposeful accents that keep you informed on your request status at a glance.</p>
      </header>

      <Section title="Colour" id="color">
        <Card className="p-4 sm:p-6">
          <div className="text-[10.5px] uppercase tracking-wider text-muted font-semibold mb-3">Navy ramp</div>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-1.5 sm:gap-2">
            {navy.map(({ s, c }) => (
              <div key={s}>
                <div className={`h-12 sm:h-16 rounded-md ${c} ${s <= 200 ? "border border-line" : ""}`} />
                <div className="text-[10px] mt-1.5 font-mono text-navy-900">{s}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {[
              ["Paper", "#FFFFFF", "bg-white border border-line"],
              ["Mist", "#F7F9FC", "bg-mist border border-line"],
              ["Line", "#E4E9F2", "bg-line"],
              ["Ink", "#0A1F44", "bg-navy-900"],
            ].map(([n, h, c]) => (
              <div key={n}>
                <div className={`h-16 rounded-md ${c}`} />
                <div className="text-[11.5px] mt-1.5"><b className="text-navy-900">{n}</b> <span className="font-mono text-muted">{h}</span></div>
              </div>
            ))}
          </div>
          <div className="text-[10.5px] uppercase tracking-wider text-muted font-semibold mt-6 mb-3">Functional accents · status only</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              ["Success", "#10B981", "bg-emerald-500"],
              ["Warn", "#F59E0B", "bg-amber-500"],
              ["Danger", "#EF4444", "bg-red-500"],
              ["Info", "#3B82F6", "bg-blue-500"],
            ].map(([n, h, c]) => (
              <div key={n}>
                <div className={`h-10 rounded-md ${c}`} />
                <div className="text-[11.5px] mt-1.5"><b className="text-navy-900">{n}</b> <span className="font-mono text-muted">{h}</span></div>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section title="Typography" id="type">
        <Card className="p-6 sm:p-8">
          <div className="text-[10.5px] uppercase tracking-wider text-muted font-semibold">Display · Space Grotesk · 600</div>
          <div className="font-display text-[32px] sm:text-[56px] font-semibold tracking-tight text-navy-900 leading-[1.1] mt-2">Built for students.</div>
          <div className="font-display text-[22px] sm:text-[28px] font-semibold mt-4 text-navy-900">Section heading · 28</div>
          <div className="font-display text-[16px] sm:text-[18px] font-semibold mt-3 text-navy-900">Subhead · 18</div>
          <div className="border-t border-line mt-6 pt-6">
            <div className="text-[10.5px] uppercase tracking-wider text-muted font-semibold">Body · Inter</div>
            <p className="text-[16px] text-navy-900 mt-2 leading-relaxed">16 lead — Submit a request, watch it move through the system in real time, and get notified the moment it is resolved.</p>
            <p className="text-[14px] text-navy-900 mt-2 leading-relaxed">14 body — accessible default for all running text. Never below this size.</p>
            <p className="text-[12px] text-muted mt-2">12 caption — only for tertiary metadata.</p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted mt-2">10 eyebrow · 0.18em tracking</p>
          </div>
        </Card>
      </Section>

      <Section title="Components" id="components">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-5 space-y-3">
            <div className="text-[10.5px] uppercase tracking-wider text-muted font-semibold">Buttons</div>
            <div className="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </Card>
          <Card className="p-5 space-y-3">
            <div className="text-[10.5px] uppercase tracking-wider text-muted font-semibold">Status &amp; priority pills</div>
            <div className="flex flex-wrap gap-2">
              <StatusPill status="submitted" />
              <StatusPill status="routed" />
              <StatusPill status="in_progress" />
              <StatusPill status="resolved" />
              <StatusPill status="rejected" />
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <PriorityPill priority="low" />
              <PriorityPill priority="normal" />
              <PriorityPill priority="high" />
              <PriorityPill priority="urgent" />
            </div>
          </Card>
          <Card className="p-5 space-y-3">
            <div className="text-[10.5px] uppercase tracking-wider text-muted font-semibold">SLA ring</div>
            <div className="flex items-end gap-5">
              <div className="text-center"><SlaRing elapsed={10} total={72} /><div className="text-[10px] text-muted mt-1">Safe</div></div>
              <div className="text-center"><SlaRing elapsed={50} total={72} /><div className="text-[10px] text-muted mt-1">Watch</div></div>
              <div className="text-center"><SlaRing elapsed={68} total={72} /><div className="text-[10px] text-muted mt-1">Breach</div></div>
            </div>
          </Card>
          <Card className="p-5 space-y-3">
            <div className="text-[10.5px] uppercase tracking-wider text-muted font-semibold">Form controls</div>
            <input placeholder="Text input" className="w-full h-11 px-3 rounded-md border border-line bg-white text-[14px] focus:outline-none focus:border-navy-700" />
            <textarea rows={3} placeholder="Textarea" className="w-full p-3 rounded-md border border-line bg-white text-[14px] focus:outline-none focus:border-navy-700 resize-none" />
            <div className="flex items-center gap-2.5 h-11 px-3.5 rounded-md bg-mist border border-line">
              <Search className="w-4 h-4 text-muted" />
              <span className="text-[13px] text-muted">Search field</span>
            </div>
          </Card>
          <Card className="p-5 space-y-3 md:col-span-2">
            <div className="text-[10.5px] uppercase tracking-wider text-muted font-semibold">Surfaces</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-md bg-white border border-line text-[13px] text-navy-900">Default surface card</div>
              <div className="p-4 rounded-md bg-mist border border-line text-[13px] text-navy-900 flex items-center gap-2"><Info className="w-3.5 h-3.5 text-navy-700" /> Inline help callout</div>
              <div className="p-4 rounded-md bg-navy-900 text-white text-[13px] flex items-center gap-2"><Bell className="w-3.5 h-3.5" /> High-emphasis ribbon</div>
            </div>
          </Card>
        </div>
      </Section>

      <Section title="Spacing and radii" id="space">
        <Card className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="text-[10.5px] uppercase tracking-wider text-muted font-semibold mb-3">Spacing scale · 4-pt grid</div>
            <div className="space-y-2">
              {[4, 8, 12, 16, 20, 24, 32, 48].map(s => (
                <div key={s} className="flex items-center gap-3">
                  <div className="bg-navy-900 h-3 rounded-r-sm" style={{ width: s * 2 }} />
                  <div className="text-[11px] font-mono text-muted">{s}px</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[10.5px] uppercase tracking-wider text-muted font-semibold mb-3">Radii</div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {[["sm", 4], ["md", 6], ["lg", 10], ["xl", 14], ["full", 999]].map(([n, r]) => (
                <div key={n} className="text-center">
                  <div className="h-14 bg-navy-900" style={{ borderRadius: r as number }} />
                  <div className="text-[10px] mt-1.5 font-mono text-muted">{n}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </Section>

      <Section title="Accessibility" id="a11y">
        <Card className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-[13px] text-navy-900">
          <div>
            <div className="font-display font-semibold mb-1">Contrast</div>
            <p className="text-muted text-[12.5px] leading-relaxed">All text and background pairs meet WCAG AA. Navy-800 on white reaches 13.4:1.</p>
          </div>
          <div>
            <div className="font-display font-semibold mb-1">Touch targets</div>
            <p className="text-muted text-[12.5px] leading-relaxed">Body text is never below 14px. Interactive controls are at least 44 × 44 px.</p>
          </div>
          <div>
            <div className="font-display font-semibold mb-1">Motion</div>
            <p className="text-muted text-[12.5px] leading-relaxed">Easings cap at 450 ms. <code>prefers-reduced-motion</code> disables transitions.</p>
          </div>
        </Card>
      </Section>
    </article>
  );
}

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section id={id}>
      <h2 className="font-display text-[20px] font-semibold text-navy-900 mb-4">{title}</h2>
      {children}
    </section>
  );
}
