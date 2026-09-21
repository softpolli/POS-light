import Link from 'next/link';
import React from 'react';

const UnauthorizedPage = () => {
    return (
        <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center px-4 font-sans text-center select-none">
            {/* Status Code Container */}
            <div className="flex items-center justify-center font-black text-7xl md:text-8xl text-[#1a1a1a] tracking-tight leading-none mb-6">
                <span>4</span>
                {/* Highlighted Accent Digit (matches the red dot accent from image) */}
                <span className="w-12 h-12 md:w-16 md:h-16 bg-[#ff4d4d] rounded-full inline-block mx-1" />
                <span>1</span>
            </div>
            {/* Heading */}
            <h1 className="text-2xl md:text-3xl font-bold text-[#111111] tracking-tight mb-3">
                Unauthorized Access
            </h1>
            {/* Description */}
            <p className="text-sm text-slate-600 font-medium max-w-md mx-auto leading-relaxed mb-8">
                Oops! You don’t have permission to access this page. Please log in with
                appropriate credentials or return home.
            </p>
            {/* Return Home Button */}
            <Link
                href="/"
                className="bg-[#ececec] hover:bg-[#e2e2e2] active:bg-[#d8d8d8] text-slate-800 font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-200 shadow-sm border border-slate-200/60 inline-block mb-12"
            >
                Return Home
            </Link>
            {/* Footer Help Text */}
            <p className="text-xs text-slate-500 font-normal">
                If you think this is a mistake, contact administration or check your user
                permissions.
            </p>
        </div>
    );
};

export default UnauthorizedPage;