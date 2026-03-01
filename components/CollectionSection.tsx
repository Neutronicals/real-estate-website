"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Crown, Building } from "lucide-react";
import PropertyCard from "./PropertyCard";
import { Property } from "@/data/properties";
import { motion } from "framer-motion";

const collections = [
    {
        id: "new",
        title: "Just Listed",
        subtitle: "Fresh on the market this week",
        icon: Sparkles,
        href: "/search?new=true",
        accentColor: "text-teal-600",
        borderColor: "border-teal-200",
        bgColor: "bg-teal-50",
    },
    {
        id: "luxury",
        title: "Luxury Estates",
        subtitle: "Exceptional properties, extraordinary living",
        icon: Crown,
        href: "/search?tag=luxury",
        accentColor: "text-amber-600",
        borderColor: "border-amber-200",
        bgColor: "bg-amber-50",
    },
    {
        id: "loft",
        title: "Urban Lofts",
        subtitle: "City living elevated to an art form",
        icon: Building,
        href: "/search?tag=urban-loft",
        accentColor: "text-indigo-600",
        borderColor: "border-indigo-200",
        bgColor: "bg-indigo-50",
    },
];

interface Props {
    newListings: Property[];
    luxuryEstates: Property[];
    urbanLofts: Property[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

function CollectionGroup({
    collection,
    properties,
}: {
    collection: (typeof collections)[0];
    properties: Property[];
}) {
    const Icon = collection.icon;

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="mb-24"
        >
            {/* Section Header */}
            <div className="flex items-end justify-between mb-10">
                <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 ${collection.bgColor} ${collection.borderColor} border rounded-[16px] flex items-center justify-center shadow-sm`}>
                        <Icon className={`w-7 h-7 ${collection.accentColor}`} />
                    </div>
                    <div>
                        <h2 className="font-serif font-bold text-slate-900 text-3xl md:text-4xl tracking-tight">
                            {collection.title}
                        </h2>
                        <p className="text-slate-500 text-base mt-1 font-medium">{collection.subtitle}</p>
                    </div>
                </div>
                <Link
                    href={collection.href}
                    className={`hidden md:flex items-center gap-2 text-sm font-bold ${collection.accentColor} hover:opacity-70 transition-opacity group`}
                >
                    Explore Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.slice(0, 3).map((property) => (
                    <motion.div key={property.id} variants={cardVariants}>
                        <PropertyCard property={property} variant="default" />
                    </motion.div>
                ))}
            </div>

            <Link
                href={collection.href}
                className={`mt-8 flex md:hidden items-center justify-center gap-2 text-sm font-bold ${collection.accentColor} bg-slate-100 py-3 rounded-xl hover:bg-slate-200 transition-colors`}
            >
                Explore Collection <ArrowRight className="w-4 h-4" />
            </Link>
        </motion.div>
    );
}

export default function CollectionSection({ newListings, luxuryEstates, urbanLofts }: Props) {
    const grouped = [
        { ...collections[0], properties: newListings },
        { ...collections[1], properties: luxuryEstates },
        { ...collections[2], properties: urbanLofts },
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 border-t border-slate-200/50 bg-white">
            {grouped.map(({ properties, ...col }) => (
                <CollectionGroup key={col.id} collection={col} properties={properties} />
            ))}
        </section>
    );
}
