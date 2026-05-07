import Link from "next/link";
import { ArrowLeft, Palette, Type, Box, Zap } from "lucide-react";

export default function DesignSystemPage() {
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
            <span className="font-display font-semibold text-navy-900">Design System</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 mt-12">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-navy-900">Astrul: Design System</h1>
        <p className="text-muted mt-4 text-lg">A framework for functional calm and campus efficiency.</p>

        <section className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-navy-700" />
            <h2 className="font-display text-2xl font-semibold text-navy-900">1. Visual Identity</h2>
          </div>
          <p className="text-muted leading-relaxed">Our design is based on the idea of "Functional Calm." We use a very limited color palette to keep the focus on student needs and tasks.</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="space-y-2">
              <div className="h-24 rounded-xl bg-navy-900 shadow-sm border border-line" />
              <div className="font-semibold text-[13px]">Navy</div>
              <div className="text-[11px] text-muted font-mono uppercase">#001F3F</div>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-xl bg-paper shadow-sm border border-line" />
              <div className="font-semibold text-[13px]">Paper</div>
              <div className="text-[11px] text-muted font-mono uppercase">#F9FAFB</div>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-xl bg-mist shadow-sm border border-line" />
              <div className="font-semibold text-[13px]">Mist</div>
              <div className="text-[11px] text-muted font-mono uppercase">#F3F4F6</div>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-xl bg-ink shadow-sm border border-line" />
              <div className="font-semibold text-[13px]">Ink</div>
              <div className="text-[11px] text-muted font-mono uppercase">#111827</div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <Type className="w-6 h-6 text-navy-700" />
            <h2 className="font-display text-2xl font-semibold text-navy-900">2. Typography</h2>
          </div>
          <div className="space-y-6">
            <div>
              <div className="text-muted text-[12px] uppercase tracking-wider font-bold mb-2">Heading L</div>
              <div className="font-display text-3xl font-semibold text-navy-900">The quick brown fox jumps over the lazy dog</div>
            </div>
            <div>
              <div className="text-muted text-[12px] uppercase tracking-wider font-bold mb-2">Body Text</div>
              <div className="text-[15px] leading-relaxed">We use Geist Sans for its clarity and modern look. Body type stays at 14 px or larger; touch targets are always at least 44 px.</div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <Box className="w-6 h-6 text-navy-700" />
            <h2 className="font-display text-2xl font-semibold text-navy-900">3. UI Components</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-8 bg-white rounded-2xl border border-line shadow-sm">
              <div className="w-full h-12 bg-navy-900 rounded-md flex items-center justify-center text-white font-medium text-[14px]">Primary Button</div>
              <p className="mt-4 text-[13px] text-muted text-center">Large touch targets for mobile efficiency.</p>
            </div>
            <div className="p-8 bg-white rounded-2xl border border-line shadow-sm flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-[3px] border-yellow-500 border-t-transparent animate-spin" />
              <p className="mt-4 text-[13px] text-muted text-center">SLA Rings use status colors for urgency.</p>
            </div>
          </div>
        </section>

        <section className="mt-16 pt-16 border-t border-line">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-navy-700" />
            <h2 className="font-display text-2xl font-semibold text-navy-900">4. Design Principles</h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <li className="space-y-2">
              <div className="font-semibold text-navy-900">Consistency First</div>
              <p className="text-[14px] text-muted leading-relaxed">The same icons and colors mean the same thing everywhere in the app.</p>
            </li>
            <li className="space-y-2">
              <div className="font-semibold text-navy-900">Clear Hierarchy</div>
              <p className="text-[14px] text-muted leading-relaxed">The most important information is always at the top of the visual stack.</p>
            </li>
            <li className="space-y-2">
              <div className="font-semibold text-navy-900">No Decoration</div>
              <p className="text-[14px] text-muted leading-relaxed">If an element does not help the user complete a task, we remove it.</p>
            </li>
            <li className="space-y-2">
              <div className="font-semibold text-navy-900">Mobile First</div>
              <p className="text-[14px] text-muted leading-relaxed">Designed for thumb interaction and patchy connectivity.</p>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
