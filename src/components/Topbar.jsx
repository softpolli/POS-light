"use client";

import { Avatar, Button, Dropdown, Label } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import MyNavLink from './MyNavLink';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

const Topbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { data, isPending } = useSession();
    const user = data?.user;

    const router = useRouter();

    const logOut = async () => {
        const result = await signOut();
        console.log("Sign out result:", result);

        toast.success("You are logged out!");

        router.refresh();
    };

    const navItems = (
        <>
            {/* <MyNavLink href="/">Home</MyNavLink> */}
            {/* <MyNavLink href="/alltickets">All Ticket</MyNavLink> */}
            {/* <MyNavLink href="/about">About</MyNavLink> */}
            {/* <MyNavLink href="/dashboard">Dashboard</MyNavLink> */}
            {/* {!isPending && user && (
                <MyNavLink href={`/dashboard/${user.role}`}>Dashboard</MyNavLink>
            )} */}
        </>
    );

    // remove Navbar for Dashboard route
    const pathname = usePathname()
    if (pathname.includes("dashboard")) {
        return null
    }

    return (
        <div className="sticky top-0 z-40 w-full border-b border-divider bg-background/70 backdrop-blur-lg">
            <header className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-1 text-default-600 hover:bg-default-100 rounded-lg transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>

                    <Link
                        href="/"
                        className="flex items-center gap-2 font-bold text-xl text-foreground hover:opacity-90"
                    >
                        <Image
                            src="/logos/SoftPolli-logo-offset.png"
                            alt="Softpolli Logo"
                            width={150}
                            height={80}
                            className="object-contain h-auto"
                        />
                        {/* <span className="bg-linear-to-r from-blue-500 to-green-600 bg-clip-text text-transparent">
                            SoftPolli
                        </span> */}
                    </Link>
                </div>

                <div className="hidden items-center gap-2 md:flex">
                    {navItems}
                </div>

                <div className="flex items-center gap-3">
                    {isPending ? (
                        <div className="flex items-center justify-center w-8 h-8">
                            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></span>
                        </div>
                    ) : user ? (
                        <Dropdown>
                            <Button
                                aria-label="User menu"
                                variant="light"
                                className="flex items-center gap-2 h-auto py-1.5 px-2.5 rounded-full hover:bg-default-100"
                            >
                                <Avatar>
                                    <Avatar.Image src={user?.image} alt={user?.name} />
                                    <Avatar.Fallback>
                                        {user?.name
                                            ? user.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")
                                            : "U"}
                                    </Avatar.Fallback>
                                </Avatar>

                                <span className="hidden sm:block text-sm font-medium text-default-700">
                                    {user?.name.split(" ")[0]}
                                </span>
                            </Button>

                            <Dropdown.Popover className="bg-background border border-divider shadow-xl rounded-xl min-w-50">
                                <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)} >

                                    <Dropdown.Item key="username" textValue="User Name" className="border border-[#00BC7D] rounded-xl">
                                        <Label className="cursor-pointer font-medium text-sm text-[#00BC7D] ">
                                            {user?.name}
                                        </Label>
                                    </Dropdown.Item>

                                    <Dropdown.Item key="profile" textValue="My Profile">
                                        <Link href="/profile" className="flex items-center gap-2 w-full text-default-700 py-1" >
                                            <svg className="w-4 h-4 text-default-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <Label className="cursor-pointer font-medium text-sm">
                                                My Profile
                                            </Label>
                                        </Link>
                                    </Dropdown.Item>

                                    <Dropdown.Item key="logout" textValue="Log Out" variant="danger" >
                                        <button onClick={logOut} className="flex items-center gap-2 w-full text-danger py-1 cursor-pointer" >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            <Label className="cursor-pointer font-medium text-sm">
                                                Log Out
                                            </Label>
                                        </button>
                                    </Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </Dropdown>
                    ) : (
                        // Guest Layout
                        <div className="hidden items-center gap-3 md:flex">
                            <Link href="/login">
                                <Button size="sm" variant="light" className="font-medium bg-violet-600">
                                    Login
                                </Button>
                            </Link>

                            <Link href="/signup">
                                <Button size="sm" className="font-medium shadow-sm bg-linear-to-r from-neutral-900 to-emerald-600 text-white hover:opacity-90 transition-opacity" >
                                    Register
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </header>

            {isMenuOpen && (
                <div className="border-t border-divider md:hidden bg-background">
                    <nav className="flex flex-row justify-between p-4">
                        {/* {navItems} */}
                        <Link href="/dashboard" className='font-medium shadow-sm bg-orange-500 rounded-4xl px-5 py-2 text-violet-900 hover:opacity-90 transition-opacity'>Dashboard</Link>

                        {!user && !isPending && (
                            <div className="grid grid-cols-2 gap-2 border-divider">
                                <Link href="/login">
                                    <Button as={Link} href="/login" size="sm" className="bg-violet-600">
                                        Login
                                    </Button>
                                </Link>

                                <Link href="/signup">
                                    <Button as={Link} href="/signup" size="sm" color="primary">
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Topbar;