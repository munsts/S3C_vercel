"use client";
import { Card } from "@/components/ui";
import { STUDENT, QALAM } from "@/lib/mock";
import { Bell, Shield, Globe, Moon, ChevronRight, LogOut, FileText } from "lucide-react";
import Link from "next/link";

export default function Profile() {
  const settings = [
    { icon: FileText, label: "Documents", sub: "Transcripts, certificates, fee slips" },
    { icon: Bell, label: "Notifications", sub: "Push, email, in-app preferences" },
    { icon: Shield, label: "Privacy and data", sub: "What we store, export, delete" },
    { icon: Globe, label: "Language", sub: "English (UK)" },
    { icon: Moon, label: "Appearance", sub: "Match system" },
  ];
  return (
    <>
      {/* mobile header */}
      <header className="lg:hidden bg-navy-900 text-white px-5 pt-6 pb-8">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-md bg-white text-navy-900 font-display font-semibold text-[18px]">{STUDENT.avatar}</div>
          <div>
            <div className="font-display text-[18px] font-semibold leading-tight">{STUDENT.name}</div>
            <div className="text-[12px] text-white/65 font-mono mt-0.5">{STUDENT.cms}</div>
            <div className="text-[12px] text-white/65 mt-0.5">{STUDENT.program} · {STUDENT.semester} sem · CGPA {STUDENT.cgpa.toFixed(2)}</div>
          </div>
        </div>
      </header>

      {/* desktop header */}
      <div className="hidden lg:block mb-6">
        <h1 className="font-display text-[28px] font-semibold tracking-tight text-navy-900">Profile and settings</h1>
        <p className="text-[13px] text-muted mt-1">Manage your account, notifications and academic data.</p>
      </div>

      <div className="p-4 lg:p-0 -mt-4 lg:mt-0 lg:grid lg:grid-cols-3 lg:gap-6 space-y-3 lg:space-y-0">

        {/* left column */}
        <div className="lg:col-span-2 space-y-3 lg:space-y-6">
          <Card className="hidden lg:block p-6">
            <div className="flex items-center gap-5">
              <div className="grid h-16 w-16 place-items-center rounded-md bg-navy-900 text-white font-display font-semibold text-[22px]">{STUDENT.avatar}</div>
              <div className="flex-1">
                <div className="font-display text-[20px] font-semibold text-navy-900 leading-tight">{STUDENT.name}</div>
                <div className="text-[12px] text-muted font-mono mt-1">{STUDENT.cms}</div>
                <div className="text-[12px] text-muted mt-0.5">{STUDENT.program} · {STUDENT.semester} semester</div>
              </div>
              <div className="text-right">
                <div className="font-display text-[24px] font-semibold text-navy-900">{STUDENT.cgpa.toFixed(2)}</div>
                <div className="text-[10.5px] uppercase tracking-wider text-muted mt-1">Cumulative GPA</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 lg:p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10.5px] uppercase tracking-[0.18em] text-muted font-semibold">Current semester · Qalam</div>
              <Link href="https://qalam.nust.edu.pk/" target="_blank" className="text-[11.5px] text-navy-700 font-medium">Open Qalam</Link>
            </div>
            <table className="w-full text-[13px]">
              <tbody className="divide-y divide-line">
                {QALAM.map(q => (
                  <tr key={q.code}>
                    <td className="py-2.5 pr-2">
                      <div className="font-medium text-navy-900 leading-tight">{q.course}</div>
                      <div className="text-[11px] text-muted font-mono">{q.code}</div>
                    </td>
                    <td className="py-2.5 text-right text-[11px] text-muted whitespace-nowrap">{q.credits} CH</td>
                    <td className="py-2.5 text-right text-[11px] text-muted whitespace-nowrap hidden sm:table-cell">{q.semester}</td>
                    <td className="py-2.5 pl-3 text-right font-display font-semibold text-navy-800 w-10">{q.grade ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* right column */}
        <div className="space-y-3 lg:space-y-6">
          <Card className="divide-y divide-line">
            {settings.map(i => (
              <button key={i.label} className="w-full p-3.5 lg:p-4 flex items-center gap-3 text-left hover:bg-mist transition">
                <div className="grid h-9 w-9 place-items-center rounded-md bg-navy-50 text-navy-800"><i.icon className="w-4 h-4" strokeWidth={1.6} /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-navy-900">{i.label}</div>
                  <div className="text-[11px] text-muted truncate">{i.sub}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted" />
              </button>
            ))}
          </Card>

          <Link href="/" className="block">
            <Card className="p-3.5 lg:p-4 flex items-center gap-3 text-red-700 hover:bg-mist transition">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-red-50"><LogOut className="w-4 h-4" /></div>
              <div className="text-[13px] font-medium">Sign out</div>
            </Card>
          </Link>

          <div className="text-center text-[11px] text-muted py-3 leading-relaxed">
            Designed for NUST Students · Built by NUST students
          </div>
        </div>
      </div>
    </>
  );
}
