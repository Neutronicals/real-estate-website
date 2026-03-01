"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Home, Users, Award } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const stats = [
    { icon: Home, value: 2400, suffix: "+", label: "Active Listings", prefix: "" },
    { icon: Users, value: 850, suffix: "+", label: "Expert Agents", prefix: "" },
    { icon: TrendingUp, value: 4.2, suffix: "B", label: "Total Volume Sold", prefix: "₵" },
    { icon: Award, value: 98, suffix: "%", label: "Client Satisfaction", prefix: "" },
];

function AnimatedNumber({ value, prefix, suffix, animate }: { value: number; prefix: string; suffix: string; animate: boolean }) {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!animate) return;
        const duration = 2000;
        let start: number | null = null;
        let animationFrame: number;

        const update = (now: number) => {
            if (!start) start = now;
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);

            // easeOutExpo
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            setDisplay(parseFloat((value * eased).toFixed(value % 1 !== 0 ? 1 : 0)));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(update);
            }
        };

        animationFrame = requestAnimationFrame(update);
        return () => cancelAnimationFrame(animationFrame);
    }, [animate, value]);

    return (
        <span>
            {prefix}{display.toLocaleString()}{suffix}
        </span>
    );
}

export default function StatsBar() {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <section ref={ref} className="bg-gradient-to-r from-[#0F3D3D] via-[#164D4D] to-[#0F3D3D] py-20 relative overflow-hidden">
            {/* Subtle light effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-400/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {stats.map(({ icon: Icon, value, suffix, label, prefix }, i) => (
                        <motion.div
                            key={label}
                            initial="hidden"
                            animate={controls}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }
                            }}
                            className="text-center group"
                        >
                            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-white/10 group-hover:border-teal-400/50 group-hover:shadow-[0_0_30px_rgba(45,212,191,0.2)] transition-all duration-500">
                                <Icon className="w-7 h-7 text-teal-300 group-hover:text-teal-200 group-hover:scale-110 transition-all duration-300" />
                            </div>
                            <p className="font-serif font-bold text-white text-4xl md:text-5xl tracking-tight mb-2 group-hover:text-teal-50 transition-colors duration-300">
                                <AnimatedNumber value={value} prefix={prefix} suffix={suffix} animate={inView} />
                            </p>
                            <p className="text-teal-200/80 text-sm font-medium tracking-wide uppercase">{label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
