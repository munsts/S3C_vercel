"use client";
import { useState, Suspense } from "react";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { Button, Card } from "@/components/ui";
import { ArrowLeft, ArrowRight, Paperclip, Info, Check, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRequests } from "@/lib/store";
import type { Category, ServiceRequest } from "@/lib/types";
import { KB } from "@/lib/mock";
import { cn } from "@/lib/utils";

function SubmitInner() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get("cat") as Category | null;
  const [step, setStep] = useState(initial ? 1 : 0);
  const [cat, setCat] = useState<Category | null>(initial);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState<"normal" | "high" | "urgent">("normal");
  const add = useRequests(s => s.add);

  const meta = cat ? getCategory(cat) : null;
  const kbHits = KB.filter(k => k.cat === cat).slice(0, 2);

  function submit() {
    if (!cat) return;
    const id = `S3C-${Math.floor(2900 + Math.random() * 99)}`;
    const now = new Date().toISOString();
    const req: ServiceRequest = {
      id, title: title || `${getCategory(cat).short} request`, description: desc, category: cat,
      status: "submitted", priority, createdAt: now, updatedAt: now,
      slaHours: 72, elapsedHours: 0, directorate: getCategory(cat).directorate,
      aiConfidence: 0.92,
      events: [
        { at: now, label: "Request submitted" },
        { at: now, label: `Auto-routed to ${getCategory(cat).directorate}` },
      ],
    };
    add(req);
    router.push(`/student/requests/${id}?new=1`);
  }

  return (
    <>
      {/* mobile header */}
      <header className="lg:hidden bg-white border-b border-line">
        <div className="px-4 pt-4 pb-3 flex items-center gap-3">
          <button onClick={() => step === 0 ? router.back() : setStep(step - 1)} className="grid h-9 w-9 place-items-center rounded-md hover:bg-mist">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted">New request · {step + 1} of 3</div>
            <div className="font-display font-semibold text-[15px] text-navy-900 mt-0.5">
              {step === 0 && "Select a category"}
              {step === 1 && "Describe the issue"}
              {step === 2 && "Review and submit"}
            </div>
          </div>
        </div>
        <div className="px-4 pb-3 flex gap-1">
          {[0, 1, 2].map(i => (
            <div key={i} className={`flex-1 h-0.5 ${i <= step ? "bg-navy-900" : "bg-line"}`} />
          ))}
        </div>
      </header>

      {/* desktop header */}
      <div className="hidden lg:block mb-6 max-w-3xl mx-auto w-full">
        <div className="flex items-center gap-2 text-[12px] text-muted mb-3">
          <Link href="/student/home" className="hover:text-navy-800">Home</Link>
          <span>/</span>
          <span className="text-navy-900">New request</span>
        </div>
        <h1 className="font-display text-[28px] font-semibold tracking-tight text-navy-900">New request</h1>
        <p className="text-[13px] text-muted mt-1">Step {step + 1} of 3 · {step === 0 ? "Select a category" : step === 1 ? "Describe the issue" : "Review and submit"}</p>
        <div className="mt-5 flex items-center gap-2">
          {[0, 1, 2].map(i => (
            <div key={i} className="flex-1 flex items-center gap-2">
              <div className={cn("h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-semibold border", i < step ? "bg-navy-900 text-white border-navy-900" : i === step ? "bg-white text-navy-900 border-navy-900" : "bg-white text-muted border-line")}>{i + 1}</div>
              {i < 2 && <div className={cn("flex-1 h-0.5", i < step ? "bg-navy-900" : "bg-line")} />}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 lg:p-0 max-w-3xl lg:mx-auto w-full">
        {step === 0 && (
          <Card className="divide-y divide-line">
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={() => { setCat(c.id); setStep(1); }} className="w-full text-left p-3.5 lg:p-4 flex items-center gap-3 hover:bg-mist transition">
                <div className="grid h-10 w-10 lg:h-11 lg:w-11 place-items-center rounded-md bg-navy-50 text-navy-800"><c.icon className="w-5 h-5" strokeWidth={1.6} /></div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-[14px] text-navy-900">{c.label}</div>
                  <div className="text-[12px] text-muted truncate">{c.blurb}</div>
                </div>
                <div className="text-[11px] text-muted hidden lg:block max-w-[200px] truncate">{c.directorate}</div>
                <ChevronRight className="w-4 h-4 text-muted" />
              </button>
            ))}
          </Card>
        )}

        {step === 1 && meta && (
          <div className="space-y-3 lg:space-y-4">
            <Card className="p-3.5 lg:p-4 flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-navy-50 text-navy-800"><meta.icon className="w-[18px] h-[18px]" strokeWidth={1.6} /></div>
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted">Category</div>
                <div className="text-[13px] font-medium text-navy-900">{meta.label}</div>
              </div>
              <button onClick={() => setStep(0)} className="text-[12px] text-navy-700 font-medium hover:underline">Change</button>
            </Card>

            <Card className="p-4 lg:p-5 space-y-4">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted">Title</label>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Short summary" className="mt-1.5 w-full h-11 px-3 rounded-md border border-line bg-white text-[14px] focus:outline-none focus:border-navy-700" />
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted">Details</label>
                <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={6} placeholder="Include dates, references, or any context that helps the directorate respond faster." className="mt-1.5 w-full p-3 rounded-md border border-line bg-white text-[14px] focus:outline-none focus:border-navy-700 resize-none" />
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted">Priority</label>
                <div className="mt-1.5 grid grid-cols-3 gap-1.5">
                  {(["normal", "high", "urgent"] as const).map(p => (
                    <button key={p} onClick={() => setPriority(p)} className={`h-10 rounded-md text-[12px] font-medium capitalize border transition ${
                      priority === p ? "bg-navy-900 text-white border-navy-900" : "bg-white text-navy-700 border-line hover:border-navy-300"
                    }`}>{p}</button>
                  ))}
                </div>
                <p className="text-[11px] text-muted mt-2">Urgent requests require justification at review.</p>
              </div>
              <button className="w-full h-11 rounded-md border border-dashed border-line text-muted text-[12px] inline-flex items-center justify-center gap-2 hover:border-navy-300">
                <Paperclip className="w-3.5 h-3.5" /> Attach file (PDF, JPG · max 10 MB)
              </button>
            </Card>

            {kbHits.length > 0 && (
              <Card className="p-4">
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted font-semibold flex items-center gap-1.5"><Info className="w-3 h-3" /> Before you submit</div>
                <p className="text-[11.5px] text-muted mt-1">These help articles may resolve your issue without a request.</p>
                <div className="mt-3 space-y-3">
                  {kbHits.map((k, i) => (
                    <Link href="/student/kb" key={i} className="block group">
                      <div className="text-[13px] font-medium text-navy-900 group-hover:underline">{k.q}</div>
                      <div className="text-[12px] text-muted leading-relaxed mt-0.5">{k.a}</div>
                    </Link>
                  ))}
                </div>
              </Card>
            )}

            <div className="flex justify-end">
              <Button size="lg" className="w-full lg:w-auto" onClick={() => setStep(2)} disabled={!title}>Continue <ArrowRight className="w-4 h-4" /></Button>
            </div>
          </div>
        )}

        {step === 2 && meta && (
          <div className="space-y-3 lg:space-y-4">
            <Card className="p-4 lg:p-5">
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted">Summary</div>
              <div className="font-display font-semibold text-[16px] lg:text-[18px] text-navy-900 mt-1">{title}</div>
              <p className="text-[13px] text-navy-900 mt-2 leading-relaxed">{desc || "-"}</p>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 mt-4 pt-4 border-t border-line text-[12px]">
                <div><dt className="text-muted text-[10px] uppercase tracking-wider">Category</dt><dd className="text-navy-900 mt-0.5">{meta.label}</dd></div>
                <div><dt className="text-muted text-[10px] uppercase tracking-wider">Priority</dt><dd className="text-navy-900 mt-0.5 capitalize">{priority}</dd></div>
                <div><dt className="text-muted text-[10px] uppercase tracking-wider">Routed to</dt><dd className="text-navy-900 mt-0.5">{meta.directorate}</dd></div>
                <div><dt className="text-muted text-[10px] uppercase tracking-wider">Target SLA</dt><dd className="text-navy-900 mt-0.5">72 hours</dd></div>
              </dl>
            </Card>

            <Card className="p-4 text-[12.5px] text-navy-900 leading-relaxed">
              <div className="flex items-start gap-2">
                <Info className="w-3.5 h-3.5 mt-0.5 text-navy-700 shrink-0" />
                <p>Your CMS profile and current semester data are attached automatically. You can reply, attach evidence, and rate the resolution from the request page.</p>
              </div>
            </Card>

            <div className="flex flex-col-reverse lg:flex-row lg:justify-end gap-2">
              <Link href="/student/home" className="text-center text-[12px] text-muted py-3 hover:text-navy-700 lg:hidden">Cancel</Link>
              <Button variant="outline" onClick={() => setStep(1)} className="hidden lg:inline-flex">Back</Button>
              <Button size="lg" className="w-full lg:w-auto" onClick={submit}><Check className="w-4 h-4" /> Submit request</Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function Submit() {
  return <Suspense fallback={null}><SubmitInner /></Suspense>;
}
