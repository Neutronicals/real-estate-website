"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Search, Mail, Phone, Edit, Trash2, Star } from "lucide-react";
import { getAgents } from "@/data/agents";

export default function AdminAgents() {
    const [searchQuery, setSearchQuery] = useState("");
    const [agents, setAgents] = useState(getAgents());

    const filteredAgents = agents.filter((a) =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to remove this agent?")) {
            setAgents(agents.filter((a) => a.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-96 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search agents..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-11 pl-11 pr-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                    />
                </div>

                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm shadow-blue-600/20 shrink-0">
                    <Plus className="w-5 h-5" />
                    <span>Add Agent</span>
                </button>
            </div>

            {/* Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAgents.length > 0 ? (
                    filteredAgents.map((agent) => (
                        <div
                            key={agent.id}
                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group relative"
                        >
                            {/* Actions Overlay */}
                            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                <button
                                    title="Edit Agent"
                                    className="p-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm shadow-sm rounded-lg text-zinc-500 hover:text-blue-500 transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    title="Delete Agent"
                                    onClick={() => handleDelete(agent.id)}
                                    className="p-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm shadow-sm rounded-lg text-zinc-500 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-zinc-100 dark:border-zinc-800 relative">
                                        <Image
                                            src={agent.photo}
                                            alt={agent.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white truncate">
                                            {agent.name}
                                        </h3>
                                        <p className="text-sm text-zinc-500 truncate">{agent.title}</p>
                                        <div className="flex items-center gap-1 mt-1 text-amber-500">
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            <span className="text-xs font-semibold">{agent.rating}</span>
                                            <span className="text-xs text-zinc-400">({agent.reviewCount})</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                        <Mail className="w-4 h-4 shrink-0 text-zinc-400" />
                                        <span className="truncate">{agent.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                        <Phone className="w-4 h-4 shrink-0 text-zinc-400" />
                                        <span>{agent.phone}</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-sm">
                                    <div>
                                        <div className="text-zinc-500 text-xs">Active Listings</div>
                                        <div className="font-semibold text-zinc-900 dark:text-white mt-0.5">
                                            {agent.listingIds.length} properties
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-zinc-500 text-xs">Total Sales</div>
                                        <div className="font-semibold text-zinc-900 dark:text-white mt-0.5">
                                            {agent.totalSales}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-zinc-500 dark:text-zinc-400">
                        No agents found matching "{searchQuery}"
                    </div>
                )}
            </div>
        </div>
    );
}
