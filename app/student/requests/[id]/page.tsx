"use client";
import { use, useEffect, useState, Suspense, useRef } from "react";
import { useRequests } from "@/lib/store";
import { getCategory } from "@/lib/categories";
import { Card, StatusPill, PriorityPill, SlaRing, Button } from "@/components/ui";
import { ArrowLeft, Star, MessageSquare, CheckCircle2, Circle, Clock, Phone as PhoneIcon, Paperclip, X, Send } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { fmt, slaPct, slaTone, cn } from "@/lib/utils";
import type { RequestStatus, Message } from "@/lib/types";

const STEPS: RequestStatus[] = ["submitted", "routed", "in_progress", "resolved"];
const LABELS: Record<RequestStatus, string> = { submitted: "Submitted", routed: "Routed to directorate", in_progress: "In progress", resolved: "Resolved", rejected: "Rejected" };

function Inner({ id }: { id: string }) {
  const { requests, rate, addMessage } = useRequests();
  const router = useRouter();
  const search = useSearchParams();
  const isNew = search.get("new") === "1";
  const r = requests.find(x => x.id === id);
  const [showToast, setShowToast] = useState(isNew);
  const [replyText, setReplyText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isNew) return;
    const t = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(t);
  }, [isNew]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [r?.messages]);

  if (!r) return <div className="p-8 text-center text-muted">Request not found.</div>;
  const cat = getCategory(r.category);
  const stepIdx = r.status === "rejected" ? -1 : STEPS.indexOf(r.status);
  const pct = slaPct(r.elapsedHours, r.slaHours);
  const remaining = Math.max(0, r.slaHours - r.elapsedHours);

  const handleSend = () => {
    if (!replyText.trim()) return;
    const m: Message = {
      id: Math.random().toString(36).substring(7),
      sender: "student",
      text: replyText,
      at: new Date().toISOString(),
    };
    addMessage(r.id, m);
    setReplyText("");
  };

  return (
    <div className="relative pb-24 lg:pb-0">
      {showToast && (
        <div className="fixed lg:absolute top-3 lg:top-6 left-3 right-3 lg:left-1/2 lg:-translate-x-1/2 lg:right-auto lg:w-[420px] z-50 rounded-md bg-navy-900 text-white px-3.5 py-3 shadow-lg flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="text-[12px] leading-tight flex-1">
            <div className="font-semibold">Request submitted</div>
            <div className="text-white/65">Auto-routed to {r.directorate}. You will receive push updates.</div>
          </div>
          <button onClick={() => setShowToast(false)} className="text-white/55 hover:text-white"><X className="w-3.5 h-3.5" /></button>
        </div>
      )}

      {/* mobile header */}
      <header className="lg:hidden bg-white border-b border-line px-4 pt-4 pb-3 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="grid h-9 w-9 place-items-center rounded-md hover:bg-mist">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted font-mono">{r.id}</div>
            <div className="font-display font-semibold text-[15px] text-navy-900 truncate">{r.title}</div>
          </div>
        </div>
      </header>

      {/* desktop breadcrumb */}
      <div className="hidden lg:block mb-6">
        <div className="flex items-center gap-2 text-[12px] text-muted mb-3">
          <Link href="/student/requests" className="hover:text-navy-800">Requests</Link>
          <span>/</span>
          <span className="font-mono text-navy-900">{r.id}</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-[28px] font-semibold tracking-tight text-navy-900">{r.title}</h1>
            <div className="text-[13px] text-muted mt-1.5 flex items-center gap-2"><cat.icon className="w-3.5 h-3.5" /> {cat.label} · created {fmt(r.createdAt)}</div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => document.getElementById('chat-input')?.focus()}><MessageSquare className="w-3.5 h-3.5" /> Reply</Button>
            <Button variant="outline" size="sm"><PhoneIcon className="w-3.5 h-3.5" /> Callback</Button>
          </div>
        </div>
      </div>

      <div className="p-4 lg:p-0 lg:grid lg:grid-cols-3 lg:gap-6 space-y-3 lg:space-y-0">

        {/* left column */}
        <div className="lg:col-span-2 space-y-3 lg:space-y-6">
          <Card className="p-4 lg:p-5">
            <div className="flex items-center gap-4">
              {r.status !== "rejected" && r.status !== "resolved" ? (
                <SlaRing elapsed={r.elapsedHours} total={r.slaHours} size={84} />
              ) : (
                <div className="grid h-[84px] w-[84px] place-items-center rounded-full bg-navy-50 text-navy-800">
                  {r.status === "resolved" ? <CheckCircle2 className="w-7 h-7" /> : <X className="w-7 h-7" />}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <StatusPill status={r.status} />
                  <PriorityPill priority={r.priority} />
                </div>
                <div className="text-[13px] text-navy-900 mt-2">
                  {r.status === "rejected" ? "Closed without action" :
                   r.status === "resolved" ? `Resolved in ${r.elapsedHours} hours` :
                   <><span className={cn("font-semibold", slaTone(pct))}>{remaining} hours remaining</span> of {r.slaHours}h SLA</>}
                </div>
                <div className="text-[12px] text-muted mt-1">{r.directorate}{r.assignee && ` · assigned to ${r.assignee}`}</div>
              </div>
            </div>
          </Card>

          {/* chat area */}
          <Card className="flex flex-col h-[400px] lg:h-[500px]">
            <div className="p-4 border-b border-line flex items-center justify-between">
              <div className="text-[10.5px] uppercase tracking-[0.18em] text-muted font-semibold">Discussion</div>
              <div className="text-[11px] text-muted">Direct to {r.directorate}</div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-mist/30">
              {/* initial description */}
              <div className="flex flex-col items-start max-w-[85%]">
                <div className="bg-white border border-line rounded-2xl rounded-tl-none p-3 shadow-sm">
                  <p className="text-[13.5px] text-navy-900 leading-relaxed">{r.description}</p>
                </div>
                <span className="text-[10px] text-muted mt-1 ml-1">{fmt(r.createdAt)}</span>
              </div>

              {r.messages?.map((m) => (
                <div key={m.id} className={cn("flex flex-col max-w-[85%]", m.sender === "student" ? "ml-auto items-end" : "items-start")}>
                  <div className={cn(
                    "p-3 rounded-2xl shadow-sm border",
                    m.sender === "student" ? "bg-navy-900 text-white border-navy-900 rounded-tr-none" : "bg-white text-navy-900 border-line rounded-tl-none"
                  )}>
                    <p className="text-[13.5px] leading-relaxed">{m.text}</p>
                  </div>
                  <span className="text-[10px] text-muted mt-1 mx-1">{fmt(m.at)}</span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="p-3 border-t border-line bg-white rounded-b-md">
              <div className="relative">
                <input 
                  id="chat-input"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..." 
                  className="w-full h-11 pl-4 pr-12 rounded-full border border-line bg-mist text-[14px] focus:outline-none focus:border-navy-700 transition" 
                />
                <button 
                  onClick={handleSend}
                  disabled={!replyText.trim()}
                  className="absolute right-1.5 top-1.5 grid h-8 w-8 place-items-center rounded-full bg-navy-900 text-white hover:bg-navy-800 disabled:opacity-40 transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>

          <Card className="p-4 lg:p-5">
            <div className="flex items-center justify-between">
              <div className="text-[10.5px] uppercase tracking-[0.18em] text-muted font-semibold">Attachments</div>
              <button className="text-[11.5px] text-navy-700 font-medium hover:underline inline-flex items-center gap-1"><Paperclip className="w-3 h-3" /> Add file</button>
            </div>
            <p className="text-[12px] text-muted mt-2">No files attached.</p>
          </Card>

          {r.status === "resolved" && (
            <Card className="p-4 lg:p-5">
              <div className="text-[10.5px] uppercase tracking-[0.18em] text-muted font-semibold mb-2">Rate this resolution</div>
              <p className="text-[12px] text-muted mb-3">Your feedback is shared with the directorate. It does not affect future requests.</p>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => rate(r.id, n)} className={cn(
                    "h-11 flex-1 lg:flex-none lg:w-14 rounded-md border flex items-center justify-center transition",
                    (r.rating ?? 0) >= n ? "bg-navy-900 border-navy-900 text-white" : "bg-white border-line text-navy-300 hover:border-navy-300"
                  )}>
                    <Star className="w-4 h-4" fill={(r.rating ?? 0) >= n ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
              {r.rating && <div className="text-[12px] text-navy-700 mt-2">Recorded {r.rating} of 5.</div>}
            </Card>
          )}

          {r.status === "rejected" && (
            <Card className="p-4 lg:p-5 border-red-200 bg-red-50/40">
              <div className="text-[10.5px] uppercase tracking-[0.18em] text-red-700 font-semibold mb-2">Why this was closed</div>
              <p className="text-[13px] text-navy-900 leading-relaxed">The directorate could not act on this request as filed. See the activity log for the reason. You can resubmit with additional information or visit the S³C desk.</p>
            </Card>
          )}
        </div>

        {/* right column */}
        <div className="space-y-3 lg:space-y-6">
          <Card className="p-4 lg:p-5">
            <div className="text-[10.5px] uppercase tracking-[0.18em] text-muted font-semibold mb-3">Activity log</div>
            <ol className="space-y-3.5">
              {r.events.slice().reverse().map((ev, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="grid h-6 w-6 place-items-center rounded-full bg-navy-50 text-navy-800 mt-0.5 shrink-0"><Clock className="w-3 h-3" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12.5px] text-navy-900 leading-snug">{ev.label}</div>
                    <div className="text-[11px] text-muted mt-0.5">{fmt(ev.at)}{ev.by && ` · ${ev.by}`}</div>
                  </div>
                </li>
              ))}
            </ol>
          </Card>

          <Card className="p-4 lg:p-5">
            <div className="text-[10.5px] uppercase tracking-[0.18em] text-muted font-semibold mb-3">Details</div>
            <dl className="space-y-3 text-[12.5px]">
              <Row label="Request ID" value={r.id} mono />
              <Row label="Category" value={cat.label} />
              <Row label="Directorate" value={r.directorate} />
              {r.assignee && <Row label="Assignee" value={r.assignee} />}
              <Row label="Created" value={fmt(r.createdAt)} />
              <Row label="Last update" value={fmt(r.updatedAt)} />
              <Row label="Target SLA" value={`${r.slaHours} hours`} />
            </dl>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-muted text-[11.5px]">{label}</dt>
      <dd className={cn("text-navy-900 text-right", mono && "font-mono text-[11.5px]")}>{value}</dd>
    </div>
  );
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <Suspense fallback={null}><Inner id={id} /></Suspense>;
}
