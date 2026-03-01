"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Maximize, Star, Phone, Mail, ArrowRight, Check, Bed, Bath, Calendar, Car, Droplets, MapPin } from "lucide-react";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, Legend } from "recharts";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { type Property } from "@/data/properties";
import { type Agent } from "@/data/agents";

const NeighborhoodMap = dynamic(() => import("@/components/NeighborhoodMapLeaflet"), { ssr: false });

// ===== GALLERY HERO =====
function GalleryHero({ property }: { property: Property }) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const openLightbox = (idx: number) => {
        setLightboxIndex(idx);
        setLightboxOpen(true);
    };

    const slides = property.images.map((src) => ({ src }));

    return (
        <div className="mt-20">
            {/* Main Gallery Grid */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } }}
                className="grid grid-cols-4 grid-rows-2 gap-3 h-[75vh] max-h-[700px] overflow-hidden rounded-b-[32px] px-6 max-w-[1400px] mx-auto"
            >
                {/* Main large image */}
                <div
                    className="col-span-2 row-span-2 relative cursor-pointer overflow-hidden group rounded-2xl shadow-xl"
                    onClick={() => openLightbox(0)}
                >
                    <Image
                        src={property.images[0]}
                        alt={property.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        priority
                        sizes="50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A101C]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                {/* Secondary images */}
                {property.images.slice(1, 5).map((src, i) => (
                    <div
                        key={i}
                        className="relative cursor-pointer overflow-hidden group rounded-2xl shadow-md"
                        onClick={() => openLightbox(i + 1)}
                    >
                        <Image
                            src={src}
                            alt={`${property.title} - ${i + 2}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            sizes="25vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-[#0A101C]/20 transition-colors duration-500" />

                        {i === 3 && property.images.length > 5 && (
                            <div className="absolute inset-0 bg-[#0A101C]/60 backdrop-blur-sm flex items-center justify-center text-white font-serif font-bold text-2xl group-hover:bg-[#0A101C]/80 transition-colors duration-300">
                                +{property.images.length - 5}
                            </div>
                        )}
                    </div>
                ))}
            </motion.div>

            {/* View all photos button */}
            <div className="max-w-[1400px] mx-auto px-10 flex justify-end mt-4">
                <button
                    onClick={() => openLightbox(0)}
                    className="flex items-center gap-2 bg-white border border-slate-200 text-sm font-bold text-slate-700 px-5 py-2.5 rounded-full hover:bg-slate-50 hover:border-slate-300 hover:shadow-md transition-all"
                >
                    <Maximize className="w-4 h-4" />
                    View all {property.images.length} photos
                </button>
            </div>

            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={slides}
                index={lightboxIndex}
            />
        </div>
    );
}

// ===== MORTGAGE CALCULATOR =====
function MortgageCalculator({ price }: { price: number }) {
    const [homePrice, setHomePrice] = useState(price);
    const [downPct, setDownPct] = useState(20);
    const [rate, setRate] = useState(6.75);
    const [term, setTerm] = useState(30);

    const principal = homePrice * (1 - downPct / 100);
    const monthlyRate = rate / 100 / 12;
    const numPayments = term * 12;
    const monthlyPayment =
        monthlyRate === 0
            ? principal / numPayments
            : (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
            (Math.pow(1 + monthlyRate, numPayments) - 1);

    // Amortization data (yearly)
    const amortData = Array.from({ length: term }, (_, yr) => {
        const startBalance = principal * Math.pow(1 + monthlyRate, yr * 12) -
            (monthlyPayment / monthlyRate) * (Math.pow(1 + monthlyRate, yr * 12) - 1);
        const yearlyInterest = startBalance * monthlyRate * 12;
        const yearlyPrincipal = monthlyPayment * 12 - yearlyInterest;
        return {
            year: `Yr ${yr + 1}`,
            Interest: Math.round(Math.max(0, yearlyInterest)),
            Principal: Math.round(Math.max(0, yearlyPrincipal)),
        };
    }).slice(0, Math.min(term, 15)); // Show max 15 years for readability

    return (
        <div className="bg-[#0A101C] rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] pointer-events-none" />

            <h3 className="font-serif font-bold text-white text-2xl mb-8 relative z-10">
                Mortgage Estimator
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
                <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Home Price
                    </label>
                    <input
                        type="range"
                        min={100000}
                        max={15000000}
                        step={50000}
                        value={homePrice}
                        onChange={(e) => setHomePrice(Number(e.target.value))}
                        className="w-full mt-3 accent-teal-500"
                    />
                    <p className="text-teal-400 font-bold mt-2 text-lg">${homePrice.toLocaleString()}</p>
                </div>
                <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Down Payment <span className="text-teal-400 ml-1">({downPct}%)</span>
                    </label>
                    <input
                        type="range"
                        min={3}
                        max={60}
                        step={1}
                        value={downPct}
                        onChange={(e) => setDownPct(Number(e.target.value))}
                        className="w-full mt-3 accent-teal-500"
                    />
                    <p className="text-teal-400 font-bold mt-2 text-lg">
                        ${(homePrice * downPct / 100).toLocaleString()}
                    </p>
                </div>
                <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Interest Rate <span className="text-teal-400 ml-1">{rate}%</span>
                    </label>
                    <input
                        type="range"
                        min={2}
                        max={12}
                        step={0.25}
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        className="w-full mt-3 accent-teal-500"
                    />
                </div>
                <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Loan Term
                    </label>
                    <div className="flex gap-2 mt-3">
                        {[10, 15, 20, 30].map((y) => (
                            <button
                                key={y}
                                onClick={() => setTerm(y)}
                                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${term === y
                                    ? "bg-teal-500 text-white shadow-[0_0_15px_rgba(20,184,166,0.3)] border border-teal-400"
                                    : "bg-[#131B2C] border border-slate-700 text-slate-300 hover:border-slate-500"
                                    }`}
                            >
                                {y}yr
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Monthly Payment Display */}
            <div className="bg-gradient-to-br from-teal-900/40 to-[#0A101C] border border-teal-500/20 rounded-2xl p-6 text-center mb-8 relative z-10 backdrop-blur-md">
                <p className="text-slate-400 text-sm font-medium">Estimated Monthly Payment</p>
                <p className="font-serif font-bold text-5xl mt-2 text-white">
                    ${Math.round(monthlyPayment).toLocaleString()}
                    <span className="text-xl font-normal text-teal-400 ml-1">/mo</span>
                </p>
                <p className="text-slate-500 text-sm mt-3 font-medium">
                    Principal ${principal.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="mx-2">•</span> {rate}% <span className="mx-2">•</span> {term} years
                </p>
            </div>

            {/* Amortization Chart */}
            <div className="bg-[#131B2C] p-4 rounded-xl border border-slate-800 relative z-10">
                <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={amortData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} dy={10} />
                        <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                        <Tooltip
                            formatter={(v: number) => `$${v.toLocaleString()}`}
                            contentStyle={{ borderRadius: 12, border: "1px solid #1e293b", backgroundColor: "#0f172a", color: "#f8fafc", boxShadow: "0 10px 25px rgba(0,0,0,0.5)" }}
                            itemStyle={{ fontSize: 13, fontWeight: 600 }}
                            labelStyle={{ color: "#94a3b8", marginBottom: 4 }}
                        />
                        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                        <Area type="monotone" dataKey="Interest" stroke="#14b8a6" fill="url(#colorInterest)" strokeWidth={2} activeDot={{ r: 6, fill: "#14b8a6", stroke: "none" }} />
                        <Area type="monotone" dataKey="Principal" stroke="#818cf8" fill="url(#colorPrincipal)" strokeWidth={2} activeDot={{ r: 6, fill: "#818cf8", stroke: "none" }} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

// ===== AGENT CONTACT CARD =====
function AgentContactCard({ agent }: { agent: Agent }) {
    return (
        <div className="bg-white border border-slate-200 rounded-[28px] overflow-hidden shadow-xl shadow-slate-200/50 sticky top-28">
            {/* Header background pattern */}
            <div className="h-24 bg-gradient-to-r from-slate-900 to-slate-800 relative">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            </div>

            <div className="p-6 relative">
                {/* Avatar overlapping header */}
                <div className="absolute -top-12 left-6">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
                        <Image
                            src={agent.photo}
                            alt={agent.name}
                            fill
                            className="object-cover object-top"
                        />
                    </div>
                </div>

                <div className="mt-10 mb-6">
                    <p className="font-serif font-bold text-slate-900 text-2xl">{agent.name}</p>
                    <p className="text-teal-600 font-medium text-sm mt-0.5">{agent.title}</p>
                    <div className="flex items-center gap-1.5 mt-2 bg-slate-50 inline-flex px-3 py-1 rounded-full border border-slate-100">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-bold text-slate-700">{agent.rating}</span>
                        <span className="text-slate-400 text-xs">({agent.reviewCount} reviews)</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3 mb-6">
                    <a
                        href={`tel:${agent.phone}`}
                        className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-teal-500 transition-colors duration-300 text-sm shadow-md"
                    >
                        <Phone className="w-4 h-4" /> {agent.phone}
                    </a>
                    <a
                        href={`mailto:${agent.email}`}
                        className="flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-700 py-3 rounded-xl font-bold hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 transition-all duration-300 text-sm"
                    >
                        <Mail className="w-4 h-4" /> Message Agent
                    </a>
                </div>

                <Link
                    href={`/agents/${agent.id}`}
                    className="flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-teal-600 transition-colors font-semibold group py-2"
                >
                    View full profile <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}

// ===== MAIN PROPERTY DETAIL =====
interface PropertyDetailClientProps {
    property: Property;
    agent: Agent | undefined;
}

export default function PropertyDetailClient({ property, agent }: PropertyDetailClientProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumb */}
            <div className="max-w-[1400px] mx-auto px-6 pt-6 text-sm text-slate-500 font-medium">
                <Link href="/" className="hover:text-teal-500 transition-colors">Home</Link>
                <span className="mx-2 text-slate-300">/</span>
                <Link href="/search" className="hover:text-teal-500 transition-colors">Search</Link>
                <span className="mx-2 text-slate-300">/</span>
                <span className="text-slate-800 font-bold">{property.title}</span>
            </div>

            {/* Gallery Hero */}
            <GalleryHero property={property} />

            {/* Main Content */}
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* LEFT: Main details */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }}
                        className="lg:col-span-2 space-y-16"
                    >
                        {/* Header */}
                        <div className="border-b border-slate-100 pb-10">
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className="bg-slate-100 text-slate-800 text-[11px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full border border-slate-200">
                                    {property.propertyType}
                                </span>
                                <span className={`text-[11px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full border ${property.status === "For Sale" ? "bg-teal-50/50 text-teal-700 border-teal-200" :
                                    property.status === "For Rent" ? "bg-indigo-50/50 text-indigo-700 border-indigo-200" :
                                        "bg-slate-100 text-slate-700 border-slate-200"
                                    }`}>
                                    {property.status}
                                </span>
                                {property.isNew && (
                                    <span className="bg-teal-500 text-white text-[11px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full shadow-md shadow-teal-500/20">
                                        Just Listed
                                    </span>
                                )}
                            </div>
                            <h1 className="font-serif font-bold text-slate-900 text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">
                                {property.title}
                            </h1>
                            <p className="flex items-center gap-2 text-slate-500 text-lg font-medium mb-6">
                                <MapPin className="w-5 h-5 text-teal-500" />
                                {property.address}, {property.neighborhood}, {property.city}, {property.state}
                            </p>
                            <p className="font-serif font-bold text-teal-600 text-4xl lg:text-5xl">
                                {property.priceLabel}
                            </p>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                            {[
                                { icon: Bed, label: "Beds", value: property.beds },
                                { icon: Bath, label: "Baths", value: property.baths },
                                { icon: Maximize, label: "Square Ft", value: property.sqft.toLocaleString() },
                                { icon: Calendar, label: "Built", value: property.yearBuilt },
                                { icon: Car, label: "Parking", value: property.parkingSpaces },
                                { icon: Droplets, label: "Pool", value: property.hasPool ? "Yes" : "No" },
                            ].map(({ icon: Icon, label, value }) => (
                                <div key={label} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center hover:bg-white hover:shadow-lg hover:border-teal-100 transition-all duration-300">
                                    <div className="w-10 h-10 mx-auto bg-teal-50 rounded-xl flex items-center justify-center mb-3">
                                        <Icon className="w-5 h-5 text-teal-600" />
                                    </div>
                                    <p className="font-bold text-slate-900 text-lg mb-0.5">{value}</p>
                                    <p className="text-slate-500 text-[11px] uppercase tracking-wider font-bold">{label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="font-serif font-bold text-slate-900 text-3xl mb-6">The Story</h2>
                            <div className="prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed">
                                <p>{property.description}</p>
                            </div>
                        </div>

                        {/* Features */}
                        <div>
                            <h2 className="font-serif font-bold text-slate-900 text-3xl mb-6">Amenities & Features</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {property.features.map((feat) => (
                                    <div key={feat} className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-4 rounded-xl">
                                        <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3.5 h-3.5 text-teal-600 font-bold" />
                                        </div>
                                        <span className="text-slate-700 font-medium">{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Neighborhood Guide */}
                        <div>
                            <div className="flex items-end justify-between mb-8">
                                <div>
                                    <h2 className="font-serif font-bold text-slate-900 text-3xl mb-2">Location</h2>
                                    <p className="text-slate-500 text-lg">
                                        Discover the vibe of <span className="text-slate-900 font-bold">{property.neighborhood}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-[24px] overflow-hidden border border-slate-200 shadow-sm relative z-0">
                                <NeighborhoodMap property={property} />
                            </div>

                            {/* POI Legend */}
                            <div className="flex flex-wrap gap-4 mt-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mr-2 flex items-center">Points of Interest:</span>
                                {[
                                    { emoji: "🏠", label: "Property" },
                                    { emoji: "🏫", label: "School" },
                                    { emoji: "☕", label: "Café" },
                                    { emoji: "🛒", label: "Grocery" },
                                    { emoji: "🌳", label: "Park" },
                                    { emoji: "🚇", label: "Transit" },
                                    { emoji: "🍽️", label: "Restaurant" },
                                ].map(({ emoji, label }) => (
                                    <div key={label} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                                        <span className="bg-white shadow-sm rounded-md w-6 h-6 flex items-center justify-center text-xs border border-slate-100">{emoji}</span>
                                        <span>{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mortgage Calculator */}
                        <div className="pt-8">
                            <MortgageCalculator price={property.price} />
                        </div>
                    </motion.div>

                    {/* RIGHT: Sticky sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.4 } }}
                        className="space-y-8"
                    >
                        {/* Agent Card (now sticky within the card itself) */}
                        <div className="sticky top-28 space-y-6">
                            {agent && <AgentContactCard agent={agent} />}

                            {/* Property Quick Facts */}
                            <div className="bg-slate-50 border border-slate-200 rounded-[28px] p-6 shadow-sm">
                                <h3 className="font-bold text-slate-500 text-[11px] uppercase tracking-widest mb-4">
                                    At a Glance
                                </h3>
                                <div className="space-y-4 text-sm text-slate-600 font-medium">
                                    <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                                        <span>Days on Market</span>
                                        <span className="font-bold text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-100">{property.daysOnMarket}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                                        <span>Property Type</span>
                                        <span className="font-bold text-slate-900">{property.propertyType}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                                        <span>Year Built</span>
                                        <span className="font-bold text-slate-900">{property.yearBuilt}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                                        <span>Garage</span>
                                        <span className="font-bold text-slate-900">{property.hasGarage ? "Yes" : "No"}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Pool</span>
                                        <span className="font-bold text-slate-900">{property.hasPool ? "Yes" : "No"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Schedule Viewing CTA Alternate */}
                            {agent && (
                                <Link
                                    href={`/agents/${agent.id}`}
                                    className="block w-full text-center font-bold py-4 rounded-xl text-sm transition-all text-slate-500 hover:text-slate-800 underline decoration-slate-300 hover:decoration-slate-800 underline-offset-4"
                                >
                                    Prefer to schedule a tour online?
                                </Link>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
