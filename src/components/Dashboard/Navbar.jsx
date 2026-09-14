"use client";

import { Avatar, Button, Dropdown, Label } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Navbar = ({ onMobileMenuToggle }) => {

    const { data, isPending } = useSession();
    const user = data?.user;

    const router = useRouter();

    const logOut = async () => {
        const result = await signOut();
        console.log("Sign out result:", result);

        toast.success("You are logged out!");

        router.refresh();
    };

    return (
        <header className="sticky top-0 z-40 h-16 w-full flex items-center justify-between px-4 sm:px-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 shrink-0">
            <div className="flex items-center gap-3">
                <button onClick={onMobileMenuToggle} className="md:hidden p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors" aria-label="Toggle Menu"    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5"          >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>

                <h1 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Dashboard{" "}
                    <span className="text-slate-300 dark:text-slate-700 mx-1.5">/</span>{" "}
                    <span className="text-slate-400 font-medium">Routes</span>
                </h1>
            </div>

            <div className="flex items-center gap-4">
                {isPending ? (
                    <div className="flex items-center justify-center w-8 h-8">
                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></span>
                    </div>
                ) : user ? (
                    <Dropdown>
                        <Button aria-label="User menu" variant="light" className="flex items-center gap-2 h-auto py-1.5 px-2.5 rounded-full hover:bg-default-100"            >
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
                                <Dropdown.Item key="username" textValue="User Name" className="border border-[#00BC7D] rounded-xl" >
                                    <Label className="cursor-pointer font-medium text-sm text-[#00BC7D] ">
                                        {user?.name}
                                    </Label>
                                </Dropdown.Item>

                                <Dropdown.Item key="logout" textValue="Log Out" variant="danger"   >
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
                ) : null}
            </div>
        </header>
    );
};

export default Navbar;