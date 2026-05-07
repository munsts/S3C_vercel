"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Inbox, Plus, BookOpen, User, Bell, LogOut } from "lucide-react";
import { STUDENT } from "@/lib/mock";
import { cn } from "@/lib/utils";

export function StudentSidebar() {
  const path = usePathname() ?? "";
  const nav = [
    { href: "/student/home", label: "Home", icon: Home },
    { href: "/student/requests", label: "Requests", icon: Inbox },
    { href: "/student/submit", label: "New request", icon: Plus },
    { href: "https://lms.nust.edu.pk/portal/", label: "LMS Portal", icon: BookOpen, external: true },
    { href: "/student/kb", label: "Help center", icon: BookOpen },
    { href: "/student/notifications", label: "Notifications", icon: Bell },
    { href: "/student/profile", label: "Profile", icon: User },
  ];
  return (
    <aside className="w-64 shrink-0 bg-white border-r border-line flex flex-col h-screen sticky top-0">
      <Link href="/" className="px-5 h-16 flex items-center gap-2.5 border-b border-line">
        <div className="grid h-8 w-8 place-items-center rounded-md bg-navy-900 text-white font-display font-bold text-[12px]">S³C</div>
        <div className="leading-tight">
          <div className="font-display font-semibold text-[13.5px] text-navy-900">S³C Portal</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted">NUST Student</div>
        </div>
      </Link>
      <nav className="px-2 py-3 space-y-0.5 flex-1 overflow-y-auto min-h-0">
        {nav.map(n => {
          const active = path.startsWith(n.href);
          return (
            <Link 
              key={n.href} 
              href={n.href} 
              target={n.external ? "_blank" : undefined}
              className={cn(
                "flex items-center gap-3 h-10 px-3 rounded-md text-[13px] transition",
                active ? "bg-navy-50 text-navy-900 font-medium" : "text-navy-700 hover:bg-mist"
              )}
            >
              <n.icon className="w-4 h-4" strokeWidth={active ? 2 : 1.7} /> {n.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-line space-y-2 bg-white shrink-0">
        <div className="flex items-center gap-3 px-2">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-navy-900 text-white font-display font-semibold text-[12px]">{STUDENT.avatar}</div>
          <div className="text-[12px] leading-tight min-w-0">
            <div className="font-medium text-navy-900 truncate">{STUDENT.name}</div>
            <div className="text-muted font-mono truncate">{STUDENT.cms}</div>
          </div>
        </div>
        <Link href="/" className="flex items-center gap-2 h-9 px-3 rounded-md text-[12.5px] text-muted hover:bg-mist hover:text-navy-900 transition">
          <LogOut className="w-3.5 h-3.5" /> Sign out
        </Link>
      </div>
    </aside>
  );
}
