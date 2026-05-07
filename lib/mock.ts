import type { ServiceRequest, QalamItem, LmsItem, ClassEvent } from "./types";

export const STUDENT = {
  name: "Muhammad Umar",
  cms: "516612",
  program: "Accounting and Finance (NBS)",
  semester: "4th",
  cgpa: 3.62,
  avatar: "MU",
};

export const REQUESTS: ServiceRequest[] = [
  {
    id: "S3C-2841",
    title: "Transcript issuance for visa application",
    description: "Need an official transcript for German embassy. Visa appointment on 22 May.",
    category: "academic",
    status: "in_progress",
    priority: "high",
    createdAt: "2026-05-04T09:12:00Z",
    updatedAt: "2026-05-06T15:40:00Z",
    slaHours: 72,
    elapsedHours: 54,
    directorate: "Registrar Office",
    assignee: "Ayesha N.",
    aiConfidence: 0.96,
    events: [
      { at: "2026-05-04T09:12:00Z", label: "Request submitted" },
      { at: "2026-05-04T09:14:00Z", label: "Routed to Registrar Office" },
      { at: "2026-05-04T11:02:00Z", label: "Assigned to Ayesha N.", by: "Navigator Bilal" },
      { at: "2026-05-06T15:40:00Z", label: "Document under print" },
    ],
  },
  {
    id: "S3C-2837",
    title: "Hostel room change, noise issue",
    description: "Roommate plays music late nights. Already discussed twice. Requesting transfer.",
    category: "hostel",
    status: "routed",
    priority: "normal",
    createdAt: "2026-05-05T18:22:00Z",
    updatedAt: "2026-05-06T08:00:00Z",
    slaHours: 96,
    elapsedHours: 26,
    directorate: "Hostel & Transport Office",
    aiConfidence: 0.88,
    events: [
      { at: "2026-05-05T18:22:00Z", label: "Request submitted" },
      { at: "2026-05-05T18:23:00Z", label: "Routed to Hostel & Transport" },
      { at: "2026-05-06T08:00:00Z", label: "Assigned to warden review" },
    ],
  },
  {
    id: "S3C-2812",
    title: "Fee voucher shows wrong amount",
    description: "Voucher shows full fee but I have a 50% merit scholarship approved last semester.",
    category: "finance",
    status: "resolved",
    priority: "high",
    createdAt: "2026-04-28T10:00:00Z",
    updatedAt: "2026-04-30T12:00:00Z",
    slaHours: 48,
    elapsedHours: 50,
    directorate: "Finance Directorate",
    assignee: "Faisal R.",
    aiConfidence: 0.94,
    rating: 5,
    events: [
      { at: "2026-04-28T10:00:00Z", label: "Request submitted" },
      { at: "2026-04-28T10:01:00Z", label: "Routed to Finance" },
      { at: "2026-04-28T14:30:00Z", label: "Scholarship verified" },
      { at: "2026-04-30T12:00:00Z", label: "Corrected voucher emailed" },
    ],
  },
  {
    id: "S3C-2790",
    title: "WiFi not working in NBS Lab 3",
    description: "Lab 3 SSID drops every 10 minutes for two weeks. Affects entire batch.",
    category: "ict",
    status: "in_progress",
    priority: "urgent",
    createdAt: "2026-05-06T10:00:00Z",
    updatedAt: "2026-05-06T16:10:00Z",
    slaHours: 24,
    elapsedHours: 22,
    directorate: "ICT Directorate",
    assignee: "Network Team",
    aiConfidence: 0.99,
    events: [
      { at: "2026-05-06T10:00:00Z", label: "Request submitted" },
      { at: "2026-05-06T10:00:30Z", label: "Routed to ICT" },
      { at: "2026-05-06T11:20:00Z", label: "Technician dispatched" },
      { at: "2026-05-06T16:10:00Z", label: "Access point firmware upgrade in progress" },
    ],
  },
  {
    id: "S3C-2755",
    title: "Counselling appointment request",
    description: "Would like to book a session with student counsellor, exam stress.",
    category: "medical",
    status: "resolved",
    priority: "normal",
    createdAt: "2026-04-22T13:00:00Z",
    updatedAt: "2026-04-23T09:00:00Z",
    slaHours: 48,
    elapsedHours: 20,
    directorate: "Medical Centre",
    assignee: "Dr. Sana",
    aiConfidence: 0.91,
    rating: 5,
    events: [
      { at: "2026-04-22T13:00:00Z", label: "Request submitted" },
      { at: "2026-04-22T13:05:00Z", label: "Routed to Medical" },
      { at: "2026-04-23T09:00:00Z", label: "Appointment confirmed for 25 Apr 14:00" },
    ],
  },
];

export const QALAM: QalamItem[] = [
  { course: "Introduction to Operations Management", code: "OTM-351", grade: "B+", credits: 3, semester: "Spring 2026" },
  { course: "Organizational Behaviour", code: "HRM-241", grade: "A-", credits: 3, semester: "Spring 2026" },
  { course: "English Literature", code: "HU-104", grade: "B", credits: 3, semester: "Spring 2026" },
  { course: "History", code: "HU-213", grade: "A", credits: 3, semester: "Spring 2026" },
  { course: "Business Communication", code: "MGT-163", grade: "B-", credits: 3, semester: "Spring 2026" },
  { course: "Advanced Financial Management", code: "FIN-451", grade: "B", credits: 3, semester: "Spring 2026" },
];

export const LMS: LmsItem[] = [
  { course: "Operations Management", type: "assignment", title: "Supply chain case study", due: "2026-05-09T23:59:00Z" },
  { course: "Organizational Behaviour", type: "quiz", title: "Quiz 4: Motivation", due: "2026-05-08T10:00:00Z" },
  { course: "Financial Management", type: "announcement", title: "Midterm solutions posted" },
  { course: "History", type: "assignment", title: "Research paper draft", due: "2026-05-12T23:59:00Z" },
];

export const SCHEDULE: ClassEvent[] = [
  // monday
  { course: "Financial Management", code: "FIN-451", room: "NBS-301", start: "09:00", end: "10:30", day: "Monday" },
  { course: "Operations Management", code: "OTM-351", room: "NBS-102", start: "10:45", end: "12:15", day: "Monday" },
  { course: "Organizational Behaviour", code: "HRM-241", room: "NBS-205", start: "13:00", end: "14:30", day: "Monday" },
  
  // tuesday
  { course: "English Literature", code: "HU-104", room: "NBS-105", start: "09:00", end: "10:30", day: "Tuesday" },
  { course: "History", code: "HU-213", room: "NBS-201", start: "11:30", end: "13:00", day: "Tuesday" },
  
  // wednesday
  { course: "Financial Management", code: "FIN-451", room: "NBS-301", start: "09:00", end: "10:30", day: "Wednesday" },
  { course: "Operations Management", code: "OTM-351", room: "NBS-102", start: "10:45", end: "12:15", day: "Wednesday" },
  { course: "Business Communication", code: "MGT-163", room: "NBS-205", start: "13:00", end: "14:30", day: "Wednesday" },
  
  // thursday
  { course: "Organizational Behaviour", code: "HRM-241", room: "NBS-205", start: "13:00", end: "14:30", day: "Thursday" },
  { course: "History", code: "HU-213", room: "NBS-201", start: "11:30", end: "13:00", day: "Thursday" },
  
  // friday
  { course: "English Literature", code: "HU-104", room: "NBS-105", start: "09:00", end: "10:30", day: "Friday" },
  { course: "Business Communication", code: "MGT-163", room: "NBS-205", start: "13:00", end: "14:30", day: "Friday" },
];

// staff queue
export const STAFF_QUEUE: ServiceRequest[] = [
  ...REQUESTS,
  {
    id: "S3C-2853",
    title: "Lost student ID card, need replacement",
    description: "Lost card near library yesterday. Need replacement before Friday exam entry.",
    category: "general", status: "submitted", priority: "high",
    createdAt: "2026-05-07T08:30:00Z", updatedAt: "2026-05-07T08:30:00Z",
    slaHours: 24, elapsedHours: 1, directorate: "S³C Triage",
    aiConfidence: 0.62,
    events: [
      { at: "2026-05-07T08:30:00Z", label: "Request submitted" },
      { at: "2026-05-07T08:30:30Z", label: "Routing pending" },
    ],
  },
  {
    id: "S3C-2854",
    title: "Internship placement, fintech preference",
    description: "Looking for summer internship in fintech, preferably Karachi-based.",
    category: "career", status: "submitted", priority: "normal",
    createdAt: "2026-05-07T09:00:00Z", updatedAt: "2026-05-07T09:00:00Z",
    slaHours: 120, elapsedHours: 0, directorate: "Career Services & RIC",
    aiConfidence: 0.97,
    events: [
      { at: "2026-05-07T09:00:00Z", label: "Request submitted" },
      { at: "2026-05-07T09:00:20Z", label: "Routed to Career / RIC" },
    ],
  },
  {
    id: "S3C-2855",
    title: "Society funding for sports gala",
    description: "NUST Sports Society needs PKR 80,000 sponsorship clearance for May gala.",
    category: "affairs", status: "submitted", priority: "urgent",
    createdAt: "2026-05-07T07:45:00Z", updatedAt: "2026-05-07T07:45:00Z",
    slaHours: 24, elapsedHours: 2.5, directorate: "Student Affairs",
    aiConfidence: 0.93, walkIn: true,
    events: [
      { at: "2026-05-07T07:45:00Z", label: "Walk-in logged by Navigator Bilal" },
      { at: "2026-05-07T07:46:00Z", label: "Routed to Student Affairs" },
    ],
  },
];

export const KB = [
  { q: "How do I request a transcript?", a: "Submit under Academic / Registration. Standard deadline is 72 hrs. Express option in form for ≤24 hrs (extra fee).", cat: "academic" },
  { q: "Fee voucher shows wrong amount?", a: "Open Finance / Fee → 'Voucher correction'. Attach scholarship letter if applicable. Resolved within 48 hrs.", cat: "finance" },
  { q: "Hostel room change request", a: "Submit Hostel / Transport request with reason. Warden review within 96 hrs. Emergency cases marked urgent.", cat: "hostel" },
  { q: "WiFi keeps dropping in lab", a: "Report under ICT / Digital. Include lab number + SSID. Network team responds within 24 hrs.", cat: "ict" },
  { q: "How does routing work?", a: "Each request is classified based on your description and sent to the relevant department instantly.", cat: "general" },
  { q: "What is the deadline countdown?", a: "Each category has a target resolution time. The countdown shows time remaining. If breached, you get a priority callback.", cat: "general" },
];

export const STAFF = {
  name: "Bilal Khan",
  role: "Senior Navigator",
  team: "S³C Triage Desk",
  avatar: "BK",
};

export const PERF = {
  resolvedToday: 38,
  pending: 14,
  breaching: 3,
  avgResolutionHrs: 21.4,
  csat: 4.6,
  weekTrend: [12, 18, 22, 19, 28, 31, 38],
  monthTrend: [22, 25, 19, 28, 31, 24, 20, 22, 25, 29, 33, 30, 28, 35, 38, 32, 29, 31, 34, 40, 42, 38, 35, 39, 41, 45, 48, 52, 50, 55],
  quarterTrend: [180, 195, 210, 205, 220, 235, 250, 240, 260, 280, 275, 300], // weekly
  byCategory: [
    { cat: "academic", n: 96 },
    { cat: "finance", n: 72 },
    { cat: "hostel", n: 58 },
    { cat: "ict", n: 110 },
    { cat: "career", n: 34 },
    { cat: "affairs", n: 41 },
    { cat: "medical", n: 19 },
    { cat: "general", n: 27 },
  ],
};
