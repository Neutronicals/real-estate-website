import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-warmGray-50 flex items-center justify-center px-6">
            <div className="text-center max-w-lg">
                {/* Big Number */}
                <p className="font-serif font-bold text-[180px] leading-none text-teal-100 select-none">
                    404
                </p>
                <div className="-mt-12 relative z-10">
                    <h1 className="font-serif font-bold text-warmGray-900 text-4xl mb-4">
                        Property Not Found
                    </h1>
                    <p className="text-warmGray-500 text-lg mb-8">
                        This listing may have been sold, removed, or the URL might be incorrect. Let's help you find your next favourite property.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 bg-teal-500 text-white font-bold px-6 py-3.5 rounded-xl hover:bg-teal-400 transition-all hover:shadow-lg"
                        >
                            <Home className="w-4 h-4" /> Back to Home
                        </Link>
                        <Link
                            href="/search"
                            className="flex items-center justify-center gap-2 border-2 border-teal-500 text-teal-600 font-bold px-6 py-3.5 rounded-xl hover:bg-teal-50 transition-all"
                        >
                            <Search className="w-4 h-4" /> Browse Listings
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
