"use client";
import { STAFF_QUEUE, PERF } from "@/lib/mock";
import { useRequests } from "@/lib/store";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { Card, StatusPill, PriorityPill, SlaRing, Toast } from "@/components/ui";
import { fmt, slaPct, slaTone, cn } from "@/lib/utils";
import { Filter, ArrowUpDown, Inbox, Clock, CheckCircle2, AlertTriangle, Star, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Queue() {
  const { requests, update } = useRequests();
  const [hydrated, setHydrated] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  
  useEffect(() => {
    setHydrated(true);
  }, []);

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const filteredList = requests
    .filter(r => filter === "all" ? true : r.category === filter)
    .filter(r => statusFilter === "all" ? true : r.status === statusFilter)
    .sort((a, b) => {
      if (sortBy === "sla") return slaPct(b.elapsedHours, b.slaHours) - slaPct(a.elapsedHours, a.slaHours);
      if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === "priority") {
        const weights = { urgent: 3, high: 2, normal: 1, low: 0 };
        return (weights[b.priority] ?? 0) - (weights[a.priority] ?? 0);
      }
      return 0;
    });

  const handleTriage = (id: string) => {
    update(id, { status: "in_progress", updatedAt: new Date().toISOString() });
    setToast(`Request ${id} marked as In Progress.`);
  };

  const handleEscalate = (id: string) => {
    update(id, { priority: "urgent", updatedAt: new Date().toISOString() });
    setToast(`Request ${id} escalated to URGENT.`);
  };

  const SORT_OPTIONS = [
    { value: "sla", label: "SLA urgent" },
    { value: "newest", label: "Newest first" },
    { value: "priority", label: "Priority" },
  ];

  const STATUS_OPTIONS = [
    { value: "all", label: "All statuses" },
    { value: "submitted", label: "Submitted" },
    { value: "routed", label: "Routed" },
    { value: "in_progress", label: "In progress" },
    { value: "resolved", label: "Resolved" },
  ];

  const sortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label;

  const stats = [
    { label: "Resolved today", val: PERF.resolvedToday, icon: CheckCircle2 },
    { label: "Pending", val: PERF.pending, icon: Inbox },
    { label: "Breaching", val: PERF.breaching, icon: AlertTriangle, danger: true },
    { label: "Avg resolution", val: `${PERF.avgResolutionHrs}h`, icon: Clock },
    { label: "CSAT", val: `${PERF.csat}/5`, icon: Star },
  ];

  if (!hydrated) return null;

  return (
    <div className="space-y-5 sm:space-y-6 max-w-[1500px]">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-[22px] sm:text-[28px] font-semibold tracking-tight text-navy-900">Request queue</h1>
          <p className="text-[12px] sm:text-[13px] text-muted mt-1">Sorted by {sortLabel} · {filteredList.length} active items</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link href="/staff/walkin" className="flex-1 sm:flex-initial h-9 px-3.5 rounded-md bg-white border border-line text-[12.5px] font-medium text-navy-800 inline-flex items-center justify-center gap-1.5 hover:border-navy-300"><Plus className="w-3.5 h-3.5" /> Log walk-in</Link>
          <button className="flex-1 sm:flex-initial h-9 px-3.5 rounded-md bg-navy-900 text-white text-[12.5px] font-medium hover:bg-navy-800">Export CSV</button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
        {stats.map(s => (
          <Card key={s.label} className={cn("p-3 sm:p-4", s.danger && "border-red-200")}>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[10.5px] uppercase tracking-wider text-muted font-semibold">
              <s.icon className={cn("w-3.5 h-3.5", s.danger ? "text-red-600" : "text-navy-700")} strokeWidth={1.8} /> <span className="truncate">{s.label}</span>
            </div>
            <div className={cn("font-display text-[22px] sm:text-[28px] font-semibold mt-1.5 sm:mt-2", s.danger ? "text-red-700" : "text-navy-900")}>{s.val}</div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="p-3 border-b border-line flex items-center gap-2">
          <button onClick={() => setFilter("all")} className={cn(
            "shrink-0 h-7 px-3 rounded-full text-[11.5px] font-medium border transition",
            filter === "all" ? "bg-navy-900 text-white border-navy-900" : "bg-white text-navy-700 border-line"
          )}>All</button>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setFilter(c.id)} className={cn(
              "shrink-0 h-7 px-3 rounded-full text-[11.5px] font-medium border transition inline-flex items-center gap-1.5",
              filter === c.id ? "bg-navy-900 text-white border-navy-900" : "bg-white text-navy-700 border-line"
            )}>
              <c.icon className="w-3 h-3" strokeWidth={1.6} /> {c.short}
            </button>
          ))}
          <div className="ml-auto hidden md:flex items-center gap-1.5">
            <div className="relative">
              <button 
                onClick={() => setShowStatusMenu(!showStatusMenu)}
                className={cn(
                  "h-7 px-3 rounded-md text-[11.5px] font-medium border transition inline-flex items-center gap-1.5",
                  statusFilter !== "all" ? "bg-navy-900 text-white border-navy-900" : "bg-white text-navy-700 border-line"
                )}
              >
                <Filter className="w-3 h-3" /> {statusFilter === "all" ? "Filter" : `Status: ${statusFilter}`}
              </button>
              {showStatusMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowStatusMenu(false)} />
                  <div className="absolute right-0 mt-1.5 w-40 bg-white border border-line rounded-md shadow-lg z-50 py-1 overflow-hidden">
                    {STATUS_OPTIONS.map(o => (
                      <button
                        key={o.value}
                        onClick={() => { setStatusFilter(o.value); setShowStatusMenu(false); }}
                        className={cn(
                          "w-full px-3 py-2 text-left text-[11.5px] hover:bg-mist transition",
                          statusFilter === o.value ? "text-navy-900 font-semibold bg-navy-50" : "text-navy-700"
                        )}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="h-7 px-3 rounded-md text-[11.5px] font-medium bg-white border border-line text-navy-700 inline-flex items-center gap-1.5"
              >
                <ArrowUpDown className="w-3 h-3" /> Sort: {sortLabel}
              </button>
              {showSortMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowSortMenu(false)} />
                  <div className="absolute right-0 mt-1.5 w-40 bg-white border border-line rounded-md shadow-lg z-50 py-1 overflow-hidden">
                    {SORT_OPTIONS.map(o => (
                      <button
                        key={o.value}
                        onClick={() => { setSortBy(o.value); setShowSortMenu(false); }}
                        className={cn(
                          "w-full px-3 py-2 text-left text-[11.5px] hover:bg-mist transition",
                          sortBy === o.value ? "text-navy-900 font-semibold bg-navy-50" : "text-navy-700"
                        )}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile card list */}
        <ul className="md:hidden divide-y divide-line">
          {filteredList.map(r => {
            const cat = getCategory(r.category);
            const pct = slaPct(r.elapsedHours, r.slaHours);
            return (
              <li key={r.id} className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-muted">{r.id}</span>
                      <StatusPill status={r.status} />
                      <PriorityPill priority={r.priority} />
                    </div>
                    <div className="font-display font-semibold text-[15px] text-navy-900 mt-1 truncate">{r.title}</div>
                    <div className="text-[12px] text-muted mt-1 flex items-center gap-1.5"><cat.icon className="w-3.5 h-3.5" /> {cat.short}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <SlaRing elapsed={r.elapsedHours} total={r.slaHours} size={42} />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-mist">
                  <div className="text-[11px] text-muted">
                    Submitted {fmt(r.createdAt)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/staff/queue/${r.id}`} className="shrink-0 h-9 px-3.5 rounded-md bg-navy-900 text-white text-[12px] font-medium inline-flex items-center">Triage</Link>
                    {r.priority !== "urgent" && <button onClick={() => handleEscalate(r.id)} className="shrink-0 h-9 px-3.5 rounded-md bg-white border border-line text-navy-700 text-[12px] font-medium hover:bg-mist">Escalate</button>}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto rounded-b-lg">
          <table className="w-full text-[13px] min-w-[1000px]">
            <thead className="bg-mist text-[10.5px] uppercase tracking-wider text-muted font-semibold">
              <tr>
                <th className="p-3.5 text-left font-semibold">Request</th>
                <th className="p-3.5 text-left font-semibold">Category</th>
                <th className="p-3.5 text-left font-semibold">Status</th>
                <th className="p-3.5 text-left font-semibold">Priority</th>
                <th className="p-3.5 text-left font-semibold">SLA</th>
                <th className="p-3.5 text-left font-semibold">Submitted</th>
                <th className="p-3.5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filteredList.map(r => {
                const cat = getCategory(r.category);
                const pct = slaPct(r.elapsedHours, r.slaHours);
                return (
                  <tr key={r.id} className="hover:bg-mist/60">
                    <td className="p-3.5">
                      <Link href={`/staff/queue/${r.id}`} className="flex items-center gap-3 group">
                        <div className="grid h-9 w-9 place-items-center rounded-md bg-navy-50 text-navy-800 group-hover:bg-navy-900 group-hover:text-white transition"><cat.icon className="w-4 h-4" strokeWidth={1.6} /></div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10.5px] text-muted">{r.id}</span>
                          </div>
                          <div className="font-medium text-navy-900 group-hover:text-navy-700 truncate max-w-[280px] mt-0.5">{r.title}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="p-3.5 text-muted text-[12px]">{cat.short}</td>
                    <td className="p-3.5 whitespace-nowrap"><StatusPill status={r.status} /></td>
                    <td className="p-3.5"><PriorityPill priority={r.priority} /></td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <SlaRing elapsed={r.elapsedHours} total={r.slaHours} size={40} />
                        <div>
                          <div className={cn("font-display font-semibold", slaTone(pct))}>{pct}%</div>
                          <div className="text-[10px] text-muted">{Math.round(Math.max(0, r.slaHours - r.elapsedHours))}h left</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 text-muted text-[12px]">{fmt(r.createdAt)}</td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                    <Link href={`/staff/queue/${r.id}`} className="text-[12px] font-medium text-navy-900 hover:underline">Triage →</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
