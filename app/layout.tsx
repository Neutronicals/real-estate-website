import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ConditionalHeader, ConditionalFooter } from "@/components/ConditionalLayout";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
    title: "PropDisc — The Property Discovery Engine",
    description:
        "Discover your perfect home with PropDisc. Explore luxury estates, urban lofts, and family homes with our cinematic property search experience.",
    keywords: "real estate, property search, luxury homes, buy home, rent home",
    openGraph: {
        title: "PropDisc — The Property Discovery Engine",
        description: "Find where you belong. Explore thousands of properties with immersive search.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="font-sans antialiased bg-warmGray-50 text-slate-800 selection:bg-teal-500 selection:text-white">
                <NextTopLoader
                    color="#14B8A6"
                    initialPosition={0.08}
                    crawlSpeed={200}
                    height={3}
                    crawl={true}
                    showSpinner={false}
                    easing="ease"
                    speed={200}
                    shadow="0 0 10px #14B8A6,0 0 5px #14B8A6"
                />
                <ConditionalHeader>
                    <Navbar />
                </ConditionalHeader>
                <main>{children}</main>
                <ConditionalFooter>
                    <Footer />
                </ConditionalFooter>
            </body>
        </html>
    );
}
