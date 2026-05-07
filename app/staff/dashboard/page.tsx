"use client";
import { Card } from "@/components/ui";
import { PERF } from "@/lib/mock";
import { getCategory } from "@/lib/categories";
import type { Category } from "@/lib/types";
import { Star, Clock, CheckCircle2, AlertTriangle, ArrowUpRight, ArrowDownRight, ArrowRight, Wifi } from "lucide-react";
import { useState, useEffect } from "react";
import { cn, slaPct, slaTone, fmt } from "@/lib/utils";
import { Toast, StatusPill, SlaRing } from "@/components/ui";
import { STAFF_QUEUE } from "@/lib/mock";

export default function Dashboard() {
  const [range, setRange] = useState<"7" | "30" | "90">("7");
  const [toast, setToast] = useState<string | null>(null);
  const [queue, setQueue] = useState(STAFF_QUEUE);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const trendMap: Record<string, number[]> = {
    "7": PERF.weekTrend,
    "30": PERF.monthTrend,
    "90": PERF.quarterTrend,
  };

  const trend = trendMap[range];
  const max = Math.max(...trend);
  const maxCat = Math.max(...PERF.byCategory.map(c => c.n));
  const total = trend.reduce((a: number, b: number) => a + b, 0);

  // Find a high-risk request for the "Breach risk" section
  const breachRequest = queue.find(r => r.status !== "resolved" && slaPct(r.elapsedHours, r.slaHours) >= 80);

  const handleEscalate = (id: string) => {
    setQueue(prev => prev.map(r => r.id === id ? { ...r, priority: "urgent" } : r));
    setToast(`Request ${id} escalated to URGENT priority.`);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const tiles = [
    { l: "Resolved today", v: PERF.resolvedToday, sub: "+12% vs 7-day avg", trend: "up", icon: CheckCircle2 },
    { l: "Avg resolution", v: `${PERF.avgResolutionHrs}h`, sub: "−3.4h vs last week", trend: "down", icon: Clock },
    { l: "CSAT", v: `${PERF.csat}/5`, sub: "94% positive feedback", trend: "up", icon: Star },
    { l: "Breaching SLA", v: PERF.breaching, sub: "Action required", trend: "up", danger: true, icon: AlertTriangle },
  ];

  return (
    <div className="space-y-5 sm:space-y-6 max-w-[1500px]">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-[22px] sm:text-[28px] font-semibold tracking-tight text-navy-900">Performance</h1>
          <p className="text-[12px] sm:text-[13px] text-muted mt-1">Last 7 days · {total} requests · 8 directorates</p>
        </div>
        <div className="flex gap-1.5 text-[12px] w-full sm:w-auto">
          <button onClick={() => setRange("7")} className={cn("flex-1 sm:flex-initial h-9 px-3 rounded-md font-medium transition", range === "7" ? "bg-navy-900 text-white" : "bg-white border border-line text-navy-700")}>7 days</button>
          <button onClick={() => setRange("30")} className={cn("flex-1 sm:flex-initial h-9 px-3 rounded-md font-medium transition", range === "30" ? "bg-navy-900 text-white" : "bg-white border border-line text-navy-700")}>30 days</button>
          <button onClick={() => setRange("90")} className={cn("flex-1 sm:flex-initial h-9 px-3 rounded-md font-medium transition", range === "90" ? "bg-navy-900 text-white" : "bg-white border border-line text-navy-700")}>Quarter</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {tiles.map(t => (
          <Card key={t.l} className="p-3.5 sm:p-5">
            <div className="flex items-center justify-between text-[10px] sm:text-[10.5px] uppercase tracking-wider text-muted font-semibold gap-1">
              <span className="flex items-center gap-1.5 min-w-0"><t.icon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} /> <span className="truncate">{t.l}</span></span>
              {t.trend === "up" ? <ArrowUpRight className={`w-3.5 h-3.5 shrink-0 ${t.danger ? "text-red-600" : "text-emerald-600"}`} /> : <ArrowDownRight className="w-3.5 h-3.5 shrink-0 text-emerald-600" />}
            </div>
            <div className={`font-display text-[26px] sm:text-[34px] font-semibold mt-2 sm:mt-2.5 ${t.danger ? "text-red-700" : "text-navy-900"} leading-none`}>{t.v}</div>
            <div className="text-[10.5px] sm:text-[11px] text-muted mt-1.5 sm:mt-2">{t.sub}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        {breachRequest ? (
          <Card className="lg:col-span-3 p-4 sm:p-5 border-amber-200 bg-amber-50/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-navy-900">Breach risk</span>
                <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-bold uppercase">1</span>
              </div>
              <span className="text-[10px] text-muted uppercase font-bold tracking-wider">Action required</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6 bg-white border border-amber-200 p-4 rounded-md">
              <div className="flex items-center gap-4">
                <SlaRing elapsed={breachRequest.elapsedHours} total={breachRequest.slaHours} size={48} />
                <div className="sm:hidden">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-muted">{breachRequest.id}</span>
                    <StatusPill status={breachRequest.status} />
                  </div>
                  <div className="font-display font-semibold text-[16px] text-navy-900 mt-0.5">{breachRequest.title}</div>
                </div>
              </div>
              <div className="flex-1 min-w-0 hidden sm:block">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-muted">{breachRequest.id}</span>
                  <StatusPill status={breachRequest.status} />
                </div>
                <div className="font-display font-semibold text-[15px] text-navy-900 mt-1 truncate">{breachRequest.title}</div>
                <div className="text-[11px] text-muted mt-1 flex items-center gap-1.5">
                  <Wifi className="w-3 h-3" /> ICT · ICT Directorate
                </div>
                <div className="text-[10px] text-muted mt-1">submitted {fmt(breachRequest.createdAt)}</div>
              </div>
              <div className="flex items-center justify-between sm:flex-col sm:items-end sm:text-right shrink-0 border-t sm:border-t-0 border-amber-100 pt-3 sm:pt-0 mt-1 sm:mt-0">
                <div>
                  <div className="text-[18px] font-display font-bold text-amber-600 leading-none">{slaPct(breachRequest.elapsedHours, breachRequest.slaHours)}%</div>
                  <div className="text-[10px] text-muted mt-1 uppercase tracking-wider font-bold">{Math.max(0, breachRequest.slaHours - breachRequest.elapsedHours)}h left</div>
                </div>
                <button 
                  onClick={() => handleEscalate(breachRequest.id)}
                  className="h-10 px-5 rounded-md bg-navy-900 text-white text-[13px] font-medium flex items-center gap-2 hover:bg-navy-800 transition shadow-lg shadow-navy-900/20"
                >
                  Escalate <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="lg:col-span-2 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <div className="text-[10.5px] uppercase tracking-wider text-muted font-semibold">Resolutions · {range === "7" ? "7 days" : range === "30" ? "30 days" : "Quarter"}</div>
                <div className="font-display text-[16px] sm:text-[18px] font-semibold mt-1 text-navy-900">{total} total</div>
              </div>
            </div>
            <div className="relative flex items-end gap-1 sm:gap-3 h-48 sm:h-56 mt-8 ml-8">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="w-full border-t border-line/40 relative">
                    <span className="absolute -top-2 -left-8 text-[9px] text-muted font-mono">{Math.round(max * (1 - i/3))}</span>
                  </div>
                ))}
              </div>

              {trend.map((v: number, i: number) => (
                <div 
                  key={i} 
                  className="flex-1 h-full flex flex-col items-center justify-end group relative"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Background track */}
                  <div className="absolute inset-0 bg-navy-50/30 rounded-t-sm mx-0.5" />
                  
                  {/* Actual bar */}
                  <div 
                    className={cn(
                      "w-full rounded-t-md transition-all duration-500 ease-out relative z-10",
                      "bg-gradient-to-t from-navy-900 to-navy-700 shadow-sm",
                      hoveredIndex === i ? "opacity-100 scale-x-110 shadow-md" : "opacity-90"
                    )} 
                    style={{ height: `${(v / max) * 100}%` }} 
                  />

                  {/* Tooltip */}
                  {hoveredIndex === i && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 animate-in fade-in zoom-in-95 duration-200">
                      <div className="bg-navy-900 text-white px-2.5 py-1.5 rounded shadow-xl text-[11px] font-semibold whitespace-nowrap">
                        {v} resolutions
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-navy-900 rotate-45" />
                      </div>
                    </div>
                  )}

                  {range === "7" && (
                    <div className="text-[9px] uppercase tracking-wider text-muted font-bold mt-3 transition-colors group-hover:text-navy-900">
                      {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {breachRequest ? (
           <Card className="lg:col-span-2 p-4 sm:p-6">
           <div className="flex items-center justify-between mb-4 sm:mb-6">
             <div>
               <div className="text-[10.5px] uppercase tracking-wider text-muted font-semibold">Resolutions · {range === "7" ? "7 days" : range === "30" ? "30 days" : "Quarter"}</div>
               <div className="font-display text-[16px] sm:text-[18px] font-semibold mt-1 text-navy-900">{total} total</div>
             </div>
           </div>
            <div className="relative flex items-end gap-1.5 sm:gap-3 h-48 sm:h-56 mt-8 ml-8">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="w-full border-t border-line/40 relative">
                    <span className="absolute -top-2 -left-8 text-[9px] text-muted font-mono">{Math.round(max * (1 - i/3))}</span>
                  </div>
                ))}
              </div>

              {trend.map((v: number, i: number) => (
                <div 
                  key={i} 
                  className="flex-1 h-full flex flex-col items-center justify-end group relative"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Background track */}
                  <div className="absolute inset-0 bg-navy-50/30 rounded-t-sm mx-0.5" />
                  
                  {/* Actual bar */}
                  <div 
                    className={cn(
                      "w-full rounded-t-md transition-all duration-500 ease-out relative z-10",
                      "bg-gradient-to-t from-navy-900 to-navy-700 shadow-sm",
                      hoveredIndex === i ? "opacity-100 scale-x-110 shadow-md" : "opacity-90"
                    )} 
                    style={{ height: `${(v / max) * 100}%` }} 
                  />

                  {/* Tooltip */}
                  {hoveredIndex === i && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 animate-in fade-in zoom-in-95 duration-200">
                      <div className="bg-navy-900 text-white px-2.5 py-1.5 rounded shadow-xl text-[11px] font-semibold whitespace-nowrap">
                        {v} resolutions
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-navy-900 rotate-45" />
                      </div>
                    </div>
                  )}

                  {range === "7" && (
                    <div className="text-[9px] uppercase tracking-wider text-muted font-bold mt-3 transition-colors group-hover:text-navy-900">
                      {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}
                    </div>
                  )}
                </div>
              ))}
            </div>
         </Card>
        ) : null}

        <Card className="p-4 sm:p-6">
          <div className="text-[10.5px] uppercase tracking-wider text-muted font-semibold">Volume by category</div>
          <div className="font-display text-[16px] sm:text-[18px] font-semibold mt-1 text-navy-900">Last 30 days</div>
          <div className="mt-5 space-y-3">
            {PERF.byCategory.map(c => {
              const cat = getCategory(c.cat as Category);
              return (
                <div key={c.cat}>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="flex items-center gap-2 text-navy-900"><cat.icon className="w-3 h-3" strokeWidth={1.6} /> {cat.short}</span>
                    <span className="font-mono text-muted">{c.n}</span>
                  </div>
                  <div className="h-1 mt-1 rounded-full bg-navy-50 overflow-hidden">
                    <div className="h-full rounded-full bg-navy-900" style={{ width: `${(c.n / maxCat) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        <Card className="p-4 sm:p-5">
          <div className="text-[10.5px] uppercase tracking-wider text-muted font-semibold">Volume Trends</div>
          <div className="font-display font-semibold text-[15px] mt-1.5 text-navy-900">ICT volume increased</div>
          <p className="text-[12px] text-muted mt-1.5 leading-relaxed">Recent reports are mostly from SEECS Lab 3. We recommend posting a notice to the affected batches.</p>
        </Card>
        <Card className="p-4 sm:p-5">
          <div className="text-[10.5px] uppercase tracking-wider text-muted font-semibold">Priority Items</div>
          <div className="font-display font-semibold text-[15px] mt-1.5 text-navy-900">2 hostel requests due soon</div>
          <p className="text-[12px] text-muted mt-1.5 leading-relaxed">Please ensure these are reviewed by the warden on duty before the shift ends.</p>
        </Card>
        <Card className="p-4 sm:p-5">
          <div className="text-[10.5px] uppercase tracking-wider text-muted font-semibold">Top performer</div>
          <div className="font-display font-semibold text-[15px] mt-1.5 text-navy-900">Ayesha N. · 14 resolved · 4.9 CSAT</div>
          <p className="text-[12px] text-muted mt-1.5 leading-relaxed">Focused on transcript and registration cases this week with high efficiency.</p>
        </Card>
      </div>
    </div>
  );
}
