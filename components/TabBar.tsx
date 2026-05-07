"use client";
import { Home, Inbox, Plus, BookOpen, User } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function TabBar() {
  const path = usePathname() ?? "";
  const items = [
    { href: "/student/home", label: "Home", icon: Home },
    { href: "/student/requests", label: "Requests", icon: Inbox },
    { href: "/student/submit", label: "New", icon: Plus, primary: true },
    { href: "/student/kb", label: "Help", icon: BookOpen },
    { href: "/student/profile", label: "Profile", icon: User },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-line shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
      <div className="flex items-stretch h-16 px-1">
        {items.map(i => {
          const active = path.startsWith(i.href);
          if (i.primary) {
            return (
              <Link key={i.href} href={i.href} className="flex-1 flex items-center justify-center">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-navy-900 text-white shadow-[0_8px_24px_rgba(10,31,68,0.25)]">
                  <i.icon className="w-5 h-5" />
                </span>
              </Link>
            );
          }
          return (
            <Link key={i.href} href={i.href} className={cn(
              "flex-1 flex flex-col items-center justify-center gap-1 transition",
              active ? "text-navy-900" : "text-muted"
            )}>
              <i.icon className="w-[20px] h-[20px]" strokeWidth={active ? 2.2 : 1.7} />
              <span className="text-[10px] font-medium tracking-wide">{i.label}</span>
              {active && <span className="absolute top-0 h-0.5 w-10 rounded-full bg-navy-900" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
