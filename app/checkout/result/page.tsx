"use client"

import { Button } from "@/components/ui/button";
import { Ban, CircleEllipsis } from "lucide-react";
import { useRouter } from "next/navigation";

interface CheckoutResultProps {
    searchParams: {
        vnp_Amount?: string,
        vnp_BankCode?: string,
        vnp_BankTranNo?: string,
        vnp_CardType?: string,
        vnp_OrderInfo?: string,
        vnp_PayDate?: string,
        vnp_ResponseCode?: string,
        vnp_SecureHash?: string,
        vnp_TmnCode?: string,
        vnp_TransactionNo?: string,
        vnp_TransactionStatus?: string,
        vnp_TxnRef?: string,
        cod?: string,
        orderId?: string,
        outOfStock?: string
    }
}

const CheckoutResult: React.FC<CheckoutResultProps> = ({ searchParams }) => {
    const router = useRouter();
    if (searchParams.vnp_ResponseCode == "00" || searchParams.cod) {
        router.push("/account/orders");
        router.refresh();
        
        return (
            <div className="w-full h-96 flex justify-center items-center bg-neutral-100 p-8">
                <div className="bg-white rounded-md py-6 flex flex-col items-center px-12 max-w-2xl">
                    <CircleEllipsis size={56} className="text-blue-600" />
                    <p className="mt-4 text-lg font-semibold">Payment Processing</p>
                    <p className="mt-1 text-neutral-600 text-center">Your payment is being processed. Please wait a moment.</p>
                    <Button
                        className="mt-6"
                        onClick={() => {
                            router.push("/account/orders");
                            router.refresh();
                        }}
                    >
                        Go to Orders History
                    </Button>
                </div>
            </div>
        )
    } else if (searchParams.outOfStock) {
        return (
            <div className="w-full h-96 flex justify-center items-center bg-neutral-100 p-8">
                <div className="bg-white rounded-md py-6 flex flex-col items-center px-12 max-w-2xl">
                    <Ban size={56} className="text-red-500" />
                    <p className="mt-4 text-lg font-semibold text-center">Out of Stock</p>
                    <p className="mt-1 text-neutral-600 text-center">Some products in your cart are out of stock. Please try again!</p>
                    <Button
                        className="mt-6"
                        onClick={() => {
                            router.push("/cart");
                            router.refresh();
                        }}
                    >
                        Go to Cart
                    </Button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="w-full h-96 flex justify-center items-center bg-neutral-100 p-8">
                <div className="bg-white rounded-md py-6 flex flex-col items-center px-12 max-w-2xl">
                    <Ban size={56} className="text-red-500" />
                    <p className="mt-4 text-lg font-semibold text-center">Payment Failed</p>
                    <p className="mt-1 text-neutral-600 text-center">Please try again to process the payment again in orders history or contact support if the issue persists.</p>
                    <Button
                        className="mt-6"
                        onClick={() => {
                            router.push("/account/orders");
                            router.refresh();
                        }}
                    >
                        Go to Orders History
                    </Button>
                </div>
            </div>
        )
    }
}
export default CheckoutResult;