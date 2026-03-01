"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Agent } from "@/data/agents";
import { Property } from "@/data/properties";
import {
    Star, MapPin, Phone, Mail, Globe, Award, Calendar,
    ChevronLeft, ChevronRight, Check,
} from "lucide-react";
import PropertyCard from "./PropertyCard";
import { Calendar as BigCalendar, dateFnsLocalizer, Event } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
    getDay,
    locales: { "en-US": enUS },
});

function BookingCalendar({ agent }: { agent: Agent }) {
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [booked, setBooked] = useState(false);

    const events: Event[] = agent.availableSlots.map((slot) => ({
        title: "Available",
        start: new Date(slot),
        end: new Date(new Date(slot).getTime() + 60 * 60 * 1000),
        resource: slot,
    }));

    const handleSelect = (event: Event) => {
        setSelectedSlot(event.resource as string);
    };

    const handleBook = () => {
        setBooked(true);
    };

    if (booked) {
        return (
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif font-bold text-teal-800 text-xl mb-2">Viewing Requested!</h3>
                <p className="text-teal-700 text-sm">
                    {agent.name} will confirm your slot at {selectedSlot ? format(new Date(selectedSlot), "EEEE, MMMM do 'at' h:mm a") : "the selected time"}.
                </p>
                <button
                    onClick={() => { setBooked(false); setSelectedSlot(null); }}
                    className="mt-4 text-teal-600 text-sm font-semibold hover:text-teal-700"
                >
                    Book another time
                </button>
            </div>
        );
    }

    return (
        <div>
            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 400 }}
                views={["month", "week"]}
                defaultView="month"
                onSelectEvent={handleSelect}
                eventPropGetter={() => ({
                    style: {
                        backgroundColor: "#1F5F5F",
                        borderRadius: "6px",
                        border: "none",
                        fontSize: "12px",
                    },
                })}
            />

            {selectedSlot && (
                <div className="mt-4 p-4 bg-teal-50 rounded-xl border border-teal-200 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-teal-600 font-semibold uppercase tracking-wide">Selected Slot</p>
                        <p className="font-bold text-teal-800">
                            {format(new Date(selectedSlot), "EEEE, MMMM do 'at' h:mm a")}
                        </p>
                    </div>
                    <button
                        onClick={handleBook}
                        className="bg-teal-500 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-teal-400 transition-colors text-sm"
                    >
                        Confirm Booking
                    </button>
                </div>
            )}
            {!selectedSlot && (
                <p className="text-warmGray-400 text-sm text-center mt-3">
                    Click a green slot to select your viewing time
                </p>
            )}
        </div>
    );
}

interface Props {
    agent: Agent;
    listings: Property[];
}

export default function AgentProfileClient({ agent, listings }: Props) {
    const [activeTab, setActiveTab] = useState<"listings" | "book">("listings");

    return (
        <div className="pt-20">
            {/* Hero Banner */}
            <div className="relative h-72 bg-teal-900 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `url(${agent.photo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center top",
                        filter: "blur(20px)",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-teal-900/90" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Profile Card */}
                <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 mb-10 pb-6 border-b border-warmGray-200">
                    <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-4 border-white shadow-xl flex-shrink-0 bg-white -mt-20">
                        <Image
                            src={agent.photo}
                            alt={agent.name}
                            fill
                            className="object-cover object-top"
                        />
                    </div>
                    <div className="pt-4 md:pt-0 flex-1 w-full text-center md:text-left">
                        <h1 className="font-serif font-bold text-warmGray-900 text-3xl md:text-4xl">
                            {agent.name}
                        </h1>
                        <p className="text-teal-600 font-semibold text-lg">{agent.title}</p>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3">
                            <div className="flex items-center gap-1.5 bg-teal-50 px-3 py-1 rounded-full">
                                <Star className="w-4 h-4 fill-teal-500 text-teal-500" />
                                <span className="font-bold text-teal-900">{agent.rating}</span>
                                <span className="text-teal-700/70 text-sm">({agent.reviewCount} reviews)</span>
                            </div>
                            <div className="flex items-center gap-1 text-warmGray-500 text-sm font-medium">
                                <MapPin className="w-4 h-4 text-warmGray-400" />
                                {agent.areas[0]}
                            </div>
                            <div className="flex items-center gap-1 text-warmGray-500 text-sm font-medium">
                                <Award className="w-4 h-4 text-warmGray-400" />
                                {agent.yearsExperience} years exp
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3 pt-4 md:pt-0 md:mb-1">
                        <a
                            href={`tel:${agent.phone}`}
                            className="flex items-center gap-2 bg-teal-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-teal-400 transition-colors text-sm"
                        >
                            <Phone className="w-4 h-4" /> Call
                        </a>
                        <a
                            href={`mailto:${agent.email}`}
                            className="flex items-center gap-2 border-2 border-teal-500 text-teal-600 px-5 py-2.5 rounded-xl font-bold hover:bg-teal-50 transition-colors text-sm"
                        >
                            <Mail className="w-4 h-4" /> Email
                        </a>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {[
                        { label: "Total Sales", value: agent.totalSales },
                        { label: "Volume Sold", value: agent.totalVolume },
                        { label: "Avg. Days on Market", value: agent.avgDaysOnMarket },
                        { label: "Client Rating", value: `${agent.rating}/5.0` },
                    ].map(({ label, value }) => (
                        <div key={label} className="bg-warmGray-50 rounded-2xl p-5 text-center">
                            <p className="font-serif font-bold text-teal-600 text-2xl">{value}</p>
                            <p className="text-warmGray-500 text-sm mt-1">{label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-20">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* About */}
                        <div className="mb-8">
                            <h2 className="font-serif font-bold text-warmGray-900 text-2xl mb-3">About {agent.name.split(" ")[0]}</h2>
                            <p className="text-warmGray-600 leading-relaxed">{agent.about}</p>
                        </div>

                        {/* Languages & Areas */}
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div>
                                <h3 className="font-bold text-warmGray-600 text-xs uppercase tracking-widest mb-3">Languages</h3>
                                <div className="flex flex-wrap gap-2">
                                    {agent.languages.map((lang) => (
                                        <span key={lang} className="bg-teal-50 text-teal-700 text-sm font-semibold px-3 py-1.5 rounded-full">
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-warmGray-600 text-xs uppercase tracking-widest mb-3">Service Areas</h3>
                                <div className="flex flex-wrap gap-2">
                                    {agent.areas.map((area) => (
                                        <span key={area} className="bg-warmGray-100 text-warmGray-700 text-sm font-semibold px-3 py-1.5 rounded-full">
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-warmGray-200 mb-6">
                            <div className="flex gap-6">
                                {(["listings", "book"] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-3 text-sm font-bold capitalize transition-all border-b-2 ${activeTab === tab
                                            ? "border-teal-500 text-teal-600"
                                            : "border-transparent text-warmGray-400 hover:text-warmGray-600"
                                            }`}
                                    >
                                        {tab === "book" ? "📅 Book a Viewing" : "🏠 Listings"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {activeTab === "listings" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {listings.length === 0 ? (
                                    <p className="text-warmGray-400 col-span-2 text-center py-8">No current listings</p>
                                ) : (
                                    listings.map((p) => <PropertyCard key={p.id} property={p} />)
                                )}
                            </div>
                        )}

                        {activeTab === "book" && (
                            <BookingCalendar agent={agent} />
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-teal-900 text-white rounded-2xl p-6">
                            <h3 className="font-serif font-bold text-xl mb-1">Ready to find your home?</h3>
                            <p className="text-teal-200 text-sm mb-4">
                                Let {agent.name.split(" ")[0]} guide you through every step of your property journey.
                            </p>
                            <button
                                onClick={() => setActiveTab("book")}
                                className="w-full bg-white text-teal-800 font-bold py-3 rounded-xl hover:bg-teal-50 transition-colors text-sm"
                            >
                                Schedule Free Consultation
                            </button>
                        </div>

                        <div className="bg-warmGray-50 rounded-2xl p-5">
                            <h3 className="font-bold text-warmGray-600 text-xs uppercase tracking-widest mb-4">Contact</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3 text-warmGray-600">
                                    <Phone className="w-4 h-4 text-teal-400" />
                                    <a href={`tel:${agent.phone}`} className="hover:text-teal-500">{agent.phone}</a>
                                </div>
                                <div className="flex items-center gap-3 text-warmGray-600">
                                    <Mail className="w-4 h-4 text-teal-400" />
                                    <a href={`mailto:${agent.email}`} className="hover:text-teal-500">{agent.email}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
