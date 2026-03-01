"use client";

import { useState } from "react";
import { Save, Globe, Lock, Bell, User } from "lucide-react";

export default function AdminSettings() {
    const [activeTab, setActiveTab] = useState("general");

    const [formData, setFormData] = useState({
        siteName: "PropDisc",
        contactEmail: "contact@propdisc.com",
        contactPhone: "(512) 555-1234",
        currency: "GHS",
        adminName: "Jane Admin",
        adminEmail: "admin@propdisc.com",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Settings saved successfully!");
    };

    const tabs = [
        { id: "general", label: "General", icon: Globe },
        { id: "profile", label: "Profile", icon: User },
        { id: "security", label: "Security", icon: Lock },
        { id: "notifications", label: "Notifications", icon: Bell },
    ];

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Settings Navigation */}
            <div className="w-full md:w-64 shrink-0">
                <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm whitespace-nowrap ${isActive
                                    ? "bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-sm border border-zinc-200 dark:border-zinc-800"
                                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white border border-transparent"
                                    }`}
                            >
                                <Icon className="w-5 h-5 shrink-0" />
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Settings Content */}
            <div className="flex-1 max-w-3xl">
                <form onSubmit={handleSave}>
                    {activeTab === "general" && (
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">General Settings</h2>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage basic site configuration and contact details.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Site Name</label>
                                    <input
                                        type="text"
                                        name="siteName"
                                        value={formData.siteName}
                                        onChange={handleChange}
                                        className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-zinc-900 dark:text-white"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Contact Email</label>
                                        <input
                                            type="email"
                                            name="contactEmail"
                                            value={formData.contactEmail}
                                            onChange={handleChange}
                                            className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-zinc-900 dark:text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Contact Phone</label>
                                        <input
                                            type="text"
                                            name="contactPhone"
                                            value={formData.contactPhone}
                                            onChange={handleChange}
                                            className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-zinc-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Primary Currency</label>
                                    <select
                                        name="currency"
                                        value={formData.currency}
                                        onChange={handleChange}
                                        className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-zinc-900 dark:text-white appearance-none"
                                    >
                                        <option value="GHS">GHS (₵)</option>
                                        <option value="EUR">EUR (€)</option>
                                        <option value="GBP">GBP (£)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "profile" && (
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Admin Profile</h2>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Update your personal account details.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Full Name</label>
                                    <input
                                        type="text"
                                        name="adminName"
                                        value={formData.adminName}
                                        onChange={handleChange}
                                        className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-zinc-900 dark:text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</label>
                                    <input
                                        type="email"
                                        name="adminEmail"
                                        value={formData.adminEmail}
                                        onChange={handleChange}
                                        className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-zinc-900 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Placeholders for other tabs for realism */}
                    {activeTab === "security" && (
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6 flex flex-col items-center justify-center min-h-[300px] text-center">
                            <Lock className="w-12 h-12 text-zinc-300 dark:text-zinc-600 mb-2" />
                            <h3 className="text-lg font-medium text-zinc-900 dark:text-white">Security Settings</h3>
                            <p className="text-sm text-zinc-500 max-w-sm">Manage your password, 2FA, and review active sessions.</p>
                            <button type="button" className="mt-4 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition">
                                Change Password
                            </button>
                        </div>
                    )}

                    {activeTab === "notifications" && (
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6 flex flex-col items-center justify-center min-h-[300px] text-center">
                            <Bell className="w-12 h-12 text-zinc-300 dark:text-zinc-600 mb-2" />
                            <h3 className="text-lg font-medium text-zinc-900 dark:text-white">Notification Preferences</h3>
                            <p className="text-sm text-zinc-500 max-w-sm">Configure email and push notification settings for new leads and system alerts.</p>
                        </div>
                    )}

                    {(activeTab === "general" || activeTab === "profile") && (
                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-medium transition-colors shadow-sm shadow-blue-600/20"
                            >
                                <Save className="w-5 h-5" />
                                <span>Save Changes</span>
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
