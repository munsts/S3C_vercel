"use client";
import { STAFF_QUEUE } from "@/lib/mock";
import { getCategory } from "@/lib/categories";
import { Card, StatusPill, SlaRing } from "@/components/ui";
import { slaPct, slaTone, cn, fmt } from "@/lib/utils";
import { AlertTriangle, ArrowRight, TrendingUp } from "lucide-react";

export default function SlaMonitor() {
  const sorted = [...STAFF_QUEUE]
    .filter(r => r.status !== "resolved" && r.status !== "rejected")
    .map(r => ({ ...r, pct: slaPct(r.elapsedHours, r.slaHours) }))
    .sort((a, b) => b.pct - a.pct);

  const breaching = sorted.filter(r => r.pct >= 80);
  const watch = sorted.filter(r => r.pct >= 50 && r.pct < 80);
  const safe = sorted.filter(r => r.pct < 50);

  const Section = ({ title, items, hint }: { title: string; items: typeof sorted; hint: string }) => (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-display font-semibold text-[15px] text-navy-900">{title} <span className="text-muted font-normal text-[12px] ml-1">{items.length}</span></h3>
        <span className="text-[11px] text-muted">{hint}</span>
      </div>
      <Card className="divide-y divide-line">
        {items.length === 0 && <div className="p-6 text-center text-[12px] text-muted">No requests in this band.</div>}
        {items.map(r => {
          const cat = getCategory(r.category);
          return (
            <div key={r.id} className="p-3.5 sm:p-4">
              <div className="flex items-start gap-3 sm:gap-4">
                <SlaRing elapsed={r.elapsedHours} total={r.slaHours} size={44} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[10.5px] text-muted">{r.id}</span>
                    <StatusPill status={r.status} />
                  </div>
                  <div className="font-medium text-navy-900 mt-0.5 text-[13.5px] truncate">{r.title}</div>
                  <div className="text-[11px] text-muted mt-0.5 flex items-center gap-1.5"><cat.icon className="w-3 h-3" strokeWidth={1.6} /> {cat.short} · {r.directorate}</div>
                  <div className="text-[10.5px] text-muted mt-0.5">submitted {fmt(r.createdAt)}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className={cn("font-display text-[18px] sm:text-[20px] font-semibold leading-none", slaTone(r.pct))}>{r.pct}%</div>
                  <div className="text-[10px] text-muted mt-1 whitespace-nowrap">{Math.max(0, r.slaHours - r.elapsedHours)}h left</div>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <button className="w-full sm:w-auto h-9 px-3.5 rounded-md bg-navy-900 text-white text-[12px] font-medium inline-flex items-center justify-center gap-1.5 hover:bg-navy-800">Escalate <ArrowRight className="w-3 h-3" /></button>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );

  return (
    <div className="space-y-5 sm:space-y-6 max-w-[1500px]">
      <div>
        <h1 className="font-display text-[22px] sm:text-[28px] font-semibold tracking-tight text-navy-900">SLA monitor</h1>
        <p className="text-[12px] sm:text-[13px] text-muted mt-1">Live timers across all directorates. Escalate any item above 80% elapsed.</p>
      </div>

      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        <Card className="p-4 border-red-200 bg-red-50/40">
          <div className="text-[10.5px] uppercase tracking-wider text-red-700 font-semibold flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> Breach risk</div>
          <div className="font-display text-[24px] sm:text-[32px] font-semibold mt-2 text-red-700 leading-none">{breaching.length}</div>
          <div className="text-[11px] text-muted mt-2">≥ 80% of SLA elapsed</div>
        </Card>
        <Card className="p-4 border-amber-200 bg-amber-50/40">
          <div className="text-[10.5px] uppercase tracking-wider text-amber-800 font-semibold">Watch list</div>
          <div className="font-display text-[24px] sm:text-[32px] font-semibold mt-2 text-amber-800 leading-none">{watch.length}</div>
          <div className="text-[11px] text-muted mt-2">50–79% elapsed</div>
        </Card>
        <Card className="p-4 border-emerald-200 bg-emerald-50/40">
          <div className="text-[10.5px] uppercase tracking-wider text-emerald-700 font-semibold">On track</div>
          <div className="font-display text-[24px] sm:text-[32px] font-semibold mt-2 text-emerald-700 leading-none">{safe.length}</div>
          <div className="text-[11px] text-muted mt-2">Below 50% elapsed</div>
        </Card>
      </div>

      <Card className="p-4 flex items-start gap-3">
        <TrendingUp className="w-4 h-4 text-navy-700 mt-0.5 shrink-0" />
        <div className="text-[12.5px] text-navy-900 leading-relaxed">
          <b>Forecast:</b> based on directorate load and historical resolution times, two of the breach-risk requests are likely to need escalation today. Filter the queue by directorate to rebalance assignments.
        </div>
      </Card>

      <div className="space-y-7">
        <Section title="Breach risk" items={breaching} hint="Action required" />
        <Section title="Watch list" items={watch} hint="Monitor closely" />
        <Section title="On track" items={safe} hint="Healthy" />
      </div>
    </div>
  );
}
