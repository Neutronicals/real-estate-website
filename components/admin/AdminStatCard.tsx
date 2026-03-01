import { LucideIcon } from "lucide-react";

interface AdminStatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isUp: boolean;
    };
    trendText?: string;
}

export default function AdminStatCard({ title, value, icon: Icon, trend, trendText }: AdminStatCardProps) {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                        {title}
                    </p>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                        {value}
                    </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Icon className="w-6 h-6" />
                </div>
            </div>

            {(trend || trendText) && (
                <div className="mt-4 flex items-center gap-2 text-sm">
                    {trend && (
                        <span className={`font-medium ${trend.isUp ? "text-emerald-500" : "text-red-500"}`}>
                            {trend.isUp ? "+" : "-"}{trend.value}%
                        </span>
                    )}
                    {trendText && (
                        <span className="text-zinc-500 dark:text-zinc-400">
                            {trendText}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
