import { NextResponse } from "next/server";
import { Bank, VNPay } from 'vnpay';

export async function GET() {
    const vnpay = new VNPay({
        tmnCode: `${process.env.VNPAY_TMNCODE}`,
        secureSecret: `${process.env.VNPAY_HASHSECRET}`,
        vnpayHost: 'https://sandbox.vnpayment.vn',
        testMode: true,
    });

    try {
        const bankList: Bank[] = await vnpay.getBankList();

        return NextResponse.json(bankList);
    } catch (error) {
        console.error("[GET /api/banklist]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}