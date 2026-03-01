"use client";

import Image from "next/image";
import { ArrowRight, Building2, Globe, HeartHandshake, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const STAGGER = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.1, duration: 0.8, ease: "easeOut" }
    }
};

const ITEM = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-20 selection:bg-teal-500 selection:text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Hero Section */}
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-20"
                    variants={STAGGER}
                    initial="hidden"
                    animate="show"
                >
                    <motion.div variants={ITEM} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 text-teal-600 mb-6 font-bold text-sm">
                        <Building2 className="w-4 h-4" />
                        Our Story
                    </motion.div>
                    <motion.h1 variants={ITEM} className="font-serif font-bold text-5xl md:text-6xl text-slate-900 mb-6 leading-tight">
                        Redefining Real Estate <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-700">for the Modern Era</span>
                    </motion.h1>
                    <motion.p variants={ITEM} className="text-lg text-slate-500 leading-relaxed">
                        At PropDisc, we believe that finding a home shouldn't be a transaction—it should be a seamless, beautiful experience.
                        We blend cutting-edge technology with deep human expertise to connect you with the property of your dreams.
                    </motion.p>
                </motion.div>

                {/* Image Grid / Hero Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24"
                >
                    <div className="md:col-span-2 relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
                        <Image
                            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80"
                            alt="Modern Architecture"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <p className="text-white font-bold text-2xl font-serif">Curated Living Spaces</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="relative h-[190px] md:h-auto rounded-3xl overflow-hidden shadow-xl group">
                            <Image
                                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80"
                                alt="Modern Interior"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                        </div>
                        <div className="relative h-[190px] md:h-auto rounded-3xl overflow-hidden shadow-xl bg-teal-500 p-8 flex flex-col justify-between">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md mb-4">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-3xl font-serif mb-1">2,500+</h3>
                                <p className="text-teal-100 font-medium">Global Properties</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Core Values */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="font-serif font-bold text-3xl md:text-4xl text-slate-900 mb-4">Why Choose PropDisc</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">We are built on a foundation of trust, excellence, and a relentless pursuit of client satisfaction.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: ShieldCheck, title: "Unwavering Integrity", desc: "Transparency and honesty at every stage. We prioritize your interests above all else, ensuring peace of mind." },
                            { icon: HeartHandshake, title: "Client First", desc: "Your journey is our journey. We offer highly personalized service tailored to your unique lifestyle and goals." },
                            { icon: Users, title: "Expert Network", desc: "Access the top 1% of agents worldwide. Our curated network guarantees elite representation." }
                        ].map((val, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-teal-100 transition-all duration-300 hover:-translate-y-2 group">
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-teal-500 mb-6 group-hover:scale-110 group-hover:bg-teal-50 transition-all">
                                    <val.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-serif font-bold text-xl text-slate-900 mb-3">{val.title}</h3>
                                <p className="text-slate-500 leading-relaxed text-sm">
                                    {val.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="bg-[#0B1120] rounded-[40px] p-12 md:p-20 relative overflow-hidden text-center">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="font-serif font-bold text-4xl text-white mb-6">Have questions or feedback?</h2>
                        <p className="text-slate-400 text-lg mb-10">
                            We'd love to hear from you. Whether you're looking for help with a property, have a complaint, or just want to say hello—our team is ready.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(20,184,166,0.3)]"
                        >
                            Get in Touch <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
