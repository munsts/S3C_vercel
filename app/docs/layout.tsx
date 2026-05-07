"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/docs/design-system", label: "Design system", short: "Design" },
  { href: "/docs/flows", label: "User flows", short: "Flows" },
  { href: "/docs/rationale", label: "Rationale", short: "Why" },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname() ?? "";
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-paper sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 h-14 flex items-center gap-3 sm:gap-6">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-navy-900 text-white font-display font-bold text-[12px] shrink-0">S³C</div>
            <div className="text-[12.5px] sm:text-[13px] font-display font-semibold text-navy-900 truncate">S³C · Documentation</div>
          </Link>

          {/* Desktop nav */}
          <nav className="ml-auto hidden md:flex items-center gap-5 text-[12.5px]">
            {NAV.map(n => (
              <Link key={n.href} href={n.href} className={cn(
                "hover:text-navy-900",
                path.startsWith(n.href) ? "text-navy-900 font-semibold" : "text-navy-800"
              )}>{n.label}</Link>
            ))}
            <Link href="/" className="text-muted hover:text-navy-800">← Back to portal</Link>
          </nav>

          {/* Mobile menu toggle */}
          <button onClick={() => setOpen(o => !o)} className="md:hidden ml-auto grid h-10 w-10 place-items-center rounded-md hover:bg-mist" aria-label="Menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden border-t border-line bg-paper">
            <nav className="max-w-6xl mx-auto px-4 py-2 flex flex-col">
              {NAV.map(n => {
                const active = path.startsWith(n.href);
                return (
                  <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className={cn(
                    "h-11 px-2 flex items-center text-[13.5px] rounded-md",
                    active ? "text-navy-900 font-semibold bg-mist" : "text-navy-800"
                  )}>{n.label}</Link>
                );
              })}
              <Link href="/" onClick={() => setOpen(false)} className="h-11 px-2 flex items-center gap-2 text-[13px] text-muted border-t border-line mt-1 pt-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to portal
              </Link>
            </nav>
          </div>
        )}
      </header>
      {children}
    </div>
  );
}
