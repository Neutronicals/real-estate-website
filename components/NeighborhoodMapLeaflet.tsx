"use client";

import { MapContainer, TileLayer, Marker, Circle, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Property } from "@/data/properties";

// Fix Leaflet icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const homeIcon = L.divIcon({
    className: "",
    html: `<div style="
    width:40px;height:40px;
    background:#1F5F5F;
    border:3px solid white;
    border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    box-shadow:0 4px 16px rgba(31,95,95,0.4);
    font-size:18px;
  ">🏠</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

const POI_TYPES = [
    { emoji: "🏫", label: "School", color: "#C9A84C" },
    { emoji: "☕", label: "Café", color: "#6B4F3A" },
    { emoji: "🛒", label: "Grocery", color: "#2E7070" },
    { emoji: "🌳", label: "Park", color: "#4A7C59" },
    { emoji: "🚇", label: "Transit", color: "#5B6DAE" },
    { emoji: "🍽️", label: "Restaurant", color: "#C0392B" },
];

function generatePOIs(lat: number, lng: number) {
    return POI_TYPES.map((poi, i) => {
        const angle = (i / POI_TYPES.length) * Math.PI * 2;
        const dist = 0.006 + Math.random() * 0.009;
        return {
            ...poi,
            lat: lat + Math.cos(angle) * dist,
            lng: lng + Math.sin(angle) * dist,
        };
    });
}

function createPOIIcon(emoji: string) {
    return L.divIcon({
        className: "",
        html: `<div style="
      width:30px;height:30px;
      background:white;
      border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      font-size:14px;
      box-shadow:0 2px 8px rgba(0,0,0,0.15);
      border:2px solid rgba(0,0,0,0.06);
    ">${emoji}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
    });
}

export default function NeighborhoodMapLeaflet({ property }: { property: Property }) {
    const pois = generatePOIs(property.lat, property.lng);

    return (
        <MapContainer
            center={[property.lat, property.lng]}
            zoom={14}
            style={{ width: "100%", height: "340px", borderRadius: "12px", overflow: "hidden" }}
            zoomControl={true}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />

            {/* Radius ring */}
            <Circle
                center={[property.lat, property.lng]}
                radius={500}
                pathOptions={{ color: "#1F5F5F", fillColor: "#1F5F5F", fillOpacity: 0.06, weight: 1.5 }}
            />

            {/* Home marker */}
            <Marker position={[property.lat, property.lng]} icon={homeIcon}>
                <Popup>
                    <strong>{property.title}</strong>
                    <br />{property.address}
                </Popup>
            </Marker>

            {/* POI markers */}
            {pois.map((poi) => (
                <Marker
                    key={poi.label}
                    position={[poi.lat, poi.lng]}
                    icon={createPOIIcon(poi.emoji)}
                >
                    <Popup>{poi.emoji} {poi.label}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
