"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AddOrderPage = () => {

    const router = useRouter();

    const [searchText, setSearchText] = useState("");
    const [foodItems, setFoodItems] = useState([]);
    const [cart, setCart] = useState([]);

    const [discount, setDiscount] = useState(0);
    const [paidAmount, setPaidAmount] = useState("");

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Fetch food items
    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                setLoading(true);

                const res = await fetch(
                    `/api/fooditems?searchText=${encodeURIComponent(searchText)}`,
                    {
                        cache: "no-store",
                    }
                );

                const data = await res.json();

                if (res.ok) {
                    setFoodItems(data.result);
                } else {
                    console.error(data);
                }
            } catch (error) {
                console.error("Failed to fetch food items:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFoodItems();
    }, [searchText]);

    // Add item to cart
    const addToCart = (foodItem) => {
        setCart((previousCart) => {
            const existingItem = previousCart.find(
                (item) => item.item_id === foodItem._id
            );

            if (existingItem) {
                return previousCart.map((item) =>
                    item.item_id === foodItem._id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                            subtotal:
                                (item.quantity + 1) * item.price,
                        }
                        : item
                );
            }

            return [
                ...previousCart,
                {
                    item_id: foodItem._id,
                    item_name: foodItem.item_name,
                    price: foodItem.price,
                    image_url: foodItem.image_url,
                    quantity: 1,
                    subtotal: foodItem.price,
                },
            ];
        });
    };

    // Increase quantity
    const increaseQuantity = (itemId) => {
        setCart((previousCart) =>
            previousCart.map((item) =>
                item.item_id === itemId
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                        subtotal:
                            (item.quantity + 1) * item.price,
                    }
                    : item
            )
        );
    };

    // Decrease quantity
    const decreaseQuantity = (itemId) => {
        setCart((previousCart) =>
            previousCart
                .map((item) =>
                    item.item_id === itemId
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                            subtotal:
                                (item.quantity - 1) * item.price,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    // Remove item completely
    const removeFromCart = (itemId) => {
        setCart((previousCart) =>
            previousCart.filter(
                (item) => item.item_id !== itemId
            )
        );
    };

    // Clear cart
    const clearCart = () => {
        setCart([]);
        setDiscount(0);
        setPaidAmount("");
    };

    // Calculate subtotal
    const subtotal = cart.reduce(
        (total, item) => total + item.subtotal,
        0
    );

    // Calculate total
    const total = Math.max(
        subtotal - Number(discount || 0),
        0
    );

    // Calculate change
    const changeAmount = Math.max(
        Number(paidAmount || 0) - total,
        0
    );

    // Submit order
    const handleSubmitOrder = async (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert("Please add at least one food item.");
            return;
        }

        if (Number(paidAmount || 0) < total) {
            alert("Paid amount cannot be less than the total.");
            return;
        }

        const orderData = {
            orderDate: new Date(),

            items: cart.map((item) => ({
                item_id: item.item_id,
                item_name: item.item_name,
                price: item.price,
                quantity: item.quantity,
                subtotal: item.subtotal,
            })),

            subtotal,
            discount: Number(discount || 0),
            total,
            paidAmount: Number(paidAmount || 0),
            changeAmount,
            paymentMethod: "cash",
        };

        try {
            setSubmitting(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/addorder`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(orderData),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "Failed to create order"
                );
            }

            // alert("Order created successfully!");

            if (data.success) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Order Placed Successfully!",
                    showConfirmButton: false,
                    timer: 1000
                });

                router.push(`/dashboard/orderdetails/${data.orderId}`);
            }

            clearCart();

            console.log("Created order:", data);
        } catch (error) {
            console.error("Order creation error:", error);
            alert(error.message || "Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6">
            <div className="mx-auto max-w-7xl">
                <h1 className="mb-5 font-semibold text-neutral-600 dark:text-white text-2xl tracking-wide">
                    Create New Order
                </h1>

                {/* Search */}
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search food items..."
                        className="w-full px-4 py-3 border border-divider rounded-xl bg-content1 text-foreground outline-none focus:border-orange-400"
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                    {/* ================= FOOD ITEMS ================= */}
                    <div className="lg:col-span-2">

                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">
                                Food Items
                            </h2>

                            <span className="rounded-full bg-gray-200 px-3 py-1 text-sm">
                                {foodItems.length} items
                            </span>
                        </div>

                        {loading ? (
                            <div className="rounded-lg bg-white p-8 text-center shadow">
                                Loading food items...
                                <LoadingSpinner></LoadingSpinner>
                            </div>
                        ) : foodItems.length === 0 ? (
                            <div className="rounded-lg bg-white p-8 text-center shadow">
                                No food items available.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

                                {foodItems.map((foodItem) => (
                                    <div key={foodItem._id} className="overflow-hidden rounded-xl bg-white shadow" >

                                        {/* Food Image */}
                                        <div className="h-40 w-full bg-cover bg-center" style={{ backgroundImage: `url(${foodItem.image_url})`, }} />

                                        <div className="p-4">

                                            <h3 className="font-semibold text-gray-800">
                                                {foodItem.item_name}
                                            </h3>

                                            <p className="mt-1 text-lg font-bold text-green-600">
                                                ৳ {foodItem.price}
                                            </p>

                                            <button onClick={() => addToCart(foodItem)} disabled={!foodItem.isAvailable} type="button" className="mt-3 w-full rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400" >
                                                {foodItem.isAvailable ? "Add to Cart" : "Unavailable"}
                                            </button>

                                        </div>
                                    </div>
                                ))}

                            </div>
                        )}
                    </div>

                    {/* ================= CART ================= */}
                    <div className="lg:col-span-1">

                        <div className="sticky top-4 rounded-xl bg-white p-5 shadow">

                            <div className="mb-4 flex items-center justify-between">

                                <h2 className="text-xl font-semibold">
                                    Order Cart
                                </h2>

                                {cart.length > 0 && (
                                    <button onClick={clearCart} type="button" className="text-sm text-red-500 hover:underline" >
                                        Clear
                                    </button>
                                )}

                            </div>

                            {cart.length === 0 ? (
                                <div className="rounded-lg bg-gray-100 p-6 text-center text-gray-500">
                                    Cart is empty.
                                    <br />
                                    Add some food items.
                                </div>
                            ) : (
                                <>
                                    {/* Cart Items */}
                                    <div className="max-h-80 space-y-3 overflow-y-auto">

                                        {cart.map((item) => (
                                            <div key={item.item_id} className="rounded-lg border p-3">

                                                <div className="flex gap-3">

                                                    {/* Cart Image */}
                                                    <div className="h-12 w-12 shrink-0 rounded-md border bg-cover bg-center" style={{ backgroundImage: `url(${item.image_url})`, }} />

                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex justify-between gap-2">
                                                            <div>
                                                                <h3 className="font-medium">
                                                                    {item.item_name}
                                                                </h3>

                                                                <p className="text-sm text-gray-500">
                                                                    ৳{" "}
                                                                    {item.price}{" "}
                                                                    ×{" "}
                                                                    {item.quantity}
                                                                </p>
                                                            </div>

                                                            <p className="font-semibold">
                                                                ৳{" "}
                                                                {item.subtotal}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="mt-3 flex items-center justify-between">
                                                    <div className="flex items-center gap-2">

                                                        <button onClick={() => decreaseQuantity(item.item_id)} type="button" className="flex h-8 w-8 items-center justify-center rounded bg-gray-200 font-bold" >
                                                            −
                                                        </button>

                                                        <span className="w-6 text-center">
                                                            {item.quantity}
                                                        </span>

                                                        <button onClick={() => increaseQuantity(item.item_id)} type="button" className="flex h-8 w-8 items-center justify-center rounded bg-gray-200 font-bold"  >
                                                            +
                                                        </button>

                                                    </div>

                                                    <button onClick={() => removeFromCart(item.item_id)} type="button" className="text-sm text-red-500 hover:underline" >
                                                        Remove
                                                    </button>

                                                </div>

                                            </div>
                                        ))}

                                    </div>

                                    {/* ================= SUMMARY ================= */}
                                    <div className="mt-5 border-t pt-4">

                                        {/* Subtotal */}
                                        <div className="flex justify-between py-1">
                                            <span>
                                                Subtotal
                                            </span>

                                            <span>
                                                ৳ {subtotal}
                                            </span>
                                        </div>

                                        {/* Discount */}
                                        <div className="mt-2">

                                            <label className="mb-1 block text-sm font-medium">
                                                Discount
                                            </label>

                                            <input
                                                type="number"
                                                min="0"
                                                value={discount}
                                                onChange={(e) => setDiscount(e.target.value)}
                                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
                                                placeholder="0"
                                            />

                                        </div>

                                        {/* Total */}
                                        <div className="mt-4 flex justify-between text-lg font-bold">
                                            <span>
                                                Total
                                            </span>

                                            <span>
                                                ৳ {total}
                                            </span>
                                        </div>

                                        {/* Paid Amount */}
                                        <div className="mt-4">

                                            <label className="mb-1 block text-sm font-medium">
                                                Paid Amount
                                            </label>

                                            <input
                                                type="number"
                                                min="0"
                                                value={paidAmount}
                                                onChange={(e) => setPaidAmount(e.target.value)}
                                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
                                                placeholder="Enter paid amount"
                                            />

                                        </div>

                                        {/* Change */}
                                        <div className="mt-4 flex justify-between rounded-lg bg-gray-100 p-3 font-semibold">

                                            <span>
                                                Change
                                            </span>

                                            <span>
                                                ৳ {changeAmount}
                                            </span>

                                        </div>

                                        {/* Create Order */}
                                        <button disabled={submitting || cart.length === 0} onClick={handleSubmitOrder} type="button" className="mt-5 w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400" >
                                            {submitting ? "Creating Order..." : "Create Order"}
                                        </button>

                                    </div>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddOrderPage;