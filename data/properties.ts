export interface Property {
    id: string;
    title: string;
    price: number;
    priceLabel: string;
    beds: number;
    baths: number;
    sqft: number;
    address: string;
    city: string;
    state: string;
    neighborhood: string;
    lat: number;
    lng: number;
    images: string[];
    tags: string[];
    isNew?: boolean;
    isFeatured?: boolean;
    isLuxury?: boolean;
    isUrbanLoft?: boolean;
    agentId: string;
    description: string;
    yearBuilt: number;
    parkingSpaces: number;
    hasPool: boolean;
    hasGarage: boolean;
    propertyType: "House" | "Condo" | "Townhouse" | "Loft" | "Villa" | "Penthouse";
    floors?: string[];
    features: string[];
    status: "For Sale" | "For Rent" | "Sold";
    daysOnMarket: number;
}

const properties: Property[] = [
    {
        id: "1",
        title: "The Meridian Manor",
        price: 2850000,
        priceLabel: "$2,850,000",
        beds: 5,
        baths: 4,
        sqft: 5200,
        address: "1247 Lakeshore Drive",
        city: "Austin",
        state: "TX",
        neighborhood: "West Lake Hills",
        lat: 30.2979,
        lng: -97.8034,
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85",
            "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1200&q=85",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
        ],
        tags: ["luxury", "pool", "lake-view"],
        isNew: true,
        isFeatured: true,
        isLuxury: true,
        agentId: "a1",
        description:
            "A breathtaking lakefront estate where architectural brilliance meets natural serenity. This majestic residence commands sweeping views of Lake Austin from every principal room. Soaring ceilings, walls of glass, and a seamlessly integrated indoor-outdoor flow define this exceptional property. The chef's kitchen features Italian marble countertops, dual islands, and Miele appliances. The primary suite is a true sanctuary, with a spa-like bath, dual closets, and a private terrace overlooking the water.",
        yearBuilt: 2021,
        parkingSpaces: 3,
        hasPool: true,
        hasGarage: true,
        propertyType: "Villa",
        features: [
            "Private boat dock", "Wine cellar", "Home theater", "Smart home system",
            "Outdoor kitchen", "Tennis court", "Guest house", "3-car garage",
        ],
        status: "For Sale",
        daysOnMarket: 3,
    },
    {
        id: "2",
        title: "SoCo Loft at The Standard",
        price: 875000,
        priceLabel: "$875,000",
        beds: 2,
        baths: 2,
        sqft: 1650,
        address: "412 South Congress Ave, Unit 8A",
        city: "Austin",
        state: "TX",
        neighborhood: "South Congress",
        lat: 30.2512,
        lng: -97.7498,
        images: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=85",
            "https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=1200&q=85",
            "https://images.unsplash.com/photo-1567767292278-a702f7b23a0c?w=1200&q=85",
            "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&q=85",
        ],
        tags: ["urban-loft", "downtown", "modern"],
        isNew: true,
        isUrbanLoft: true,
        agentId: "a2",
        description:
            "Life at the center of Austin's creative heartbeat. This stunning corner loft features 14-foot ceilings, polished concrete floors, and industrial-chic finishes that honor the building's original character. Floor-to-ceiling windows bathe the open living space in golden southern light. The kitchen is sleek and functional with quartz counters and a gas range. Step outside to the vibrant SoCo strip, with restaurants, boutiques, and live music venues moments from your door.",
        yearBuilt: 2018,
        parkingSpaces: 1,
        hasPool: true,
        hasGarage: false,
        propertyType: "Loft",
        features: [
            "Rooftop terrace access", "Concierge service", "14ft ceilings", "Polished concrete floors",
            "Exposed brick", "Pet-friendly building", "Bike storage", "EV charging",
        ],
        status: "For Sale",
        daysOnMarket: 7,
    },
    {
        id: "3",
        title: "Park Avenue Penthouse",
        price: 5200000,
        priceLabel: "$5,200,000",
        beds: 4,
        baths: 5,
        sqft: 4800,
        address: "1 Park Ave, PH-42",
        city: "New York",
        state: "NY",
        neighborhood: "Midtown East",
        lat: 40.7451,
        lng: -73.9836,
        images: [
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=85",
            "https://images.unsplash.com/photo-1631193816258-28b44b21e78f?w=1200&q=85",
            "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=85",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1200&q=85",
        ],
        tags: ["luxury", "penthouse", "city-view"],
        isFeatured: true,
        isLuxury: true,
        agentId: "a3",
        description:
            "Occupying the full 42nd floor of one of Midtown's most coveted addresses, this extraordinary penthouse is a statement of uncompromising luxury. A private elevator foyer opens to panoramic 360-degree views of the Manhattan skyline, the Hudson and East Rivers, and Central Park. The great room spans over 2,000 square feet with ceiling heights reaching 11 feet. A private wrap-around terrace of 800 square feet provides alfresco living above the city's iconic skyline.",
        yearBuilt: 2020,
        parkingSpaces: 2,
        hasPool: false,
        hasGarage: true,
        propertyType: "Penthouse",
        features: [
            "Private elevator", "360° panoramic views", "800 sqft wrap terrace", "Doorman 24/7",
            "Private gym access", "Wine room", "Chef's kitchen", "Smart home system",
        ],
        status: "For Sale",
        daysOnMarket: 14,
    },
    {
        id: "4",
        title: "The Bungalow on Elm",
        price: 675000,
        priceLabel: "$675,000",
        beds: 3,
        baths: 2,
        sqft: 1900,
        address: "84 Elm Street",
        city: "Austin",
        state: "TX",
        neighborhood: "Hyde Park",
        lat: 30.3088,
        lng: -97.7341,
        images: [
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=85",
            "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=85",
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=85",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85",
        ],
        tags: ["charming", "garden", "walkable"],
        isNew: true,
        agentId: "a4",
        description:
            "A lovingly restored 1930s craftsman bungalow that perfectly blends heritage charm with modern comforts. Original hardwood floors, arched doorways, and built-in bookshelves celebrate the home's storied history. The updated kitchen features custom cabinetry, farmhouse sink, and butcher-block counters. The lush backyard is an entertainer's paradise with a covered porch, raised garden beds, and mature oak trees.",
        yearBuilt: 1934,
        parkingSpaces: 1,
        hasPool: false,
        hasGarage: false,
        propertyType: "House",
        features: [
            "Original hardwood floors", "Craftsman details", "Covered back porch",
            "Raised garden beds", "Apple and fig trees", "Updated kitchen", "Nest thermostat",
        ],
        status: "For Sale",
        daysOnMarket: 5,
    },
    {
        id: "5",
        title: "Venice Canal House",
        price: 3400000,
        priceLabel: "$3,400,000",
        beds: 4,
        baths: 3,
        sqft: 3100,
        address: "27 Eastern Canal Court",
        city: "Los Angeles",
        state: "CA",
        neighborhood: "Venice",
        lat: 33.9879,
        lng: -118.4695,
        images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85",
            "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=1200&q=85",
            "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=85",
        ],
        tags: ["luxury", "canal-view", "designer"],
        isFeatured: true,
        isLuxury: true,
        agentId: "a2",
        description:
            "A rare jewel on the iconic Venice Canals. This architect-designed home bridges contemporary California living with serene waterside tranquility. The open-plan living and dining area opens via bifold doors to a private cantilevered deck over the water. The chef's kitchen is fitted with Gaggenau appliances and a custom concrete island. The primary suite occupies the entire top floor with a private rooftop terrace and spa-style bathroom.",
        yearBuilt: 2019,
        parkingSpaces: 2,
        hasPool: false,
        hasGarage: true,
        propertyType: "House",
        features: [
            "Canal frontage", "Private kayak dock", "Rooftop terrace", "Bifold glass walls",
            "Gaggenau appliances", "Radiant floor heating", "EV charging", "Solar panels",
        ],
        status: "For Sale",
        daysOnMarket: 10,
    },
    {
        id: "6",
        title: "The Brooklyn Heights Townhouse",
        price: 4100000,
        priceLabel: "$4,100,000",
        beds: 5,
        baths: 4,
        sqft: 4400,
        address: "62 Pierrepont Street",
        city: "New York",
        state: "NY",
        neighborhood: "Brooklyn Heights",
        lat: 40.6957,
        lng: -73.9957,
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
            "https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=1200&q=85",
            "https://images.unsplash.com/photo-1615529151169-7b1d8a6b2434?w=1200&q=85",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85",
        ],
        tags: ["luxury", "townhouse", "historic"],
        isLuxury: true,
        agentId: "a3",
        description:
            "A landmark Federal-style brownstone townhouse on one of Brooklyn Heights' most photographed blocks. Meticulously restored over three years to preserve its 19th-century grandeur while seamlessly integrating 21st-century luxury. Five stories of gracious living include a garden apartment, a formal parlor floor with original marble fireplaces, and a rooftop penthouse with sweeping Manhattan skyline views.",
        yearBuilt: 1882,
        parkingSpaces: 0,
        hasPool: false,
        hasGarage: false,
        propertyType: "Townhouse",
        features: [
            "Original marble fireplaces", "Garden level apartment", "Rooftop terrace",
            "Skyline views", "Restored crown moldings", "Chef's kitchen", "Wine cellar", "Formal parlor",
        ],
        status: "For Sale",
        daysOnMarket: 21,
    },
    {
        id: "7",
        title: "Malibu Blufftop Estate",
        price: 9800000,
        priceLabel: "$9,800,000",
        beds: 6,
        baths: 7,
        sqft: 7200,
        address: "32400 Pacific Coast Highway",
        city: "Malibu",
        state: "CA",
        neighborhood: "Point Dume",
        lat: 34.0006,
        lng: -118.8063,
        images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
            "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1200&q=85",
            "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=85",
        ],
        tags: ["luxury", "ocean-view", "estate", "pool"],
        isFeatured: true,
        isLuxury: true,
        agentId: "a1",
        description:
            "Where the Santa Monica Mountains meet the Pacific in a collision of raw beauty. This extraordinary blufftop compound commands 270-degree ocean views from Catalina Island to Point Magu. The main residence dissolves indoors and outdoors through motorized glass walls that retract fully to reveal the infinity pool and the Pacific horizon beyond. Six bedrooms, each with en-suite baths and ocean views, provide unparalleled guest accommodations.",
        yearBuilt: 2022,
        parkingSpaces: 6,
        hasPool: true,
        hasGarage: true,
        propertyType: "Villa",
        features: [
            "Infinity pool & spa", "Private beach access", "Home cinema", "Gym & sauna",
            "900-bottle wine cellar", "Outdoor firepit lounge", "Tennis court", "Generator",
        ],
        status: "For Sale",
        daysOnMarket: 1,
    },
    {
        id: "8",
        title: "The Greenwich Village Condo",
        price: 1450000,
        priceLabel: "$1,450,000",
        beds: 2,
        baths: 2,
        sqft: 1380,
        address: "45 West 10th Street, Unit 5C",
        city: "New York",
        state: "NY",
        neighborhood: "Greenwich Village",
        lat: 40.7318,
        lng: -74.0004,
        images: [
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1200&q=85",
            "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=1200&q=85",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=85",
            "https://images.unsplash.com/photo-1567767292278-a702f7b23a0c?w=1200&q=85",
        ],
        tags: ["urban-loft", "village", "prewar"],
        isUrbanLoft: true,
        isNew: true,
        agentId: "a5",
        description:
            "A luminous prewar condominium on one of the Village's most coveted tree-lined streets. High beamed ceilings, oversized casement windows, and wide-plank hardwood floors speak to the building's distinguished 1920s heritage. The remodeled kitchen is a study in refined minimalism with custom cabinetry and marble surfaces. The primary suite features an outfitted walk-in closet and a spa bath with radiant heated floors.",
        yearBuilt: 1924,
        parkingSpaces: 0,
        hasPool: false,
        hasGarage: false,
        propertyType: "Condo",
        features: [
            "Prewar details", "Beamed ceilings", "Tree-lined views", "Doorman",
            "Virtual doorman", "Laundry in unit", "Bike room", "Central AC",
        ],
        status: "For Sale",
        daysOnMarket: 4,
    },
    {
        id: "9",
        title: "Zilker Park Craftsman",
        price: 1150000,
        priceLabel: "$1,150,000",
        beds: 4,
        baths: 3,
        sqft: 2650,
        address: "1423 Rabb Road",
        city: "Austin",
        state: "TX",
        neighborhood: "Barton Hills",
        lat: 30.2584,
        lng: -97.7753,
        images: [
            "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=85",
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=85",
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=85",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85",
        ],
        tags: ["charming", "pool", "park-views"],
        isNew: true,
        agentId: "a4",
        description:
            "Steps from Barton Springs and Zilker Park, this beautifully renovated Craftsman sits on a rare double lot with a sparkling pool. The open layout is perfect for entertaining, with a kitchen that flows seamlessly to the pool deck. The primary suite addition features vaulted ceilings, a soaking tub, and a walk-in shower with dual rain heads. One of Austin's most walkable neighborhoods awaits outside your door.",
        yearBuilt: 1948,
        parkingSpaces: 2,
        hasPool: true,
        hasGarage: false,
        propertyType: "House",
        features: [
            "Pool & hot tub", "Double lot", "Detached studio", "Covered outdoor dining",
            "Mature oak trees", "Chef's kitchen", "Original hardwood", "Solar panels",
        ],
        status: "For Sale",
        daysOnMarket: 2,
    },
    {
        id: "10",
        title: "South Beach Penthouse",
        price: 3750000,
        priceLabel: "$3,750,000",
        beds: 3,
        baths: 3,
        sqft: 2900,
        address: "101 Ocean Drive, PH-12",
        city: "Miami",
        state: "FL",
        neighborhood: "South Beach",
        lat: 25.7617,
        lng: -80.1918,
        images: [
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=85",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
            "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=85",
            "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=85",
        ],
        tags: ["luxury", "ocean-view", "penthouse", "pool"],
        isFeatured: true,
        isLuxury: true,
        agentId: "a6",
        description:
            "Wake up to the sound of waves and the sight of an endless Atlantic horizon from this extraordinary penthouse above iconic Ocean Drive. The wraparound terrace of 1,200 square feet offers unobstructed panoramas of South Beach and the turquoise ocean beyond. Interiors were conceived by a Miami-based interior design studio in a palette of warm alabaster, natural stone, and weathered bronze.",
        yearBuilt: 2023,
        parkingSpaces: 2,
        hasPool: true,
        hasGarage: true,
        propertyType: "Penthouse",
        features: [
            "1,200 sqft wraparound terrace", "Ocean views", "Private pool on terrace",
            "Concierge", "Beach club access", "Sub-Zero & Wolf appliances", "Spa bath", "Smart home",
        ],
        status: "For Sale",
        daysOnMarket: 6,
    },
    {
        id: "11",
        title: "The Warehouse District Loft",
        price: 695000,
        priceLabel: "$695,000",
        beds: 1,
        baths: 2,
        sqft: 2100,
        address: "220 West 6th St, Unit 4",
        city: "Austin",
        state: "TX",
        neighborhood: "Warehouse District",
        lat: 30.2654,
        lng: -97.7516,
        images: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=85",
            "https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=1200&q=85",
            "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&q=85",
        ],
        tags: ["urban-loft", "industrial", "downtown"],
        isUrbanLoft: true,
        agentId: "a1",
        description:
            "A genuine converted warehouse loft in the heart of Austin's entertainment district. Soaring 16-foot ceilings, original industrial steel windows, exposed ductwork, and a concrete barrel-vault ceiling create an atmosphere that is utterly one-of-a-kind. The mezzanine sleeping area floats above the main living space. The building's rooftop deck offers sweeping city views.",
        yearBuilt: 2015,
        parkingSpaces: 1,
        hasPool: false,
        hasGarage: false,
        propertyType: "Loft",
        features: [
            "16ft barrel-vault ceilings", "Industrial steel windows", "Exposed ductwork",
            "Mezzanine bedroom", "Rooftop deck", "Polished concrete", "Open kitchen", "Pet-friendly",
        ],
        status: "For Sale",
        daysOnMarket: 18,
    },
    {
        id: "12",
        title: "Coconut Grove Historic Villa",
        price: 4500000,
        priceLabel: "$4,500,000",
        beds: 5,
        baths: 5,
        sqft: 5800,
        address: "3480 Devon Road",
        city: "Miami",
        state: "FL",
        neighborhood: "Coconut Grove",
        lat: 25.7192,
        lng: -80.2383,
        images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
            "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=1200&q=85",
        ],
        tags: ["luxury", "pool", "historic", "garden"],
        isLuxury: true,
        agentId: "a6",
        description:
            "Nestled behind lush tropical foliage in historic Coconut Grove, this architecturally significant 1930s Mediterranean villa has been entirely reimagined for contemporary living. Original arched doorways, terracotta tiles, and coffered ceilings honor the home's heritage while a complete renovation delivers the best of modern luxury. A resort-style pool and outdoor entertaining pavilion make the expansive grounds an entertainer's dream.",
        yearBuilt: 1936,
        parkingSpaces: 3,
        hasPool: true,
        hasGarage: true,
        propertyType: "Villa",
        features: [
            "Resort pool & spa", "Original terracotta tiles", "Arched doorways",
            "Outdoor pavilion", "Gourmet kitchen", "Smart home", "Guest house", "Electric gate",
        ],
        status: "For Sale",
        daysOnMarket: 30,
    },
];

export function getProperties(): Property[] {
    return properties;
}

export function getPropertyById(id: string): Property | undefined {
    return properties.find((p) => p.id === id);
}

export function getPropertiesByBounds(
    minLat: number,
    maxLat: number,
    minLng: number,
    maxLng: number
): Property[] {
    return properties.filter(
        (p) =>
            p.lat >= minLat &&
            p.lat <= maxLat &&
            p.lng >= minLng &&
            p.lng <= maxLng
    );
}

export function getFeaturedProperties(): Property[] {
    return properties.filter((p) => p.isFeatured);
}

export function getNewListings(): Property[] {
    return properties.filter((p) => p.isNew).slice(0, 6);
}

export function getLuxuryEstates(): Property[] {
    return properties.filter((p) => p.isLuxury).slice(0, 6);
}

export function getUrbanLofts(): Property[] {
    return properties.filter((p) => p.isUrbanLoft).slice(0, 6);
}

export default properties;
