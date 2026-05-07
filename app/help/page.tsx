"use client";
import Link from "next/link";
import { useState } from "react";
import { Search, ChevronRight, Mail, Phone, MapPin, MessageCircle, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui";

const CATEGORIES = [
  { id: "account", label: "Account & Access", desc: "LMS, Qalam, and CMS login issues", icon: MessageCircle },
  { id: "academic", label: "Academic Support", desc: "Transcripts, registration, and exams", icon: MessageCircle },
  { id: "finance", label: "Fees & Finance", desc: "Vouchers, refunds, and scholarships", icon: MessageCircle },
  { id: "campus", label: "Campus Life", desc: "Hostel, transport, and medical services", icon: MessageCircle },
];

const FAQS = [
  { q: "How do I reset my CMS password?", a: "Visit the ICT Directorate in the Main Admin block or use the 'Reset Password' link on the login page. You will need your university email access.", cat: "account" },
  { q: "What is the standard SLA for transcripts?", a: "Standard transcript issuance takes 72 business hours. You can request 'Express' processing for a fee which reduces it to 24 hours.", cat: "academic" },
  { q: "My fee voucher is incorrect.", a: "If your scholarship is not reflected, please submit a 'Finance / Fee' request on the portal with your scholarship award letter attached.", cat: "finance" },
  { q: "How do I apply for a hostel room change?", a: "Submit a request under 'Hostel / Transport'. Changes are subject to availability and warden approval, usually processed within 96 hours.", cat: "campus" },
];

export default function HelpPage() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const filteredFaqs = FAQS.filter(f =>
    (activeCat ? f.cat === activeCat : true) &&
    (query ? f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase()) : true)
  );

  return (
    <main className="min-h-screen bg-paper">
      {/* Header */}
      <header className="bg-white border-b border-line sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-navy-900 font-medium text-[14px] hover:text-navy-700 transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Login</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-navy-900 text-white font-display font-bold text-[13px]">S³C</div>
            <span className="font-display font-semibold text-navy-900 hidden sm:inline">Support Centre</span>
          </div>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-navy-900 text-white py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-[32px] sm:text-[44px] font-semibold tracking-tight leading-tight">How can we help?</h1>
          <p className="text-white/60 mt-4 text-[15px] sm:text-[17px]">Search our knowledge base or browse categories below</p>

          <div className="mt-8 relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              placeholder="Search for articles, topics, keywords..."
              className="w-full h-14 pl-12 pr-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/15 focus:border-white/20 transition text-[15px] sm:text-[16px]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCat(activeCat === c.id ? null : c.id)}
              className={`p-5 rounded-xl border text-left transition ${activeCat === c.id ? "bg-navy-900 border-navy-900 text-white shadow-xl" : "bg-white border-line text-navy-900 hover:border-navy-200"
                }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${activeCat === c.id ? "bg-white/20" : "bg-navy-50 text-navy-700"}`}>
                <c.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-[16px]">{c.label}</h3>
              <p className={`text-[12.5px] mt-1.5 leading-relaxed ${activeCat === c.id ? "text-white/70" : "text-muted"}`}>{c.desc}</p>
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-[22px] font-semibold text-navy-900">
              {activeCat ? CATEGORIES.find(c => c.id === activeCat)?.label : "Frequently Asked Questions"}
            </h2>
            {activeCat && (
              <button onClick={() => setActiveCat(null)} className="text-[12px] font-bold text-navy-700 hover:underline uppercase tracking-wider">Show all</button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFaqs.length > 0 ? filteredFaqs.map((f, i) => (
              <Card key={i} className="p-5 sm:p-6 hover:shadow-lg transition group">
                <h4 className="font-display font-semibold text-navy-900 group-hover:text-navy-700 flex items-start gap-3">
                  <span className="text-navy-300 font-mono mt-0.5">Q.</span>
                  {f.q}
                </h4>
                <p className="text-[14px] text-muted mt-3 leading-relaxed ml-7">
                  {f.a}
                </p>
              </Card>
            )) : (
              <div className="col-span-2 py-12 text-center bg-mist rounded-xl border border-dashed border-line">
                <p className="text-muted">No matching articles found for "{query}"</p>
                <button onClick={() => { setQuery(""); setActiveCat(null) }} className="text-navy-900 font-semibold mt-2 hover:underline">Clear all filters</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-mist border-t border-line py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-[28px] font-semibold text-navy-900">Still need help?</h2>
            <p className="text-muted mt-2">Our support team is available Mon–Fri, 9:00 AM – 5:00 PM</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="p-6 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white border border-line flex items-center justify-center text-navy-900 mb-4 shadow-sm">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-navy-900 text-[15px]">Email us</h3>
              <p className="text-[13px] text-muted mt-1">Response within 24h</p>
              <a href="mailto:s3c@nust.edu.pk" className="text-navy-700 font-medium mt-3 hover:underline">s3c@nust.edu.pk</a>
            </Card>
            <Card className="p-6 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white border border-line flex items-center justify-center text-navy-900 mb-4 shadow-sm">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-navy-900 text-[15px]">Call support</h3>
              <p className="text-[13px] text-muted mt-1">Mon–Fri, 9am–5pm</p>
              <a href="tel:+925111111111" className="text-navy-700 font-medium mt-3 hover:underline">+92 51 111-111-111</a>
            </Card>
            <Card className="p-6 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white border border-line flex items-center justify-center text-navy-900 mb-4 shadow-sm">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-navy-900 text-[15px]">Visit us</h3>
              <p className="text-[13px] text-muted mt-1">S³C Help Desk</p>
              <p className="text-navy-900 font-medium mt-3">Admin Block, H-12 Campus</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-line text-center text-[12px] text-muted px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Student Support Services Centre · NUST</p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-navy-900 transition">About</Link>
            <Link href="/docs/flows" className="hover:text-navy-900 transition">Portal Guide</Link>
            <Link href="/" className="hover:text-navy-900 transition">Portal Login</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
