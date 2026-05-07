"use client";
import { Card } from "@/components/ui";
import { CATEGORIES } from "@/lib/categories";
import { UserPlus, Info } from "lucide-react";
import { useState } from "react";

export default function Walkin() {
  const [cms, setCms] = useState("");
  const [cat, setCat] = useState("");
  const [issue, setIssue] = useState("");
  const [priority, setPriority] = useState("normal");

  return (
    <div className="space-y-5 sm:space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-[22px] sm:text-[28px] font-semibold tracking-tight text-navy-900">Log a walk-in</h1>
        <p className="text-[12px] sm:text-[13px] text-muted mt-1">Digitise an in-person interaction so it enters the same SLA queue as online requests.</p>
      </div>

      <Card className="p-4 sm:p-6">
        <div className="flex items-center gap-3 pb-4 border-b border-line">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-navy-50 text-navy-800"><UserPlus className="w-5 h-5" strokeWidth={1.7} /></div>
          <div>
            <div className="font-display font-semibold text-navy-900">Intake form</div>
            <div className="text-[11px] text-muted">Logged by Bilal Khan · Triage Desk · {new Date().toLocaleString()}</div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-5">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted">Student CMS ID</label>
            <input value={cms} onChange={e => setCms(e.target.value)} placeholder="e.g. 421817" className="mt-1.5 w-full h-11 px-3 rounded-md border border-line bg-white text-[14px] focus:outline-none focus:border-navy-700" />
            <p className="text-[11px] text-muted mt-1.5">Profile auto-loads on lookup.</p>
          </div>
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted">Category</label>
            <select value={cat} onChange={e => setCat(e.target.value)} className="mt-1.5 w-full h-11 px-3 rounded-md border border-line bg-white text-[14px] focus:outline-none focus:border-navy-700">
              <option value="">Select directorate</option>
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-muted">Summary of issue</label>
          <textarea value={issue} onChange={e => setIssue(e.target.value)} rows={5} placeholder="Brief notes from the conversation. Include any reference numbers or evidence the student shared." className="mt-1.5 w-full p-3 rounded-md border border-line bg-white text-[14px] focus:outline-none focus:border-navy-700 resize-none" />
        </div>

        <div className="mt-4">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-muted">Priority</label>
          <div className="mt-1.5 flex gap-1.5">
            {(["normal", "high", "urgent"] as const).map(p => (
              <button key={p} type="button" onClick={() => setPriority(p)} className={`h-10 px-4 rounded-md text-[12px] font-medium capitalize border transition ${
                priority === p ? "bg-navy-900 text-white border-navy-900" : "bg-white text-navy-700 border-line"
              }`}>{p}</button>
            ))}
          </div>
        </div>

        {issue.length > 12 && (
          <div className="mt-4 p-3 rounded-md border border-line bg-mist text-[12px] text-navy-900 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 mt-0.5 text-navy-700 shrink-0" />
            <div>Auto-route suggestion: <b>{cat ? CATEGORIES.find(c => c.id === cat)?.directorate : "select category"}</b>. Confidence shown after submit.</div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 pt-5 mt-5 border-t border-line">
          <button className="flex-1 sm:flex-initial h-11 px-5 rounded-md bg-navy-900 text-white text-[13px] font-medium hover:bg-navy-800">Create request</button>
          <button className="flex-1 sm:flex-initial h-11 px-5 rounded-md bg-white border border-line text-navy-700 text-[13px] font-medium">Cancel</button>
          <span className="w-full sm:w-auto sm:ml-auto text-[11px] text-muted">Required: CMS ID, Category, Summary</span>
        </div>
      </Card>
    </div>
  );
}
