"use client";

import React, { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Search, Mail, Phone, ExternalLink, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";

type LeadStatus = "New" | "Contacted" | "Resolved";

interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    propertyId: string;
    propertyTitle: string;
    message: string;
    status: LeadStatus;
    date: string;
}

const mockLeads: Lead[] = [
    {
        id: "L-1001",
        name: "Eleanor Vance",
        email: "eleanor.vance@example.com",
        phone: "(555) 123-4567",
        propertyId: "1",
        propertyTitle: "The Meridian Manor",
        message: "I am extremely interested in this property and would like to arrange a private viewing this weekend if possible. Are the furnishings included in the price?",
        status: "New",
        date: "2026-02-21T14:30:00Z",
    },
    {
        id: "L-1002",
        name: "David Chen",
        email: "d.chen@example.com",
        phone: "(555) 987-6543",
        propertyId: "3",
        propertyTitle: "Park Avenue Penthouse",
        message: "Can you send me the floor plans? We are looking to move by the summer.",
        status: "Contacted",
        date: "2026-02-20T09:15:00Z",
    },
    {
        id: "L-1003",
        name: "Sarah Jenkins",
        email: "s.jenkins88@example.com",
        phone: "(555) 456-7890",
        propertyId: "2",
        propertyTitle: "SoCo Loft at The Standard",
        message: "Is the HOA fee subject to increase next year?",
        status: "Resolved",
        date: "2026-02-18T16:45:00Z",
    },
    {
        id: "L-1004",
        name: "Michael Roberts",
        email: "mroberts.investments@example.com",
        phone: "(555) 222-3333",
        propertyId: "7",
        propertyTitle: "Malibu Blufftop Estate",
        message: "We have a cash offer ready. Need to see the property ASAP.",
        status: "New",
        date: "2026-02-21T08:00:00Z",
    }
];

export default function AdminLeads() {
    const [leads, setLeads] = useState<Lead[]>(mockLeads);
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const filteredLeads = leads.filter(
        (l) =>
            l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleStatusChange = (id: string, newStatus: LeadStatus) => {
        setLeads(leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
    };

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const getStatusColor = (status: LeadStatus) => {
        switch (status) {
            case "New":
                return "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20";
            case "Contacted":
                return "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20";
            case "Resolved":
                return "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20";
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex justify-between items-center">
                <div className="relative w-full sm:w-96 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search leads by name, email, or property..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-11 pl-11 pr-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                <th className="py-4 px-6 font-medium">Contact</th>
                                <th className="py-4 px-6 font-medium">Property</th>
                                <th className="py-4 px-6 font-medium">Date received</th>
                                <th className="py-4 px-6 font-medium">Status</th>
                                <th className="py-4 px-6 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                            {filteredLeads.length > 0 ? (
                                filteredLeads.map((lead) => (
                                    <React.Fragment key={lead.id}>
                                        <tr className={`hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors ${expandedId === lead.id ? 'bg-zinc-50/50 dark:bg-zinc-800/30' : ''}`}>
                                            <td className="py-4 px-6">
                                                <div className="font-semibold text-zinc-900 dark:text-white mb-1">
                                                    {lead.name}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-0.5">
                                                    <Mail className="w-3 h-3" /> {lead.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-zinc-500">
                                                    <Phone className="w-3 h-3" /> {lead.phone}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 max-w-[200px]">
                                                <Link
                                                    href={`/property/${lead.propertyId}`}
                                                    target="_blank"
                                                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-start gap-1 line-clamp-2"
                                                >
                                                    <span>{lead.propertyTitle}</span>
                                                    <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                                                </Link>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                                                {format(new Date(lead.date), "MMM d, yyyy h:mm a")}
                                            </td>
                                            <td className="py-4 px-6">
                                                <select
                                                    value={lead.status}
                                                    onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                                                    className={`appearance-none outline-none px-2.5 py-1 rounded-full text-xs font-medium border cursor-pointer ${getStatusColor(lead.status)}`}
                                                >
                                                    <option value="New">New</option>
                                                    <option value="Contacted">Contacted</option>
                                                    <option value="Resolved">Resolved</option>
                                                </select>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <button
                                                    onClick={() => toggleExpand(lead.id)}
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${expandedId === lead.id
                                                        ? "bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white"
                                                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                                        }`}
                                                >
                                                    <MessageSquare className="w-4 h-4" />
                                                    Message
                                                    {expandedId === lead.id ? (
                                                        <ChevronUp className="w-4 h-4 ml-1" />
                                                    ) : (
                                                        <ChevronDown className="w-4 h-4 ml-1" />
                                                    )}
                                                </button>
                                            </td>
                                        </tr>

                                        {/* Expanded Message Row */}
                                        {expandedId === lead.id && (
                                            <tr className="bg-zinc-50/80 dark:bg-zinc-800/50">
                                                <td colSpan={5} className="py-4 px-6">
                                                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 shadow-sm">
                                                        <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Message Content</h4>
                                                        <p className="text-sm text-zinc-800 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                                                            {lead.message}
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-zinc-500 dark:text-zinc-400">
                                        No leads found matching "{searchQuery}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
