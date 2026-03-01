import Image from "next/image";
import Link from "next/link";
import { getAgents } from "@/data/agents";
import { Star, MapPin, Award, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Expert Agents | PropDisc",
    description: "Meet our award-winning team of real estate specialists. Local experts ready to guide you home.",
};

export default function AgentsPage() {
    const agents = getAgents();

    return (
        <div className="pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-teal-500 font-bold text-sm uppercase tracking-widest mb-3">
                        Our Team
                    </p>
                    <h1 className="font-serif font-bold text-warmGray-900 text-4xl md:text-5xl mb-4">
                        Meet Your Experts
                    </h1>
                    <p className="text-warmGray-500 text-lg max-w-2xl mx-auto">
                        Award-winning specialists with deep local knowledge, proven track records, and a passion for finding you the perfect home.
                    </p>
                </div>

                {/* Agents Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {agents.map((agent) => (
                        <div
                            key={agent.id}
                            className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all hover:-translate-y-2"
                        >
                            <Link href={`/agents/${agent.id}`} className="absolute inset-0 z-0" aria-label={`View ${agent.name} profile`} />
                            {/* Photo */}
                            <div className="relative h-72 overflow-hidden pointer-events-none">
                                <Image
                                    src={agent.photo}
                                    alt={agent.name}
                                    fill
                                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                                {/* Rating Badge */}
                                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full shadow">
                                    <Star className="w-3.5 h-3.5 fill-teal-500 text-teal-500" />
                                    <span className="text-xs font-bold text-teal-700">{agent.rating}</span>
                                </div>
                                {/* Name overlay */}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="font-serif font-bold text-white text-xl">{agent.name}</p>
                                    <p className="text-teal-300 text-sm">{agent.specialty}</p>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-5">
                                <div className="flex items-center gap-2 text-warmGray-500 text-xs mb-3">
                                    <MapPin className="w-3 h-3 text-teal-400" />
                                    {agent.areas.slice(0, 2).join(" · ")}
                                </div>
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    <div className="text-center bg-warmGray-50 rounded-xl py-2">
                                        <p className="font-bold text-warmGray-800 text-sm">{agent.totalSales}</p>
                                        <p className="text-warmGray-400 text-xs">Sales</p>
                                    </div>
                                    <div className="text-center bg-warmGray-50 rounded-xl py-2">
                                        <p className="font-bold text-warmGray-800 text-sm">{agent.totalVolume}</p>
                                        <p className="text-warmGray-400 text-xs">Volume</p>
                                    </div>
                                    <div className="text-center bg-warmGray-50 rounded-xl py-2">
                                        <p className="font-bold text-warmGray-800 text-sm">{agent.yearsExperience}yr</p>
                                        <p className="text-warmGray-400 text-xs">Exp.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="flex-1 text-center bg-teal-500 text-white py-2 rounded-xl text-xs font-bold group-hover:bg-teal-400 transition-colors">
                                        View Profile
                                    </span>
                                    <a
                                        href={`tel:${agent.phone}`}
                                        className="relative z-10 w-9 h-9 border border-warmGray-200 rounded-xl flex items-center justify-center text-warmGray-500 hover:border-teal-400 hover:text-teal-500 transition-colors"
                                    >
                                        <Phone className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
