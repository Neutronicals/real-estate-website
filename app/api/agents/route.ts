import { NextRequest, NextResponse } from "next/server";
import { getAgents, getAgentById } from "@/data/agents";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
        const agent = getAgentById(id);
        if (!agent) {
            return NextResponse.json({ error: "Agent not found" }, { status: 404 });
        }
        return NextResponse.json({ agent });
    }

    const agents = getAgents();
    return NextResponse.json({ agents, total: agents.length });
}
