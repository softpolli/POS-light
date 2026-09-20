"use client";

import Link from 'next/link';
import React from 'react';

const OrderDetailsPage = () => {
    const handlePrint = () => {
        window.print();
    };

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
                            <span className="font-bold">ORD-20260914-001</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-500">Date:</span>
                            <span>14 Sep 2026, 03:30 PM</span>
                        </div>
                    </div>

                    <div className="border-b border-dashed border-neutral-400 my-2" />

                    {/* Items Table */}
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] text-neutral-500 border-b border-neutral-200">
                                <th className="py-1">Item</th>
                                <th className="py-1 text-center">Qty</th>
                                <th className="py-1 text-right">Price</th>
                                <th className="py-1 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dashed divide-neutral-200">
                            <tr>
                                <td className="py-1.5 font-medium pr-1">Smoky Beef Delight</td>
                                <td className="py-1.5 text-center align-top">2</td>
                                <td className="py-1.5 text-right align-top">280</td>
                                <td className="py-1.5 text-right align-top font-semibold">560</td>
                            </tr>
                            <tr>
                                <td className="py-1.5 font-medium pr-1">French Fries</td>
                                <td className="py-1.5 text-center align-top">1</td>
                                <td className="py-1.5 text-right align-top">120</td>
                                <td className="py-1.5 text-right align-top font-semibold">120</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="border-b border-dashed border-neutral-400 my-2" />

                    {/* Financial Breakdown */}
                    <div className="space-y-1 text-[11px]">
                        <div className="flex justify-between text-neutral-600">
                            <span>Subtotal</span>
                            <span>$680.00</span>
                        </div>
                        <div className="flex justify-between text-neutral-600">
                            <span>Discount</span>
                            <span>-$30.00</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold border-t border-neutral-800 pt-1.5 mt-1">
                            <span>Total</span>
                            <span>$650.00</span>
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
                            <span>$700.00</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Change:</span>
                            <span>$50.00</span>
                        </div>
                    </div>

                    <div className="border-b border-dashed border-neutral-400 my-3" />

                    {/* Footer */}
                    <div className="text-center space-y-1">
                        <p className="font-semibold text-[11px]">Thank you for dining with us!</p>
                        <p className="text-[10px] text-neutral-400">
                            Please retain receipt for returns
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;