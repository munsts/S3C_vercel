"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { STAFF_QUEUE } from "./mock";
import type { ServiceRequest, Message } from "./types";

interface Store {
  requests: ServiceRequest[];
  add: (r: ServiceRequest) => void;
  update: (id: string, updates: Partial<ServiceRequest>) => void;
  addMessage: (id: string, m: Message) => void;
  rate: (id: string, n: number) => void;
}

export const useRequests = create<Store>()(
  persist(
    (set) => ({
      requests: STAFF_QUEUE,
      add: (r) => set((s) => ({ requests: [r, ...s.requests] })),
      update: (id, updates) => set((s) => ({
        requests: s.requests.map(r => r.id === id ? { ...r, ...updates } : r)
      })),
      addMessage: (id, m) => set((s) => ({
        requests: s.requests.map(r => r.id === id ? { ...r, messages: [...(r.messages || []), m] } : r)
      })),
      rate: (id, n) => set((s) => ({
        requests: s.requests.map(r => r.id === id ? { ...r, rating: n } : r),
      })),
    }),
    {
      name: "s3c-requests-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Tab synchronization
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === "s3c-requests-storage") {
      useRequests.persist.rehydrate();
    }
  });
}
