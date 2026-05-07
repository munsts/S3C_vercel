"use client";
import { use, useEffect, useState, Suspense, useRef } from "react";
import { useRequests } from "@/lib/store";
import { getCategory } from "@/lib/categories";
import { Card, StatusPill, PriorityPill, SlaRing, Button, Toast } from "@/components/ui";
import { ArrowLeft, MessageSquare, CheckCircle2, Clock, Phone as PhoneIcon, Paperclip, X, Send, User, ChevronRight, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fmt, slaPct, slaTone, cn } from "@/lib/utils";
import type { RequestStatus, Message } from "@/lib/types";

const STATUS_FLOW: RequestStatus[] = ["submitted", "routed", "in_progress", "resolved", "rejected"];

function Inner({ id }: { id: string }) {
  const { requests, update, addMessage } = useRequests();
  const router = useRouter();
  const r = requests.find(x => x.id === id);
  const [replyText, setReplyText] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowStatusMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [r?.messages, hydrated]);

  if (!hydrated) return null;
  if (!r) return <div className="p-8 text-center text-muted">Request not found.</div>;
  
  const cat = getCategory(r.category);
  const pct = slaPct(r.elapsedHours, r.slaHours);

  const handleSend = () => {
    if (!replyText.trim()) return;
    const m: Message = {
      id: Math.random().toString(36).substring(7),
      sender: "staff",
      text: replyText,
      at: new Date().toISOString(),
    };
    addMessage(r.id, m);
    setReplyText("");
  };

  const addEvent = (label: string) => {
    const now = new Date().toISOString();
    const newEvents = [...r.events, { at: now, label, by: "Staff Operations" }];
    update(r.id, { events: newEvents, updatedAt: now });
  };

  const handleStatusChange = (status: RequestStatus) => {
    update(r.id, { status, updatedAt: new Date().toISOString() });
    addEvent(`Status changed to ${status.replace('_', ' ')}`);
    setToast(`Status updated to ${status.toUpperCase()}`);
    setShowStatusMenu(false);
  };

  const handleCallback = () => {
    handleStatusChange("in_progress");
    addEvent("Callback requested with student");
    setToast("Callback request logged");
  };

  const handleEscalate = () => {
    update(r.id, { priority: "urgent", updatedAt: new Date().toISOString() });
    addEvent("Escalated to Directorate Head");
    setToast("Request escalated to URGENT");
  };

  const handleReject = () => {
    handleStatusChange("rejected");
    setToast("Request REJECTED");
  };

  return (
    <div className="space-y-4 lg:space-y-6 max-w-[1400px] relative pb-20 lg:pb-0">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      
      {/* Header - Stacked on Mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-[11px] lg:text-[12px] text-muted mb-1 lg:mb-2">
            <Link href="/staff/queue" className="hover:text-navy-900 flex items-center gap-1"><ArrowLeft className="w-3 h-3" /> Queue</Link>
            <span>/</span>
            <span className="font-mono">{r.id}</span>
          </div>
          <h1 className="font-display text-[20px] lg:text-[26px] font-semibold tracking-tight text-navy-900 leading-tight lg:truncate">{r.title}</h1>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative flex-1 sm:flex-none" ref={dropdownRef}>
            <Button variant="outline" size="sm" className="w-full sm:w-auto justify-between" onClick={() => setShowStatusMenu(!showStatusMenu)}>
              Status <ChevronRight className={cn("w-3.5 h-3.5 transition-transform", showStatusMenu ? "rotate-[-90deg]" : "rotate-90")} />
            </Button>
            {showStatusMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-line rounded-md shadow-xl z-50 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                {STATUS_FLOW.map(s => (
                  <button 
                    key={s} 
                    onClick={() => handleStatusChange(s)} 
                    className="w-full px-4 py-2 text-left text-[13px] hover:bg-mist transition capitalize"
                  >
                    {s.replace('_', ' ')}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button size="sm" className="flex-1 sm:flex-none" onClick={() => handleStatusChange("resolved")}>Resolve</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 lg:gap-6 space-y-4 lg:space-y-0">
        {/* LEFT 2/3 */}
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          <Card className="p-4 lg:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6">
             <div className="flex items-center justify-center w-full sm:w-auto">
               <SlaRing elapsed={r.elapsedHours} total={r.slaHours} size={80} />
             </div>
             <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <StatusPill status={r.status} />
                  <PriorityPill priority={r.priority} />
                </div>
                <div className="text-[13px] lg:text-[14px] text-navy-900 leading-relaxed font-medium">
                  {r.description}
                </div>
                <div className="text-[11px] lg:text-[12px] text-muted mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="flex items-center gap-1.5"><cat.icon className="w-3.5 h-3.5" /> {cat.label}</span>
                  <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Muhammad Umar (516612)</span>
                </div>
             </div>
          </Card>

          {/* Discussion / Chat */}
          <Card className="flex flex-col h-[450px] lg:h-[500px]">
            <div className="p-3 lg:p-4 border-b border-line flex items-center justify-between bg-mist/20">
              <div className="text-[10px] lg:text-[10.5px] uppercase tracking-[0.18em] text-muted font-semibold">Discussion thread</div>
              <div className="text-[11px] text-navy-700 font-medium hidden sm:block">Internal Triage Desk</div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-4 bg-mist/5">
               {r.messages?.length === 0 && (
                 <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
                   <MessageSquare className="w-10 lg:w-12 h-10 lg:h-12 mb-3 stroke-[1px]" />
                   <p className="text-[13px] lg:text-[14px]">No discussion history yet.<br/>Send a message to start the conversation.</p>
                 </div>
               )}
               {r.messages?.map((m) => (
                <div key={m.id} className={cn("flex flex-col max-w-[90%] sm:max-w-[85%]", m.sender === "staff" ? "ml-auto items-end" : "items-start")}>
                  <div className={cn(
                    "p-3 rounded-2xl shadow-sm border",
                    m.sender === "staff" ? "bg-navy-900 text-white border-navy-900 rounded-tr-none" : "bg-white text-navy-900 border-line rounded-tl-none"
                  )}>
                    <p className="text-[13px] lg:text-[13.5px] leading-relaxed">{m.text}</p>
                  </div>
                  <span className="text-[9px] lg:text-[10px] text-muted mt-1 mx-1">{m.sender === "staff" ? "Staff Response" : "Student Reply"} · {fmt(m.at)}</span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="p-3 border-t border-line bg-white rounded-b-md">
              <div className="relative">
                <input 
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your response..." 
                  className="w-full h-11 lg:h-12 pl-4 pr-12 rounded-lg border border-line bg-mist text-[13px] lg:text-[14px] focus:outline-none focus:border-navy-700 transition" 
                />
                <button 
                  onClick={handleSend}
                  disabled={!replyText.trim()}
                  className="absolute right-2 top-1.5 lg:top-2 grid h-8 w-8 place-items-center rounded-md bg-navy-900 text-white hover:bg-navy-800 disabled:opacity-40 transition shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT 1/3 */}
        <div className="space-y-4 lg:space-y-6">
          <Card className="p-4 lg:p-5">
            <h3 className="text-[10px] lg:text-[11px] uppercase tracking-[0.18em] text-muted font-bold mb-4">Request Metadata</h3>
            <dl className="space-y-3 lg:space-y-4 text-[12px] lg:text-[13px]">
               <div className="flex justify-between border-b border-line pb-2">
                 <dt className="text-muted">Assigned to</dt>
                 <dd className="text-navy-900 font-medium">{r.assignee || "Unassigned"}</dd>
               </div>
               <div className="flex justify-between border-b border-line pb-2">
                 <dt className="text-muted">Target SLA</dt>
                 <dd className="text-navy-900 font-medium">{r.slaHours} Hours</dd>
               </div>
               <div className="flex justify-between border-b border-line pb-2">
                 <dt className="text-muted">SLA Elapsed</dt>
                 <dd className={cn("font-semibold", slaTone(pct))}>{pct}% ({r.elapsedHours}h)</dd>
               </div>
               <div className="flex justify-between border-b border-line pb-2">
                 <dt className="text-muted">Source</dt>
                 <dd className="text-navy-900 font-medium">{r.walkIn ? "Walk-in Desk" : "Portal Submission"}</dd>
               </div>
            </dl>
          </Card>

          <Card className="p-4 lg:p-5 bg-navy-50 border-navy-100">
             <h3 className="text-[10px] lg:text-[11px] uppercase tracking-[0.18em] text-navy-800 font-bold mb-3">Staff Actions</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
               <button onClick={handleCallback} className="h-10 bg-white border border-line rounded-md text-[12px] lg:text-[13px] font-medium text-navy-800 hover:border-navy-300 transition flex items-center justify-center gap-2">
                 <PhoneIcon className="w-3.5 h-3.5" /> Callback
               </button>
               <button onClick={handleEscalate} className="h-10 bg-white border border-line rounded-md text-[12px] lg:text-[13px] font-medium text-navy-800 hover:border-navy-300 transition flex items-center justify-center gap-2">
                 <AlertTriangle className="w-3.5 h-3.5" /> Escalate
               </button>
               <button onClick={handleReject} className="h-10 bg-white border border-line rounded-md text-[12px] lg:text-[13px] font-medium text-red-600 hover:bg-red-50 hover:border-red-200 transition flex items-center justify-center gap-2 sm:col-span-2 lg:col-span-1">
                 <X className="w-3.5 h-3.5" /> Reject Request
               </button>
             </div>
          </Card>

          <Card className="p-4 lg:p-5 hidden sm:block lg:block">
            <h3 className="text-[10px] lg:text-[11px] uppercase tracking-[0.18em] text-muted font-bold mb-3">Activity History</h3>
            <div className="space-y-3">
              {r.events.slice(-3).reverse().map((e, i) => (
                <div key={i} className="flex gap-2 text-[11px] lg:text-[12px]">
                  <Clock className="w-3 h-3 mt-1 text-muted shrink-0" />
                  <div>
                    <div className="text-navy-900 font-medium">{e.label}</div>
                    <div className="text-[10px] text-muted">{fmt(e.at)}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function StaffRequestDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <Suspense fallback={null}><Inner id={id} /></Suspense>;
}
