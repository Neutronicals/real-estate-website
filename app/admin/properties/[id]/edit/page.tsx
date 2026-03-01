import PropertyForm from "@/components/admin/PropertyForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPropertyById } from "@/data/properties";
import { notFound } from "next/navigation";

export default function EditPropertyPage({ params }: { params: { id: string } }) {
    const property = getPropertyById(params.id);

    if (!property) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <Link
                    href="/admin/properties"
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors mb-4 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Properties
                </Link>
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Edit Property</h1>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                    Updating details for "{property.title}".
                </p>
            </div>

            <PropertyForm initialData={property} isEditing={true} />
        </div>
    );
}
