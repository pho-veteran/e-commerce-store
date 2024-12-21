import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
        const response = await fetch(`${baseUrl}/provinces-data.json`, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const provinces = await response.json();
        return NextResponse.json(provinces);
    } catch (error) {
        console.error("[GET /api/provinces]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
