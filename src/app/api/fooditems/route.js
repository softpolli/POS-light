import { NextResponse } from "next/server";
import { protectedFetch } from "@/lib/core/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        const searchText = searchParams.get("searchText") || "";

        const data = await protectedFetch(
            `/allfooditems?searchText=${encodeURIComponent(searchText)}`
        );

        return NextResponse.json(data);
    } catch (error) {
        console.error("FOOD ITEMS API ERROR:", error);

        return NextResponse.json(
            {
                message: error.message || "Failed to fetch food items",
            },
            {
                status: 500,
            }
        );
    }
}