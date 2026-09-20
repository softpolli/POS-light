"use client";

import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react';
import Swal from 'sweetalert2';

const AddItemPage = () => {

    const router = useRouter();
    const { data, isPending } = useSession();
    const user = data?.user;

    // console.log(user)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        // const foodData = Object.fromEntries(formData.entries());

        const item_name = formData.get("food_name");
        const price = Number(formData.get("price"));
        const imageFile = formData.get("food_image");

        // converting the image into formData
        const imageFormData = new FormData();
        imageFormData.append("image", imageFile);

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

        const image_url = imageData.data.url;

        // console.log("Uploaded photo URL:", image_url);

        // Read all normal values
        const foodData = {
            item_name,
            image_url,
            price,
            category: "food",
            isAvailable: true,
            created_at: new Date()
        };

        // console.log(foodData);

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/addfooditem`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(foodData)
        })

        const resdata = await res.json();

        // console.log(resdata);

        if (resdata.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Food Item Added Successfully!",
                showConfirmButton: false,
                timer: 1000
            });

            router.push("/dashboard/manageitems");
        }

        e.target.reset();
    }

    if (isPending) {
        return <div className="flex items-center justify-center w-8 h-8 mx-auto">
            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></span>
        </div>
    }

    return (
        <div className="w-[90%] md:w-[80%] mx-auto font-sans">

            <h1 className="mb-5 font-semibold text-neutral-600 dark:text-white text-2xl tracking-wide">Add New Food Item</h1>

            {/* FORM CONTAINER CARD (Matches Table Container in Dashboard) */}
            <div className="bg-white rounded-3xl p-5 md:p-8 border border-slate-200/80 shadow-sm">
                {/* Form Header */}
                <div className="mb-8 pb-4 border-b border-slate-100 flex items-center justify-between">
                    <div>

                        <p className="text-sm md:text-base tracking-wide font-semibold">
                            Create a new food item to the menu.
                        </p>
                    </div>
                </div>

                {/* MAIN FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* 1. Food Item Name */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Food Item Name <span className="text-emerald-600">*</span>
                        </label>
                        <input
                            type="text"
                            name="food_name"
                            required
                            placeholder="e.g., Fried Rice"
                            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                        />
                    </div>


                    {/* 3. Transport Type, Price, & Quantity (3 Columns) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                        {/* Price (per unit) */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                Price / Unit (BDT) <span className="text-emerald-600">*</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                min={1}
                                required
                                placeholder="e.g., 250"
                                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Image Upload (ImgBB File Picker) */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                Food Item Image <span className="text-emerald-600">*</span>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                required
                                name="food_image"
                                className="w-full px-3 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 file:mr-4 file:py-1.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-100 file:text-emerald-800 hover:file:bg-emerald-200 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* 7. Submit Action Button */}
                    <div className="pt-4">

                        <button type="submit" className="w-full bg-linear-to-r from-[#49219D] to-[#7C41ED] text-white font-bold text-sm py-4 rounded-full flex items-center justify-center gap-2 shadow-md hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"  >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Save Item
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItemPage;