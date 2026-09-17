"use client";

import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import Swal from 'sweetalert2';

const DeleteButton = ({ deleteData, endpoint, text = 'Delete', isButtonsDisabled }) => {

    const router = useRouter();

    // console.log(isButtonsDisabled)

    const handleDelete = async () => {

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
        if (!result.isConfirmed) return;



        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${endpoint}/${deleteData._id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        });

        const data = await res.json();

        console.log(data)

        if (data.deletedCount > 0) {

            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });

            router.refresh();
        }

    }

    return (
        <Button isDisabled={isButtonsDisabled} onClick={handleDelete} variant="danger-soft">
            {text}
        </Button>
    );
};

export default DeleteButton;