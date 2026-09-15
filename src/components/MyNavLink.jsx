"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const MyNavLink = ({ href, children }) => {

    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 block md:inline-block
        ${isActive
                    ? "bg-emerald-500/10 text-emerald-600 font-semibold shadow-xs dark:text-emerald-400 dark:bg-emerald-400/10"
                    : "text-default-600 hover:text-emerald-600 hover:bg-default-100 dark:hover:text-emerald-400"
                }`}
        >
            {children}
        </Link>
    );
};

export default MyNavLink;