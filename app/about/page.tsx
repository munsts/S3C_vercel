import Link from "next/link";
import { Card } from "@/components/ui";
import { ArrowRight, Building2, Users2, ShieldCheck, HeartPulse } from "lucide-react";

export default function About() {
  return (
    <main className="min-h-screen bg-paper">
      <header className="border-b border-line bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-navy-900 text-white font-display font-bold text-[12px]">S³C</div>
            <div className="text-[14px] font-display font-semibold text-navy-900">Student Support Services Centre</div>
          </Link>
          <Link href="/" className="text-[12px] font-medium text-navy-700 hover:underline">← Back to Portal</Link>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
        <header className="text-center mb-16">
          <div className="text-[11px] uppercase tracking-[0.2em] text-muted mb-4">Our Mission</div>
          <h1 className="font-display text-[32px] sm:text-[48px] font-semibold tracking-tight text-navy-900 leading-[1.1]">
            Standardising campus support for every student.
          </h1>
          <p className="text-[16px] sm:text-[18px] text-muted mt-6 max-w-2xl mx-auto leading-relaxed">
            The Student Support Services Centre (S³C) is a single-window facility designed to consolidate administrative, welfare, and financial services into one seamless digital experience.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-6 mb-20">
          <Card className="p-6">
            <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center text-navy-900 mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-navy-900 text-[18px]">Unified Desk</h3>
            <p className="text-[14px] text-muted mt-2 leading-relaxed">
              No more visiting multiple offices across campus. We coordinate between Registrar, Finance, and ICT so you don't have to.
            </p>
          </Card>
          <Card className="p-6">
            <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center text-navy-900 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-navy-900 text-[18px]">SLA Committed</h3>
            <p className="text-[14px] text-muted mt-2 leading-relaxed">
              Every request comes with a transparency promise. We track response times across all departments to ensure your issues are resolved within 24 to 96 hours.
            </p>
          </Card>
          <Card className="p-6">
            <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center text-navy-900 mb-4">
              <Users2 className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-navy-900 text-[18px]">Human-Centric</h3>
            <p className="text-[14px] text-muted mt-2 leading-relaxed">
              While our system is digital, our support is personal. Every request is reviewed by a Senior Navigator from the S³C team.
            </p>
          </Card>
          <Card className="p-6">
            <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center text-navy-900 mb-4">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-navy-900 text-[18px]">Student Welfare</h3>
            <p className="text-[14px] text-muted mt-2 leading-relaxed">
              From counselling appointments to financial aid, our priority is ensuring students have the resources they need to thrive at NUST.
            </p>
          </Card>
        </div>

        <section className="border-t border-line pt-16">
          <h2 className="font-display text-[24px] font-semibold text-navy-900 mb-6">Our Core Directorates</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Registrar Office", "Finance", "Hostel & Transport", "ICT", "Career Services", "Student Affairs", "Medical Centre", "S³C Triage"].map(d => (
              <div key={d} className="p-3 bg-mist rounded border border-line text-[12px] font-medium text-navy-800 text-center">{d}</div>
            ))}
          </div>
        </section>

        <footer className="mt-20 pt-10 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-6 text-[13px] text-muted">
          <p>© 2026 National University of Sciences and Technology</p>
          <Link href="/" className="flex items-center gap-2 text-navy-900 font-semibold group">
            Go to Student Portal <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </footer>
      </article>
    </main>
  );
}
