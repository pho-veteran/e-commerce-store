import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const baseUrl = `https://services.giaohangtietkiem.vn/services/shipment/fee?${url.searchParams.toString()}`;

        const response = await fetch(baseUrl, {
            method: 'GET',
            headers: {
                'Token': `${process.env.SHIPPING_SERVER_GHTK_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const result = await response.json();
        return NextResponse.json(result);
    } catch (error) {
        console.error("[GET /api/shipping-fee]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
