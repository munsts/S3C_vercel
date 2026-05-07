"use client";
import { cn, STATUS_LABEL, STATUS_TONE, PRIORITY_TONE, slaPct, slaTone } from "@/lib/utils";
import type { Priority, RequestStatus } from "@/lib/types";

export function Button({
  children, variant = "primary", size = "md", className, ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "outline"; size?: "sm" | "md" | "lg" }) {
  const base = "inline-flex items-center justify-center gap-2 font-medium rounded-md transition disabled:opacity-50";
  const sizes = { sm: "h-9 px-3.5 text-[13px]", md: "h-11 px-5 text-[14px]", lg: "h-12 px-6 text-[14px]" };
  const variants = {
    primary: "bg-navy-900 text-white hover:bg-navy-800",
    ghost: "text-navy-800 hover:bg-mist",
    outline: "border border-line text-navy-800 hover:border-navy-300 bg-white",
  };
  return <button className={cn(base, sizes[size], variants[variant], className)} {...rest}>{children}</button>;
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("bg-white rounded-md border border-line", className)}>{children}</div>;
}

export function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10.5px] font-medium tracking-wide uppercase", className)}>{children}</span>;
}

export function StatusPill({ status }: { status: RequestStatus }) {
  return <Pill className={STATUS_TONE[status]}><span className="w-1 h-1 rounded-full bg-current opacity-70" /> {STATUS_LABEL[status]}</Pill>;
}

export function PriorityPill({ priority }: { priority: Priority }) {
  return <Pill className={PRIORITY_TONE[priority]}>{priority}</Pill>;
}

export function SlaRing({ elapsed, total, size = 64 }: { elapsed: number; total: number; size?: number }) {
  const pct = slaPct(elapsed, total);
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  const tone = slaTone(pct);
  const remaining = Math.max(0, total - elapsed);
  
  // scale font
  const mainFontSize = size < 40 ? "text-[9px]" : size < 50 ? "text-[10px]" : "text-[11.5px]";
  const labelFontSize = size < 40 ? "text-[6px]" : size < 50 ? "text-[7px]" : "text-[8.5px]";

  return (
    <div className="relative inline-flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="currentColor" strokeWidth="3.5" className="text-navy-50" fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke="currentColor" strokeWidth="3.5"
          className={tone} fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c - (c * pct) / 100} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className={cn("font-semibold font-mono", mainFontSize, tone)}>{Math.round(remaining)}h</span>
        <span className={cn("text-muted uppercase tracking-wider mt-0.5", labelFontSize)}>left</span>
      </div>
    </div>
  );
}

export function PageHeader({ title, sub, right }: { title: string; sub?: string; right?: React.ReactNode }) {
  return (
    <header className="flex items-end justify-between gap-4 pt-1 pb-4">
      <div>
        <h1 className="font-display text-[22px] sm:text-[26px] font-semibold tracking-tight text-navy-900">{title}</h1>
        {sub && <p className="text-[13px] text-muted mt-0.5">{sub}</p>}
      </div>
      {right}
    </header>
  );
}

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-navy-900 text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-4">
        <div className="text-[13px] font-medium">{message}</div>
        <button onClick={onClose} className="text-white/50 hover:text-white text-[18px] leading-none">&times;</button>
      </div>
    </div>
  );
}
