import Link from "next/link";
import { ArrowLeft, User, ShieldCheck, Activity, Globe } from "lucide-react";

export default function UserFlowsPage() {
  return (
    <main className="min-h-screen bg-paper text-ink pb-20">
      <header className="bg-white border-b border-line sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-navy-900 font-medium text-[14px] hover:text-navy-700 transition">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portal</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-navy-900 text-white font-display font-bold text-[13px]">S³C</div>
            <span className="font-display font-semibold text-navy-900">User Flows</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 mt-12">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-navy-900">Astrul: User Flows</h1>
        <p className="text-muted mt-4 text-lg">Visualizing the path from campus friction to resolution.</p>

        <section className="mt-16 space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-navy-900">1. Student Submission Flow</h2>
            </div>
            <div className="pl-13 border-l-2 border-line ml-5 space-y-6 pt-2">
              {[
                { step: "Entry", desc: "Student lands on the Home Dashboard." },
                { step: "Action", desc: "Taps the 'New Request' button." },
                { step: "Category Selection", desc: "Student selects a category (like Finance or Hostel)." },
                { step: "Description", desc: "Student types the issue and can add details." },
                { step: "Review", desc: "A quick review screen shows the summary." },
                { step: "Confirmation", desc: "Student submits and sees a success message with an ID." },
              ].map((s, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-navy-700" />
                  <div className="font-semibold text-navy-900">{s.step}</div>
                  <div className="text-[14px] text-muted">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-navy-900">2. Staff Triage and Chat Flow</h2>
            </div>
            <div className="pl-13 border-l-2 border-line ml-5 space-y-6 pt-2">
              {[
                { step: "Queue View", desc: "Staff opens the Queue and sees all active requests." },
                { step: "Selection", desc: "Staff taps a request title to open the details." },
                { step: "Engagement", desc: "Staff reads the description and taps 'Triage' to mark it as In Progress." },
                { step: "Conversation", desc: "Staff types a reply to the student in the chat box." },
                { step: "Resolution", desc: "Once fixed, staff taps 'Resolve' to close the request." },
              ].map((s, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-navy-700" />
                  <div className="font-semibold text-navy-900">{s.step}</div>
                  <div className="text-[14px] text-muted">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-navy-900">3. Real-Time Tracking Flow</h2>
            </div>
            <div className="pl-13 border-l-2 border-line ml-5 space-y-6 pt-2">
              {[
                { step: "Alert", desc: "Student receives a notification about a status change or a new message." },
                { step: "Navigation", desc: "Student taps the notification to go directly to the request page." },
                { step: "Information", desc: "Student sees the updated SLA ring and staff response." },
                { step: "Follow-up", desc: "Student can reply back in the chat if they have more questions." },
              ].map((s, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-navy-700" />
                  <div className="font-semibold text-navy-900">{s.step}</div>
                  <div className="text-[14px] text-muted">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-navy-900">4. Academic Check Flow</h2>
            </div>
            <div className="pl-13 border-l-2 border-line ml-5 space-y-6 pt-2">
              {[
                { step: "Home", desc: "Student opens the app." },
                { step: "Quick View", desc: "Student sees their current GPA and next class immediately." },
                { step: "Deadlines", desc: "Student scrolls down to see LMS assignments due today." },
              ].map((s, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-navy-700" />
                  <div className="font-semibold text-navy-900">{s.step}</div>
                  <div className="text-[14px] text-muted">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
