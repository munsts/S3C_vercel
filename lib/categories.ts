import {
  GraduationCap, Wallet, Building2, Briefcase, Users, Wifi, HeartPulse, MessageCircleQuestion,
  type LucideIcon,
} from "lucide-react";
import type { Category } from "./types";

export interface CategoryMeta {
  id: Category;
  label: string;
  short: string;
  blurb: string;
  icon: LucideIcon;
  directorate: string;
  examples: string[];
  accent: string; // bg
  ring: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "academic", label: "Academic / Registration", short: "Academic",
    blurb: "Transcripts, registration, attendance, exams",
    icon: GraduationCap, directorate: "Registrar Office",
    examples: ["Transcript issuance", "Course registration", "Attendance dispute", "Exam rechecking", "Semester freeze"],
    accent: "bg-navy-50", ring: "ring-navy-200",
  },
  {
    id: "finance", label: "Finance / Fee", short: "Finance",
    blurb: "Vouchers, installments, refunds, scholarships",
    icon: Wallet, directorate: "Finance Directorate",
    examples: ["Fee voucher errors", "Installment request", "Scholarship adjustment", "Refund request"],
    accent: "bg-navy-50", ring: "ring-navy-200",
  },
  {
    id: "hostel", label: "Hostel / Transport", short: "Hostel",
    blurb: "Allocation, room change, maintenance, bus",
    icon: Building2, directorate: "Hostel & Transport Office",
    examples: ["Hostel allocation", "Room change", "Maintenance complaint", "Bus route", "Transport card"],
    accent: "bg-navy-50", ring: "ring-navy-200",
  },
  {
    id: "career", label: "Career / RIC", short: "Career",
    blurb: "Internships, counselling, industrial visits",
    icon: Briefcase, directorate: "Career Services & RIC",
    examples: ["Internship placement", "Career counselling", "Industrial visit", "Startup guidance"],
    accent: "bg-navy-50", ring: "ring-navy-200",
  },
  {
    id: "affairs", label: "Student Affairs", short: "Affairs",
    blurb: "Clubs, events, society funding, grievance",
    icon: Users, directorate: "Student Affairs",
    examples: ["Club registration", "Event approval", "Society funding", "Grievance redressal"],
    accent: "bg-navy-50", ring: "ring-navy-200",
  },
  {
    id: "ict", label: "ICT / Digital", short: "ICT",
    blurb: "LMS, email, WiFi, portals, password",
    icon: Wifi, directorate: "ICT Directorate",
    examples: ["LMS access", "Email activation", "WiFi issues", "Portal errors", "Password reset"],
    accent: "bg-navy-50", ring: "ring-navy-200",
  },
  {
    id: "medical", label: "Medical / Health", short: "Health",
    blurb: "Appointments, leave, emergency, counselling",
    icon: HeartPulse, directorate: "Medical Centre",
    examples: ["Appointment scheduling", "Medical leave", "Emergency assistance", "Counselling referral"],
    accent: "bg-navy-50", ring: "ring-navy-200",
  },
  {
    id: "general", label: "General Query", short: "General",
    blurb: "anything else, we route it for you",
    icon: MessageCircleQuestion, directorate: "S³C Triage",
    examples: ["Lost ID card", "Verification letter", "Other"],
    accent: "bg-navy-50", ring: "ring-navy-200",
  },
];

export const getCategory = (id: Category) => CATEGORIES.find(c => c.id === id)!;
