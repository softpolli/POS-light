"use client";

import { Button, Card, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import { Check, ArrowLeft, Eye, EyeClosed } from "@gravity-ui/icons";
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { authClient } from '@/lib/auth-client';

const LoginPage = () => {

    const router = useRouter();

    const [passToggle, setPassToggle] = useState(true);

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());

        console.log("Form submitted with:", userData);

        const { data, error } = await authClient.signIn.email({
            email: userData.email,
            password: userData.password,
            rememberMe: true,
            callbackURL: "/dashboard",
        });
        console.log("sign in response:", { data, error });

        if (data) {
            toast.success("Log in Successful!");
            router.push("/dashboard");
            router.refresh();
        }

        if (error) {
            Swal.fire({
                icon: "error",
                title: "Login Failed!",
                text: error.message || "Invalid email or password.",
                confirmButtonColor: "#ef4444",
            });
        }
    };

    // const handleGoogleSignIn = async () => {
    //     const data = await authClient.signIn.social({
    //         provider: "google",
    //     });
    //     console.log("Google sign in triggered", data);
    // };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#7a9e9f]/30">
            <Card className="w-full max-w-md overflow-hidden rounded-none sm:rounded-lg shadow-2xl border-0 p-0 bg-transparent">

                {/* Upper Section (Gray Background) */}
                <div className="bg-[#d5d5d5] px-8 pt-10 pb-8 text-neutral-800">
                    <h1 className="mb-8 text-center text-xl md:text-3xl font-extrabold tracking-tight bg-linear-to-t from-orange-600 to-orange-500 dark:from-white dark:to-green-400 bg-clip-text text-transparent">
                        Log in to your account
                    </h1>

                    <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                        {/* Username / Email Field */}
                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            className="w-full"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-sm font-medium text-neutral-800 block mb-1">
                                Username *
                            </Label>
                            <Input
                                placeholder="Enter your Username"
                                className="w-full bg-white text-neutral-800 rounded-full px-5 py-3 text-sm placeholder:text-neutral-400 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#f24423]/50 transition-all shadow-inner"
                            />
                            <FieldError className="text-xs text-red-600 mt-1 pl-3" />
                        </TextField>

                        {/* Password Field */}
                        <TextField
                            isRequired
                            name="password"
                            type="password"
                            className="w-full"
                        >
                            <Label className="text-sm font-medium text-neutral-800 block mb-1">
                                Password *
                            </Label>
                            <div className="w-full relative flex items-center">
                                <Input
                                    placeholder="Enter your Password"
                                    className="w-full bg-white text-neutral-800 rounded-full pl-5 pr-12 py-3 text-sm placeholder:text-neutral-400 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#f24423]/50 transition-all shadow-inner"
                                    type={passToggle ? "password" : "text"}
                                />
                                <Button
                                    type="button"
                                    onClick={() => setPassToggle(!passToggle)}
                                    isIconOnly
                                    variant="light"
                                    className="absolute right-3 p-1 min-w-0 w-8 h-8 rounded-full text-neutral-400 hover:text-neutral-700 bg-transparent flex items-center justify-center"
                                >
                                    {passToggle ? <EyeClosed size={18} /> : <Eye size={18} />}
                                </Button>
                            </div>
                            <FieldError className="text-xs text-red-600 mt-1 pl-3" />
                        </TextField>

                        {/* Remember Me Checkbox */}
                        <div className="flex items-center gap-2 mt-1">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                className="w-3.5 h-3.5 accent-[#f24423] rounded cursor-pointer border-neutral-400"
                            />
                            <label
                                htmlFor="rememberMe"
                                className="text-xs font-medium text-neutral-700 cursor-pointer select-none"
                            >
                                Remember me
                            </label>
                        </div>

                        {/* Login Button */}
                        <Button
                            type="submit"
                            className="w-full mt-2 py-3.5 rounded-full font-bold uppercase tracking-wider text-sm bg-[#f24423] hover:bg-[#d9381a] text-white shadow-md transition-colors"
                        >
                            LOGIN
                        </Button>

                        {/* Hidden Secondary Handlers kept for functional parity */}
                        <div className="flex justify-between items-center pt-2">
                            {/* <button type="button" onClick={handleGoogleSignIn} className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors"  >
                                Google Login
                            </button> */}
                            <button  type="reset" className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors" >
                                Reset
                            </button>
                        </div>
                    </Form>
                </div>

                {/* Bottom Footer Section (White with Orange Bar) */}
                <div className="bg-white px-8 pt-8 pb-7 relative border-b-4 border-[#f24423]">
                    <div className="flex items-center justify-between text-xs font-bold text-[#f24423]">
                        <Link href="/signup" className="hover:underline transition-colors">
                            Don&apos;t have an account?
                        </Link>
                        <Link href="/forgot-password" className="hover:underline transition-colors">
                            Forgot password?
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;