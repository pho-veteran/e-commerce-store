import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {
        const { userId }: { userId: string | null } = await auth();
        const body = await req.json();

        const {
            name,
            phone,
            generalAddress,
            streetAddress,
            type,
            isDefault,
        } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (
            !name ||
            !phone ||
            !generalAddress ||
            !streetAddress
        ) {
            return new NextResponse("Invalid Request", { status: 400 });
        }

        if (isDefault) {
            await prisma.address.updateMany({
                where: {
                    userId,
                    isDefault: true,
                },
                data: {
                    isDefault: false,
                },
            });
        }

        const product = await prisma.address.create({
            data: {
                userId,
                name,
                phone,
                generalAddress,
                streetAddress,
                type,
                isDefault,
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("[POST /api/addresses]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function GET(
    req: Request,
){
    try {
        const { userId }: { userId: string | null } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const addresses = await prisma.address.findMany({
            where: {
                userId,
            },
        });

        return NextResponse.json(addresses);
    } catch (error) {
        console.error("[GET /api/addresses]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}