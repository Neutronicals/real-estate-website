import { NextRequest, NextResponse } from "next/server";
import {
    getProperties,
    getPropertiesByBounds,
} from "@/data/properties";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const minLat = searchParams.get("minLat");
    const maxLat = searchParams.get("maxLat");
    const minLng = searchParams.get("minLng");
    const maxLng = searchParams.get("maxLng");
    const query = searchParams.get("q")?.toLowerCase() || "";
    const type = searchParams.get("type") || "";
    const minPrice = Number(searchParams.get("minPrice") || 0);
    const maxPrice = Number(searchParams.get("maxPrice") || 99999999999);
    const beds = Number(searchParams.get("beds") || 0);
    const status = searchParams.get("status") || "";

    let properties =
        minLat && maxLat && minLng && maxLng
            ? getPropertiesByBounds(
                parseFloat(minLat),
                parseFloat(maxLat),
                parseFloat(minLng),
                parseFloat(maxLng)
            )
            : getProperties();

    // Text search across title, city, neighborhood, description
    if (query) {
        properties = properties.filter(
            (p) =>
                p.title.toLowerCase().includes(query) ||
                p.city.toLowerCase().includes(query) ||
                p.neighborhood.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.address.toLowerCase().includes(query) ||
                p.tags.some((t) => t.includes(query))
        );
    }

    // Property type filter
    if (type) {
        properties = properties.filter(
            (p) => p.propertyType.toLowerCase() === type.toLowerCase()
        );
    }

    // Price range filter
    properties = properties.filter(
        (p) => p.price >= minPrice && p.price <= maxPrice
    );

    // Beds filter
    if (beds > 0) {
        properties = properties.filter((p) => p.beds >= beds);
    }

    // Status filter
    if (status) {
        properties = properties.filter(
            (p) => p.status.toLowerCase().replace(" ", "-") === status.toLowerCase()
        );
    }

    return NextResponse.json({ properties, total: properties.length });
}
