import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prismadb";

export async function PATCH(
    req: Request,
    { params }: { params: { addressId: string } }
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
            !params.addressId
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

        const address = await prisma.address.updateMany({
            where: {
                id: params.addressId,
            },
            data: {
                name,
                phone,
                generalAddress,
                streetAddress,
                type,
                isDefault,
            },
        });

        return NextResponse.json(address);
    } catch (error) {
        console.error("[PATCH /api/addresses]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { addressId: string } }
) {
    try {
        const { userId }: { userId: string | null } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.addressId) {
            return new NextResponse("Invalid Request", { status: 400 });
        }

        const address = await prisma.address.deleteMany({
            where: {
                id: params.addressId,
            },
        });

        return NextResponse.json(address);
    } catch (error) {
        console.error("[DELETE /api/addresses]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
