import Link from "next/link";
import { Building2, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

const footerLinks = {
    Explore: [
        { label: "Buy a Home", href: "/search?status=for-sale" },
        { label: "Rent a Home", href: "/search?status=for-rent" },
        { label: "Luxury Estates", href: "/search?tag=luxury" },
        { label: "New Listings", href: "/search?new=true" },
        { label: "Urban Lofts", href: "/search?tag=urban-loft" },
    ],
    Company: [
        { label: "About Us", href: "/about" },
        { label: "Our Agents", href: "/agents" },
        { label: "Contact Support", href: "/contact" },
        { label: "Careers", href: "#careers" },
        { label: "Press", href: "#press" },
    ],
    Legal: [
        { label: "Privacy Policy", href: "#privacy" },
        { label: "Terms of Service", href: "#terms" },
        { label: "Cookie Policy", href: "#cookies" },
        { label: "Fair Housing", href: "#fair-housing" },
    ],
};

const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
    return (
        <footer className="bg-[#0B1120] text-slate-300 pointer-events-auto border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10">
                {/* Pre-footer inline CTA */}
                <div className="flex flex-col md:flex-row items-center justify-between bg-slate-800/50 border border-slate-700/50 rounded-3xl p-8 mb-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                    <div className="relative z-10 mb-6 md:mb-0">
                        <h3 className="font-serif text-2xl md:text-3xl text-white font-bold mb-2">Ready to find your match?</h3>
                        <p className="text-slate-400">Join thousands of others discovering their dream properties.</p>
                    </div>
                    <div className="relative z-10 shrink-0">
                        <Link
                            href="/search"
                            className="inline-flex items-center justify-center bg-teal-500 hover:bg-teal-400 text-white font-bold px-8 py-4 rounded-full transition-all hover:shadow-[0_0_20px_rgba(20,184,166,0.4)]"
                        >
                            Start Searching
                        </Link>
                    </div>
                </div>

                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-slate-800">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2.5 mb-6 group inline-flex">
                            <div className="w-10 h-10 bg-teal-500/10 border border-teal-500/20 rounded-xl flex items-center justify-center group-hover:bg-teal-500/20 transition-all duration-300">
                                <Building2 className="w-5 h-5 text-teal-400" />
                            </div>
                            <span className="font-serif font-bold text-2xl text-white">PropDisc<span className="text-teal-500">.</span></span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-8">
                            The Property Discovery Engine. We believe finding the perfect home should be an experience as beautiful as the property itself.
                        </p>
                        <div className="space-y-3 text-sm text-slate-400">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-white/5 text-teal-400"><MapPin className="w-4 h-4" /></div>
                                <span>200 West 6th St, Austin, TX 78701</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-white/5 text-teal-400"><Phone className="w-4 h-4" /></div>
                                <span>(512) 555-0100</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-white/5 text-teal-400"><Mail className="w-4 h-4" /></div>
                                <a href="mailto:hello@propdisc.com" className="hover:text-teal-400 transition-colors">hello@propdisc.com</a>
                            </div>
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([section, links]) => (
                        <div key={section}>
                            <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-white mb-6">
                                {section}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-2 group"
                                        >
                                            <span className="w-1 h-1 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-6">
                    <p className="text-slate-500 text-sm">
                        © 2026 PropDisc. All rights reserved. Licensed Real Estate Broker.
                    </p>
                    <div className="flex items-center gap-3">
                        {socialLinks.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="w-10 h-10 border border-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:-translate-y-0.5"
                            >
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
