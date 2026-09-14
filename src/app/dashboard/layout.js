"use client";

import Navbar from '@/components/Dashboard/Navbar';
import Sidebar from '@/components/Dashboard/Sidebar';
import React, { useState } from 'react';

const Layout = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 antialiased">
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm md:hidden transition-opacity duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 transform ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition-transform duration-300 ease-out flex shrink-0`}>
                <Sidebar />
            </div>
            <div className="flex flex-col flex-1 h-full min-w-0 relative">

                <Navbar onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

                <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50/50 dark:bg-slate-950/20">
                    <div className="max-w-7xl mx-auto p-0 sm:p-3 lg:p-5 min-h-full">
                        {children}
                    </div>
                </main>

            </div>
        </div>
    );
};

export default Layout;