"use client";

import { usePathname } from "next/navigation";
import { Search, Bell, Menu } from "lucide-react";
import Image from "next/image";

export default function AdminHeader() {
    const pathname = usePathname();

    // Helper to get formatted page title from pathname
    const getPageTitle = () => {
        if (pathname === "/admin") return "Dashboard";

        // E.g., /admin/properties -> Properties
        const segments = pathname.split("/").filter(Boolean);
        if (segments.length >= 2) {
            const mainSegment = segments[1];
            return mainSegment.charAt(0).toUpperCase() + mainSegment.slice(1);
        }
        return "Admin";
    };

    return (
        <header className="h-16 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <button className="lg:hidden p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <Menu className="w-5 h-5" />
                </button>
                <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">
                    {getPageTitle()}
                </h1>
            </div>

            <div className="flex items-center gap-6">
                {/* Search */}
                <div className="relative hidden md:block group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="w-64 h-10 pl-10 pr-4 bg-zinc-100 dark:bg-zinc-800/50 border border-transparent focus:border-blue-500/20 focus:bg-white dark:focus:bg-zinc-900 rounded-full text-sm outline-none transition-all duration-200"
                    />
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-3 pl-6 border-l border-zinc-200 dark:border-zinc-800">
                    <div className="hidden sm:block text-right">
                        <div className="text-sm font-medium text-zinc-900 dark:text-white leading-none mb-1">Jane Admin</div>
                        <div className="text-xs text-zinc-500 leading-none">System Admin</div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden border border-zinc-200 dark:border-zinc-700">
                        <Image
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                            alt="Admin Profile"
                            width={36}
                            height={36}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
