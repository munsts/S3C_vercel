"use client";
import { useState, useEffect } from "react";
import { useRequests } from "@/lib/store";
import { STUDENT, QALAM, LMS, SCHEDULE } from "@/lib/mock";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { Card, StatusPill, SlaRing } from "@/components/ui";
import { Bell, ChevronRight, Search, Clock, GraduationCap, BookOpen, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { timeAgo, slaPct, timeUntil, fmt } from "@/lib/utils";

export default function Home() {
  const { requests } = useRequests();
  const [hydrated, setHydrated] = useState(false);
  
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  const active = requests.filter(r => r.status !== "resolved" && r.status !== "rejected");
  const featured = active[0];
  const breach = active.find(r => slaPct(r.elapsedHours, r.slaHours) >= 80);
  
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todaysClasses = SCHEDULE.filter(s => s.day === today);

  return (
    <>
      {/* mobile header */}
      <header className="lg:hidden bg-navy-900 text-white px-5 pt-5 pb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-white text-navy-900 font-display font-semibold text-[14px]">{STUDENT.avatar}</div>
            <div className="leading-tight">
              <div className="text-[12px] text-white/60">{STUDENT.cms} · {STUDENT.program}</div>
              <div className="font-display font-semibold text-[15px]">{STUDENT.name}</div>
            </div>
          </div>
          <Link href="/student/notifications" className="relative grid h-10 w-10 place-items-center rounded-md bg-white/10">
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-400" />
          </Link>
        </div>
        <Link href="/student/kb" className="mt-5 flex items-center gap-2.5 h-11 px-4 rounded-md bg-white/10 text-white/65 text-[13px]">
          <Search className="w-4 h-4" />
          Search articles, request ID, directorate
        </Link>
      </header>

      {/* desktop greeting */}
      <div className="hidden lg:flex items-end justify-between mb-6">
        <div>
          <div className="text-[12px] text-muted">{new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</div>
          <h1 className="font-display text-[32px] font-semibold tracking-tight text-navy-900 mt-1">Welcome back, {STUDENT.name.split(" ")[0]}.</h1>
          <p className="text-[13px] text-muted mt-1">{active.length} active request{active.length === 1 ? "" : "s"} · {LMS.length} LMS update{LMS.length === 1 ? "" : "s"} · {todaysClasses.length} class{todaysClasses.length === 1 ? "" : "es"} today</p>
        </div>
        <Link href="/student/submit" className="h-11 px-5 inline-flex items-center gap-2 rounded-md bg-navy-900 text-white text-[13px] font-medium hover:bg-navy-800">
          <Plus className="w-4 h-4" /> New request
        </Link>
      </div>

      <div className="px-4 lg:px-0 -mt-4 lg:mt-0 space-y-3 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6 items-start">

        {/* left column */}
        <div className="lg:col-span-2 space-y-3 lg:space-y-6">
          {breach && (
            <div className="rounded-md border border-amber-300 bg-amber-50 px-3.5 py-3 text-[12.5px] text-amber-900 leading-snug flex items-start gap-2.5">
              <Clock className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <div>
                <b>Approaching SLA breach</b> on {breach.id}. The directorate will call you back within 1 hour if no update.
              </div>
            </div>
          )}

          {featured && (
            <Link href={`/student/requests/${featured.id}`}>
              <Card className="p-5 hover:border-navy-300 transition">
                <div className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.18em] text-muted">
                  <span>Active request</span>
                  <span className="font-mono">{featured.id}</span>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold text-[16px] lg:text-[18px] text-navy-900 leading-tight">{featured.title}</div>
                    <div className="text-[12px] text-muted mt-1.5">{featured.directorate}{featured.assignee && ` · ${featured.assignee}`}</div>
                    <div className="mt-2.5 flex items-center gap-1.5"><StatusPill status={featured.status} /></div>
                  </div>
                  <SlaRing elapsed={featured.elapsedHours} total={featured.slaHours} size={80} />
                </div>
                <div className="mt-4 pt-4 border-t border-line flex items-center justify-between text-[12px] text-muted">
                  <span>Updated {timeAgo(featured.updatedAt)}</span>
                  <span className="text-navy-800 font-medium inline-flex items-center gap-1">Open <ChevronRight className="w-3.5 h-3.5" /></span>
                </div>
              </Card>
            </Link>
          )}

          <section>
            <SectionTitle title="Submit a request" right={<Link href="/student/submit" className="text-[12px] text-navy-700 font-medium">All categories</Link>} />
            <Card>
              <div className="grid grid-cols-4 lg:grid-cols-4 divide-x divide-line border-b border-line">
                {CATEGORIES.slice(0, 4).map(c => (
                  <Link key={c.id} href={`/student/submit?cat=${c.id}`} className="flex flex-col items-center justify-center gap-2 py-4 px-2 hover:bg-mist transition text-center">
                    <div className="grid h-9 w-9 place-items-center rounded-md bg-navy-50 text-navy-800"><c.icon className="w-[18px] h-[18px]" strokeWidth={1.6} /></div>
                    <span className="text-[10.5px] font-medium text-navy-800 leading-tight">{c.short}</span>
                  </Link>
                ))}
              </div>
              <div className="grid grid-cols-4 lg:grid-cols-4 divide-x divide-line">
                {CATEGORIES.slice(4, 8).map(c => (
                  <Link key={c.id} href={`/student/submit?cat=${c.id}`} className="flex flex-col items-center justify-center gap-2 py-4 px-2 hover:bg-mist transition text-center">
                    <div className="grid h-9 w-9 place-items-center rounded-md bg-navy-50 text-navy-800"><c.icon className="w-[18px] h-[18px]" strokeWidth={1.6} /></div>
                    <span className="text-[10.5px] font-medium text-navy-800 leading-tight">{c.short}</span>
                  </Link>
                ))}
              </div>
            </Card>
          </section>

          <section>
            <SectionTitle title="Recent requests" right={<Link href="/student/requests" className="text-[12px] text-navy-700 font-medium">View all</Link>} />
            <Card className="divide-y divide-line">
              {requests.slice(0, 5).map(r => {
                const cat = getCategory(r.category);
                return (
                  <Link key={r.id} href={`/student/requests/${r.id}`} className="p-3.5 lg:p-4 flex items-center gap-3 hover:bg-mist transition">
                    <div className="grid h-10 w-10 place-items-center rounded-md bg-navy-50 text-navy-800 shrink-0"><cat.icon className="w-[18px] h-[18px]" strokeWidth={1.6} /></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium text-navy-900 truncate">{r.title}</div>
                      <div className="text-[11px] text-muted mt-0.5 font-mono">{r.id} · {cat.short} · {timeAgo(r.updatedAt)}</div>
                    </div>
                    <StatusPill status={r.status} />
                    <ChevronRight className="w-4 h-4 text-muted hidden lg:block" />
                  </Link>
                );
              })}
            </Card>
          </section>
        </div>

        {/* right column */}
        <div className="space-y-3 lg:space-y-6">
          <div className="grid grid-cols-2 gap-2.5 lg:gap-3">
            <Card className="p-3.5">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-muted">
                <GraduationCap className="w-3 h-3" /> Qalam
              </div>
              <div className="font-display text-[26px] font-semibold mt-1.5 text-navy-900 leading-none">{STUDENT.cgpa.toFixed(2)}</div>
              <div className="text-[11px] text-muted mt-1">CGPA · {STUDENT.semester} sem</div>
            </Card>
            <Link href="https://lms.nust.edu.pk/portal/" target="_blank">
              <Card className="p-3.5 hover:border-navy-300 transition">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-muted">
                  <BookOpen className="w-3 h-3" /> LMS
                </div>
                <div className="font-display text-[26px] font-semibold mt-1.5 text-navy-900 leading-none">{LMS.length}</div>
                <div className="text-[11px] text-muted mt-1">{LMS.filter(l => l.due).length} due this week</div>
              </Card>
            </Link>
          </div>

          <Card>
            <div className="px-4 pt-3.5 pb-2 flex items-center justify-between">
              <h2 className="text-[10.5px] uppercase tracking-[0.18em] text-muted font-semibold">Today on campus</h2>
              <Link href="/student/schedule" className="text-[11px] text-navy-700 font-medium">Full schedule</Link>
            </div>
            <div className="divide-y divide-line">
              {todaysClasses.length > 0 ? todaysClasses.map(s => (
                <div key={s.code + s.start} className="p-3.5 flex items-center gap-3">
                  <div className="text-center w-12 shrink-0">
                    <div className="text-[14px] font-display font-semibold text-navy-900 leading-none">{s.start}</div>
                    <div className="text-[10px] text-muted mt-0.5">{s.day}</div>
                  </div>
                  <div className="w-px h-9 bg-line" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[12.5px] font-medium text-navy-900 truncate">{s.course}</div>
                    <div className="text-[11px] text-muted">{s.code} · {s.room}</div>
                  </div>
                </div>
              )) : (
                <div className="p-8 text-center text-[13px] text-muted italic">No classes scheduled for today.</div>
              )}
            </div>
          </Card>

          <Card>
            <div className="px-4 pt-3.5 pb-2 flex items-center justify-between">
              <h2 className="text-[10.5px] uppercase tracking-[0.18em] text-muted font-semibold">Upcoming deadlines</h2>
              <Link href="https://lms.nust.edu.pk/portal/" target="_blank" className="text-[11px] text-navy-700 font-medium">LMS</Link>
            </div>
            <div className="divide-y divide-line">
              {LMS.filter(l => l.due).slice(0, 3).map((l, i) => (
                <div key={i} className="p-3.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-medium text-navy-900 leading-tight truncate">{l.title}</div>
                    <div className="text-[11px] text-muted mt-1 flex items-center gap-2">
                      <span>{l.course}</span>
                      <span>·</span>
                      <span className="capitalize">{l.type}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[12px] font-semibold text-navy-800">{timeUntil(l.due!)}</div>
                    <div className="text-[10px] text-muted mt-0.5">{fmt(l.due!).split(",")[0]}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 bg-navy-900 text-white border-navy-900">
            <div className="text-[10.5px] uppercase tracking-[0.18em] text-white/55 font-semibold">Need help?</div>
            <div className="font-display font-semibold text-[15px] mt-1">Submit a new request</div>
            <p className="text-[12px] text-white/65 mt-1.5 leading-relaxed">Most requests are sent directly to the right department and resolved within 24–72 hours.</p>
            <Link href="/student/submit" className="mt-3 inline-flex items-center gap-1.5 h-9 px-4 rounded-md bg-white text-navy-900 text-[12.5px] font-medium">
              Get started <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>
        </div>
      </div>

      <div className="text-center text-[10px] text-muted pt-8 pb-6 leading-relaxed lg:pt-12">
        Designed for NUST Students · Built by NUST students
      </div>
    </>
  );
}

function SectionTitle({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-2 px-1 lg:px-0">
      <h2 className="text-[10.5px] uppercase tracking-[0.18em] text-muted font-semibold">{title}</h2>
      {right}
    </div>
  );
}
