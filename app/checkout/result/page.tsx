"use client"

import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

interface CheckoutResultProps {
    searchParams: {
        vnp_Amount: string,
        vnp_BankCode: string,
        vnp_BankTranNo: string,
        vnp_CardType: string,
        vnp_OrderInfo: string,
        vnp_PayDate: string,
        vnp_ResponseCode: string,
        vnp_SecureHash: string,
        vnp_TmnCode: string,
        vnp_TransactionNo: string,
        vnp_TransactionStatus: string,
        vnp_TxnRef: string,
        cod: string,
        orderId: string,
        amount: string,
    }
}

const CheckoutResult: React.FC<CheckoutResultProps> = ({ searchParams }) => {
    const cart = useCart();
    const router = useRouter();
    if (searchParams.vnp_ResponseCode === "00" || searchParams.cod) {
        cart.removeAll();   
        router.push("/account/orders");
    } else {
        return <div>Invalid Payment</div>
    }

    return <div>Processing</div>
}
export default CheckoutResult;