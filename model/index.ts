import { VNPay } from "vnpay";

export const vnpay = new VNPay({
    tmnCode: process.env.VNPAY_TMNCODE || "",
    secureSecret: process.env.VNPAY_HASHSECRET || ""
})