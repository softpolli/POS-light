import DeleteButton from '@/components/Dashboard/DeleteButton';
import { Table } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const ManageOrdersPage = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/allorders`,
        {
            cache: "no-store",
        });
    // const res = await fetch("http://localhost:5000/allfooditems");
    const data = await res.json();
    const allOrders = data.result;

    console.log(allOrders)

    return (
        <div className='px-2'>
            <h1 className="mb-5 font-semibold text-neutral-600 dark:text-white text-2xl tracking-wide">Manage Orders</h1>
            <Link href="/dashboard/addorder" className='px-2 py-3 mb-3 block text-center bg-orange-300 hover:bg-orange-400 text-orange-900 rounded-xl'> Order + </Link>
            <div className="w-full">

                {/* Mobile View: Cards (< 768px) */}
                <div className="flex flex-col gap-3 md:hidden">
                    {allOrders.map((item, i) => (
                        <div key={item._id || i} className="flex items-center justify-between p-3 bg-content1 border border-divider border-gray-300 rounded-xl shadow-xs"  >
                            <div className="flex items-center gap-5">
                                {/* <div className="w-12 h-12 rounded-lg bg-cover bg-center shrink-0 border border-divider" style={{ backgroundImage: `url(${item.image})` }} /> */}
                                <div className='flex flex-col gap-1'>
                                    <h4 className="text-sm font-semibold text-foreground line-clamp-1">
                                        {item.orderNumber}
                                    </h4>
                                    <h4 className="text-sm text-foreground line-clamp-1">
                                        {new Date(item.orderDate).toLocaleDateString()}
                                    </h4>
                                </div>
                                <p className="text-xs text-default-500 font-medium mt-0.5">
                                    ${item.total}
                                </p>
                            </div>

                            <div className="shrink-0 flex gap-1">
                                <Link href={`/dashboard/orderdetails/${item._id}`}
                                    className="px-3 py-2 rounded-4xl transition-all duration-200 shadow-sm bg-emerald-300 hover:bg-emerald-600 text-emerald-900 dark:text-blue-200 hover:text-white dark:hover:text-blue-950 active:scale-[0.98]">
                                    Details
                                </Link>
                                <DeleteButton deleteData={item} endpoint="deletefooditem" text="Delete" />
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
                                    <Table.Column>Order Number</Table.Column>
                                    <Table.Column>Date</Table.Column>
                                    <Table.Column>Price</Table.Column>
                                    <Table.Column>Action</Table.Column>
                                </Table.Header>

                                <Table.Body>
                                    {allOrders.map((item, i) => (
                                        <Table.Row key={item._id || i}>
                                            <Table.Cell>{i + 1}</Table.Cell>
                                            <Table.Cell className="font-medium">{item.orderNumber}</Table.Cell>
                                            <Table.Cell>
                                                {new Date(item.orderDate).toLocaleString()}
                                            </Table.Cell>
                                            <Table.Cell>${item.total}</Table.Cell>
                                            <Table.Cell>
                                                <div className='flex gap-2'>
                                                    <Link href={`/dashboard/orderdetails/${item._id}`}
                                                        className="px-3 py-2 rounded-4xl transition-all duration-200 shadow-sm bg-emerald-300 hover:bg-emerald-600 text-emerald-900 dark:text-blue-200 hover:text-white dark:hover:text-blue-950 active:scale-[0.98]">
                                                        Details
                                                    </Link>

                                                    <DeleteButton deleteData={item} endpoint="deleteorder" text="Delete" />
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

export default ManageOrdersPage;