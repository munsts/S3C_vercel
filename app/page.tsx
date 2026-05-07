import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Entry() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-screen">

        {/* branding header, sticky on mobile */}
        <header className="lg:hidden bg-navy-900 text-white px-6 py-5 flex items-center gap-3 shrink-0">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-white text-navy-900 font-display font-bold text-[14px]">S³C</div>
          <div className="leading-tight">
            <div className="font-display font-semibold text-[15px]">Student Support Services Centre</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">National University of Sciences and Technology</div>
          </div>
        </header>

        {/* sign in section */}
        <section className="px-6 py-10 lg:px-16 lg:py-20 flex flex-col bg-white lg:order-2 border-b border-line lg:border-none">
          <div className="hidden lg:flex items-center justify-end gap-6 text-[12px] font-bold uppercase tracking-wider text-muted lg:mb-0">
            <Link href="/help" className="hover:text-navy-800 transition">Need help?</Link>
            <Link href="/staff/queue" className="hover:text-navy-800 transition">Staff sign-in</Link>
          </div>

          <div className="lg:my-auto max-w-md w-full mx-auto">
            <div className="text-[10.5px] sm:text-[11px] uppercase tracking-[0.2em] text-muted">Sign in</div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mt-2 text-navy-900">Continue with NUST CMS</h2>

            <form className="mt-6 sm:mt-8 space-y-4">
              <div>
                <label htmlFor="cms" className="text-[11px] font-semibold uppercase tracking-wider text-muted">CMS ID</label>
                <input id="cms" defaultValue="516612" inputMode="numeric" className="mt-1.5 w-full h-12 px-3.5 rounded-md border border-line bg-white text-[15px] focus:outline-none focus:border-navy-700 transition shadow-sm" />
              </div>
              <div>
                <label htmlFor="pwd" className="text-[11px] font-semibold uppercase tracking-wider text-muted">Password</label>
                <input id="pwd" type="password" defaultValue="••••••••••" className="mt-1.5 w-full h-12 px-3.5 rounded-md border border-line bg-white text-[15px] focus:outline-none focus:border-navy-700 transition shadow-sm" />
              </div>
              <Link href="/student/home" className="mt-4 w-full h-12 inline-flex items-center justify-center gap-2 rounded-md bg-navy-900 text-white text-[14px] font-medium hover:bg-navy-800 transition shadow-md">
                Sign in <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center justify-between text-[12px] pt-1">
                <label className="flex items-center gap-2 text-navy-900"><input type="checkbox" className="rounded" /> Remember device</label>
                <a href="#" className="text-navy-700 hover:underline font-medium">Reset</a>
              </div>
            </form>

            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-line text-[11.5px] sm:text-[12px] text-muted">
              <p>By signing in you accept the NUST IT acceptable use policy and agree to receive transactional notifications related to your service requests.</p>

              <div className="lg:hidden flex items-center justify-between gap-6 text-[11px] font-bold uppercase tracking-wider text-navy-700/60 mt-8">
                <Link href="/help" className="hover:text-navy-800 transition">Need help?</Link>
                <Link href="/staff/queue" className="hover:text-navy-800 transition">Staff sign-in</Link>
              </div>
            </div>
          </div>
        </section>

        {/* hero and branding panel */}
        <section className="relative bg-navy-900 text-white px-6 py-10 lg:px-16 lg:py-14 flex flex-col lg:order-1">
          {/* desktop branding only */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-white text-navy-900 font-display font-bold text-[14px]">S³C</div>
            <div className="leading-tight">
              <div className="font-display font-semibold text-[15px]">Student Support Services Centre</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">National University of Sciences and Technology</div>
            </div>
          </div>

          <div className="mt-4 lg:mt-auto pt-4 sm:pt-16">
            <h1 className="font-display text-[32px] lg:text-[56px] leading-[1.1] font-semibold tracking-tight max-w-xl">
              One portal for every campus service.
            </h1>
            <p className="text-white/70 max-w-md mt-5 text-[14px] lg:text-[15px] leading-relaxed">
              Submit, track, and resolve academic, financial, hostel, ICT and welfare requests from one place. Replaces office visits and email chains across eight directorates.
            </p>
          </div>

          <dl className="grid grid-cols-3 gap-x-8 gap-y-2 mt-12 max-w-md">
            <div className="border-t border-white/15 pt-4">
              <dt className="font-display text-[24px] sm:text-[28px] font-semibold">8</dt>
              <dd className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/55 mt-1">Directorates</dd>
            </div>
            <div className="border-t border-white/15 pt-4">
              <dt className="font-display text-[24px] sm:text-[28px] font-semibold">24<span className="text-white/40 text-[16px] sm:text-[18px]">h</span></dt>
              <dd className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/55 mt-1">Service SLA</dd>
            </div>
            <div className="border-t border-white/15 pt-4">
              <dt className="font-display text-[24px] sm:text-[28px] font-semibold">CMS</dt>
              <dd className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/55 mt-1">SSO</dd>
            </div>
          </dl>

          <footer className="mt-16 lg:mt-auto pt-8 border-t border-white/10 text-[11px] text-white/45 flex flex-wrap gap-x-6 gap-y-2">
            <span>© NUST 2026</span>
            <Link href="/about" className="hover:text-white/80">About</Link>
            <Link href="/docs/design-system" className="hover:text-white/80">Design system</Link>
            <Link href="/docs/flows" className="hover:text-white/80">User flows</Link>
            <a href="mailto:s3c@nust.edu.pk" className="hover:text-white/80">Contact</a>
          </footer>
        </section>

      </div>
    </main>
  );
}
