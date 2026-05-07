export type Category =
  | "academic"
  | "finance"
  | "hostel"
  | "career"
  | "affairs"
  | "ict"
  | "medical"
  | "general";

export type RequestStatus = "submitted" | "routed" | "in_progress" | "resolved" | "rejected";

export type Priority = "low" | "normal" | "high" | "urgent";

export interface Message {
  id: string;
  sender: "student" | "staff";
  text: string;
  at: string;
}

export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  category: Category;
  status: RequestStatus;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
  slaHours: number;
  elapsedHours: number;
  directorate: string;
  assignee?: string;
  aiConfidence?: number;
  rating?: number;
  events: { at: string; label: string; by?: string }[];
  messages?: Message[];
  walkIn?: boolean;
}

export interface QalamItem {
  course: string;
  code: string;
  grade?: string;
  credits: number;
  semester: string;
}

export interface LmsItem {
  course: string;
  type: "assignment" | "quiz" | "announcement";
  title: string;
  due?: string;
}

export interface ClassEvent {
  course: string;
  code: string;
  room: string;
  start: string;
  end: string;
  day: string;
}
