"use client";
import { useRequests } from "@/lib/store";
import { getCategory } from "@/lib/categories";
import { Card, StatusPill, SlaRing, PriorityPill } from "@/components/ui";
import { timeAgo, cn, fmt, slaPct, slaTone } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";

export default function RequestsList() {
  const { requests } = useRequests();
  const [tab, setTab] = useState<"active" | "resolved" | "all">("active");
  const [q, setQ] = useState("");

  const filtered = requests
    .filter(r =>
      tab === "active" ? !["resolved", "rejected"].includes(r.status) :
      tab === "resolved" ? ["resolved", "rejected"].includes(r.status) : true
    )
    .filter(r => q === "" || (r.title + r.id + r.directorate).toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      {/* Mobile header */}
      <header className="lg:hidden bg-white border-b border-line px-4 pt-5 pb-3">
        <div className="flex items-baseline justify-between mb-3">
          <h1 className="font-display text-[22px] font-semibold tracking-tight text-navy-900">Requests</h1>
          <div className="text-[11px] text-muted">{requests.length} total</div>
        </div>
        <SearchBar q={q} onQ={setQ} />
        <Tabs tab={tab} onTab={setTab} />
      </header>

      {/* Desktop header */}
      <div className="hidden lg:block">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="font-display text-[28px] font-semibold tracking-tight text-navy-900">Requests</h1>
            <p className="text-[13px] text-muted mt-1">{requests.length} total · {requests.filter(r => r.status !== "resolved" && r.status !== "rejected").length} active</p>
          </div>
          <Link href="/student/submit" className="h-10 px-4 inline-flex items-center gap-2 rounded-md bg-navy-900 text-white text-[13px] font-medium hover:bg-navy-800">
            <Plus className="w-4 h-4" /> New request
          </Link>
        </div>
        <Card>
          <div className="p-3 border-b border-line flex items-center gap-3">
            <SearchBar q={q} onQ={setQ} />
            <Tabs tab={tab} onTab={setTab} desktop />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] min-w-[800px]">
              <thead className="bg-mist text-[10.5px] uppercase tracking-wider text-muted">
                <tr>
                  <th className="text-left font-semibold p-3.5">Request</th>
                  <th className="text-left font-semibold p-3.5">Directorate</th>
                  <th className="text-left font-semibold p-3.5">Status</th>
                  <th className="text-left font-semibold p-3.5">SLA</th>
                  <th className="text-left font-semibold p-3.5">Submitted</th>
                  <th className="p-3.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map(r => {
                  const cat = getCategory(r.category);
                  const open = r.status !== "resolved" && r.status !== "rejected";
                  const pct = slaPct(r.elapsedHours, r.slaHours);
                  return (
                    <tr key={r.id} className="hover:bg-mist/60 cursor-pointer">
                      <td className="p-3.5">
                        <Link href={`/student/requests/${r.id}`} className="flex items-center gap-3">
                          <div className="grid h-9 w-9 place-items-center rounded-md bg-navy-50 text-navy-800 shrink-0"><cat.icon className="w-4 h-4" strokeWidth={1.6} /></div>
                          <div className="min-w-0">
                            <div className="font-mono text-[10.5px] text-muted">{r.id}</div>
                            <div className="font-medium text-navy-900 truncate max-w-[320px] mt-0.5">{r.title}</div>
                          </div>
                        </Link>
                      </td>
                      <td className="p-3.5 text-muted text-[12px]">{r.directorate}</td>
                      <td className="p-3.5"><div className="flex items-center gap-1.5"><StatusPill status={r.status} /><PriorityPill priority={r.priority} /></div></td>
                      <td className="p-3.5">
                        {open ? (
                          <div className="flex items-center gap-2">
                            <SlaRing elapsed={r.elapsedHours} total={r.slaHours} size={32} />
                            <div>
                              <div className={cn("text-[11.5px] font-semibold", slaTone(pct))}>{pct}%</div>
                              <div className="text-[10px] text-muted">{Math.max(0, r.slaHours - r.elapsedHours)}h left</div>
                            </div>
                          </div>
                        ) : <span className="text-[11px] text-muted">—</span>}
                      </td>
                      <td className="p-3.5 text-muted text-[12px]">{fmt(r.createdAt)}</td>
                      <td className="p-3.5 text-right">
                        <Link href={`/student/requests/${r.id}`} className="text-[12px] font-medium text-navy-800 hover:underline">Open →</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="text-center py-12 text-[13px] text-muted">No requests match your filters.</div>}
          </div>
        </Card>
      </div>

      {/* Mobile list */}
      <div className="lg:hidden p-4 space-y-2.5">
        {filtered.map(r => {
          const cat = getCategory(r.category);
          const open = r.status !== "resolved" && r.status !== "rejected";
          return (
            <Link key={r.id} href={`/student/requests/${r.id}`}>
              <Card className="p-3.5">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-md bg-navy-50 text-navy-800 shrink-0"><cat.icon className="w-[18px] h-[18px]" strokeWidth={1.6} /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] text-muted">{r.id}</span>
                      <StatusPill status={r.status} />
                    </div>
                    <div className="text-[13.5px] font-medium text-navy-900 mt-1.5 leading-snug">{r.title}</div>
                    <div className="text-[11px] text-muted mt-1">{r.directorate} · updated {timeAgo(r.updatedAt)}</div>
                  </div>
                  {open && <SlaRing elapsed={r.elapsedHours} total={r.slaHours} size={48} />}
                </div>
              </Card>
            </Link>
          );
        })}
        {filtered.length === 0 && <div className="text-center py-16 text-[13px] text-muted">No requests match your filters.</div>}
      </div>
    </>
  );
}

function SearchBar({ q, onQ }: { q: string; onQ: (s: string) => void }) {
  return (
    <div className="flex-1 flex items-center gap-2.5 h-10 px-3 rounded-md border border-line bg-mist">
      <Search className="w-4 h-4 text-muted" />
      <input value={q} onChange={e => onQ(e.target.value)} placeholder="Search by title, ID, directorate" className="flex-1 bg-transparent text-[13px] focus:outline-none" />
      <button className="text-muted"><Filter className="w-4 h-4" /></button>
    </div>
  );
}

function Tabs({ tab, onTab, desktop }: { tab: "active" | "resolved" | "all"; onTab: (t: "active" | "resolved" | "all") => void; desktop?: boolean }) {
  const tabs: ("active" | "resolved" | "all")[] = ["active", "resolved", "all"];
  if (desktop) {
    return (
      <div className="flex gap-1 bg-mist p-1 rounded-md border border-line">
        {tabs.map(t => (
          <button key={t} onClick={() => onTab(t)} className={cn(
            "h-8 px-3.5 rounded text-[12px] font-medium capitalize transition",
            tab === t ? "bg-white text-navy-900 shadow-sm" : "text-muted hover:text-navy-800"
          )}>{t}</button>
        ))}
      </div>
    );
  }
  return (
    <div className="flex gap-4 mt-3 text-[13px]">
      {tabs.map(t => (
        <button key={t} onClick={() => onTab(t)} className={cn(
          "pb-2.5 -mb-3 border-b-2 capitalize font-medium transition",
          tab === t ? "border-navy-900 text-navy-900" : "border-transparent text-muted"
        )}>{t}</button>
      ))}
    </div>
  );
}
