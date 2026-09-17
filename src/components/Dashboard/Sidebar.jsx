"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import LoadingSpinner from '../LoadingSpinner';
import { useSession } from '@/lib/auth-client';
import { FcPodiumWithSpeaker, FcViewDetails } from "react-icons/fc";


const NavLink = ({ href, icon, children, pathname }) => {
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`w-full h-10 rounded-xl font-bold flex items-center px-3 text-sm gap-2 transition-all active:scale-[0.98] ${isActive
                ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
        >
            <span>{icon}</span>
            {children}
        </Link>
    );
};

const Sidebar = () => {

    const { data, isPending } = useSession();
    const user = data?.user;

    const navItems = [
        // { icon: "📈", href: "/dashboard", label: "Dashboard" },
        { icon: <FcPodiumWithSpeaker size={22} />, href: "/dashboard/manageitems", label: "Manage Items" },
        { icon: <FcViewDetails size={20} />, href: "/dashboard/manageorders", label: "Manage Orders" },
        // { icon: "🧑", href: "/dashboard/admin/manage-user", label: "Manage User" },
    ];

    const pathname = usePathname();

    const navContent = <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => (
            <NavLink
                key={item.label}
                href={item.href}
                icon={item.icon}
                pathname={pathname}
            >
                {item.label}
            </NavLink>
        ))}
    </div>

    if (isPending) return <LoadingSpinner></LoadingSpinner>

    return (
        <aside className="flex flex-col w-64 h-full shrink-0 border-r border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
            <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
                <Link
                    href="/"
                    className="flex items-center gap-2 font-bold text-xl text-foreground hover:opacity-90"
                >
                    <Image
                        src="/logos/SoftPolli-logo-offset.png"
                        alt="SoftPolli Logo"
                        width={150}
                        height={50}
                        className="object-contain h-auto"
                    />
                    {/* <span className="bg-linear-to-r from-blue-500 to-green-600 bg-clip-text text-transparent">
                        TicketBari
                    </span> */}
                </Link>
            </div>

            {navContent}


            {/* Company Advertisement */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        SP
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                            SoftPolli
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">softpolli.com</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;