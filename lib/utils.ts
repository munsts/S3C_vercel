import { CATEGORIES } from "./categories";
import type { Category, Priority, RequestStatus } from "./types";

export function cn(...args: (string | false | undefined | null)[]) {
  return args.filter(Boolean).join(" ");
}

export const STATUS_LABEL: Record<RequestStatus, string> = {
  submitted: "Submitted",
  routed: "Routed",
  in_progress: "In progress",
  resolved: "Resolved",
  rejected: "Rejected",
};

export const STATUS_TONE: Record<RequestStatus, string> = {
  submitted: "bg-navy-50 text-navy-700 border border-navy-100",
  routed: "bg-blue-50 text-blue-700 border border-blue-100",
  in_progress: "bg-amber-50 text-amber-800 border border-amber-100",
  resolved: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  rejected: "bg-red-50 text-red-700 border border-red-100",
};

export const PRIORITY_TONE: Record<Priority, string> = {
  low: "bg-mist text-muted border border-line",
  normal: "bg-mist text-navy-700 border border-line",
  high: "bg-amber-50 text-amber-800 border border-amber-100",
  urgent: "bg-red-50 text-red-700 border border-red-100",
};

export function slaPct(elapsed: number, total: number) {
  return Math.min(100, Math.round((elapsed / total) * 100));
}

export function slaTone(pct: number) {
  if (pct >= 100) return "text-danger";
  if (pct >= 80) return "text-warn";
  return "text-success";
}

export function timeAgo(iso: string) {
  const d = new Date(iso).getTime();
  const diff = Date.now() - d;
  const m = Math.round(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.round(h / 24);
  return `${days}d ago`;
}

export function timeUntil(iso: string) {
  const d = new Date(iso).getTime();
  const diff = d - Date.now();
  if (diff < 0) return "overdue";
  const m = Math.round(diff / 60000);
  if (m < 60) return `in ${m}m`;
  const h = Math.round(m / 60);
  if (h < 24) return `in ${h}h`;
  const days = Math.round(h / 24);
  return `in ${days}d`;
}

export function fmt(iso: string) {
  return new Date(iso).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

export function categoryStep(c: Category) { return CATEGORIES.find(x => x.id === c)!; }
