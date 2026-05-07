"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui";
import { CheckCircle2, AlertCircle, Bell, Inbox, ArrowLeft, MessageSquare, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRequests } from "@/lib/store";
import { timeAgo } from "@/lib/utils";
import Link from "next/link";

export default function Notifications() {
  const router = useRouter();
  const { requests } = useRequests();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  // Flatten all events from all requests into a single notification list
  const notifications = requests.flatMap(r => [
    ...r.events.map(e => ({
      requestId: r.id,
      requestTitle: r.title,
      type: "event",
      title: e.label,
      at: e.at,
      icon: e.label.includes("Resolve") ? CheckCircle2 : e.label.includes("Routed") ? Inbox : Bell,
      tone: e.label.includes("Resolve") ? "text-emerald-700 bg-emerald-50" : "text-navy-800 bg-navy-50"
    })),
    ...(r.messages || [])
      .filter(m => m.sender === "staff")
      .map(m => ({
        requestId: r.id,
        requestTitle: r.title,
        type: "message",
        title: "New response from Directorate",
        at: m.at,
        icon: MessageSquare,
        tone: "text-amber-800 bg-amber-50"
      }))
  ]).sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());

  return (
    <>
      {/* Mobile header */}
      <header className="lg:hidden bg-white border-b border-line px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="grid h-9 w-9 place-items-center rounded-md hover:bg-mist"><ArrowLeft className="w-4 h-4" /></button>
          <h1 className="font-display text-[18px] font-semibold tracking-tight text-navy-900">Notifications</h1>
          <button className="ml-auto text-[12px] text-navy-700 font-medium">Mark all read</button>
        </div>
      </header>

      {/* Desktop header */}
      <div className="hidden lg:flex items-end justify-between mb-6">
        <div>
          <h1 className="font-display text-[28px] font-semibold tracking-tight text-navy-900">Notifications</h1>
          <p className="text-[13px] text-muted mt-1">Updates on your active requests and new messages.</p>
        </div>
        <button className="text-[12.5px] text-navy-700 font-medium hover:underline">Mark all as read</button>
      </div>

      <div className="p-4 lg:p-0 max-w-3xl lg:mx-auto w-full space-y-4">
        {notifications.length > 0 ? (
          <Card className="divide-y divide-line overflow-hidden">
            {notifications.map((it, i) => (
              <Link 
                key={i} 
                href={`/student/requests/${it.requestId}`}
                className="p-3.5 lg:p-4 flex items-start gap-4 hover:bg-mist transition"
              >
                <div className={`grid h-10 w-10 place-items-center rounded-md ${it.tone} shrink-0`}>
                  <it.icon className="w-5 h-5" strokeWidth={1.7} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium text-navy-900">{it.title}</div>
                  <div className="text-[12px] text-muted mt-0.5 truncate">
                    <span className="font-mono font-medium">{it.requestId}</span> · {it.requestTitle}
                  </div>
                </div>
                <div className="text-[11px] text-muted whitespace-nowrap mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {timeAgo(it.at)}
                </div>
              </Link>
            ))}
          </Card>
        ) : (
          <div className="py-20 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-navy-50 text-navy-200 mx-auto mb-4">
              <Bell className="w-8 h-8" />
            </div>
            <p className="text-muted text-[14px]">No notifications yet.</p>
          </div>
        )}
      </div>
    </>
  );
}
