"use client";
import { Card, PageHeader } from "@/components/ui";
import { SCHEDULE } from "@/lib/mock";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function FullSchedule() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
  return (
    <div className="px-4 lg:px-0">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/student/home" className="grid h-9 w-9 place-items-center rounded-md border border-line bg-white hover:bg-mist transition">
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <PageHeader title="Full Class Schedule" sub="Monday — Friday · NBS · Spring 2026" />
      </div>

      <div className="space-y-8 pb-12">
        {days.map(day => {
          const classes = SCHEDULE.filter(s => s.day === day);
          return (
            <section key={day}>
              <h2 className="text-[11px] uppercase tracking-[0.2em] text-muted font-bold mb-4 px-1">{day}</h2>
              <Card className="divide-y divide-line">
                {classes.length > 0 ? classes.map(s => (
                  <div key={s.code + s.start} className="p-4 lg:p-5 flex items-center gap-4 lg:gap-6">
                    <div className="text-center w-16 shrink-0">
                      <div className="text-[16px] font-display font-semibold text-navy-900 leading-none">{s.start}</div>
                      <div className="text-[10px] text-muted mt-1">{s.end}</div>
                    </div>
                    <div className="w-px h-10 bg-line" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] lg:text-[15px] font-semibold text-navy-900 leading-tight">{s.course}</div>
                      <div className="text-[12px] text-muted mt-1">{s.code} · {s.room}</div>
                    </div>
                  </div>
                )) : (
                  <div className="p-6 text-center text-[13px] text-muted italic bg-mist/30">No classes scheduled.</div>
                )}
              </Card>
            </section>
          );
        })}
      </div>
    </div>
  );
}
