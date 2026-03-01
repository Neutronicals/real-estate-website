"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Search, Users, Building2, Phone } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Search", href: "/search" },
    { label: "Agents", href: "/agents" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === "/";
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 60);
    });

    const navBg = isHome && !scrolled ? "bg-transparent" : "glass-white shadow-glass";
    const textColor = isHome && !scrolled ? "text-white" : "text-slate-800";

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${navBg}`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-teal-500/50 transition-all duration-300">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <span
                            className={`font-serif font-bold text-2xl tracking-tight transition-colors ${isHome && !scrolled ? "text-white" : "text-slate-900"
                                }`}
                        >
                            PropDisc<span className="text-teal-500">.</span>
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors group ${isHome && !scrolled
                                        ? "text-white/90 hover:text-white"
                                        : "text-slate-600 hover:text-slate-900"
                                        }`}
                                >
                                    {link.label}
                                    <span className="absolute inset-x-4 bottom-0 h-0.5 bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                                </Link>
                            );
                        })}
                    </div>

                    {/* CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/agents"
                            className={`flex items-center gap-2 text-sm font-medium transition-colors ${isHome && !scrolled ? "text-white/90 hover:text-white" : "text-slate-600 hover:text-slate-900"
                                }`}
                        >
                            <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-600">
                                <Phone className="w-3.5 h-3.5" />
                            </div>
                            <span className="hidden lg:inline">Contact</span>
                        </Link>
                        <Link
                            href="/admin"
                            className="bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/20 hover:-translate-y-0.5"
                        >
                            Admin
                        </Link>
                        <Link
                            href="/search"
                            className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                        >
                            List Property
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className={`md:hidden p-2 rounded-xl transition-colors ${isHome && !scrolled ? "text-white hover:bg-white/10" : "text-slate-700 hover:bg-slate-100"
                            }`}
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={menuOpen ? "close" : "open"}
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                transition={{ duration: 0.15 }}
                            >
                                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </motion.div>
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden glass-white overflow-hidden border-t border-slate-200/50"
                    >
                        <div className="px-6 py-6 space-y-4">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="flex items-center gap-3 text-slate-700 font-semibold hover:text-teal-600 transition-colors py-2 text-lg"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="pt-4 mt-4 border-t border-slate-100"
                            >
                                <Link
                                    href="/admin"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex w-full mb-3 bg-teal-500 text-white text-center items-center justify-center font-bold py-4 rounded-xl hover:bg-teal-400 transition-colors shadow-lg"
                                >
                                    Admin Dashboard
                                </Link>
                                <Link
                                    href="/search"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex w-full bg-slate-900 text-white text-center items-center justify-center font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors shadow-lg"
                                >
                                    List Property
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
