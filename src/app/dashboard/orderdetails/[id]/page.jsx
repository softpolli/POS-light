"use client";

import LoadingSpinner from '@/components/LoadingSpinner';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const OrderDetailsPage = () => {
    const params = useParams();
    const { id } = params;


    const [orderData, setOrderData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/order/${id}`,
                    {
                        cache: "no-store",
                    }
                );
                const data = await res.json();

                if (res.ok) {
                    setOrderData(data);
                } else {
                    console.error(data);
                }
            } catch (error) {
                console.error("Failed to fetch order data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();

    }, [id]);

    console.log(orderData)

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className="px-2">

            {/* Hidden from print preview */}
            <div className="print:hidden">
                <h1 className="mb-5 font-semibold text-neutral-600 dark:text-white text-2xl tracking-wide">
                    Order Details
                </h1>

                <Link href="/addorder" className='px-2 py-3 mb-3 block text-center bg-orange-300 hover:bg-orange-400 text-orange-900 rounded-xl'> New Order </Link>

                <button type="button" onClick={handlePrint} className="w-full px-2 py-3 mb-3 block text-center font-medium bg-green-300 hover:bg-green-400 text-green-900 rounded-xl cursor-pointer transition-colors"  >
                    Print Receipt
                </button>
            </div>

            {/* Screen Container */}
            <div className="w-full flex justify-center p-6 bg-neutral-100 print:p-0 print:bg-white">

                {/* Isolated Thermal Receipt Container */}
                <div id="pos-receipt" className="w-75 bg-white p-5 font-mono text-xs text-neutral-800 shadow-md" >
                    {/* Header */}
                    <div className="text-center mb-4">
                        <h2 className="text-base font-black tracking-tight uppercase">
                            Bistro Express
                        </h2>
                        <p className="text-[10px] text-neutral-500">123 Food Street, Downtown</p>
                        <p className="text-[10px] text-neutral-500">Tel: +1 (555) 019-2834</p>
                    </div>

                    <div className="border-b border-dashed border-neutral-400 my-2" />

                    {/* Order Meta */}
                    <div className="space-y-1 text-[11px]">
                        <div className="flex justify-between">
                            <span className="text-neutral-500">Order No:</span>
                            <span className="font-bold"> {orderData.orderNumber} </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-500">Date:</span>
                            {/* <span>14 Sep 2026, 03:30 PM</span> */}
                            <span>
                                {new Date(orderData.orderDate).toLocaleString("en-US", {
                                    timeZone: "Asia/Dhaka",
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })}
                            </span>
                        </div>
                    </div>

                    <div className="border-b border-dashed border-neutral-400 my-2" />

                    {/* Items Table */}
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] text-neutral-500 border-b border-neutral-200">
                                <th className="py-1">Item</th>
                                <th className="py-1 text-right">Price</th>
                                <th className="py-1 text-center">Qty</th>
                                <th className="py-1 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dashed divide-neutral-200">
                            {orderData.items.map((item, i) => <tr key={i}>
                                <td className="py-1.5 font-medium pr-1"> {item.item_name} </td>
                                <td className="py-1.5 text-center align-top"> {item.price} </td>
                                <td className="py-1.5 text-right align-top"> {item.quantity} </td>
                                <td className="py-1.5 text-right align-top font-semibold"> {item.subtotal} </td>
                            </tr>)}

                        </tbody>
                    </table>

                    <div className="border-b border-dashed border-neutral-400 my-2" />

                    {/* Financial Breakdown */}
                    <div className="space-y-1 text-[11px]">
                        <div className="flex justify-between text-neutral-600">
                            <span>Subtotal</span>
                            <span>৳ {orderData.subtotal}</span>
                        </div>
                        <div className="flex justify-between text-neutral-600">
                            <span>Discount</span>
                            <span>-৳ {orderData.discount}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold border-t border-neutral-800 pt-1.5 mt-1">
                            <span>Total</span>
                            <span>৳ {orderData.total}</span>
                        </div>
                    </div>

                    <div className="border-b border-dashed border-neutral-400 my-2" />

                    {/* Payment Details */}
                    <div className="space-y-1 text-[11px]">
                        <div className="flex justify-between">
                            <span className="text-neutral-500">Payment Method:</span>
                            <span className="uppercase font-semibold">Cash</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-500">Paid Amount:</span>
                            <span>৳ {orderData.paidAmount}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Change:</span>
                            <span>৳ {orderData.changeAmount}</span>
                        </div>
                    </div>

                    <div className="border-b border-dashed border-neutral-400 my-3" />

                    {/* Footer */}
                    <div className="text-center space-y-1">
                        <p className="font-semibold text-[11px]">Thank you for dining with us!</p>
                        
                        <p className="font-semibold text-[11px]">Powered by SoftPolli.</p>
                        <p className="text-[10px] text-neutral-400"> Visit www.softpolli.com </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;