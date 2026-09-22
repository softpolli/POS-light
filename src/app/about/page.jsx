import { Building2, CalendarDays, Code2, Database, Globe, Info, Layers3, Server, ShieldCheck } from 'lucide-react';
import React from 'react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 md:px-6 lg:px-8">

            {/* Page Header */}
            <div className="mb-6 flex flex-col items-center justify-center">
                <div className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-emerald-600" />

                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                        About & System Information
                    </h1>
                </div>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Information about this POS application, its development, and technology.
                </p>
            </div>


            {/* Main Product Card */}
            <div className="max-w-5xl mx-auto">

                <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">

                    {/* Product Header */}
                    <div className="relative overflow-hidden bg-linear-to-br from-emerald-600 to-emerald-700 px-6 py-10 md:px-10">

                        {/* Decorative circles */}
                        <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/10" />
                        <div className="absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-white/5" />

                        <div className="relative flex flex-col items-center text-center">

                            {/* Product Icon */}
                            {/* <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 border border-white/20 shadow-lg backdrop-blur-sm">
                                <span className="text-2xl font-black text-white">
                                    POS-Lte
                                </span>
                            </div> */}

                            <h2 className="mt-5 text-3xl font-black tracking-tight text-white">
                                POS LTE
                            </h2>

                            <p className="mt-1 text-sm font-medium text-emerald-50">
                                Point of Sale & Order Management System
                            </p>

                            <div className="mt-4 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white border border-white/10">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-300" />
                                Version 1.0.0
                            </div>
                        </div>
                    </div>


                    {/* Product Description */}
                    <div className="px-6 py-7 md:px-10">

                        <div className="max-w-3xl mx-auto text-center">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                                About the System
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Bistro Express is a modern Point of Sale and Order Management
                                System designed to simplify food ordering, billing, payment
                                processing, and sales management for food businesses.
                            </p>

                            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                The system provides a streamlined interface for managing food
                                items, creating orders, viewing order details, and generating customer receipts.
                            </p>
                        </div>


                        {/* Information Cards */}
                        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                            {/* Product */}
                            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600">
                                        <Layers3 className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Product
                                        </p>

                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                            POS-LTE
                                        </p>
                                    </div>
                                </div>
                            </div>


                            {/* Company */}
                            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600">
                                        <Building2 className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Developed by
                                        </p>

                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                            SoftPolli
                                        </p>
                                    </div>
                                </div>
                            </div>


                            {/* Release */}
                            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600">
                                        <CalendarDays className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Release
                                        </p>

                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                            2026
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>


                        {/* Technology Stack */}
                        <div className="mt-10">

                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                                    Technology Stack
                                </h3>

                                <p className="mt-1 text-xs text-slate-400">
                                    Technologies used to build and power this application.
                                </p>
                            </div>


                            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">

                                {/* Next.js */}
                                <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 text-center hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                                    <Globe className="mx-auto h-6 w-6 text-slate-700 dark:text-slate-200" />

                                    <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        Next.js
                                    </p>

                                    <p className="mt-0.5 text-[10px] text-slate-400">
                                        Frontend
                                    </p>
                                </div>


                                {/* React */}
                                <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 text-center hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                                    <Code2 className="mx-auto h-6 w-6 text-blue-500" />

                                    <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        Better Auth
                                    </p>

                                    <p className="mt-0.5 text-[10px] text-slate-400">
                                        Authentication
                                    </p>
                                </div>


                                {/* Node.js */}
                                <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 text-center hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                                    <Server className="mx-auto h-6 w-6 text-green-500" />

                                    <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        Node.js
                                    </p>

                                    <p className="mt-0.5 text-[10px] text-slate-400">
                                        Runtime
                                    </p>
                                </div>


                                {/* Express */}
                                <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 text-center hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                                    <Layers3 className="mx-auto h-6 w-6 text-orange-500" />

                                    <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        Express.js
                                    </p>

                                    <p className="mt-0.5 text-[10px] text-slate-400">
                                        Backend
                                    </p>
                                </div>


                                {/* MongoDB */}
                                <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 text-center hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                                    <Database className="mx-auto h-6 w-6 text-green-600" />

                                    <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        MongoDB
                                    </p>

                                    <p className="mt-0.5 text-[10px] text-slate-400">
                                        Database
                                    </p>
                                </div>

                            </div>
                        </div>


                        {/* Developer Section */}
                        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">

                            <div className="bg-slate-50 dark:bg-slate-950 px-5 py-4 border-b border-slate-200 dark:border-slate-800">
                                <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                                    Development
                                </h3>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 px-5 py-6">

                                <div className="flex items-center gap-4">

                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-black shadow-sm">
                                        TA
                                    </div>

                                    <div>
                                        <p className="text-base font-bold text-slate-800 dark:text-white">
                                            Taukir Ahmed
                                        </p>

                                        <p className="mt-0.5 text-xs font-medium text-emerald-600">
                                            Senior MERN &amp; Next.js Developer
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Software Development Team · SoftPolli
                                        </p>
                                    </div>

                                </div>


                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                                    <span>Developed by SoftPolli</span>
                                </div>

                            </div>
                        </div>


                        {/* Company Section */}
                        <div className="mt-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 px-5 py-5">

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                                <div>
                                    <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                                        A POS Solution by
                                    </p>

                                    <p className="mt-1 text-xl font-black text-emerald-700 dark:text-emerald-400">
                                        SoftPolli
                                    </p>

                                    <p className="mt-1 text-xs text-emerald-700/70 dark:text-emerald-400/70">
                                        Modern software solutions for modern businesses.
                                    </p>
                                </div>

                                <div className="text-left sm:text-right">
                                    <p className="text-xs text-emerald-700/60 dark:text-emerald-400/60">
                                        Product
                                    </p>

                                    <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                                        Bistro Express POS
                                    </p>
                                </div>

                            </div>
                        </div>


                        {/* Footer */}
                        <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800 text-center">

                            <p className="text-[10px] text-slate-400">
                                © 2026 Bistro Express. All rights reserved.
                            </p>

                            <p className="mt-1 text-[10px] text-slate-400">
                                A POS Solution by{" "}
                                <span className="font-semibold text-emerald-600">
                                    SoftPolli
                                </span>
                            </p>

                            <p className="mt-1 text-[10px] text-slate-300 dark:text-slate-600">
                                Developed by Taukir Ahmed · Senior MERN &amp; Next.js Developer
                            </p>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;