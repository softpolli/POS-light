"use client";

import { authClient } from '@/lib/auth-client';
import { ArrowLeft } from '@gravity-ui/icons';
import { Button, Card, Description, FieldError, Form, Input, Label, Radio, RadioGroup, TextField } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const SignupPage = () => {


    const router = useRouter();

    // const [role, setRole] = useState('user');

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const profileImg = formData.get("photo");

        console.log({
            name,
            email,
            password,
            // role,
            profileImg,
        });

        // Validate image
        if (!(profileImg instanceof File) || profileImg.size === 0) {
            Swal.fire({
                icon: "error",
                title: "Photo Required",
                text: "Please select a profile photo.",
            });
            return;
        }

        // getting image data form the form
        const imageFormData = new FormData();
        imageFormData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;  //imgbb upload url

        // Upload image to ImgBB
        const imageResponse = await fetch(image_API_URL, {
            method: "POST",
            body: imageFormData,
        });

        const imageData = await imageResponse.json();

        if (!imageData.success) {
            throw new Error("Image upload failed");
        }

        const photoURL = imageData.data.url;

        console.log("Uploaded photo URL:", photoURL);

        const { data, error } = await authClient.signUp.email({
            name: name,
            email: email,
            password: password,
            image: photoURL,
            // role,
            // isFraud: false,
            callbackURL: "/dashboard",
        });

        console.log("signup response:", { data, error });

        if (data) {
            Swal.fire({
                title: "Registration Successful!",
                text: "Welcome aboard! Redirecting you to home...",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            }).then(() => {
                router.push("/dashboard");
                router.refresh();
            });
        }

        if (error) {
            Swal.fire({
                icon: "error",
                title: "Error signing up!",
                text: error.message || "Something went wrong.",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#7a9e9f]/30">
            <Card className="w-full max-w-md overflow-hidden rounded-none sm:rounded-lg shadow-2xl border-0 p-0 bg-transparent">

                {/* Upper Section (Gray Background) */}
                <div className="bg-[#d5d5d5] px-8 pt-10 pb-8 text-neutral-800">

                    <h1 className="mb-8 text-center text-xl md:text-3xl font-extrabold tracking-tight bg-linear-to-t from-orange-600 to-orange-500 dark:from-white dark:to-green-400 bg-clip-text text-transparent">
                        Create an Account
                    </h1>

                    <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                        {/* Name Field */}
                        <TextField isRequired name="name" type="text" className="w-full">
                            <Label className="text-sm font-medium text-neutral-800 block mb-1">
                                Name *
                            </Label>
                            <Input
                                placeholder="Enter your full name"
                                className="w-full bg-white text-neutral-800 rounded-full px-5 py-3 text-sm placeholder:text-neutral-400 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#f24423]/50 transition-all shadow-inner"
                            />
                            <FieldError className="text-xs text-red-600 mt-1 pl-3" />
                        </TextField>

                        {/* Profile Photo Upload Field */}
                        <div className="w-full">
                            <label className="text-sm font-medium text-neutral-800 block mb-1">
                                Profile Photo <span className="text-[#f24423]">*</span>
                            </label>
                            <Input
                                isrequired="true"
                                name="photo"
                                type="file"
                                accept="image/*"
                                className="w-full bg-white text-neutral-800 rounded-full px-4 py-2 text-xs border border-neutral-300 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200 cursor-pointer shadow-inner"
                            />
                            <p className="text-[11px] text-neutral-500 mt-1 pl-3">
                                PNG, JPG, WebP up to 5MB
                            </p>
                        </div>

                        {/* Email Field */}
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
                                Email *
                            </Label>
                            <Input
                                placeholder="Enter your email address"
                                className="w-full bg-white text-neutral-800 rounded-full px-5 py-3 text-sm placeholder:text-neutral-400 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#f24423]/50 transition-all shadow-inner"
                            />
                            <FieldError className="text-xs text-red-600 mt-1 pl-3" />
                        </TextField>

                        {/* Password Field */}
                        <TextField
                            isRequired
                            minLength={8}
                            name="password"
                            type="password"
                            className="w-full"
                            validate={(value) => {
                                if (value.length < 8)
                                    return "Password must be at least 8 characters";
                                if (!/[A-Z]/.test(value))
                                    return "Must contain at least one uppercase letter";
                                if (!/[0-9]/.test(value))
                                    return "Must contain at least one number";
                                return null;
                            }}
                        >
                            <Label className="text-sm font-medium text-neutral-800 block mb-1">
                                Password *
                            </Label>
                            <Input
                                placeholder="Create a strong password"
                                className="w-full bg-white text-neutral-800 rounded-full px-5 py-3 text-sm placeholder:text-neutral-400 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#f24423]/50 transition-all shadow-inner"
                            />
                            <Description className="text-[11px] text-neutral-500 mt-1 pl-3 leading-normal block">
                                At least 8 characters with 1 uppercase and 1 number.
                            </Description>
                            <FieldError className="text-xs text-red-600 mt-1 pl-3" />
                        </TextField>

                        {/* Role Radio Group */}
                        {/* <div className="flex flex-col gap-1.5 mt-1 pl-1">
                            <Label className="text-xs font-semibold text-neutral-700">
                                I want to join as a:
                            </Label>
                            <RadioGroup
                                onChange={(value) => setRole(value)}
                                defaultValue="user"
                                name="plan-orientation"
                                orientation="horizontal"
                                className="flex items-center gap-6"
                            >
                                <Radio value="user" className="text-sm text-neutral-800 accent-[#f24423] cursor-pointer">
                                    <Radio.Content className="flex items-center gap-1.5">
                                        <Radio.Control>
                                            <Radio.Indicator />
                                        </Radio.Control>
                                        User
                                    </Radio.Content>
                                </Radio>

                                <Radio value="vendor" className="text-sm text-neutral-800 accent-[#f24423] cursor-pointer">
                                    <Radio.Content className="flex items-center gap-1.5">
                                        <Radio.Control>
                                            <Radio.Indicator />
                                        </Radio.Control>
                                        Vendor
                                    </Radio.Content>
                                </Radio>
                            </RadioGroup>
                        </div> */}

                        {/* Sign Up Button */}
                        <Button
                            type="submit"
                            className="w-full mt-3 py-3.5 rounded-full font-bold uppercase tracking-wider text-sm bg-[#f24423] hover:bg-[#d9381a] text-white shadow-md transition-colors"
                        >
                            SIGN UP
                        </Button>

                        {/* Hidden / Functional Reset Button */}
                        <div className="flex justify-end pt-1">
                            <button
                                type="reset"
                                className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors"
                            >
                                Reset
                            </button>
                        </div>
                    </Form>
                </div>

                {/* Bottom Footer Section (White with Orange Bar) */}
                <div className="bg-white px-8 pt-8 pb-7 relative border-b-4 border-[#f24423]">
                    <div className="flex items-center justify-between text-xs font-bold text-[#f24423]">
                        <Link href="/login" className="hover:underline transition-colors">
                            Already have an account?
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-1 text-neutral-500 hover:text-neutral-800 font-normal transition-colors"
                        >
                            <ArrowLeft size={13} /> Back to Home
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SignupPage;