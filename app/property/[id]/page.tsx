import { notFound } from "next/navigation";
import { getPropertyById } from "@/data/properties";
import { getAgentById } from "@/data/agents";
import PropertyDetailClient from "@/components/PropertyDetailClient";
import type { Metadata } from "next";

interface Params {
    id: string;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const property = getPropertyById(params.id);
    if (!property) return { title: "Property Not Found" };
    return {
        title: `${property.title} — ${property.priceLabel} | PropDisc`,
        description: property.description.slice(0, 160),
    };
}

export default function PropertyDetailPage({ params }: { params: Params }) {
    const property = getPropertyById(params.id);
    if (!property) notFound();

    const agent = getAgentById(property.agentId);

    return <PropertyDetailClient property={property} agent={agent} />;
}
