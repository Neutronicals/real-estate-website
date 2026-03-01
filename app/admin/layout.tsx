import { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata = {
    title: "Admin Panel | PropDisc",
    description: "Manage properties, agents, and leads.",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen bg-zinc-50 dark:bg-[#0a0a0a] overflow-hidden selection:bg-blue-500/30">
            {/* Sidebar */}
            <div className="hidden lg:block w-64 h-full flex-shrink-0 z-50">
                <AdminSidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full min-w-0">
                <AdminHeader />

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto w-full p-6 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
