"use client";

import { useState } from "react";
import { Mail, MessageSquare, Phone, Send } from "lucide-react";

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        // Simulate network request
        setTimeout(() => setStatus("success"), 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-20 selection:bg-teal-500 selection:text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header Subtitle/Title */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="font-serif font-bold text-4xl md:text-5xl text-slate-900 mb-6">
                        We're Here to Help
                    </h1>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        Have a question, feedback about an agent, or a complaint?
                        Let us know. Our dedicated support team is ready to assist you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

                    {/* Left: Contact Information Cards */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-teal-50 text-teal-500 rounded-2xl flex items-center justify-center mb-6">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <h3 className="font-serif font-bold text-xl text-slate-900 mb-2">General Inquiries</h3>
                            <p className="text-slate-500 text-sm mb-4">For general questions about our services, search platform, or agency.</p>
                            <a href="mailto:support@propdisc.com" className="font-bold text-teal-600 hover:text-teal-500 transition-colors">support@propdisc.com</a>
                        </div>

                        <div className="bg-[#0B1120] p-8 rounded-3xl shadow-xl relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-teal-500/20 blur-2xl rounded-full group-hover:bg-teal-500/30 transition-colors" />
                            <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                                <Phone className="w-5 h-5" />
                            </div>
                            <h3 className="font-serif font-bold text-xl text-white mb-2">Urgent Assistance</h3>
                            <p className="text-slate-400 text-sm mb-4">Facing an urgent issue with a viewing or an agent? Call our priority line.</p>
                            <a href="tel:512-555-0100" className="font-bold text-white text-lg tracking-wide hover:text-teal-400 transition-colors">(512) 555-0100</a>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-6">
                                <Mail className="w-5 h-5" />
                            </div>
                            <h3 className="font-serif font-bold text-xl text-slate-900 mb-2">Feedback & Complaints</h3>
                            <p className="text-slate-500 text-sm mb-4">We take your experience seriously. Share your feedback directly with management.</p>
                            <a href="mailto:feedback@propdisc.com" className="font-bold text-rose-600 hover:text-rose-500 transition-colors">feedback@propdisc.com</a>
                        </div>
                    </div>

                    {/* Right: Feedback Form */}
                    <div className="lg:col-span-3 bg-white p-8 md:p-12 rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 relative">
                        {status === "success" ? (
                            <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-[40px] flex flex-col items-center justify-center p-8 text-center animate-fade-in z-10">
                                <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                    <Send className="w-8 h-8 text-teal-500" />
                                </div>
                                <h3 className="font-serif font-bold text-3xl text-slate-900 mb-3">Message Received</h3>
                                <p className="text-slate-500 max-w-sm mb-8">
                                    Thank you for reaching out. A member of our support team will review your message and get back to you within 24 hours.
                                </p>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : null}

                        <div className="mb-8">
                            <h2 className="font-serif font-bold text-2xl text-slate-900 mb-2">Send us a message</h2>
                            <p className="text-slate-500 text-sm">Fill out the form below and we'll route it to the right department.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">First Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all font-medium"
                                        placeholder="Jane"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Last Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all font-medium"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all font-medium"
                                    placeholder="jane@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Topic</label>
                                <div className="relative">
                                    <select className="appearance-none w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all font-medium cursor-pointer">
                                        <option value="general">General Support</option>
                                        <option value="feedback">Website Feedback</option>
                                        <option value="complaint">Complaint / Issue with Agent</option>
                                        <option value="billing">Billing Inquiry</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-slate-500">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Your Message</label>
                                <textarea
                                    required
                                    rows={5}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all font-medium resize-none"
                                    placeholder="How can we help you today?"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="w-full bg-teal-500 hover:bg-teal-400 text-white font-bold py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                            >
                                {status === "submitting" ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : "Submit Message"}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
