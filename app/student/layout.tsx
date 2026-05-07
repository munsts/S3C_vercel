import { TabBar } from "@/components/TabBar";
import { StudentSidebar } from "@/components/StudentSidebar";
import { Search, Bell } from "lucide-react";
import Link from "next/link";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-mist flex">
      <div className="hidden lg:flex">
        <StudentSidebar />
      </div>
      <main className="flex-1 min-w-0 relative pb-20 lg:pb-0">
        <header className="hidden lg:flex h-16 bg-white border-b border-line px-8 items-center gap-4 sticky top-0 z-30">
          <div className="flex-1 max-w-md flex items-center gap-2.5 h-9 px-3 rounded-md bg-mist border border-line">
            <Search className="w-4 h-4 text-muted" />
            <input placeholder="Search articles, request ID, directorate" className="flex-1 bg-transparent text-[13px] focus:outline-none" />
            <kbd className="text-[10px] text-muted bg-white px-1.5 py-0.5 rounded border border-line">⌘K</kbd>
          </div>
          <Link href="/student/notifications" className="grid h-9 w-9 place-items-center rounded-md hover:bg-mist relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-500" />
          </Link>
        </header>
        <div className="lg:max-w-6xl lg:mx-auto lg:px-8 lg:py-8">
          {children}
        </div>
        <div className="lg:hidden">
          <TabBar />
        </div>
      </main>
    </div>
  );
}
