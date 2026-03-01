import { notFound } from "next/navigation";
import { getAgentById } from "@/data/agents";
import { getPropertyById } from "@/data/properties";
import AgentProfileClient from "@/components/AgentProfileClient";
import type { Metadata } from "next";

interface Params {
    id: string;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const agent = getAgentById(params.id);
    if (!agent) return { title: "Agent Not Found" };
    return {
        title: `${agent.name} — ${agent.title} | PropDisc`,
        description: agent.about.slice(0, 160),
    };
}

export default function AgentProfilePage({ params }: { params: Params }) {
    const agent = getAgentById(params.id);
    if (!agent) notFound();

    const listings = agent.listingIds
        .map((id) => getPropertyById(id))
        .filter(Boolean) as ReturnType<typeof getPropertyById>[];

    return <AgentProfileClient agent={agent} listings={listings.filter(Boolean) as any} />;
}
