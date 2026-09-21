import DeleteButton from '@/components/Dashboard/DeleteButton';
import { protectedFetch } from '@/lib/core/server';
import { Table } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const ManageItemPage = async () => {

    // const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/allfooditems`,
    //     {
    //         cache: "no-store",
    //     });
    // const res = await fetch("http://localhost:5000/allfooditems");
    // const data = await res.json();
    // const allItems = data.result;

    const allfooditemsData = await  protectedFetch('/allfooditems');

    // console.log(allfooditemsData)

    const allItems = allfooditemsData.result;

    return (
        <div className='px-2'>
            <h1 className="mb-5 font-semibold text-neutral-600 dark:text-white text-2xl tracking-wide">Manage Food Items</h1>
            <Link href="/dashboard/additem" className='px-2 py-3 mb-3 block text-center bg-orange-300 hover:bg-orange-400 text-orange-900 rounded-xl'> Item + </Link>
            <div className="w-full">

                {/* Mobile View: Cards (< 768px) */}
                <div className="flex flex-col gap-3 md:hidden">
                    {allItems.map((item, i) => (
                        <div
                            key={item._id || i}
                            className="flex items-center justify-between p-3.5 bg-content1 border border-divider rounded-xl shadow-xs"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-12 h-12 rounded-lg bg-cover bg-center shrink-0 border border-divider"
                                    style={{ backgroundImage: `url(${item.image_url})` }}
                                />
                                <div>
                                    <h4 className="text-sm font-semibold text-foreground line-clamp-1">
                                        {item.item_name}
                                    </h4>
                                    <p className="text-xs text-default-500 font-medium mt-0.5">
                                        ${item.price}
                                    </p>
                                </div>
                            </div>

                            <div className="shrink-0">
                                <DeleteButton
                                    deleteData={item}
                                    endpoint="deletefooditem"
                                    text="Delete"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop View: Full Table (>= 768px) */}
                <div className="hidden md:block w-full">
                    <Table>
                        <Table.ScrollContainer>
                            <Table.Content aria-label="Team members" className="w-full">
                                <Table.Header>
                                    <Table.Column isRowHeader>#</Table.Column>
                                    <Table.Column>Photo</Table.Column>
                                    <Table.Column>Name</Table.Column>
                                    <Table.Column>Price</Table.Column>
                                    <Table.Column>Action</Table.Column>
                                </Table.Header>

                                <Table.Body>
                                    {allItems.map((item, i) => (
                                        <Table.Row key={item._id || i}>
                                            <Table.Cell>{i + 1}</Table.Cell>
                                            <Table.Cell> <div className="w-12 h-12 bg-cover bg-center rounded-md border border-divider" style={{ backgroundImage: `url(${item.image_url})` }} /> </Table.Cell>
                                            <Table.Cell className="font-medium">{item.item_name}</Table.Cell>
                                            <Table.Cell>${item.price}</Table.Cell>
                                            <Table.Cell>
                                                <div className='flex gap-2'>
                                                    <Link href={`/dashboard/editticket/${item._id}`}
                                                        className="px-3 py-2 rounded-4xl transition-all duration-200 shadow-sm bg-emerald-300 hover:bg-emerald-600 text-emerald-900 dark:text-blue-200 hover:text-white dark:hover:text-blue-950 active:scale-[0.98]">
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