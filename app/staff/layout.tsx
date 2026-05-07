"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Inbox, AlertTriangle, BarChart3, UserPlus, Search, Bell, Menu, X, MessageSquare, Clock } from "lucide-react";
import { STAFF } from "@/lib/mock";
import { cn, timeAgo } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useRequests } from "@/lib/store";

const NAV = [
  { href: "/staff/queue", label: "Queue", short: "Queue", icon: Inbox },
  { href: "/staff/sla", label: "SLA monitor", short: "SLA", icon: AlertTriangle, badge: 3 },
  { href: "/staff/dashboard", label: "Performance", short: "Stats", icon: BarChart3 },
  { href: "/staff/walkin", label: "Walk-in intake", short: "Walk-in", icon: UserPlus },
];

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname() ?? "";
  const router = useRouter();
  const { requests } = useRequests();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // staff notifications
  const staffNotifications = requests.flatMap(r => [
    ...r.events.slice(-1).map(e => ({
      requestId: r.id,
      title: "Status Update",
      body: `${r.id}: ${e.label}`,
      time: timeAgo(e.at),
      at: e.at,
      type: "info"
    })),
    ...(r.messages || [])
      .filter(m => m.sender === "student")
      .map(m => ({
        requestId: r.id,
        title: "New Student Reply",
        body: `${r.id}: ${m.text.substring(0, 40)}...`,
        time: timeAgo(m.at),
        at: m.at,
        type: "message"
      }))
  ]).sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()).slice(0, 8);

  const searchResults = query ? requests
    .filter(r => r.title.toLowerCase().includes(query.toLowerCase()) || r.id.toLowerCase().includes(query.toLowerCase()))
    .map(r => ({ id: r.id, title: r.title, type: "Request" }))
    .slice(0, 5) : [];

  return (
    <div className="min-h-screen bg-mist text-ink lg:flex">
      {/* desktop sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 bg-navy-900 text-white flex-col">
        <Link href="/" className="px-5 h-16 flex items-center gap-2.5 border-b border-white/10">
          <div className="grid h-8 w-8 place-items-center rounded-md bg-white text-navy-900 font-display font-bold text-[13px]">S³C</div>
          <div className="leading-tight">
            <div className="font-display font-semibold text-[13.5px]">S³C Operations</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">NUST Internal</div>
          </div>
        </Link>
        <nav className="px-2 py-3 space-y-0.5">
          {NAV.map(n => {
            const active = path.startsWith(n.href);
            return (
              <Link key={n.href} href={n.href} className={cn(
                "flex items-center gap-3 h-10 px-3 rounded-md text-[13px] transition",
                active ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
              )}>
                <n.icon className="w-4 h-4" strokeWidth={1.7} /> {n.label}
                {n.badge && <span className="ml-auto text-[10px] bg-red-500 text-white px-1.5 h-4 inline-flex items-center rounded font-semibold">{n.badge}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-white text-navy-900 font-display font-semibold text-[12px]">{STAFF.avatar}</div>
            <div className="text-[12px] leading-tight min-w-0">
              <div className="font-medium truncate">{STAFF.name}</div>
              <div className="text-white/50 truncate">{STAFF.role}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-navy-900/60" onClick={() => setOpen(false)} />
          <aside className="relative w-72 max-w-[80%] bg-navy-900 text-white flex flex-col">
            <div className="px-5 h-14 flex items-center justify-between border-b border-white/10">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-md bg-white text-navy-900 font-display font-bold text-[13px]">S³C</div>
                <div className="leading-tight">
                  <div className="font-display font-semibold text-[13.5px]">S³C Operations</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">NUST Internal</div>
                </div>
              </Link>
              <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-md hover:bg-white/10"><X className="w-4 h-4" /></button>
            </div>
            <nav className="px-2 py-3 space-y-0.5">
              {NAV.map(n => {
                const active = path.startsWith(n.href);
                return (
                  <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className={cn(
                    "flex items-center gap-3 h-11 px-3 rounded-md text-[13.5px] transition",
                    active ? "bg-white/10 text-white" : "text-white/65 hover:text-white hover:bg-white/5"
                  )}>
                    <n.icon className="w-4 h-4" strokeWidth={1.7} /> {n.label}
                    {n.badge && <span className="ml-auto text-[10px] bg-red-500 text-white px-1.5 h-4 inline-flex items-center rounded font-semibold">{n.badge}</span>}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto px-3 py-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy-900 font-display font-semibold text-[12px]">{STAFF.avatar}</div>
                <div className="text-[12px] leading-tight min-w-0">
                  <div className="font-medium truncate">{STAFF.name}</div>
                  <div className="text-white/50 truncate">{STAFF.role}</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      <main className="flex-1 min-w-0 flex flex-col pb-16 lg:pb-0">
        {/* mobile top bar */}
        <header className="lg:hidden h-14 bg-white border-b border-line px-3 flex items-center gap-2 sticky top-0 z-30">
          <button onClick={() => setOpen(true)} className="grid h-10 w-10 place-items-center rounded-md hover:bg-mist"><Menu className="w-5 h-5" /></button>
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-navy-900 text-white font-display font-bold text-[11px]">S³C</div>
            <span className="font-display font-semibold text-[13px] text-navy-900 truncate">S³C Operations</span>
          </Link>
          <div className="ml-auto flex items-center gap-1">
            <button className="grid h-10 w-10 place-items-center rounded-md hover:bg-mist" onClick={() => setNotifOpen(!notifOpen)}><Bell className="w-4 h-4" /></button>
          </div>
        </header>

        <header className="hidden lg:flex h-16 bg-white border-b border-line px-6 items-center gap-4">
          <div className="flex-1 max-w-md relative">
            <div className="flex items-center gap-2.5 h-9 px-3 rounded-md bg-mist border border-line focus-within:border-navy-900/30 transition">
              <Search className="w-4 h-4 text-muted" />
              <input 
                placeholder="Search requests, students, directorates" 
                className="flex-1 bg-transparent text-[13px] focus:outline-none" 
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
              />
              <kbd className="text-[10px] text-muted bg-white px-1.5 py-0.5 rounded border border-line">⌘K</kbd>
            </div>
            
            {searchOpen && query && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setSearchOpen(false)} />
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl border border-line p-2 z-50">
                  <div className="text-[10px] uppercase font-bold text-muted px-2 py-1.5">Quick results</div>
                  {searchResults.length > 0 ? searchResults.map(r => (
                    <Link key={r.id} href={`/staff/queue/${r.id}`} onClick={() => setSearchOpen(false)} className="w-full flex items-center justify-between p-2 hover:bg-mist rounded text-[13px] text-left group">
                      <span className="flex items-center gap-2 font-medium text-navy-900"><Search className="w-3.5 h-3.5 text-muted" /> {r.title}</span>
                      <span className="text-[10px] bg-navy-50 text-navy-600 px-1.5 rounded font-mono">{r.id}</span>
                    </Link>
                  )) : (
                    <div className="p-4 text-center text-muted text-[13px]">No results found for "{query}"</div>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-3 text-[12px] text-muted relative">
            <button 
              onClick={() => setNotifOpen(!notifOpen)}
              className={cn("grid h-9 w-9 place-items-center rounded-md transition relative", notifOpen ? "bg-mist text-navy-900" : "hover:bg-mist")}
            >
              <Bell className="w-4 h-4" />
              {hydrated && staffNotifications.length > 0 && <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-500" />}
            </button>

            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-line overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 bg-mist border-b border-line flex items-center justify-between">
                    <span className="font-display font-semibold text-navy-900">Notifications</span>
                    {hydrated && <span className="text-[10px] bg-navy-900 text-white px-1.5 rounded-full">{staffNotifications.length}</span>}
                  </div>
                  <div className="divide-y divide-line max-h-[400px] overflow-y-auto">
                    {hydrated && staffNotifications.length > 0 ? staffNotifications.map((n, i) => (
                      <Link 
                        key={i} 
                        href={`/staff/queue/${n.requestId}`}
                        onClick={() => setNotifOpen(false)}
                        className="p-4 block hover:bg-mist/50 transition"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className={cn("text-[13px] font-semibold", n.type === "message" ? "text-amber-700" : "text-navy-900")}>{n.title}</div>
                          <div className="text-[10px] text-muted whitespace-nowrap">{n.time}</div>
                        </div>
                        <div className="text-[12px] text-muted mt-1 leading-snug">{n.body}</div>
                      </Link>
                    )) : (
                      <div className="p-8 text-center text-muted text-[13px]">No new updates.</div>
                    )}
                  </div>
                  <button className="w-full py-2.5 text-[11px] font-bold text-navy-700 hover:bg-mist border-t border-line uppercase tracking-wider">Mark all as read</button>
                </div>
              </>
            )}
            
            <div className="text-[12px] text-navy-900 ml-2">{STAFF.team}</div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 flex-1">{children}</div>
      </main>

      {/* mobile tab bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-line">
        <div className="flex items-stretch h-16">
          {NAV.map(n => {
            const active = path.startsWith(n.href);
            return (
              <Link key={n.href} href={n.href} className={cn(
                "flex-1 flex flex-col items-center justify-center gap-1 relative transition",
                active ? "text-navy-900" : "text-muted"
              )}>
                <n.icon className="w-5 h-5" strokeWidth={active ? 2.2 : 1.7} />
                <span className="text-[10px] font-medium tracking-wide">{n.short}</span>
                {n.badge && <span className="absolute top-2 right-[26%] text-[9px] bg-red-500 text-white px-1 h-3.5 inline-flex items-center rounded font-semibold">{n.badge}</span>}
                {active && <span className="absolute top-0 h-0.5 w-10 rounded-full bg-navy-900" />}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
