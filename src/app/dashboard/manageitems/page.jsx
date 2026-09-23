"use client";

import DeleteButton from "@/components/Dashboard/DeleteButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Table } from "@heroui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ManageItemPage = () => {
    const [allItems, setAllItems] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);

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
                    setAllItems(data.result);
                } else {
                    console.error(data);
                }
            } catch (error) {
                console.error("Failed to fetch food items:", error);
            } finally {
                setLoading(false);
            }
        };

        // Wait 300ms after the user stops typing
        const timer = setTimeout(() => {
            fetchFoodItems();
        }, 300);

        return () => clearTimeout(timer);
    }, [searchText]);


    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className="px-2">
            <h1 className="mb-5 text-center md:text-start font-semibold text-neutral-600 dark:text-white text-2xl tracking-wide">
                Manage Food Items
            </h1>

            <Link href="/dashboard/additem" className="px-2 py-3 mb-3 block text-center bg-orange-300 hover:bg-orange-400 text-orange-900 rounded-xl">
                Item +
            </Link>

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

            <div className="w-full">

                {/* Mobile View */}
                <div className="flex flex-col gap-3 md:hidden">
                    {allItems.map((item, i) => (
                        <div key={item._id || i} className="flex items-center justify-between p-3.5 bg-content1 border border-divider rounded-xl shadow-xs"  >
                            <div className="flex items-center gap-3">
                                <div className="w-19 h-19 rounded-lg bg-cover bg-center shrink-0 border border-divider" style={{ backgroundImage: `url(${item.image_url})`, }} />

                                <div className="flex flex-col gap-3">
                                    <h4 className="text-base font-semibold text-foreground line-clamp-2">
                                        {item.item_name}
                                    </h4>

                                    <p className="text-sm tracking-wider font-semibold mt-0.5">
                                        ৳ {item.price}
                                    </p>
                                </div>
                            </div>

                            <div className="shrink-0 flex flex-col gap-1">
                                <Link href={`/dashboard/edititem/${item._id}`} className="px-2 py-2.5 rounded-4xl transition-all duration-200 shadow-sm bg-emerald-300 hover:bg-emerald-600 text-sm text-center text-emerald-900 dark:text-blue-200 hover:text-white dark:hover:text-blue-950 active:scale-[0.98]" >
                                    Update
                                </Link>
                                <DeleteButton deleteData={item} endpoint="deletefooditem" text="Delete" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop View */}
                <div className="hidden md:block w-full">
                    <Table>
                        <Table.ScrollContainer>
                            <Table.Content aria-label="Food items" className="w-full"  >
                                <Table.Header>
                                    <Table.Column isRowHeader>
                                        #
                                    </Table.Column>
                                    <Table.Column>
                                        Photo
                                    </Table.Column>
                                    <Table.Column>
                                        Name
                                    </Table.Column>
                                    <Table.Column>
                                        Price
                                    </Table.Column>
                                    <Table.Column>
                                        Action
                                    </Table.Column>
                                </Table.Header>

                                <Table.Body>
                                    {allItems.map((item, i) => (
                                        <Table.Row key={item._id || i}>
                                            <Table.Cell>
                                                {i + 1}
                                            </Table.Cell>

                                            <Table.Cell>
                                                <div className="w-12 h-12 bg-cover bg-center rounded-md border border-divider" style={{ backgroundImage: `url(${item.image_url})`, }} />
                                            </Table.Cell>

                                            <Table.Cell className="font-medium">
                                                {item.item_name}
                                            </Table.Cell>

                                            <Table.Cell>
                                                ${item.price}
                                            </Table.Cell>

                                            <Table.Cell>
                                                <div className="flex gap-2">
                                                    <Link href={`/dashboard/edititem/${item._id}`} className="px-3 py-2 rounded-4xl transition-all duration-200 shadow-sm bg-emerald-300 hover:bg-emerald-600 text-emerald-900 dark:text-blue-200 hover:text-white dark:hover:text-blue-950 active:scale-[0.98]" >
                                                        Update
                                                    </Link>

                                                    <DeleteButton deleteData={item} endpoint="deletefooditem" text="Delete" />
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Content>
                        </Table.ScrollContainer>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default ManageItemPage;