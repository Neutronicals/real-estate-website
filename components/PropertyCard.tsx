import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Maximize, MapPin, Sparkles, Heart } from "lucide-react";
import { Property } from "@/data/properties";

interface PropertyCardProps {
    property: Property;
    variant?: "default" | "compact" | "featured";
    isHighlighted?: boolean;
    onHover?: (id: string | null) => void;
}

export default function PropertyCard({
    property,
    variant = "default",
    isHighlighted = false,
    onHover,
}: PropertyCardProps) {
    const isCompact = variant === "compact";
    const isFeatured = variant === "featured";

    if (isCompact) {
        return (
            <Link
                href={`/property/${property.id}`}
                className={`flex gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-300 border-2 group ${isHighlighted
                    ? "border-teal-500 bg-teal-500/5 shadow-lg shadow-teal-500/10"
                    : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                    }`}
                onMouseEnter={() => onHover?.(property.id)}
                onMouseLeave={() => onHover?.(null)}
            >
                <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden shadow-sm">
                    <Image
                        src={property.images[0]}
                        alt={property.title}
                        fill
                        className="object-cover card-image group-hover:scale-110 transition-transform duration-700 ease-out"
                        sizes="112px"
                    />
                </div>
                <div className="flex-1 min-w-0 py-1">
                    <p className="font-serif font-bold text-teal-600 text-lg mb-0.5">
                        {property.priceLabel}
                    </p>
                    <p className="font-bold text-slate-800 text-sm truncate mb-1">
                        {property.title}
                    </p>
                    <p className="text-slate-500 text-xs truncate flex items-center gap-1.5 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        {property.neighborhood}, {property.city}
                    </p>
                    <div className="flex items-center gap-3.5 text-slate-600 text-xs font-medium">
                        <span className="flex items-center gap-1.5">
                            <Bed className="w-3.5 h-3.5 text-slate-400" /> {property.beds}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Bath className="w-3.5 h-3.5 text-slate-400" /> {property.baths}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Maximize className="w-3.5 h-3.5 text-slate-400" /> {property.sqft.toLocaleString()}
                        </span>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link
            href={`/property/${property.id}`}
            className={`block bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-200 cursor-pointer group hover:shadow-2xl hover:border-teal-500/30 transition-all duration-500 hover:-translate-y-1.5 ${isFeatured ? "lg:col-span-1" : ""
                }`}
            onMouseEnter={() => onHover?.(property.id)}
            onMouseLeave={() => onHover?.(null)}
        >
            {/* Image Container */}
            <div className="relative overflow-hidden aspect-[4/3]">
                <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/90 via-[#0B1120]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap z-10">
                    {property.isNew && (
                        <span className="bg-teal-500 text-white text-[11px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-teal-500/30">
                            <Sparkles className="w-3 h-3" /> New
                        </span>
                    )}
                    {property.isLuxury && (
                        <span className="bg-[#0B1120]/80 backdrop-blur-md border border-white/10 text-white text-[11px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full shadow-lg">
                            Luxury
                        </span>
                    )}
                </div>

                {/* Wishlist Button (Glassmorphism) */}
                <button
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-rose-500 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] z-10"
                    onClick={(e) => { e.preventDefault(); }}
                    aria-label="Save property"
                >
                    <Heart className="w-4 h-4" />
                </button>

                {/* Bottom Overlay Content */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between">
                    <div>
                        <span className="inline-block bg-white/95 backdrop-blur-md text-slate-900 font-bold text-lg px-3.5 py-1.5 rounded-xl shadow-lg mb-2">
                            {property.priceLabel}
                        </span>
                    </div>
                    <div>
                        <span
                            className={`text-[11px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-xl shadow-lg border ${property.status === "For Sale"
                                    ? "bg-teal-500/90 text-white border-teal-400"
                                    : property.status === "For Rent"
                                        ? "bg-amber-500/90 text-white border-amber-400"
                                        : "bg-slate-800/90 text-white border-slate-700"
                                } backdrop-blur-md`}
                        >
                            {property.status}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-5">
                <div className="mb-3">
                    <h3 className="font-serif font-bold text-slate-900 text-xl leading-tight mb-1.5 group-hover:text-teal-600 transition-colors">
                        {property.title}
                    </h3>
                    <p className="text-slate-500 text-sm flex items-start gap-1.5 font-medium">
                        <MapPin className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{property.address}, {property.neighborhood}</span>
                    </p>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600 border-t border-slate-100 pt-4 mt-4">
                    <span className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-teal-50 flex items-center justify-center">
                            <Bed className="w-3.5 h-3.5 text-teal-600" />
                        </div>
                        <span className="font-bold text-slate-900">{property.beds}</span>
                        <span className="text-slate-500 text-xs uppercase tracking-wide">Beds</span>
                    </span>
                    <span className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-teal-50 flex items-center justify-center">
                            <Bath className="w-3.5 h-3.5 text-teal-600" />
                        </div>
                        <span className="font-bold text-slate-900">{property.baths}</span>
                        <span className="text-slate-500 text-xs uppercase tracking-wide">Baths</span>
                    </span>
                    <span className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-teal-50 flex items-center justify-center">
                            <Maximize className="w-3.5 h-3.5 text-teal-600" />
                        </div>
                        <span className="font-bold text-slate-900">{property.sqft.toLocaleString()}</span>
                        <span className="text-slate-500 text-xs uppercase tracking-wide">Sqft</span>
                    </span>
                </div>
            </div>
        </Link>
    );
}
