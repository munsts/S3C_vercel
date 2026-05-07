"use client";
import { Card } from "@/components/ui";
import { KB } from "@/lib/mock";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { Search, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { Category } from "@/lib/types";
import Link from "next/link";

export default function Kb() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | null>(null);
  const filtered = KB.filter(k =>
    (cat === null || k.cat === cat) &&
    (q === "" || (k.q + k.a).toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <>
      {/* Mobile header */}
      <header className="lg:hidden bg-white border-b border-line px-4 pt-5 pb-4">
        <h1 className="font-display text-[22px] font-semibold tracking-tight text-navy-900 mb-3">Help center</h1>
        <SearchBox q={q} onQ={setQ} />
        <CatChips cat={cat} setCat={setCat} />
      </header>

      {/* Desktop header */}
      <div className="hidden lg:block mb-6">
        <h1 className="font-display text-[28px] font-semibold tracking-tight text-navy-900">Help center</h1>
        <p className="text-[13px] text-muted mt-1">{KB.length} articles · search before you submit a request</p>
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-6">
        {/* Desktop sidebar filters */}
        <aside className="hidden lg:block">
          <Card className="p-4 sticky top-20">
            <div className="text-[10.5px] uppercase tracking-[0.18em] text-muted font-semibold mb-3">Filter by category</div>
            <div className="space-y-0.5">
              <button onClick={() => setCat(null)} className={`w-full text-left h-9 px-3 rounded-md text-[12.5px] transition ${cat === null ? "bg-navy-50 text-navy-900 font-medium" : "text-navy-700 hover:bg-mist"}`}>All articles</button>
              {CATEGORIES.map(c => (
                <button key={c.id} onClick={() => setCat(c.id)} className={`w-full text-left h-9 px-3 rounded-md text-[12.5px] flex items-center gap-2 transition ${cat === c.id ? "bg-navy-50 text-navy-900 font-medium" : "text-navy-700 hover:bg-mist"}`}>
                  <c.icon className="w-3.5 h-3.5" strokeWidth={1.6} /> {c.short}
                </button>
              ))}
            </div>
          </Card>
        </aside>

        <div className="lg:col-span-3 p-4 lg:p-0 space-y-3">
          <div className="hidden lg:block">
            <SearchBox q={q} onQ={setQ} />
          </div>

          <Card className="divide-y divide-line">
            {filtered.map((k, i) => {
              const c = getCategory(k.cat as Category);
              return (
                <button key={i} className="w-full text-left p-4 flex items-start gap-3 hover:bg-mist transition">
                  <div className="grid h-9 w-9 place-items-center rounded-md bg-navy-50 text-navy-800 shrink-0"><c.icon className="w-4 h-4" strokeWidth={1.6} /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-medium text-navy-900 leading-snug">{k.q}</div>
                    <div className="text-[12px] text-muted leading-relaxed mt-1">{k.a}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted mt-2">{c.short}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted mt-1 shrink-0" />
                </button>
              );
            })}
            {filtered.length === 0 && <div className="text-center py-12 text-[13px] text-muted">No articles match.</div>}
          </Card>

          <Card className="p-4 lg:p-5 bg-navy-900 text-white border-navy-900">
            <div className="text-[10.5px] uppercase tracking-[0.18em] text-white/55 font-semibold">Still stuck?</div>
            <div className="font-display font-semibold text-[15px] lg:text-[17px] mt-1">Submit a request</div>
            <p className="text-[12.5px] text-white/65 mt-1.5 leading-relaxed">A Navigator will follow up within the SLA window for the relevant directorate.</p>
            <Link href="/student/submit" className="mt-3 inline-flex h-9 px-4 items-center justify-center rounded-md bg-white text-navy-900 text-[12.5px] font-medium">Open the form</Link>
          </Card>
        </div>
      </div>
    </>
  );
}

function SearchBox({ q, onQ }: { q: string; onQ: (s: string) => void }) {
  return (
    <div className="flex items-center gap-2.5 h-11 px-3.5 rounded-md border border-line bg-mist">
      <Search className="w-4 h-4 text-muted" />
      <input value={q} onChange={e => onQ(e.target.value)} placeholder="Search articles" className="flex-1 bg-transparent text-[14px] focus:outline-none" />
    </div>
  );
}

function CatChips({ cat, setCat }: { cat: Category | null; setCat: (c: Category | null) => void }) {
  return (
    <div className="flex gap-1.5 mt-3 overflow-x-auto no-scrollbar">
      <button onClick={() => setCat(null)} className={`shrink-0 h-7 px-3 rounded-full text-[11px] font-medium border transition ${cat === null ? "bg-navy-900 text-white border-navy-900" : "bg-white text-navy-700 border-line"}`}>All</button>
      {CATEGORIES.map(c => (
        <button key={c.id} onClick={() => setCat(c.id)} className={`shrink-0 h-7 px-3 rounded-full text-[11px] font-medium border transition ${cat === c.id ? "bg-navy-900 text-white border-navy-900" : "bg-white text-navy-700 border-line"}`}>{c.short}</button>
      ))}
    </div>
  );
}
