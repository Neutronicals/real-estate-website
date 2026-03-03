"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const searchSuggestions = [
    "3-bedroom house with a pool in Austin",
    "luxury penthouse with city views",
    "modern loft near downtown",
    "waterfront estate in Miami",
    "cozy craftsman in a walkable neighborhood",
    "private villa with ocean views",
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function HeroSection() {
    const [query, setQuery] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const [typingIndex, setTypingIndex] = useState(0);

    // Swap text slowly to save CPU (2.5 seconds per swap instead of 30 milliseconds!)
    useEffect(() => {
        const interval = setInterval(() => {
            setTypingIndex((prev) => (prev + 1) % searchSuggestions.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = `/search?q=${encodeURIComponent(query)}`;
    };

    return (
        <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
            {/* Ultra-Premium Video Background */}
            <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
            >
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
                >
                    <source
                        src="https://videos.pexels.com/video-files/8293720/8293720-uhd_2560_1440_24fps.mp4"
                        type="video/mp4"
                    />
                </video>
            </motion.div>

            {/* Darker, cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-[#0B1120]" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 md:px-8 w-full max-w-5xl mx-auto pt-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Eyebrow */}
                    <motion.div variants={itemVariants} className="mb-6 flex justify-center">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 backdrop-blur-md text-teal-300 font-semibold text-xs tracking-[0.2em] uppercase">
                            <Sparkles className="w-3.5 h-3.5" /> Property Discovery Engine
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1 variants={itemVariants} className="font-serif font-bold text-white text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8">
                        Find Where<br />
                        <span className="text-gradient-teal italic pr-2">You Belong</span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-slate-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                        Discover exceptional properties through an immersive, cinematic experience designed around how people actually fall in love with a home.
                    </motion.p>

                    {/* Search Bar - Ultra Glassmorphism */}
                    <motion.form
                        variants={itemVariants}
                        onSubmit={handleSearch}
                        className="w-full max-w-3xl mx-auto relative group"
                    >
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-teal-300 rounded-[28px] blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

                        <div className="relative flex items-center bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-[24px] p-2.5 shadow-2xl transition-all duration-300 group-hover:border-teal-500/30">
                            <Search className="w-6 h-6 text-teal-400 ml-5 flex-shrink-0" />
                            <div className="flex-1 relative h-12 flex items-center px-4">
                                {/* Static Rotating Placeholder */}
                                {!query && (
                                    <span className="absolute left-4 text-slate-400 pointer-events-none text-base md:text-lg transition-all duration-300">
                                        {searchSuggestions[typingIndex]}
                                        <span className="inline-block w-[2px] h-[1em] bg-teal-400 ml-0.5 align-middle animate-pulse" />
                                    </span>
                                )}
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="w-full h-full bg-transparent outline-none text-white text-base md:text-lg z-10 relative"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-400 hover:to-teal-300 text-white font-bold px-8 py-4 rounded-[20px] transition-all hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] flex-shrink-0 transform active:scale-95"
                            >
                                Search
                            </button>
                        </div>
                    </motion.form>

                    {/* Quick Tags */}
                    <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mt-8">
                        {["Luxury Estates", "Urban Lofts", "Pool Homes", "New Listings", "Waterfront"].map((tag) => (
                            <Link
                                key={tag}
                                href={`/search?q=${tag.toLowerCase().replace(" ", "-")}`}
                                className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-teal-500 hover:border-teal-400 text-slate-300 hover:text-white backdrop-blur-md text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
                            >
                                {tag}
                            </Link>
                        ))}
                    </motion.div>
                </motion.div>
            </div>


        </section>
    );
}
