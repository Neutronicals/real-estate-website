export interface Agent {
    id: string;
    name: string;
    title: string;
    photo: string;
    specialty: string;
    phone: string;
    email: string;
    about: string;
    rating: number;
    reviewCount: number;
    totalSales: number;
    totalVolume: string;
    avgDaysOnMarket: number;
    listingIds: string[];
    languages: string[];
    areas: string[];
    videoUrl?: string;
    yearsExperience: number;
    availableSlots: string[]; // ISO date strings for calendar
}

const agents: Agent[] = [
    {
        id: "a1",
        name: "Sophia Hartwell",
        title: "Luxury Estate Specialist",
        photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
        specialty: "Luxury Estates & Waterfront",
        phone: "(512) 555-0191",
        email: "sophia.hartwell@propdisc.com",
        about:
            "With 18 years representing Austin's most distinguished properties, Sophia brings an unmatched level of expertise to every transaction. Her clientele — Fortune 500 executives, tech founders, and international buyers — trust her discretion and market intelligence implicitly. She negotiated the highest residential sale in Travis County history in 2023.",
        rating: 4.97,
        reviewCount: 214,
        totalSales: 389,
        totalVolume: "$1.2B",
        avgDaysOnMarket: 11,
        listingIds: ["1", "7", "11"],
        languages: ["English", "French"],
        areas: ["West Lake Hills", "Barton Hills", "Tarrytown"],
        yearsExperience: 18,
        availableSlots: [
            "2026-02-24T09:00:00",
            "2026-02-24T11:00:00",
            "2026-02-25T14:00:00",
            "2026-02-26T10:00:00",
            "2026-02-27T09:00:00",
            "2026-02-28T16:00:00",
        ],
    },
    {
        id: "a2",
        name: "Marcus Chen",
        title: "Urban Living Expert",
        photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80",
        specialty: "Lofts, Condos & Urban Properties",
        phone: "(512) 555-0274",
        email: "marcus.chen@propdisc.com",
        about:
            "Marcus has an innate talent for matching the right buyer to the right urban home. After 14 years immersed in the tech and arts corridors of Austin and Los Angeles, he understands what sophisticated city-dwellers truly want from a property — and delivers it. He sold over 50 units in the SoCo micro-market alone last year.",
        rating: 4.92,
        reviewCount: 178,
        totalSales: 312,
        totalVolume: "$480M",
        avgDaysOnMarket: 8,
        listingIds: ["2", "5"],
        languages: ["English", "Mandarin"],
        areas: ["South Congress", "East Austin", "Downtown", "Venice"],
        yearsExperience: 14,
        availableSlots: [
            "2026-02-24T10:00:00",
            "2026-02-25T09:00:00",
            "2026-02-25T15:00:00",
            "2026-02-26T13:00:00",
            "2026-02-27T11:00:00",
        ],
    },
    {
        id: "a3",
        name: "Isabella Rossi",
        title: "Manhattan Luxury Advisor",
        photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
        specialty: "Manhattan & Brooklyn Premium Properties",
        phone: "(212) 555-0318",
        email: "isabella.rossi@propdisc.com",
        about:
            "Isabella is the consummate New York City real estate professional. Born and educated on Manhattan's Upper East Side, she brings an insider's perspective, deep building relationships, and an extraordinary Rolodex to every search. She has been consistently ranked in the top 1% of NYC agents for 9 consecutive years.",
        rating: 4.99,
        reviewCount: 256,
        totalSales: 501,
        totalVolume: "$2.1B",
        avgDaysOnMarket: 14,
        listingIds: ["3", "6"],
        languages: ["English", "Italian", "Spanish"],
        areas: ["Midtown East", "Greenwich Village", "Brooklyn Heights", "Tribeca"],
        yearsExperience: 16,
        availableSlots: [
            "2026-02-24T11:00:00",
            "2026-02-25T10:00:00",
            "2026-02-26T14:00:00",
            "2026-02-27T09:00:00",
            "2026-02-28T15:00:00",
        ],
    },
    {
        id: "a4",
        name: "James Okafor",
        title: "Neighborhood Guide",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        specialty: "Residential & Family Homes",
        phone: "(512) 555-0446",
        email: "james.okafor@propdisc.com",
        about:
            "James grew up in Hyde Park and has spent 11 years guiding families to the perfect Austin neighborhood. His deep roots in the community, encyclopedic knowledge of every street and school district, and patient, thorough approach have made him the go-to agent for families relocating to Austin from across the country.",
        rating: 4.89,
        reviewCount: 149,
        totalSales: 267,
        totalVolume: "$220M",
        avgDaysOnMarket: 6,
        listingIds: ["4", "9"],
        languages: ["English", "Yoruba"],
        areas: ["Hyde Park", "Barton Hills", "Bouldin Creek", "Crestview"],
        yearsExperience: 11,
        availableSlots: [
            "2026-02-24T09:00:00",
            "2026-02-24T14:00:00",
            "2026-02-25T11:00:00",
            "2026-02-26T10:00:00",
            "2026-02-27T16:00:00",
        ],
    },
    {
        id: "a5",
        name: "Camille Laurent",
        title: "Pre-War Condo Specialist",
        photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80",
        specialty: "Pre-War & Historic Residences",
        phone: "(212) 555-0527",
        email: "camille.laurent@propdisc.com",
        about:
            "Camille's passion lies in New York's magnificent pre-war buildings — the ornate cornices, the plaster medallions, the solid bones that new construction can never replicate. After 13 years as a co-op and condo specialist in the West Village, Chelsea, and the Village, she has become the definitive expert in this storied niche of the Manhattan market.",
        rating: 4.94,
        reviewCount: 132,
        totalSales: 245,
        totalVolume: "$590M",
        avgDaysOnMarket: 19,
        listingIds: ["8"],
        languages: ["English", "French"],
        areas: ["Greenwich Village", "West Village", "Chelsea", "Midtown West"],
        yearsExperience: 13,
        availableSlots: [
            "2026-02-25T09:00:00",
            "2026-02-25T14:00:00",
            "2026-02-26T11:00:00",
            "2026-02-27T10:00:00",
            "2026-02-28T13:00:00",
        ],
    },
    {
        id: "a6",
        name: "Rafael Dominguez",
        title: "Miami Coastal Expert",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
        specialty: "Miami Luxury Coastal Properties",
        phone: "(305) 555-0633",
        email: "rafael.dominguez@propdisc.com",
        about:
            "Miami real estate is a world unto itself — a heady mix of international capital, tropical lifestyle, and architectural ambition. Rafael has navigated this market for 12 years, representing buyers from São Paulo, Bogotá, Mexico City, London, and New York. His bilingual fluency, personal relationships with all the key developers, and sixth sense for emerging micro-markets set him apart.",
        rating: 4.91,
        reviewCount: 163,
        totalSales: 298,
        totalVolume: "$870M",
        avgDaysOnMarket: 12,
        listingIds: ["10", "12"],
        languages: ["English", "Spanish", "Portuguese"],
        areas: ["South Beach", "Coconut Grove", "Brickell", "Coral Gables"],
        yearsExperience: 12,
        availableSlots: [
            "2026-02-24T10:00:00",
            "2026-02-24T15:00:00",
            "2026-02-25T09:00:00",
            "2026-02-26T13:00:00",
            "2026-02-27T11:00:00",
            "2026-02-28T10:00:00",
        ],
    },
];

export function getAgents(): Agent[] {
    return agents;
}

export function getAgentById(id: string): Agent | undefined {
    return agents.find((a) => a.id === id);
}

export default agents;
