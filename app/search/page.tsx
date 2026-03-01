"use client";

import { useState, useCallback, useEffect, useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/data/properties";
import {
    SlidersHorizontal,
    Search,
    MapPin,
    Loader2,
    X,
    ChevronDown,
} from "lucide-react";

// Dynamically load the map (SSR disabled — Leaflet needs browser)
const PropertyMap = dynamic(() => import("@/components/PropertyMap"), {
    ssr: false,
    loading: () => (
        <div className="flex-1 bg-warmGray-100 flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-teal-500 mx-auto mb-2" />
                <p className="text-warmGray-500 text-sm">Loading map...</p>
            </div>
        </div>
    ),
});

interface Bounds {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
}

const PROP_TYPES = ["", "House", "Condo", "Loft", "Townhouse", "Villa", "Penthouse"];

function SearchPageInner() {
    const searchParams = useSearchParams();

    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [pendingSearch, setPendingSearch] = useState(false);
    const [currentBounds, setCurrentBounds] = useState<Bounds | null>(null);

    // Filter state
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [maxPrice, setMaxPrice] = useState(10000000);
    const [beds, setBeds] = useState(0);
    const [propertyType, setPropertyType] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const fetchProperties = useCallback(
        async (bounds?: Bounds | null) => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (bounds) {
                    params.set("minLat", bounds.minLat.toString());
                    params.set("maxLat", bounds.maxLat.toString());
                    params.set("minLng", bounds.minLng.toString());
                    params.set("maxLng", bounds.maxLng.toString());
                }
                if (query) params.set("q", query);
                if (maxPrice < 10000000) params.set("maxPrice", maxPrice.toString());
                if (beds > 0) params.set("beds", beds.toString());
                if (propertyType) params.set("type", propertyType);

                const res = await fetch(`/api/properties?${params.toString()}`);
                const data = await res.json();
                setProperties(data.properties || []);
            } catch {
                setProperties([]);
            } finally {
                setLoading(false);
            }
        },
        [query, maxPrice, beds, propertyType]
    );

    // Initial load — all properties
    useEffect(() => {
        fetchProperties();
    }, []); // eslint-disable-line

    const handleMoveEnd = useCallback((bounds: Bounds) => {
        setCurrentBounds(bounds);
        setPendingSearch(true);
    }, []);

    const handleSearchThisArea = () => {
        if (currentBounds) {
            fetchProperties(currentBounds);
            setPendingSearch(false);
        }
    };

    const handleFilterApply = () => {
        fetchProperties(currentBounds);
        setShowFilters(false);
        setPendingSearch(false);
    };

    // Scroll highlighted card into view
    const listRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!hoveredId) return;
        const el = document.getElementById(`card-${hoveredId}`);
        el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }, [hoveredId]);

    return (
        <div className="flex h-[calc(100vh-80px)] mt-20 overflow-hidden bg-slate-50 relative">
            {/* ===== LEFT PANEL ===== */}
            <div className="w-full md:w-[420px] lg:w-[480px] flex-shrink-0 flex flex-col h-full bg-white border-r border-slate-200 shadow-xl z-20">
                {/* Search Header */}
                <div className="p-5 border-b border-slate-100 space-y-4">
                    <div className="flex gap-3">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleFilterApply()}
                                placeholder="City, neighborhood, or address..."
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-500/10 transition-all shadow-inner"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters((v) => !v)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-bold transition-all whitespace-nowrap shadow-sm ${showFilters
                                ? "bg-slate-900 text-white border-slate-900"
                                : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                                }`}
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                        </button>
                    </div>

                    {/* Expandable Filters */}
                    {showFilters && (
                        <div className="bg-[#0A101C] rounded-[20px] p-6 space-y-6 shadow-2xl animate-fade-in border border-slate-800">
                            {/* Max Price */}
                            <div>
                                <div className="flex justify-between mb-3">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Max Price</label>
                                    <span className="text-[13px] font-bold text-teal-400">
                                        {maxPrice >= 10000000 ? "Any Price" : `₵${(maxPrice / 1000000).toFixed(1)}M`}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min={200000}
                                    max={10000000}
                                    step={100000}
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                    className="w-full accent-teal-500"
                                />
                            </div>

                            {/* Beds */}
                            <div>
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">Bedrooms</label>
                                <div className="flex gap-2">
                                    {[0, 1, 2, 3, 4, 5].map((n) => (
                                        <button key={n} onClick={() => setBeds(n)}
                                            className={`flex-1 h-10 rounded-xl text-sm font-bold transition-all border ${beds === n
                                                ? "bg-teal-500 text-white border-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.4)]"
                                                : "bg-[#131B2C] text-slate-300 border-slate-800 hover:border-slate-600 hover:bg-[#1A233A]"
                                                }`}>
                                            {n === 0 ? "Any" : `${n}+`}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Type */}
                            <div>
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">Property Type</label>
                                <div className="flex flex-wrap gap-2">
                                    {PROP_TYPES.map((t) => (
                                        <button key={t} onClick={() => setPropertyType(t)}
                                            className={`px-4 py-2 rounded-xl text-[13px] font-bold border transition-all ${propertyType === t
                                                ? "bg-teal-500 text-white border-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.4)]"
                                                : "bg-[#131B2C] text-slate-300 border-slate-800 hover:border-slate-600 hover:bg-[#1A233A]"
                                                }`}>
                                            {t || "Any Type"}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button onClick={handleFilterApply}
                                className="w-full bg-teal-500 text-white py-3.5 rounded-xl font-bold hover:bg-teal-400 transition-colors text-[15px] shadow-[0_4px_20px_rgba(20,184,166,0.3)] mt-2">
                                View Results
                            </button>
                        </div>
                    )}

                    {/* Results count */}
                    <div className="flex justify-between items-center px-1">
                        <p className="text-sm font-medium text-slate-500">
                            {loading ? (
                                <span className="flex items-center gap-2 text-teal-600">
                                    <Loader2 className="w-4 h-4 animate-spin" /> Updating map...
                                </span>
                            ) : (
                                <><span className="text-slate-900 font-bold">{properties.length}</span> properties mapped</>
                            )}
                        </p>
                    </div>
                </div>

                {/* Property List */}
                <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                    {!loading && properties.length === 0 && (
                        <div className="text-center py-20 px-6">
                            <div className="w-20 h-20 bg-white shadow-xl shadow-teal-500/10 border border-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6 transform -rotate-6">
                                <MapPin className="w-10 h-10 text-teal-500" />
                            </div>
                            <h3 className="font-serif font-bold text-xl text-slate-900 mb-2">No Matching Estates</h3>
                            <p className="text-slate-500 text-sm leading-relaxed max-w-[250px] mx-auto">
                                We couldn't find any properties in this exact viewport. Try panning to a new area or loosening your filter criteria.
                            </p>
                        </div>
                    )}
                    {properties.map((property) => (
                        <div key={property.id} id={`card-${property.id}`}>
                            <PropertyCard
                                property={property}
                                variant="compact"
                                isHighlighted={hoveredId === property.id || selectedId === property.id}
                                onHover={setHoveredId}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* ===== RIGHT PANEL — Map ===== */}
            <div className="hidden md:flex flex-1 relative bg-slate-100 z-10">
                <PropertyMap
                    properties={properties}
                    selectedId={selectedId}
                    hoveredId={hoveredId}
                    onSelectPin={setSelectedId}
                    onHoverPin={setHoveredId}
                    onMoveEnd={handleMoveEnd}
                />

                {/* Search This Area Button */}
                {pendingSearch && (
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[1000] animate-fade-in shadow-2xl">
                        <button
                            onClick={handleSearchThisArea}
                            className="flex items-center gap-2.5 bg-slate-900/95 backdrop-blur-md text-white font-bold px-6 py-3.5 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-slate-800 hover:bg-teal-600 hover:border-teal-500 transition-all duration-300 hover:-translate-y-1 group"
                        >
                            <Search className="w-4 h-4 text-teal-400 group-hover:text-white transition-colors" />
                            Search This Area
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
            </div>
        }>
            <SearchPageInner />
        </Suspense>
    );
}
