"use client";

import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import CollectionSection from "@/components/CollectionSection";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, MapPin, Map, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";
import { getNewListings, getLuxuryEstates, getUrbanLofts } from "@/data/properties";
import { getAgents } from "@/data/agents";

const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function HomePage() {
    const newListings = getNewListings();
    const luxuryEstates = getLuxuryEstates();
    const urbanLofts = getUrbanLofts();
    const featuredAgents = getAgents().slice(0, 3);

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero */}
            <HeroSection />

            {/* Stats */}
            <StatsBar />

            {/* Property Collections */}
            <CollectionSection
                newListings={newListings}
                luxuryEstates={luxuryEstates}
                urbanLofts={urbanLofts}
            />

            {/* Map CTA Banner - Dark Premium Theme */}
            <section className="relative overflow-hidden bg-[#0A101C] py-32 px-6 border-y border-slate-800">
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `url("https://images.unsplash.com/photo-1524813686514-a57563d77965?w=1600&q=80")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A101C] via-[#0A101C]/80 to-transparent" />

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUpVariant}
                        className="max-w-2xl"
                    >
                        <h2 className="font-serif font-bold text-white text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                            The Map is<br />
                            <span className="text-gradient-teal">Your Canvas.</span>
                        </h2>
                        <p className="text-slate-400 text-lg mb-10 leading-relaxed font-light">
                            Experience real estate discovery without limits. Pan, zoom, and explore neighborhoods with our bespoke interactive map engine. Watch listings update instantaneously as you navigate.
                        </p>
                        <Link
                            href="/search"
                            className="inline-flex items-center justify-center gap-3 bg-white text-slate-900 font-bold px-8 py-4 rounded-full text-base hover:bg-teal-500 hover:text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(20,184,166,0.3)] hover:-translate-y-1 group"
                        >
                            Launch Map Explorer
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Featured Agents */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUpVariant}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
                >
                    <div className="max-w-2xl">
                        <span className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-3 block">Expert Advisors</span>
                        <h2 className="font-serif font-bold text-slate-900 text-4xl md:text-5xl mb-4 leading-tight">
                            Meet the Partners
                        </h2>
                        <p className="text-slate-500 text-lg">Award-winning specialists dedicated to finding your perfect match.</p>
                    </div>
                    <Link
                        href="/agents"
                        className="inline-flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-teal-500 group"
                    >
                        View Directory <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredAgents.map((agent, index) => (
                        <motion.div
                            key={agent.id}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { delay: index * 0.15, duration: 0.6 } }
                            }}
                        >
                            <Link
                                href={`/agents/${agent.id}`}
                                className="group block bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-200 hover:border-teal-500/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                            >
                                <div className="relative h-[340px] overflow-hidden">
                                    <Image
                                        src={agent.photo}
                                        alt={agent.name}
                                        fill
                                        className="object-cover object-top group-hover:scale-105 group-hover:rotate-1 transition-all duration-700"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <p className="text-white font-serif font-bold text-3xl mb-1">{agent.name}</p>
                                        <p className="text-teal-400 font-medium text-sm tracking-wide">{agent.specialty}</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-slate-500 text-sm flex items-center gap-1.5 font-medium">
                                            <MapPin className="w-4 h-4 text-teal-500" />
                                            {agent.areas[0]}
                                        </p>
                                        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 text-slate-700 text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                            {agent.rating}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <div className="text-center flex-1 border-r border-slate-100">
                                            <p className="text-slate-900 font-bold text-lg">{agent.totalSales}</p>
                                            <p className="text-slate-500 text-xs uppercase tracking-wider">Deals</p>
                                        </div>
                                        <div className="text-center flex-1">
                                            <p className="text-slate-900 font-bold text-lg">{agent.totalVolume}</p>
                                            <p className="text-slate-500 text-xs uppercase tracking-wider">Volume</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Why PropDisc Section */}
            <section className="bg-white border-t border-slate-100 py-32 px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUpVariant}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <h2 className="font-serif font-bold text-slate-900 text-4xl md:text-5xl mb-6">
                        A New Standard in Real Estate
                    </h2>
                    <p className="text-slate-500 text-lg leading-relaxed">
                        A property platform built from the ground up for the way modern buyers actually discover and fall in love with homes.
                    </p>
                </motion.div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Map-First Discovery",
                            desc: "Our map IS the filter. Pan, zoom, and draw custom zones to find properties in exactly the areas you love. No sidebar required.",
                            icon: Map,
                        },
                        {
                            title: "Immersive Listings",
                            desc: "Every listing is a rich visual story featuring expansive galleries, interactive floor plans, and comprehensive neighborhood scopes.",
                            icon: Shield,
                        },
                        {
                            title: "Vetted Partners",
                            desc: "Connect instantly with top-tier local specialists. Skip the voicemail and schedule private viewings directly through the platform.",
                            icon: Users,
                        },
                    ].map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { delay: index * 0.15, duration: 0.6 } }
                            }}
                            className="bg-slate-50 border border-slate-100 rounded-[28px] p-10 group hover:bg-white hover:shadow-xl hover:border-teal-100 transition-all duration-500"
                        >
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:shadow-teal-500/20 group-hover:border-teal-200 transition-all duration-500">
                                <feature.icon className="w-8 h-8 text-teal-500" />
                            </div>
                            <h3 className="font-serif font-bold text-slate-900 text-2xl mb-4">{feature.title}</h3>
                            <p className="text-slate-500 text-base leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
