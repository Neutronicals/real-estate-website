"use client";

import { Building2, Users, DollarSign, Eye, ArrowUpRight, TrendingUp, Activity } from "lucide-react";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminChart from "@/components/admin/AdminChart";
import { getProperties } from "@/data/properties";
import { getAgents } from "@/data/agents";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AdminDashboard() {
    const properties = getProperties();
    const agents = getAgents();

    const totalValue = properties.reduce((sum, p) => sum + p.price, 0);
    const formattedValue = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1
    }).format(totalValue);

    return (
        <div className="space-y-8 min-h-screen bg-slate-50/50 pb-12">
            {/* Page Header Area */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#0A101C] rounded-[32px] p-8 md:p-10 relative overflow-hidden shadow-2xl border border-slate-800"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="bg-teal-500/20 text-teal-400 border border-teal-500/30 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                                <Activity className="w-3.5 h-3.5" /> Live Data
                            </span>
                        </div>
                        <h1 className="font-serif font-bold text-4xl md:text-5xl text-white mb-2">
                            Dashboard Overview
                        </h1>
                        <p className="text-slate-400 font-medium max-w-lg">
                            Monitor your real estate portfolio, agent performance, and market trends in real-time.
                        </p>
                    </div>

                    <button className="flex items-center gap-2 bg-teal-500 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-teal-400 transition-colors shadow-[0_4px_20px_rgba(20,184,166,0.3)] text-sm self-start md:self-auto">
                        <ArrowUpRight className="w-4 h-4" /> View Full Reports
                    </button>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                <AdminStatCard
                    title="Total Properties"
                    value={properties.length}
                    icon={Building2}
                    trend={{ value: 12.5, isUp: true }}
                    trendText="vs last month"
                />
                <AdminStatCard
                    title="Active Agents"
                    value={agents.length}
                    icon={Users}
                    trend={{ value: 4.2, isUp: true }}
                    trendText="vs last month"
                />
                <AdminStatCard
                    title="Total Volume"
                    value={formattedValue}
                    icon={DollarSign}
                    trend={{ value: 15.3, isUp: true }}
                    trendText="vs last quarter"
                />
                <AdminStatCard
                    title="Total Views"
                    value="124.5K"
                    icon={Eye}
                    trend={{ value: 8.1, isUp: true }}
                    trendText="vs last month"
                />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="lg:col-span-2"
                >
                    <AdminChart />
                </motion.div>

                {/* Recent Activity / Properties */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white rounded-[24px] p-6 lg:p-8 border border-slate-200 shadow-xl shadow-slate-200/40 col-span-1 flex flex-col h-full"
                >
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 font-serif">Recent Listings</h3>
                            <p className="text-sm font-medium text-slate-500 mt-1">Latest added properties</p>
                        </div>
                        <button className="text-teal-600 hover:text-teal-700 bg-teal-50 hover:bg-teal-100 p-2.5 rounded-xl transition-colors group">
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>

                    <div className="space-y-5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        {properties.slice(0, 5).map((property, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + (idx * 0.1) }}
                                key={property.id}
                                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer group"
                            >
                                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative shadow-sm">
                                    <Image
                                        src={property.images[0]}
                                        alt={property.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {property.isNew && (
                                        <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-teal-600 transition-colors">
                                        {property.title}
                                    </h4>
                                    <p className="text-xs text-slate-500 font-medium truncate mb-1">
                                        {property.city}, {property.state}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[13px] font-bold text-teal-600">
                                            {property.priceLabel}
                                        </p>
                                        <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                                            {property.status}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <button className="w-full mt-6 py-3 text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors">
                        View All Inventory
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
