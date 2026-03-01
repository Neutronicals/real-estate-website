"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Property } from "@/data/properties";
import Link from "next/link";

// Fix default Leaflet icon paths (broken in Next.js)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function createPriceIcon(price: string, isSelected: boolean, isHovered: boolean) {
    const bg = isSelected ? "#1F5F5F" : isHovered ? "#2E7070" : "#ffffff";
    const color = isSelected || isHovered ? "#ffffff" : "#1F5F5F";
    const border = isSelected ? "#ffffff" : isHovered ? "#ffffff" : "#1F5F5F";
    const shadow = isSelected ? "0 4px 16px rgba(31,95,95,0.5)" : "0 2px 8px rgba(0,0,0,0.15)";

    return L.divIcon({
        className: "",
        html: `
      <div style="
        background:${bg};
        color:${color};
        border:2px solid ${border};
        padding:5px 10px;
        border-radius:20px;
        font-size:11px;
        font-weight:700;
        font-family:Lato,sans-serif;
        white-space:nowrap;
        box-shadow:${shadow};
        transition:all 0.2s;
        cursor:pointer;
        position:relative;
      ">${price}<span style="
        position:absolute;
        bottom:-6px;left:50%;transform:translateX(-50%);
        width:8px;height:8px;
        background:${bg};
        border-right:2px solid ${border};
        border-bottom:2px solid ${border};
        transform:translateX(-50%) rotate(45deg);
      "></span></div>
    `,
        iconSize: [0, 0],
        iconAnchor: [30, 30],
        popupAnchor: [30, -30],
    });
}

// Track map movement
function MapEventHandler({
    onMoveEnd,
}: {
    onMoveEnd: (bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number }) => void;
}) {
    useMapEvents({
        moveend(e) {
            const b = e.target.getBounds();
            onMoveEnd({
                minLat: b.getSouth(),
                maxLat: b.getNorth(),
                minLng: b.getWest(),
                maxLng: b.getEast(),
            });
        },
    });
    return null;
}

// Auto-fit bounds when properties change
function BoundsFitter({ properties }: { properties: Property[] }) {
    const map = useMap();
    const prevCount = useRef(0);

    useEffect(() => {
        if (properties.length > 0 && properties.length !== prevCount.current) {
            const bounds = L.latLngBounds(properties.map((p) => [p.lat, p.lng]));
            map.fitBounds(bounds, { padding: [60, 60], maxZoom: 13 });
            prevCount.current = properties.length;
        }
    }, [properties, map]);

    return null;
}

interface PropertyMapProps {
    properties: Property[];
    selectedId: string | null;
    hoveredId: string | null;
    onSelectPin: (id: string | null) => void;
    onHoverPin: (id: string | null) => void;
    onMoveEnd: (bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number }) => void;
}

export default function PropertyMap({
    properties,
    selectedId,
    hoveredId,
    onSelectPin,
    onHoverPin,
    onMoveEnd,
}: PropertyMapProps) {
    return (
        <MapContainer
            center={[37.5, -98]}
            zoom={4}
            style={{ width: "100%", height: "100%" }}
            zoomControl={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />

            <MapEventHandler onMoveEnd={onMoveEnd} />
            <BoundsFitter properties={properties} />

            {properties.map((property) => {
                const isSelected = selectedId === property.id;
                const isHovered = hoveredId === property.id;
                return (
                    <Marker
                        key={property.id}
                        position={[property.lat, property.lng]}
                        icon={createPriceIcon(property.priceLabel, isSelected, isHovered)}
                        eventHandlers={{
                            click: () => onSelectPin(isSelected ? null : property.id),
                            mouseover: () => onHoverPin(property.id),
                            mouseout: () => onHoverPin(null),
                        }}
                    >
                        <Popup maxWidth={260} className="property-popup">
                            <div className="rounded-xl overflow-hidden -mx-3 -my-2 min-w-[240px]">
                                <div className="relative">
                                    <img
                                        src={property.images[0]}
                                        alt={property.title}
                                        className="w-full h-32 object-cover"
                                    />
                                    <div className="absolute bottom-2 left-2">
                                        <span className="bg-teal-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                            {property.priceLabel}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-3 bg-white">
                                    <p className="font-bold text-warmGray-800 text-sm leading-tight">{property.title}</p>
                                    <p className="text-warmGray-400 text-xs mt-0.5">{property.neighborhood}, {property.city}</p>
                                    <div className="flex gap-3 text-warmGray-600 text-xs mt-2 mb-3">
                                        <span>🛏 {property.beds} bd</span>
                                        <span>🛁 {property.baths} ba</span>
                                        <span>📐 {property.sqft.toLocaleString()} sqft</span>
                                    </div>
                                    <a
                                        href={`/property/${property.id}`}
                                        className="block w-full bg-teal-500 text-white text-xs font-bold text-center py-2 rounded-lg hover:bg-teal-400 transition-colors"
                                    >
                                        View Property →
                                    </a>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}
